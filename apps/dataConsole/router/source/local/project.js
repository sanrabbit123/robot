const ProjectJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {
    paddingTop: 38,
    height: 18,
    marginBottom: 18,
    initialLine: 14,
    initialMargin: 14,
  }
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
}

ProjectJs.prototype.standardBar = function (standard) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;
  let sortEventFunction;
  let proidDom, proidArr;

  temp = {
    proid: standard.standard.proid.name,
    name: standard.standard.name.name
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
    color: GeneralJs.colorChip.green,
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

  proidDom = [];
  proidArr = [];
  num = (standard.search === null ? 0 : 1);
  for (let { proid, name } of target) {
    if (num === 1) {
      style2.position = "relative";
      style3.color = GeneralJs.colorChip.black;
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

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = proid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("contextmenu", sortEventFunction(0));
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = name;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[1]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("contextmenu", sortEventFunction(1));
    }
    div_clone2.appendChild(div_clone3);

    div_clone2.style.cursor = "pointer";
    if (num !== 0) {
      div_clone2.addEventListener("click", this.whiteViewMaker(num));
      proidDom.push({ proid, dom: div_clone2 });
      proidArr.push(proid);
    }

    if (num !== 0) {
      this.cases.push({ proid, name });
    } else {
      div_clone2.style.borderBottom = "1px dashed " + GeneralJs.colorChip.gray3;
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

  if (this.standardDoms.length === 2) {
    GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
      instance.standardDoms[1].click();
      clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
    }, 401);
  }

  GeneralJs.ajax("idArr=" + JSON.stringify(proidArr) + "&method=project&property=important", "/getHistoryProperty", function (obj) {
    const proidObj = JSON.parse(obj);
    let boo, tempFunction;
    if (proidObj !== null) {
      for (let { proid, dom } of proidDom) {
        if (proidObj[proid] === undefined) {
          boo = false;
        } else {
          if (proidObj[proid]) {
            boo = true;
          } else {
            boo = false;
          }
        }
        dom.setAttribute("important", "false");
        dom.addEventListener("contextmenu", instance.makeImportantEvent(proid));
        if (boo) {
          tempFunction = instance.makeImportantEvent(proid, !boo);
          tempFunction.call(dom, { type: "click" });
        }
      }
    }
  });

}

ProjectJs.prototype.infoArea = function (info) {
  const instance = this;
  const map = DataPatch.projectMap();
  const { chainingTargets, chainingMethods } = DataPatch.projectChainingTarget();
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

  if (window.localStorage.getItem("project_columnsOrder") !== null && window.localStorage.getItem("project_columnsOrder") !== undefined) {
    originalColumns = JSON.parse(window.localStorage.getItem("project_columnsOrder"));
    for (let c of originalColumns) {
      if (Number.isNaN(Number(c.left))) {
        window.localStorage.clear();
        window.location.reload();
        break;
      }
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
    color: GeneralJs.colorChip.black,
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
    color: GeneralJs.colorChip.green,
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
        const thisId = /p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
        const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
        onOffObj[this.getAttribute("column")] = !onOffObj[this.getAttribute("column")];
        window.localStorage.setItem(thisId, JSON.stringify(onOffObj));
        if (onOffObj[this.getAttribute("column")]) {
          this.style.color = GeneralJs.colorChip.green;
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
    const proidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = GeneralJs.colorChip.green;
    }
    for (let z = 0; z < proidChildren.length; z++) {
      if (proidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < proidChildren[z].children.length; y++) {
          proidChildren[z].children[y].style.color = GeneralJs.colorChip.green;
        }
      }
    }
  }

  leaveEventFunction = function (e) {
    const mother = this.parentElement;
    const thisIndex = this.parentElement.getAttribute("index");
    const thisId = /p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(mother.className)[0];
    const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
    const proidChildren = instance.totalMother.children[0].children;
    let finalColor;
    finalColor = GeneralJs.colorChip.black;
    if (mother.getAttribute("red") === "true") {
      finalColor = GeneralJs.colorChip.darkRed;
    }
    if (mother.getAttribute("drop") === "true") {
      finalColor = GeneralJs.colorChip.gray4;
    }
    for (let z = 0; z < mother.children.length; z++) {
      if (!onOffObj[mother.children[z].getAttribute("column")]) {
        mother.children[z].style.color = finalColor;
      } else {
        mother.children[z].style.color = GeneralJs.colorChip.green;
      }
    }
    for (let z = 0; z < proidChildren.length; z++) {
      if (proidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < proidChildren[z].children.length; y++) {
          proidChildren[z].children[y].style.color = finalColor;
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
      const thisId = /p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];

      leaveEventFunction.call(this, e);
      for (let z = 0; z < instance.totalMother.children[0].children.length; z++) {
        if (instance.totalMother.children[0].children[z].getAttribute("index") === thisIndex) {
          for (let y = 0; y < instance.totalMother.children[0].children[z].children.length; y++) {
            instance.totalMother.children[0].children[z].children[y].style.color = GeneralJs.colorChip.green;
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
              finalColor = GeneralJs.colorChip.black;
              if (standardArea.children[z].getAttribute("drop") === "true") {
                finalColor = GeneralJs.colorChip.gray4;
              }
              if (standardArea.children[z].getAttribute("red") === "true") {
                finalColor = GeneralJs.colorChip.darkRed;
              }
              for (let y = 0; y < standardArea.children[z].children.length; y++) {
                if (!onOffObj[standardArea.children[z].children[y].getAttribute("column")]) {
                  standardArea.children[z].children[y].style.color = finalColor;
                } else {
                  standardArea.children[z].children[y].style.color = GeneralJs.colorChip.green;
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
        let temp, tempFunction;
        let thisCase;
        let chainingFinalValue;
        let idDomChildren;
        let targetOriginalDiv;

        if ((e.type === "keypress" && GeneralJs.confirmKey.includes(e.key)) || e.type === "click" || e.type === "message") {

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

          thisCase = instance.cases[Number(idDom.getAttribute("index"))];

          if (chainingTargets.includes(column)) {
            idDomChildren = idDom.children;
            tempFunction = chainingMethods[column];
            let { chainingColumns, chainingValues } = tempFunction(thisCase, finalValue);
            for (let c of chainingColumns) {
              chainingFinalValue = GeneralJs.vaildValue(c, chainingValues[c], thisCase[c]);
              await GeneralJs.updateValue({
                thisId: thisId,
                requestIndex: String(requestIndex),
                column: c,
                pastValue: thisCase[c],
                value: chainingFinalValue,
                index: Number(idDom.getAttribute("index")),
                thisCase: thisCase
              });
              thisCase[c] = chainingFinalValue;
              targetOriginalDiv = null;
              for (let dom of idDomChildren) {
                if (dom.getAttribute("column") === c) {
                  targetOriginalDiv = dom;
                }
              }
              if (targetOriginalDiv !== null) {
                if (GeneralJs.moneyBoo(c)) {
                  targetOriginalDiv.textContent = GeneralJs.autoComma(chainingFinalValue);
                } else {
                  targetOriginalDiv.textContent = chainingFinalValue;
                }
              }
            }
          }

          await GeneralJs.updateValue({
            thisId: thisId,
            requestIndex: String(requestIndex),
            column: column,
            pastValue: pastRawData,
            value: finalValue,
            index: Number(idDom.getAttribute("index")),
            thisCase: thisCase
          });

          await instance.globalChaining(thisCase, column, finalValue, pastRawData);

          thisCase[column] = finalValue;
          if (GeneralJs.moneyBoo(column)) {
            originalDiv.textContent = GeneralJs.autoComma(finalValue);
          } else {
            originalDiv.textContent = finalValue;
          }
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
          color: GeneralJs.colorChip.green,
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
        const map = DataPatch.projectMap();
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
            color: GeneralJs.colorChip.green,
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.shadow,
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
            boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.gray5,
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
            e.key = "Enter";
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
      const map = DataPatch.projectMap();
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
        originalDiv.style.color = GeneralJs.colorChip.green;
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
            if (/^[0-9]/.test(a.caseDom.children[z].textContent) && !/\-/g.test(a.caseDom.children[z].textContent)) {
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
          background: GeneralJs.colorChip.green,
          textAlign: "center",
          fontSize: "inherit",
          fontWeight: String(500),
          color: GeneralJs.colorChip.white,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
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

    if (window.localStorage.getItem("project_columnsOrder") !== null && window.localStorage.getItem("project_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("project_columnsOrder"));
    } else {
      for (let c of instance.caseDoms[0].children) {
        originalColumns.push({ name: c.getAttribute("column"), width: info.standard[c.getAttribute("column")].width, left: info.standard[c.getAttribute("column")].left });
      }
    }

    for (let obj of originalColumns) {
      if (Number.isNaN(Number(obj.width)) || Number.isNaN(Number(obj.left))) {
        window.localStorage.clear();
        window.location.reload();
        break;
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

    window.localStorage.setItem("project_columnsOrder", JSON.stringify(allColumns));

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

  dropPoint = DataPatch.projectDropPoint();
  redPoint = DataPatch.projectRedPoint();

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
      div_clone2.classList.add(this.cases[num].proid);

      div_clone2.setAttribute("drop", "false");
      div_clone2.setAttribute("red", "false");
      if (dropPoint.values.includes(obj[dropPoint.column])) {
        style2.color = GeneralJs.colorChip.gray4;
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = GeneralJs.colorChip.gray4;
        }
        div_clone2.setAttribute("drop", "true");
      } else if (redPoint.values.includes(obj[redPoint.column])) {
        style2.color = GeneralJs.colorChip.darkRed;
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = GeneralJs.colorChip.darkRed;
        }
        div_clone2.setAttribute("red", "true");
      } else {
        style2.color = "inherit";
      }

      if (window.localStorage.getItem(this.cases[num].proid) === null) {
        window.localStorage.setItem(this.cases[num].proid, JSON.stringify(onoffDummy));
        thisOnOff = onoffDummy;
      } else {
        thisOnOff = JSON.parse(window.localStorage.getItem(this.cases[num].proid));
      }
    }

    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }

    for (let z = 0; z < columns.length; z++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);

      if (num === 0) {
        div_clone3.textContent = obj[columns[z]];
      } else {
        if (map[columns[z]].moneyBoo !== undefined) {
          div_clone3.textContent = GeneralJs.autoComma(obj[columns[z]]);
        } else {
          div_clone3.textContent = obj[columns[z]];
        }
      }

      for (let i in style3) {
        div_clone3.style[i] = style3[i];
      }
      if (num !== 0) {
        if (thisOnOff[columns[z]]) {
          div_clone3.style.color = GeneralJs.colorChip.green;
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

      upsideWhiteBar.style.borderBottom = "1px dashed " + GeneralJs.colorChip.gray3;
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

ProjectJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let projects;
    let whereQuery;
    let cliidArr, desidArr;
    let cliidSet, desidSet;
    let clients, designers;
    let serviceWording;
    let totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;

    if (search === null || search === '' || search === '-') {
      projects = await GeneralJs.ajaxJson({ where: { desid: { $regex: "^d" }, "process.status": { $regex: "^[대진홀]" } } }, "/getProjects");
    } else {
      projects = await GeneralJs.ajaxJson({ query: search }, "/searchProjects");
    }

    cliidArr = [];
    desidArr = [];
    for (let i = 0; i < projects.data.length; i++) {
      cliidArr.push(projects.data[i].middle.cliid);
      desidArr.push(projects.data[i].middle.desid);
    }

    cliidSet = new Set(cliidArr);
    desidSet = new Set(desidArr);

    cliidArr = Array.from(cliidSet);
    desidArr = Array.from(desidSet);

    whereQuery = {};
    whereQuery["$or"] = [];
    for (var i = 0; i < cliidArr.length; i++) {
      whereQuery["$or"].push({ cliid: cliidArr[i] });
    }
    if (whereQuery["$or"].length > 0) {
      clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getClients"));
    } else {
      clients = [];
    }

    whereQuery = {};
    designers = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getDesigners"));
    GeneralJs.stacks.allDesignerTong = designers;

    for (let p of projects.data) {

      for (let c of clients) {
        if (p.middle.cliid === c.cliid) {
          p.standard.name = c.name;
        }
      }

      for (let d of designers) {
        if (p.middle.desid === d.desid) {
          p.info.designer = d.designer + " " + d.desid;
        }
      }

      if (p.middle.serid === "s2011_aa01s") {
        serviceWording = "홈퍼니싱";
      } else if (p.middle.serid === "s2011_aa02s") {
        serviceWording = "홈스타일링";
      } else if (p.middle.serid === "s2011_aa03s") {
        serviceWording = "토탈 스타일링";
      } else if (p.middle.serid === "s2011_aa04s") {
        serviceWording = "설계 변경";
      }

      if (p.middle.xValue === 'M') {
        serviceWording += " mini";
      } else if (p.middle.xValue === 'B') {
        serviceWording += " basic";
      } else if (p.middle.xValue === 'P') {
        serviceWording += " premium";
      }

      if (p.middle.online) {
        serviceWording = "온라인 " + serviceWording;
      } else {
        serviceWording = "오프라인 " + serviceWording;
      }

      p.info.service = serviceWording;
    }

    const { standard, data } = projects;

    for (let i of data) {
      standardDataTong.push(i.standard);
      infoDataTong.push(i.info);
    }

    if (search === null) {
      totalMother = GeneralJs.nodes.div.cloneNode(true);
      totalMother.classList.add("totalMother");
      totalMother.style.height = "calc(100% - " + String(this.belowHeight) + "px" + ")";
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

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search });
    this.infoArea({ standard: standard.info, data: infoDataTong, search: search });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.cardViewMaker = function () {
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
      instance.totalMother.classList.remove("justfadeinoriginal");
      instance.totalMother.classList.add("justfadeoutoriginal");
      instance.totalFather.classList.remove("fadeout");
      instance.totalFather.classList.add("fadein");

    } else {

      totalMother.classList.add("justfadeoutoriginal");

      let temp;
      let totalFather;
      let nameStyle, proidStyle, barStyle;
      let style, styles;
      let areaStyle, areaNameStyle, areaTongStyle;
      let areaNumberStyle;
      let div_clone, div_clone2, div_clone3;
      let size, margin;
      let ea = "px";
      let num;
      let cardWidthConstant;
      let intend, totalWidth;
      let lineHeight, titleTop, startTop;
      let divideNumber;
      let fontSize, nameFontSize;
      let fixedHeightSize;
      let exceptionMargin;
      let whereQuery;
      let tempResult, tempBoo;
      let division, divisionName;
      let numbers;
      let updateState;
      let dragstart_event, dragend_event, dragenter_event, dragleave_event, dragover_event, drop_event;

      //total father div
      totalFather = GeneralJs.nodes.div.cloneNode(true);
      totalFather.classList.add("totalFather");

      margin = 12;
      lineHeight = 20;
      cardWidthConstant = 170;
      divideNumber = Math.floor((window.innerWidth - (margin * 15.8)) / (margin + cardWidthConstant));
      size = (window.innerWidth - (margin * (divideNumber + 15.8))) / divideNumber;
      fixedHeightSize = 107;
      intend = 22;
      titleTop = 13;
      startTop = titleTop + 16;
      exceptionMargin = 12;
      fontSize = 13;
      nameFontSize = fontSize + 4;
      totalWidth = size - (intend * 2) - 1;

      //style maker
      style = {
        display: "inline-block",
        position: "relative",
        width: String(size) + ea,
        height: String(fixedHeightSize) + ea,
        marginLeft: String(margin) + ea,
        marginTop: String(margin) + ea,
        background: GeneralJs.colorChip.white,
        borderRadius: String(5) + ea,
        cursor: "pointer",
      };

      nameStyle = {
        position: "absolute",
        fontSize: String(nameFontSize) + ea,
        fontWeight: String(500),
        top: String(GeneralJs.isMac() ? titleTop : titleTop + 4) + ea,
        left: String(intend) + ea,
        color: GeneralJs.colorChip.black,
        cursor: "pointer",
      };

      proidStyle = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(200),
        top: String(titleTop + (nameFontSize - fontSize + 2) + (GeneralJs.isMac() ? 0 : 2)) + ea,
        color: GeneralJs.colorChip.green,
        cursor: "pointer",
      };

      barStyle = {
        position: "absolute",
        background: GeneralJs.colorChip.gray2,
        top: String(startTop + 13 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(intend) + ea,
        width: String(totalWidth) + ea,
        height: String(1) + ea,
      };

      //info style
      styles = [];
      for (let i = 0; i < DataPatch.projectCardViewStandard().info.length; i++) {
        temp = {
          position: "absolute",
          fontSize: String(fontSize) + ea,
          fontWeight: String(500),
          top: String(startTop + (lineHeight * (i + 1)) + (DataPatch.projectCardViewStandard().exceptionHeight[i] ? exceptionMargin : 0) + (GeneralJs.isMac() ? 0 : 3)) + ea,
          left: String(intend) + ea,
          width: String(totalWidth) + ea,
          color: GeneralJs.colorChip.black,
          lineHeight: String(1.5),
        };
        styles.push(temp);
      }

      //area style
      areaStyle = {
        position: "relative",
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        marginTop: String(margin * 1.75) + ea,
        paddingTop: String(margin * 1.2) + ea,
        paddingBottom: String(margin * 1.2) + ea,
        paddingRight: String(margin * 1.2) + ea,
        paddingLeft: String(margin * 10) + ea,
        border: "1px dashed " + GeneralJs.colorChip.gray4,
        borderRadius: String(5) + ea,
      };

      areaNameStyle = {
        position: "absolute",
        top: String(margin * (GeneralJs.isMac() ? 1 : 1.07)) + ea,
        left: String(margin * 1.7) + ea,
        fontSize: String(fontSize + 6) + ea,
        fontWeight: String(600),
        color: GeneralJs.colorChip.black,
      };

      areaNumberStyle = {
        position: "absolute",
        top: String((margin * (GeneralJs.isMac() ? 1 : 1.07)) + ((fontSize + 6) * 1.368421052631579)) + ea,
        left: String(margin * 1.7) + ea,
        fontSize: String(fontSize + 4) + ea,
        fontWeight: String(200),
        color: GeneralJs.colorChip.gray5,
      };

      areaTongStyle = {
        position: "relative",
        paddingBottom: String(margin) + ea,
        minHeight: String(fixedHeightSize + margin) + ea,
        background: GeneralJs.colorChip.gray1,
        borderRadius: String(5) + ea,
      };

      //set map
      division = new Map();
      numbers = new Map();

      //update value
      updateState = async function (from, to) {
        try {
          let toValue;
          let proid, originalStatus, index;
          let motherDiv, originalDiv;
          let column;
          let finalValue;

          proid = from.getAttribute("proid");
          index = from.getAttribute("index");
          originalStatus = from.getAttribute("thisStatus");

          numbers.get(originalStatus).setAttribute("number", String(Number(numbers.get(originalStatus).getAttribute("number")) - 1));
          numbers.get(originalStatus).textContent = numbers.get(originalStatus).getAttribute("number") + "명";
          numbers.get(to).setAttribute("number", String(Number(numbers.get(to).getAttribute("number")) + 1));
          numbers.get(to).textContent = numbers.get(to).getAttribute("number") + "명";

          from.setAttribute("thisStatus", to);
          if (to === "드랍" || to === "홀딩") {
            from.setAttribute("dropDetail", originalStatus);
          } else if (from.hasAttribute("dropDetail")) {
            from.setAttribute("dropDetail", "");
          }

          column = "status";

          motherDiv = document.querySelectorAll('.' + proid)[0];
          for (let i = 0; i < motherDiv.children.length; i++) {
            if (motherDiv.children[i].getAttribute("column") === column) {
              originalDiv = motherDiv.children[i];
            }
          }

          if (to === "계약 전") {
            toValue = "대기";
          } else if (to === "미팅 전") {
            toValue = "진행중";
          } else if (to === "잔금 전") {
            toValue = "진행중";
          } else if (to === "촬영 전") {
            toValue = "진행중";
          } else if (to === "공유 전") {
            toValue = "진행중";
          } else if (to === "완료") {
            toValue = "완료";
          } else if (to === "홀딩") {
            toValue = "홀딩";
          } else if (to === "드랍") {
            toValue = "드랍";
          }

          finalValue = GeneralJs.vaildValue(column, toValue, originalStatus);

          instance.cases[Number(index)][column] = finalValue;
          await GeneralJs.updateValue({
            thisId: proid,
            requestIndex: 0,
            column: column,
            pastValue: originalStatus,
            value: finalValue,
            index: Number(index),
            thisCase: instance.cases[Number(index)]
          });

          originalDiv.textContent = finalValue;

        } catch (e) {
          GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
          console.log(e);
        }
      }

      //drag and drop events
      dragstart_event = function (e) {
        e.dataTransfer.setData("dragData", e.target.getAttribute("index"));
      }

      dragend_event = function (e) {
        e.preventDefault();
      }

      dragenter_event = function (e) {
        e.preventDefault();
      }

      dragleave_event = function (e) {
        e.preventDefault();
      }

      dragover_event = function (e) {
        e.preventDefault();
      }

      drop_event = async function (e) {
        try {
          e.preventDefault();
          const index = e.dataTransfer.getData("dragData");
          const targetDom = instance.totalFatherChildren[Number(index) - 1];
          const status = targetDom.getAttribute("thisStatus");
          let area, dropDetail;
          if (e.target.hasAttribute("kinds")) {
            if (e.target.getAttribute("kinds") === "area") {
              area = e.target;
            } else {
              area = e.target.parentElement;
            }
          } else {
            area = e.target.parentElement.parentElement;
          }

          if (area.getAttribute("name") === "계약 전") {
            if (status === "계약 전") {
              //pass
            } else if (status === "미팅 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "잔금 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "촬영 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "공유 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "완료") {
              alert("완료는 되돌릴 수 없습니다!");
            } else if (status === "홀딩") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "계약 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "계약 전");
              } else {
                alert("홀딩 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "계약 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "계약 전");
              } else {
                alert("드랍 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            }
          } else if (area.getAttribute("name") === "미팅 전") {
            if (status === "계약 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "미팅 전") {
              //pass
            } else if (status === "잔금 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "촬영 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "공유 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "완료") {
              alert("완료는 되돌릴 수 없습니다!");
            } else if (status === "홀딩") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "미팅 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "미팅 전");
              } else {
                alert("홀딩 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "미팅 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "미팅 전");
              } else {
                alert("드랍 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            }
          } else if (area.getAttribute("name") === "잔금 전") {
            if (status === "계약 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "미팅 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "잔금 전") {
              //pass
            } else if (status === "촬영 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "공유 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "완료") {
              alert("완료는 되돌릴 수 없습니다!");
            } else if (status === "홀딩") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "잔금 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "잔금 전");
              } else {
                alert("홀딩 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "잔금 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "잔금 전");
              } else {
                alert("드랍 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            }
          } else if (area.getAttribute("name") === "촬영 전") {
            if (status === "계약 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "미팅 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "잔금 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "촬영 전") {
              //pass
            } else if (status === "공유 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "완료") {
              alert("완료는 되돌릴 수 없습니다!");
            } else if (status === "홀딩") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "촬영 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "촬영 전");
              } else {
                alert("홀딩 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "촬영 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "촬영 전");
              } else {
                alert("드랍 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            }
          } else if (area.getAttribute("name") === "공유 전") {
            if (status === "계약 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "미팅 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "잔금 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "촬영 전") {
              alert("날짜 체크로 상태를 제어해주세요!");
            } else if (status === "공유 전") {
              //pass
            } else if (status === "완료") {
              area.appendChild(targetDom);
              await updateState(targetDom, "공유 전");
            } else if (status === "홀딩") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "공유 전" || dropDetail === "완료") {
                area.appendChild(targetDom);
                await updateState(targetDom, "공유 전");
              } else {
                alert("홀딩 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "공유 전" || dropDetail === "완료") {
                area.appendChild(targetDom);
                await updateState(targetDom, "공유 전");
              } else {
                alert("드랍 이전 상태가 '" + dropDetail + "'이었습니다!")
              }
            }
          } else if (area.getAttribute("name") === "완료") {
            if (status === "계약 전") {
              alert("계약이 필요합니다!");
            } else if (status === "미팅 전") {
              alert("미팅 확인이 필요합니다!");
            } else if (status === "잔금 전") {
              alert("잔금 확인이 필요합니다!");
            } else if (status === "촬영 전") {
              alert("촬영 확인이 필요합니다!");
            } else if (status === "공유 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "완료");
            } else if (status === "완료") {
              //pass
            } else if (status === "홀딩") {
              alert("홀딩에서 완료로 될 수 없습니다!");
            } else if (status === "드랍") {
              alert("드랍에서 완료로 될 수 없습니다!");
            }
          } else if (area.getAttribute("name") === "홀딩") {
            if (status === "계약 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "미팅 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "잔금 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "촬영 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "공유 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "완료") {
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            } else if (status === "홀딩") {
              //pass
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              area.appendChild(targetDom);
              await updateState(targetDom, "홀딩");
            }
          } else if (area.getAttribute("name") === "드랍") {
            if (status === "계약 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "미팅 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "잔금 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "촬영 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "공유 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "완료") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "홀딩") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "드랍") {
              //pass
            }
          }

          e.stopPropagation();
        } catch (err) {
          console.log(err);
        }
      }

      //make division
      divisionName = [
        "계약 전",
        "미팅 전",
        "잔금 전",
        "촬영 전",
        "공유 전",
        "완료",
        "홀딩",
        "드랍",
      ];
      for (let i = 0; i < divisionName.length; i++) {
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let i in areaStyle) {
          div_clone.style[i] = areaStyle[i];
        }

        //title
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.textContent = divisionName[i];
        for (let i in areaNameStyle) {
          div_clone2.style[i] = areaNameStyle[i];
        }
        div_clone.appendChild(div_clone2);

        //number
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.textContent = String(0) + "명";
        for (let i in areaNumberStyle) {
          div_clone2.style[i] = areaNumberStyle[i];
        }
        div_clone2.setAttribute("kinds", "number");
        numbers.set(divisionName[i], div_clone2);
        div_clone.appendChild(div_clone2);

        //tong
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in areaTongStyle) {
          div_clone2.style[i] = areaTongStyle[i];
        }
        div_clone2.setAttribute("kinds", "area");
        div_clone2.setAttribute("name", divisionName[i]);
        division.set(divisionName[i], div_clone2);
        div_clone.appendChild(div_clone2);

        totalFather.appendChild(div_clone);

        div_clone2.addEventListener("dragenter", dragenter_event);
        div_clone2.addEventListener("dragleave", dragleave_event);
        div_clone2.addEventListener("dragover", dragover_event);
        div_clone2.addEventListener("drop", drop_event);
      }

      //make card
      instance.totalFatherChildren = [];

      num = 0;
      for (let obj of cases) {
        if (num !== 0) {

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          //name
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.name;
          for (let i in nameStyle) {
            div_clone2.style[i] = nameStyle[i];
          }
          div_clone2.addEventListener("click", instance.whiteViewMaker(num));
          div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.proid));
          div_clone.appendChild(div_clone2);

          //proid
          proidStyle.left = String(intend + GeneralJs.calculationWordWidth(nameFontSize, obj.name, true)) + ea;
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.proid;
          for (let i in proidStyle) {
            div_clone2.style[i] = proidStyle[i];
          }
          div_clone2.addEventListener("click", instance.whiteViewMaker(num));
          div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.proid));
          div_clone.appendChild(div_clone2);

          //bar
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          for (let i in barStyle) {
            div_clone2.style[i] = barStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //sub info
          for (let j = 0; j < DataPatch.projectCardViewStandard().info.length; j++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("father_" + DataPatch.projectCardViewStandard().info[j]);
            div_clone2.textContent = obj[DataPatch.projectCardViewStandard().info[j]];
            for (let i in styles[j]) {
              div_clone2.style[i] = styles[j][i];
            }
            div_clone.appendChild(div_clone2);
          }

          div_clone.setAttribute("index", String(num));
          div_clone.setAttribute("kinds", "card");
          div_clone.setAttribute("proid", obj.proid);

          if (/^1[6789]/.test(obj.firstDate)) {

            div_clone.setAttribute("thisStatus", "계약 전");
            division.get("계약 전").appendChild(div_clone);

          } else if (/^1[6789]/.test(obj.meetingDate) || GeneralJs.compareDate(obj.meetingDate)) {

            div_clone.setAttribute("thisStatus", "미팅 전");
            division.get("미팅 전").appendChild(div_clone);

          } else if (/^1[6789]/.test(obj.remainDate)) {

            div_clone.setAttribute("thisStatus", "잔금 전");
            division.get("잔금 전").appendChild(div_clone);

          } else if (/^1[6789]/.test(obj.contentsPhotoDate) || GeneralJs.compareDate(obj.contentsPhotoDate)) {

            div_clone.setAttribute("thisStatus", "촬영 전");
            division.get("촬영 전").appendChild(div_clone);

          } else if (obj.status === "진행중") {

            div_clone.setAttribute("thisStatus", "공유 전");
            division.get("공유 전").appendChild(div_clone);

          } else if (obj.status === "완료") {

            div_clone.setAttribute("thisStatus", "완료");
            division.get("완료").appendChild(div_clone);

          } else if (obj.status === "홀딩") {

            div_clone.setAttribute("thisStatus", "홀딩");
            if (/^1[6789]/.test(obj.firstDate)) {
              div_clone.setAttribute("dropDetail", "계약 전");
            } else if (/^1[6789]/.test(obj.meetingDate) || !GeneralJs.compareDate(obj.meetingDate)) {
              div_clone.setAttribute("dropDetail", "미팅 전");
            } else if (/^1[6789]/.test(obj.remainDate)) {
              div_clone.setAttribute("dropDetail", "잔금 전");
            } else if (/^1[6789]/.test(obj.contentsPhotoDate) || !GeneralJs.compareDate(obj.contentsPhotoDate)) {
              div_clone.setAttribute("dropDetail", "촬영 전");
            } else {
              div_clone.setAttribute("dropDetail", "공유 전");
            }
            division.get("홀딩").appendChild(div_clone);

          } else if (obj.status === "드랍") {

            div_clone.setAttribute("thisStatus", "드랍");
            if (/^1[6789]/.test(obj.firstDate)) {
              div_clone.setAttribute("dropDetail", "계약 전");
            } else if (/^1[6789]/.test(obj.meetingDate) || !GeneralJs.compareDate(obj.meetingDate)) {
              div_clone.setAttribute("dropDetail", "미팅 전");
            } else if (/^1[6789]/.test(obj.remainDate)) {
              div_clone.setAttribute("dropDetail", "잔금 전");
            } else if (/^1[6789]/.test(obj.contentsPhotoDate) || !GeneralJs.compareDate(obj.contentsPhotoDate)) {
              div_clone.setAttribute("dropDetail", "촬영 전");
            } else {
              div_clone.setAttribute("dropDetail", "공유 전");
            }
            division.get("드랍").appendChild(div_clone);

          } else {
            throw new Error("invaild status : " + obj.status);
          }

          div_clone.setAttribute("draggable", "true");
          div_clone.addEventListener("dragstart", dragstart_event);
          div_clone.addEventListener("dragend", dragend_event);
          div_clone.addEventListener("dragenter", dragenter_event);
          div_clone.addEventListener("dragleave", dragleave_event);

          instance.totalFatherChildren.push(div_clone);
        }
        num++;
      }

      numbers.forEach((value, key, map) => {
        numbers.get(key).textContent = String(division.get(key).children.length) + "명";
        numbers.get(key).setAttribute("number", String(division.get(key).children.length));
      });

      totalFather.style.paddingLeft = String(margin * 0.75) + ea;
      totalFather.style.paddingRight = String(margin * 0.75) + ea;
      totalFather.style.height = "calc(100vh - " + String(instance.belowHeight) + "px)";
      totalFather.style.width = "calc(100vw - " + String(margin * 0.75) + ea + " - " + String(margin * 0.75) + ea + ")";
      totalFather.style.zIndex = String(1);

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.style.height = String(margin * 2) + ea;
      totalFather.appendChild(div_clone);

      totalFather.classList.add("fadein");

      totalContents.appendChild(totalFather);
      instance.totalFather = totalFather;
    }
    instance.onView = "father";
  }
}

ProjectJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  const cookies = GeneralJs.getCookiesAll();
  const map = DataPatch.projectMap();
  const { chainingTargets, chainingMethods } = DataPatch.projectChainingTarget();
  let { standard, info } = DataPatch.projectWhiteViewStandard();
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, textArea_clone;
  let propertyBox, historyBox;
  let style;
  let ea = "px";
  let titleHeight, titleFontSize, topMargin, leftMargin;
  let fontSize;
  let motherHeight;
  let rightArrowBox, leftArrowBox;
  let rightArrow, leftArrow;
  let hInitial, hInitialBox;
  let rInitial, rInitialBox;
  let updateEventFunction;
  let contentsBoxHeight, contentsBoxBottom;
  let lineHeightRatio;
  let historyTongTarget, historyTargetHeightConst;
  let visualSpecificMarginTop;
  let textAreas;
  let notionEvent;
  let historyFocusEvent, historyBlurEvent;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;

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
  notionEvent = instance.makeClipBoardEvent(thisCase[standard[1]]);

  //title ------------------------------------------

  leftMargin = (60 / 786) * motherHeight;
  titleFontSize = (42 / 786) * motherHeight;
  topMargin = leftMargin * (62 / 60);
  titleHeight = (54 / 42) * titleFontSize;

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
  div_clone3.addEventListener("click", notionEvent);
  div_clone2.appendChild(div_clone3);

  //proid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[1]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: GeneralJs.colorChip.green,
    fontSize: String(titleFontSize * (19 / 42)) + ea,
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * (thisCase[standard[0]].length === 4 ? 3.6 : (thisCase[standard[0]].length === 2 ? 2.3 : 3))) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", notionEvent);
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
  hInitial.style.right = String(leftMargin + (leftMargin * (35.5 / 60))) + ea;
  hInitial.style.width = String(leftMargin * (GeneralJs.isMac() ? (10 / 60) : (11 / 60))) + ea;
  div_clone2.appendChild(hInitial);

  //h initial button
  hInitialBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    hInitialBox.style[i] = style[i];
  }
  hInitialBox.style.right = String(leftMargin + (leftMargin * (31 / 60))) + ea;
  hInitialBox.style.height = String(leftMargin * (20 / 60)) + ea;
  hInitialBox.style.width = String(leftMargin * (18 / 60)) + ea;
  hInitialBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  div_clone2.appendChild(hInitialBox);

  //r initial icon
  rInitial = SvgTong.stringParsing(this.mother.returnRinitial(GeneralJs.colorChip.green));
  for (let i in style) {
    rInitial.style[i] = style[i];
  }
  rInitial.style.right = String(leftMargin + (1.4 * leftMargin * (GeneralJs.isMac() ? (35.5 / 60) : (36 / 60)))) + ea;
  rInitial.style.width = String(leftMargin * (GeneralJs.isMac() ? (9.7 / 60) : (10.7 / 60))) + ea;
  div_clone2.appendChild(rInitial);

  //r initial button
  rInitialBox = GeneralJs.nodes.div.cloneNode(true);
  rInitialBox.classList.add("hoverdefault_reverse");
  for (let i in style) {
    rInitialBox.style[i] = style[i];
  }
  rInitialBox.style.opacity = '';
  rInitialBox.style.right = String(leftMargin + (1.5 * leftMargin * (31 / 60))) + ea;
  rInitialBox.style.height = String(leftMargin * (20 / 60)) + ea;
  rInitialBox.style.width = String(leftMargin * (18 / 60)) + ea;
  rInitialBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  rInitialBox.style.background = GeneralJs.colorChip.white;
  div_clone2.appendChild(rInitialBox);

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

  div_clone.appendChild(div_clone2);

  //contents ---------------------------------------------------------------------------------

  //property
  contentsBoxHeight = motherHeight - titleHeight - (topMargin * 2.5);
  contentsBoxBottom = topMargin;
  fontSize = (contentsBoxHeight / (info.length + 1)) / 1.8;
  lineHeightRatio = ((contentsBoxHeight - fontSize) / fontSize) / (info.length + 1 - 1);

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
        let temp, tempFunction;
        let thisCaseOriginal;
        let chainingFinalValue;
        let idDom;
        let idDomChildren;
        let targetOriginalRowDiv, targetOriginalDiv;
        let motherChildren;

        if ((e.type === "keypress" && GeneralJs.confirmKey.includes(e.key)) || e.type === "click" || e.type === "message") {
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
              idDom = dom;
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

          thisCaseOriginal = instance.cases[thisCase["index"]];

          if (chainingTargets.includes(column)) {
            idDomChildren = idDom.children;
            motherChildren = mother.parentNode.children;
            tempFunction = chainingMethods[column];
            let { chainingColumns, chainingValues } = tempFunction(thisCaseOriginal, finalValue);
            for (let c of chainingColumns) {
              chainingFinalValue = GeneralJs.vaildValue(c, chainingValues[c], thisCaseOriginal[c]);
              await GeneralJs.updateValue({
                thisId: thisId,
                requestIndex: String(requestIndex),
                column: c,
                pastValue: thisCaseOriginal[c],
                value: chainingFinalValue,
                index: Number(thisCase["index"]),
                thisCase: thisCaseOriginal,
              });
              thisCaseOriginal[c] = chainingFinalValue;
              targetOriginalRowDiv = null;
              targetOriginalDiv = null;
              for (let dom of idDomChildren) {
                if (dom.getAttribute("column") === c) {
                  targetOriginalRowDiv = dom;
                }
              }
              for (let dom of motherChildren) {
                if (dom.getAttribute("index") === c) {
                  targetOriginalDiv = dom.children[1];
                }
              }

              if (targetOriginalRowDiv !== null) {
                if (GeneralJs.moneyBoo(c)) {
                  targetOriginalRowDiv.textContent = GeneralJs.autoComma(chainingFinalValue);
                } else {
                  targetOriginalRowDiv.textContent = chainingFinalValue;
                }
              }

              if (targetOriginalDiv !== null) {
                if (GeneralJs.moneyBoo(c)) {
                  targetOriginalDiv.textContent = GeneralJs.autoComma(chainingFinalValue);
                } else {
                  targetOriginalDiv.textContent = chainingFinalValue;
                }
              }

            }
          }

          await GeneralJs.updateValue({
            thisId: thisId,
            requestIndex: requestIndex,
            column: column,
            pastValue: pastRawData,
            value: finalValue,
            index: thisCase["index"],
            thisCase: thisCaseOriginal,
          });

          await instance.globalChaining(thisCase, column, finalValue, pastRawData);

          if (instance.totalFather !== null) {
            for (let father of instance.totalFatherChildren) {
              if (Number(father.getAttribute("index")) === thisCase["index"]) {
                if (father.querySelector(".father_" + column) !== null) {
                  fatherTarget = father.querySelector(".father_" + column);
                }
              }
            }
            if (fatherTarget !== null) {
              if (map[column].moneyBoo === true) {
                fatherTarget.textContent = GeneralJs.autoComma(finalValue);
              } else {
                fatherTarget.textContent = finalValue;
              }
            }
          }
          thisCaseOriginal[column] = finalValue;
          if (map[column].moneyBoo === true) {
            originalDiv.textContent = GeneralJs.autoComma(finalValue);
            targetDom.textContent = GeneralJs.autoComma(finalValue);
          } else {
            originalDiv.textContent = finalValue;
            targetDom.textContent = finalValue;
          }

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
          color: GeneralJs.colorChip.green,
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
            color: GeneralJs.colorChip.green,
            zIndex: String(3),
            borderRadius: String(3) + ea,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.shadow,
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
              top: String(((height * 1.9) * (i + 1)) - top) + ea,
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
            boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.gray5,
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
            e.key = "Enter";
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
    const { info } = DataPatch.projectWhiteViewStandard();
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

    window.localStorage.setItem("project_whiteOrder", JSON.stringify(thisStorage));

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
    width: "calc(45% - " + String(leftMargin) + ea + ")",
    height: "100%",
  };
  for (let i in style) {
    propertyBox.style[i] = style[i];
  }

  if (window.localStorage.getItem("project_whiteOrder") !== null && window.localStorage.getItem("project_whiteOrder") !== undefined) {
    info = JSON.parse(window.localStorage.getItem("project_whiteOrder"));
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
    if (map[info[i].target].moneyBoo !== undefined) {
      div_clone4.textContent = GeneralJs.autoComma(thisCase[info[i].target]);
    } else {
      div_clone4.textContent = thisCase[info[i].target];
    }
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

  //referrer links
  GeneralJs.ajax("noFlat=true&where=" + JSON.stringify({ proid: thisCase["proid"] }), "/getProjects", function (data) {
    const { proid, cliid, desid } = JSON.parse(data)[0];
    let div_clone3, div_clone4, div_clone5;
    let style = {};
    let ea = "px";
    let referrerLinks;
    let bTagStyle;

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.setAttribute("index", "referrerLinks");
    style = {
      position: "absolute",
      top: String(fontSize * lineHeightRatio * (info.length)) + ea,
      left: String(0) + ea,
      width: "100%",
      height: String(16) + ea,
    };
    for (let i in style) {
      div_clone3.style[i] = style[i];
    }

    //column name
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.textContent = "참조 링크";
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
    for (let i in style) {
      div_clone4.style[i] = style[i];
    }
    div_clone3.appendChild(div_clone4);

    //value
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
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
    for (let i in style) {
      div_clone4.style[i] = style[i];
    }

    //value detail
    bTagStyle = '<b style="font-size:' + String(fontSize - 2) + ea + ';color:' + GeneralJs.colorChip.green + '">';
    referrerLinks = [
      {
        tag: "고객 " + bTagStyle + cliid + "</b>",
        eventFunction: function (e) {
          let target = window.location.protocol + "//" + window.location.host + "/client?cliid=" + cliid;
          window.open(target, "_blank");
        }
      },
      {
        tag: "디자이너 " + bTagStyle + desid + "</b>",
        eventFunction: function (e) {
          let target = window.location.protocol + "//" + window.location.host + "/designer?desid=" + desid;
          window.open(target, "_blank");
        }
      },
      {
        tag: "제안서 " + bTagStyle + proid + "</b>",
        eventFunction: function (e) {
          let target = window.location.protocol + "//" + window.location.host + "/proposal?proid=" + proid;
          window.open(target, "_blank");
        }
      },
    ];
    for (let { tag, eventFunction } of referrerLinks) {
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      div_clone5.classList.add("hoverDefault");
      div_clone5.insertAdjacentHTML("beforeend", tag);
      div_clone5.addEventListener("click", eventFunction);
      style = {
        display: "inline-block",
        position: "relative",
        marginRight: String(18) + ea,
        height: String(fontSize * (21 / 16)) + ea,
        fontSize: String(fontSize) + ea,
        fontWeight: String(600),
        cursor: "pointer",
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone4.appendChild(div_clone5);
    }
    div_clone3.appendChild(div_clone4);

    propertyBox.appendChild(div_clone3);
  });

  div_clone2.appendChild(propertyBox);
  this.whiteBox.propertyBox = propertyBox;

  //history box
  historyBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    height: "100%",
    bottom: String(0) + ea,
    right: String(leftMargin) + ea,
    width: "calc(55% - " + String(leftMargin) + ea + ")",
  };
  for (let i in style) {
    historyBox.style[i] = style[i];
  }

  //histoty title box
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = "HISTORY";
  style = {
    position: "absolute",
    width: String(fontSize * 6) + ea,
    height: "100%",
    fontSize: String(fontSize) + ea,
    fontWeight: String(700),
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  historyBox.appendChild(div_clone3);

  //history text box tong
  historyTongTarget = [
    { column: "history", name: "진행 상황", dom: null },
    { column: "designer", name: "디자이너 관련", dom: null },
    { column: "client", name: "고객 관련", dom: null },
    { column: "photo", name: "촬영 관련", dom: null },
  ];
  visualSpecificMarginTop = fontSize * (1 / 5);
  historyTargetHeightConst = (fontSize * 0.92) + visualSpecificMarginTop;
  textAreas = [];

  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    left: String(fontSize * 6) + ea,
    width: "calc(100% - " + String((fontSize * 6) + 1) + ea + ")",
    height: "100%",
    fontSize: String(fontSize) + ea,
    fontWeight: String(300),
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }

  for (let i = 0; i < historyTongTarget.length; i++) {

    //focus event
    historyFocusEvent = function (e) {
      const thisIndex = i;
      for (let { dom } of historyTongTarget) {
        if (Number(dom.getAttribute("index")) !== thisIndex) {
          dom.style.height = "calc(" + String(5) + "% - " + String(historyTargetHeightConst) + ea + ")";
        } else {
          this.parentElement.scroll(0, 0);
          dom.style.height = "calc(" + String(100 - (5 * (historyTongTarget.length - 1))) + "% - " + String(historyTargetHeightConst) + ea + ")";
        }
      }
      this.style.color = GeneralJs.colorChip.black;
    }

    //blur event
    historyBlurEvent = function (e) {
      const thisIndex = i;
      let target;
      for (let { dom } of historyTongTarget) {
        // dom.style.height = "calc(" + String(100 / historyTongTarget.length) + "% - " + String(historyTargetHeightConst) + ea + ")";
        if (Number(dom.getAttribute("index")) === thisIndex) {
          target = dom.querySelector("textarea");
        }
      }
      this.style.color = GeneralJs.colorChip.gray4;
      GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, '') + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateProjectHistory", function (res) {});
    }

    //margin box
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      width: "100%",
      height: String(i === 0 ? fontSize * (1 / 5) : fontSize) + ea,
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }
    div_clone3.appendChild(div_clone4);

    //contents box
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      width: "100%",
      marginTop: String(visualSpecificMarginTop) + ea,
      height: "calc(" + String(100 / historyTongTarget.length) + "% - " + String(historyTargetHeightConst) + ea + ")",
      fontSize: String(fontSize) + ea,
      fontWeight: String(300),
      border: "solid 1px " + GeneralJs.colorChip.gray3,
      borderRadius: String(5) + ea,
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }

    //title
    div_clone5 = GeneralJs.nodes.div.cloneNode(true);
    div_clone5.textContent = historyTongTarget[i].name;
    style = {
      position: "absolute",
      top: String(((fontSize * (GeneralJs.isMac() ? (5 / 15.3027) : (4 / 15.3027))) + visualSpecificMarginTop) * -1) + ea,
      left: String(fontSize * (2 / 15.3027) * -1) + ea,
      fontSize: String(fontSize) + ea,
      fontWeight: String(600),
      color: GeneralJs.colorChip.black,
      background: GeneralJs.colorChip.white,
      paddingBottom: String(fontSize * (7 / 15.3027)) + ea,
      paddingRight: String(fontSize * (12 / 15.3027)) + ea,
      cursor: "pointer",
    };
    for (let j in style) {
      div_clone5.style[j] = style[j];
    }
    div_clone5.addEventListener("click", historyFocusEvent);
    div_clone4.appendChild(div_clone5);

    //textarea tong
    div_clone5 = GeneralJs.nodes.div.cloneNode(true);
    div_clone5.classList.add("noScrollBar");
    style = {
      position: "absolute",
      bottom: String(0) + ea,
      left: String(fontSize * (15 / 15.3027)) + ea,
      width: "calc(100% - " + String(fontSize * (30 / 15.3027)) + ea + ")",
      height: "calc(100% - " + String(fontSize * (21 / 15.3027)) + ea + ")",
      overflow: "scroll",
    };
    for (let j in style) {
      div_clone5.style[j] = style[j];
    }

    textArea_clone = GeneralJs.nodes.textarea.cloneNode(true);
    style = {
      width: "100%",
      height: String(5000) + ea,
      fontSize: String(fontSize * 0.9) + ea,
      fontWeight: String(200),
      color: GeneralJs.colorChip.gray5,
      border: String(0),
      outline: String(0),
      lineHeight: String(1.6),
      background: GeneralJs.colorChip.white,
    };
    for (let j in style) {
      textArea_clone.style[j] = style[j];
    }
    textArea_clone.addEventListener("focus", historyFocusEvent);
    textArea_clone.addEventListener("blur", historyBlurEvent);
    if (i === historyTongTarget.length - 1) {
      textArea_clone.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          this.blur();
        }
      });
    }

    div_clone5.appendChild(textArea_clone);
    textAreas.push(textArea_clone);

    div_clone4.appendChild(div_clone5);
    div_clone4.setAttribute("index", String(i));
    historyTongTarget[i].dom = div_clone4;

    div_clone3.appendChild(div_clone4);
  }

  historyBox.appendChild(div_clone3);
  div_clone2.appendChild(historyBox);
  this.whiteBox.historyBox = historyBox;

  //h inital event
  GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
  hInitialBox.addEventListener("click", function (e) {
    if (GeneralJs.stacks["hInitialBoxButtonToggle"] === 0) {
      propertyBox.style.opacity = String(0);
      historyBox.style.width = "calc(100% - " + String(leftMargin * 2) + ea + ")";
      GeneralJs.stacks["hInitialBoxButtonToggle"] = 1;
    } else {
      propertyBox.style.opacity = String(1);
      historyBox.style.width = "calc(55% - " + String(leftMargin) + ea + ")";
      GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
    }
  });

  //r initial event
  //dev ===================================================================================

  rInitialBox.addEventListener("click", function (e) {
    const { colorChip, createNode, createNodes, withOut } = GeneralJs;
    let matrixBox;
    let baseBox;
    let margin, marginLeft;
    let scrollBox;
    let checkListBlocks;
    let titleTargets;
    let processTargets, processTong;
    let circleMargin;
    let temp;
    let processFontSize;
    let marginBottom, marginBottom2;
    let clientCheckListTargets, clientCheckList;
    let whiteCardWidth, whiteCardMargin;
    let designerCheckList;

    margin = 20;
    marginLeft = 22;
    circleMargin = 8;
    marginBottom = 13;
    marginBottom2 = 24;
    whiteCardWidth = 200;
    whiteCardMargin = 10;

    matrixBox = historyBox.cloneNode(false);
    historyBox.parentElement.appendChild(matrixBox);

    baseBox = createNode({
      mother: matrixBox,
      style: {
        position: "relative",
        boxSizing: "border-box",
        border: "1px solid " + colorChip.gray3,
        borderRadius: String(5) + ea,
        width: String(100) + '%',
        height: String(100) + '%'
      }
    });

    scrollBox = createNode({
      mother: baseBox,
      style: {
        position: "relative",
        top: String(margin) + ea,
        left: String(marginLeft) + ea,
        overflow: "scroll",
        width: withOut(String(marginLeft * 2), ea),
        height: withOut(String(margin * 2), ea),
      }
    });

    checkListBlocks = createNodes([
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom + 1) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom2) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom2) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom2) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom) + ea,
        },
      },
      {
        mother: scrollBox,
        style: {
          position: "relative",
          marginBottom: String(marginBottom2) + ea,
        },
      },
    ]);

    titleTargets = [
      {
        target: checkListBlocks[0],
        text: [ "current", "process" ]
      },
      {
        target: checkListBlocks[2],
        text: [ "client", "checklist" ]
      },
      {
        target: checkListBlocks[4],
        text: [ "designer", "checklist" ]
      },
      {
        target: checkListBlocks[6],
        text: [ "project", "calendar" ]
      },
    ];

    for (let { target, text } of titleTargets) {
      createNodes([
        {
          mother: target,
          text: text[0],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(18) + ea,
            fontFamily: "graphik",
            fontWeight: String(100),
            marginRight: String(6) + ea,
            marginLeft: String(2) + ea,
          }
        },
        {
          mother: target,
          text: text[1],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(18) + ea,
            fontFamily: "graphik",
            fontWeight: String(400),
            fontStyle: "italic",
          }
        }
      ]);
    }

    processTong = checkListBlocks[1];
    processTargets = [
      {
        target: processTong,
        progress: 0,
        text: "현장 대기",
        client: [
          { text: "선호 사진 전송", check: 1 },
          { text: "현장 사진 전송", check: 1 },
          { text: "요구 사항 확인", check: 1 },
          { text: "분양 평수 확인", check: 1 },
          { text: "시공 가능 여부 확인", check: 1 }
        ],
        designer: [
          { text: "가능 시간대 확인", check: 1 },
          { text: "가능 일정 확인", check: 1 },
          { text: "스타일링 의뢰서 전송", check: 1 },
          { text: "현장 미팅 일자 확인", check: 1 },
          { text: "미팅 준비 확인", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 0,
        text: "현장 미팅",
        client: [
          { text: "현장 실측 및 촬영", check: 1 },
          { text: "설비 관련 점검", check: 1 },
          { text: "가용 예산 확인", check: 1 },
          { text: "일정 및 요구 사항 점검", check: 1 },
          { text: "디자인 취향 확인", check: 1 }
        ],
        designer: [
          { text: "현장 실측 및 촬영", check: 1 },
          { text: "설비 관련 점검", check: 1 },
          { text: "가용 예산 확인", check: 1 },
          { text: "일정 및 요구 사항 점검", check: 1 },
          { text: "디자인 취향 확인", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 0,
        text: "공간 기획",
        client: [
          { text: "고객 생활 패턴 확인", check: 1 },
          { text: "전체 공간 용도 기획", check: 1 },
          { text: "예산 사용 기획", check: 1 },
          { text: "시공 범위 결정", check: 1 },
          { text: "재사용 범위 결정", check: 1 }
        ],
        designer: [
          { text: "고객 생활 패턴 확인", check: 1 },
          { text: "전체 공간 용도 기획", check: 1 },
          { text: "예산 사용 기획", check: 1 },
          { text: "시공 범위 결정", check: 1 },
          { text: "재사용 범위 결정", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 0,
        text: "예산 계획",
        client: [
          { text: "전체 예산 한도 설정", check: 1 },
          { text: "예산 분배 가이드", check: 1 },
          { text: "영역별 예산 분배", check: 1 },
          { text: "지불 방법 정리", check: 1 },
          { text: "예산 총괄표 수령", check: 1 }
        ],
        designer: [
          { text: "전체 예산 한도 설정", check: 1 },
          { text: "예산 분배 가이드", check: 1 },
          { text: "영역별 예산 분배", check: 1 },
          { text: "지불 방법 정리", check: 1 },
          { text: "예산 총괄표 수령", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 0,
        text: "1차 제안",
        client: [
          { text: "전체 컨샙, 톤 앤 매너", check: 1 },
          { text: "공간 레이아웃 결정", check: 1 },
          { text: "시공 마감재 제안", check: 1 },
          { text: "구매 제품 추천", check: 1 },
          { text: "제작 가구, 패브릭 추천", check: 1 }
        ],
        designer: [
          { text: "전체 컨샙, 톤 앤 매너", check: 1 },
          { text: "공간 레이아웃 결정", check: 1 },
          { text: "시공 마감재 제안", check: 1 },
          { text: "구매 제품 추천", check: 1 },
          { text: "제작 가구, 패브릭 추천", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 0,
        text: "수정 제안",
        client: [
          { text: "수정 횟수 확인", check: 1 },
          { text: "수정 제안 일정 조정", check: 1 },
          { text: "시공 마감재 제안", check: 1 },
          { text: "구매 제품 추천", check: 1 },
          { text: "제작 가구, 패브릭 추천", check: 1 }
        ],
        designer: [
          { text: "수정 횟수 확인", check: 1 },
          { text: "수정 제안 일정 조정", check: 1 },
          { text: "시공 마감재 제안", check: 1 },
          { text: "구매 제품 추천", check: 1 },
          { text: "제작 가구, 패브릭 추천", check: 1 }
        ]
      },
      {
        target: processTong,
        progress: 1,
        text: "시공 진행",
        client: [
          { text: "시공 범위 확인", check: 1 },
          { text: "시공 견적서 제안", check: 1 },
          { text: "공사 일정표 전달", check: 0 },
          { text: "세대내 설비 특징 검토", check: 1 },
          { text: "시공 방법 확인", check: 0 }
        ],
        designer: [
          { text: "시공 범위 확인", check: 1 },
          { text: "시공 견적서 제안", check: 1 },
          { text: "공사 일정표 전달", check: 0 },
          { text: "세대내 설비 특징 검토", check: 1 },
          { text: "시공 방법 확인", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "제품 구매",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "제작 가구",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "배송중",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "제품 설치",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "제작 패브릭",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "부가 서비스",
        client: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ],
        designer: [
          { text: "각 구매처 리뷰 검토", check: 0 },
          { text: "배송 기간, 배송료 확인", check: 0 },
          { text: "최종 배송일 확인", check: 0 },
          { text: "설치 물량 확인", check: 0 },
          { text: "설치 특이사항 점검", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "현장 촬영",
        client: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ],
        designer: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "고객 인터뷰",
        client: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ],
        designer: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ]
      },
      {
        target: processTong,
        progress: 2,
        text: "컨텐츠 공유",
        client: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ],
        designer: [
          { text: "시공 상태 확인", check: 0 },
          { text: "구매 제품 상태 확인", check: 0 },
          { text: "사진 촬영", check: 0 },
          { text: "고객 인터뷰", check: 0 },
          { text: "콘텐츠 공유", check: 0 }
        ]
      },
    ];
    clientCheckList = [];
    designerCheckList = [];

    for (let z = 0; z < processTargets.length; z++) {
      temp = (processTargets[z].target.getBoundingClientRect().width - (circleMargin * ((processTargets.length / 2) - 1))) / (processTargets.length / 2);
      processFontSize = temp / 7;
      createNodes([
        {
          mother: processTargets[z].target,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(temp) + ea,
            height: String(temp) + ea,
            borderRadius: String(temp) + ea,
            textAlign: "center",
            marginRight: String((z + 1) % (processTargets.length / 2) === 0 ? 0 : circleMargin) + ea,
            marginBottom: String(z < (processTargets.length / 2) ? circleMargin : 0) + ea,
            overflow: "hidden"
          }
        },
        {
          mother: 0,
          text: processTargets[z].text,
          style: {
            position: "absolute",
            width: String(120) + '%',
            height: String(120) + '%',
            top: String(-10) + '%',
            left: String(-10) + '%',
            transformOrigin: "50% 50%",
            animation: processTargets[z].progress === 1 ? "rotateProgress 1s linear infinite" : "",
            background: processTargets[z].progress <= 1 ? (processTargets[z].progress === 1 ? colorChip.gradientGreen2 : colorChip.deactive) : colorChip.gray1,
            opacity: processTargets[z].progress === 0 ? String(1) : String(1),
          }
        },
        {
          mother: 0,
          text: processTargets[z].text,
          style: {
            position: "absolute",
            fontSize: String(processFontSize) + ea,
            fontWeight: String(600),
            color: processTargets[z].progress <= 1 ? (processTargets[z].progress === 1 ? colorChip.white : colorChip.gray0) : colorChip.deactive,
            width: String(100) + '%',
            textAlign: "center",
            top: String((temp / 2) - (processFontSize / 2) - 3) + ea,
          }
        },
      ]);

      clientCheckList.push({
        mother: 1,
        style: {
          display: "inline-block",
          position: "relative",
          background: processTargets[z].progress <= 1 ? colorChip.white : colorChip.gray2,
          borderRadius: String(3) + ea,
          width: String(whiteCardWidth) + ea,
          top: String(whiteCardMargin) + ea,
          height: withOut(String(whiteCardMargin * 2), ea),
          marginLeft: String(whiteCardMargin) + ea,
        },
      });

      clientCheckList.push({
        mother: -1,
        text: "check " + String(z),
        style: {
          position: "absolute",
          fontSize: String(12) + ea,
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: processTargets[z].progress <= 1 ? colorChip.green : colorChip.deactive,
          top: String(12) + ea,
          left: String(14) + ea,
        },
      });

      for (let i = 0; i < (processTargets[z].client.length * 2); i++) {
        if (i % 2 === 0) {
          clientCheckList.push({
            mother: -1 * (i + 1 + 1),
            text: processTargets[z].client[i / 2].text,
            style: {
              position: "absolute",
              fontSize: String(14) + ea,
              fontWeight: String(200),
              color: processTargets[z].progress <= 1 ? colorChip.black : colorChip.deactive,
              width: withOut(String(15), ea),
              left: String(0) + ea,
              top: String(40 + (24 * (i / 2))) + ea,
              textAlign: "right",
            },
          });
        } else {
          clientCheckList.push({
            mother: -1 * (i + 1 + 1),
            mode: "svg",
            source: instance.mother.returnCheckBox(processTargets[z].progress <= 1 ? colorChip.green : colorChip.deactive, processTargets[z].progress === 2),
            style: {
              position: "absolute",
              width: String(10) + ea,
              left: String(15) + ea,
              top: String(40 + 5.5 + (24 * ((i - 1) / 2))) + ea,
            },
          });
        }
      }

      designerCheckList.push({
        mother: 1,
        style: {
          display: "inline-block",
          position: "relative",
          background: processTargets[z].progress <= 1 ? colorChip.white : colorChip.gray2,
          borderRadius: String(3) + ea,
          width: String(whiteCardWidth) + ea,
          top: String(whiteCardMargin) + ea,
          height: withOut(String(whiteCardMargin * 2), ea),
          marginLeft: String(whiteCardMargin) + ea,
        },
      });

      designerCheckList.push({
        mother: -1,
        text: "check " + String(z),
        style: {
          position: "absolute",
          fontSize: String(12) + ea,
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: processTargets[z].progress <= 1 ? colorChip.green : colorChip.deactive,
          top: String(12) + ea,
          left: String(14) + ea,
        },
      });

      for (let i = 0; i < (processTargets[z].designer.length * 2); i++) {
        if (i % 2 === 0) {
          designerCheckList.push({
            mother: -1 * (i + 1 + 1),
            text: processTargets[z].designer[i / 2].text,
            style: {
              position: "absolute",
              fontSize: String(14) + ea,
              fontWeight: String(200),
              color: processTargets[z].progress <= 1 ? colorChip.black : colorChip.deactive,
              width: withOut(String(15), ea),
              left: String(0) + ea,
              top: String(40 + (24 * (i / 2))) + ea,
              textAlign: "right",
            },
          });
        } else {
          designerCheckList.push({
            mother: -1 * (i + 1 + 1),
            mode: "svg",
            source: instance.mother.returnCheckBox(processTargets[z].progress <= 1 ? colorChip.green : colorChip.deactive, processTargets[z].progress === 2),
            style: {
              position: "absolute",
              width: String(10) + ea,
              left: String(15) + ea,
              top: String(40 + 5.5 + (24 * ((i - 1) / 2))) + ea,
            },
          });
        }
      }
    }

    createNodes([
      {
        mother: checkListBlocks[3],
        style: {
          position: "relative",
          left: String(2) + ea,
          width: withOut(String(2 * 2), ea),
          height: String(190) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + ea,
          overflow: "scroll"
        }
      },
      {
        mother: -1,
        style: {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String((whiteCardWidth + whiteCardMargin) * (processTargets.length + 2)) + ea,
          height: String(100) + '%',
        }
      },
      ...clientCheckList
    ]);

    createNodes([
      {
        mother: checkListBlocks[5],
        style: {
          position: "relative",
          left: String(2) + ea,
          width: withOut(String(2 * 2), ea),
          height: String(190) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + ea,
          overflow: "scroll"
        }
      },
      {
        mother: -1,
        style: {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String((whiteCardWidth + whiteCardMargin) * (processTargets.length + 2)) + ea,
          height: String(100) + '%',
        }
      },
      ...designerCheckList
    ]);

    const calendar = instance.mother.makeCalendar(new Date(), function (e) {
      let [ year, month, date ] = this.getAttribute("buttonValue").split("-");
      console.log(year, month, date);
    }, {
      bigMode: true,
      width: withOut(String(2 * 2), ea),
      height: String(520) + ea,
      events: [
        { date: new Date(2021, 3, 6), title: "3차 디자인 제안", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 8), title: "디자인 확정", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 10), title: "시공 견적", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 12), title: "시공사 컨택", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 22), title: "샤시 공정 진행", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 24), title: "도배 공정 진행", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 28), title: "금속 공정 진행", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 29), title: "욕실 공정 진행", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 3, 29), title: "타일 공정 진행", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 4, 10), title: "제품 리스트 발송", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 4, 12), title: "가구 구매 예정일", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 4, 24), title: "제작 가구 완성일", eventFunc: new Function(), hours: false },
        { date: new Date(2021, 4, 30), title: "촬영 예정", eventFunc: new Function(), hours: false },
      ],
    });
    calendar.calendarBase.style.left = String(2) + ea;
    checkListBlocks[7].appendChild(calendar.calendarBase);

    historyBox.style.animation = "fadeout 0.3s ease forwards";
    matrixBox.style.animation = "fadein 0.3s ease forwards";
  });

  //dev ===================================================================================

  //get textAreaTong
  GeneralJs.ajax("id=" + thisCase[standard[1]], "/getProjectHistory", function (res) {
    const dataArr = JSON.parse(res);
    for (let i = 0; i < textAreas.length; i++) {
      textAreas[i].value = dataArr[i];
    }
  });

  div_clone.appendChild(div_clone2);

  //end ---------------------------------------------
  mother.appendChild(div_clone);
}

ProjectJs.prototype.whiteCancelMaker = function (callback = null, recycle = false) {
  const instance = this;
  return function (e) {

    GeneralJs.stacks.whiteBox = 1;

    //color name
    let domTargets;
    for (let z = 0; z < instance.standardDoms.length; z++) {
      if (z !== 0) {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = GeneralJs.colorChip.black;
      } else {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = GeneralJs.colorChip.green;
      }
    }

    //animation
    if (!recycle) {
      instance.whiteBox.cancelBox.classList.remove("justfadein");
      instance.whiteBox.cancelBox.classList.add("justfadeout");
    }
    instance.whiteBox.contentsBox.classList.remove("fadeup");
    instance.whiteBox.contentsBox.classList.add("fadedown");

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

ProjectJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.projectWhiteViewStandard();
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

    for (let z = 1; z < instance.standardDoms.length; z++) {
      if (instance.standardDoms[z].firstChild.textContent === thisCase.proid) {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = GeneralJs.colorChip.green;
      } else {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = GeneralJs.colorChip.gray4;
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
        background: GeneralJs.colorChip.cancelBlack,
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
    for (let dom of document.querySelectorAll('.' + thisCase["proid"])) {
      indexArr.push(Number(dom.getAttribute("index")));
    }
    indexArr.sort((a, b) => { return a - b; });
    for (let z = 0; z < indexArr.length; z++) {
      if (indexArr[z] === index) {
        requestIndex = z;
      }
    }

    div_clone.setAttribute("index", thisCase["proid"]);
    div_clone.setAttribute("request", String(requestIndex));

    style = {
      position: "fixed",
      background: GeneralJs.colorChip.white,
      top: String(margin) + ea,
      left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0 2px 10px -6px " + GeneralJs.colorChip.shadow,
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

ProjectJs.prototype.whiteViewMaker = function (index) {
  const instance = this;
  return function (e) {
    let tempFunc;
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

ProjectJs.prototype.rowViewMaker = function () {
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

ProjectJs.prototype.returnValueEventMaker = function () {
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
    nodeArr.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
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
        if (node.getAttribute("proid") === pastObj.thisId) {
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

ProjectJs.prototype.reportScrollBox = function (data, motherWidth) {
  const instance = this;
  const report = JSON.parse(data);

  let div_clone, div_clone2;
  let style;
  let ea = "px";
  let entireMargin;
  let margin;
  let scrollBox, boxTop, boxWidth, boxHeight, boxNumber;
  let titleBox, titleTop;
  let matrixWidth, matrixBoxMargin;
  let grayBar;
  let boxTitles;
  let contentsBox;
  let contentsBoxMargin;
  let summaryBox, summaryBoxArr;
  let contentsBoxDetail;
  let contentsBoxDetailMargin;
  let contentsBoxDetailProid, contentsBoxDetailName, contentsBoxDetailBar, contentsBoxDetailDate, contentsBoxDetailAmount;
  let contentsBoxDetailProidStyle, contentsBoxDetailNameStyle, contentsBoxDetailBarStyle, contentsBoxDetailDateStyle, contentsBoxDetailAmountStyle;
  let contentsBoxDetailFontSize, contentsBoxDetailContentsMargin;
  let people, money;
  let widthDomTargets, widthDomTargetsObj, widthDomTargetsObjDetail;

  boxTitles = [
    { title: "디자인비 대기", date: false, },
    { title: "디자인비 입금", date: true, },
    { title: "디자인비 환불", date: true, },
    { title: "정산 대기", date: false, },
    { title: "정산 내역", date: true, },
    { title: "정산 환수", date: true, },
  ];

  margin = 12;
  boxNumber = 3;
  boxHeight = "calc(50% - " + String(margin * 1.6) + ea + ")";
  boxWidth = (motherWidth - (margin * (boxNumber + 1 + 4))) / boxNumber;
  boxTop = 90;

  //entire scroll box
  scrollBox = GeneralJs.nodes.div.cloneNode(true);
  scrollBox.classList.add("noScrollBar");
  entireMargin = margin * 3;
  style = {
    position: "relative",
    top: String(boxTop) + ea,
    paddingLeft: String(entireMargin) + ea,
    paddingBottom: String(margin) + ea,
    width: String(motherWidth - entireMargin) + ea,
    height: "calc(100% - " + String(boxTop + margin) + ea + ")",
    overflow: "scroll",
  };
  for (let z in style) {
    scrollBox.style[z] = style[z];
  }

  widthDomTargets = [];
  summaryBoxArr = [];
  for (let i = 0; i < boxTitles.length; i++) {

    widthDomTargetsObj = {};
    widthDomTargetsObj.boxNum = i;

    //numbers
    titleTop = 18;
    titleFontSize = 17;
    contentsBoxMargin = 17;
    contentsBoxDetailMargin = 10;
    matrixBoxMargin = 23;
    matrixWidth = boxWidth - (matrixBoxMargin * 2) - 3;
    contentsBoxDetailFontSize = 14;
    contentsBoxDetailContentsMargin = 13;

    //gray card
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "inline-block",
      position: "relative",
      width: String(boxWidth) + ea,
      height: boxHeight,
      overflow: "scroll",
      marginRight: String(margin) + ea,
      marginBottom: String(margin) + ea,
      fontSize: String(15) + ea,
      background: GeneralJs.colorChip.gray0,
      borderRadius: String(5) + ea,
    };
    for (let z in style) {
      div_clone.style[z] = style[z];
    }

    //title gray bar
    grayBar = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(matrixWidth) + ea,
      right: String(matrixBoxMargin + 1) + ea,
      top: String(titleTop + 11) + ea,
      height: String(0),
      borderTop: "1px solid " + GeneralJs.colorChip.gray3,
    };
    for (let z in style) {
      grayBar.style[z] = style[z];
    }
    div_clone.appendChild(grayBar);

    //title
    titleBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      paddingRight: String(12) + ea,
      fontSize: String(titleFontSize) + ea,
      left: String(matrixBoxMargin + 1) + ea,
      top: String(titleTop + (GeneralJs.isMac() ? 0 : 3)) + ea,
      fontWeight: String(600),
      background: GeneralJs.colorChip.gray0,
    };
    for (let z in style) {
      titleBox.style[z] = style[z];
    }
    titleBox.textContent = boxTitles[i].title;
    div_clone.appendChild(titleBox);

    //contents box
    contentsBox = GeneralJs.nodes.div.cloneNode(true);
    contentsBox.classList.add("noScrollBar");
    style = {
      position: "absolute",
      left: String(matrixBoxMargin + 1) + ea,
      top: String(titleTop + titleFontSize + contentsBoxMargin) + ea,
      width: String(matrixWidth) + ea,
      paddingTop: String(contentsBoxDetailMargin) + ea,
      height: "calc(100% - " + String(((titleTop + titleFontSize + contentsBoxMargin) * 2) + 11 + contentsBoxDetailMargin) + ea + ")",
      border: "1px solid " + GeneralJs.colorChip.gray3,
      borderRadius: String(5) + ea,
      overflow: "scroll",
    };
    for (let z in style) {
      contentsBox.style[z] = style[z];
    }

    people = 0;
    money = 0;
    widthDomTargetsObj.items = [];
    for (let { proid, name, date, amount } of report.projects[i]) {
      widthDomTargetsObjDetail = { proid: null, name: null, bar: null, date: null, amount: null };
      contentsBoxDetail = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetail.classList.add("hoverDefault_lite");
      style = {
        position: "relative",
        background: GeneralJs.colorChip.white,
        width: "calc(100% - " + String(contentsBoxDetailMargin * 2) + ea + ")",
        height: String(contentsBoxDetailMargin * 3.5) + ea,
        borderRadius: String(5) + ea,
        marginBottom: String(contentsBoxDetailMargin) + ea,
        marginLeft: String(contentsBoxDetailMargin) + ea,
        cursor: "pointer",
      };
      for (let z in style) {
        contentsBoxDetail.style[z] = style[z];
      }

      //proid
      contentsBoxDetailProid = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetailProidStyle = {
        position: "absolute",
        top: String(6.5 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(contentsBoxDetailContentsMargin) + ea,
        fontSize: String(contentsBoxDetailFontSize) + ea,
        fontWeight: String(200),
        color: GeneralJs.colorChip.green,
      };
      for (let z in contentsBoxDetailProidStyle) {
        contentsBoxDetailProid.style[z] = contentsBoxDetailProidStyle[z];
      }
      contentsBoxDetailProid.textContent = proid;
      contentsBoxDetail.appendChild(contentsBoxDetailProid);
      widthDomTargetsObjDetail.proid = contentsBoxDetailProid;

      //name
      contentsBoxDetailName = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetailNameStyle = {
        position: "absolute",
        top: String(6.5 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String((GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, proid) * 0.65) + (contentsBoxDetailContentsMargin * 2)) + ea,
        fontSize: String(contentsBoxDetailFontSize) + ea,
        fontWeight: String(500),
      };
      for (let z in contentsBoxDetailNameStyle) {
        contentsBoxDetailName.style[z] = contentsBoxDetailNameStyle[z];
      }
      contentsBoxDetailName.textContent = name;
      contentsBoxDetail.appendChild(contentsBoxDetailName);
      widthDomTargetsObjDetail.name = contentsBoxDetailName;

      //bar
      contentsBoxDetailBar = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetailBarStyle = {
        position: "absolute",
        top: String(16.5) + ea,
        left: String((GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, proid) * 0.65) + (GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, name) * 0.58) + (contentsBoxDetailContentsMargin * 3)) + ea,
        height: String(0),
        width: "calc(100% - " + String((GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, proid) * 0.65) + (GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, name) * 0.58) + (GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, date) * 0.72) + (GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, amount) * 0.81) + (contentsBoxDetailContentsMargin * 5)) + ea + ")",
        borderBottom: "1px solid " + GeneralJs.colorChip.gray2,
      };
      for (let z in contentsBoxDetailBarStyle) {
        contentsBoxDetailBar.style[z] = contentsBoxDetailBarStyle[z];
      }
      contentsBoxDetail.appendChild(contentsBoxDetailBar);
      widthDomTargetsObjDetail.bar = contentsBoxDetailBar;

      //date
      contentsBoxDetailDate = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetailDateStyle = {
        position: "absolute",
        top: String(6.5 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        right: String((GeneralJs.calculationWordWidth(contentsBoxDetailFontSize, amount) * 0.81) + (contentsBoxDetailContentsMargin * 2)) + ea,
        fontSize: String(contentsBoxDetailFontSize) + ea,
        fontWeight: String(200),
        opacity: (boxTitles[i].date ? String(1) : String(0.2)),
      };
      for (let z in contentsBoxDetailDateStyle) {
        contentsBoxDetailDate.style[z] = contentsBoxDetailDateStyle[z];
      }
      contentsBoxDetailDate.textContent = date;
      contentsBoxDetail.appendChild(contentsBoxDetailDate);
      widthDomTargetsObjDetail.date = contentsBoxDetailDate;

      //amount
      contentsBoxDetailAmount = GeneralJs.nodes.div.cloneNode(true);
      contentsBoxDetailAmountStyle = {
        position: "absolute",
        top: String(6.5 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        right: String(contentsBoxDetailContentsMargin) + ea,
        fontSize: String(contentsBoxDetailFontSize) + ea,
        fontWeight: String(500),
      };
      for (let z in contentsBoxDetailAmountStyle) {
        contentsBoxDetailAmount.style[z] = contentsBoxDetailAmountStyle[z];
      }
      contentsBoxDetailAmount.textContent = amount;
      contentsBoxDetail.appendChild(contentsBoxDetailAmount);
      widthDomTargetsObjDetail.amount = contentsBoxDetailAmount;

      contentsBoxDetail.addEventListener("click", function (e) {
        window.open(window.location.protocol + "//" + window.location.host + "/project" + "?proid=" + proid, "_blank");
      });
      contentsBox.appendChild(contentsBoxDetail);

      money = money + Number(amount.replace(/[^0-9]/g, ''));
      people++;
      widthDomTargetsObj.items.push(widthDomTargetsObjDetail);
    }

    div_clone.appendChild(contentsBox);

    //summary
    summaryBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      fontSize: String(titleFontSize + 4) + ea,
      right: String(matrixBoxMargin) + ea,
      bottom: String(titleTop + (margin / 2) - 2 +  + (GeneralJs.isMac() ? 0 : -4)) + ea,
      fontWeight: String(200),
      background: GeneralJs.colorChip.gray0,
    };
    for (let z in style) {
      summaryBox.style[z] = style[z];
    }
    summaryBox.textContent = String(people) + "명 / " + GeneralJs.autoComma(money) + "원";
    summaryBoxArr.push({ dom: summaryBox, people: people, money: money });
    div_clone.appendChild(summaryBox);

    scrollBox.appendChild(div_clone);

    widthDomTargets.push(widthDomTargetsObj);
  }

  //summary calculation
  summaryBoxArr[1].dom.textContent = String(summaryBoxArr[1].people) + "명 / " + GeneralJs.autoComma(summaryBoxArr[1].money - summaryBoxArr[2].money) + "원";
  summaryBoxArr[4].dom.textContent = String(summaryBoxArr[4].people) + "명 / " + GeneralJs.autoComma(summaryBoxArr[4].money - summaryBoxArr[5].money) + "원";

  GeneralJs.timeouts["projectReportDomWidthTimeout"] = setTimeout(function () {
    let temp;
    let ea = "px";
    let visualSpecific = 3;
    let tempWidth;
    let margin;
    for (let i = 0; i < widthDomTargets.length; i++) {
      for (let { amount, bar, date, name, proid } of widthDomTargets[i].items) {
        margin = Number(proid.style.left.replace(/px/gi, ''));
        name.style.left = String((margin * 2) + proid.getBoundingClientRect().width - visualSpecific) + ea;
        date.style.right = String((margin * 2) + amount.getBoundingClientRect().width - visualSpecific) + ea;
        tempWidth = 0;
        tempWidth += Number(name.style.left.replace(/px/gi, '')) + name.getBoundingClientRect().width;
        tempWidth += Number(date.style.right.replace(/px/gi, '')) + date.getBoundingClientRect().width;
        bar.style.width = "calc(100% - " + String(tempWidth + (margin * 2)) + ea + ")";
        bar.style.left = String(Number(name.style.left.replace(/px/gi, '')) + name.getBoundingClientRect().width + margin) + ea;
      }
    }
    clearTimeout(GeneralJs.timeouts["projectReportDomWidthTimeout"]);
    GeneralJs.timeouts["projectReportDomWidthTimeout"] = null;
  }, 0);

  return scrollBox;
}

ProjectJs.prototype.reportContents = function (data, mother, loadingIcon) {
  const instance = this;
  const zeroAddition = function (number) {
    if (typeof number === 'string') {
      number = Number(number);
    }
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    input_clone.style.color = GeneralJs.colorChip.black;
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
  const response = JSON.parse(data);
  const todayString = response.today;

  let todayArr = todayString.split('-');
  let todayRange;
  let div_clone, div_clone2, input_clone;
  let style, inputStyle;
  let ea = "px";
  let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  const scrollBox = this.reportScrollBox(data, motherWidth);
  let top, height, margin;

  todayRange = response.startDay.slice(2) + " ~ " + response.endDay.slice(2);

  //numbers
  top = 0;
  margin = 36;
  height = 90;

  //search box
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(margin) + ea,
    width: String(motherWidth - (margin * 2)) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  //start day
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  inputStyle = {
    position: "absolute",
    left: String(0) + ea,
    top: String(40 + (GeneralJs.isMac() ? 0 : 5)) + ea,
    width: String(500) + ea,
    height: String(30) + ea,
    fontSize: String(29) + ea,
    fontWeight: String(200),
    border: String(0) + ea,
    outline: String(0) + ea,
    color: GeneralJs.colorChip.black,
  };
  for (let i in inputStyle) {
    input_clone.style[i] = inputStyle[i];
  }
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("value", todayRange);
  input_clone.addEventListener("focus", function (e) {
    input_clone.style.color = GeneralJs.colorChip.green;
    GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
  });
  input_clone.addEventListener("blur", function (e) {
    vaildValue(this);
  });
  input_clone.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      vaildValue(this);
      const today = new Date();
      const todayString = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
      const dateArr = this.value.split(" ~ ");
      const startDay = '20' + dateArr[0];
      const endDay = '20' + dateArr[1];
      input_clone.blur();
      mother.removeChild(mother.lastChild);
      loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
      loadingIcon.style.opacity = "1";
      GeneralJs.ajax("today=" + todayString + "&start=" + startDay + "&end=" + endDay, "/getProjectReport", function (data) {
        loadingIcon.style.opacity = "0";
        const scrollBox = instance.reportScrollBox(data, motherWidth);
        mother.appendChild(scrollBox);
      });
    }
  });

  div_clone.appendChild(input_clone);

  //today box
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    fontSize: String(14) + ea,
    fontWeight: String(500) + ea,
    right: String(1) + ea,
    top: String(58) + ea,
    color: GeneralJs.colorChip.green,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.textContent = "today : " + todayString;
  div_clone.appendChild(div_clone2);

  //end
  mother.appendChild(div_clone);

  //scroll box
  mother.appendChild(scrollBox);
}

ProjectJs.prototype.reportViewMakerDetail = function (recycle = false) {
  const instance = this;
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  const today = new Date();
  const todayString = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
  try {
    return function () {
      let div_clone, svg_icon;
      let style;
      let ea = "px";
      let margin;
      let domTargets;
      let motherBoo;
      let width;
      let defaultWeek;
      let startDay, endDay;

      motherBoo = (instance.onView === "mother") ? true : false;

      margin = 30;

      if (!recycle) {

        instance.whiteBox = {};

        //cancel box
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("justfadein");
        style = {
          position: "fixed",
          background: GeneralJs.colorChip.cancelBlack,
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
        boxShadow: "0 2px 10px -6px " + GeneralJs.colorChip.shadow,
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

      defaultWeek = [];
      if (today.getDay() !== 0) {
        defaultWeek.push(today.getDate() - today.getDay() + 1 < 1 ? 1 : today.getDate() - today.getDay() + 1);
      } else {
        defaultWeek.push(today.getDate() - 7 + 1 < 1 ? 1 : today.getDate() - 7 + 1);
      }
      defaultWeek.push((today.getDay() !== 0) ? today.getDate() + (7 - today.getDay()) : today.getDate());

      startDay = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(defaultWeek[0]);
      endDay = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(defaultWeek[1]);

      GeneralJs.ajax("today=" + todayString + "&start=" + startDay + "&end=" + endDay, "/getProjectReport", function (data) {
        svg_icon.style.opacity = "0";
        instance.reportContents(data, div_clone, svg_icon);
      });

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.reportViewMaker = function () {
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

ProjectJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

ProjectJs.prototype.makeSearchEvent = function (search = null) {
  const instance = this;
  return async function (e) {
    if (GeneralJs.confirmKey.includes(e.key)) {

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

ProjectJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
}

ProjectJs.prototype.backGrayBar = function () {
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

ProjectJs.prototype.extractViewMakerDetail = function (recycle = false, link) {
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
          background: GeneralJs.colorChip.cancelBlack,
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
        boxShadow: "0 2px 10px -6px " + GeneralJs.colorChip.shadow,
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

ProjectJs.prototype.extractViewMaker = function (link) {
  const instance = this;
  return function (e) {
    let tempFunc;
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

ProjectJs.prototype.addExtractEvent = function () {
  const instance = this;
  const { sub: { extractIcon } } = this.mother.belowButtons;
  let sendEvent;

  sendEvent = async function (e) {
    try {
      const today = new Date();
      const caseCopied = JSON.parse(JSON.stringify(instance.cases));
      caseCopied.shift();
      const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
      const map = DataPatch.projectMap();

      let data;
      let valuesArr;
      let temp, temp2;
      let div_clone, svg_clone;
      let style;
      let ea = "px";
      let width;
      let proidArr;

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        zIndex: String(2),
        background: GeneralJs.colorChip.black,
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

      valuesArr = [];

      temp2 = Object.keys(caseCopied[0]);
      temp = [];
      for (let i of temp2) {
        if (i === "name") {
          temp.push("성함");
        } else if (map[i] === undefined || typeof map[i] !== "object") {
          temp.push("알 수 없음");
        } else {
          temp.push(map[i].name);
        }
      }
      valuesArr.push(temp);

      proidArr = [];
      for (let i = 0; i < caseCopied.length; i++) {
        temp2 = Object.values(caseCopied[i]);
        valuesArr.push(temp2);
        proidArr.push(temp2.find((c) => { return /^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(c); }));
      }

      GeneralJs.ajaxJson({ idArr: proidArr, method: "project", property: "manager" }, "/getHistoryProperty").then((obj) => {
        valuesArr[0].push("담당자");
        for (let i = 1; i < valuesArr.length; i++) {
          valuesArr[i].push(obj[valuesArr[i].find((c) => { return /^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(c); })]);
        }
        return GeneralJs.ajaxJson({
          values: valuesArr,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_project_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, "/sendSheets")
      }).then((res) => {
        const { link } = res;
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
      }).catch((err) => {
        console.log(err);
      });

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }

  extractIcon.addEventListener("click", sendEvent);
}

ProjectJs.prototype.makeClipBoardEvent = function (id) {
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

ProjectJs.prototype.makeImportantEvent = function (id, update = true) {
  const instance = this;
  const cookies = GeneralJs.getCookiesAll();
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    try {
      let alarmCircle, alarmStyle;
      let children, length;
      let ea;
      let value;

      ea = "px";
      children = this.children;
      length = children.length;

      if (this.getAttribute("important") === "false") {

        value = 1;
        this.setAttribute("important", "true");

        alarmStyle = {
          position: "absolute",
          transform: "scale(0.4)",
          transformOrigin: "100% 0%",
          right: String(-8.5) + ea,
          top: (GeneralJs.isMac() ? String(3) : String(1)) + ea,
          zIndex: String(0),
        };

        for (let i = 0; i < length; i++) {
          alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("", GeneralJs.colorChip.red));
          for (let j in alarmStyle) {
            alarmCircle.style[j] = alarmStyle[j];
          }
          children[i].appendChild(alarmCircle);
        }

      } else {

        value = 0;
        this.setAttribute("important", "false");
        for (let i = 0; i < length; i++) {
          children[i].removeChild(children[i].querySelector("svg"));
        }

      }

      if (update) {
        await GeneralJs.ajaxPromise("id=" + id + "&column=important&value=" + value + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateProjectHistory");
      }

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

ProjectJs.prototype.whiteResize = function () {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if (instance.whiteBox !== undefined && instance.whiteBox !== null) {
        if (instance.whiteBox.id !== undefined) {
          window.location.search = "proid=" + instance.whiteBox.id;
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

ProjectJs.prototype.globalChaining = async function (thisCase, column, value, pastValue) {
  const instance = this;
  try {
    const map = DataPatch.projectMap();
    const realtimeDesigner = async function (thisCase, column, value, pastValue) {
      try {
        const { ajaxJson } = GeneralJs;
        const stringToDate = function (str) {
          if (typeof str !== "string") {
            throw new Error("invaild input");
          }
          if (str === '-' || str === '') {
            return new Date(1800, 0, 1);
          }
          if (str.length === 10) {
            const arr = str.split('-');
            return new Date(Number(arr[0]), Number(arr[1].replace(/^0/, '')) - 1, Number(arr[2].replace(/^0/, '')));
          } else {
            let tempArr0, tempArr1, tempArr2;
            tempArr0 = str.split(' ');
            tempArr1 = tempArr0[0].split('-');
            tempArr2 = tempArr0[1].split(':');
            return new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
          }
        }
        const { proid, designer } = thisCase;
        const desid = designer.split(' ')[1];
        let res, target;
        let index;
        let projectObj;
        let valueStandard;
        let meeting, start, end;
        let startCopy, endCopy;
        let breakNum;
        let countArr;

        res = await ajaxJson({
          mode: "read",
          db: "console",
          collection: "realtimeDesigner",
          whereQuery: { desid },
        }, "/generalMongo", { equal: true });

        if (res.length === 0) {
          target = { desid, count: {}, possible: [], projects: [] };
          await ajaxJson({
            mode: "create",
            db: "console",
            collection: "realtimeDesigner",
            updateQuery: target,
          }, "/generalMongo");
        } else {
          target = res[0];
        }

        index = null;
        for (let i = 0; i < target.projects.length; i++) {
          if (target.projects[i].proid === proid) {
            index = i;
          }
        }

        if (index === null) {
          projectObj = { proid, meeting: [], project: [] };
        } else {
          projectObj = target.projects[index];
        }

        thisCase[column] = value;
        valueStandard = (new Date(2000, 0, 1)).valueOf();
        meeting = stringToDate(thisCase["meetingDate"]);
        start = stringToDate(thisCase["formDateFrom"]);
        end = stringToDate(thisCase["formDateTo"]);
        startCopy = stringToDate(thisCase["formDateFrom"]);
        endCopy = stringToDate(thisCase["formDateTo"]);

        if (meeting.valueOf() > valueStandard) {
          projectObj.meeting = [ meeting ];
        }

        if (start.valueOf() > valueStandard && end.valueOf() > valueStandard) {
          // if (projectObj.project.length > 0) {
          //   projectObj.project.sort((a, b) => { return a.start.valueOf() - b.start.valueOf() });
          //   for (let i = 0; i < projectObj.project.length; i++) {
          //     if (start.valueOf() <= projectObj.project[i].end.valueOf()) {
          //       projectObj.project[i].start = start;
          //       breakNum = i;
          //       break;
          //     }
          //   }
          //   projectObj.project = projectObj.project.slice(breakNum);
          //   projectObj.project.sort((a, b) => { return b.end.valueOf() - a.end.valueOf() });
          //   for (let i = 0; i < projectObj.project.length; i++) {
          //     if (end.valueOf() > projectObj.project[i].start.valueOf()) {
          //       projectObj.project[i].end = end;
          //       breakNum = i;
          //       break;
          //     }
          //   }
          //   projectObj.project = projectObj.project.slice(breakNum);
          //   projectObj.project.sort((a, b) => { return a.start.valueOf() - b.start.valueOf() });
          // } else {
            projectObj.project = [ { start, end } ];
          // }
        }

        index = null;
        for (let i = 0; i < target.projects.length; i++) {
          if (target.projects[i].proid === projectObj.proid) {
            index = i;
          }
        }
        if (index === null) {
          target.projects.push(projectObj);
        } else {
          target.projects.splice(index, 1, projectObj);
        }

        // countArr = [];
        // while (startCopy.valueOf() <= endCopy.valueOf()) {
        //   countArr.push('y' + String(startCopy.getFullYear()) + 'm' + String(startCopy.getMonth() + 1));
        //   startCopy.setDate(startCopy.getDate() + 1);
        // }
        // countArr = Array.from(new Set(countArr));
        // for (let token of countArr) {
        //   if (target.count[token] !== undefined) {
        //     target.count[token] = target.count[token] - 1;
        //   } else {
        //     target.count[token] = 0;
        //   }
        // }

        delete target._id;
        await ajaxJson({
          mode: "update",
          db: "console",
          collection: "realtimeDesigner",
          whereQuery: { desid },
          updateQuery: target
        }, "/generalMongo");

      } catch (e) {
        console.log(e);
      }
    }
    const designerChange = async function (thisCase, column, value, pastValue) {
      try {
        const { ajaxJson, autoComma } = GeneralJs;
        const { proid } = thisCase;
        let targetIndex, targetDom, targetDomChildren, tempArr, desid;
        let selectedDesigner, updateQuery;
        let classification, percentage, method;
        let bankName, bankTo;
        let calculate;
        let ratio, supply;

        for (let i = 0; i < instance.cases.length; i++) {
          if (instance.cases[i] !== null) {
            if (instance.cases[i].proid === proid) {
              targetIndex = i;
            }
          }
        }
        targetDom = document.querySelector('.' + proid);
        targetDomChildren = targetDom.children;

        tempArr = value.split(' ');
        desid = tempArr[1].trim();
        supply = Number(thisCase.remainSupply.replace(/[^0-9\-\.]/g, ''));
        selectedDesigner = await ajaxJson({
          noFlat: true,
          whereQuery: { desid },
        }, "/getDesigners");
        if (selectedDesigner.length === 0) {
          return;
        } else {
          selectedDesigner = selectedDesigner[0];
        }
        updateQuery = { desid };

        classification = selectedDesigner.information.business.businessInfo.classification;
        percentage = Number(selectedDesigner.information.business.service.cost.percentage);
        method = "사업자(일반)";
        if (/사업자/g.test(classification)) {
          if (/일반/g.test(classification)) {
            method = "사업자(일반)";
          } else {
            method = "사업자(간이)";
          }
        } else {
          method = "프리랜서";
        }
        updateQuery["process.calculation.method"] = method;
        updateQuery["process.calculation.percentage"] = Number(percentage);

        if (selectedDesigner.information.business.account.length > 0) {
          bankName = selectedDesigner.information.business.account[0].bankName + " " + String(selectedDesigner.information.business.account[0].accountNumber);
          bankTo = selectedDesigner.information.business.account[0].to;
          updateQuery["process.calculation.info.account"] = bankName;
          updateQuery["process.calculation.info.proof"] = bankTo;
          updateQuery["process.calculation.info.to"] = bankTo;
        }

        if (/일반/gi.test(method)) {
          calculate = Math.round((supply * 1.1) * (1 - (percentage / 100)));
        } else if (/간이/gi.test(method)) {
          calculate = Math.round(supply * (1 - (percentage / 100)));
        } else if (/프리/gi.test(method)) {
          ratio = 0.967;
          calculate = Math.round((supply - (supply * (percentage / 100))) * ratio);
        } else {
          calculate = Math.round((supply * 1.1) * (1 - (percentage / 100)));
        }
        updateQuery["process.calculation.payments.totalAmount"] = calculate;
        updateQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
        updateQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

        await ajaxJson({ whereQuery: { proid }, updateQuery }, "/rawUpdateProject");

        instance.cases[targetIndex].calculationInfo = "계좌번호 " + bankName + " / 수신자 " + bankTo + " / 증명 " + bankTo;
        instance.cases[targetIndex].method = method;
        instance.cases[targetIndex].paymentsTotalAmount = calculate;
        instance.cases[targetIndex].paymentsFirstAmount = Math.round(calculate / 2);
        instance.cases[targetIndex].paymentsRemainAmount = Math.round(calculate / 2);
        instance.cases[targetIndex].percentage = percentage;

        for (let dom of targetDomChildren) {
          if (dom.getAttribute("column") === "calculationInfo") {
            dom.textContent = "계좌번호 " + bankName + " / 수신자 " + bankTo + " / 증명 " + bankTo;
          }
          if (dom.getAttribute("column") === "method") {
            dom.textContent = method;
          }
          if (dom.getAttribute("column") === "paymentsTotalAmount") {
            dom.textContent = autoComma(calculate);
          }
          if (dom.getAttribute("column") === "paymentsFirstAmount") {
            dom.textContent = autoComma(Math.round(calculate / 2));
          }
          if (dom.getAttribute("column") === "paymentsRemainAmount") {
            dom.textContent = autoComma(Math.round(calculate / 2));
          }
          if (dom.getAttribute("column") === "percentage") {
            dom.textContent = String(percentage);
          }
        }

      } catch (e) {
        console.log(e);
      }
    }

    const dictionary = {
      meetingDate: realtimeDesigner,
      formDateFrom: realtimeDesigner,
      formDateTo: realtimeDesigner,
      designer: designerChange,
    };

    let tempFunction;
    if (dictionary[column] !== undefined) {
      tempFunction = dictionary[column];
      await tempFunction(thisCase, column, value, pastValue);
    }
  } catch (e) {
    console.log(e);
  }
}

ProjectJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { stringToDate, sleep } = GeneralJs;

  communication.setItem([
    () => { return "제안서 다시 발송"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "계약서 발송"; },
    function () {
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let boo;
      let date0, date1, date2, date3;
      boo = true;
      if (instance.whiteBox === null) {
        boo = false;
      } else {
        const proid = instance.whiteBox.id;
        let thisCase;
        thisCase = null;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.proid === proid) {
              thisCase = c;
            }
          }
        }
        if (thisCase === null) {
          boo = false;
        } else {
          date0 = stringToDate(thisCase.firstDate);
          date1 = stringToDate(thisCase.formDateFrom);
          date2 = stringToDate(thisCase.formDateTo);
          date3 = stringToDate(thisCase.paymentsRemainDate);
          if (date0.valueOf() > emptyDateValue && date1.valueOf() > emptyDateValue && date2.valueOf() > emptyDateValue && date3.valueOf() < emptyDateValue) {
            boo = true;
          } else {
            boo = false;
          }
        }
      }
      return boo;
    },
    async function (e) {
      try {
        const proid = instance.whiteBox.id;
        let thisCase;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.proid === proid) {
              thisCase = c;
            }
          }
        }
        const project = (await GeneralJs.ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true }))[0];
        const client = (await GeneralJs.ajaxJson({ noFlat: true, where: { cliid: project.cliid } }, "/getClients", { equal: true }))[0];
        if (window.confirm(client.name + "고객님에게 스타일링 계약서를 전송합니다! 확실하십니까?")) {
          let contractName, contractAddress;

          contractName = window.prompt("계약시 별도의 이름이 있습니까? 없을 시, '없음' 또는 공백").trim();
          if (/없/gi.test(contractName)) {
            contractName = '';
          }
          if (contractName.trim() === "공백") {
            contractName = '';
          }
          contractName = contractName.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '');

          contractAddress = window.prompt("계약시 별도의 주소가 있습니까? 없을 시, '없음' 또는 공백").trim();
          if (/없/gi.test(contractAddress)) {
            contractAddress = '';
          }
          if (contractAddress.trim() === "공백") {
            contractAddress = '';
          }
          contractAddress = contractAddress.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '');

          await GeneralJs.ajaxJson({ proid, contractName, contractAddress }, PYTHONHOST + "/createStylingContract");
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "현장 미팅 알림"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "프로젝트 시작 고지"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);


  communication.setItem([
    () => { return "시공 계약서 발송"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "시공 착수금 요청"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "시공 중도금 요청"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "시공 잔금 요청"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "촬영 재알림"; },
    function () {

      return true;
    },
    async function (e) {
      try {
        console.log("this!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

}

ProjectJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.backGrayBar();
    await this.spreadData();
    this.addTransFormEvent();
    this.addSearchEvent();
    this.addExtractEvent();
    this.whiteResize();
    this.communicationRender();

    const getObj = GeneralJs.returnGet();
    let getTarget;
    let tempFunction;

    getTarget = null;
    if (getObj.proid !== undefined) {
      for (let dom of this.standardDoms) {
        if ((new RegExp(getObj.proid, 'gi')).test(dom.textContent)) {
          getTarget = dom;
        }
      }
      if (getTarget === null) {
        tempFunction = this.makeSearchEvent(getObj.proid);
        await tempFunction({ key: "Enter" });
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.proid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
      }
    } else if (getObj.cliid !== undefined) {
      tempFunction = this.makeSearchEvent(getObj.cliid);
      await tempFunction({ key: "Enter" });
      if (this.standardDoms.length > 1) {
        getTarget = this.standardDoms[1];
      }
    }
    if (getTarget !== null) {
      getTarget.click();
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
