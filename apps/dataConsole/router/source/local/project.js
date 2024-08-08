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
  this.ea = "px";
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
    display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
    position: "relative",
    background: GeneralJs.colorChip.gray0,
    top: String(0),
    left: String(0),
    width: String(this.grayBarWidth) + ea,
    zIndex: String(2),
  };

  style2 = {
    display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
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
    display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
    position: "absolute",
    top: String(0),
    left: String(grayBarWidth) + ea,
    width: String(5000) + ea,
    color: GeneralJs.colorChip.black,
  };

  style2 = {
    display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
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
      finalColor = GeneralJs.colorChip.red;
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
                finalColor = GeneralJs.colorChip.red;
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
            let { chainingColumns, chainingValues } = await tempFunction(thisCase, finalValue);
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

        const map = DataPatch.projectMap();
        const thisMap = map[this.getAttribute("column")];

        if (thisMap.constant === true) {
          return;
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

        if (thisMap.type === "date" && e.type === "click") {

          if (thisMap.constant === true) {
            window.alert("해당 값은 수동으로 조작할 수 없습니다!");
            cancel_inputBack.click();
          } else {
            cancel_inputBack.style.background = GeneralJs.colorChip.white;

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
          }

        } else if (thisMap.type !== "object" && thisMap.items !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;

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
              color: GeneralJs.colorChip.whiteBlack,
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
              color: thisMap.multiple === undefined ? GeneralJs.colorChip.whiteBlack : GeneralJs.colorChip.deactive,
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
        style2.color = GeneralJs.colorChip.red;
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = GeneralJs.colorChip.red;
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
        div_clone3.addEventListener("click", sortEventFunction((leftPosition[z] - (window.innerWidth / 2) + grayBarWidth), z));
        div_clone3.addEventListener("contextmenu", sortEventFunction((leftPosition[z] - (window.innerWidth / 2) + grayBarWidth), z));
        div_clone3.addEventListener("dragstart", dragstartEventFunction);
        div_clone3.addEventListener("dragenter", dragenterEventFunction);
        div_clone3.addEventListener("dragleave", dragleaveEventFunction);
        div_clone3.addEventListener("dragover", dragoverEventFunction);
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

  if ([ ...div_clone.children ].length < 15) {
    div_clone.style.height = String(window.innerHeight) + ea;
  } else {
    div_clone.style.height = "";
  }

}

ProjectJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  const { stringToDate, returnGet } = GeneralJs;
  try {
    const getObj = returnGet();
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
    let sortStandard;
    let loading;
    let thisType;
    let projectWhereQuery;

    thisType = "general";
    if (typeof getObj.type === "string" && getObj.type === "care") {
      thisType = "care";
    } else if (typeof getObj.type === "string" && getObj.type === "all") {
      thisType = "general";
    } else if (typeof getObj.type === "string" && getObj.type === "meeting") {
      thisType = "meeting";
    }

    loading = instance.mother.grayLoading(null, search === null || search === '' || search === '-');

    if (search === null || search === '' || search === '-') {
      if (thisType !== "meeting") {
        projects = await GeneralJs.ajaxJson({ where: { desid: { $regex: "^d" }, "process.status": { $regex: thisType === "care" ? "^[진홀]" : (thisType === "meeting" ? "^[대]" : "^[대진홀]") } } }, "/getProjects");
      } else {
        projectWhereQuery = {};
        projectWhereQuery["desid"] = { $regex: "^d" };
        projectWhereQuery["process.status"] = { $regex: "^[대]" };
        projectWhereQuery["process.contract.meeting.date"] = { $lte: new Date(2000, 0, 1) };
        projects = await GeneralJs.ajaxJson({ where: projectWhereQuery }, "/getProjects");
      }
    } else {
      projects = await GeneralJs.ajaxJson({ query: search }, "/searchProjects");
    }
    sortStandard = (str) => {
      const date = stringToDate(str);
      if (date.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
        return (new Date(4000, 0, 1)).valueOf();
      } else {
        return date.valueOf();
      }
    }
    projects.data.sort((a, b) => {
      return sortStandard(b.info.firstDate) - sortStandard(a.info.firstDate);
    })

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
      totalMother.style.display = "block";
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

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const { createNode, colorChip, withOut } = GeneralJs;
  const slash = "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;";
  const map = DataPatch.projectMap();
  const { chainingTargets, chainingMethods } = DataPatch.projectChainingTarget();
  const thisProjectBill = "thisProjectBill";
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
  let callEvent;
  let historyFocusEvent, historyBlurEvent;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;
  let betweenSpace;
  let distanceValueDom;
  let travelPositionIndex;
  let preIndexes;
  let index, acc;
  let titlaInfoArea;
  let subButtonsTong;
  let requestBox;

  travelPositionIndex = 5;
  preIndexes = [];
  preIndexes.push(travelPositionIndex);
  preIndexes.sort((a, b) => { return a - b; });

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
  callEvent = async function (e) {
    try {
      if (window.confirm(thisCase.name + " 고객님께 전화를 걸까요?")) {
        const response = await GeneralJs.ajaxJson({
          who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
          proid: thisCase.proid
        }, "/callTo");
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
  };

  //title ------------------------------------------

  leftMargin = (49 / 786) * motherHeight;
  titleFontSize = (32 / 786) * motherHeight;
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
    fontWeight: String(800),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (11 / 60) : (6 / 60))) + ea,
    left: String(leftMargin - 3) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", callEvent);
  div_clone2.appendChild(div_clone3);

  //proid
  betweenSpace = "&nbsp;&nbsp;<b style=\"color: " + GeneralJs.colorChip.gray3 + "\">/</b>&nbsp;&nbsp;";
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  titlaInfoArea = div_clone3;
  div_clone3.insertAdjacentHTML("beforeend", (thisCase[standard[1]] + betweenSpace + thisCase.name + " (Sa)" + betweenSpace + thisCase.designer.split(' ')[0] + " (De)" + betweenSpace + "시공" + betweenSpace + "<b style=\"color:" + GeneralJs.colorChip.deactive + "\">출장비 없음</b>"));
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: GeneralJs.colorChip.green,
    fontSize: String(titleFontSize * (20 / 42)) + ea,
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * (thisCase[standard[0]].length === 4 ? 3.6 : (thisCase[standard[0]].length === 2 ? 2.3 : 3))) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", async function (e) {
    try {
      const slashes = this.querySelectorAll('b');
      const slashesPosition0 = slashes[0].getBoundingClientRect().x;
      const slashesPosition1 = slashes[1].getBoundingClientRect().x;
      const slashesPosition2 = slashes[2].getBoundingClientRect().x;
      const proid = thisCase[standard[1]];
      let projects, project, tempFunction;
      if (e.x < slashesPosition0) {
        tempFunction = instance.makeClipBoardEvent(proid);
        tempFunction.call(this, e);
      } else if (e.x < slashesPosition1) {
        projects = await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects");
        project = projects[0];
        GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/client?cliid=" + project.cliid);
      } else if (e.x < slashesPosition2) {
        projects = await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects");
        project = projects[0];
        GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?desid=" + project.desid);
      } else {
        projects = await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
        project = projects[0];
        if (project.process.design.construct === null) {
          window.alert("이 프로젝트에는 시공이 없습니다!");
        } else if (thisCase["status"] === "대기") {
          window.alert("아직 대기중인 프로젝트는 시공 콘솔을 이용할 수 없습니다!");
        } else {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/builder?mode=construct&proid=" + project.proid);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
  div_clone2.appendChild(div_clone3);

  subButtonsTong = createNode({
    mother: div_clone2,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      right: String(leftMargin) + ea,
      bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
      cursor: "pointer",
    }
  });
  rInitialBox = createNode({
    mother: subButtonsTong,
    class: [ "hoverDefault_lite" ],
    event: {
      selectstart: (e) => { return e.preventDefault() }
    },
    text: "Calc",
    style: {
      display: "inline-block",
      position: "relative",
      color: colorChip.black,
      fontSize: String(titleFontSize * (20 / 42)) + ea,
      fontWeight: String(400),
      cursor: "pointer",
    }
  });
  createNode({
    mother: subButtonsTong,
    text: slash,
    style: {
      display: "inline-block",
      position: "relative",
      color: colorChip.gray3,
      fontSize: String(titleFontSize * (20 / 42)) + ea,
      fontWeight: String(400),
    }
  });
  requestBox = createNode({
    mother: subButtonsTong,
    class: [ "hoverDefault_lite" ],
    event: {
      selectstart: (e) => { return e.preventDefault() },
      click: instance.requestViewMaker(thisCase[standard[1]]),
    },
    text: "의뢰서",
    style: {
      display: "inline-block",
      position: "relative",
      color: colorChip.black,
      fontSize: String(titleFontSize * (20 / 42)) + ea,
      fontWeight: String(400),
      cursor: "pointer",
    }
  });
  createNode({
    mother: subButtonsTong,
    text: slash,
    style: {
      display: "inline-block",
      position: "relative",
      color: colorChip.gray3,
      fontSize: String(titleFontSize * (20 / 42)) + ea,
      fontWeight: String(400),
    }
  });
  requestBox = createNode({
    mother: subButtonsTong,
    class: [ "hoverDefault_lite" ],
    event: {
      selectstart: (e) => { return e.preventDefault() },
      click: instance.processViewMaker(thisCase[standard[1]]),
    },
    text: "프로젝트 케어",
    style: {
      display: "inline-block",
      position: "relative",
      color: colorChip.black,
      fontSize: String(titleFontSize * (20 / 42)) + ea,
      fontWeight: String(400),
      cursor: "pointer",
    }
  });

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
  fontSize = <%% 15, 13, 12, 11, 3 %%>;
  lineHeightRatio = <%% 1.97, 1.93, 1.9, 1.9, 1.9 %%>;

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
            let { chainingColumns, chainingValues } = await tempFunction(thisCaseOriginal, finalValue);
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

        const thisMap = map[this.parentNode.getAttribute("index")];

        if (thisMap.constant === true) {
          return;
        }

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

        if (thisMap.type === "date" && e.type === "click") {

          if (thisMap.constant === true) {
            window.alert("해당 값은 수동으로 조작할 수 없습니다!");
            cancel_inputBack.click();

          } else {
            cancel_inputBack.style.background = GeneralJs.colorChip.white;

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
          }

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
              color: GeneralJs.colorChip.whiteBlack,
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
              color: thisMap.multiple === undefined ? GeneralJs.colorChip.whiteBlack : GeneralJs.colorChip.deactive,
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
    overflow: "scroll",
    borderBottom: "1px dashed " + GeneralJs.colorChip.gray3,
  };
  for (let i in style) {
    propertyBox.style[i] = style[i];
  }

  if (window.localStorage.getItem("project_whiteOrder") !== null && window.localStorage.getItem("project_whiteOrder") !== undefined) {
    info = JSON.parse(window.localStorage.getItem("project_whiteOrder"));
  }

  acc = 0;
  for (let i = 0; i < info.length; i++) {
    if (preIndexes.includes(i)) {
      acc = acc + 1;
    }
    index = i + acc;
    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.setAttribute("index", info[i].target);
    style = {
      position: "absolute",
      top: String(fontSize * lineHeightRatio * index) + ea,
      left: String(0) + ea,
      width: "100%",
      height: String(16) + ea,
      paddingBottom: String(i === info.length - 1 ? 300 : 0) + ea,
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
      fontWeight: String(400),
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }
    div_clone4.addEventListener("click", updateEventFunction());
    div_clone4.addEventListener("contextmenu", updateEventFunction());
    div_clone3.appendChild(div_clone4);

    propertyBox.appendChild(div_clone3);
  }

  //travel expenses
  GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid: thisCase["proid"] } }, "/getProjects").then((projects) => {
    const project = projects[0];
    const { proid, cliid, desid } = project;
    const thisOnOff = /오프라인/gi.test(thisCase.service) ? "offline" : "online";
    let div_clone3, div_clone4, div_clone5;
    let style = {};
    let ea = "px";
    let referrerLinks;
    let bTagStyle;
    let proposal;
    let feeObject;

    proposal = null;
    for (let p of project.proposal.detail) {
      if (p.desid === desid) {
        proposal = p;
      }
    }

    if (proposal !== null) {
      feeObject = null;
      for (let f of proposal.fee) {
        if (f.method === thisOnOff) {
          feeObject = f;
        }
      }
      if (feeObject === null) {
        feeObject = proposal.fee[0];
      }
    } else {
      feeObject = {
        distance: {
          amount: 0,
          distance: "0km"
        }
      }
    }

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.setAttribute("index", "referrerLinks");
    style = {
      position: "absolute",
      top: String(fontSize * lineHeightRatio * (travelPositionIndex)) + ea,
      left: String(0) + ea,
      width: "100%",
      height: String(16) + ea,
    };
    for (let i in style) {
      div_clone3.style[i] = style[i];
    }

    //column name
    div_clone4 = GeneralJs.nodes.div.cloneNode(true);
    div_clone4.textContent = "출장비 정보";
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
    div_clone4.textContent = "회당 " + GeneralJs.autoComma(feeObject.distance.amount) + "원" + " / " + String(0) + "회 / " + feeObject.distance.distance;
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
    div_clone3.appendChild(div_clone4);
    distanceValueDom = div_clone4;

    propertyBox.appendChild(div_clone3);

    if (feeObject.distance.amount !== 0) {
      [ ...titlaInfoArea.querySelectorAll('b') ].find((dom) => { return /출장/gi.test(dom.textContent) }).style.color = GeneralJs.colorChip.red;
      [ ...titlaInfoArea.querySelectorAll('b') ].find((dom) => { return /출장/gi.test(dom.textContent) }).textContent = "출장비 발생";
    }

    return GeneralJs.ajaxJson({
      mode: "read",
      whereQuery: {
        $and: [
          { class: "style" },
          { "links.cliid": project.cliid },
          { "links.desid": project.desid },
          { "links.proid": project.proid },
          { "links.method": project.service.online ? "online" : "offline" },
        ]
      },
    }, PYTHONHOST + "/generalBill", { equal: true });
  }).then((bills) => {
    if (bills.length > 0) {
      const [ bill ] = bills;
      let number;
      let tempArr;
      number = 0;
      for (let request of bill.requests) {
        for (let item of request.items) {
          if (/출장/gi.test(item.name)) {
            number += item.unit.number;
          }
        }
      }
      tempArr = distanceValueDom.textContent.split(" / ");
      tempArr[1] = String(number) + '회';
      distanceValueDom.textContent = tempArr.join(" / ");
    }
  }).catch((err) => {
    console.log(err);
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
    { column: "client", name: "시공 관련", dom: null },
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
        if (Number(dom.getAttribute("index")) === thisIndex) {
          target = dom.querySelector("textarea");
        }
      }

      const originalValue = target.value;
      const originalValueArr = originalValue.split("\n");

      this.style.color = GeneralJs.colorChip.liteBlack;

      target.value = target.value.replace(/\&/g, ",");

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
      fontWeight: String(500),
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

  //r initial event
  GeneralJs.stacks[thisProjectBill] = null;
  rInitialBox.addEventListener("click", function (e) {
    const { colorChip, createNode, createNodes, withOut, ajaxJson, stringToDate, dateToString, cleanChildren, autoComma, isMac } = GeneralJs;
    let matrixBox;
    let loadingWidth;
    let tong;
    let innerMargin;
    let imageMargin;
    let columnsLength;
    let paddingBottom;
    let titleHeight, titleBottom;
    let innerPaddingTop, innerPaddingBottom, innerPaddingLeft;
    let circleRadius, circleBottom, circleRight;
    let innerPaddingLeftVisual, innerPaddingLeftVisual2;
    let lineTop, lineOpacity;
    let calendarTop;

    loadingWidth = fontSize * (40 / 15);
    innerMargin = fontSize * (20 / 15);
    imageMargin = fontSize * (6 / 15);
    columnsLength = 3;
    paddingBottom = fontSize * (240 / 15);;
    titleHeight = fontSize * (50 / 15);
    titleBottom = fontSize * (9 / 15);
    innerPaddingTop = fontSize * ((isMac() ? 8 : 11) / 15);
    innerPaddingBottom = fontSize * ((isMac() ? 11 : 11) / 15);
    innerPaddingLeft = fontSize * (16 / 15);
    innerPaddingLeftVisual = fontSize * ((isMac() ? 13 : 15) / 15);
    innerPaddingLeftVisual2 = fontSize * ((isMac() ? 6 : 8) / 15);
    circleRadius = fontSize * (8 / 15);
    circleBottom = fontSize * ((isMac() ? 15 : 16) / 15);
    circleRight = fontSize * (2 / 15);
    lineTop = 36;
    calendarTop = 30;
    lineOpacity = 0.45;

    if (/fadeout/gi.test(historyBox.style.animation)) {

      historyBox.style.animation = "fadein 0.3s ease forwards";
      historyBox.parentNode.removeChild(historyBox.parentNode.lastChild);

    } else {
      matrixBox = historyBox.cloneNode(false);
      matrixBox.style.border = String("1px solid " + colorChip.gray3);
      matrixBox.style.borderRadius = String(5) + ea;
      matrixBox.style.opacity = String(0);
      historyBox.parentNode.appendChild(matrixBox);

      tong = createNode({
        mother: matrixBox,
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
          overflow: "hidden"
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnLoading(),
            class: [ "loading" ],
            style: {
              position: "absolute",
              width: String(loadingWidth) + ea,
              top: withOut(50, loadingWidth / 2, ea),
              left: withOut(50, loadingWidth / 2, ea),
            }
          }
        ]
      });

      ajaxJson({
        noFlat: true,
        whereQuery: { proid: thisCase[standard[1]] },
      }, "/getProjects").then((obj) => {
        const [ project ] = obj;
        return ajaxJson({
          mode: "read",
          whereQuery: {
            $and: [
              { class: "style" },
              { "links.cliid": project.cliid },
              { "links.desid": project.desid },
              { "links.proid": project.proid },
              { "links.method": project.service.online ? "online" : "offline" },
            ]
          },
        }, PYTHONHOST + "/generalBill", { equal: true });
      }).then((obj) => {
        if (obj.length > 0) {
          const [ bill ] = obj;
          GeneralJs.stacks[thisProjectBill] = bill;
          const { proid, desid, cliid, method } = bill.links;

          tong.removeChild(tong.firstChild);

          let titleTong;
          let scrollTong, num;
          let scroll;
          let requestArr, responseArr;
          let requestLoad, responseLoad;
          let tempArr;
          let tempObj;
          let totalNum, payNum, cancelNum;
          let responseBoo;
          let requestArrMake, responseArrMake;

          responseBoo = /미화/gi.test(instance.mother.member.name);

          requestLoad = () => {};
          responseLoad = () => {};
          scrollTong = {};

          requestArr = [];
          requestArrMake = () => {
            const bill = GeneralJs.stacks[thisProjectBill];
            requestArr = [];
            for (let { date, name, id, removal } of bill.requests) {
              tempObj = {};
              tempObj.text = "";
              tempObj.text += dateToString(date, true).slice(2, -3);
              tempObj.text += " | ";
              if (typeof name === "string") {
                tempObj.text += name.replace(/([^ ]*) ([^ ]*)/g, (match, p1, p2) => {
                  return (p1 + " <b%" + p2 + "%b>");
                });
              }
              tempObj.id = id;
              tempObj.deactive = (removal.valueOf() > (new Date(2000, 0, 1)).valueOf());
              requestArr.push(tempObj);
            }
          }
          requestArrMake();

          responseArr = [];
          responseArrMake = () => {
            const bill = GeneralJs.stacks[thisProjectBill];
            responseArr = [];
            for (let { date, id, items, pay, cancel, removal } of bill.responses) {
              totalNum = 0;
              for (let { amount: { pure } } of items) {
                totalNum += pure;
              }
              payNum = 0;
              for (let { amount } of pay) {
                payNum += amount;
              }
              cancelNum = 0;
              for (let { amount } of cancel) {
                cancelNum += amount;
              }
              for (let { name, unit: { number }, amount: { pure } } of items) {
                tempObj = {};
                tempObj.text = "";
                tempObj.text += dateToString(date, true).slice(2, -3);
                tempObj.text += " | ";
                if (typeof name === "string") {
                  tempObj.text += name.replace(/([^ ]*) ([^ ]*)/g, (match, p1, p2) => {
                    return (p1 + " <b%" + p2 + "%b>");
                  });
                }
                tempObj.text += " | ";
                tempObj.text += "정산 금액 : ";
                tempObj.text += GeneralJs.autoComma(pure) + '원';
                tempObj.text += " | ";
                tempObj.text += "횟수 : ";
                tempObj.text += String(number);
                tempObj.text += " | ";
                tempObj.text += (Math.floor(totalNum) <= Math.floor(payNum - cancelNum) ? "정산" : "미정산");
                tempObj.id = id;

                tempObj.deactive = (removal.valueOf() > (new Date(2000, 0, 1)).valueOf());
                responseArr.push(tempObj);
              }
            }
          }
          responseArrMake();

          titleTong = createNode({
            mother: tong,
            style: {
              position: "relative",
              marginLeft: String(innerMargin) + ea,
              width: withOut(innerMargin * 2, ea),
              height: String(titleHeight) + ea,
              borderBottom: "1px solid " + colorChip.gray3
            },
            children: [
              {
                text: "고객님의 견적서",
                style: {
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(600),
                  position: "absolute",
                  bottom: String(titleBottom) + ea,
                }
              },
              {
                class: [ "hoverDefault_lite" ],
                attribute: [
                  { toggle: responseBoo ? "on" : "off" }
                ],
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      const toggle = this.getAttribute("toggle");
                      const textDom = this.previousElementSibling;
                      const textDom2 = this.children[0];
                      if (toggle === "off") {
                        cleanChildren(scrollTong);
                        responseLoad();
                        textDom.textContent = "프로젝트 정산 목록";
                        textDom2.textContent = "고객 결제 내역";
                        this.setAttribute("toggle", "on");
                      } else {
                        cleanChildren(scrollTong);
                        requestLoad();
                        textDom.textContent = "고객님의 견적서";
                        textDom2.textContent = "디자이너 정산";
                        this.setAttribute("toggle", "off");
                      }
                    }
                  }
                ],
                style: {
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  bottom: String(titleBottom) + ea,
                  right: String(circleRight) + ea,
                },
                child: {
                  text: "디자이너 정산",
                  event: {
                    selectstart: (e) => { return e.preventDefault }
                  },
                  style: {
                    fontSize: String(fontSize * 0.8) + ea,
                    fontWeight: String(600),
                    display: "inline-block",
                    position: "relative",
                    color: colorChip.red,
                  }
                }
              }
            ]
          });
          scroll = createNode({
            mother: tong,
            attribute: { proid, desid, cliid, method },
            events: {
              contextmenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
                const thisRect = this.getBoundingClientRect();
                const proid = this.getAttribute("proid");
                const desid = this.getAttribute("desid");
                const cliid = this.getAttribute("cliid");
                const method = this.getAttribute("method");
                let x, y;

                x = e.x - thisRect.x;
                y = e.y - thisRect.y;

                const menuClass = "billMenu";
                const menuContents = [
                  {
                    text: "출장 견적 추가",
                    eventFunction: async function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        let number, bill, tempObj, removeTargets, promptValue;
                        promptValue = window.prompt("출장비를 몇 회로 설정할까요?");
                        if (promptValue !== null) {
                          number = promptValue.trim();
                          number = Number(String(number).replace(/[^0-9]/gi, ''));
                          if (Number.isNaN(number)) {
                            number = 2;
                          }
                          bill = await ajaxJson({ injectionCase: "request", proid, method, number }, PYTHONHOST + "/travelInjection", { equal: true });
                          GeneralJs.stacks[thisProjectBill] = bill;
                          cleanChildren(scrollTong);
                          requestArrMake();
                          responseArrMake();
                          requestLoad();
                          removeTargets = document.querySelectorAll('.' + menuClass);
                          for (let dom of removeTargets) {
                            dom.remove();
                          }
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  },
                  {
                    text: "촬영 견적 추가",
                    eventFunction: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  },
                ];
                let menuFontSize;
                let menuPaddingTop, menuPaddingBottom, menuPaddingLeft;
                let menuMargin;
                let menuTong;
                let num;

                menuFontSize = fontSize - 1;
                menuPaddingTop = innerPaddingTop - 2;
                menuPaddingBottom = innerPaddingBottom - 2;
                menuPaddingLeft = innerPaddingLeft - 1;
                menuMargin = imageMargin / 2;

                createNode({
                  mother: this,
                  class: [ menuClass ],
                  events: [
                    {
                      type: "click",
                      event: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        const targets = document.querySelectorAll('.' + menuClass);
                        for (let dom of targets) {
                          dom.remove();
                        }
                      }
                    },
                    {
                      type: "contextmenu",
                      event: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                      }
                    }
                  ],
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                  }
                });

                menuTong = createNode({
                  mother: this,
                  class: [ menuClass ],
                  events: [
                    {
                      type: "click",
                      event: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }
                    }
                  ],
                  style: {
                    position: "absolute",
                    top: String(y) + ea,
                    left: String(x) + ea,
                    zIndex: String(1),
                    animation: "fadeuplite 0.2s ease",
                  }
                });

                for (let { text, eventFunction } of menuContents) {
                  createNode({
                    mother: menuTong,
                    events: [
                      {
                        type: "click",
                        event: eventFunction
                      }
                    ],
                    text,
                    style: {
                      position: "relative",
                      fontSize: String(menuFontSize) + ea,
                      fontWeight: String(500),
                      color: colorChip.whiteBlack,
                      background: colorChip.greenGray,
                      paddingTop: String(menuPaddingTop) + ea,
                      paddingBottom: String(menuPaddingBottom) + ea,
                      paddingLeft: String(menuPaddingLeft) + ea,
                      paddingRight: String(menuPaddingLeft) + ea,
                      borderRadius: String(3) + "px",
                      marginBottom: String(menuMargin) + ea,
                      cursor: "pointer",
                      textAlign: "center",
                      boxShadow: "0px 2px 12px -9px " + colorChip.shadow,
                    }
                  });
                }

              }
            },
            style: {
              position: "relative",
              width: String(100) + '%',
              height: withOut(titleHeight, ea),
              overflow: "scroll"
            }
          });
          scrollTong = createNode({
            mother: scroll,
            style: {
              position: "absolute",
              top: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: withOut(innerMargin * 2, ea),
              height: String(4000) + ea,
              paddingBottom: String(paddingBottom) + ea,
            }
          });

          requestLoad = () => {
            scrollTong.style.height = String(8000) + ea;
            let num;
            num = 0;
            for (let { text, id, deactive } of requestArr) {
              createNode({
                mother: scrollTong,
                attribute: [
                  { index: id },
                  { order: String(num) }
                ],
                style: {
                  position: "relative",
                  display: "block",
                  width: String(100) + '%',
                  height: "auto",
                  marginBottom: String(imageMargin) + ea,
                  opacity: String(deactive ? 0.4 : 1),
                },
                children: [
                  {
                    text: text.split('|')[0].trim(),
                    events: [
                      {
                        type: "contextmenu",
                        event: (e) => { e.stopPropagation(); e.preventDefault(); }
                      }
                    ],
                    style: {
                      position: "relative",
                      display: "inline-block",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(400),
                      color: colorChip.shadowWhite,
                      background: colorChip.gray2,
                      paddingTop: String(innerPaddingTop) + ea,
                      paddingBottom: String(innerPaddingBottom) + ea,
                      paddingLeft: String(innerPaddingLeft) + ea,
                      paddingRight: String(innerPaddingLeft) + ea,
                      borderRadius: String(3) + "px",
                      marginRight: String(imageMargin) + ea,
                    },
                    bold: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.green,
                    }
                  },
                  {
                    text: text.split('|')[1].trim(),
                    attribute: [
                      { index: id },
                      { first: text.split('|')[0].trim() },
                      { name: text.split('|')[1].trim() },
                      { proid },
                      { desid },
                      { cliid },
                      { method }
                    ],
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          e.stopPropagation();
                          const bill = GeneralJs.stacks[thisProjectBill];
                          const bilid = bill.bilid;
                          const index = this.getAttribute("index");
                          const first = this.getAttribute("first");
                          const proid = this.getAttribute("proid");
                          const method = this.getAttribute("method");
                          const name = this.getAttribute("name");
                          const itemClass = "items_";
                          let thisRequest, items;
                          let itemTong, itemDom;
                          let num;
                          let order;
                          let toggle;
                          let removeTargets;
                          let children;
                          let pay, cancel;
                          let infoCopied;
                          let requestIndex, payIndex;
                          let tempNum;

                          if (bill !== null) {
                            thisRequest = null;

                            tempNum = 0;
                            for (let obj of bill.requests) {
                              if (obj.id === index) {
                                thisRequest = obj;
                                requestIndex = tempNum;
                              }
                              tempNum++;
                            }

                            if (thisRequest !== null) {
                              toggle = false;
                              removeTargets = [];
                              for (let dom of scrollTong.children) {
                                if (dom.getAttribute("index") === itemClass + index) {
                                  toggle = true;
                                  removeTargets.push(dom);
                                }
                              }
                              if (toggle) {
                                for (let dom of removeTargets) {
                                  scrollTong.removeChild(dom);
                                }
                              } else {
                                items = thisRequest.items;
                                pay = thisRequest.pay;
                                cancel = thisRequest.cancel;
                                infoCopied = GeneralJs.equalJson(JSON.stringify(thisRequest.info));
                                infoCopied = infoCopied.filter((obj) => {
                                  return (typeof obj.data === "object");
                                }).filter((obj) => {
                                  return (obj.data.mid !== undefined && obj.data.tid !== undefined && obj.data.TotPrice !== undefined && obj.data.MOID !== undefined);
                                });
                                if (pay.length > infoCopied.length) {
                                  for (let i = 0; i < pay.length - infoCopied.length; i++) {
                                    infoCopied.push({
                                      data: {
                                        mid: "",
                                        tid: "",
                                        TotPrice: 0,
                                        MOID: "",
                                        payMethod: "ACCOUNT",
                                        vactBankName: "",
                                      }
                                    });
                                  }
                                }
                                pay = pay.map((obj, index) => {
                                  let total, amount;
                                  let refundReceipt;
                                  let cancelAmount;

                                  obj.payMethod = /CARD/gi.test(infoCopied[index].data.payMethod) ? "카드" : (infoCopied[index].data.payMethod !== "ACCOUNT" ? "무통장" : "계좌 이체");
                                  obj.detail = obj.payMethod === "카드" ? infoCopied[index].data.P_FN_NM : infoCopied[index].data.vactBankName;
                                  if (typeof obj.detail === "string") {
                                    obj.detail = obj.detail.replace(/카드/gi, '').replace(/은행/gi, '');
                                  } else {
                                    obj.detail = "알 수 없음";
                                  }
                                  obj.method = obj.payMethod;
                                  obj.payMethod = obj.payMethod + "(" + obj.detail + ") : " + GeneralJs.autoComma(obj.amount) + "원";
                                  obj.cancel = false;
                                  obj.cancelDetail = "";

                                  cancelAmount = 0;
                                  for (let i of cancel) {
                                    if (obj.oid === i.oid) {
                                      obj.cancel = true;
                                      cancelAmount += i.amount;
                                    }
                                  }

                                  if (obj.cancel) {
                                    if (obj.amount === cancelAmount) {
                                      obj.cancelDetail = "전체 환불";
                                    } else {
                                      obj.cancelDetail = String(Math.round((cancelAmount / obj.amount) * 100)) + "% 환불";
                                    }
                                  }

                                  refundReceipt = null;
                                  refundReceipt = thisRequest.info.find((o) => {
                                    return (typeof o === "object" && o.key === "refundReceipt" && o.oid === obj.oid);
                                  });

                                  if (refundReceipt !== null && refundReceipt !== undefined && obj.cancelDetail === '') {
                                    obj.cancel = true;
                                    obj.cancelDetail = thisRequest.status;
                                  }

                                  return obj;
                                });
                                itemTong = [];
                                for (let i of items) {
                                  children = [
                                    {
                                      text: first,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: "transparent",
                                        background: "transparent",
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: i.name,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.shadowWhite,
                                        background: colorChip.gray2,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: "소비자가 : " + GeneralJs.autoComma(i.amount.consumer) + "원",
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.black,
                                        background: colorChip.gray0,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                        cursor: "pointer"
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: "횟수 : " + String(i.unit.number),
                                      attribute: [ { name: i.name } ],
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.black,
                                        background: colorChip.gray0,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                        cursor: "pointer",
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      },
                                      events: [
                                        {
                                          type: "click",
                                          event: async function (e) {
                                            try {
                                              const itemName = this.getAttribute("name");
                                              if (/출장/gi.test(itemName)) {
                                                if (window.confirm("출장 횟수를 변경할까요?")) {
                                                  let position, thisIndex, number, pastBill, bill, tempObj, promptValue;
                                                  promptValue = await GeneralJs.prompt("출장비를 몇 회로 설정할까요?");
                                                  if (promptValue !== null) {
                                                    number = promptValue.trim();
                                                    number = Number(String(number).replace(/[^0-9]/gi, ''));
                                                    if (Number.isNaN(number)) {
                                                      number = 2;
                                                    }
                                                    pastBill = GeneralJs.stacks[thisProjectBill];
                                                    for (let i = 0; i < pastBill.requests.length; i++) {
                                                      if (pastBill.requests[i].id === index) {
                                                        thisIndex = i;
                                                        break;
                                                      }
                                                    }
                                                    bill = await ajaxJson({ injectionCase: /잔금/gi.test(name) ? "remain" : (/계약/gi.test(name) ? "first" : "request"), proid, method, number, index: thisIndex }, PYTHONHOST + "/travelReconfig", { equal: true });
                                                    GeneralJs.stacks[thisProjectBill] = bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                }
                                              }
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  ];
                                  itemDom = createNode({
                                    mother: scrollTong,
                                    attribute: [
                                      { index: itemClass + index },
                                    ],
                                    events: [
                                      {
                                        type: "click",
                                        event: (e) => { e.stopPropagation(); e.preventDefault(); }
                                      },
                                      {
                                        type: "contextmenu",
                                        event: (e) => { e.stopPropagation(); e.preventDefault(); }
                                      }
                                    ],
                                    children: children,
                                    style: {
                                      position: "relative",
                                      display: "block",
                                      width: String(100) + '%',
                                      height: "auto",
                                      marginBottom: String(imageMargin) + ea,
                                    }
                                  });
                                  itemTong.push(itemDom);
                                }

                                tempNum = 0;
                                for (let i of pay) {
                                  children = [
                                    {
                                      text: first,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: "transparent",
                                        background: "transparent",
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: items[items.length - 1].name,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: "transparent",
                                        background: "transparent",
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: dateToString(i.date, true).slice(2, -3),
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.shadowWhite,
                                        background: colorChip.gray2,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                    {
                                      text: i.payMethod,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.black,
                                        background: colorChip.gray0,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                        cursor: "pointer",
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    },
                                  ];
                                  if (i.cancel) {
                                    children.push({
                                      text: i.cancelDetail,
                                      style: {
                                        position: "relative",
                                        display: "inline-block",
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(400),
                                        color: colorChip.black,
                                        background: colorChip.gray0,
                                        paddingTop: String(innerPaddingTop) + ea,
                                        paddingBottom: String(innerPaddingBottom) + ea,
                                        paddingLeft: String(innerPaddingLeft) + ea,
                                        paddingRight: String(innerPaddingLeft) + ea,
                                        borderRadius: String(3) + "px",
                                        marginRight: String(imageMargin) + ea,
                                      },
                                      bold: {
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(600),
                                        color: colorChip.green,
                                      }
                                    });
                                  }
                                  itemDom = createNode({
                                    mother: scrollTong,
                                    attribute: [
                                      { index: itemClass + index },
                                      { method: i.method },
                                      { cancel: i.cancel ? "true" : "false" },
                                      { pay: String(tempNum) },
                                      { amount: String(i.amount) },
                                    ],
                                    events: [
                                      {
                                        type: "click",
                                        event: (e) => { e.stopPropagation(); e.preventDefault(); }
                                      },
                                      {
                                        type: "contextmenu",
                                        event: async function (e) {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          const method = this.getAttribute("method");
                                          const cancel = this.getAttribute("cancel") === "true";
                                          const payIndex = Number(this.getAttribute("pay"));
                                          const amount = Number(this.getAttribute("amount"));
                                          let raw;
                                          let percentage, accountNumber, bankName, accountName;
                                          let bankCode;
                                          let kind;
                                          let res;
                                          let entire;
                                          let ratio;
                                          let refundPrice;

                                          try {
                                            if (!cancel && window.confirm("환불을 진행할까요?")) {
                                              percentage = 100;

                                              // ratio

                                              if (!window.confirm("전체 환불을 진행할까요? (부분일시, '취소')")) {

                                                entire = false;
                                                refundPrice = 0;

                                                if (window.confirm("비율로 환불을 할까요, 금액으로 환불을 할까요? (비율 => '확인' / 금액 => '취소')")) {

                                                  ratio = true;

                                                  do {
                                                    raw = await GeneralJs.prompt("돌려줄 금액의 비율을 알려주세요! (예: 50%)");
                                                    if (raw !== null) {
                                                      percentage = Number(raw.replace(/[^0-9]/gi, ''));
                                                    } else {
                                                      percentage = 0;
                                                    }
                                                  } while (percentage === 0 || Number.isNaN(percentage))

                                                } else {

                                                  ratio = false;

                                                  do {
                                                    raw = await GeneralJs.prompt("돌려줄 금액을 원 단위로 알려주세요! (예: 1,000,000원)");
                                                    if (raw !== null) {
                                                      refundPrice = Number(raw.replace(/[^0-9]/gi, ''));
                                                    } else {
                                                      refundPrice = 0;
                                                    }
                                                  } while (refundPrice === 0 || Number.isNaN(refundPrice))

                                                  percentage = (Math.floor((raw / amount) * 100000) / 100000) * 100;

                                                }

                                              } else {
                                                entire = true;
                                                ratio = true;
                                              }


                                              // method

                                              if (/카드/gi.test(method)) {

                                                kind = "card" + ((entire || percentage === 100) ? "Entire" : "Partial");

                                                if (ratio) {
                                                  if (window.confirm("카드 " + String(percentage) + "% 환불을 진행합니다. 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                } else {
                                                  if (window.confirm("카드 " + autoComma(refundPrice) + "원 환불을 진행합니다. 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                }

                                              } else if (/^무/gi.test(method)) {

                                                kind = "vaccount" + ((entire || percentage === 100) ? "Entire" : "Partial");
                                                bankCode = await GeneralJs.ajaxJson({}, PYTHONHOST + "/returnBankCode");

                                                raw = await GeneralJs.prompt("은행 이름을 알려주세요!");
                                                bankName = null;
                                                for (let arr of bankCode) {
                                                  if ((new RegExp(arr[0], "gi")).test(raw.trim())) {
                                                    bankName = arr[0];
                                                  }
                                                }

                                                raw = await GeneralJs.prompt("계좌 번호를 알려주세요!");
                                                if (raw !== null) {
                                                  accountNumber = null;
                                                  accountNumber = raw.replace(/[^0-9]/gi, '').trim();
                                                } else {
                                                  accountNumber = null;
                                                }
                                                
                                                raw = await GeneralJs.prompt("예금주를 알려주세요!");
                                                if (raw !== null) {
                                                  accountName = null;
                                                  accountName = raw.trim();
                                                } else {
                                                  accountName = null;
                                                }

                                                if (ratio) {
                                                  if (window.confirm("무통장 " + String(percentage) + "% 환불을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                } else {
                                                  if (window.confirm("무통장 " + String(refundPrice) + "원 환불을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                }

                                              } else {

                                                kind = "cash" + (percentage === 100 ? "Entire" : "Partial");
                                                bankCode = await GeneralJs.ajaxJson({}, PYTHONHOST + "/returnBankCode");

                                                raw = await GeneralJs.prompt("은행 이름을 알려주세요!");
                                                bankName = null;
                                                for (let arr of bankCode) {
                                                  if ((new RegExp(arr[0], "gi")).test(raw.trim())) {
                                                    bankName = arr[0];
                                                  }
                                                }

                                                raw = await GeneralJs.prompt("계좌 번호를 알려주세요!");
                                                if (raw !== null) {
                                                  accountNumber = null;
                                                  accountNumber = raw.replace(/[^0-9]/gi, '').trim();
                                                } else {
                                                  accountNumber = null;
                                                }

                                                raw = await GeneralJs.prompt("예금주를 알려주세요!");
                                                if (raw !== null) {
                                                  accountName = null;
                                                  accountName = raw.trim();
                                                } else {
                                                  accountName = null;
                                                }

                                                if (ratio) {
                                                  if (window.confirm("계좌 이체 " + String(percentage) + "% 환불 요청을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                } else {
                                                  if (window.confirm("계좌 이체 " + String(refundPrice) + "원 환불 요청을 진행합니다.(" + bankName + " " + accountNumber + " " + accountName + ") 확실합니까?")) {
                                                    const loading = await instance.mother.grayLoading();
                                                    res = await GeneralJs.ajaxJson({ kind, bilid, requestIndex, payIndex, percentage, accountNumber, bankName, accountName, refundPrice }, PYTHONHOST + "/requestRefund", { equal: true });
                                                    loading.remove();
                                                    GeneralJs.stacks[thisProjectBill] = res.bill;
                                                    cleanChildren(scrollTong);
                                                    requestArrMake();
                                                    responseArrMake();
                                                    requestLoad();
                                                  }
                                                }

                                              }

                                            }
                                          } catch (e) {
                                            console.log(e);
                                          }
                                        }
                                      }
                                    ],
                                    children: children,
                                    style: {
                                      position: "relative",
                                      display: "block",
                                      width: String(100) + '%',
                                      height: "auto",
                                      marginBottom: String(imageMargin) + ea,
                                    },
                                  });
                                  itemTong.push(itemDom);
                                  tempNum++;
                                }
                                itemDom.style.paddingBottom = String(innerPaddingBottom) + ea;
                                for (let i = 0; i < scrollTong.children.length; i++) {
                                  if (scrollTong.children[i].getAttribute("index") === index) {
                                    order = i;
                                  }
                                }
                                num = 1;
                                for (let dom of itemTong) {
                                  scrollTong.insertBefore(dom, scrollTong.children[order + num]);
                                  num++;
                                }

                              }

                            }

                          }
                        }
                      },
                      {
                        type: "contextmenu",
                        event: function (e) {
                          e.preventDefault();
                          e.stopPropagation();

                          const name = this.getAttribute("name");
                          const proid = this.getAttribute("proid");
                          const desid = this.getAttribute("desid");
                          const cliid = this.getAttribute("cliid");
                          const method = this.getAttribute("method");
                          const index = this.getAttribute("index");
                          const height = this.getBoundingClientRect().height;
                          const menuClass = "billMenu";
                          let menuContents;
                          if (/출장/gi.test(name)) {
                            menuContents = [
                              {
                                text: "견적서 보기",
                                eventFunction: function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const kind = "style";
                                  let bill, thisIndex, url;
                                  bill = GeneralJs.stacks[thisProjectBill];
                                  for (let i = 0; i < bill.requests.length; i++) {
                                    if (bill.requests[i].id === index) {
                                      thisIndex = i;
                                      break;
                                    }
                                  }
                                  url = FRONTHOST + "/estimation.php?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',') + "&view=test&request=" + String(thisIndex);
                                  GeneralJs.blankHref(url);
                                }
                              },
                              {
                                text: "안내 발송",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    let client;
                                    let bill, thisIndex, targetItem;
                                    client = (await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients"))[0];
                                    bill = GeneralJs.stacks[thisProjectBill];
                                    for (let i = 0; i < bill.requests.length; i++) {
                                      if (bill.requests[i].id === index) {
                                        thisIndex = i;
                                        break;
                                      }
                                    }
                                    for (let item of bill.requests[thisIndex].items) {
                                      if (item.class === "travelExpenses") {
                                        targetItem = item;
                                      }
                                    }
                                    if (window.confirm(client.name + " 고객님께 출장비 안내를 보낼까요?")) {
                                      await ajaxJson({
                                        id: client.cliid,
                                        column: null,
                                        value: null,
                                        email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
                                        send: "universalEstimation",
                                      }, "/updateClientHistory");
                                      await ajaxJson({
                                        method: "travelPayment",
                                        name: client.name,
                                        phone: client.phone,
                                        option: {
                                          client: client.name,
                                          unit: GeneralJs.autoComma(targetItem.amount.consumer / targetItem.unit.number),
                                          total: GeneralJs.autoComma(targetItem.amount.consumer),
                                          host: FRONTHOST.slice(8),
                                          path: "estimation",
                                          cliid: cliid,
                                          needs: "style," + desid + "," + proid + "," + method,
                                        }
                                      }, "/alimTalk");
                                      window.alert("안내 발송을 완료하였습니다!");
                                    }
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                text: "아래로 내리기",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    let position, thisIndex, pastBill, bill, tempObj;
                                    pastBill = GeneralJs.stacks[thisProjectBill];
                                    for (let i = 0; i < pastBill.requests.length; i++) {
                                      if (pastBill.requests[i].id === index) {
                                        thisIndex = i;
                                        break;
                                      }
                                    }
                                    bill = await ajaxJson({ order: "down", proid, method, index: thisIndex }, PYTHONHOST + "/travelUpDown", { equal: true });
                                    GeneralJs.stacks[thisProjectBill] = bill;
                                    cleanChildren(scrollTong);
                                    requestArrMake();
                                    responseArrMake();
                                    requestLoad();
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                text: "위로 올리기",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    let position, thisIndex, pastBill, bill, tempObj;
                                    pastBill = GeneralJs.stacks[thisProjectBill];
                                    for (let i = 0; i < pastBill.requests.length; i++) {
                                      if (pastBill.requests[i].id === index) {
                                        thisIndex = i;
                                        break;
                                      }
                                    }
                                    bill = await ajaxJson({ order: "up", proid, method, index: thisIndex }, PYTHONHOST + "/travelUpDown", { equal: true });
                                    GeneralJs.stacks[thisProjectBill] = bill;
                                    cleanChildren(scrollTong);
                                    requestArrMake();
                                    responseArrMake();
                                    requestLoad();
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                text: "항목 삭제",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    let position, thisIndex, pastBill, bill, tempObj;
                                    pastBill = GeneralJs.stacks[thisProjectBill];
                                    for (let i = 0; i < pastBill.requests.length; i++) {
                                      if (pastBill.requests[i].id === index) {
                                        thisIndex = i;
                                        break;
                                      }
                                    }
                                    bill = await ajaxJson({ injectionCase: "request", proid, method, index: thisIndex }, PYTHONHOST + "/travelEjection", { equal: true });
                                    GeneralJs.stacks[thisProjectBill] = bill;
                                    cleanChildren(scrollTong);
                                    requestArrMake();
                                    responseArrMake();
                                    requestLoad();
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              }
                            ];
                          } else {
                            menuContents = [
                              {
                                text: "견적서 보기",
                                eventFunction: function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const kind = "style";
                                  let bill, thisIndex, url;
                                  bill = GeneralJs.stacks[thisProjectBill];
                                  for (let i = 0; i < bill.requests.length; i++) {
                                    if (bill.requests[i].id === index) {
                                      thisIndex = i;
                                      break;
                                    }
                                  }
                                  url = FRONTHOST + "/estimation.php?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',') + "&view=test&request=" + String(thisIndex);
                                  GeneralJs.blankHref(url);
                                }
                              },
                              {
                                text: "안내 발송",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    let thisName, thisAlim, client;
                                    if (/잔금/gi.test(name)) {
                                      thisName = "잔금";
                                      thisAlim = "secondPayment";
                                    } else {
                                      thisName = "계약금";
                                      thisAlim = "firstPayment";
                                    }
                                    client = (await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients"))[0];
                                    if (window.confirm(client.name + " 고객님께 " + thisName + " 안내를 보낼까요?")) {
                                      await ajaxJson({
                                        id: client.cliid,
                                        column: null,
                                        value: null,
                                        email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
                                        send: "universalEstimation",
                                      }, "/updateClientHistory");
                                      await ajaxJson({
                                        method: thisAlim,
                                        name: client.name,
                                        phone: client.phone,
                                        option: {
                                          client: client.name,
                                          host: FRONTHOST.slice(8),
                                          path: "estimation",
                                          cliid: cliid,
                                          needs: "style," + desid + "," + proid + "," + method,
                                        }
                                      }, "/alimTalk");
                                      if (thisName === "잔금") {
                                        await ajaxJson({
                                          whereQuery: { proid },
                                          updateQuery: { "process.action": "잔금 안내" }
                                        }, "/rawUpdateProject");
                                      }
                                      window.alert("안내 발송을 완료하였습니다!");
                                    }
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                text: "강제 입금",
                                eventFunction: async function (e) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  try {
                                    const [ thisBill ] = await GeneralJs.ajaxJson({
                                      mode: "read",
                                      whereQuery: {
                                        $and: [
                                          { class: "style" },
                                          { "links.cliid": cliid },
                                          { "links.desid": desid },
                                          { "links.proid": proid },
                                          { "links.method": method },
                                        ]
                                      },
                                    }, PYTHONHOST + "/generalBill", { equal: true });
                                    let thisName, thisAmount;

                                    thisName = (thisBill.requests.find((o) => { return o.id === index }).target.name)
                                    thisAmount = String(Math.floor(thisBill.requests.find((o) => { return o.id === index }).items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)))

                                    await GeneralJs.ajaxJson({ date: new Date(), amount: thisAmount, name: thisName }, S3HOST + ":3000/receiveSms");

                                    await GeneralJs.sleep(500);
                                    window.alert("입금을 강제로 처리중입니다! 슬랙에서 완료 알림이 뜨면 반드시 새로고침을 해서 확인해주세요!");

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                            ];
                          }
                          let menuFontSize;
                          let menuPaddingTop, menuPaddingBottom, menuPaddingLeft;
                          let menuMargin;
                          let menuTong;
                          let num;

                          menuFontSize = fontSize - 1;
                          menuPaddingTop = innerPaddingTop - 2;
                          menuPaddingBottom = innerPaddingBottom - 2;
                          menuPaddingLeft = innerPaddingLeft - 1;
                          menuMargin = imageMargin / 2;

                          createNode({
                            mother: this,
                            class: [ menuClass ],
                            events: [
                              {
                                type: "click",
                                event: function (e) {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const targets = document.querySelectorAll('.' + menuClass);
                                  for (let dom of targets) {
                                    dom.remove();
                                  }
                                }
                              },
                              {
                                type: "contextmenu",
                                event: function (e) {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }
                              }
                            ],
                            style: {
                              position: "fixed",
                              top: String(0),
                              left: String(0),
                              width: String(100) + '%',
                              height: String(100) + '%',
                              background: "transparent",
                              zIndex: String(1),
                            }
                          });

                          menuTong = createNode({
                            mother: this,
                            class: [ menuClass ],
                            events: [
                              {
                                type: "click",
                                event: (e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }
                              }
                            ],
                            style: {
                              position: "absolute",
                              top: String(height + imageMargin) + ea,
                              left: String(0),
                              zIndex: String(1),
                              animation: "fadeuplite 0.2s ease",
                            }
                          });

                          for (let { text, eventFunction } of menuContents) {
                            createNode({
                              mother: menuTong,
                              events: [
                                {
                                  type: "click",
                                  event: eventFunction
                                }
                              ],
                              text,
                              style: {
                                position: "relative",
                                fontSize: String(menuFontSize) + ea,
                                fontWeight: String(500),
                                color: colorChip.whiteBlack,
                                background: colorChip.greenGray,
                                paddingTop: String(menuPaddingTop) + ea,
                                paddingBottom: String(menuPaddingBottom) + ea,
                                paddingLeft: String(menuPaddingLeft) + ea,
                                paddingRight: String(menuPaddingLeft) + ea,
                                borderRadius: String(3) + "px",
                                marginBottom: String(menuMargin) + ea,
                                cursor: "pointer",
                                textAlign: "center",
                                boxShadow: "0px 2px 12px -9px " + colorChip.shadow,
                              }
                            });
                          }

                        }
                      }
                    ],
                    style: {
                      position: "relative",
                      display: "inline-block",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      background: colorChip.gray0,
                      paddingTop: String(innerPaddingTop) + ea,
                      paddingBottom: String(innerPaddingBottom) + ea,
                      paddingLeft: String(innerPaddingLeft) + ea,
                      paddingRight: String(innerPaddingLeft) + ea,
                      borderRadius: String(3) + "px",
                      cursor: "pointer",
                    },
                    bold: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  }
                ]
              });
              scrollTong.style.height = "auto";
              num++;
            }
          }

          responseLoad = () => {
            scrollTong.style.height = String(8000) + ea;
            scrollTong.parentElement.setAttribute("proid", proid);
            scrollTong.parentElement.setAttribute("desid", desid);
            scrollTong.parentElement.setAttribute("cliid", cliid);
            scrollTong.parentElement.setAttribute("method", method);
            let num;
            num = 0;
            for (let { text, id, deactive } of responseArr) {
              tempArr = text.split('|').map((i) => { return i.trim(); });
              children = tempArr.map((t, index) => {
                return {
                  text: t,
                  attribute: [
                    { index: id },
                    { first: tempArr[0] },
                    { name: t },
                    { proid },
                    { desid },
                    { cliid },
                    { method }
                  ],
                  style: {
                    position: "relative",
                    display: "inline-block",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(300),
                    color: colorChip.black,
                    background: colorChip.gray0,
                    paddingTop: String(innerPaddingTop) + ea,
                    paddingBottom: String(innerPaddingBottom) + ea,
                    paddingLeft: String(innerPaddingLeft) + ea,
                    paddingRight: String(innerPaddingLeft) + ea,
                    borderRadius: String(3) + "px",
                    marginRight: String(imageMargin) + ea,
                    cursor: "pointer",
                  },
                  bold: {
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                  }
                };
              });
              children[0].style = {
                position: "relative",
                display: "inline-block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(400),
                color: colorChip.shadowWhite,
                background: colorChip.gray2,
                paddingTop: String(innerPaddingTop) + ea,
                paddingBottom: String(innerPaddingBottom) + ea,
                paddingLeft: String(innerPaddingLeft) + ea,
                paddingRight: String(innerPaddingLeft) + ea,
                borderRadius: String(3) + "px",
                marginRight: String(imageMargin) + ea,
              };
              children[0].bold = {
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                color: colorChip.green,
              };
              createNode({
                mother: scrollTong,
                attribute: [
                  { index: id },
                  { order: String(num) }
                ],
                events: [
                  {
                    type: [ "click", "contextmenu" ],
                    event: async function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        const self = this;
                        const responseId = this.getAttribute("index");
                        const bilid = responseId.split('_').slice(0, -1).join('_');
                        const responsesIndex = Number(this.getAttribute("order"));
                        const responseName = this.children[1].textContent;
                        const responseAmount = Number(this.children[2].textContent.split(':')[1].replace(/[^0-9]/gi, ''));
                        const proid = this.children[0].getAttribute("proid");
                        let thisResponse, thisResponseIndex;
                        let status, pay, proofs;
                        let amount, date, oid;
                        let method, proof, to;
                        let baseTong;
                        let map;
                        let tempDom;
                        let domArr;

                        if (this.querySelector("aside") !== null) {

                          this.removeChild(this.querySelector("aside"));

                        } else {

                          thisResponseIndex = bill.responses.findIndex((obj) => { return obj.id === responseId });
                          if (thisResponseIndex !== -1) {
                            thisResponse = bill.responses[thisResponseIndex];
                            ({ status, pay, proofs } = thisResponse);

                            domArr = [];

                            if (pay.length === 0) {
                              amount = 0;
                              date = new Date(1800, 0, 1);
                              oid = "";
                            } else {
                              [ { amount, date, oid } ] = pay;
                            }

                            if (proofs.length === 0) {
                              method = "-";
                              proof = "-";
                              to = "-";
                            } else {
                              [ { method, proof, to } ] = proofs;
                              if (method === '') {
                                method = "-";
                              }
                              if (proof === '') {
                                proof = "-";
                              }
                              if (to === '') {
                                to = "-";
                              }
                            }

                            map = [
                              {
                                title: "정산 금액",
                                value: autoComma(amount) + '원',
                                event: async function (e) {
                                  try {
                                    if (this.getAttribute("value") === '' || this.getAttribute("value") === '-' || this.getAttribute("value") === '0' || this.getAttribute("value") === '0원') {
                                      this.setAttribute("value", autoComma(responseAmount) + '원');
                                      this.textContent = autoComma(responseAmount) + '원';
                                    }

                                    const self = this;
                                    const zIndex = 1;
                                    let cloneInput, cancel;

                                    cancel = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const finalValue = autoComma(Number(this.parentElement.lastChild.value.trim().replace(/[^0-9]/gi, ''))) + '원';
                                          this.setAttribute("value", finalValue);
                                          this.textContent = finalValue;
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "fixed",
                                        top: String(0),
                                        left: String(0),
                                        width: String(100) + '%',
                                        height: String(100) + '%',
                                        background: "transparent",
                                        transition: "all 0s ease",
                                        zIndex
                                      }
                                    });

                                    cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
                                    cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
                                    cancel.style.width = String(window.innerWidth) + ea;
                                    cancel.style.height = String(window.innerHeight) + ea;

                                    cloneInput = createNode({
                                      mother: this.parentElement,
                                      mode: "input",
                                      event: {
                                        click: (e) => { e.preventDefault(); e.stopPropagation(); },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                        keypress: function (e) {
                                          if (e.key === "Enter") {
                                            const finalValue = autoComma(Number(this.value.trim().replace(/[^0-9]/gi, ''))) + '원';
                                            self.setAttribute("value", finalValue);
                                            self.textContent = finalValue;
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                          }
                                        }
                                      },
                                      style: {
                                        position: "absolute",
                                        right: String(0),
                                        top: String(0),
                                        outline: String(0),
                                        border: String(0),
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(300),
                                        color: colorChip.green,
                                        background: colorChip.gray0,
                                        textAlign: "right",
                                        width: String(this.getBoundingClientRect().width) + ea,
                                        height: String(this.getBoundingClientRect().height) + ea,
                                        zIndex
                                      }
                                    });

                                    cloneInput.value = this.getAttribute("value");
                                    cloneInput.focus();

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                title: "정산 날짜",
                                value: dateToString(date),
                                event: async function (e) {
                                  try {
                                    const self = this;
                                    const zIndex = 1;
                                    let base, cancel;

                                    cancel = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "fixed",
                                        top: String(0),
                                        left: String(0),
                                        width: String(100) + '%',
                                        height: String(100) + '%',
                                        background: "transparent",
                                        transition: "all 0s ease",
                                        zIndex
                                      }
                                    });

                                    cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
                                    cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
                                    cancel.style.width = String(window.innerWidth) + ea;
                                    cancel.style.height = String(window.innerHeight) + ea;

                                    base = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "absolute",
                                        right: String(0),
                                        top: String(calendarTop) + ea,
                                        background: colorChip.white,
                                        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
                                        borderRadius: String(5) + ea,
                                        animation: "fadeuplite 0.3s ease",
                                        zIndex
                                      }
                                    });

                                    const calendar = instance.mother.makeCalendar(new Date(), function (e) {
                                      self.textContent = this.getAttribute("buttonValue");
                                      self.setAttribute("value", this.getAttribute("buttonValue"));
                                      self.parentElement.removeChild(self.parentElement.lastChild);
                                      self.parentElement.removeChild(self.parentElement.lastChild);
                                    });
                                    base.appendChild(calendar.calendarBase);

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                title: "정산 방법",
                                value: method,
                                event: async function (e) {
                                  try {
                                    if (this.getAttribute("value") === '' || this.getAttribute("value") === '-') {
                                      this.setAttribute("value", "계좌 이체");
                                      this.textContent = "계좌 이체";
                                    }

                                    const self = this;
                                    const zIndex = 1;
                                    let cloneInput, cancel;

                                    cancel = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const finalValue = this.parentElement.lastChild.value.trim();
                                          this.setAttribute("value", finalValue);
                                          this.textContent = finalValue;
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "fixed",
                                        top: String(0),
                                        left: String(0),
                                        width: String(100) + '%',
                                        height: String(100) + '%',
                                        background: "transparent",
                                        transition: "all 0s ease",
                                        zIndex
                                      }
                                    });

                                    cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
                                    cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
                                    cancel.style.width = String(window.innerWidth) + ea;
                                    cancel.style.height = String(window.innerHeight) + ea;

                                    cloneInput = createNode({
                                      mother: this.parentElement,
                                      mode: "input",
                                      event: {
                                        click: (e) => { e.preventDefault(); e.stopPropagation(); },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                        keypress: function (e) {
                                          if (e.key === "Enter") {
                                            const finalValue = this.parentElement.lastChild.value.trim();
                                            self.setAttribute("value", finalValue);
                                            self.textContent = finalValue;
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                          }
                                        }
                                      },
                                      style: {
                                        position: "absolute",
                                        right: String(0),
                                        top: String(0),
                                        outline: String(0),
                                        border: String(0),
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(300),
                                        color: colorChip.green,
                                        background: colorChip.gray0,
                                        textAlign: "right",
                                        width: this.getAttribute("value") === '-' || this.getAttribute("value") === '' ? "" : String(this.getBoundingClientRect().width) + ea,
                                        height: String(this.getBoundingClientRect().height) + ea,
                                        zIndex
                                      }
                                    });

                                    cloneInput.value = this.getAttribute("value");
                                    cloneInput.focus();

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                title: "증빙",
                                value: proof,
                                event: async function (e) {
                                  try {
                                    if (this.getAttribute("value") === '' || this.getAttribute("value") === '-') {
                                      const [ designer ] = await ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true });
                                      const defaultWording = /사업/gi.test(designer.information.business.businessInfo.classification) ? "세금 계산서" : "프리랜서";
                                      this.setAttribute("value", defaultWording);
                                      this.textContent = defaultWording;
                                    }

                                    const self = this;
                                    const zIndex = 1;
                                    let cloneInput, cancel;

                                    cancel = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const finalValue = this.parentElement.lastChild.value.trim();
                                          this.setAttribute("value", finalValue);
                                          this.textContent = finalValue;
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "fixed",
                                        top: String(0),
                                        left: String(0),
                                        width: String(100) + '%',
                                        height: String(100) + '%',
                                        background: "transparent",
                                        transition: "all 0s ease",
                                        zIndex
                                      }
                                    });

                                    cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
                                    cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
                                    cancel.style.width = String(window.innerWidth) + ea;
                                    cancel.style.height = String(window.innerHeight) + ea;

                                    cloneInput = createNode({
                                      mother: this.parentElement,
                                      mode: "input",
                                      event: {
                                        click: (e) => { e.preventDefault(); e.stopPropagation(); },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                        keypress: function (e) {
                                          if (e.key === "Enter") {
                                            const finalValue = this.parentElement.lastChild.value.trim();
                                            self.setAttribute("value", finalValue);
                                            self.textContent = finalValue;
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                          }
                                        }
                                      },
                                      style: {
                                        position: "absolute",
                                        right: String(0),
                                        top: String(0),
                                        outline: String(0),
                                        border: String(0),
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(300),
                                        color: colorChip.green,
                                        background: colorChip.gray0,
                                        textAlign: "right",
                                        width: this.getAttribute("value") === '-' || this.getAttribute("value") === '' ? "" : String(this.getBoundingClientRect().width) + ea,
                                        height: String(this.getBoundingClientRect().height) + ea,
                                        zIndex
                                      }
                                    });

                                    cloneInput.value = this.getAttribute("value");
                                    cloneInput.focus();

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              },
                              {
                                title: "수신자",
                                value: to,
                                event: async function (e) {
                                  try {
                                    if (this.getAttribute("value") === '' || this.getAttribute("value") === '-') {
                                      const [ { designer } ] = await ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true });
                                      this.setAttribute("value", designer);
                                      this.textContent = designer;
                                    }
                                    const self = this;
                                    const zIndex = 1;
                                    let cloneInput, cancel;

                                    cancel = createNode({
                                      mother: this.parentElement,
                                      event: {
                                        click: (e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const finalValue = this.parentElement.lastChild.value.trim();
                                          this.setAttribute("value", finalValue);
                                          this.textContent = finalValue;
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                          this.parentElement.removeChild(this.parentElement.lastChild);
                                        },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                      },
                                      style: {
                                        position: "fixed",
                                        top: String(0),
                                        left: String(0),
                                        width: String(100) + '%',
                                        height: String(100) + '%',
                                        background: "transparent",
                                        transition: "all 0s ease",
                                        zIndex
                                      }
                                    });

                                    cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
                                    cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
                                    cancel.style.width = String(window.innerWidth) + ea;
                                    cancel.style.height = String(window.innerHeight) + ea;

                                    cloneInput = createNode({
                                      mother: this.parentElement,
                                      mode: "input",
                                      event: {
                                        click: (e) => { e.preventDefault(); e.stopPropagation(); },
                                        contextmenu: (e) => { e.stopPropagation(); },
                                        keypress: function (e) {
                                          if (e.key === "Enter") {
                                            const finalValue = this.parentElement.lastChild.value.trim();
                                            self.setAttribute("value", finalValue);
                                            self.textContent = finalValue;
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                            self.parentElement.removeChild(self.parentElement.lastChild);
                                          }
                                        }
                                      },
                                      style: {
                                        position: "absolute",
                                        right: String(0),
                                        top: String(0),
                                        outline: String(0),
                                        border: String(0),
                                        fontSize: String(fontSize) + ea,
                                        fontWeight: String(300),
                                        color: colorChip.green,
                                        background: colorChip.gray0,
                                        textAlign: "right",
                                        width: this.getAttribute("value") === '-' || this.getAttribute("value") === '' ? "" : String(this.getBoundingClientRect().width) + ea,
                                        height: String(this.getBoundingClientRect().height) + ea,
                                        zIndex
                                      }
                                    });

                                    cloneInput.value = this.getAttribute("value");
                                    cloneInput.focus();

                                  } catch (e) {
                                    console.log(e);
                                  }
                                }
                              }
                            ];

                            baseTong = createNode({
                              mother: this,
                              mode: "aside",
                              event: {
                                click: (e) => { e.stopPropagation(); },
                                contextmenu: (e) => { e.stopPropagation(); }
                              },
                              style: {
                                position: "relative",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-end",
                                background: colorChip.gradientGreen,
                                paddingTop: String(innerPaddingLeft * (0.6)) + ea,
                                paddingBottom: String(innerPaddingLeft * (0.6)) + ea,
                                paddingLeft: String(innerPaddingLeft * (0.6)) + ea,
                                paddingRight: String(innerPaddingLeft) * (0.6) + ea,
                                borderRadius: String(3) + "px",
                                marginTop: String(imageMargin) + ea,
                                cursor: "",
                              },
                              children: [
                                {
                                  position: "relative",
                                  display: "block",
                                  background: colorChip.gray0,
                                  paddingTop: String(innerPaddingLeftVisual) + ea,
                                  paddingBottom: String(innerPaddingLeftVisual2) + ea,
                                  paddingLeft: String(innerPaddingLeft) + ea,
                                  paddingRight: String(innerPaddingLeft) + ea,
                                  borderRadius: String(3) + "px",
                                  width: String(100) + '%',
                                },
                                {
                                  text: "저장",
                                  event: {
                                    click: async function (e) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      try {
                                        if (/디자인비 선금/gi.test(responseName) || /디자인비 잔금/gi.test(responseName)) {

                                          window.alert("해당 기능은 차단되었습니다. DA 콘솔을 이용해주세요!");

                                        } else {

                                          let [ amount, date, method, proof, to ] = domArr.map((dom) => { return dom.getAttribute("value"); });
                                          let whereQuery, updateQuery;
                                          if (Number.isNaN(Number(amount.replace(/[^0-9]/gi, ''))) || Number(amount.replace(/[^0-9]/gi, '')) === 0 || !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(date)) {
                                            window.alert("정보를 먼저 올바르게 기입해주세요!");
                                          } else {
                                            amount = Number(amount.replace(/[^0-9]/gi, ''));
                                            date = stringToDate(date);
  
                                            whereQuery = { bilid };
                                            updateQuery = {};
  
                                            updateQuery["responses." + String(responsesIndex) + ".pay"] = [ { amount, date, oid: "" } ];
                                            updateQuery["responses." + String(responsesIndex) + ".proofs"] = [ { date, method, proof, to } ];
                                            await ajaxJson({ mode: "update", whereQuery, updateQuery }, PYTHONHOST + "/generalBill");
  
                                            if (responseName === "디자인비 선금" || responseName === "디자인비 잔금") {
                                              whereQuery = { proid };
                                              updateQuery = {};
                                              if (responseName === "디자인비 선금") {
                                                updateQuery["process.calculation.payments.first.date"] = date;
                                              } else {
                                                updateQuery["process.calculation.payments.remain.date"] = date;
                                              }
                                              await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");
                                            }
  
                                            window.alert("저장되었습니다!");
                                            window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&rmode=true";
  
                                          }

                                        }

                                      } catch (e) {
                                        console.log(e);
                                      }
                                    }
                                  },
                                  style: {
                                    position: "relative",
                                    display: "inline-flex",
                                    flexShrink: String(0),
                                    fontSize: String(fontSize) + ea,
                                    fontWeight: String(600),
                                    color: colorChip.green,
                                    background: colorChip.gray0,
                                    paddingTop: String(innerPaddingTop) + ea,
                                    paddingBottom: String(innerPaddingBottom) + ea,
                                    paddingLeft: String(innerPaddingLeft) + ea,
                                    paddingRight: String(innerPaddingLeft) + ea,
                                    borderRadius: String(3) + "px",
                                    marginLeft: String(imageMargin) + ea,
                                    cursor: "pointer",
                                  }
                                },
                              ]
                            }).children[0];
                            for (let { title, value, event } of map) {
                              tempDom = createNode({
                                mother: baseTong,
                                style: {
                                  position: "relative",
                                  display: "block",
                                  fontSize: String(fontSize) + ea,
                                  fontWeight: String(400),
                                  color: colorChip.black,
                                  marginBottom: String(imageMargin / 2) + ea,
                                },
                                children: [
                                  {
                                    style: {
                                      position: "absolute",
                                      display: "block",
                                      borderBottom: "1px dashed " + colorChip.green,
                                      height: String(lineTop) + '%',
                                      width: String(100) + '%',
                                      opacity: String(lineOpacity),
                                    }
                                  },
                                  {
                                    text: title,
                                    style: {
                                      position: "relative",
                                      display: "inline-block",
                                      fontSize: String(fontSize) + ea,
                                      fontWeight: String(400),
                                      color: colorChip.black,
                                      marginBottom: String(imageMargin) + ea,
                                      paddingRight: String(innerPaddingBottom) + ea,
                                      background: colorChip.gray0,
                                    }
                                  },
                                  {
                                    text: value,
                                    attribute: { value },
                                    event: { click: event },
                                    style: {
                                      position: "absolute",
                                      right: String(0),
                                      top: String(0),
                                      fontSize: String(fontSize) + ea,
                                      fontWeight: String(300),
                                      color: colorChip.black,
                                      paddingLeft: String(innerPaddingBottom) + ea,
                                      background: colorChip.gray0,
                                      textAlign: "right",
                                    }
                                  }
                                ]
                              }).children[2];
                              domArr.push(tempDom);
                            }

                          }

                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }
                ],
                style: {
                  position: "relative",
                  display: "block",
                  width: String(100) + '%',
                  height: "auto",
                  marginBottom: String(imageMargin) + ea,
                  opacity: String(deactive ? 0.4 : 1),
                },
                children
              });
              scrollTong.style.height = "auto";
              num++;
            }
          }

          if (responseBoo) {
            responseLoad();
          } else {
            requestLoad();
          }

          scrollTong.style.height = "auto";

        } else {
          window.alert("결과가 없습니다!");
        }
      }).catch((err) => {
        console.log(err);
      });

      historyBox.style.animation = "fadeout 0.3s ease forwards";
      matrixBox.style.animation = "fadein 0.3s ease forwards";
    }
  });

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
  const { colorChip, hasQuery, removeQuery, appendQuery } = GeneralJs;
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
        domTargets[0].style.color = domTargets[1].style.color = colorChip.green;
      } else {
        domTargets = instance.standardDoms[z].children;
        domTargets[0].style.color = domTargets[1].style.color = colorChip.gray4;
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
        background: colorChip.cancelBlack,
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
    if (GeneralJs.returnGet().entire !== "true") {
      div_clone.classList.add("fadeup");
    }
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

    if (GeneralJs.returnGet().entire === "true") {
      style = {
        position: "fixed",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(window.innerWidth) + ea,
        height: String(window.innerHeight) + ea,
        zIndex: String(2),
      };
    } else {
      style = {
        position: "fixed",
        background: colorChip.white,
        top: String(margin) + ea,
        left: String(instance.grayBarWidth + margin) + ea,
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        width: String(window.innerWidth - instance.grayBarWidth - (margin * 2)) + ea,
        height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
        zIndex: String(2),
      };
    }
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    if (hasQuery("proid")) {
      removeQuery("proid");
    }
    appendQuery({ proid: thisCase[standard[1]] });

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
  const { setQueue } = GeneralJs;
  return function (e) {
    if (instance.totalFather !== null) {
      instance.totalFather.style.zIndex = String(-1);
      instance.totalFather.classList.remove("fadein");
      instance.totalFather.classList.add("fadeout");
    }
    instance.totalMother.style.display = "block";
    instance.onView = "mother";
    setQueue(() => {
      if (instance.totalFather !== null) {
        instance.totalFatherChildren = [];
        instance.totalFather.remove();
      }
      instance.searchInput.parentElement.parentElement.removeChild(instance.searchInput.parentElement.parentElement.lastChild);
      instance.searchInput.parentElement.style.display = "block";
      instance.totalFather = null;
      instance.totalMother.classList.remove("justfadeinoriginal");
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
  const { createNode, colorChip, withOut, blankHref, isMac } = GeneralJs;
  const ea = "px";
  const wordings = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ];
  const blank = "&nbsp;&nbsp;&nbsp;"
  let div_clone;
  let style;
  let entireMargin;
  let margin;
  let scrollBox, boxTop, boxNumber;
  let titleTop;
  let innerMargin;
  let summaryHeight;
  let factorSummaryHeight;
  let boxInnerMargin;
  let boxTitleTop;
  let blockBoxTop;
  let blockTong, summaryTong;
  let blockGrayTong, summaryWhiteTong;
  let totalSummaryTong;
  let whiteBlock;
  let whiteInnerMargin;
  let whiteInnerPaddingTop;
  let whiteInnerPaddingBottom;
  let whiteInnerPaddingLeft;
  let whiteInnerSize, whiteInnerWeight;
  let whiteInnerSize2, whiteInnerWeight2;
  let whiteWordsBetween;
  let whiteSumTop, whiteSumSize, whiteSumWeight;
  let summaryText;
  let whiteSumTotalTop;

  margin = 12;
  entireMargin = margin * 3;
  boxTop = 90;
  innerMargin = 8;
  summaryHeight = 100;
  boxNumber = 4;
  factorSummaryHeight = 75;
  boxInnerMargin = 20;
  boxTitleTop = 16;
  blockBoxTop = 45;
  whiteInnerMargin = 5;
  whiteInnerPaddingTop = isMac() ? 6 : 7;
  whiteInnerPaddingBottom = isMac() ? 8 : 7;
  whiteInnerPaddingLeft = 13;
  whiteInnerSize = 13;
  whiteInnerWeight = 600;
  whiteInnerSize2 = 8;
  whiteInnerWeight2 = 400;
  whiteWordsBetween = 4;
  whiteSumTop = 18;
  whiteSumSize = 22;
  whiteSumWeight = 200;
  whiteSumTotalTop = 31;

  if (data.numbers.client === 0) {
    data.numbers.client = 1;
  }

  //entire scroll box
  scrollBox = GeneralJs.nodes.div.cloneNode(true);
  scrollBox.classList.add("noScrollBar");
  style = {
    position: "relative",
    top: String(boxTop) + ea,
    marginLeft: String(entireMargin) + ea,
    width: withOut(entireMargin * 2, ea),
    height: withOut(boxTop + entireMargin, ea),
    overflow: "scroll",
  };
  for (let z in style) {
    scrollBox.style[z] = style[z];
  }

  blockTong = [];
  summaryTong = [];
  for (let i = 0; i < boxNumber; i++) {
    blockGrayTong = createNode({
      mother: scrollBox,
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(100% - " + String(innerMargin * (boxNumber - 1)) + ea + ") / " + String(boxNumber) + ")",
        height: withOut(summaryHeight + innerMargin, ea),
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        marginRight: String(i === boxNumber - 1 ? 0 : innerMargin) + ea,
        marginBottom: String(innerMargin) + ea,
      },
      children: [
        {
          text: wordings[i],
          style: {
            fontSize: String(15) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            position: "absolute",
            top: String(boxTitleTop) + ea,
            left: String(boxInnerMargin) + ea,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(blockBoxTop) + ea,
            left: String(boxInnerMargin) + ea,
            width: withOut(boxInnerMargin * 2, ea),
            height: withOut((boxInnerMargin / 2) + blockBoxTop + boxInnerMargin + factorSummaryHeight, ea),
            borderRadius: String(5) + "px",
            background: colorChip.gray5,
            overflow: "scroll",
          },
          children: [
            {
              style: {
                position: "relative",
                top: String(boxInnerMargin / 2) + ea,
                left: String(boxInnerMargin / 2) + ea,
                width: withOut(boxInnerMargin, ea),
                paddingBottom: String(boxInnerMargin * 10) + ea,
                height: "auto",
              }
            }
          ]
        },
        {
          style: {
            position: "absolute",
            bottom: String(boxInnerMargin) + ea,
            left: String(boxInnerMargin) + ea,
            width: withOut(boxInnerMargin * 2, ea),
            height: String(factorSummaryHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.white,
          }
        }
      ]
    }).children[1];
    summaryWhiteTong = blockGrayTong.nextElementSibling;
    blockGrayTong = blockGrayTong.firstChild;
    blockTong.push(blockGrayTong);
    summaryTong.push(summaryWhiteTong);
  }

  totalSummaryTong = createNode({
    mother: scrollBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      height: String(summaryHeight) + ea,
    }
  });

  for (let i = 0; i < boxNumber; i++) {
    for (let { proid, cliid, name } of data.serviceArr[i]) {
      whiteBlock = createNode({
        mother: blockTong[i],
        class: [ "hoverDefault_lite" ],
        attribute: { proid, cliid, name },
        event: {
          click: function (e) {
            const proid = this.getAttribute("proid");
            blankHref(window.location.protocol + "//" + window.location.host + "/project?proid=" + proid);
          }
        },
        style: {
          display: "inline-block",
          width: String(1000) + ea,
          background: colorChip.white,
          borderRadius: String(5) + ea,
          marginRight: String(whiteInnerMargin) + ea,
          marginBottom: String(whiteInnerMargin) + ea,
          paddingTop: String(whiteInnerPaddingTop) + ea,
          paddingBottom: String(whiteInnerPaddingBottom) + ea,
          paddingLeft: String(whiteInnerPaddingLeft) + ea,
          paddingRight: String(whiteInnerPaddingLeft) + ea,
        }
      });
      createNode({
        mother: whiteBlock,
        text: name,
        style: {
          display: "inline-block",
          fontSize: String(whiteInnerSize) + ea,
          fontWeight: String(whiteInnerWeight),
          color: colorChip.black,
          marginRight: String(whiteWordsBetween) + ea,
        }
      })
      createNode({
        mother: whiteBlock,
        text: proid,
        style: {
          display: "inline-block",
          fontSize: String(whiteInnerSize2) + ea,
          fontWeight: String(whiteInnerWeight2),
          color: colorChip.green,
        }
      });
      whiteBlock.style.width = "auto";
    }

    createNode({
      mother: summaryTong[i],
      text: `${String(data.serviceArr[i].length)}<u%명%u>${blank}<b%/%b>${blank}${String(Math.round((data.serviceArr[i].length / data.numbers.project) * 10000) / 100)}<u%%%u>`,
      style: {
        position: "absolute",
        textAlign: "center",
        width: String(100) + '%',
        top: String(whiteSumTop) + ea,
        fontSize: String(whiteSumSize) + ea,
        fontWeight: String(whiteSumWeight),
        color: colorChip.black,
      },
      bold: {
        fontSize: String(whiteSumSize) + ea,
        fontWeight: String(whiteSumWeight),
        color: colorChip.green,
      },
      under: {
        fontSize: String(whiteSumSize) + ea,
        fontWeight: String(whiteSumWeight),
        color: colorChip.deactive,
      },
    });

  }

  summaryText = '';
  summaryText += "<u%계약%u> ";
  summaryText += String(data.numbers.client) + "<u%명%u>";
  summaryText += blank;
  summaryText += "<b%/%b>";
  summaryText += blank;
  summaryText += "<u%계약%u> ";
  for (let i = 0; i < data.serviceArr.length; i++) {
    summaryText += String(data.serviceArr[i].length) + "<u%명%u>";
    summaryText += "<u%, %u>";
  }
  summaryText = summaryText.slice(0, -8);
  summaryText += blank;
  summaryText += "<b%/%b>";
  summaryText += blank;
  summaryText += "<u%계약율%u> ";
  for (let i = 0; i < data.serviceArr.length; i++) {
    summaryText += String(Math.round((data.serviceArr[i].length / data.numbers.client) * 10000) / 100) + "<u%%%u>";
    summaryText += "<u%, %u>";
  }
  summaryText = summaryText.slice(0, -8);

  createNode({
    mother: totalSummaryTong,
    text: summaryText,
    style: {
      position: "absolute",
      textAlign: "center",
      width: String(100) + '%',
      top: String(whiteSumTotalTop) + ea,
      fontSize: String(whiteSumSize) + ea,
      fontWeight: String(whiteSumWeight),
      color: colorChip.black,
    },
    bold: {
      fontSize: String(whiteSumSize) + ea,
      fontWeight: String(whiteSumWeight),
      color: colorChip.green,
    },
    under: {
      fontSize: String(whiteSumSize) + ea,
      fontWeight: String(whiteSumWeight),
      color: colorChip.deactive,
    },
  });


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
  const response = data;
  const { stringToDate, ajaxJson, dateToString } = GeneralJs;
  const todayString = dateToString(new Date());
  let todayArr = todayString.split('-');
  let todayRange;
  let div_clone, div_clone2, input_clone;
  let style, inputStyle;
  let ea = "px";
  let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  const scrollBox = this.reportScrollBox(data, motherWidth);
  let top, height, margin;

  todayRange = dateToString(response.start).slice(2) + " ~ " + dateToString(response.end).slice(2);

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
      const dateArr = this.value.split(" ~ ");
      const startDay = '20' + dateArr[0];
      const endDay = '20' + dateArr[1];
      input_clone.blur();
      mother.removeChild(mother.lastChild);
      loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
      loadingIcon.style.opacity = "1";

      ajaxJson({
        mode: "service",
        start: stringToDate(startDay),
        end: stringToDate(endDay),
      }, "/getProjectReport", { equal: true }).then((data) => {
        loadingIcon.style.opacity = "0";
        const scrollBox = instance.reportScrollBox(data, motherWidth);
        mother.appendChild(scrollBox);
      }).catch((err) => {
        console.log(err);
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
  const { stringToDate, ajaxJson, dateToString } = GeneralJs;
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
      let ago, agoDate;

      motherBoo = (instance.onView === "mother") ? true : false;

      margin = 30;
      ago = 30;
      agoDate = new Date();
      agoDate.setDate(agoDate.getDate() - ago);

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

      ajaxJson({
        mode: "service",
        start: agoDate,
        end: today
      }, "/getProjectReport", { equal: true }).then((data) => {
        svg_icon.style.opacity = "0";
        instance.reportContents(data, div_clone, svg_icon);
      }).catch((err) => {
        console.log(err);
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

ProjectJs.prototype.requestViewMakerDetail = async function (recycle = false, proid) {
  const instance = this;
  const { ea } = this;
  const { ajaxJson, colorChip, createNode, withOut } = GeneralJs;
  try {
    const [ thisProject ] = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    const [ thisDesigner ] = await ajaxJson({ noFlat: true, whereQuery: { desid: thisProject.desid } }, "/getDesigners", { equal: true });
    const [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid: thisProject.cliid } }, "/getClients", { equal: true });
    return function () {
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
      if (GeneralJs.returnGet().entire !== "true") {
        div_clone.classList.add("fadeup");
      }
      div_clone.classList.add("totalWhite");
      if (GeneralJs.returnGet().entire === "true") {
        style = {
          position: "fixed",
          background: colorChip.white,
          borderRadius: String(5) + ea,
          boxShadow: "0 2px 10px -6px " + colorChip.shadow,
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(window.innerWidth) + ea,
          height: String(window.innerHeight) + ea,
          zIndex: String(2),
        };
      } else {
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
      }
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      createNode({
        mother: div_clone,
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
            src: window.location.protocol + "//" + window.location.host + "/designer?mode=request&desid=" + thisDesigner.desid + "&cliid=" + thisClient.cliid + "&entire=true&dataonly=true",
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

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.requestViewMaker = function (proid) {
  const instance = this;
  return async function (e) {                                                                                                                                                                                                                                                                                                                                                                                                                                             
    e.preventDefault();
    try {
      let tempFunc;
      if (GeneralJs.stacks.whiteBox !== 1) {
        if (instance.whiteBox !== null) {
          tempFunc = instance.whiteCancelMaker((await instance.requestViewMakerDetail(true, proid)), true);
          tempFunc();
        } else {
          tempFunc = await instance.requestViewMakerDetail(false, proid);
          tempFunc();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

ProjectJs.prototype.processViewMakerDetail = async function (recycle = false, proid) {
  const instance = this;
  const { ea } = this;
  const { ajaxJson, colorChip, createNode, withOut } = GeneralJs;
  try {
    const [ thisProject ] = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    const [ thisDesigner ] = await ajaxJson({ noFlat: true, whereQuery: { desid: thisProject.desid } }, "/getDesigners", { equal: true });
    const [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid: thisProject.cliid } }, "/getClients", { equal: true });
    return function () {
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
      if (GeneralJs.returnGet().entire !== "true") {
        div_clone.classList.add("fadeup");
      }
      div_clone.classList.add("totalWhite");
      if (GeneralJs.returnGet().entire === "true") {
        style = {
          position: "fixed",
          background: colorChip.white,
          borderRadius: String(5) + ea,
          boxShadow: "0 2px 10px -6px " + colorChip.shadow,
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(window.innerWidth) + ea,
          height: String(window.innerHeight) + ea,
          zIndex: String(2),
        };
      } else {
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
      }
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      createNode({
        mother: div_clone,
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
            src: window.location.protocol + "//" + window.location.host + "/process?proid=" + thisProject.proid + "&entire=true&dataonly=true",
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

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.processViewMaker = function (proid) {
  const instance = this;
  return async function (e) {                                                                                                                                                                                                                                                                                                                                                                                                                                             
    e.preventDefault();
    try {
      let tempFunc;
      if (GeneralJs.stacks.whiteBox !== 1) {
        if (instance.whiteBox !== null) {
          tempFunc = instance.whiteCancelMaker((await instance.processViewMakerDetail(true, proid)), true);
          tempFunc();
        } else {
          tempFunc = await instance.processViewMakerDetail(false, proid);
          tempFunc();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

ProjectJs.prototype.processListViewMakerDetail = function (recycle = false) {
  const instance = this;
  const { ea } = this;
  const { ajaxJson, colorChip, createNode, withOut } = GeneralJs;
  try {
    return function () {
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
      if (GeneralJs.returnGet().entire !== "true") {
        div_clone.classList.add("fadeup");
      }
      div_clone.classList.add("totalWhite");
      if (GeneralJs.returnGet().entire === "true") {
        style = {
          position: "fixed",
          background: colorChip.white,
          borderRadius: String(5) + ea,
          boxShadow: "0 2px 10px -6px " + colorChip.shadow,
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          height: String(100) + '%',
          zIndex: String(2),
        };
      } else {
        style = {
          position: "fixed",
          background: GeneralJs.colorChip.white,
          top: String(margin) + ea,
          left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
          borderRadius: String(5) + ea,
          boxShadow: "0 2px 10px -6px " + GeneralJs.colorChip.shadow,
          width: "calc(100% - " + String((motherBoo ? instance.grayBarWidth : 0) + (margin * 2)) + ea + ")",
          height: "calc(100% - " + String(instance.belowHeight + (margin * 2) + 10) + ea + ")",
          zIndex: String(2),
        };
      }
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      div_clone.setAttribute("kind", "process");

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      createNode({
        mother: div_clone,
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
            src: window.location.protocol + "//" + window.location.host + "/process?entire=true&dataonly=true",
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

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProjectJs.prototype.processListViewMaker = function () {
  const instance = this;
  return function (e) {
    e.preventDefault();
    let tempFunc;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.processListViewMakerDetail(true), true);
        tempFunc();
      } else {
        tempFunc = instance.processListViewMakerDetail(false);
        tempFunc();
      }
    }
  }
}

ProjectJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { selfHref } = GeneralJs;
  const { square: { up, down, reportIcon, returnIcon }, sub: { folder } } = this.mother.belowButtons;
  up.addEventListener("click", this.processListViewMaker());
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
        return GeneralJs.ajaxJson({ idArr: proidArr, method: "project", property: "issue" }, "/getHistoryProperty");
      }).then((obj2) => {
        valuesArr[0].push("메모");
        for (let i = 1; i < valuesArr.length; i++) {
          valuesArr[i].push(obj2[valuesArr[i].find((c) => { return /^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(c); })]);
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
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
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
          if (instance.whiteBox.contentsBox.getAttribute("kind") === "file" || instance.whiteBox.contentsBox.getAttribute("kind") === "process") {
            // pass
          } else {
            window.location.reload();
          }
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

        res = await ajaxJson({
          mode: "read",
          db: "console",
          collection: "realtimeDesigner",
          whereQuery: { desid },
        }, "/generalMongo", { equal: true });

        if (res.length === 0) {
          target = { desid, possible: [], projects: [] };
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
          projectObj.project = [ { start, end } ];
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
    const syncBill = async function (thisCase, column, value, pastValue) {
      try {
        const { ajaxJson, sleep } = GeneralJs;
        await sleep(1000);
        const { proid } = thisCase;
        const project = (await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
        const desid = proid.desid;
        const cliid = proid.cliid;
        const method = (project.service.online ? "online" : "offline");
        let thisBill, bilid;
        if (desid !== '') {
          thisBill = await ajaxJson({
            mode: "read",
            whereQuery: {
              $and: [
                { "links.proid": proid },
                { "links.desid": desid },
                { "links.cliid": cliid },
                { "links.method": method },
              ]
            }
          }, PYTHONHOST + "/generalBill");
          if (thisBill.length > 0) {
            thisBill = thisBill[0];
            bilid = thisBill.bilid;
            await ajaxJson({ bilid }, PYTHONHOST + "/amountConverting");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    const excuteResponse = async function (thisCase, column, value, pastValue) {
      try {
        const { ajaxJson, sleep, stringToDate } = GeneralJs;
        const { proid } = thisCase;
        const project = (await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
        const desid = proid.desid;
        const cliid = proid.cliid;
        const method = (project.service.online ? "online" : "offline");
        const date = stringToDate(value);
        let thisBill, bilid;
        let responseIndex;
        if (desid !== '') {
          thisBill = await ajaxJson({
            mode: "read",
            whereQuery: {
              $and: [
                { "links.proid": proid },
                { "links.desid": desid },
                { "links.cliid": cliid },
                { "links.method": method },
              ]
            }
          }, PYTHONHOST + "/generalBill");
          if (thisBill.length > 0) {
            thisBill = thisBill[0];
            bilid = thisBill.bilid;


            if (column === "paymentsFirstDate") {
              responseIndex = thisBill.responses.findIndex((obj) => {
                return /홈리에종 선금 정산/gi.test(obj.name);
              });
            } else {
              responseIndex = thisBill.responses.findIndex((obj) => {
                return /홈리에종 잔금 정산/gi.test(obj.name);
              });
            }

            await ajaxJson({ bilid, responseIndex, date }, PYTHONHOST + "/excuteResponse", { equal: true });
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
      remainSupply: syncBill,
      remainVat: syncBill,
      remainConsumer: syncBill,
      remainPure: syncBill,
      method: syncBill,
      percentage: syncBill,
      paymentsTotalAmount: syncBill,
      paymentsFirstAmount: syncBill,
      paymentsRemainAmount: syncBill,
      paymentsFirstDate: excuteResponse,
      paymentsRemainDate: excuteResponse,
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

ProjectJs.prototype.rawCommentView = function (proid) {
  const instance = this;
  const { createNode, withOut, colorChip, ajaxJson, removeByClass, dateToString, svgMaker } = GeneralJs;
  return async function () {
    try {
      const [ project ] = await ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true });
      const totalContents = document.getElementById("totalcontents");
      const rawCommentPopupClassName = "rawCommentPopupClassName";
      const { belowHeight } = instance;
      const ea = "px";
      const zIndex = 4;
      let thisRawContents;
      let cancelBack, whitePrompt;
      let whitePromptWidth;
      let whitePromptMarginTop;
      let realBaseTong;
      let realMargin;
      let dateCloseTong;
      let contentsTong;
      let closeButtonHeight;
      let grayBlockBetween;
      let textMargin;
      let updatedTextTop;
      let textSize;
      let xIconWidth;
      let textWeight;
      let textLineHeight;

      whitePromptMarginTop = 30;
      whitePromptWidth = window.innerWidth - (whitePromptMarginTop * 2);
      
      realMargin = 20;
      closeButtonHeight = 50;
      grayBlockBetween = 8;

      textMargin = 30;
      updatedTextTop = -1;
      textSize = 14;
      xIconWidth = 16;

      textWeight = 400;
      textLineHeight = 1.6;

      if ((/수집 완료/gi.test(project.contents.raw.portfolio.status) || /편집중/gi.test(project.contents.raw.portfolio.status) || /편집 완료/gi.test(project.contents.raw.portfolio.status))) {

        thisRawContents = await ajaxJson({
          mode: "get",
          proid: project.proid,
          desid: project.desid,
          cliid: project.cliid,
        }, SECONDHOST + "/projectDesignerRaw", { equal: true });

        cancelBack = createNode({
          mother: totalContents,
          class: [ rawCommentPopupClassName ],
          event: {
            click: (e) => {
              removeByClass(rawCommentPopupClassName);
            }
          },
          style: {
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(belowHeight, ea),
            background: colorChip.black,
            opacity: String(0.3),
            position: "fixed",
            zIndex: String(zIndex),
          }
        });

        whitePrompt = createNode({
          mother: totalContents,
          class: [ rawCommentPopupClassName ],
          event: {
            click: (e) => { e.stopPropagation() }
          },
          style: {
            display: "inline-flex",
            position: "fixed",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: String(5) + "px",
            background: colorChip.white,
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            width: String(whitePromptWidth) + ea,
            height: "calc(calc(100vh - " + String(belowHeight) + ea + ") - " + String(whitePromptMarginTop * 2) + ea + ")",
            left: withOut(50, whitePromptWidth / 2, ea),
            top: String(whitePromptMarginTop) + ea,
            zIndex: String(zIndex),
            animation: "fadeuplite 0.3s ease",
          }
        });

        realBaseTong = createNode({
          mother: whitePrompt,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: withOut(realMargin * 2, ea),
            height: withOut(realMargin * 2, ea),
          }
        });

        dateCloseTong = createNode({
          mother: realBaseTong,
          style: {
            display: "flex",
            flexDirection: "row",
            width: withOut(0, ea),
            height: String(closeButtonHeight) + ea,
            marginBottom: String(grayBlockBetween) + ea,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                width: withOut(closeButtonHeight + grayBlockBetween, ea),
                height: String(closeButtonHeight) + ea,
                marginRight: String(grayBlockBetween) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.gray0,
                alignItems: "center",
                justifyContent: "start",
              },
              child: {
                text: "Updated : " + dateToString(thisRawContents.date, true),
                style: {
                  display: "inline-block",
                  left: String(textMargin) + ea,
                  top: String(updatedTextTop) + ea,
                  position: "relative",
                  fontSize: String(textSize) + ea,
                  fontWeight: String(500),
                  fontFamily: "graphik",
                  fontStyle: "italic",
                }
              }
            },
            {
              event: {
                click: (e) => {
                  removeByClass(rawCommentPopupClassName);
                }
              },
              style: {
                display: "inline-flex",
                width: String(closeButtonHeight) + ea,
                height: String(closeButtonHeight) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.gray0,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              },
              child: {
                mode: "svg",
                source: svgMaker.closeIcon(colorChip.shadow),
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(xIconWidth) + ea,
                }
              }
            }
          ]
        });
  
        contentsTong = createNode({
          mother: realBaseTong,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(closeButtonHeight + grayBlockBetween, ea),
            borderRadius: String(5) + "px",
            background: colorChip.gray0,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(textMargin * 2, ea),
              height: withOut(textMargin * 2, ea),
              overflow: "scroll",
            },
            child: {
              mode: "textarea",
              text: thisRawContents.contents.body,
              attribute: {
                proid: project.proid,
                desid: project.desid,
                cliid: project.cliid,
              },
              event: {
                blur: async function (e) {
                  try {
                    const proid = this.getAttribute("proid");
                    const desid = this.getAttribute("desid");
                    const cliid = this.getAttribute("cliid");
                    let body;
                    let type;
                    let mode;
                    let response;
                    mode = "update";
                    type = "web";
                    body = this.value.replace(/[\=\&]/gi, '').trim();
                    response = await ajaxJson({ mode, proid, desid, cliid, body, type }, SECONDHOST + "/projectDesignerRaw");
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                width: withOut(0),
                height: withOut(0),
                fontSize: String(textSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.black,
                background: "transparent",
                border: String(0),
                outline: String(0),
                lineHeight: String(textLineHeight),
              }
            }
          }
        })

      } else {
        window.alert("디자이너 글이 아직 수집되지 않았습니다!");
      }

    } catch (e) {
      console.log(e);
    }
  }
}

ProjectJs.prototype.evalutaionStatusView = function (proid) {
  const instance = this;
  const { createNode, withOut, colorChip, ajaxJson, removeByClass, dateToString, svgMaker } = GeneralJs;
  return async function () {
    try {
      const [ project ] = await ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true });
      const totalContents = document.getElementById("totalcontents");
      const rawCommentPopupClassName = "rawCommentPopupClassName";
      const { belowHeight } = instance;
      const ea = "px";
      const zIndex = 4;
      let thisRawContents;
      let cancelBack, whitePrompt;
      let whitePromptWidth;
      let whitePromptMarginTop;
      let realBaseTong;
      let realMargin;
      let dateCloseTong;
      let contentsTong;
      let closeButtonHeight;
      let grayBlockBetween;
      let textMargin;
      let updatedTextTop;
      let textSize;
      let xIconWidth;
      let textWeight;
      let textLineHeight;

      whitePromptMarginTop = 30;
      whitePromptWidth = window.innerWidth - (whitePromptMarginTop * 2);
      
      realMargin = 60;
      closeButtonHeight = 50;
      grayBlockBetween = 8;

      textMargin = 30;
      updatedTextTop = -1;
      textSize = 14;
      xIconWidth = 16;

      textWeight = 400;
      textLineHeight = 1.6;

      cancelBack = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: (e) => {
            removeByClass(rawCommentPopupClassName);
          }
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          opacity: String(0.3),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-flex",
          position: "fixed",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          height: "calc(calc(100vh - " + String(belowHeight) + ea + ") - " + String(whitePromptMarginTop * 2) + ea + ")",
          left: withOut(50, whitePromptWidth / 2, ea),
          top: String(whitePromptMarginTop) + ea,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
        }
      });

      realBaseTong = createNode({
        mother: whitePrompt,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(realMargin * 2, ea),
          height: withOut(realMargin * 2, ea),
        }
      });

      contentsTong = createNode({
        mother: realBaseTong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: withOut(0, ea),
          borderRadius: String(5) + "px",
          background: colorChip.gray0,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          mode: "iframe",
          attribute: {
            src: BACKHOST + "/middle/clientEvaluation?proid=" + proid + "&entire=true",
          },
          style: {
            border: 0,
            outline: 0,
            display: "flex",
            position: "relative",
            width: withOut(0 * 2, ea),
            height: withOut(0 * 2, ea),
          },
        }
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ProjectJs.prototype.rawCommentUpload = function (proid) {
  const instance = this;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;
  return async function () {
    try {
      const [ project ] = await ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true });
      const desid = project.desid;
      const cliid = project.cliid;
      const [ designer ] = await ajaxJson({ noFlat: true, where: { desid } }, "/getDesigners", { equal: true });
      const [ client ] = await ajaxJson({ noFlat: true, where: { cliid } }, "/getClients", { equal: true });
      const totalContents = document.getElementById("totalcontents");
      const commentPopupClassName = "commentPopupClassName";
      const { belowHeight } = instance;
      const ea = "px";
      const zIndex = 4;
      let cancelBack, whitePrompt, hiddenInput;
      let whitePromptWidth;
      let whitePromptPaddingTop;
      let whitePromptPaddingBottom;
      let whitePromptTitleHeight;
      let whitePromptButtonHeight;
      let whitePromptTitleSize;
      let whitePromptTitleWeight;
      let whitePromptTitleBoldWeight;
      let whitePromptTitleLineHeight;
      let whitePromptTitleTextTop;
      let whitePromptButtonBetween;
      let whitePromptButtonTextTop;
      let whitePromptButtonWidth;
      let whitePromptButtonSize;
      let whitePromptButtonWeight;

      whitePromptWidth = <%% 600, 600, 520, 450, 86 %%>;
      whitePromptPaddingTop = <%% 12, 12, 10, 8, 2 %%>;
      whitePromptPaddingBottom = <%% 40, 40, 36, 32, 5.6 %%>;
      whitePromptTitleHeight = <%% 110, 110, 100, 80, 16 %%>;
      whitePromptButtonHeight = <%% 35, 35, 32, 30, 6 %%>;

      whitePromptTitleSize = <%% 20, 20, 18, 16, 3.2 %%>;
      whitePromptTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
      whitePromptTitleBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
      whitePromptTitleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
      whitePromptTitleTextTop = <%% 0, 0, 0, 0, 0 %%>;

      whitePromptButtonBetween = <%% 6, 6, 5, 4, 1 %%>;
      whitePromptButtonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
      whitePromptButtonWidth = <%% 125, 125, 125, 115, 24 %%>;

      whitePromptButtonSize = <%% 13, 13, 12, 11, 2.5 %%>;
      whitePromptButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

      cancelBack = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => {
            removeByClass(commentPopupClassName);
          }
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          opacity: String(0.3),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      hiddenInput = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        mode: "input",
        attribute: {
          type: "file",
          name: "comments",
          proid,
          desid,
          cliid,
          designer: designer.designer,
          client: client.name,
        },
        event: {
          change: async function (e) {
            try {
              const proid = this.getAttribute("proid");
              const designer = this.getAttribute("designer");
              const client = this.getAttribute("client");
              const desid = this.getAttribute("desid");
              const cliid = this.getAttribute("cliid");
              let thisFile, formData, res, loading;
              if ([ ...this.files ].length === 1) {
                thisFile = [ ...this.files ][0];

                formData = new FormData();
                formData.enctype = "multipart/form-data";
                formData.append("proid", proid);
                formData.append("designer", designer);
                formData.append("client", client);
                formData.append("comments", thisFile);
                formData.append("desid", desid);
                formData.append("cliid", cliid);

                loading = instance.mother.grayLoading();

                [ res ] = equalJson(await ajaxForm(formData, BRIDGEHOST + "/middleCommentsBinary"));
                await ajaxJson({ whereQuery: { proid }, updateQuery: { "contents.raw.portfolio.status": "원본 수집 완료" } }, SECONDHOST + "/updateProject");
                await ajaxJson({ message: designer + " 실장님이 콘솔을 통해 " + client + " 고객님 디자이너 글을 업로드 했습니다!(홈리에종 콘솔)\n" + BACKHOST.replace(/\:3000/gi, '') + "/project__query__proid__equal__" + proid + "__amper__raw__equal__contents", channel: "#301_console" }, BACKHOST + "/sendSlack");

                loading.remove();

                cancelBack.click();

                window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + proid + "&raw=contents";

              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "none",
          opacity: String(0),
          position: "absolute",
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ commentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-block",
          position: "fixed",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          left: withOut(50, whitePromptWidth / 2, ea),
          top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String((whitePromptPaddingTop + whitePromptPaddingBottom + whitePromptTitleHeight + whitePromptButtonHeight) / 2) + ea + ")",
          paddingTop: String(whitePromptPaddingTop) + ea,
          paddingBottom: String(whitePromptPaddingBottom) + ea,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptTitleHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
            },
            children: [
              {
                text: "디자이너 글 탬플릿을 활용하여\n디자이너 글을 <b%워드 / pdf / 한글 등의 파일로 업로드%b> 해주세요!",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(whitePromptTitleTextTop) + ea,
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleWeight),
                  color: colorChip.black,
                  lineHeight: String(whitePromptTitleLineHeight),
                },
                bold: {
                  fontSize: String(whitePromptTitleSize) + ea,
                  fontWeight: String(whitePromptTitleBoldWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              position: "relative",
              height: String(whitePromptButtonHeight) + ea,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "row",
            },
            children: [
              {
                event: {
                  click: async function (e) {
                    try {
                      const loading = instance.mother.whiteProgressLoading();
                      await downloadFile(S3HOST + "/photo/sample/commentsSample.docx", null, loading.progress.firstChild);
                      loading.remove();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginRight: String(whitePromptButtonBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 탬플릿",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: colorChip.white,
                    }
                  }
                ]
              },
              {
                event: {
                  click: function (e) {
                    const targetInput = document.querySelector("input." + commentPopupClassName);
                    targetInput.click();
                  }
                },
                style: {
                  display: "inline-flex",
                  width: String(whitePromptButtonWidth) + ea,
                  height: String(whitePromptButtonHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGreen,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                children: [
                  {
                    text: "디자이너 글 업로드",
                    style: {
                      position: "relative",
                      top: String(whitePromptButtonTextTop) + ea,
                      fontSize: String(whitePromptButtonSize) + ea,
                      fontWeight: String(whitePromptButtonWeight),
                      color: colorChip.white,
                    }
                  }
                ]
              },
            ]
          }
        ]
      });

    } catch (e) {
      console.log(e);
    }
  }
}

ProjectJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { stringToDate, sleep } = GeneralJs;

  communication.setItem([
    () => { return "추천서 다시 발송"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let proid, thisCase;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            proid = await GeneralJs.prompt("프로젝트 아이디를 입력하세요!");
          } while (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid));
        } else {
          proid = instance.whiteBox.id;
        }
        thisCase = null;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.proid === proid) {
              thisCase = c;
            }
          }
        }
        if (thisCase !== null) {
          if (window.confirm(thisCase.name + " 고객님께 추천서를 다시 보낼까요?")) {
            await GeneralJs.ajaxJson({ instant: true, proid, retryProposal: true }, "/createProposalDocument");
            window.alert(`추천서 알림톡 발송이 요청되었습니다!`);
          }
        }
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
      let date0, date1, date2;
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
          if (date0.valueOf() > emptyDateValue && date1.valueOf() > emptyDateValue && date2.valueOf() > emptyDateValue) {
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
        if (window.confirm(client.name + " 고객님에게 스타일링 계약서를 전송합니다! 확실하십니까?")) {
          let contractName, contractAddress;
          let rawValue;

          do {
            rawValue = await GeneralJs.prompt("계약시 별도 이름이 있습니까? 없으면, '없음'");
          } while (rawValue === null)

          contractName = rawValue.trim();
          if (/없/gi.test(contractName)) {
            contractName = '';
          }
          if (contractName.trim() === "공백") {
            contractName = '';
          }
          contractName = contractName.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '');

          do {
            rawValue = await GeneralJs.prompt("계약시 별도 주소가 있습니까? 없으면, '없음'");
          } while (rawValue === null)

          contractAddress = rawValue.trim();
          if (/없/gi.test(contractAddress)) {
            contractAddress = '';
          }
          if (contractAddress.trim() === "공백") {
            contractAddress = '';
          }
          contractAddress = contractAddress.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '');

          const response = await GeneralJs.ajaxJson({ proid, contractName, contractAddress }, PYTHONHOST + "/createStylingContract");

          if (response.message === "OK") {
            window.alert(`계약서 알림톡 요청을 완료하였습니다!`);
          } else {
            window.alert(`오류가 발생하였습니다! 다시 시도해주세요!`);
          }

        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "계약서 반려"; },
    function () {
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let boo;
      let date0, date1, date2;
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
          if (date0.valueOf() > emptyDateValue && date1.valueOf() > emptyDateValue && date2.valueOf() > emptyDateValue) {
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
        await GeneralJs.ajaxJson({ proid }, PYTHONHOST + "/removeStylingContract", { equal: true });
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "시공 계약서 반려"; },
    function () {
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let boo;
      let date0, date1, date2;
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
          if (date0.valueOf() > emptyDateValue && date1.valueOf() > emptyDateValue && date2.valueOf() > emptyDateValue) {
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
        await GeneralJs.ajaxJson({ proid }, PYTHONHOST + "/removeConstructContract", { equal: true });
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "시공 콘솔로 이동"; },
    function () {
      return (instance.whiteBox !== null && instance.whiteBox !== undefined);
    },
    async function (e) {
      try {
        const proid = instance.whiteBox.id;
        await GeneralJs.ajaxJson({
          mode: "constructOnoff",
          action: "on",
          proid: proid,    
        }, BACKHOST + "/constructInteraction", { equal: true });
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "계약금 안내"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let proid, designer, desid, onoff;
        let thisCase;
        let cliid, client;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            proid = await GeneralJs.prompt("프로젝트 아이디를 입력하세요!");
          } while (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid));
        } else {
          proid = instance.whiteBox.id;
        }
        thisCase = null;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.proid === proid) {
              thisCase = c;
            }
          }
        }
        if (thisCase !== null) {
          designer = thisCase.designer;
          desid = designer.split(' ')[1];
          designer = designer.split(' ')[0];

          if (window.confirm(thisCase.name + " 고객님께 계약금 안내를 보낼까요?")) {

            cliid = (await GeneralJs.ajaxJson({
              noFlat: true,
              whereQuery: { proid }
            }, "/getProjects"))[0].cliid
            client = (await GeneralJs.ajaxJson({
              noFlat: true,
              whereQuery: { cliid }
            }, "/getClients"))[0];
            onoff = /온라인/gi.test(thisCase.service) ? "online" : "offline";
            await GeneralJs.ajaxJson({
              method: "firstPayment",
              name: client.name,
              phone: client.phone,
              option: {
                client: client.name,
                host: FRONTHOST.slice(8),
                path: "estimation",
                cliid: client.cliid,
                needs: "style," + desid + "," + proid + "," + onoff,
              }
            }, "/alimTalk");

            window.alert(`계약금 안내 알림톡 요청을 완료하였습니다!`);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "잔금 안내"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let proid, designer, desid, onoff;
        let thisCase;
        let cliid, client;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            proid = await GeneralJs.prompt("프로젝트 아이디를 입력하세요!");
          } while (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid));
        } else {
          proid = instance.whiteBox.id;
        }
        thisCase = null;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.proid === proid) {
              thisCase = c;
            }
          }
        }
        if (thisCase !== null) {
          designer = thisCase.designer;
          desid = designer.split(' ')[1];
          designer = designer.split(' ')[0];
          if (window.confirm(thisCase.name + " 고객님께 잔금 안내를 보낼까요?")) {

            cliid = (await GeneralJs.ajaxJson({
              noFlat: true,
              whereQuery: { proid }
            }, "/getProjects"))[0].cliid
            client = (await GeneralJs.ajaxJson({
              noFlat: true,
              whereQuery: { cliid }
            }, "/getClients"))[0];

            await GeneralJs.ajaxJson({
              whereQuery: { proid },
              updateQuery: { "process.action": "잔금 안내" }
            }, "/rawUpdateProject");

            onoff = /온라인/gi.test(thisCase.service) ? "online" : "offline";
            await GeneralJs.ajaxJson({
              method: "secondPayment",
              name: client.name,
              phone: client.phone,
              option: {
                client: client.name,
                host: FRONTHOST.slice(8),
                path: "estimation",
                cliid: client.cliid,
                needs: "style," + desid + "," + proid + "," + onoff,
              }
            }, "/alimTalk");

            window.alert(`잔금 안내 알림톡 요청을 완료하였습니다!`);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "촬영비 결제 요청"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          const [ project ] = await GeneralJs.ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true });
          const [ client ] = await GeneralJs.ajaxJson({ noFlat: true, where: { cliid: project.cliid } }, "/getClients", { equal: true });
          const [ designer ] = await GeneralJs.ajaxJson({ noFlat: true, where: { desid: project.desid } }, "/getDesigners", { equal: true });

          await GeneralJs.ajaxJson({
            method: "requestPhotoPay",
            name: designer.designer,
            phone: designer.information.phone,
            option: {
              client: client.name,
              designer: designer.designer,
              amount0: GeneralJs.autoComma(300000),
              amount1: GeneralJs.autoComma(165000),
              host: FRONTHOST.slice(8),
              proid: project.proid,
            }
          }, "/alimTalk");
  
          window.alert("촬영비 결제를 요청하였습니다!");

        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);


  communication.setItem([
    () => { return "디자이너 글 업로드"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase, popupFunction;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          popupFunction = instance.rawCommentUpload(proid);
          await popupFunction();
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "디자이너 글 요청"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          const [ project ] = await GeneralJs.ajaxJson({ noFlat: true, where: { proid } }, "/getProjects", { equal: true });
          const [ client ] = await GeneralJs.ajaxJson({ noFlat: true, where: { cliid: project.cliid } }, "/getClients", { equal: true });
          const [ designer ] = await GeneralJs.ajaxJson({ noFlat: true, where: { desid: project.desid } }, "/getDesigners", { equal: true });

          await GeneralJs.ajaxJson({
            method: "requestRawContents",
            name: designer.designer,
            phone: designer.information.phone,
            option: {
              client: client.name,
              designer: designer.designer,
              host: FRONTHOST.slice(8),
              proid: project.proid,
            }
          }, "/alimTalk");
  
          window.alert("디자이너 글을 요청하였습니다!");

        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "디자이너 글 확인"; },
    function () {
      return (instance.whiteBox !== null);
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase, popupFunction;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          popupFunction = instance.rawCommentView(proid);
          await popupFunction();
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "고객 평가 요청 보내기"; },
    function () {
      return (instance.whiteBox !== null);
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase, popupFunction;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          const [ project ] = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
          const cliid = project.cliid;

          console.log(project);


        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "고객 평가 상태"; },
    function () {
      return (instance.whiteBox !== null);
    },
    async function (e) {
      try {
        if (instance.whiteBox !== null) {
          const proid = instance.whiteBox.id;
          let thisCase, popupFunction;
          for (let c of instance.cases) {
            if (c !== null) {
              if (c.proid === proid) {
                thisCase = c;
              }
            }
          }
          popupFunction = instance.evalutaionStatusView(proid);
          await popupFunction();
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

}

ProjectJs.prototype.sseCardParsing = function (raw) {
  const instance = this;
  const { equalJson, setDebounce, findByAttribute } = GeneralJs;
  const order = equalJson(raw);
  const debounceNameConst = "sseCardAction_";
  const actionClass = "boardGray_actionBlock";
  const actionArea = "mainArea_actionArea";
  const boardDoms = [ ...document.querySelectorAll("." + actionClass) ];
  const areaDoms = [ ...document.querySelectorAll("." + actionArea) ];
  const ea = "px";
  let division, num;
  let fromArea, toArea;
  let divide, oppositeDivide;
  let self, opposite;
  let thisHeightNumber, oppositeHeightNumber;
  let thisHeight, oppositeHeight;
  let finalHeight;
  let fixedHeightSize, margin;
  let tongPaddingTop, tongPaddingBottom;
  let size;
  let name, oppositeName;
  let loop;
  let index, indexTong;
  let rowDom;
  let thisStandardDom, thisCaseDom;
  let length;
  let fromAction;

  margin = 10;
  fixedHeightSize = 40;
  tongPaddingTop = (margin * 1.5) + 35;
  tongPaddingBottom = 0;

  if (document.querySelector(".totalFather") !== null) {
    if (this.divisionMap !== null) {
      division = this.divisionMap;
      num = 0;
      if (Array.isArray(order) && order.length > 0 && order[0].randomToken !== instance.randomToken) {
        for (let { proid, requestNumber, from, to, randomToken } of order) {
          setDebounce(() => {
            card = findByAttribute(instance.totalFatherChildren, [ "proid", "request" ], [ proid, String(requestNumber) ]);
            fromArea = division.get(from);
            toArea = division.get(to);
            loop = [ fromArea, toArea ];
            if (card.parentElement !== toArea) {

              toArea.appendChild(card);

              for (let self of loop) {

                name = self.getAttribute("name");
                opposite = division.get(self.getAttribute("opposite"));
                oppositeName = opposite.getAttribute("name");
                divide = Number(self.getAttribute("divide"));
                oppositeDivide = Number(opposite.getAttribute("divide"));
                size = Number(self.getAttribute("size"));

                thisHeightNumber = Math.ceil(self.children.length / divide);
                oppositeHeightNumber = Math.ceil(opposite.children.length / oppositeDivide);
                thisHeightNumber = thisHeightNumber === 0 ? 1 : thisHeightNumber;
                oppositeHeightNumber = oppositeHeightNumber === 0 ? 1 : oppositeHeightNumber;
                thisHeight = (thisHeightNumber * fixedHeightSize) + ((thisHeightNumber + 1) * margin);
                oppositeHeight = (oppositeHeightNumber * fixedHeightSize) + ((oppositeHeightNumber + 1) * margin);
                if (thisHeight <= oppositeHeight) {
                  finalHeight = oppositeHeight;
                } else {
                  finalHeight = thisHeight;
                }
                finalHeight = finalHeight + tongPaddingTop + tongPaddingBottom + 2;
                for (let c of self.children) {
                  c.style.width = String(size) + ea;
                }

                self.parentElement.style.height = String(finalHeight) + ea;
                opposite.parentElement.style.height = String(finalHeight) + ea;

                self.parentElement.children[1].setAttribute("number", String(self.children.length));
                self.parentElement.children[1].textContent = String(self.children.length) + "명";
                findByAttribute(boardDoms, "action", name).textContent = String(self.children.length);

                opposite.parentElement.children[1].setAttribute("number", String(opposite.children.length));
                opposite.parentElement.children[1].textContent = String(opposite.children.length) + "명";
                findByAttribute(boardDoms, "action", oppositeName).textContent = String(opposite.children.length);

              }

              name = toArea.getAttribute("name");

              indexTong = [];
              for (let i = 0; i < instance.cases.length; i++) {
                if (instance.cases[i] !== null) {
                  if (instance.cases[i].proid === proid) {
                    indexTong.push({ index: i, thisCase: equalJson(JSON.stringify(instance.cases[i])) });
                  }
                }
              }
              index = indexTong[requestNumber].index;

              instance.cases[index].action = name;
              rowDom = findByAttribute([ ...document.querySelector("." + proid).children ], "column", "action");
              if (rowDom !== null) {
                rowDom.textContent = name;
              }
              card.setAttribute("action", name);

            }
          }, debounceNameConst + String(num));
          num++;
        }

      }
    }
  }

}

ProjectJs.prototype.projectSubPannel = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, returnGet } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;
    let num;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 140;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    pannelMenu = [
      {
        title: "현장 미팅 대상",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/project?type=" + "meeting";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: returnGet()?.type === "care" ? "전체 보기" : "진행중만 보기",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/project?type=" + (returnGet()?.type === "care" ? "all" : "care");
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "촬영 관리 모드",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=contents";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "프로젝트 케어 모드",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&type=care&from=ca&view=care";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "정산 관리 모드",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/calculation";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
    ];

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "fixed",
        bottom: String(belowHeight + pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    num = 0;
    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(num === pannelMenu.length - 1 ? 0 : menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
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
      })
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

ProjectJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { returnGet, setQueue, sleep } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.dataonly === "true" && getObj.entire === "true");
    let getTarget;
    let tempFunction;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.entireMode = entireMode;

    if (getObj.dataonly === "true") {
      await this.spreadData();
    } else {
      this.backGrayBar();
      await this.spreadData();
      this.addTransFormEvent();
      this.addSearchEvent();
      this.addExtractEvent();
      this.whiteResize();
      this.communicationRender();
      await this.projectSubPannel();
    }

    getTarget = null;
    if (typeof getObj.specificids === "string") {
      tempFunction = this.makeSearchEvent("id:" + getObj.specificids);
      await tempFunction({ key: "Enter" });
    } else {
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
        await sleep(500);
        if (getObj.rmode !== undefined) {
          if (typeof instance.whiteBox === "object" && instance.whiteBox !== null) {
            try {
              instance.whiteBox.contentsBox.firstChild.firstChild.children[9].click();
            } catch {}
          }
        }
        if (getObj.proid !== undefined && getObj.raw === "contents") {
          const popupFunction = instance.rawCommentView(getObj.proid);
          popupFunction().catch((err) => {
            console.log(err);
          });
        }
      }
    }

    // proposal view return event
    window.addEventListener("message", function (e) {
      if (/^[\{\[]/.test(e.data)) {
        try {
          const data = JSON.parse(e.data);
          if (typeof data.proid === "string" && typeof data.mode === "string") {
            if (data.mode === "reset") {

              const { proid } = data;
              let target;
              instance.whiteCancelMaker().call({}, {});

              if (data.to === "general") {
                target = null;
                for (let dom of instance.standardDoms) {
                  if ((new RegExp(proid, 'gi')).test(dom.textContent)) {
                    target = dom;
                    break;
                  }
                }
                if (target !== null) {
                  setQueue(() => {
                    target.click();
                  }, 601);
                }
              } else if (data.to === "list") {
                setQueue(() => {
                  instance.processListViewMaker().call({}, { preventDefault: () => {} });
                }, 601);
              }

            }
          }
        } catch {}
      }
    });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
