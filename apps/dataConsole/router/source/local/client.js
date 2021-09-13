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
  this.totalFatherChildren = [];
  this.onView = "mother";
}

ClientJs.prototype.standardBar = function (standard) {
  const instance = this;
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

  if (this.standardDoms.length === 2) {
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
        if (histories[cliid].analytics.full) {
          dom.setAttribute("important", "false");
          tempFunction = instance.makeImportantEvent(cliid, !boo, "green");
          tempFunction.call(dom, { type: "click" });
        } else {
          dom.setAttribute("important", "false");
          dom.addEventListener("contextmenu", instance.makeImportantEvent(cliid, true));
          if (boo) {
            tempFunction = instance.makeImportantEvent(cliid, !boo);
            tempFunction.call(dom, { type: "click" });
          }
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

  if (div_clone.getBoundingClientRect().height < window.innerHeight) {
    div_clone.style.height = String(window.innerHeight) + ea;
  }

}

ClientJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let clients, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;

    if (search === null || search === '' || search === '-') {
      const ago = new Date();
      ago.setDate(ago.getDate() - 30);
      clients = await GeneralJs.ajaxJson({ whereQuery: { $or: [ { requests: { $elemMatch: { "request.timeline": { $gte: ago } } } }, { requests: { $elemMatch: { "analytics.response.status": { $regex: "^[응장]" } } } } ] } }, "/getClients");
    } else {
      clients = await GeneralJs.ajaxJson({ query: search }, "/searchClients");
    }

    const { standard, data } = clients;

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

ClientJs.prototype.cardViewMaker = function () {
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
      let nameStyle, cliidStyle, barStyle;
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

      cliidStyle = {
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
      for (let i = 0; i < DataPatch.clientCardViewStandard().info.length; i++) {
        temp = {
          position: "absolute",
          fontSize: String(fontSize) + ea,
          fontWeight: String(500),
          top: String(startTop + (lineHeight * (i + 1)) + (DataPatch.clientCardViewStandard().exceptionHeight[i] ? exceptionMargin : 0) + (GeneralJs.isMac() ? 0 : 3)) + ea,
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
          let cliid, originalStatus, index;
          let motherDiv, originalDiv;
          let requests, requestIndex;
          let column;
          let finalValue;

          cliid = from.getAttribute("cliid");
          index = from.getAttribute("index");
          originalStatus = from.getAttribute("thisStatus");

          numbers.get(originalStatus).setAttribute("number", String(Number(numbers.get(originalStatus).getAttribute("number")) - 1));
          numbers.get(originalStatus).textContent = numbers.get(originalStatus).getAttribute("number") + "명";
          numbers.get(to).setAttribute("number", String(Number(numbers.get(to).getAttribute("number")) + 1));
          numbers.get(to).textContent = numbers.get(to).getAttribute("number") + "명";

          from.setAttribute("thisStatus", to);
          if (to === "드랍") {
            from.setAttribute("dropDetail", originalStatus);
          } else if (from.hasAttribute("dropDetail")) {
            from.setAttribute("dropDetail", "");
          }

          requests = [];
          for (let i = 1; i < instance.cases.length; i++) {
            if (instance.cases[i].cliid === cliid) {
              requests.push(instance.cases[i]);
            }
          }
          for (let i = 0; i < requests.length; i++) {
            if (requests[i] === instance.cases[Number(index)]) {
              requestIndex = i;
            }
          }

          column = "status";

          motherDiv = document.querySelectorAll('.' + cliid)[requestIndex];
          for (let i = 0; i < motherDiv.children.length; i++) {
            if (motherDiv.children[i].getAttribute("column") === column) {
              originalDiv = motherDiv.children[i];
            }
          }

          if (to === "통화 전") {
            toValue = "응대중";
          } else if (to === "제안 전") {
            toValue = "응대중";
          } else if (to === "제안 후") {
            toValue = "응대중";
          } else if (to === "진행") {
            toValue = "진행";
          } else if (to === "드랍") {
            toValue = "드랍";
          }

          finalValue = GeneralJs.vaildValue(column, toValue, originalStatus);

          instance.cases[Number(index)][column] = finalValue;
          await GeneralJs.updateValue({
            thisId: cliid,
            requestIndex: requestIndex,
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

          if (area.getAttribute("name") === "통화 전") {
            if (status === "통화 전") {
              //pass
            } else if (status === "제안 전") {
              alert("통화 기록은 되돌릴 수 없습니다!");
            } else if (status === "제안 후") {
              alert("통화 기록은 되돌릴 수 없습니다!");
            } else if (status === "진행") {
              alert("통화 기록은 되돌릴 수 없습니다!");
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail !== "통화 전") {
                alert("통화 기록은 되돌릴 수 없습니다!");
              } else {
                area.appendChild(targetDom);
                await updateState(targetDom, "통화 전");
              }
            }

          } else if (area.getAttribute("name") === "제안 전") {
            if (status === "통화 전") {
              alert("통화 기록을 기입해주세요!");
            } else if (status === "제안 전") {
              //pass
            } else if (status === "제안 후") {
              alert("제안 기록은 되돌릴 수 없습니다!");
            } else if (status === "진행") {
              alert("제안 기록은 되돌릴 수 없습니다!");
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "통화 전") {
                alert("통화 기록을 기입해주세요!");
              } else if (dropDetail === "제안 전") {
                area.appendChild(targetDom);
                await updateState(targetDom, "제안 전");
              } else if (dropDetail === "제안 후") {
                alert("제안 기록은 되돌릴 수 없습니다!");
              } else if (dropDetail === "진행") {
                alert("제안 기록은 되돌릴 수 없습니다!");
              }
            }

          } else if (area.getAttribute("name") === "제안 후") {
            if (status === "통화 전") {
              alert("통화 기록을 기입해주세요!");
            } else if (status === "제안 전") {
              alert("제안서를 작성해주세요!");
            } else if (status === "제안 후") {
              //pass
            } else if (status === "진행") {
              area.appendChild(targetDom);
              await updateState(targetDom, "제안 후");
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "통화 전") {
                alert("통화 기록을 기입해주세요!");
              } else if (dropDetail === "제안 전") {
                alert("제안서를 작성해주세요!");
              } else if (dropDetail === "제안 후") {
                area.appendChild(targetDom);
                await updateState(targetDom, "제안 후");
              } else if (dropDetail === "진행") {
                area.appendChild(targetDom);
                await updateState(targetDom, "제안 후");
              }
            }

          } else if (area.getAttribute("name") === "진행") {
            if (status === "통화 전") {
              alert("통화 기록을 기입해주세요!");
            } else if (status === "제안 전") {
              alert("제안서를 작성해주세요!");
            } else if (status === "제안 후") {
              area.appendChild(targetDom);
              await updateState(targetDom, "진행");
            } else if (status === "진행") {
              //pass
            } else if (status === "드랍") {
              dropDetail = targetDom.getAttribute("dropDetail");
              if (dropDetail === "통화 전") {
                alert("통화 기록을 기입해주세요!");
              } else if (dropDetail === "제안 전") {
                alert("제안서를 작성해주세요!");
              } else if (dropDetail === "제안 후") {
                area.appendChild(targetDom);
                await updateState(targetDom, "진행");
              } else if (dropDetail === "진행") {
                area.appendChild(targetDom);
                await updateState(targetDom, "진행");
              }
            }

          } else if (area.getAttribute("name") === "드랍") {
            if (status === "통화 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "제안 전") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "제안 후") {
              area.appendChild(targetDom);
              await updateState(targetDom, "드랍");
            } else if (status === "진행") {
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
        "통화 전",
        "제안 전",
        "제안 후",
        "진행",
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

      whereQuery = {};
      whereQuery["$or"] = [];
      for (let i = 1; i < cases.length; i++) {
        whereQuery["$or"].push({ cliid: cases[i].cliid });
      }
      tempResult = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getProjects"));

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
          div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.cliid));
          div_clone.appendChild(div_clone2);

          //cliid
          cliidStyle.left = String(intend + GeneralJs.calculationWordWidth(nameFontSize, obj.name, true)) + ea;
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.cliid;
          for (let i in cliidStyle) {
            div_clone2.style[i] = cliidStyle[i];
          }
          div_clone2.addEventListener("click", instance.whiteViewMaker(num));
          div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.cliid));
          div_clone.appendChild(div_clone2);

          //bar
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          for (let i in barStyle) {
            div_clone2.style[i] = barStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //sub info
          for (let j = 0; j < DataPatch.clientCardViewStandard().info.length; j++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("father_" + DataPatch.clientCardViewStandard().info[j]);
            div_clone2.textContent = obj[DataPatch.clientCardViewStandard().info[j]];
            for (let i in styles[j]) {
              div_clone2.style[i] = styles[j][i];
            }
            div_clone.appendChild(div_clone2);
          }

          div_clone.setAttribute("index", String(num));
          div_clone.setAttribute("kinds", "card");
          div_clone.setAttribute("cliid", obj.cliid);

          tempBoo = false;
          for (let { cliid } of tempResult) {
            if (obj.cliid === cliid) {
              tempBoo = true;
            }
          }

          if (obj.status === "응대중" && obj.callHistory === "") {
            div_clone.setAttribute("thisStatus", "통화 전");
            division.get("통화 전").appendChild(div_clone);
          } else if (obj.status === "응대중" && !tempBoo) {
            div_clone.setAttribute("thisStatus", "제안 전");
            division.get("제안 전").appendChild(div_clone);
          } else if (obj.status === "응대중" && tempBoo) {
            div_clone.setAttribute("thisStatus", "제안 후");
            division.get("제안 후").appendChild(div_clone);
          } else if (obj.status === "진행") {
            div_clone.setAttribute("thisStatus", "진행");
            division.get("진행").appendChild(div_clone);
          } else if (obj.status === "드랍") {
            div_clone.setAttribute("thisStatus", "드랍");
            if (obj.callHistory === "") {
              div_clone.setAttribute("dropDetail", "통화 전");
            } else if (!tempBoo) {
              div_clone.setAttribute("dropDetail", "제안 전");
            } else {
              div_clone.setAttribute("dropDetail", "제안 후");
            }
            division.get("드랍").appendChild(div_clone);
          } else if (obj.status === "완료") {
            div_clone.setAttribute("thisStatus", "드랍");
            div_clone.setAttribute("dropDetail", "제안 후");
            division.get("드랍").appendChild(div_clone);
          } else {
            throw new Error("invaild status");
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

ClientJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  const cookies = GeneralJs.getCookiesAll();
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
  callEvent = async function (e) {
    try {
      if (window.confirm(thisCase.name + " 고객님께 전화를 걸까요?")) {
        await GeneralJs.ajaxJson({
          who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
          phone: thisCase.phone.replace(/[^0-9]/gi, '')
        }, "/callTo");
      }
    } catch (e) {
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
    fontWeight: String(600),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (12 / 60) : (5 / 60))) + ea,
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
    fontSize: String(titleFontSize * (17 / 42)) + ea,
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
  hInitialBox.classList.add("hoverdefault_reverse");
  for (let i in style) {
    hInitialBox.style[i] = style[i];
  }
  hInitialBox.style.opacity = '';
  hInitialBox.style.right = String(leftMargin + (leftMargin * (31 / 60))) + ea;
  hInitialBox.style.height = String(leftMargin * (20 / 60)) + ea;
  hInitialBox.style.width = String(leftMargin * (18 / 60)) + ea;
  hInitialBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  hInitialBox.style.background = GeneralJs.colorChip.white;
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
  fontSize = (contentsBoxHeight / info.length) / 1.8;
  lineHeightRatio = ((contentsBoxHeight - fontSize) / fontSize) / (info.length - 1);

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
          } else if (e.type === "message") {
            finalValue = GeneralJs.vaildValue(column, e.data, pastRawData);
          }

          instance.cases[thisCase["index"]][column] = finalValue;
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

      GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, '') + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateClientHistory", function (res) {});
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

  //h initial event
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
  GeneralJs.stacks["rInitialBoxButtonToggle"] = 0;
  GeneralJs.stacks["rInitialBoxButtonDom"] = null;
  rInitialBox.addEventListener("click", function (e) {
    const { colorChip, createNode, createNodes, withOut, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, serviceParsing } = GeneralJs;
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
        idArr: [ thisCase[standard[1]] ],
        method: "client",
        property: "curation",
      }, "/getHistoryProperty").then((raw) => {

      // ajaxJson({
      //   cliid: thisCase[standard[1]]
      // }, "/ghostPass_clientPhoto").then((obj) => {
      //   images = images.concat(obj.sitePhoto);
      //   images = images.concat(obj.preferredPhoto);
      //   return ajaxJson({
      //     idArr: [ thisCase[standard[1]] ],
      //     method: "client",
      //     property: "curation",
      //   }, "/getHistoryProperty");
      //
      // }).then((raw) => {

        if (typeof raw !== "object" || Array.isArray(raw)) {
          throw new Error("결과 없음");
        }
        obj = raw;
        return ajaxJson({
          images: obj[thisCase[standard[1]]].image
        }, "/ghostPass_photoParsing");

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
          return "https://" + GHOSTHOST + imageLink + "/" + pid + "/" + image;
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
            if (typeof obj.referrer === "string") {
              if (/mode\=lite/gi.test(obj.referrer)) {
                pageName = "스타일 체크";
              } else {
                pageName = "부재중 알림";
              }
            }
            if (typeof obj.mode === "string") {
              if (/lite/gi.test(obj.mode)) {
                pageName = "스타일 체크";
              } else {
                pageName = "부재중 알림";
              }
            }
          } else if (/proposal/gi.test(obj.page)) {
            pageName = "제안서";
          } else if (/estimation/gi.test(obj.page)) {
            pageName = "견적서";
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
            text = `${date} | ${obj.who.name}이 <b%${pageName}%b> 페이지를 고객에게 <b%전송%b>함`;
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
                    if (toggle === "off") {
                      cleanChildren(scrollTong);
                      imageLoad();
                      textDom.textContent = "고객님이 선택하고 보내신 사진";
                      this.setAttribute("toggle", "on");
                    } else {
                      cleanChildren(scrollTong);
                      historyLoad();
                      textDom.textContent = "고객님의 페이지 행적";
                      this.setAttribute("toggle", "off");
                    }
                  }
                }
              ],
              style: {
                position: "absolute",
                bottom: String(circleBottom) + ea,
                right: String(circleRight) + ea,
                width: String(circleRadius) + ea,
                height: String(circleRadius) + ea,
                background: colorChip.red,
                borderRadius: String(circleRadius) + ea,
              }
            }
          ]
        });
        scroll = createNode({
          mother: tong,
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
          }
        });

        imageLoad = () => {
          if (!imageNothing) {
            scrollTong.style.height = String(8000) + ea;

            let num, children;
            let analyticsWidth, analyticsTop, analyticsBottom;
            let analyticsSizeVisual;

            analyticsWidth = 106;
            analyticsTop = -2;
            analyticsBottom = 3;
            analyticsSizeVisual = 1;
            num = 0;

            for (let image of images) {
              createNode({
                mother: scrollTong,
                mode: "img",
                attribute: [
                  { src: image },
                  { index: String(num) },
                  { method: /sitePhoto/g.test(image) ? "site" : (/preferredPhoto/g.test(image) ? "preferred" : "selected") },
                  { length: String(images.length) }
                ],
                style: {
                  position: "relative",
                  display: "inline-block",
                  width: "calc(calc(100% - " + String(imageMargin * (columnsLength - 1)) + ea + ") / " + String(columnsLength) + ")",
                  height: "auto",
                  marginRight: String(num % columnsLength === columnsLength - 1 ? 0 : imageMargin) + ea,
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
                        ],
                        events: [
                          {
                            type: "dblclick",
                            event: function (e) {
                              e.preventDefault();
                              downloadFile(this.getAttribute("src"));
                            }
                          },
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

                    }
                  }
                ]
              });
              scrollTong.style.height = "auto";
              num++;
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
                text: serviceParsing(curation.service.serid[0]),
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

ClientJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.clientWhiteViewStandard();
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

  let div_clone, div_clone2;
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

  margin = 18;
  boxNumber = Math.floor((motherWidth - (margin * 3)) / (margin + 400));
  boxHeight = 400;
  boxWidth = (motherWidth - (margin * (boxNumber + 1 + 2))) / boxNumber;
  boxTop = 88;
  propertyNum = 7;

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
    matrixFontSize = 14;
    matrixInnerLine = "1px solid " + GeneralJs.colorChip.gray2;
    matrixOuterLine = "1px solid " + GeneralJs.colorChip.gray4;
    matrixTop = titleTop + 40;
    matrixBoxMargin = 23;
    matrixWidth = boxWidth - (matrixBoxMargin * 2) - 3;
    matrixHeight = 240;
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
    titleBox.textContent = `${report[i][0].startDay.split('-')[0]}-${report[i][0].startDay.split('-')[1]}`;
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
    div_clone2.textContent = "제안";
    matrixBox.appendChild(div_clone2);

    //proposal
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (4 / propertyNum)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "추천";
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

    reportNumber = 0;
    for (let { startDay, endDay, client, recommend, proposal, contract, process } of report[i]) {

      columnTop = columnTop + columnLineHeight + columnPaddingTop;

      //case name
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle0.top = String(columnTop) + ea;
      matrixStyle0.background = "";
      if (reportNumber === report[i].length - 1) {
        matrixStyle0.borderBottom = '';
      }
      for (let z in matrixStyle0) {
        div_clone2.style[z] = matrixStyle0[z];
      }
      div_clone2.textContent = `${startDay.split('-')[2]} ~ ${endDay.split('-')[2]}`;
      matrixBox.appendChild(div_clone2);

      //client
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.top = String(columnTop) + ea;
      matrixStyle1.left = String(matrixWidth * (2 / propertyNum)) + ea;
      matrixStyle1.background = "";
      matrixStyle1.fontWeight = String(200);
      if (reportNumber === report[i].length - 1) {
        matrixStyle1.borderBottom = '';
      }
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(client);
      matrixBox.appendChild(div_clone2);
      summaryTong.client += client;

      //proposal
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (3 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(proposal);
      matrixBox.appendChild(div_clone2);
      summaryTong.proposal += proposal;

      //recommend
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (4 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(recommend);
      matrixBox.appendChild(div_clone2);
      summaryTong.recommend += recommend;

      //contract
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (5 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(contract);
      matrixBox.appendChild(div_clone2);
      summaryTong.contract += contract;

      //contract
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (6 / propertyNum)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(process);
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
      fontSize: String(matrixFontSize + 2) + ea,
      left: String(matrixBoxMargin) + ea,
      bottom: String(titleTop + (GeneralJs.isMac() ? 7 : 3)) + ea,
      fontWeight: String(400),
      textAlign: "right",
      lineHeight: String(1.6),
    };
    for (let z in style) {
      summaryBox.style[z] = style[z];
    }

    summaryBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${String(summaryTong.client)}</b>명&nbsp;&nbsp;제안 <b style="color:${GeneralJs.colorChip.green}">${String(summaryTong.proposal)}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${String(summaryTong.recommend)}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${String(summaryTong.contract)}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${String(summaryTong.process)}</b>명<br>제안율 <b style="color:${GeneralJs.colorChip.green}">${String(Math.round((summaryTong.proposal / summaryTong.client) * 100))}</b>%&nbsp;&nbsp;진행율 <b style="color:${GeneralJs.colorChip.green}">${String(Math.round((summaryTong.process / summaryTong.client) * 100))}</b>%`);
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
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
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
        totalBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;제안 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명`);
      });
    }
  });

  div_clone.appendChild(input_clone);

  //total box
  totalBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    fontSize: String(15) + ea,
    fontWeight: String(500) + ea,
    right: String(1) + ea,
    top: String(56) + ea,
    color: GeneralJs.colorChip.black,
  };
  for (let i in style) {
    totalBox.style[i] = style[i];
  }

  totalBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;제안 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명`);
  div_clone.appendChild(totalBox);

  //end
  mother.appendChild(div_clone);

  //scroll box
  mother.appendChild(scrollBox);
}

ClientJs.prototype.reportViewMakerDetail = function (recycle = false) {
  const instance = this;
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

      GeneralJs.ajax("month=8", "/getClientReport", function (data) {
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

ClientJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

ClientJs.prototype.makeSearchEvent = function (search = null) {
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

ClientJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
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
        }, "/sendSheets");
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

ClientJs.prototype.dashboardBox = function (option) {
  if (typeof option !== "object") {
    throw new Error("must be style object");
  }
  if (typeof option.name !== "string") {
    throw new Error("must be dashboard name");
  }
  if (typeof option.style !== "object") {
    throw new Error("must be style object");
  }
  if (typeof option.style.right !== "number" || typeof option.style.bottom !== "number" || typeof option.style.height !== "number") {
    throw new Error("invaild style object");
  }
  if (typeof option.style.width !== "number") {
    option.style.width = 340;
  }
  if (typeof option.title !== "object") {
    throw new Error("must be title object");
  }
  if (typeof option.title.main !== "string" || typeof option.title.sub !== "string") {
    throw new Error("invaild title object");
  }
  if (typeof option.callback !== "function") {
    throw new Error("must be callback");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  let { name: dashboardName, style: { width, right, bottom, height }, title: { main: mainTitle, sub: subTitle }, callback } = option;
  let ea;
  let dashboardBox, dashboardWindow;
  let topBarHeight;
  let dragRatio;
  let paddingTop;
  let titleSize;
  let titleHeight;
  let leftMargin;
  let titleMargin;
  let titleBetween;
  let contentsSize;

  ea = "px";
  dashboardName = "__name__" + dashboardName;

  GeneralJs.stacks["dashboardBoxBoo" + dashboardName] = false;
  GeneralJs.stacks["dashboardBox" + dashboardName] = null;
  GeneralJs.stacks["dashboardBoxMother" + dashboardName] = null;
  GeneralJs.stacks["dashboardBoxHeight" + dashboardName] = 0;

  titleSize = 21;
  titleHeight = 36;
  leftMargin = 24;
  paddingTop = 15;
  topBarHeight = 14;
  dragRatio = 1;
  titleMargin = 8;
  titleBetween = 5;
  contentsSize = 14;

  dashboardWindow = createNode({
    mother: this.mother.below,
    class: [ "backblurdefault_lite" ],
    style: {
      position: "fixed",
      background: colorChip.white,
      right: String(right) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
      borderRadius: String(5) + "px",
      bottom: String(bottom) + ea,
      overflow: "hidden",
      opacity: String(0.9),
      boxShadow: "-1px 4px 15px -9px " + colorChip.gray5,
      transition: "all 0s ease",
      zIndex: String(102),
      animation: "fadeuplite 0.3s ease forwards",
    },
    events: [
      {
        type: "dragover",
        event: function (e) {
          e.preventDefault();
          const that = this;
          that.style.bottom = String(window.innerHeight - (e.y + (height * dragRatio))) + ea;
          that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint" + dashboardName]) + ea;
        }
      }
    ],
    children: [
      {
        attribute: [
          { draggable: "true" }
        ],
        style: {
          position: "absolute",
          width: String(100) + "%",
          height: String(topBarHeight) + ea,
          top: String(0),
          left: String(0),
          background: colorChip.gray2,
          cursor: "move",
          transition: "all 0s ease",
        },
        events: [
          {
            type: "dragstart",
            event: function (e) {
              const that = this.parentNode;
              let div;
              let style, ea;

              GeneralJs.stacks["windowDragStartPoint" + dashboardName] = 0;
              GeneralJs.stacks["windowDragStartPoint" + dashboardName] = e.x - that.offsetLeft;
              ea = "px";

              div = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                background: "transparent",
                width: String(100) + '%',
                height: String(100) + '%',
                top: String(0),
                left: String(0)
              };
              for (let i in style) {
                div.style[i] = style[i];
              }
              div.addEventListener("dragover", function (e) {
                that.style.bottom = String(window.innerHeight - e.y - (height * dragRatio)) + ea;
                that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint" + dashboardName]) + ea;
                e.preventDefault();
              });
              GeneralJs.stacks["windowDragBack" + dashboardName] = div;
              that.parentNode.insertBefore(div, that);

              e.dataTransfer.setData("dragData", that);
              const img = new Image();
              e.dataTransfer.setDragImage(img, 1, 1);
            }
          },
          {
            type: "dragend",
            event: function (e) {
              e.preventDefault();
              GeneralJs.stacks["windowDragBack" + dashboardName].parentElement.removeChild(GeneralJs.stacks["windowDragBack" + dashboardName]);
              GeneralJs.stacks["windowDragBack" + dashboardName] = null;
            }
          },
          {
            type: "dragenter",
            event: (e) => { e.preventDefault(); }
          },
          {
            type: "dragleave",
            event: (e) => { e.preventDefault(); }
          },
          {
            type: "dragover",
            event: function (e) {
              e.preventDefault();
              const that = this.parentNode;
              that.style.bottom = String(window.innerHeight - (e.y + (height * dragRatio))) + ea;
              that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint" + dashboardName]) + ea;
            }
          },
          {
            type: "drop",
            event: (e) => { e.preventDefault(); e.stopPropagation(); }
          },
          {
            type: "contextmenu",
            event: function (e) {
              e.stopPropagation();
              e.preventDefault();
              if (GeneralJs.stacks["dashboardBoxMother" + dashboardName] !== null) {
                instance.mother.below.removeChild(GeneralJs.stacks["dashboardBoxMother" + dashboardName]);
                GeneralJs.stacks["dashboardBoxBoo" + dashboardName] = false;
                GeneralJs.stacks["dashboardBox" + dashboardName] = null;
                GeneralJs.stacks["dashboardBoxMother" + dashboardName] = null;
              }
            }
          }
        ]
      }
    ]
  });

  dashboardBox = createNode({
    mother: dashboardWindow,
    style: {
      position: "relative",
      width: String(100) + "%",
      height: withOut(topBarHeight, ea),
      marginTop: String(topBarHeight + ((isMac()) ? 0 : 3)) + ea,
      background: colorChip.white,
      transition: "all 0s ease",
      paddingTop: String(paddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(leftMargin) + ea,
          width: withOut(leftMargin * 2, ea),
          height: String(titleHeight) + ea,
          marginBottom: String(titleBetween) + ea,
        },
        children: [
          {
            text: mainTitle,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(200),
              color: colorChip.black,
              marginRight: String(titleMargin) + ea,
            }
          },
          {
            text: subTitle,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(200),
              color: colorChip.green,
              marginRight: String(titleMargin) + ea,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(leftMargin) + ea,
          width: withOut(leftMargin * 2, ea),
          height: withOut(titleHeight + paddingTop + leftMargin + titleBetween, ea),
        }
      }
    ]
  });

  callback(dashboardBox.lastChild, contentsSize, ea);

  GeneralJs.stacks["dashboardBoxBoo" + dashboardName] = true;
  GeneralJs.stacks["dashboardBox" + dashboardName] = dashboardBox;
  GeneralJs.stacks["dashboardBoxMother" + dashboardName] = dashboardWindow;
  GeneralJs.stacks["dashboardBoxHeight" + dashboardName] = height;

}

ClientJs.prototype.globalChaining = async function (thisCase, column, value, pastValue) {
  const instance = this;
  try {
    const map = DataPatch.clientMap();
    const dictionary = {
      service: async function (thisCase, column, value, pastValue) {
        const cookies = GeneralJs.getCookiesAll();
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
            if (window.confirm("제안서 리셋을 원하시나요?")) {
              await ajaxJson({ cliid }, "/proposalReset");
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
    () => { return "부재중 알림"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid, thisHistory, callBoo, liteBoo, inspectionArr;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = window.prompt("고객 아이디를 입력하세요!").trim();
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
          if (window.confirm(thisCase.name + " 고객님께 부재중 알림 알림톡을 전송합니다. 확실합니까?")) {
            inspectionArr = await ajaxJson({
              mode: "inspection",
              addressArr: [ { id: thisCase.cliid, address: thisCase.address } ],
              liteMode: false,
            }, "/parsingAddress");
            if (inspectionArr.length !== 0) {
              window.alert("고객님의 주소가 잘못되어 제안서를 만들 수 없습니다!\n" + inspectionArr[0].message + "\n고객님의 주소를 올바른 형식으로 고쳐주세요!\n(도로명과 건물 번호가 반드시 있어야 함)");
              window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + inspectionArr[0].id;
            } else {
              thisHistory = await ajaxJson({ rawMode: true, id: cliid }, "/getClientHistory");
              liteBoo = false;
              callBoo = false;
              for (let { success } of thisHistory.curation.analytics.call.out) {
                if (success) {
                  callBoo = true;
                }
              }
              for (let { success } of thisHistory.curation.analytics.call.in) {
                if (success) {
                  callBoo = true;
                }
              }

              if (callBoo) {
                liteBoo = window.confirm("전화에 성공한 기록이 있습니다. 1차 응대를 한 번 이상 정상적으로 된 적이 있었나요?");
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

              if (!liteBoo) {

                await ajaxJson({
                  id: cliid,
                  column: "curation.service.serid",
                  value: [ serid ],
                  email: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
                  send: "styleCuration_general",
                }, "/updateClientHistory");

                await ajaxJson({
                  method: "outOfClient",
                  name: thisCase.name,
                  phone: thisCase.phone,
                  option: {
                    client: thisCase.name,
                    host: GHOSTHOST,
                    path: "curation",
                    cliid: cliid,
                  }
                }, "/alimTalk");

              } else {

                await ajaxJson({
                  id: cliid,
                  column: "curation.service.serid",
                  value: [ serid ],
                  email: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
                  send: "styleCuration_lite",
                }, "/updateClientHistory");

                await ajaxJson({
                  method: "clientCuration",
                  name: thisCase.name,
                  phone: thisCase.phone,
                  option: {
                    client: thisCase.name,
                    emoji0: "(방긋)",
                    emoji1: "(오케이)",
                    host: GHOSTHOST,
                    path: "curation",
                    cliid: cliid,
                    mode: "lite"
                  }
                }, "/alimTalk");

              }

              await sleep(1000);
              window.alert("알림톡 전송이 완료되었습니다!");
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "스타일 체크"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid, inspectionArr;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = window.prompt("고객 아이디를 입력하세요!").trim();
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
          if (window.confirm(thisCase.name + " 고객님께 스타일 체크 알림톡을 전송합니다. 확실합니까?")) {

            inspectionArr = await ajaxJson({
              mode: "inspection",
              addressArr: [ { id: thisCase.cliid, address: thisCase.address } ],
              liteMode: false,
            }, "/parsingAddress");
            if (inspectionArr.length !== 0) {
              window.alert("고객님의 주소가 잘못되어 제안서를 만들 수 없습니다!\n" + inspectionArr[0].message + "\n고객님의 주소를 올바른 형식으로 고쳐주세요!\n(도로명과 건물 번호가 반드시 있어야 함)");
              window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + inspectionArr[0].id;
            } else {

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
                column: "curation.service.serid",
                value: [ serid ],
                email: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
                send: "styleCuration_lite",
              }, "/updateClientHistory");

              await ajaxJson({
                method: "clientCuration",
                name: thisCase.name,
                phone: thisCase.phone,
                option: {
                  client: thisCase.name,
                  emoji0: "(방긋)",
                  emoji1: "(오케이)",
                  host: GHOSTHOST,
                  path: "curation",
                  cliid: cliid,
                  mode: "lite"
                }
              }, "/alimTalk");
              await sleep(1000);
              window.alert("알림톡 전송이 완료되었습니다!");

            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);
  communication.setItem([
    () => { return "제안서 자동 생성"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        let cliid, thisCase, serid;
        if (instance.whiteBox === null || instance.whiteBox === undefined) {
          do {
            cliid = window.prompt("고객 아이디를 입력하세요!").trim();
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
          if (window.confirm(thisCase.name + " 고객님의 제안서를 새롭게 자동 생성합니다. 확실합니까?")) {

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
              email: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
              send: "styleCuration_lite",
            }, "/updateClientHistory");

            await ajaxJson({ cliid, serid, slient: true }, "/proposalCreate");

            await sleep(1000);
            window.alert("제안서 제작 요청이 완료되었습니다!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

}

ClientJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { dateToString, returnGet } = GeneralJs;

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

    const getObj = returnGet();
    let getTarget;
    let tempFunction;

    getTarget = null;
    if (getObj.cliid !== undefined) {
      for (let dom of this.standardDoms) {
        if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
          getTarget = dom;
        }
      }
      if (getTarget === null) {
        tempFunction = this.makeSearchEvent(getObj.cliid);
        await tempFunction({ key: "Enter" });
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
      }
      if (getTarget !== null) {
        getTarget.click();
      }
    }

  } catch (e) {
    GeneralJs.ajax({ message: e.message, channel: "#error_log" }, "/sendSlack", function () {});
    console.log(e);
  }
}

ClientJs.prototype.lateLaunching = async function () {
  const instance = this;
  try {
    const { dateToString, returnGet } = GeneralJs;

    GeneralJs.stacks["realtimeClient"] = {
      from: null,
      to: null,
    };

    const timelineMake = async function (mother, size, ea) {
      try {
        const path = "/realtimeClient";
        const { createNode, createNodes, colorChip, cleanChildren, ajaxJson, dateToString } = GeneralJs;
        let tong;
        let from, to;
        let tempArr;
        let tempArr2, tempArr3;
        let color;
        let tongMake;
        let arrowWidth;
        let arrowTop;
        let arrowRight;
        let arrowBoxWidth;
        let hamburgerWidth;
        let hamburgerTop;
        let hamburgerRight;

        cleanChildren(mother);
        GeneralJs.stacks.thisDate = new Date();

        arrowWidth = 10;
        arrowTop = 10;
        arrowRight = 17;
        arrowBoxWidth = 15;

        hamburgerWidth = 11;
        hamburgerTop = 11;
        hamburgerRight = 16;

        mother.style.overflow = "scroll";
        tong = createNode({
          mother,
          id: "toTong",
          style: {
            position: "relative",
            width: String(100) + '%',
          }
        });

        tongMake = async (tong, now) => {
          try {
            const { standard, matrix, caution } = await ajaxJson({ method: "get", date: now, member: instance.mother.member.id }, path);
            cleanChildren(tong);
            for (let i = 0; i < standard.length; i++) {
              tempArr = standard[i].split('~').map((z) => { return z.trim(); });
              tempArr2 = tempArr[0].split(':');
              tempArr3 = tempArr[1].split(':');
              from = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(tempArr2[0]), Number(tempArr2[1]));
              to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(tempArr3[0]), Number(tempArr3[1]));
              if (from.valueOf() <= now.valueOf() && to.valueOf() > now.valueOf()) {
                color = "green";
              } else if (to.valueOf() <= now.valueOf()) {
                color = "gray4";
              } else {
                color = "black";
              }
              blockMake(standard[i], tong, size, color, matrix[i].name, matrix[i].cliid, instance.mother.member.name, "to", i, caution[i], caution);
            }
          } catch (e) {
            console.log(e);
          }
        }

        createNode({
          mother: mother.parentElement.firstChild,
          mode: "svg",
          source: instance.mother.returnHamburger(colorChip.green),
          style: {
            position: "absolute",
            width: String(hamburgerWidth) + ea,
            top: String(hamburgerTop) + ea,
            right: String(arrowRight + hamburgerRight) + ea,
          }
        });
        createNode({
          mother: mother.parentElement.firstChild,
          events: [
            {
              type: "click",
              event: function (e) {
                const toggle = GeneralJs.stacks.notyetBox.getAttribute("toggle");
                if (toggle === "off") {
                  GeneralJs.stacks.notyetBox.style.display = "block";
                  GeneralJs.stacks.notyetBox.setAttribute("toggle", "on");
                } else if (toggle === "on") {
                  GeneralJs.stacks.notyetBox.style.display = "none";
                  GeneralJs.stacks.notyetBox.setAttribute("toggle", "off");
                }
              }
            }
          ],
          style: {
            position: "absolute",
            width: String(arrowBoxWidth) + ea,
            height: String(arrowBoxWidth) + ea,
            top: String(hamburgerTop - ((arrowBoxWidth - arrowWidth) / 2)) + ea,
            right: String(arrowRight + hamburgerRight - ((arrowBoxWidth - arrowWidth) / 2)) + ea,
            cursor: "pointer",
          }
        });
        createNode({
          mother: mother.parentElement.firstChild,
          mode: "svg",
          source: instance.mother.returnArrow("left", colorChip.green),
          style: {
            position: "absolute",
            width: String(arrowWidth) + ea,
            top: String(arrowTop) + ea,
            right: String(arrowRight) + ea,
          }
        });
        createNode({
          mother: mother.parentElement.firstChild,
          events: [
            {
              type: "click",
              event: function (e) {
                GeneralJs.stacks.thisDate.setDate(GeneralJs.stacks.thisDate.getDate() - 1);
                mother.parentElement.firstChild.children[1].firstChild.textContent = dateToString(GeneralJs.stacks.thisDate);
                tongMake(tong, GeneralJs.stacks.thisDate);
              }
            }
          ],
          style: {
            position: "absolute",
            width: String(arrowBoxWidth) + ea,
            height: String(arrowBoxWidth) + ea,
            top: String(arrowTop - ((arrowBoxWidth - arrowWidth) / 2)) + ea,
            right: String(arrowRight - ((arrowBoxWidth - arrowWidth) / 2)) + ea,
            cursor: "pointer",
          }
        });
        createNode({
          mother: mother.parentElement.firstChild,
          mode: "svg",
          source: instance.mother.returnArrow("right", colorChip.green),
          style: {
            position: "absolute",
            width: String(arrowWidth) + ea,
            top: String(arrowTop) + ea,
            right: String(0) + ea,
          }
        });
        createNode({
          mother: mother.parentElement.firstChild,
          events: [
            {
              type: "click",
              event: function (e) {
                GeneralJs.stacks.thisDate.setDate(GeneralJs.stacks.thisDate.getDate() + 1);
                mother.parentElement.firstChild.children[1].firstChild.textContent = dateToString(GeneralJs.stacks.thisDate);
                tongMake(tong, GeneralJs.stacks.thisDate);
              }
            }
          ],
          style: {
            position: "absolute",
            width: String(arrowBoxWidth) + ea,
            height: String(arrowBoxWidth) + ea,
            top: String(arrowTop - ((arrowBoxWidth - arrowWidth) / 2)) + ea,
            right: String(0) + ea,
            cursor: "pointer",
          }
        });

        await tongMake(tong, GeneralJs.stacks.thisDate);

      } catch (e) {
        console.log(e);
      }
    }

    const wssSocket = new WebSocket(OFFICEHOST.replace(/^https/, "wss") + "/client");
    wssSocket.onopen = () => {
      const { dateToString } = GeneralJs;
      instance.wssSocket = wssSocket;
      wssSocket.onmessage = (event) => {
        const update = JSON.parse(event.data);
        const { member, from, to, date, caution } = update;
        if (caution === null) {
          let fromChildren, toChildren;
          let fromTarget, toTarget;
          let idFixMargin, ea;
          ea = "px";
          idFixMargin = 4;
          fromChildren = document.getElementById("fromTong").children;
          toChildren = document.getElementById("toTong").children;
          fromTarget = fromChildren[from.index];
          toTarget = toChildren[to.index];
          fromTarget.setAttribute("manager", to.manager);
          fromTarget.querySelector(".manager").firstChild.textContent = to.manager;
          if (member === instance.mother.member.id && date === dateToString(GeneralJs.stacks.thisDate)) {
            toTarget.setAttribute("client", from.client);
            toTarget.setAttribute("cliid", from.cliid);
            toTarget.querySelector(".client").firstChild.textContent = from.client;
            toTarget.querySelector(".client").querySelector('b').textContent = from.cliid;
            toTarget.querySelector(".client").querySelector('b').style.marginLeft = String(idFixMargin) + ea;
          }
        } else {
          GeneralJs.stacks.realtimeSpec[0].parentElement.firstChild.children[1].textContent = GeneralJs.dateToString(new Date());
          timelineMake(...GeneralJs.stacks.realtimeSpec);
        }
      }
    }

    const blockMake = function (wording, tong, size, color, client, cliid, manager, fromTo, index, caution = null, cautionTotal = []) {
      const { createNode, createNodes, colorChip, withOut, ajaxJson, dateToString } = GeneralJs;
      const textTargets = "textTargets";
      const fromClass = "from";
      const toClass = "to";
      let marginBottom;
      let height;
      let padding;
      let idMargin, idFixMargin;
      let ea;
      let from;
      let cautionBoo;
      let cautionRed;

      cautionBoo = (caution !== null);
      cautionRed = false;
      if (cautionBoo) {
        if (cautionTotal.length === 0) {
          throw new Error("must be caution total");
        }
        cautionRed = cautionTotal.every((i) => { return i === caution });
      }
      from = (fromTo === "from");
      ea = "px";
      marginBottom = 10;
      height = 17;
      padding = 11;
      idMargin = 2;
      idFixMargin = 4;

      createNode({
        mother: tong,
        class: [ "hoverDefault_lite", (from ? fromClass : toClass) ],
        attribute: [
          { client },
          { cliid },
          { manager },
          { index: String(index) },
          { toggle: "off" },
          { caution: cautionBoo ? caution : "null" },
          { red: cautionRed ? "true" : "false" }
        ],
        events: [
          {
            type: "click",
            event: async function (e) {
              try {
                const toggle = this.getAttribute("toggle");
                const client = this.getAttribute("client");
                const cliid = this.getAttribute("cliid");
                const manager = this.getAttribute("manager");
                const index = Number(this.getAttribute("index"));
                const caution = this.getAttribute("caution") === "null" ? null : this.getAttribute("caution");
                const tong = GeneralJs.stacks["realtimeClient"];
                let cautionRed = this.getAttribute("red") === "true";
                let doms, bolds, siblings, opposite;
                let oClient, oCliid, oManager, oIndex;
                let updateContinue;
                let cautionReject;
                let cautionSide;
                siblings = document.querySelectorAll('.' + (from ? fromClass : toClass));
                for (let s of siblings) {
                  if (s !== this) {
                    if (s.getAttribute("toggle") === "on") {
                      doms = s.querySelectorAll('.' + textTargets);
                      bolds = s.querySelectorAll('b');
                      for (let dom of doms) {
                        dom.style.color = dom.getAttribute("color");
                      }
                      for (let bold of bolds) {
                        bold.style.color = bold.parentElement.getAttribute("bold");
                      }
                      s.setAttribute("toggle", "off");
                    }
                  }
                }
                doms = this.querySelectorAll('.' + textTargets);
                bolds = this.querySelectorAll('b');
                if (toggle === "off") {
                  for (let dom of doms) {
                    dom.style.color = colorChip.purple;
                  }
                  for (let bold of bolds) {
                    bold.style.color = colorChip.purple;
                  }
                  tong[(from ? fromClass : toClass)] = this;
                  if (tong[(!from ? fromClass : toClass)] !== null) {
                    opposite = tong[(!from ? fromClass : toClass)];
                    oClient = opposite.getAttribute("client");
                    oCliid = opposite.getAttribute("cliid");
                    oManager = opposite.getAttribute("manager");
                    oIndex = Number(opposite.getAttribute("index"));
                    oCaution = opposite.getAttribute("caution") === "null" ? null : opposite.getAttribute("caution");
                    if (!cautionRed) {
                      cautionRed = opposite.getAttribute("red") === "true";
                    }

                    updateContinue = false;
                    cautionReject = false;
                    cautionSide = null;
                    if (caution === null && oCaution === null) {
                      updateContinue = true;
                    } else {
                      if (!cautionRed) {
                        if (cliid === caution || oCliid === caution || cliid === oCaution || oCliid === oCaution) {
                          cautionRed = true;
                        }
                      }
                      if (cautionRed) {
                        if (caution === null) {
                          if (oCaution === cliid) {
                            updateContinue = true;
                          } else {
                            cautionReject = "opposite";
                          }
                        } else {
                          if (caution === oCliid) {
                            updateContinue = true;
                          } else {
                            cautionReject = "this";
                          }
                        }
                        cautionSide = cautionReject === "opposite" ? "from" : "to";
                      } else {
                        updateContinue = true;
                        cautionReject = false;
                        cautionSide = null;
                      }
                    }

                    if (updateContinue) {
                      if (from) {
                        opposite.setAttribute("client", client);
                        opposite.setAttribute("cliid", cliid);
                        this.setAttribute("manager", oManager);
                        opposite.querySelector(".client").firstChild.textContent = client;
                        opposite.querySelector(".client").querySelector('b').textContent = cliid;
                        opposite.querySelector(".client").querySelector('b').style.marginLeft = String(idFixMargin) + ea;
                        this.querySelector(".manager").firstChild.textContent = oManager;
                        opposite.querySelector(".manager").firstChild.textContent = oManager;
                        await ajaxJson({ method: "client", id: cliid, column: "manager", value: oManager, email: instance.mother.member.email[0] }, "/updateHistory");
                        await ajaxJson({ method: "update", date: GeneralJs.stacks.thisDate, update: {
                          member: instance.mother.member.id,
                          cliid: cliid,
                          index: oIndex,
                        } }, "/realtimeClient");
                      } else {
                        this.setAttribute("client", oClient);
                        this.setAttribute("cliid", oCliid);
                        opposite.setAttribute("manager", manager);
                        this.querySelector(".client").firstChild.textContent = oClient;
                        this.querySelector(".client").querySelector('b').textContent = oCliid;
                        this.querySelector(".client").querySelector('b').style.marginLeft = String(idFixMargin) + ea;
                        opposite.querySelector(".manager").firstChild.textContent = manager;
                        this.querySelector(".manager").firstChild.textContent = manager;
                        await ajaxJson({ method: "client", id: oCliid, column: "manager", value: manager, email: instance.mother.member.email[0] }, "/updateHistory");
                        await ajaxJson({ method: "update", date: GeneralJs.stacks.thisDate, update: {
                          member: instance.mother.member.id,
                          cliid: oCliid,
                          index: index,
                        } }, "/realtimeClient");
                      }
                      instance.wssSocket.send(JSON.stringify({
                        member: instance.mother.member.id,
                        date: dateToString(GeneralJs.stacks.thisDate),
                        from: { client: from ? client : oClient, cliid: from ? cliid : oCliid, manager: from ? oManager : manager, index: from ? index : oIndex },
                        to: { client: from ? client : oClient, cliid: from ? cliid : oCliid, manager: from ? oManager : manager, index: from ? oIndex : index },
                        caution: cautionSide === null ? null : cautionSide,
                      }));
                    }

                    if (cautionReject === false) {

                      for (let dom of doms) {
                        dom.style.color = dom.getAttribute("color");
                      }
                      for (let bold of bolds) {
                        bold.style.color = bold.parentElement.getAttribute("bold");
                      }
                      tong[(from ? fromClass : toClass)] = null;
                      this.setAttribute("toggle", "off");

                      doms = opposite.querySelectorAll('.' + textTargets);
                      bolds = opposite.querySelectorAll('b');
                      for (let dom of doms) {
                        dom.style.color = dom.getAttribute("color");
                      }
                      for (let bold of bolds) {
                        bold.style.color = bold.parentElement.getAttribute("bold");
                      }
                      tong[(!from ? fromClass : toClass)] = null;
                      opposite.setAttribute("toggle", "off");

                    } else if (cautionReject === "opposite") {

                      for (let dom of doms) {
                        dom.style.color = dom.getAttribute("color");
                      }
                      for (let bold of bolds) {
                        bold.style.color = bold.parentElement.getAttribute("bold");
                      }
                      tong[(from ? fromClass : toClass)] = null;
                      this.setAttribute("toggle", "off");

                      doms = opposite.querySelectorAll('.' + textTargets);
                      bolds = opposite.querySelectorAll('b');
                      for (let dom of doms) {
                        dom.style.color = colorChip.red;
                      }
                      for (let bold of bolds) {
                        bold.style.color = colorChip.red;
                      }
                      tong[(!from ? fromClass : toClass)] = null;
                      opposite.setAttribute("toggle", "off");

                    } else {

                      for (let dom of doms) {
                        dom.style.color = colorChip.red;
                      }
                      for (let bold of bolds) {
                        bold.style.color = colorChip.red;
                      }
                      tong[(from ? fromClass : toClass)] = null;
                      this.setAttribute("toggle", "off");

                      doms = opposite.querySelectorAll('.' + textTargets);
                      bolds = opposite.querySelectorAll('b');
                      for (let dom of doms) {
                        dom.style.color = dom.getAttribute("color");
                      }
                      for (let bold of bolds) {
                        bold.style.color = bold.parentElement.getAttribute("bold");
                      }
                      tong[(!from ? fromClass : toClass)] = null;
                      opposite.setAttribute("toggle", "off");

                    }

                  } else {
                    this.setAttribute("toggle", "on");
                  }
                } else {
                  for (let dom of doms) {
                    dom.style.color = dom.getAttribute("color");
                  }
                  for (let bold of bolds) {
                    bold.style.color = bold.parentElement.getAttribute("bold");
                  }
                  tong[(from ? fromClass : toClass)] = null;
                  this.setAttribute("toggle", "off");
                }
              } catch (e) {
                console.log(e);
              }
            }
          }
        ],
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          marginBottom: String(marginBottom) + ea,
          height: String(height) + ea,
          textAlign: "right",
        },
        children: [
          {
            style: {
              position: "absolute",
              width: String(98) + '%',
              left: String(1) + '%',
              top: String(height * 0.48) + ea,
              borderBottom: "1px solid " + colorChip.gray2,
            }
          },
          {
            text: wording,
            class: [ textTargets ],
            attribute: [
              { color: colorChip[color] }
            ],
            style: {
              position: "absolute",
              left: String(0),
              top: String(0),
              fontSize: String(size) + ea,
              fontWeight: String(300),
              color: cautionRed ? colorChip.red : colorChip[color],
              paddingRight: String(padding) + ea,
              background: colorChip.white,
            }
          },
          {
            text: `${client} <b%${cliid}%b>`,
            class: [ textTargets, "client" ],
            attribute: [
              { color: colorChip[color] },
              { bold: colorChip.gray5 },
            ],
            style: {
              display: "inline-block",
              position: "relative",
              right: String(0),
              top: String(0),
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: cautionRed ? colorChip.red : colorChip[color],
              paddingLeft: String(padding) + ea,
              background: colorChip.white,
            },
            bold: {
              fontWeight: String(300),
              color: cautionRed ? colorChip.red : colorChip["gray5"],
              marginLeft: String(idMargin) + ea,
              fontSize: String(size - 3) + ea,
            }
          },
          {
            text: "|",
            class: [ textTargets ],
            attribute: [
              { color: colorChip.gray4 }
            ],
            style: {
              display: "inline-block",
              position: "relative",
              right: String(0),
              top: String(0),
              fontSize: String(size) + ea,
              fontWeight: String(200),
              color: cautionRed ? colorChip.red : colorChip.gray4,
              paddingLeft: String(padding) + ea,
              background: colorChip.white,
            },
          },
          {
            text: cautionRed ? "미정" : manager,
            class: [ textTargets, "manager" ],
            attribute: [
              { color: colorChip[color] }
            ],
            style: {
              display: "inline-block",
              position: "relative",
              right: String(0),
              top: String(0),
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: cautionRed ? colorChip.red : colorChip[color],
              paddingLeft: String(padding) + ea,
              background: colorChip.white,
            },
          },
        ]
      });
    }

    /*

    instance.dashboardBox({
      name: "realtime",
      style: { height: window.innerHeight - 388 - 83, right: 20, bottom: 388 },
      title: {
        main: "응대 예정",
        sub: dateToString(new Date()),
      },
      callback: async (mother, size, ea) => {
        try {
          if (!((await GeneralJs.ajaxJson({ method: "manager" }, "/realtimeClient")).includes(instance.mother.member.id))) {
            mother.parentElement.parentElement.style.display = "none";
          }
          GeneralJs.stacks.realtimeSpec = [ mother, size, ea ];
          await timelineMake(mother, size, ea);
        } catch (e) {
          console.log(e);
        }
      },
    });

    instance.dashboardBox({
      name: "notyet",
      style: { height: window.innerHeight - 158 - 83, right: 372, bottom: 158 },
      title: {
        main: "응대 필요",
        sub: "5"
      },
      callback: async (mother, size, ea) => {
        try {
          const path = "/realtimeClient";
          const { createNode, colorChip, cleanChildren, ajaxJson, stringToDate } = GeneralJs;
          let tong, cases;
          let cliidArr, historyObj;
          let num;

          GeneralJs.stacks.notyetBox = mother.parentElement.parentElement;
          GeneralJs.stacks.notyetBox.setAttribute("toggle", "off");
          GeneralJs.stacks.notyetBox.style.display = "none";
          mother.style.overflow = "scroll";
          tong = createNode({
            mother,
            id: "fromTong",
            style: {
              position: "relative",
              width: String(100) + '%',
            }
          });

          cases = JSON.parse(JSON.stringify(instance.cases));
          cases = cases.filter((i) => { return i !== null });
          cases = cases.filter((i) => { return i.status === "응대중" });

          cliidArr = cases.map((i) => { return i.cliid });
          historyObj = await ajaxJson({ method: "client", idArr: cliidArr }, "/getHistoryTotal");
          cases = cases.map((obj) => {
            obj.manager = ((historyObj[obj.cliid].manager === '' || historyObj[obj.cliid].manager === '-') ? "미정" : historyObj[obj.cliid].manager);
            obj.timelineValue = stringToDate(obj.timeline).valueOf();
            obj.timeline = obj.timeline.split(' ')[0];
            return obj;
          });

          cases.sort((a, b) => { return b.timelineValue - a.timelineValue; });

          num = 0;
          for (let { name, cliid, timeline, manager } of cases) {
            blockMake(timeline, tong, size, "black", name, cliid, manager, "from", num);
            num++;
          }

          mother.parentElement.firstChild.lastChild.textContent = String(cases.length);

        } catch (e) {
          console.log(e);
        }
      },
    });

    */

  } catch (e) {
    console.log(e);
  }
}
