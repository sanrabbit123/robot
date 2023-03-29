const ClientJs = function () {
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
  this.divisionMap = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.ea = "px";
}

ClientJs.prototype.standardBar = function (standard) {
  const instance = this;
  const { returnGet } = GeneralJs;
  const getObj = returnGet();
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;
  let sortEventFunction;
  let cliidDom, cliidArr;
  let histories;

  temp = {
    cliid: standard.standard.cliid.name,
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

  cliidDom = [];
  cliidArr = [];
  num = (standard.search === null ? 0 : 1);
  for (let { cliid, name } of target) {
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
    div_clone3.textContent = cliid;
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
      cliidDom.push({ cliid, dom: div_clone2 });
      cliidArr.push(cliid);
    }

    if (num !== 0) {
      this.cases.push({ cliid, name });
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

  if (this.standardDoms.length === 2 && getObj.view !== "row") {
    GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
      instance.standardDoms[1].click();
      clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
    }, 401);
  }

  GeneralJs.ajaxJson({
    idArr: cliidArr,
    method: "client",
    property: "curation"
  }, "/getHistoryProperty").then((cliidObj) => {
    histories = cliidObj;
    return GeneralJs.ajaxJson({
      idArr: cliidArr,
      method: "client",
      property: "important"
    }, "/getHistoryProperty");
  }).then((cliidObj) => {
    let boo, tempFunction;
    for (let cliid in histories) {
      histories[cliid].important = cliidObj[cliid];
    }
    if (cliidObj !== null) {
      for (let { cliid, dom } of cliidDom) {
        if (histories[cliid] === undefined) {
          boo = false;
        } else {
          if (histories[cliid].important) {
            boo = true;
          } else {
            boo = false;
          }
        }
        dom.setAttribute("important", "false");
        dom.addEventListener("contextmenu", instance.makeImportantEvent(cliid, true));
        if (boo) {
          tempFunction = instance.makeImportantEvent(cliid, !boo);
          tempFunction.call(dom, { type: "click" });
        }
      }
    }
  }).catch((err) => {
    console.log(err);
  });

}

ClientJs.prototype.infoArea = function (info) {
  const instance = this;
  const grayBarWidth = this.grayBarWidth;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition, widthArr;
  let columns;
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

  if (window.localStorage.getItem("client_columnsOrder") !== null && window.localStorage.getItem("client_columnsOrder") !== undefined) {
    originalColumns = JSON.parse(window.localStorage.getItem("client_columnsOrder"));
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
        const thisId = /c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
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
    const cliidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = GeneralJs.colorChip.green;
    }
    for (let z = 0; z < cliidChildren.length; z++) {
      if (cliidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < cliidChildren[z].children.length; y++) {
          cliidChildren[z].children[y].style.color = GeneralJs.colorChip.green;
        }
      }
    }
  }

  leaveEventFunction = function (e) {
    const mother = this.parentElement;
    const thisIndex = mother.getAttribute("index");
    const thisId = /c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(mother.className)[0];
    const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
    const cliidChildren = instance.totalMother.children[0].children;
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
    for (let z = 0; z < cliidChildren.length; z++) {
      if (cliidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < cliidChildren[z].children.length; y++) {
          cliidChildren[z].children[y].style.color = finalColor;
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
      const thisId = /c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];

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

          instance.cases[Number(idDom.getAttribute("index"))][column] = finalValue;

          if ((DataPatch.clientMap())[column].position !== "null") {
            await GeneralJs.updateValue({
              thisId: thisId,
              requestIndex: String(requestIndex),
              column: column,
              pastValue: pastRawData,
              value: finalValue,
              index: Number(idDom.getAttribute("index")),
              thisCase: instance.cases[Number(idDom.getAttribute("index"))]
            });
            await instance.globalChaining(instance.cases[Number(idDom.getAttribute("index"))], column, finalValue, pastRawData);  
          }

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
        const map = DataPatch.clientMap();
        const thisMap = map[this.getAttribute("column")];

        if (thisMap.type === "date" && e.type === "click") {

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


            if (thisMap.multiple !== undefined && thisMap.items.length > 6) {
              style = {
                position: "absolute",
                top: String(((height * 2) * (Math.floor(i / 4) + 1)) - top) + ea,
                left: String((width + 4) * (i % 4)) + ea,
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
            } else {
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
            }
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
              top: thisMap.items.length > 6 ? String(((height * 2) * (Math.floor(thisMap.items.length / 4) + 1)) - 5) + ea : String(((height * 2) * (thisMap.items.length + 1)) - 5) + ea,
              width: String(18) + ea,
              left: String(((width + 4) * 2) - (18 / 2) - 2) + ea,
              zIndex: String(3),
              cursor: "pointer",
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
            if (!/^[\{\[]/.test(e.data)) {
              updateValueEvent.call(button_clone, e);
            }
            window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
            GeneralJs.stacks["addressEvent"] = null;
          }
          window.addEventListener('message', GeneralJs.stacks["addressEvent"]);

          this.appendChild(button_clone);

        } else if (thisMap.type === "object" && thisMap.inputFunction !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          tempFunction = new Function("mother", "input", "callback", "instance", thisMap.inputFunction);
          tempFunction(this, input_clone, function () {
            let e = {};
            e.type = "keypress";
            e.key = "Enter";
            updateValueEvent.call(input_clone, e);
            updateEventMother.style.overflow = "hidden";
          }, instance);

        } else if (thisMap.type === "constant") {

          cancel_inputBack.click();

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
      const map = DataPatch.clientMap();
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
          color: GeneralJs.colorChip.whiteBlack,
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
          color: GeneralJs.colorChip.whiteBlack,
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
    e.stopPropagation();
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

    if (window.localStorage.getItem("client_columnsOrder") !== null && window.localStorage.getItem("client_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("client_columnsOrder"));
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

    window.localStorage.setItem("client_columnsOrder", JSON.stringify(allColumns));

    for (let c of instance.caseDoms) {
      for (let d of c.children) {
        for (let { name, left } of allColumns) {
          if (d.getAttribute("column") === name) {
            d.style.left = String(left) + ea;
          }
        }
      }
    }

  }

  dropPoint = DataPatch.clientDropPoint();
  redPoint = DataPatch.clientRedPoint();

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
      div_clone2.classList.add(this.cases[num].cliid);

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

      if (window.localStorage.getItem(this.cases[num].cliid) === null) {
        window.localStorage.setItem(this.cases[num].cliid, JSON.stringify(onoffDummy));
        thisOnOff = onoffDummy;
      } else {
        thisOnOff = JSON.parse(window.localStorage.getItem(this.cases[num].cliid));
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

  if ([ ...div_clone.children ].length < 15) {
    div_clone.style.height = String(window.innerHeight) + ea;
  } else {
    div_clone.style.height = "";
  }

}

ClientJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  const { ajaxJson, dateToString } = GeneralJs;
  try {
    let clients, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;
    let loading;

    loading = instance.mother.grayLoading(null, search === null || search === '' || search === '-');

    if (search === null || search === '' || search === '-') {
      const ago = new Date();
      ago.setDate(ago.getDate() - 30);
      clients = await ajaxJson({ whereQuery: { $or: [ { requests: { $elemMatch: { "request.timeline": { $gte: ago } } } }, { requests: { $elemMatch: { "analytics.response.status": { $regex: "^[응장]" } } } } ] } }, "/getClients");
    } else {
      clients = await ajaxJson({ query: search }, "/searchClients");
    }

    GeneralJs.stacks.entireDesignerTong = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({}), "/getDesigners"));
    GeneralJs.stacks.allDesignerTong = GeneralJs.stacks.entireDesignerTong.filter((designer) => { return /완료/gi.test(designer.information.contract.status) });

    const { standard, data } = clients;

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
    GeneralJs.ajax({ message: "Client front 문제 생김 (spreadData) : " + JSON.stringify(e.message), channel: "#error_log" }, "/sendSlack", () => {
      console.log(e);
    });
  }
}

ClientJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const { createNode, colorChip, withOut } = GeneralJs;
  const slash = "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;";
  let { standard, info } = DataPatch.clientWhiteViewStandard();
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
  let historyFocusEvent, historyBlurEvent;
  let visualSpecificMarginTop;
  let textAreas;
  let callEvent;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;
  let betweenSpace;
  let cliidDom;
  let subButtonsTong;
  let proposalBox;

  // designers
  thisCase.designers = thisCase.designers.split(", ").filter((str) => { return /^d[0-9][0-9][0-9][0-9]/.test(str); }).map((str) => { return GeneralJs.stacks.entireDesignerTong.find((d) => { return d.desid === str.trim() })?.designer }).join(", ");

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

  leftMargin = (49 / 786) * motherHeight;
  titleFontSize = (32 / 786) * motherHeight;
  topMargin = leftMargin * (62 / 60);
  titleHeight = (54 / 42) * titleFontSize;
  callEvent = async function (e) {
    try {
      if (window.confirm(thisCase.name + " 고객님께 전화를 걸까요?")) {
        const response = await GeneralJs.ajaxJson({
          who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
          phone: thisCase.phone.replace(/[^0-9]/gi, '')
        }, "/callTo");
        if (response.message === "error") {
          window.localStorage.clear();
          window.location.reload();
        }
      }
    } catch (e) {
      window.localStorage.clear();
      window.location.reload();
      console.log(e);
    }
  };

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
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", callEvent);
  div_clone2.appendChild(div_clone3);

  //cliid
  betweenSpace = "&nbsp;&nbsp;<b style=\"color: " + GeneralJs.colorChip.gray3 + "\">/</b>&nbsp;&nbsp;";
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.insertAdjacentHTML("beforeend", (thisCase[standard[1]] + betweenSpace + "<b style=\"color: " + GeneralJs.colorChip.green + "\">" + thisCase.name + " (Ca)</b>"));
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: GeneralJs.colorChip.green,
    fontSize: String(titleFontSize * (20 / 42)) + ea,
    fontWeight: String(400),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * (thisCase[standard[0]].length === 4 ? 3.6 : (thisCase[standard[0]].length === 2 ? 2.3 : 3))) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);
  cliidDom = div_clone3;
  GeneralJs.ajaxJson({ noFlat: true, whereQuery: { cliid: thisCase[standard[1]] } }, "/getProjects").then((projects) => {
    const cliid = thisCase[standard[1]];
    let project, tempFunction;
    if (projects.length === 0) {
      cliidDom.textContent = cliid;
      tempFunction = instance.makeClipBoardEvent(cliid);
      cliidDom.addEventListener("click", tempFunction);
    } else {
      project = projects[0];
      if (/^d/.test(project.desid)) {
        cliidDom.addEventListener("click", function (e) {
          const slash = this.querySelector('b');
          const slashPosition = slash.getBoundingClientRect().x;
          if (e.x < slashPosition) {
            tempFunction = instance.makeClipBoardEvent(cliid);
            tempFunction.call(this, e);
          } else {
            GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?proid=" + project.proid);
          }
        });
      } else {
        cliidDom.querySelectorAll('b')[1].textContent = cliidDom.querySelectorAll('b')[1].textContent.replace(/\(Ca\)/, "(Pr)");
        cliidDom.addEventListener("click", function (e) {
          const slash = this.querySelector('b');
          const slashPosition = slash.getBoundingClientRect().x;
          if (e.x < slashPosition) {
            tempFunction = instance.makeClipBoardEvent(cliid);
            tempFunction.call(this, e);
          } else {
            GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/proposal?proid=" + project.proid);
          }
        });
      }
    }
  }).catch((err) => {
    console.log(err);
  });

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
    text: "Log",
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
  proposalBox = createNode({
    mother: subButtonsTong,
    class: [ "hoverDefault_lite" ],
    event: {
      selectstart: (e) => { return e.preventDefault() },
      click: instance.proposalViewMaker(thisCase[standard[1]]),
    },
    text: "추천서",
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
        }, 0);
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

            if (column === "next") {

              globalThis.window.parent.postMessage(JSON.stringify({
                cliid: thisId,
                requestNumber: Number(requestIndex),
                column: "firstResponse",
                value: finalValue,
              }));

            } else if (column === "recommend") {

              globalThis.window.parent.postMessage(JSON.stringify({
                cliid: thisId,
                requestNumber: Number(requestIndex),
                column: "feedBack",
                value: finalValue,
              }));
              
            }

          } else if (e.type === "message") {
            finalValue = GeneralJs.vaildValue(column, e.data, pastRawData);
          }

          instance.cases[thisCase["index"]][column] = finalValue;

          if ((DataPatch.clientMap())[column].position !== "null") {
            await GeneralJs.updateValue({
              thisId: thisId,
              requestIndex: requestIndex,
              column: column,
              pastValue: pastRawData,
              value: finalValue,
              index: thisCase["index"],
              thisCase: instance.cases[thisCase["index"]],
            });
            await instance.globalChaining(instance.cases[thisCase["index"]], column, finalValue, pastRawData);  
          }

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
        const map = DataPatch.clientMap();
        const thisMap = map[this.parentNode.getAttribute("index")];

        if (thisMap.type === "date" && e.type === "click") {

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

            if (thisMap.multiple !== undefined && thisMap.items.length > 6) {

              style = {
                position: "absolute",
                top: String(((height * 2) * (Math.floor(i / 4) + 1)) - top) + ea,
                left: String((width + 4) * (i % 4)) + ea,
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

            } else {

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
                color: GeneralJs.colorChip.whiteBlack,
                zIndex: String(3),
                borderRadius: String(3) + ea,
                animation: "fadeuplite 0.3s ease forwards",
                boxShadow: "0px 2px 11px -6px " + (thisMap.multiple === undefined ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1),
                cursor: "pointer",
              };

            }

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
              top: thisMap.items.length > 6 ? String(((height * 2) * (Math.floor(thisMap.items.length / 4) + 1)) - 5) + ea : String(((height * 2) * (thisMap.items.length + 1)) - 5) + ea,
              width: String(18) + ea,
              left: String(((width + 4) * 2) - (18 / 2) - 2) + ea,
              zIndex: String(3),
              cursor: "pointer",
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
            if (!/^[\{\[]/.test(e.data)) {
              updateValueEvent.call(button_clone, e);
            }
            window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
            GeneralJs.stacks["addressEvent"] = null;
          }
          window.addEventListener('message', GeneralJs.stacks["addressEvent"]);

          this.appendChild(button_clone);

        } else if (thisMap.type === "object" && thisMap.inputFunction !== undefined) {

          cancel_inputBack.style.background = GeneralJs.colorChip.white;
          tempFunction = new Function("mother", "input", "callback", "instance", thisMap.inputFunction);
          tempFunction(this, input_clone, function () {
            let e = {};
            e.type = "keypress";
            e.key = "Enter";
            updateValueEvent.call(input_clone, e);
            updateEventMother.style.overflow = "hidden";
          }, instance);

        } else if (thisMap.type === "constant") {

          cancel_inputBack.click();

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
    const { info } = DataPatch.clientWhiteViewStandard();
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

    window.localStorage.setItem("client_whiteOrder", JSON.stringify(thisStorage));

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

  if (window.localStorage.getItem("client_whiteOrder") !== null && window.localStorage.getItem("client_whiteOrder") !== undefined) {
    info = JSON.parse(window.localStorage.getItem("client_whiteOrder"));
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
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  historyBox.appendChild(div_clone3);

  //history text box tong
  historyTongTarget = [
    { column: "history", name: "응대 기록", dom: null },
    { column: "space", name: "현장 관련", dom: null },
    { column: "styling", name: "스타일링 관련", dom: null },
    { column: "construct", name: "시공 관련", dom: null },
    { column: "budget", name: "예산 관련", dom: null },
    { column: "progress", name: "기타 메모", dom: null },
  ];
  visualSpecificMarginTop = fontSize * (1 / 5);
  historyTargetHeightConst = (fontSize * 1) + visualSpecificMarginTop;
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
      this.style.color = GeneralJs.colorChip.liteBlack;

      const originalValue = target.value;
      const originalValueArr = originalValue.split("\n");

      target.value = target.value.replace(/\&/g, ",");
      // if (window.confirm("저장하시겠습니까?")) {
        GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, '') + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateClientHistory", function (res) {});
      // }
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
    div_clone5.classList.add("hoverDefault_lite");
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

    //textarea
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
  GeneralJs.stacks["rInitialBoxButtonToggle"] = 0;
  GeneralJs.stacks["rInitialBoxButtonDom"] = null;
  rInitialBox.addEventListener("click", function (e) {
    const { colorChip, createNode, createNodes, withOut, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, serviceParsing, uniqueValue, ajaxForm } = GeneralJs;
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
    let images, analytics;
    let obj;
    let styleAnalytics;
    let curation;

    loadingWidth = fontSize * (40 / 15);
    innerMargin = fontSize * (20 / 15);
    imageMargin = fontSize * (6 / 15);
    columnsLength = 3;
    paddingBottom = fontSize * (240 / 15);;
    titleHeight = fontSize * (50 / 15);
    titleBottom = fontSize * (9 / 15);
    innerPaddingTop = fontSize * ((isMac() ? 8 : 11) / 15);
    innerPaddingBottom = fontSize * (10 / 15);
    innerPaddingLeft = fontSize * (16 / 15);
    circleRadius = fontSize * (8 / 15);
    circleBottom = fontSize * ((isMac() ? 15 : 16) / 15);
    circleRight = fontSize * (2 / 15);

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

      images = [];

      ajaxJson({
        cliid: thisCase[standard[1]]
      }, BRIDGEHOST + "/clientPhoto").then((obj) => {
        images = images.concat(obj.sitePhoto);
        images = images.concat(obj.preferredPhoto);
        return ajaxJson({
          idArr: [ thisCase[standard[1]] ],
          method: "client",
          property: "curation",
        }, "/getHistoryProperty");

      }).then((raw) => {

        if (typeof raw !== "object" || Array.isArray(raw)) {
          throw new Error("결과 없음");
        }
        obj = raw;
        return ajaxJson({
          images: obj[thisCase[standard[1]]].image
        }, S3HOST + ":3000" + "/photoParsing");

      }).then((raw) => {
        let imageNothing;

        imageNothing = false;
        if (raw === null) {
          imageNothing = true;
        }
        if (typeof raw !== "object") {
          imageNothing = true;
        }
        if (Object.keys(raw).length === 1 && typeof raw.message === "string") {
          imageNothing = true;
        }

        styleAnalytics = raw;
        tong.removeChild(tong.firstChild);
        curation = obj[thisCase[standard[1]]];
        analytics = curation.analytics;
        images = curation.image.map((image) => {
          const imageLink = "/corePortfolio/listImage";
          let pid;
          pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
          return S3HOST + imageLink + "/" + pid + "/" + image;
        }).concat(images);

        let titleTong;
        let scrollTong, pid, num;
        let scroll;
        let historyArr;
        let imageLoad, historyLoad;
        let tempArr;
        let lastPageMode;

        imageLoad = () => {};
        historyLoad = () => {};
        scrollTong = {};

        historyArr = [];
        for (let key in analytics) {
          if (Array.isArray(analytics[key])) {
            historyArr = historyArr.concat(analytics[key].map((obj) => { obj.key = key; obj.date = stringToDate(obj.date); return obj; }));
          }
        }

        tempArr = [];
        for (let { date, success } of analytics.call.out) {
          tempArr.push({ date: stringToDate(date), key: "callOut", success, page: "전화" });
        }
        historyArr = historyArr.concat(tempArr);

        tempArr = [];
        for (let { date, success } of analytics.call.in) {
          tempArr.push({ date: stringToDate(date), key: "callIn", success, page: "전화" });
        }
        historyArr = historyArr.concat(tempArr);

        historyArr.sort((a, b) => {
          const aDate = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), a.date.getHours(), a.date.getMinutes());
          const bDate = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), b.date.getHours(), b.date.getMinutes());
          if (aDate.valueOf() !== bDate.valueOf()) {
            return aDate.valueOf() - bDate.valueOf();
          } else {
            return (a.key === "page" ? 3 : (a.key === "update" ? 5 : 1)) - (b.key === "page" ? 3 : (b.key === "update" ? 5 : 1));
          }
        });

        lastPageMode = '';
        for (let i = 0; i < historyArr.length; i++) {
          if (/curation/gi.test(historyArr[i].page)) {
            if (typeof historyArr[i].referrer === "string") {
              if (/mode\=lite/gi.test(historyArr[i].referrer)) {
                lastPageMode = "lite";
              } else {
                lastPageMode = "general";
              }
            }
            if (typeof historyArr[i].update !== undefined) {
              if (historyArr[i].mode === undefined) {
                historyArr[i].mode = lastPageMode;
              }
            }
          }
        }

        historyArr = historyArr.map((obj) => {
          let text, date, pageName;
          date = dateToString(obj.date, true).slice(2, -3);
          if (/curation/gi.test(obj.page)) {
            pageName = "스타일 체크";
          } else if (/proposal/gi.test(obj.page)) {
            pageName = "디자이너 추천서";
          } else if (/estimation/gi.test(obj.page)) {
            pageName = "견적서";
          } else if (/pure/gi.test(obj.page)) {
            pageName = "순수 부재중 알림";
          } else if (/finalPush/gi.test(obj.page)) {
            pageName = "서비스 소개";
          } else {
            pageName = obj.page;
          }

          if (obj.key === "page") {
            text = `${date} | ${obj.city}(${obj.postal})에서 ${obj.platform}(${obj.os})로 <b%${pageName}%b> 페이지 <b%방문%b>함`;
          } else if (obj.key === "update") {
            text = `${date} | <b%${pageName}%b> 페이지에서 값을 <b%업데이트%b>함`;
          } else if (obj.key === "submit") {
            text = `${date} | <b%${pageName}%b> 페이지에서 결과를 <b%제출%b>함`;
          } else if (obj.key === "send") {
            text = `${date} | <b%${pageName}%b> 페이지를 고객에게 <b%전송%b>함`;
          } else if (obj.key === "callOut") {
            if (obj.success) {
              text = `${date} | <b%홈리에종에서%b> 고객에게 전화를 걸고 <b%통화에 성공%b>함`;
            } else {
              text = `${date} | <b%홈리에종에서%b> 고객에게 전화를 걸었지만 <b%통화에 실패%b>함`;
            }
          } else if (obj.key === "callIn") {
            if (obj.success) {
              text = `${date} | <b%고객이%b> 홈리에종에 전화를 걸었고 <b%통화에 성공%b>함`;
            } else {
              text = `${date} | <b%고객이%b> 홈리에종에 전화를 걸었지만 <b%통화에 실패%b>함`;
            }
          }

          obj.text = text;
          return obj;
        });

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
              text: "고객님의 페이지 행적",
              style: {
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                position: "absolute",
                bottom: String(titleBottom) + ea,
                color: colorChip.black,
              }
            },
            {
              class: [ "hoverDefault_lite" ],
              attribute: [
                { toggle: "off" }
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
                      imageLoad();
                      textDom.textContent = "고객님이 선택하고 보내신 사진";
                      textDom2.textContent = "행적 보기";
                      this.setAttribute("toggle", "on");
                    } else {
                      cleanChildren(scrollTong);
                      historyLoad();
                      textDom.textContent = "고객님의 페이지 행적";
                      textDom2.textContent = "사진 보기";
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
                text: "사진 보기",
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
          event: {
            dragenter: (e) => {
              e.preventDefault();
            },
            dragover: (e) => {
              e.preventDefault();
            },
            dragstart: (e) => {
              e.preventDefault();
            },
            dragleave: (e) => {
              e.preventDefault();
            },
            drop: function (e) {
              e.preventDefault();
              e.stopPropagation();

              if (e.dataTransfer.files.length > 0) {
                const { name, phone, cliid } = thisCase;
                const cilentFolderName = ("self" + uniqueValue("string")) + '_' + name + '_' + cliid;
                const path = "/photo/client/" + cilentFolderName + (window.confirm("해당 사진들이 현장 사진이 맞나요? 맞으면 '확인', 선호사진일 경우 '취소'") ? "/sitePhoto" : "/preferredPhoto");
                let formData, files, fileNames, toArr, obj, imageNothing;

                formData = new FormData();
                formData.enctype = "multipart/form-data";

                files = [ ...e.dataTransfer.files ];
                files.sort((a, b) => {
                  return Number(a.name.replace(/[^0-9]/gi, '')) - Number(b.name.replace(/[^0-9]/gi, ''));
                });
                fileNames = files.map((obj) => { return obj.name.replace(/ /gi, "_").replace(/\n/gi, "_").replace(/\t/gi, "_").replace(/[\/\\\=\&\:\,\!\@\#\$\%\^\+\*\(\)\[\]\{\}]/gi, ''); });
                for (let i = 0; i < files.length; i++) {
                  formData.append("upload" + String(i), files[i]);
                }

                toArr = [];
                for (let i = 0; i < fileNames.length; i++) {
                  toArr.push(path + "/" + fileNames[i]);
                }
                formData.append("toArr", JSON.stringify(toArr));

                images = [];
                ajaxForm(formData, BRIDGEHOST + "/generalFileUpload").then(() => {
                  return ajaxJson({ cliid }, BRIDGEHOST + "/clientPhoto");
                }).then((obj) => {
                  images = images.concat(obj.sitePhoto);
                  images = images.concat(obj.preferredPhoto);
                  return ajaxJson({
                    idArr: [ cliid ],
                    method: "client",
                    property: "curation",
                  }, "/getHistoryProperty");
                }).then((raw) => {
                  if (typeof raw !== "object" || Array.isArray(raw)) {
                    throw new Error("결과 없음");
                  }
                  obj = raw;
                  return ajaxJson({
                    images: obj[cliid].image
                  }, S3HOST + ":3000" + "/photoParsing");
                }).then((raw) => {

                  imageNothing = false;
                  if (raw === null) {
                    imageNothing = true;
                  }
                  if (typeof raw !== "object") {
                    imageNothing = true;
                  }
                  if (Object.keys(raw).length === 1 && typeof raw.message === "string") {
                    imageNothing = true;
                  }

                  styleAnalytics = raw;
                  curation = obj[cliid];
                  analytics = curation.analytics;
                  images = curation.image.map((image) => {
                    const imageLink = "/corePortfolio/listImage";
                    let pid;
                    pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
                    return S3HOST + imageLink + "/" + pid + "/" + image;
                  }).concat(images);
                }).then(() => {
                  cleanChildren(scrollTong);
                  imageLoad();
                }).catch((e) => {
                  console.log(e);
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
        })
        scrollTong = createNode({
          mother: scroll,
          style: {
            position: "absolute",
            top: String(innerMargin) + ea,
            left: String(innerMargin) + ea,
            width: withOut(innerMargin * 2, ea),
            height: String(4000) + ea,
            paddingBottom: String(paddingBottom) + ea,
          },
        });

        imageLoad = () => {
          if (!imageNothing) {

            let num, num2, children;
            let analyticsWidth, analyticsTop, analyticsBottom;
            let analyticsSizeVisual;
            let tempArr, tempArr2;
            let tempImage;
            let positionArr;

            analyticsWidth = 106;
            analyticsTop = -2;
            analyticsBottom = 3;
            analyticsSizeVisual = 1;

            scrollTong.style.height = String(8000) + ea;

            positionArr = [];
            for (let i = 0; i < columnsLength; i++) {
              positionArr.push(createNode({
                mother: scrollTong,
                style: {
                  position: "relative",
                  display: "inline-block",
                  width: "calc(calc(100% - " + String(imageMargin * (columnsLength - 1)) + ea + ") / " + String(columnsLength) + ")",
                  height: "auto",
                  marginRight: String(i === columnsLength - 1 ? 0 : imageMargin) + ea,
                  verticalAlign: "top",
                }
              }));
            }

            num = 0;
            num2 = 0;
            tempArr = [];
            images.sort((a, b) => {
              const aArr = a.split("/");
              const bArr = b.split("/");
              const aFileWording = aArr[aArr.length - 1];
              const bFileWording = bArr[bArr.length - 1];
              if (/_[0-9]+/gi.test(aFileWording) && /_[0-9]+/gi.test(bFileWording)) {
                return Number(aFileWording.split("_")[aFileWording.split("_").length - 1].replace(/[^0-9]/gi, '')) - Number(bFileWording.split("_")[bFileWording.split("_").length - 1].replace(/[^0-9]/gi, ''));
              } else {
                return aFileWording < bFileWording ? 1 : -1;
              }
            });
            for (let image of images) {
              tempImage = createNode({
                mother: scrollTong,
                mode: "img",
                attribute: [
                  { src: image },
                  { index: String(num) },
                  { method: /sitePhoto/g.test(image) ? "site" : (/preferredPhoto/g.test(image) ? "preferred" : "selected") },
                  { length: String(images.length) },
                  { cliid: thisCase[standard[1]] }
                ],
                style: {
                  position: "relative",
                  display: "inline-block",
                  width: String(100) + '%',
                  height: "auto",
                  marginBottom: String(imageMargin) + ea,
                  borderRadius: String(3) + "px",
                  verticalAlign: "top",
                  cursor: "pointer",
                },
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
                      const totalImages = equalJson(JSON.stringify(images));
                      const mother = document.getElementById("totalcontents");
                      const className = "photoSelectedTarget";
                      const length = Number(this.getAttribute("length"));
                      const zIndex = 2;
                      const wordDictionary = {
                        selected: "고객님이 선택한 사진",
                        site: "고객님이 보낸 현장",
                        preferred: "고객님의 선호 사진"
                      };
                      let img, height, imgBox;
                      let title, titleSize, bottom;
                      let titleBox;
                      let leftArrow, rightArrow;
                      let leftArrowBox, rightArrowBox;
                      let arrowHeight;
                      let arrowMargin;
                      let index, method, src;
                      let convertEvent;

                      index = Number(this.getAttribute("index"));
                      method = this.getAttribute("method");
                      src = this.getAttribute("src");

                      convertEvent = () => {};

                      height = 78;
                      titleSize = 2;
                      bottom = 6.6;
                      arrowHeight = 1.7;
                      arrowMargin = 78;

                      createNode({
                        mother,
                        class: [ className ],
                        events: [
                          {
                            type: "click",
                            event: function (e) {
                              const removeTargets = document.querySelectorAll('.' + className);
                              for (let dom of removeTargets) {
                                mother.removeChild(dom);
                              }
                            }
                          }
                        ],
                        style: {
                          position: "fixed",
                          top: String(0),
                          left: String(0),
                          width: String(100) + '%',
                          height: String(100) + '%',
                          background: colorChip.darkDarkShadow,
                          zIndex: String(zIndex),
                          animation: "justfadeineight 0.2s ease forwards",
                        }
                      });

                      img = createNode({
                        mother,
                        class: [ className ],
                        mode: "img",
                        attribute: [
                          { src },
                          { direction: "right" }
                        ],
                        style: {
                          position: "fixed",
                          top: String(0),
                          left: String(0),
                          height: String(height) + '%',
                          width: "auto",
                          zIndex: String(zIndex),
                          transition: "all 0s ease",
                          animation: "fadeuplite 0.2s ease forwards",
                          borderRadius: String(3) + "px",
                        }
                      });
                      imgBox = img.getBoundingClientRect();
                      img.style.top = withOut(50, imgBox.height / 2, ea);
                      img.style.left = withOut(50, imgBox.width / 2, ea);

                      title = createNode({
                        mother,
                        events: [
                          {
                            type: [ "click", "dblclick", "selectstart" ],
                            event: (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }
                          }
                        ],
                        class: [ className ],
                        text: wordDictionary[method],
                        style: {
                          position: "fixed",
                          bottom: String(bottom) + '%',
                          fontSize: String(titleSize) + "vh",
                          fontWeight: String(600),
                          color: colorChip.whiteBlack,
                          left: String(50) + '%',
                          zIndex: String(zIndex),
                          transition: "all 0s ease",
                          animation: "fadeuplite 0.2s ease forwards",
                        }
                      });
                      titleBox = title.getBoundingClientRect();
                      title.style.left = withOut(50, titleBox.width / 2, ea);

                      leftArrow = createNode({
                        mother,
                        events: [
                          {
                            type: [ "dblclick", "selectstart" ],
                            event: (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }
                          }
                        ],
                        attribute: [
                          { direction: "left" }
                        ],
                        class: [ className ],
                        mode: "svg",
                        source: instance.mother.returnArrow("left", colorChip.whiteBlack),
                        style: {
                          position: "fixed",
                          top: String(0),
                          left: String(0),
                          height: String(arrowHeight) + "vh",
                          zIndex: String(zIndex),
                          transition: "all 0s ease",
                          animation: "fadeuplite 0.2s ease forwards",
                          cursor: "pointer"
                        }
                      });
                      leftArrowBox = leftArrow.getBoundingClientRect();
                      leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
                      leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

                      rightArrow = createNode({
                        mother,
                        events: [
                          {
                            type: [ "dblclick", "selectstart" ],
                            event: (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }
                          }
                        ],
                        attribute: [
                          { direction: "right" }
                        ],
                        class: [ className ],
                        mode: "svg",
                        source: instance.mother.returnArrow("right", colorChip.whiteBlack),
                        style: {
                          position: "fixed",
                          top: String(0),
                          left: String(0),
                          height: String(arrowHeight) + "vh",
                          zIndex: String(zIndex),
                          transition: "all 0s ease",
                          animation: "fadeuplite 0.2s ease forwards",
                          cursor: "pointer"
                        }
                      });
                      rightArrowBox = rightArrow.getBoundingClientRect();
                      rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
                      rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                      convertEvent = function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        const direction = this.getAttribute("direction");
                        let targetIndex, targetImage;
                        if (direction === "left") {
                          targetIndex = index - 1;
                          if (totalImages[targetIndex] === undefined) {
                            targetIndex = length - 1;
                          }
                        } else {
                          targetIndex = index + 1;
                          if (totalImages[targetIndex] === undefined) {
                            targetIndex = 0;
                          }
                        }
                        targetImage = totalImages[targetIndex];
                        img.setAttribute("src", targetImage);
                        imgBox = img.getBoundingClientRect();
                        img.style.left = withOut(50, imgBox.width / 2, ea);
                        leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
                        rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                        index = targetIndex;
                        src = targetImage;
                        method = /sitePhoto/g.test(targetImage) ? "site" : (/preferredPhoto/g.test(targetImage) ? "preferred" : "selected");

                        title.textContent = wordDictionary[method];
                        titleBox = title.getBoundingClientRect();
                        title.style.left = withOut(50, titleBox.width / 2, ea);
                      }
                      leftArrow.addEventListener("click", convertEvent);
                      rightArrow.addEventListener("click", convertEvent);
                      img.addEventListener("click", convertEvent);
                    }
                  },
                  {
                    type: "contextmenu",
                    event: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      const method = this.getAttribute("method");
                      const cliid = this.getAttribute("cliid");
                      let path, obj;
                      if (!/^selected/gi.test(method)) {

                        path = "/" + this.getAttribute("src").replace(/^https?\:\/\//i, '').split('/').slice(1).map((str) => { return window.decodeURIComponent(str); }).join('/');
                        if (window.confirm("사진을 서버로부터 삭제하시겠습니까? 한 번 삭제된 사진은 복구할 수 없습니다!")) {

                          images = [];

                          ajaxJson({ path }, BRIDGEHOST + "/clientDelete").then(() => {
                            return ajaxJson({ cliid }, BRIDGEHOST + "/clientPhoto");
                          }).then((obj) => {
                            images = images.concat(obj.sitePhoto);
                            images = images.concat(obj.preferredPhoto);
                            return ajaxJson({
                              idArr: [ cliid ],
                              method: "client",
                              property: "curation",
                            }, "/getHistoryProperty");
                          }).then((raw) => {
                            if (typeof raw !== "object" || Array.isArray(raw)) {
                              throw new Error("결과 없음");
                            }
                            obj = raw;
                            return ajaxJson({
                              images: obj[cliid].image
                            }, S3HOST + ":3000" + "/photoParsing");
                          }).then((raw) => {

                            imageNothing = false;
                            if (raw === null) {
                              imageNothing = true;
                            }
                            if (typeof raw !== "object") {
                              imageNothing = true;
                            }
                            if (Object.keys(raw).length === 1 && typeof raw.message === "string") {
                              imageNothing = true;
                            }

                            styleAnalytics = raw;
                            curation = obj[cliid];
                            analytics = curation.analytics;
                            images = curation.image.map((image) => {
                              const imageLink = "/corePortfolio/listImage";
                              let pid;
                              pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
                              return S3HOST + imageLink + "/" + pid + "/" + image;
                            }).concat(images);
                          }).then(() => {
                            cleanChildren(scrollTong);
                            imageLoad();
                          }).catch((e) => {
                            console.log(e);
                          });

                        }

                      } else {
                        window.alert("고객님이 선택한 사진은 삭제할 수 없습니다!");
                      }
                    }
                  }
                ]
              });
              scrollTong.style.height = "auto";
              tempArr.push(tempImage);
              if (tempArr.length === columnsLength) {
                positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
                tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
                for (let i = 0; i < tempArr.length; i++) {
                  positionArr[i].appendChild(tempArr[i]);
                }
                tempArr = [];
                num2 = -1;
              }
              num++;
              num2++;
            }

            positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
            tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
            for (let i = 0; i < tempArr.length; i++) {
              positionArr[i].appendChild(tempArr[i]);
            }

            createNode({
              mother: scrollTong,
              style: {
                position: "relative",
                display: "block",
                width: String(100) + '%',
                height: String(imageMargin * 3) + ea,
              }
            });

            for (let i in styleAnalytics) {
              children = [
                {
                  text: i.slice(0, 1).toUpperCase() + i.slice(1),
                  style: {
                    position: "relative",
                    display: "block",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(500),
                    color: colorChip.black,
                    background: "transparent",
                    paddingTop: String(innerPaddingTop) + ea,
                    paddingBottom: String(innerPaddingBottom) + ea,
                    borderRadius: String(3) + "px",
                    marginRight: String(imageMargin) + ea,
                    fontFamily: "graphik",
                  }
                },
              ];
              for (let j in styleAnalytics[i]) {
                children.push({
                  text: j.slice(0, 1).toUpperCase() + j.slice(1),
                  style: {
                    position: "relative",
                    display: "inline-block",
                    fontSize: String(fontSize - analyticsSizeVisual) + ea,
                    fontWeight: String(300),
                    color: colorChip.shadowWhite,
                    background: "transparent",
                    paddingBottom: String(analyticsBottom) + ea,
                    borderRadius: String(3) + "px",
                    width: String(analyticsWidth) + ea,
                    textAlign: "left",
                    marginBottom: String(imageMargin) + ea,
                    marginRight: String(imageMargin) + ea,
                    fontFamily: "graphik",
                  },
                });
                children.push({
                  text: j,
                  style: {
                    position: "relative",
                    display: "inline-block",
                    fontSize: String(fontSize - analyticsSizeVisual) + ea,
                    fontWeight: String(300),
                    color: "transparent",
                    background: colorChip.gray0,
                    paddingBottom: String(analyticsBottom) + ea,
                    borderRadius: String(3) + "px",
                    width: withOut(analyticsWidth + imageMargin, ea),
                    marginBottom: String(imageMargin) + ea,
                    fontFamily: "graphik",
                  },
                  children: [
                    {
                      style: {
                        position: "absolute",
                        left: String(0),
                        top: String(0),
                        width: String((styleAnalytics[i][j] / 10) * 100) + '%',
                        height: String(100) + '%',
                        background: colorChip.gradientGreen3,
                        borderRadius: String(3) + "px",
                      }
                    }
                  ]
                });
              }
              createNode({
                mother: scrollTong,
                style: {
                  position: "relative",
                  display: "block",
                  width: String(100) + '%',
                  height: "auto",
                  marginBottom: String(imageMargin) + ea,
                },
                children
              });
            }

            createNode({
              mother: scrollTong,
              style: {
                position: "relative",
                display: "block",
                width: String(100) + '%',
                height: String(imageMargin * 3) + ea,
              }
            });

            children = [
              {
                text: "고객님이 선택한 서비스와 시공",
                style: {
                  position: "relative",
                  display: "block",
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.black,
                  background: "transparent",
                  paddingTop: String(innerPaddingTop) + ea,
                  paddingBottom: String(innerPaddingBottom) + ea,
                  borderRadius: String(3) + "px",
                  marginRight: String(imageMargin) + ea,
                }
              },
              {
                text: serviceParsing(curation.service.serid.length > 0 ? curation.service.serid[0] : "s2011_aa02s"),
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
              },
              // {
              //   text: "재사용 비율 : " + String(Math.round(curation.furniture.ratio)) + '%',
              //   events: [
              //     {
              //       type: "contextmenu",
              //       event: (e) => { e.stopPropagation(); e.preventDefault(); }
              //     }
              //   ],
              //   style: {
              //     position: "relative",
              //     display: "inline-block",
              //     fontSize: String(fontSize) + ea,
              //     fontWeight: String(400),
              //     color: colorChip.black,
              //     background: colorChip.gray0,
              //     paddingTop: String(innerPaddingTop) + ea,
              //     paddingBottom: String(innerPaddingBottom) + ea,
              //     paddingLeft: String(innerPaddingLeft) + ea,
              //     paddingRight: String(innerPaddingLeft) + ea,
              //     borderRadius: String(3) + "px",
              //     marginRight: String(imageMargin) + ea,
              //   },
              //   bold: {
              //     fontSize: String(fontSize) + ea,
              //     fontWeight: String(600),
              //     color: colorChip.green,
              //   }
              // },
            ];

            for (let s of curation.construct.items) {
              children.push({
                text: s,
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
              });
            }

            createNode({
              mother: scrollTong,
              style: {
                position: "relative",
                display: "block",
                width: String(100) + '%',
                height: "auto",
                marginBottom: String(imageMargin) + ea,
              },
              children
            });

          }
        }

        historyLoad = () => {
          scrollTong.style.height = String(8000) + ea;
          let num;
          num = 0;
          for (let { text } of historyArr) {
            createNode({
              mother: scrollTong,
              style: {
                position: "relative",
                display: "block",
                width: String(100) + '%',
                height: "auto",
                marginBottom: String(imageMargin) + ea,
              },
              children: [
                {
                  text: text.split('|')[0].trim(),
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
                    borderRadius: String(3) + "px"
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

        historyLoad();

        scrollTong.style.height = "auto";

      }).catch((err) => {
        window.alert("결과가 없습니다!");
      });

      historyBox.style.animation = "fadeout 0.3s ease forwards";
      matrixBox.style.animation = "fadein 0.3s ease forwards";
    }
  });

  //get textAreaTong
  GeneralJs.ajax("id=" + thisCase[standard[1]], "/getClientHistory", function (res) {
    const dataArr = JSON.parse(res);
    for (let i = 0; i < textAreas.length; i++) {
      textAreas[i].value = dataArr[i];
    }
    if (!/요청 사항 : /gi.test(dataArr[dataArr.length - 1])) {
      if (textAreas[textAreas.length - 1].value !== '') {
        textAreas[textAreas.length - 1].value = textAreas[textAreas.length - 1].value + "\n\n" + "요청 사항 : " + thisCase["comment"];
      } else {
        textAreas[textAreas.length - 1].value = "요청 사항 : " + thisCase["comment"];
      }
    }
  });

  div_clone.appendChild(div_clone2);

  //end ---------------------------------------------
  mother.appendChild(div_clone);
}

ClientJs.prototype.whiteCancelMaker = function (callback = null, recycle = false) {
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

    if (GeneralJs.returnGet().entire !== "true") {
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
    } else {
      instance.whiteBox.contentsBox.remove();
      callback();
    }

  }
}

ClientJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.clientWhiteViewStandard();
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
      if (instance.standardDoms[z].firstChild.textContent === thisCase.cliid) {
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
    for (let dom of document.querySelectorAll('.' + thisCase["cliid"])) {
      indexArr.push(Number(dom.getAttribute("index")));
    }
    indexArr.sort((a, b) => { return a - b; });
    for (let z = 0; z < indexArr.length; z++) {
      if (indexArr[z] === index) {
        requestIndex = z;
      }
    }

    div_clone.setAttribute("index", thisCase["cliid"]);
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
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        top: String(margin) + ea,
        left: String(instance.grayBarWidth + margin) + ea,
        width: String(window.innerWidth - instance.grayBarWidth - (margin * 2)) + ea,
        height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
        zIndex: String(2),
      };
    }
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    if (hasQuery("cliid")) {
      removeQuery("cliid");
    }
    appendQuery({ cliid: thisCase[standard[1]] });

    instance.whiteContentsMaker(thisCase, div_clone);
    instance.whiteBox.contentsBox = div_clone;
    instance.whiteBox.index = index;
    instance.whiteBox.id = thisCase[standard[1]];
    instance.totalContents.appendChild(div_clone);
    GeneralJs.stacks.whiteBox = 0;
  }
}

ClientJs.prototype.whiteViewMaker = function (index) {
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

ClientJs.prototype.rowViewMaker = function () {
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
      instance.divisionMap = null;
      instance.totalMother.classList.remove("justfadeinoriginal");
    }, 401);
  }
}

ClientJs.prototype.returnValueEventMaker = function () {
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
        if (node.getAttribute("cliid") === pastObj.thisId) {
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

ClientJs.prototype.reportScrollBox = function (data, motherWidth) {
  const instance = this;
  const report = JSON.parse(data);
  const { equalJson, blankHref, colorChip, autoComma } = GeneralJs;
  let div_clone, div_clone2, b_clone;
  let style;
  let ea = "px";
  let entireMargin;
  let margin;
  let scrollBox, boxTop, boxWidth, boxHeight, boxNumber;
  let titleBox, titleTop;
  let matrixTop, matrixBox, matrixWidth, matrixBoxMargin, matrixHeight;
  let matrixStyle0, matrixStyle1;
  let matrixFontSize;
  let matrixOuterLine, matrixInnerLine;
  let columnTop, columnLineHeight, columnPaddingTop;
  let reportNumber;
  let grayBar;
  let summaryBox, summaryTong;
  let propertyNum;
  let totalSummary;
  let toClientEvent, toProjectEvent;
  let totalCliid, totalProid;

  margin = 18;
  boxNumber = Math.floor((motherWidth - (margin * 3)) / (margin + 400));
  boxHeight = 430;
  boxWidth = (motherWidth - (margin * (boxNumber + 1 + 2))) / boxNumber;
  boxTop = 88;
  propertyNum = 7;

  toClientEvent = function (e) {
    e.stopPropagation();
    e.preventDefault();
    const cliidTarget = equalJson(this.getAttribute("client"));
    if (cliidTarget.length > 0) {
      blankHref(window.location.protocol + "//" + window.location.host + "/client?specificids=" + cliidTarget.join(','));
    }
  }
  toProjectEvent = function (e) {
    e.stopPropagation();
    e.preventDefault();
    const proidTarget = equalJson(this.getAttribute("project"));
    if (proidTarget.length > 0) {
      blankHref(window.location.protocol + "//" + window.location.host + "/project?specificids=" + proidTarget.join(','));
    }
  }

  //entire scroll box
  scrollBox = GeneralJs.nodes.div.cloneNode(true);
  scrollBox.classList.add("noScrollBar");
  entireMargin = margin * 2;
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

  totalSummary = {
    client: 0,
    proposal: 0,
    recommend: 0,
    contract: 0,
    process: 0,
  };

  for (let i = 0; i < report.length; i++) {

    //numbers
    titleTop = 18;
    columnTop = 0;
    columnLineHeight = 28;
    columnPaddingTop = 7;
    matrixFontSize = 13;
    matrixInnerLine = "1px solid " + GeneralJs.colorChip.gray2;
    matrixOuterLine = "1px solid " + GeneralJs.colorChip.gray4;
    matrixTop = titleTop + 40;
    matrixBoxMargin = 23;
    matrixWidth = boxWidth - (matrixBoxMargin * 2) - 3;
    matrixHeight = 200;
    summaryTong = {
      client: 0,
      proposal: 0,
      recommend: 0,
      contract: 0,
      process: 0,
    };

    //gray card
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "inline-block",
      position: "relative",
      width: String(boxWidth) + ea,
      height: String(boxHeight) + ea,
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
      top: String(titleTop + 14) + ea,
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
      fontSize: String(matrixFontSize + 6) + ea,
      left: String(matrixBoxMargin + 1) + ea,
      top: String(titleTop + (GeneralJs.isMac() ? 0 : 3)) + ea,
      fontWeight: String(200),
      background: GeneralJs.colorChip.gray0,
    };
    for (let z in style) {
      titleBox.style[z] = style[z];
    }
    titleBox.textContent = `${report[i].data[0].startDay.split('-')[0]}-${report[i].data[0].startDay.split('-')[1]}`;
    div_clone.appendChild(titleBox);

    //matrix
    matrixBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      width: String(matrixWidth) + ea,
      height: String(matrixHeight) + ea,
      top: String(matrixTop) + ea,
      left: String(matrixBoxMargin) + ea,
      borderRadius: String(5) + ea,
      border: matrixOuterLine,
      overflow: "hidden",
    };
    for (let z in style) {
      matrixBox.style[z] = style[z];
    }

    //case name
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle0 = {
      position: "absolute",
      fontSize: String(matrixFontSize) + ea,
      fontWeight: String(600),
      width: String(matrixWidth * (2 / propertyNum)) + ea,
      textAlign: "center",
      left: String(0) + ea,
      paddingTop: String(columnPaddingTop + (GeneralJs.isMac() ? 0 : 2.5)) + ea,
      top: String(columnTop) + ea,
      height: String(columnLineHeight + (GeneralJs.isMac() ? 0 : -2.5)) + ea,
      borderBottom: matrixInnerLine,
      background: GeneralJs.colorChip.white,
    };
    for (let z in matrixStyle0) {
      div_clone2.style[z] = matrixStyle0[z];
    }
    matrixBox.appendChild(div_clone2);

    //client
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1 = JSON.parse(JSON.stringify(matrixStyle0));
    matrixStyle1.left = String(matrixWidth * (2 / propertyNum)) + ea;
    matrixStyle1.width = String(matrixWidth * (1 / propertyNum)) + ea;
    matrixStyle1.borderLeft = matrixInnerLine;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "문의";
    matrixBox.appendChild(div_clone2);

    //recommend
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (3 / propertyNum)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "추천";
    matrixBox.appendChild(div_clone2);

    //proposal
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (4 / propertyNum)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "열람";
    matrixBox.appendChild(div_clone2);

    //contract
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (5 / propertyNum)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "계약";
    matrixBox.appendChild(div_clone2);

    //process start
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (6 / propertyNum)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "진행";
    matrixBox.appendChild(div_clone2);

    totalCliid = {
      client: [],
      recommend: [],
      proposal: [],
      contract: [],
      process: []
    };
    totalProid = {
      client: [],
      recommend: [],
      proposal: [],
      contract: [],
      process: []
    };
    reportNumber = 0;
    for (let { startDay, endDay, client, recommend, proposal, contract, process, cliid: cliidObj, proid: proidObj } of report[i].data) {

      columnTop = columnTop + columnLineHeight + columnPaddingTop;

      //case name
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle0.top = String(columnTop) + ea;
      matrixStyle0.background = "";
      if (reportNumber === report[i].data.length - 1) {
        matrixStyle0.borderBottom = '';
      }
      for (let z in matrixStyle0) {
        div_clone2.style[z] = matrixStyle0[z];
      }
      div_clone2.textContent = `${startDay.split('-')[2]} ~ ${endDay.split('-')[2]}`;
      matrixBox.appendChild(div_clone2);

      //client
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("hoverDefault_lite");
      matrixStyle1.top = String(columnTop) + ea;
      matrixStyle1.left = String(matrixWidth * (2 / propertyNum)) + ea;
      matrixStyle1.background = "";
      matrixStyle1.fontWeight = String(200);
      if (reportNumber === report[i].data.length - 1) {
        matrixStyle1.borderBottom = '';
      }
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(client);
      totalCliid.client = totalCliid.client.concat(cliidObj.client);
      totalProid.client = totalProid.client.concat(proidObj.client);
      div_clone2.setAttribute("client", JSON.stringify(cliidObj.client));
      div_clone2.setAttribute("project", JSON.stringify(proidObj.client));
      div_clone2.addEventListener("click", toClientEvent);
      div_clone2.addEventListener("contextmenu", toProjectEvent);
      matrixBox.appendChild(div_clone2);
      summaryTong.client += client;

      //proposal
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("hoverDefault_lite");
      matrixStyle1.left = String(matrixWidth * (3 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(proposal);
      totalCliid.proposal = totalCliid.proposal.concat(cliidObj.proposal);
      totalProid.proposal = totalProid.proposal.concat(proidObj.proposal);
      div_clone2.setAttribute("client", JSON.stringify(cliidObj.proposal));
      div_clone2.setAttribute("project", JSON.stringify(proidObj.proposal));
      div_clone2.addEventListener("click", toClientEvent);
      div_clone2.addEventListener("contextmenu", toProjectEvent);
      matrixBox.appendChild(div_clone2);
      summaryTong.proposal += proposal;

      //recommend
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("hoverDefault_lite");
      matrixStyle1.left = String(matrixWidth * (4 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(recommend);
      totalCliid.recommend = totalCliid.recommend.concat(cliidObj.recommend);
      totalProid.recommend = totalProid.recommend.concat(proidObj.recommend);
      div_clone2.setAttribute("client", JSON.stringify(cliidObj.recommend));
      div_clone2.setAttribute("project", JSON.stringify(proidObj.recommend));
      div_clone2.addEventListener("click", toClientEvent);
      div_clone2.addEventListener("contextmenu", toProjectEvent);
      matrixBox.appendChild(div_clone2);
      summaryTong.recommend += recommend;

      //contract
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("hoverDefault_lite");
      matrixStyle1.left = String(matrixWidth * (5 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(contract);
      totalCliid.contract = totalCliid.contract.concat(cliidObj.contract);
      totalProid.contract = totalProid.contract.concat(proidObj.contract);
      div_clone2.setAttribute("client", JSON.stringify(cliidObj.contract));
      div_clone2.setAttribute("project", JSON.stringify(proidObj.contract));
      div_clone2.addEventListener("click", toClientEvent);
      div_clone2.addEventListener("contextmenu", toProjectEvent);
      matrixBox.appendChild(div_clone2);
      summaryTong.contract += contract;

      //process
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("hoverDefault_lite");
      matrixStyle1.left = String(matrixWidth * (6 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(process);
      totalCliid.process = totalCliid.process.concat(cliidObj.process);
      totalProid.process = totalProid.process.concat(proidObj.process);
      div_clone2.setAttribute("client", JSON.stringify(cliidObj.process));
      div_clone2.setAttribute("project", JSON.stringify(proidObj.process));
      div_clone2.addEventListener("click", toClientEvent);
      div_clone2.addEventListener("contextmenu", toProjectEvent);
      matrixBox.appendChild(div_clone2);
      summaryTong.process += process;

      reportNumber++;
    }
    matrixBox.style.height = String(columnTop + columnLineHeight + columnPaddingTop) + ea;
    div_clone.appendChild(matrixBox);

    //summary
    summaryBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(matrixWidth) + ea,
      fontSize: String(matrixFontSize) + ea,
      left: String(matrixBoxMargin) + ea,
      bottom: String(titleTop + (GeneralJs.isMac() ? 7 : 3)) + ea,
      fontWeight: String(600),
      textAlign: "right",
      lineHeight: String(1.6),
    };
    for (let z in style) {
      summaryBox.style[z] = style[z];
    }

    totalCliid.client = [ ...new Set(totalCliid.client) ];
    totalCliid.recommend = [ ...new Set(totalCliid.recommend) ];
    totalCliid.proposal = [ ...new Set(totalCliid.proposal) ];
    totalCliid.contract = [ ...new Set(totalCliid.contract) ];
    totalCliid.process = [ ...new Set(totalCliid.process) ];

    totalProid.client = [ ...new Set(totalProid.client) ];
    totalProid.recommend = [ ...new Set(totalProid.recommend) ];
    totalProid.proposal = [ ...new Set(totalProid.proposal) ];
    totalProid.contract = [ ...new Set(totalProid.contract) ];
    totalProid.process = [ ...new Set(totalProid.process) ];

    summaryBox.insertAdjacentHTML(`beforeend`, `문의 `);

    b_clone = GeneralJs.nodes.b.cloneNode(true);
    b_clone.style.color = colorChip.green;
    b_clone.style.cursor = "pointer";
    b_clone.textContent = String(summaryTong.client);
    b_clone.setAttribute("client", JSON.stringify(totalCliid.client));
    b_clone.setAttribute("project", JSON.stringify(totalProid.client));
    b_clone.addEventListener("click", toClientEvent);
    b_clone.addEventListener("contextmenu", toProjectEvent);
    summaryBox.appendChild(b_clone);

    summaryBox.insertAdjacentHTML(`beforeend`, `명&nbsp;&nbsp;/&nbsp;&nbsp;추천 `);

    b_clone = GeneralJs.nodes.b.cloneNode(true);
    b_clone.style.color = colorChip.green;
    b_clone.style.cursor = "pointer";
    b_clone.textContent = String(summaryTong.proposal);
    b_clone.setAttribute("client", JSON.stringify(totalCliid.proposal));
    b_clone.setAttribute("project", JSON.stringify(totalProid.proposal));
    b_clone.addEventListener("click", toClientEvent);
    b_clone.addEventListener("contextmenu", toProjectEvent);
    summaryBox.appendChild(b_clone);

    summaryBox.insertAdjacentHTML(`beforeend`, `명&nbsp;&nbsp;/&nbsp;&nbsp;열람 `);

    b_clone = GeneralJs.nodes.b.cloneNode(true);
    b_clone.style.color = colorChip.green;
    b_clone.style.cursor = "pointer";
    b_clone.textContent = String(summaryTong.recommend);
    b_clone.setAttribute("client", JSON.stringify(totalCliid.recommend));
    b_clone.setAttribute("project", JSON.stringify(totalProid.recommend));
    b_clone.addEventListener("click", toClientEvent);
    b_clone.addEventListener("contextmenu", toProjectEvent);
    summaryBox.appendChild(b_clone);

    summaryBox.insertAdjacentHTML(`beforeend`, `명&nbsp;&nbsp;/&nbsp;&nbsp;계약 `);

    b_clone = GeneralJs.nodes.b.cloneNode(true);
    b_clone.style.color = colorChip.green;
    b_clone.style.cursor = "pointer";
    b_clone.textContent = String(summaryTong.contract);
    b_clone.setAttribute("client", JSON.stringify(totalCliid.contract));
    b_clone.setAttribute("project", JSON.stringify(totalProid.contract));
    b_clone.addEventListener("click", toClientEvent);
    b_clone.addEventListener("contextmenu", toProjectEvent);
    summaryBox.appendChild(b_clone);

    summaryBox.insertAdjacentHTML(`beforeend`, `명&nbsp;&nbsp;/&nbsp;&nbsp;진행 `);

    b_clone = GeneralJs.nodes.b.cloneNode(true);
    b_clone.style.color = colorChip.green;
    b_clone.style.cursor = "pointer";
    b_clone.textContent = String(summaryTong.process);
    b_clone.setAttribute("client", JSON.stringify(totalCliid.process));
    b_clone.setAttribute("project", JSON.stringify(totalProid.process));
    b_clone.addEventListener("click", toClientEvent);
    b_clone.addEventListener("contextmenu", toProjectEvent);
    summaryBox.appendChild(b_clone);

    summaryBox.insertAdjacentHTML(`beforeend`, `명<br>추천율 <b style="color:${colorChip.green}">${String(Math.round((summaryTong.proposal / summaryTong.client) * 100))}</b>%&nbsp;&nbsp;/&nbsp;&nbsp;계약율 <b style="color:${colorChip.green}">${String(Math.round((summaryTong.contract / summaryTong.client) * 100))}</b>%&nbsp;&nbsp;/&nbsp;&nbsp;전환율 <b style="color:${colorChip.green}">${String(Math.round((summaryTong.process / summaryTong.proposal) * 100))}</b>%&nbsp;&nbsp;/&nbsp;&nbsp;진행율 <b style="color:${colorChip.green}">${String(Math.round((summaryTong.process / summaryTong.client) * 100))}</b>%`);
    summaryBox.insertAdjacentHTML(`beforeend`, `<br>MAU <b style="color:${colorChip.green}">${String(report[i].mau)}</b>명&nbsp;&nbsp;/&nbsp;&nbsp;광고비용 <b style="color:${colorChip.green}">${autoComma(report[i].charge)}</b>원&nbsp;&nbsp;/&nbsp;&nbsp;광고유입 <b style="color:${colorChip.green}">${String(report[i].adClients)}</b>명`);
    summaryBox.insertAdjacentHTML(`beforeend`, `<br>문의CAC <b style="color:${colorChip.green}">${autoComma(Math.round((summaryTong.client === 0 ? 0 : (report[i].charge / summaryTong.client))))}</b>원&nbsp;&nbsp;/&nbsp;&nbsp;계약CAC <b style="color:${colorChip.green}">${autoComma(Math.round((summaryTong.contract === 0 ? 0 : (report[i].charge / summaryTong.contract))))}</b>원&nbsp;&nbsp;/&nbsp;&nbsp;진행CAC <b style="color:${colorChip.green}">${autoComma(Math.round((summaryTong.process === 0 ? 0 : (report[i].charge / summaryTong.process))))}</b>원`);

    div_clone.appendChild(summaryBox);

    totalSummary.client += summaryTong.client;
    totalSummary.proposal += summaryTong.proposal;
    totalSummary.recommend += summaryTong.recommend;
    totalSummary.contract += summaryTong.contract;
    totalSummary.process += summaryTong.process;

    scrollBox.appendChild(div_clone);
  }

  scrollBox.setAttribute("client_number", String(totalSummary.client));
  scrollBox.setAttribute("proposal_number", String(totalSummary.proposal));
  scrollBox.setAttribute("recommend_number", String(totalSummary.recommend));
  scrollBox.setAttribute("contract_number", String(totalSummary.contract));
  scrollBox.setAttribute("process_number", String(totalSummary.process));

  return scrollBox;
}

ClientJs.prototype.reportContents = function (data, mother, loadingIcon) {
  const instance = this;
  const { zeroAddition, createNode, colorChip } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    input_clone.style.color = GeneralJs.colorChip.black;
    if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
      if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
        target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
      } else if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
        target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
      } else if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
        target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
        target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
      } else {
        target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
      }
    }
    target.value = (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];
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
    if (Number(valueArr1[0]) < 2019) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if ((Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, '')) > (today.getFullYear() * 12) + (today.getMonth() + 1)) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }

    GeneralJs.stacks.reportBoxStartDayInputValue = target.value;

    valueArr0 = target.value.split(" ~ ");
    valueArr1 = valueArr0[0].split("-");
    valueArr2 = valueArr0[1].split("-");

    return { startYear: valueArr1[0], startMonth: valueArr1[1], endYear: valueArr2[0], endMonth: valueArr2[1], };
  }
  let div_clone, div_clone2, input_clone;
  let totalBox;
  let style, inputStyle;
  let ea = "px";
  let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  const scrollBox = this.reportScrollBox(data, motherWidth);
  const today = new Date();
  let todayString;
  let top, height, margin;

  totalBox = {};

  //today range
  todayString = '';
  todayString += today.getMonth() - 7 < 0 ? String(today.getFullYear() - 1) : String(today.getFullYear());
  todayString += '-';
  todayString += today.getMonth() - 7 < 0 ? zeroAddition(13 + today.getMonth() - 7) : zeroAddition(today.getMonth() - 7 + 1);
  todayString += " ~ ";
  todayString += String(today.getFullYear());
  todayString += '-';
  todayString += zeroAddition(today.getMonth() + 1);

  //numbers
  top = 0;
  margin = 36;
  height = 88;

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
    top: String(42 + (GeneralJs.isMac() ? 0 : 5)) + ea,
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
  input_clone.setAttribute("value", todayString);
  input_clone.addEventListener("focus", function (e) {
    input_clone.style.color = GeneralJs.colorChip.green;
    GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
  });
  input_clone.addEventListener("blur", function (e) {
    vaildValue(this);
  });
  input_clone.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const queryObj = vaildValue(this);
      input_clone.blur();
      mother.removeChild(mother.lastChild);
      loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
      loadingIcon.style.opacity = "1";
      GeneralJs.ajax(GeneralJs.objectToRawquery(queryObj), "/getClientReport", function (data) {
        loadingIcon.style.opacity = "0";
        const scrollBox = instance.reportScrollBox(data, motherWidth);
        mother.appendChild(scrollBox);
        while (totalBox.firstChild) {
          totalBox.removeChild(totalBox.lastChild);
        }
        totalBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;열람 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명`);
      });
    }
  });

  div_clone.appendChild(input_clone);

  //total box
  createNode({
    mother: div_clone,
    text: `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;열람 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명` + "&nbsp;&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;&nbsp;" + "<b%리포트 전환%b>",
    event: {
      click: function (e) {
        const eventFunction = instance.secondReportViewMaker();
        eventFunction.call(this, e);
      }
    },
    style: {
      position: "absolute",
      fontSize: String(15) + ea,
      fontWeight: String(500) + ea,
      right: String(1) + ea,
      top: String(56) + ea,
      color: colorChip.black,
      cursor: "pointer",
    },
    bold: {
      fontSize: String(15) + ea,
      fontWeight: String(500) + ea,
      color: colorChip.green,
      cursor: "pointer",
    },
    under: {
      fontSize: String(15) + ea,
      fontWeight: String(500) + ea,
      color: colorChip.deactive,
    },
  })

  //end
  mother.appendChild(div_clone);

  //scroll box
  mother.appendChild(scrollBox);
}

ClientJs.prototype.reportViewMakerDetail = function (recycle = false) {
  const instance = this;
  const { colorChip } = GeneralJs;
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

      GeneralJs.ajax("month=8", "/getClientReport", (data) => {
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

ClientJs.prototype.reportViewMaker = function () {
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

ClientJs.prototype.secondReportScrollBox = function (report, motherWidth) {
  const instance = this;
  const { totalContents, ea } = this;
  const { equalJson, blankHref, colorChip, autoComma, createNode, withOut, dateToString, isMac } = GeneralJs;
  let entireMargin;
  let margin;
  let scrollBox, titleBoxHeight;
  let contentsTong;
  let basePan;
  let dateBoxWidth;
  let dateSize, dateWeight;
  let baseTable;
  let thisLength;
  let tableColumns;
  let columnsLength;
  let baseColumns;
  let columnHeight;
  let thisValues;
  let tableBetween;
  let contentsTongPaddingTop;
  let tableVisualPadding;
  let valuesHeight;
  let valueSize, valueWeight, valueBoldWeight;
  let valueTextTop;

  margin = 18;
  titleBoxHeight = 88;
  entireMargin = margin * 2;

  dateBoxWidth = 120;
  dateSize = 15;
  dateWeight = 400;

  columnHeight = 36;
  valuesHeight = 30;

  tableBetween = 36;
  contentsTongPaddingTop = 8;

  tableVisualPadding = 8;

  valueSize = 13; 
  valueWeight = 400;
  valueBoldWeight = 700;
  valueTextTop = isMac() ? -1 : 1;

  tableColumns = [
    "담당자",
    "당일 고객",
    "월 고객",
    "누적 고객",
    "현 응대중",
    "계약 가능성",
    "당일 추천",
    "월 추천",
    "누적 추천",
    "월 계약",
    "누적 계약",
    "월 진행율",
    "누적 진행율",
  ];

  columnsLength = tableColumns.length;

  scrollBox = createNode({
    mother: totalContents,
    class: [ "noScrollBar" ],
    style: {
      position: "relative",
      top: String(titleBoxHeight) + ea,
      paddingLeft: String(entireMargin) + ea,
      paddingRight: String(entireMargin) + ea,
      paddingBottom: String(margin) + ea,
      width: String(motherWidth - (entireMargin * 2)) + ea,
      height: withOut(titleBoxHeight + margin, ea),
      overflow: "scroll",
    }
  });

  contentsTong = createNode({
    mother: scrollBox,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: withOut(0, ea),
      paddingTop: String(contentsTongPaddingTop) + ea,
    }
  });

  for (let obj of report) {

    thisLength = obj.totalClients.length;

    basePan = createNode({
      mother: contentsTong,
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: withOut(0, ea),
        marginBottom: String(tableBetween) + ea,
      }
    });

    createNode({
      mother: basePan,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(dateBoxWidth) + ea,
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      },
      child: {
        text: dateToString(obj.standard),
        style: {
          fontSize: String(dateSize) + ea,
          fontWeight: String(dateWeight),
          color: colorChip.black,
          position: "relative",
          display: "inline-block",
          fontFamily: "graphik",
        }
      }
    });

    baseTable = createNode({
      mother: basePan,
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: withOut(dateBoxWidth, ea),
        border: "1px solid " + colorChip.gray3,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    });

    for (let i = 0; i < thisLength + 1; i++) {
      if (i === 0) {
        baseColumns = createNode({
          mother: baseTable,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: String(columnHeight) + ea,
            width: withOut(0, ea),
          }
        });
        for (let j = 0; j < columnsLength; j++) {
          createNode({
            mother: baseColumns,
            style: {
              display: "inline-flex",
              height: String(100) + '%',
              width: "calc(100% / " + String(columnsLength) + ")",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              borderRight: j !== columnsLength - 1 ? "1px solid " + colorChip.gray3 : "",
              boxSizing: "border-box",
              background: colorChip.darkDarkShadow,
            },
            child: {
              text: tableColumns[j],
              style: {
                display: "inline-block",
                fontSize: String(valueSize) + ea,
                fontWeight: String(valueBoldWeight),
                color: colorChip.white,
                top: String(valueTextTop) + ea,
                position: "relative",
              }
            }
          });
        }
      } else {

        thisValues = [
          obj.totalClients[i - 1].manager,
          obj.dayClients[i - 1].value,
          obj.monthClients[i - 1].value,
          obj.totalClients[i - 1].value,
          obj.currentClients[i - 1].value,
          obj.contractPossible[i - 1].value,
          obj.dayProposals[i - 1].value,
          obj.monthProposals[i - 1].value,
          obj.totalProposals[i - 1].value,
          obj.monthContracts[i - 1].value,
          obj.totalContracts[i - 1].value,
          String(Math.round((obj.monthClients[i - 1].value === 0 ? 0 : (obj.monthContracts[i - 1].value / obj.monthClients[i - 1].value)) * 10000) / 100) + '%',
          String(Math.round((obj.totalClients[i - 1].value === 0 ? 0 : (obj.totalContracts[i - 1].value / obj.totalClients[i - 1].value)) * 10000) / 100) + '%',
        ];

        baseColumns = createNode({
          mother: baseTable,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: String(i === 0 || i === thisLength ? columnHeight : (i !== 1 && i !== thisLength - 1 ? valuesHeight : valuesHeight + tableVisualPadding)) + ea,
            width: withOut(0, ea),
          }
        });

        for (let j = 0; j < columnsLength; j++) {
          createNode({
            mother: baseColumns,
            style: {
              display: "inline-flex",
              height: String(100) + '%',
              width: "calc(100% / " + String(columnsLength) + ")",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              borderRight: j !== columnsLength - 1 ? "1px solid " + colorChip.gray3 : "",
              boxSizing: "border-box",
              background: i === thisLength ? colorChip.gray0 : colorChip.white,
              paddingTop: i === 1 ? String(tableVisualPadding) + ea : "",
              paddingBottom: i === thisLength - 1 ? String(tableVisualPadding) + ea : "",  
            },
            child: {
              text: String(thisValues[j]),
              style: {
                display: "inline-block",
                fontSize: String(valueSize) + ea,
                fontWeight: i === thisLength ? String(valueBoldWeight) : (j === 0 ? String(valueBoldWeight) : String(valueWeight)),
                color: colorChip.black,
                top: String(valueTextTop) + ea,
                position: "relative",
              }
            }
          });
        }
      }
    }

  }

  return scrollBox;
}

ClientJs.prototype.secondReportContents = function (report, mother, loadingIcon) {
  const instance = this;
  const { zeroAddition, createNode, colorChip, dateToString, ajaxJson } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    input_clone.style.color = GeneralJs.colorChip.black;
    if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
      if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
        target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
      } else if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
        target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
      } else if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
        target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
        target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
      } else {
        target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
      }
    }
    target.value = (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];
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
    if (Number(valueArr1[0]) < 2019) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if ((Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, '')) > (today.getFullYear() * 12) + (today.getMonth() + 1)) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }

    GeneralJs.stacks.reportBoxStartDayInputValue = target.value;

    valueArr0 = target.value.split(" ~ ");
    valueArr1 = valueArr0[0].split("-");
    valueArr2 = valueArr0[1].split("-");

    return { startYear: Number(valueArr1[0]), startMonth: Number(valueArr1[1].replace(/^0/, '')), endYear: Number(valueArr2[0]), endMonth: Number(valueArr2[1].replace(/^0/, '')), };
  }
  let div_clone, div_clone2, input_clone;
  let totalBox;
  let style, inputStyle;
  let ea = "px";
  let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  const scrollBox = this.secondReportScrollBox(report, motherWidth);
  const today = new Date();
  let todayString;
  let top, height, margin;
  let startPoint;

  totalBox = {};

  startPoint = new Date(2022, 11, 1);

  //today range
  todayString = dateToString(startPoint).slice(0, -3) + " ~ " + dateToString(new Date()).slice(0, -3);

  //numbers
  top = 0;
  margin = 36;
  height = 88;

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
    top: String(42 + (GeneralJs.isMac() ? 0 : 5)) + ea,
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
  input_clone.setAttribute("value", todayString);
  input_clone.addEventListener("focus", function (e) {
    input_clone.style.color = GeneralJs.colorChip.green;
    GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
  });
  input_clone.addEventListener("blur", function (e) {
    vaildValue(this);
  });
  input_clone.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const queryObj = vaildValue(this);

      input_clone.blur();

      mother.removeChild(mother.lastChild);
      loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
      loadingIcon.style.opacity = "1";

      ajaxJson(queryObj, BACKHOST + "/dailySalesReport", { equal: true }).then(({ reports }) => {
        loadingIcon.style.opacity = "0";
        mother.appendChild(instance.secondReportScrollBox(reports, motherWidth));
      }).catch((err) => {
        console.log(err);
      });

    }
  });

  div_clone.appendChild(input_clone);

  //total box
  createNode({
    mother: div_clone,
    text: "리포트 전환",
    event: {
      click: function (e) {
        const eventFunction = instance.reportViewMaker();
        eventFunction.call(this, e);
      }
    },
    style: {
      position: "absolute",
      fontSize: String(15) + ea,
      fontWeight: String(500) + ea,
      right: String(1) + ea,
      top: String(56) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  })

  //end
  mother.appendChild(div_clone);

  //scroll box
  mother.appendChild(scrollBox);
}

ClientJs.prototype.secondReportViewMakerDetail = function (recycle = false) {
  const instance = this;
  const { ajaxJson, colorChip } = GeneralJs;
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
        startYear: 2022,
        startMonth: 12,
        endYear: (new Date()).getFullYear(),
        endMonth: (new Date()).getMonth() + 1
      }, BACKHOST + "/dailySalesReport", { equal: true }).then(({ reports }) => {
        svg_icon.style.opacity = String(0);
        instance.secondReportContents(reports, div_clone, svg_icon);
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

ClientJs.prototype.secondReportViewMaker = function () {
  const instance = this;
  return function (e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    e.preventDefault();

    let tempFunc;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.secondReportViewMakerDetail(true), true);
        tempFunc();
      } else {
        tempFunc = instance.secondReportViewMakerDetail(false);
        tempFunc();
      }
    }
  }
}

ClientJs.prototype.proposalViewMakerDetail = function (recycle = false, cliid) {
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
            src: window.location.protocol + "//" + window.location.host + "/proposal?cliid=" + cliid + "&entire=true&dataonly=true",
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

ClientJs.prototype.proposalViewMaker = function (cliid) {
  const instance = this;
  return function (e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    e.preventDefault();

    let tempFunc;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.proposalViewMakerDetail(true, cliid), true);
        tempFunc();
      } else {
        tempFunc = instance.proposalViewMakerDetail(false, cliid);
        tempFunc();
      }
    }
  }
}

ClientJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { selfHref } = GeneralJs;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", (e) => { selfHref("/sales") });
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  reportIcon.addEventListener("contextmenu", this.secondReportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

ClientJs.prototype.makeSearchEvent = function (search = null) {
  const instance = this;
  return async function (e) {
    if (GeneralJs.confirmKey.includes(e.key)) {

      if (search === null) {
        this.value = this.value.replace(/[ \n]/g, '').trim();
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

ClientJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
  input.addEventListener("dblclick", this.makeMysqlEvent());
}

ClientJs.prototype.makeMysqlEvent = function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  const { createNode, withOut, colorChip, setQueue, ajaxJson, uniqueValue, blankHref } = GeneralJs;
  const mysqlClassName = "mysqlTargets";
  const queryBlockClassName = "queryBlockClassName";
  const initialQuery = "SELECT name, phone, email FROM client WHERE cliid = 'c1801_aa01s';";
  const columns = DataPatch.toolsColumnsName();
  const columnsMap = columns.toWording();
  return function (e) {
    e.preventDefault();

    let whiteCardWidth;
    let whiteCardHeight;
    let zIndex;
    let queryBase;
    let innerPadding;
    let boxBetween;
    let queryBoxHeight;
    let grayBoxPaddingTop, grayBoxPaddingLeft;
    let fontSize0, fontSize1;
    let queryPaddingTop;
    let block;
    let buttonWidth, buttonHeight;

    zIndex = 3;
    whiteCardWidth = 1000;
    whiteCardHeight = 600;

    innerPadding = 24;
    boxBetween = 12;

    queryBoxHeight = 72;

    grayBoxPaddingTop = 24;
    grayBoxPaddingLeft = 27;

    fontSize0 = 15;
    fontSize1 = 14;

    queryPaddingTop = 23;

    buttonWidth = 75;
    buttonHeight = 30;

    createNode({
      mother: totalContents,
      class: [ mysqlClassName ],
      event: {
        click: function (e) {
          const removeTargets = [ ...document.querySelectorAll('.' + mysqlClassName) ];
          for (let dom of removeTargets) {
            if (dom === this) {
              dom.style.animation = "justfadeout 0.3s ease forwards";
            } else {
              dom.style.animation = "fadedownlite 0.3s ease forwards";
            }
          }
          setQueue(() => {
            const removeTargets = [ ...document.querySelectorAll('.' + mysqlClassName) ];
            for (let dom of removeTargets) {
              dom.remove();
            }
          }, 301);
        }
      },
      style: {
        position: "fixed",
        background: colorChip.cancelBlack,
        top: String(0) + ea,
        left: String(0),
        width: withOut(0, ea),
        height: withOut(belowHeight, ea),
        animation: "justfadein 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

    queryBase = createNode({
      mother: totalContents,
      class: [ mysqlClassName ],
      style: {
        position: "fixed",
        background: colorChip.white,
        paddingTop: String(innerPadding) + ea,
        width: String(whiteCardWidth) + ea,
        height: String(whiteCardHeight - innerPadding) + ea,
        top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(whiteCardHeight / 2) + ea + ")",
        left: "calc(50% - " + String(whiteCardWidth / 2) + ea + ")",
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        animation: "fadeuplite 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

    block = createNode({
      mother: queryBase,
      event: {
        click: function (e) {
          const self = this;
          const queryInputSetClassName = "queryInputSetClassName";
          let input, cancel;
          let endEvent;
          if ([ ...self.children ].every((dom) => { return !/INPUT/gi.test(dom.nodeName); })) {
            endEvent = () => {
              const targets = document.querySelectorAll('.' + queryInputSetClassName);
              const inputTarget = [ ...targets ].find((dom) => { return /INPUT/gi.test(dom.nodeName); });
              const updatedText = inputTarget.value;
              for (let dom of targets) {
                dom.remove();
              }
              self.firstChild.textContent = updatedText;
              // window.hljs.highlightElement(self.firstChild);
            }
            cancel = createNode({
              mother: self,
              class: [ queryInputSetClassName ],
              event: {
                click: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  endEvent();
                }
              },
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
            input = createNode({
              mother: self,
              class: [ queryInputSetClassName ],
              mode: "input",
              event: {
                click: (e) => { e.preventDefault(); e.stopPropagation(); },
                keyup: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    endEvent();
                  }
                }
              },
              attribute: { type: "text", value: self.textContent },
              style: {
                display: "block",
                position: "absolute",
                top: String(queryPaddingTop) + ea,
                left: String(grayBoxPaddingLeft) + ea,
                border: String(0),
                background: colorChip.gray2,
                fontFamily: "monospace",
                fontSize: String(fontSize0) + ea,
                fontWeight: String(500),
                lineHeight: String(1.5),
                width: String(8000) + ea,
                color: colorChip.green,
                outline: String(0),
                padding: String(0) + ea,
                zIndex: String(1),
              }
            });
          }
        }
      },
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(innerPadding) + ea,
        marginRight: String(innerPadding) + ea,
        width: withOut(innerPadding * 2, ea),
        height: String(queryBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
        overflow: "scroll",
      },
      children: [
        {
          text: initialQuery,
          class: [ queryBlockClassName ],
          style: {
            display: "block",
            position: "relative",
            fontFamily: "monospace",
            fontSize: String(fontSize0) + ea,
            fontWeight: String(500),
            lineHeight: String(1.5),
            width: String(8000) + ea,
            color: colorChip.black,
            paddingLeft: String(grayBoxPaddingLeft) + ea,
            paddingTop: String(queryPaddingTop) + ea,
          }
        }
      ]
    }).firstChild;

    // window.hljs.highlightElement(block);

    createNode({
      mother: queryBase,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(boxBetween) + ea,
        marginLeft: String(innerPadding) + ea,
        marginRight: String(innerPadding) + ea,
        paddingTop: String(grayBoxPaddingTop) + ea,
        width: withOut(innerPadding * 2, ea),
        height: withOut(innerPadding + queryBoxHeight + boxBetween + grayBoxPaddingTop, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            marginLeft: String(grayBoxPaddingLeft) + ea,
            marginRight: String(grayBoxPaddingLeft) + ea,
            width: withOut(grayBoxPaddingLeft * 2, ea),
            height: withOut(grayBoxPaddingTop, ea),
            overflow: "scroll",
          },
          children: [
            {
              text: columnsMap,
              style: {
                display: "block",
                position: "relative",
                width: String(100) + '%',
                fontFamily: "monospace",
                fontSize: String(fontSize1) + ea,
                fontWeight: String(500),
                lineHeight: String(1.5),
                color: colorChip.black,
              }
            }
          ]
        },
        {
          event: {
            click: async function (e) {
              try {
                const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
                const loading = instance.mother.grayLoading();
                const query = document.querySelector('.' + queryBlockClassName).textContent.trim().replace(/\=/gi, "__equal__");
                const result = await ajaxJson({ query }, BACKHOST + "/mysqlQuery", { equal: true });
                let matrix;
                let res, link;
                if (!Array.isArray(result)) {
                  if (typeof result.error === "string") {
                    window.alert(result.error);
                  } else {
                    window.alert("error!");
                  }
                } else {
                  matrix = columns.toMatrix(query, result);
                  res = await ajaxJson({
                    values: matrix,
                    newMake: true,
                    parentId: parentId,
                    sheetName: "fromDB_mysql_" + uniqueValue("hex")
                  }, "/sendSheets");
                  link = res.link;
                  blankHref(link);
                  loading.remove();
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "flex",
            position: "absolute",
            bottom: String(grayBoxPaddingTop) + ea,
            right: String(grayBoxPaddingTop) + ea,
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorChip.gradientGreen3,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: String(5) + ea,
            cursor: "pointer",
          },
          children: [
            {
              text: "Query",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(-2) + ea,
                fontFamily: "monospace",
                fontSize: String(fontSize1) + ea,
                fontWeight: String(500),
                lineHeight: String(1.5),
                color: colorChip.white,
              }
            }
          ]
        }
      ]
    });


  }
}

ClientJs.prototype.backGrayBar = function () {
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

ClientJs.prototype.extractViewMakerDetail = function (recycle = false, link) {
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
    GeneralJs.ajax("message=" + "client extractViewMakerDetail : " + JSON.stringify(e.message) + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ClientJs.prototype.extractViewMaker = function (link) {
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

ClientJs.prototype.addExtractEvent = function () {
  const instance = this;
  const { sub: { extractIcon } } = this.mother.belowButtons;
  let sendEvent;

  sendEvent = async function (e) {
    try {
      const today = new Date();
      const caseCopied = JSON.parse(JSON.stringify(instance.cases));
      caseCopied.shift();
      const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
      const map = DataPatch.clientMap();

      let data;
      let valuesArr;
      let temp, temp2;
      let div_clone, svg_clone;
      let style;
      let ea = "px";
      let width;
      let cliidArr;

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        zIndex: String(3),
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
        zIndex: String(3),
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
        if (map[i] === undefined || typeof map[i] !== "object") {
          temp.push("알 수 없음");
        } else {
          temp.push(map[i].name);
        }
      }
      valuesArr.push(temp);

      cliidArr = [];
      for (let i = 0; i < caseCopied.length; i++) {
        temp2 = Object.values(caseCopied[i]);
        valuesArr.push(temp2);
        cliidArr.push(temp2.find((c) => { return /^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(c); }));
      }

      GeneralJs.ajaxJson({ idArr: cliidArr, method: "client", property: "manager" }, "/getHistoryProperty").then((obj) => {
        valuesArr[0].push("담당자");
        for (let i = 1; i < valuesArr.length; i++) {
          valuesArr[i].push(obj[valuesArr[i].find((c) => { return /^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(c); })]);
        }

        return GeneralJs.ajaxJson({
          values: valuesArr,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_client_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, BACKHOST + "/sendSheets");
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

ClientJs.prototype.makeClipBoardEvent = function (text) {
  const instance = this;
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    try {
      await window.navigator.clipboard.writeText(text);
      instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

ClientJs.prototype.makeImportantEvent = function (id, update, color = "red") {
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
          alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("", GeneralJs.colorChip[color]));
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
        await GeneralJs.ajaxPromise("id=" + id + "&column=important&value=" + value + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateClientHistory");
      }

    } catch (e) {
      GeneralJs.ajax("message=" + e.message + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

ClientJs.prototype.whiteResize = function () {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if (instance.whiteBox !== undefined && instance.whiteBox !== null) {
        if (instance.whiteBox.id !== undefined) {
          window.location.search = "cliid=" + instance.whiteBox.id;
        } else {
          window.location.reload();
        }
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

ClientJs.prototype.globalChaining = async function (thisCase, column, value, pastValue) {
  const instance = this;
  try {
    const map = DataPatch.clientMap();
    const dictionary = {
      service: async function (thisCase, column, value, pastValue) {
        const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
        const { ajaxJson } = GeneralJs;
        const { cliid, service } = thisCase;
        try {
          let serid;
          if (/홈퍼/gi.test(service)) {
            serid = "s2011_aa01s";
          } else if (/홈스/gi.test(service)) {
            serid = "s2011_aa02s";
          } else if (/토탈/gi.test(service)) {
            serid = "s2011_aa03s";
          } else {
            serid = "s2011_aa04s";
          }
          await ajaxJson({
            id: cliid,
            column: "curation.service.serid",
            value: [ serid ],
            email: cookies.homeliaisonConsoleLoginedEmail,
          }, "/updateClientHistory");
        } catch (e) {
          console.log(e);
        }
      },
      movein: async function (thisCase, column, value, pastValue) {
        const { ajaxJson } = GeneralJs;
        const { cliid } = thisCase;
        try {
          if (value !== pastValue) {
            if (window.confirm("추천서 리셋을 원하시나요?")) {
              let project;
              [ project ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getProjects", { equal: true });
              if (project === undefined || project === null) {
                window.alert("리셋할 추천서가 없습니다!");
              } else {
                if (project.desid !== "") {
                  window.alert("이미 계약된 추천서는 리셋할 수 없습니다! 리셋을 원할시 별도로 문의해주세요!");
                } else {
                  await ajaxJson({ cliid }, "/proposalReset");
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
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

ClientJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { ajaxJson, sleep } = GeneralJs;
  communication.setItem([
    () => { return "추천서 자동 생성"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid;
        let response, project;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = (await GeneralJs.prompt("고객 아이디를 입력하세요!")).trim();
          } while (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid));
        } else {
          cliid = instance.whiteBox.id;
        }
        thisCase = null;
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.cliid === cliid) {
              thisCase = c;
            }
          }
        }
        if (thisCase !== null) {
          if (window.confirm(thisCase.name + " 고객님의 추천서를 새롭게 자동 생성합니다. 확실합니까?")) {

            response = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getProjects", { equal: true });
            if (response.length !== 0) {
              [ project ] = response;
              if (project.desid !== "") {
                window.alert("추천서가 새로 만들어질 예정입니다.");
              }
            }

            if (/홈퍼/gi.test(thisCase.service)) {
              serid = "s2011_aa01s";
            } else if (/홈스/gi.test(thisCase.service)) {
              serid = "s2011_aa02s";
            } else if (/토탈/gi.test(thisCase.service)) {
              serid = "s2011_aa03s";
            } else {
              serid = "s2011_aa04s";
            }

            await ajaxJson({
              id: cliid,
              column: "curation.analytics.full",
              value: false,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateClientHistory");

            await ajaxJson({ cliid, serid, silent: true }, "/proposalCreate");

            await sleep(1000);
            window.alert("추천서 제작 요청이 완료되었습니다!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "페이퍼 출력"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let history;
        let cliid, thisCase;
        let caseTong;
        let curation;

        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = (await GeneralJs.prompt("고객 아이디를 입력하세요!")).trim();
          } while (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid));
        } else {
          cliid = instance.whiteBox.id;
        }
        thisCase = null;
        caseTong = [];
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.cliid === cliid) {
              thisCase = c;
              caseTong.push(c);
            }
          }
        }
        if (thisCase !== null) {
          history = await ajaxJson({ id: cliid, rawMode: true }, "/getClientHistory", { equal: true });
          curation = history.curation;
          await ajaxJson({ cliid, curation }, SECONDHOST + "/printClient");
          window.alert("출력 요청이 완료되었습니다!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "순수 부재중 알림"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid, thisHistory, callBoo, liteBoo, inspectionArr;
        let requestNumber;
        let caseTong;
        let answer;
        let updateQuery;
        let name;

        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = (await GeneralJs.prompt("고객 아이디를 입력하세요!")).trim();
          } while (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid));
        } else {
          cliid = instance.whiteBox.id;
        }
        thisCase = null;
        caseTong = [];
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.cliid === cliid) {
              thisCase = c;
              caseTong.push(c);
            }
          }
        }
        if (thisCase !== null) {
          if (window.confirm(thisCase.name + " 고객님께 순수 부재중 알림 알림톡을 전송합니다. 확실합니까?")) {

            await ajaxJson({
              id: cliid,
              column: null,
              value: null,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
              send: "pureOutOfClient",
            }, BACKHOST + "/updateClientHistory");

            await ajaxJson({
              method: "pureOutOfClient",
              name: thisCase.name,
              phone: thisCase.phone,
              option: {
                client: thisCase.name,
                emoji0: "(미소)",
                emoji1: "(콜)",
              }
            }, BACKHOST + "/alimTalk");

          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "고객용 서비스 소개"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid, thisHistory, callBoo, liteBoo, inspectionArr;
        let requestNumber;
        let caseTong;
        let answer;
        let updateQuery;
        let name;

        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = (await GeneralJs.prompt("고객 아이디를 입력하세요!")).trim();
          } while (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid));
        } else {
          cliid = instance.whiteBox.id;
        }
        thisCase = null;
        caseTong = [];
        for (let c of instance.cases) {
          if (c !== null) {
            if (c.cliid === cliid) {
              thisCase = c;
              caseTong.push(c);
            }
          }
        }
        if (thisCase !== null) {
          if (window.confirm(thisCase.name + " 고객님께 서비스 소개 알림톡을 전송합니다. 확실합니까?")) {

            await ajaxJson({
              id: cliid,
              column: null,
              value: null,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
              send: "finalPush",
            }, BACKHOST + "/updateClientHistory");

            await ajaxJson({
              method: "finalPush",
              name: thisCase.name,
              phone: thisCase.phone,
              option: {
                client: thisCase.name,
                host: FRONTHOST.replace(/^https\:\/\//i, ''),
                path: "magnetic",
              }
            }, BACKHOST + "/alimTalk");

          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
}

ClientJs.prototype.sseCardParsing = function (raw) {
  const instance = this;
  const { equalJson, setDebounce, findByAttribute } = GeneralJs;
  const order = equalJson(raw);
  const debounceNameConst = "sseCardAction_";
  const debounceNameConst2 = "sseCardStatus_";
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
        for (let { cliid, requestNumber, mode, from, to, randomToken } of order) {
          if (mode === "action") {
            setDebounce(() => {
              card = findByAttribute(instance.totalFatherChildren, [ "cliid", "request" ], [ cliid, String(requestNumber) ]);
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
                    if (instance.cases[i].cliid === cliid) {
                      indexTong.push({ index: i, thisCase: equalJson(JSON.stringify(instance.cases[i])) });
                    }
                  }
                }
                index = indexTong[requestNumber].index;

                instance.cases[index].action = name;
                rowDom = findByAttribute([ ...document.querySelector("." + cliid).children ], "column", "action");
                if (rowDom !== null) {
                  rowDom.textContent = name;
                }
                card.setAttribute("action", name);

              }
            }, debounceNameConst + String(num));
          } else if (mode === "status") {
            setDebounce(() => {
              card = findByAttribute(instance.totalFatherChildren, [ "cliid", "request" ], [ cliid, String(requestNumber) ]);
              name = to;
              indexTong = [];
              for (let i = 0; i < instance.cases.length; i++) {
                if (instance.cases[i] !== null) {
                  if (instance.cases[i].cliid === cliid) {
                    indexTong.push({ index: i, thisCase: equalJson(JSON.stringify(instance.cases[i])) });
                  }
                }
              }
              index = indexTong[requestNumber].index;
              instance.cases[index].status = name;

              thisStandardDom = Array.from(instance.standardDoms).find((dom) => { return dom.firstChild.textContent.trim() === cliid; });
              thisCaseDom = [ ...document.querySelector("." + cliid).children ];

              rowDom = findByAttribute(thisCaseDom, "column", "status");
              if (rowDom !== null) {
                rowDom.textContent = name;
              }
              card.setAttribute("status", name);

              instance.statusColorSync(name, thisStandardDom, thisCaseDom);
              if (!instance.statusNumberSync(from, name)) {
                length = card.parentElement.children.length;
                fromAction = card.getAttribute("action");
                card.remove();
                length = length - 1;
                findByAttribute(boardDoms, "action", fromAction).textContent = String(length);
                findByAttribute(areaDoms, "action", fromAction).parentElement.children[1].textContent = String(length) + "명";
              }
            }, debounceNameConst2 + String(num));
          }
          num++;
        }
      }
    }
  }
}

ClientJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { dateToString, returnGet, setQueue, cssInjection, requestPromise, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let getTarget;
    let tempFunction;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.members = await ajaxJson({ type: "get" }, "/getMembers", { equal: true });
    GeneralJs.stacks.members = this.members;

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
    }

    getTarget = null;
    if (typeof getObj.specificids === "string") {
      tempFunction = this.makeSearchEvent("id:" + getObj.specificids);
      await tempFunction({ key: "Enter" });
    } else {
      if (typeof getObj.cliid === "string") {
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
        if (getTarget === null || getObj.view === "row") {
          tempFunction = this.makeSearchEvent(getObj.cliid);
          await tempFunction({ key: "Enter" });
          for (let dom of this.standardDoms) {
            if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
              getTarget = dom;
            }
          }
        }
        if (getTarget !== null) {
          if (getObj.view !== "row") {
            getTarget.click();
          }
        }
      } else {
        if (getObj.report === "client") {
          instance.reportViewMaker().call({}, { preventDefault: () => {}});
        } else if (getObj.report === "sales") {
          instance.secondReportViewMaker().call({}, { preventDefault: () => {}});
        }
      }
    }

    // proposal view return event
    window.addEventListener('message', function (e) {
      if (/^[\{\[]/.test(e.data)) {
        try {
          const data = JSON.parse(e.data);
          if (typeof data.cliid === "string" && typeof data.mode === "string") {
            if (data.mode === "reset") {
              const { cliid } = data;
              let target;
              instance.whiteCancelMaker().call({}, {});
              target = null;
              for (let dom of instance.standardDoms) {
                if ((new RegExp(cliid, 'gi')).test(dom.textContent)) {
                  target = dom;
                  break;
                }
              }
              if (target !== null) {
                setQueue(() => {
                  target.click();
                }, 601);
              }
            }
          }
        } catch {}
      }
    });

  } catch (e) {
    GeneralJs.ajax({ message: "ClientJs 프론트 스크립트 문제 생김 " + e.message, channel: "#error_log" }, "/sendSlack", function () {});
    console.log(e);
  }
}
