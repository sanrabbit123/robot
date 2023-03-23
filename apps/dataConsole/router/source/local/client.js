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

  if ([ ...div_clone.children ].length < 15) {
    div_clone.style.height = String(window.innerHeight) + ea;
  } else {
    div_clone.style.height = "";
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
      if (this.cardViewInitial) {
        totalMother.style.display = "none";
      } else {
        totalMother.style.display = "block";
      }
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
    GeneralJs.ajax({ message: "Client front 문제 생김 (spreadData) : " + JSON.stringify(e.message), channel: "#error_log" }, "/sendSlack", () => {
      console.log(e);
    });
  }
}

ClientJs.prototype.boardGrayBar = function (divisionMap, cases, staticList) {
  if (!Array.isArray(divisionMap) || !Array.isArray(cases)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, colorChip, withOut, equalJson, isMac, ajaxJson, findByAttribute, uniqueValue, cleanChildren, setQueue } = GeneralJs;
  const { ea, token, actionClass, statusClass, actionArea } = staticList;
  const clientMap = DataPatch.clientMap();
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const dashboardTarget = {
    status: {
      items: clientMap.status.items,
      zero: false,
      divisionStart: null,
      divisionLength: null,
    },
    action: {
      items: clientMap.action.items,
      zero: true,
      divisionStart: clientMap.action.divisionStart,
      divisionLength: clientMap.action.divisionLength,
    },
  };
  const totalFather = this.totalFather;
  const mother = totalFather.children[0];
  this.statusColorSync = (status, standardDom, caseDoms) => {
    const colorMap = [
      { status: "응대중", color: colorChip.black },
      { status: "장기", color: colorChip.darkRed },
      { status: "드랍", color: colorChip.gray4 },
      { status: "진행", color: colorChip.green },
    ]
    let finalColor, targets;
    finalColor = colorMap.find((obj) => { return obj.status === status }).color;
    targets = [ ...standardDom.children ];
    targets = targets.concat(caseDoms);
    for (let dom of targets) {
      dom.style.color = finalColor;
    }
  }
  this.statusNumberSync = (from, to) => {
    const numberTargets = [ ...document.querySelectorAll('.' + statusClass) ];
    const fromDom = findByAttribute(numberTargets, "status", from);
    const toDom = findByAttribute(numberTargets, "status", to);
    const fromNumber = Number(fromDom.textContent.replace(/[^0-9]/gi, ''));
    const toNumber = Number(toDom.textContent.replace(/[^0-9]/gi, ''));
    if (from === "응대중") {
      if (to === "응대중") {
        //pass
      } else if (to === "장기") {
        fromDom.textContent = String(fromNumber - 1);
        toDom.textContent = String(toNumber + 1);
      } else if (to === "드랍") {
        fromDom.textContent = String(fromNumber - 1);
      } else if (to === "진행") {
        window.alert("진행일 경우 proposal 콘솔을 이용해주세요!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/proposal";
      }
    } else if (from === "장기") {
      if (to === "응대중") {
        fromDom.textContent = String(fromNumber - 1);
        toDom.textContent = String(toNumber + 1);
      } else if (to === "장기") {
        //pass
      } else if (to === "드랍") {
        fromDom.textContent = String(fromNumber - 1);
      } else {
        window.alert("진행일 경우 proposal 콘솔을 이용해주세요!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/proposal";
      }
    } else if (from === "진행") {
      if (to === "응대중" || to === "장기") {
        fromDom.textContent = String(fromNumber - 1);
        toDom.textContent = String(toNumber + 1);
      } else if (to === "진행") {
        window.alert("진행일 경우 proposal 콘솔을 이용해주세요!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/proposal";
      } else if (to === "드랍") {
        fromDom.textContent = String(fromNumber - 1);
      }
    }
    return to !== "드랍";
  }
  let dashboardData;
  let boardBox;
  let topMargin, leftMargin;
  let statusBlock, actionBlock;
  let fontSize;
  let marginBottom;
  let statusPaddingBottom;
  let actionPaddingTop;
  let middleBetween;
  let memberBlock;
  let members;
  let cxMembers;
  let memberMargin;
  let memberMarginLeft;
  let memberBetween;
  let memberSize;
  let memberVisual;
  let statusSize;
  let statusPaddingTop;
  let grayBarTop;
  let reloadEvent;
  let dropEvent;

  cleanChildren(mother);

  dashboardData = {};
  for (let i in dashboardTarget) {
    dashboardData[i] = {
      name: dashboardTarget[i].items,
      value: [],
      length: dashboardTarget[i].items.length,
      divisionStart: dashboardTarget[i].divisionStart,
      divisionLength: dashboardTarget[i].divisionLength,
    };
    dashboardData[i].value = (new Array(dashboardData[i].length)).fill(0);
    for (let j = 0; j < dashboardTarget[i].items.length; j++) {
      for (let c of cases) {
        if (c[i].trim() === dashboardTarget[i].items[j]) {
          dashboardData[i].value[j] = dashboardData[i].value[j] + 1;
        }
      }
    }
    if (!dashboardTarget[i].zero) {
      dashboardData[i].name = dashboardData[i].name.filter((z, index) => { return dashboardData[i].value[index] !== 0 });
      dashboardData[i].value = dashboardData[i].value.filter((z) => { return z !== 0 });
    }
  }

  dashboardData.status.name.push("드랍");
  dashboardData.status.value.push("-");

  topMargin = 32.5;
  leftMargin = 30;
  statusSize = 16;
  fontSize = 13;
  marginBottom = 7;
  statusPaddingBottom = 18;
  actionPaddingTop = 31;
  middleBetween = 18;
  memberMargin = 16;
  memberMarginLeft = 8;
  memberBetween = 8;
  memberSize = 13;
  memberVisual = 1;
  statusPaddingTop = 2;
  grayBarTop = 4;

  members = this.allMembers;
  cxMembers = members.filter((obj) => { return obj.roles.includes("CX") || obj.roles.includes("CEO"); });
  cxMembers = cxMembers.map((obj) => { return obj.name; });
  cxMembers.push("전체");
  cxMembers.push("미정");

  boardBox = createNode({
    mother,
    style: {
      marginTop: String(topMargin) + ea,
      marginLeft: String(leftMargin) + ea,
      width: withOut(leftMargin * 2, ea),
      position: "relative",
      height: withOut(topMargin, ea),
    }
  });

  statusBlock = createNode({
    mother: boardBox,
    style: {
      display: "block",
      position: "relative",
      paddingBottom: String(statusPaddingBottom) + ea,
      borderBottom: "1px solid " + colorChip.gray4,
      paddingTop: String(statusPaddingTop) + ea,
    }
  });

  actionBlock = createNode({
    mother: boardBox,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(actionPaddingTop) + ea,
    }
  });

  for (let i = 0; i < dashboardData.status.name.length; i++) {
    createNode({
      mother: statusBlock,
      attribute: {
        name: dashboardData.status.name[i],
        column: "status",
      },
      event: {
        dragenter: (e) => { e.preventDefault(); },
        dragleave: function (e) {
          e.preventDefault();
          this.firstChild.style.color = colorChip.black;
        },
        dragover: function (e) {
          e.preventDefault();
          this.firstChild.style.color = colorChip.green;
        },
        drop: async function (e) {
          e.preventDefault();
          const name = this.getAttribute("name");
          const column = this.getAttribute("column");
          const cliid = e.dataTransfer.getData("dragData").split(token)[0];
          const fromAction = e.dataTransfer.getData("dragData").split(token)[1];
          const requestNumber = Number(e.dataTransfer.getData("dragData").split(token)[2]);
          const fromStatus = e.dataTransfer.getData("dragData").split(token)[3];
          const card = findByAttribute(instance.totalFatherChildren, [ "cliid", "request" ], [ cliid, String(requestNumber) ]);
          const boardDoms = [ ...document.querySelectorAll("." + actionClass) ];
          const areaDoms = [ ...document.querySelectorAll("." + actionArea) ];
          instance.randomToken = uniqueValue();
          try {
            let indexTong;
            let index, thisCase;
            let rowDom;
            let thisStandardDom;
            let thisCaseDom;
            let length;

            indexTong = [];
            for (let i = 0; i < instance.cases.length; i++) {
              if (instance.cases[i] !== null) {
                if (instance.cases[i].cliid === cliid) {
                  indexTong.push({ index: i, thisCase: equalJson(JSON.stringify(instance.cases[i])) });
                }
              }
            }

            index = indexTong[requestNumber].index;
            thisCase = indexTong[requestNumber].thisCase;
            instance.cases[index].status = name;
            thisStandardDom = Array.from(instance.standardDoms).find((dom) => { return dom.firstChild.textContent.trim() === cliid; });
            thisCaseDom = [ ...document.querySelector("." + cliid).children ];
            rowDom = findByAttribute(thisCaseDom, "column", "status");
            if (rowDom !== null) {
              rowDom.textContent = name;
            }
            card.setAttribute("status", name);

            instance.statusColorSync(name, thisStandardDom, thisCaseDom);
            if (!instance.statusNumberSync(fromStatus, name)) {
              length = card.parentElement.children.length;
              card.remove();
              length = length - 1;
              findByAttribute(boardDoms, "action", fromAction).textContent = String(length);
              findByAttribute(areaDoms, "action", fromAction).parentElement.children[1].textContent = String(length) + "명";
              setQueue(() => {
                GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?cliid=" + cliid + "&view=row");
              });
            }

            await ajaxJson({
              thisId: cliid,
              requestIndex: String(requestNumber),
              column: "status",
              pastValue: name,
              value: name,
              index,
              thisCase,
              user: cookies.homeliaisonConsoleLoginedName + token + cookies.homeliaisonConsoleLoginedEmail
            }, "/updateClient");

            await ajaxJson({
              mode: "sse",
              db: "console",
              collection: "sse_clientCard",
              log: true,
              who: cookies.homeliaisonConsoleLoginedEmail,
              updateQuery: {
                cliid,
                requestNumber,
                mode: "status",
                from: fromStatus,
                to: name,
                randomToken: instance.randomToken,
              }
            }, "/generalMongo");

            this.firstChild.style.color = colorChip.black;

          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        position: "relative",
        textAlign: "left",
        marginBottom: String(marginBottom) + ea,
      },
      children: [
        {
          text: dashboardData.status.name[i],
          style: {
            position: "relative",
            fontSize: String(statusSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
          }
        },
        {
          class: [ statusClass ],
          attribute: {
            status: dashboardData.status.name[i],
          },
          text: String(dashboardData.status.value[i]),
          style: {
            position: "absolute",
            right: String(0),
            top: String(0),
            fontSize: String(statusSize) + ea,
            color: colorChip.green,
            fontWeight: String(400),
          }
        },
      ]
    });
  }

  for (let i = 0; i < dashboardData.action.name.length; i++) {
    createNode({
      mother: actionBlock,
      style: {
        position: "relative",
        textAlign: "left",
        marginBottom: String(i % dashboardData.action.divisionLength === dashboardData.action.divisionStart - 1 ? middleBetween : marginBottom) + ea,
      },
      children: [
        {
          text: dashboardData.action.name[i],
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
          }
        },
        {
          class: [ actionClass ],
          attribute: {
            action: dashboardData.action.name[i],
          },
          text: String(dashboardData.action.value[i]),
          style: {
            position: "absolute",
            right: String(0),
            top: String(0),
            fontSize: String(fontSize) + ea,
            color: colorChip.green,
            fontWeight: String(400),
          }
        },
      ]
    });
  }

  memberBlock = createNode({
    mother: boardBox,
    style: {
      position: "absolute",
      left: String(0) + ea,
      bottom: String(topMargin) + ea,
      width: withOut(memberMarginLeft * 2, ea),
      paddingTop: String(memberMargin) + ea,
      paddingBottom: String(memberMargin) + ea,
      paddingLeft: String(memberMarginLeft) + ea,
      paddingRight: String(memberMarginLeft) + ea,
      borderRadius: String(3) + "px",
      background: colorChip.white,
    }
  });
  reloadEvent = function (e) {
    const member = this.getAttribute("member");
    if (member === "전체") {
      instance.selectedMember = null;
      instance.makeBoard(instance.cardCases);
    } else if (member === "미정") {
      instance.selectedMember = "미정";
      instance.makeBoard(instance.cardCases.filter((obj) => { return obj.manager.trim() === '-' || obj.manager.trim() === '' || obj.manager.trim() === "미지정" || obj.manager.trim() === "미정" || obj.manager.trim() === "홀딩"; }));
    } else {
      instance.selectedMember = member;
      instance.makeBoard(instance.cardCases.filter((obj) => { return obj.manager.trim() === member.trim() }));
    }
  }
  dropEvent = async function (e) {
    try {
      e.preventDefault();
      const member = this.getAttribute("member");
      const cliid = e.dataTransfer.getData("dragData").split(token)[0];
      if (member !== "전체") {
        for (let obj of instance.cardCases) {
          if (obj.cliid === cliid) {
            obj.manager = (member === "미정" ? '-' : member);
          }
        }
        for (let obj of instance.cases) {
          if (obj !== null) {
            if (obj.cliid === cliid) {
              obj.manager = (member === "미정" ? '-' : member);
            }
          }
        }
        await ajaxJson({
          id: cliid,
          column: "manager",
          value: (member === "미정" ? '-' : member),
          email: cookies.homeliaisonConsoleLoginedEmail
        }, "/updateClientHistory");
        await instance.mother.greenAlert("담당자가 " + member + "(으)로 설정되었습니다!");
      }
      this.parentElement.parentElement.style.background = colorChip.white;
    } catch (e) {
      console.log(e);
    }
  }
  for (let i = 0; i < Math.ceil(cxMembers.length / 2); i++) {
    createNode({
      mother: memberBlock,
      style: {
        position: "relative",
        display: "block",
        marginBottom: String(Math.ceil(cxMembers.length / 2) - 1 !== i ? memberBetween : (isMac() ? memberVisual : 0)) + ea,
      },
      children: [
        {
          text: cxMembers[(i * 2)],
          class: [ "hoverDefault_lite" ],
          attribute: {
            member: cxMembers[(i * 2)],
          },
          event: {
            selectstart: (e) => { e.preventDefault(); },
            dragenter: (e) => { e.preventDefault(); },
            dragleave: function (e) {
              e.preventDefault();
              this.parentElement.parentElement.style.background = colorChip.white;
            },
            dragover: function (e) {
              e.preventDefault();
              this.parentElement.parentElement.style.background = colorChip.whiteGreen;
            },
            click: reloadEvent,
            drop: dropEvent,
          },
          style: {
            position: "relative",
            display: "inline-block",
            width: withOut(50, 1, ea),
            fontSize: String(memberSize) + ea,
            fontWeight: String(500),
            color: instance.selectedMember === cxMembers[(i * 2)] ? colorChip.green : colorChip.black,
            textAlign: "center",
          },
          children: [
            {
              style: {
                position: "absolute",
                height: withOut(grayBarTop, ea),
                top: String(grayBarTop) + ea,
                right: String(0) + ea,
                borderRight: "1px solid " + colorChip.gray3,
              }
            }
          ]
        },
        {
          text: cxMembers[(i * 2) + 1],
          class: [ "hoverDefault_lite" ],
          attribute: {
            member: cxMembers[(i * 2) + 1],
          },
          event: {
            selectstart: (e) => { e.preventDefault(); },
            dragenter: (e) => { e.preventDefault(); },
            dragleave: function (e) {
              e.preventDefault();
              this.parentElement.parentElement.style.background = colorChip.white;
            },
            dragover: function (e) {
              e.preventDefault();
              this.parentElement.parentElement.style.background = colorChip.whiteGreen;
            },
            selectstart: (e) => { e.preventDefault(); },
            click: reloadEvent,
            drop: dropEvent,
          },
          style: {
            position: "relative",
            display: "inline-block",
            width: withOut(50, 0, ea),
            fontSize: String(memberSize) + ea,
            fontWeight: String(500),
            color: instance.selectedMember === cxMembers[(i * 2) + 1] ? colorChip.green : colorChip.black,
            textAlign: "center",
          }
        }
      ]
    });
  }
}

ClientJs.prototype.boardSwipe = function () {
  const instance = this;
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (instance.whiteBox === null || instance.whiteBox === undefined) {
        if (instance.totalFather !== null && instance.totalFather !== undefined) {
          e.preventDefault();
          window.location.href = window.location.protocol + "//" + window.location.host + "/project";
        }
      }
    }
  });
}

ClientJs.prototype.makeBoard = function (cases) {
  if (!Array.isArray(cases)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, colorChip, withOut, equalJson, isMac, findByAttribute, ajaxJson, uniqueValue, cleanChildren, setQueue } = GeneralJs;
  const staticList = {
    ea: "px",
    token: "__split__",
    actionClass: "boardGray_actionBlock",
    statusClass: "boardGray_statusBlock",
    actionArea: "mainArea_actionArea",
  };
  const { ea, token, actionClass, statusClass, actionArea } = staticList;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const map = DataPatch.clientMap();
  const totalFather = this.totalFather;
  const scrollTong = totalFather.children[1].children[0];
  let temp;
  let tong;
  let size, margin;
  let num, num2;
  let cardWidthConstant;
  let intend;
  let lineHeight, titleTop, startTop;
  let divideNumber;
  let fontSize, nameFontSize;
  let fixedHeightSize;
  let division;
  let numbers;
  let outerMargin;
  let whiteCard;
  let nameWord, idWord;
  let between;
  let tongMother;
  let pastHeight;
  let domMatrix, tempArr;
  let tongMarginTop;
  let tongPaddingTop;
  let tongPaddingBottom;
  let tongPaddingRight;
  let tongPaddingLeft;
  let tongMargin;
  let totalTitleSize, totalTitleTop, totalTitleLeft;
  let divideArr, sizeArr;
  let totalStandard;
  let numberTitleSize, numberTitleTop, numberTitleBetween;
  let tongTitle, tongNumber, tongArea;
  let idWordTop;
  let requestTong;
  let thisRequestNumber;
  let divisionEntireMap, divisionMap;
  let index;
  let contextMenuBlockWidth, contextMenuBlockHeight, contextMenuBlockMargin, contextMenuBlockBetween, contextMenuBlockSize, contextMenuBlockTextTop;
  let contextMenuEvent;
  let thirdClassIndexArr;
  let thirdTitleSize;
  let thirdTitleWeight;
  let thirdTitleMarginTop;
  let thirdTitleIndent;
  let thirdTitleTextTop;
  let thirdTitleMarginBottomVisual;
  let thirdTitleDom;
  let thirdTitlePastDom;
  let thirdMatrixDom, thirdMatrixDomTemp;
  let swipeStatus;

  cleanChildren(scrollTong);

  margin = 10;
  outerMargin = margin * 2;

  cardWidthConstant = 140;
  fixedHeightSize = 40;
  intend = 16;
  titleTop = isMac() ? 9 : 11;
  idWordTop = isMac() ? 13 : 14;
  startTop = titleTop + 16;
  fontSize = 11;
  nameFontSize = fontSize + 3;

  between = 8;
  tongMarginTop = margin * 1.6;
  tongPaddingTop = (margin * 1.5) + 35;
  tongPaddingBottom = 0;
  tongPaddingRight = 0;
  tongMargin = margin * 1.5;

  totalTitleSize = 17;
  totalTitleTop = isMac() ? 14 : 17;
  totalTitleLeft = 20;

  numberTitleSize = 14;
  numberTitleTop = isMac() ? 18 : 20;
  numberTitleBetween = 9;

  contextMenuBlockWidth = 100;
  contextMenuBlockHeight = 34;
  contextMenuBlockBetween = 8;
  contextMenuBlockMargin = 5;
  contextMenuBlockSize = 14;
  contextMenuBlockTextTop = isMac() ? 7 : 9;

  thirdTitleSize = 26;
  thirdTitleWeight = 600;
  thirdTitleMarginTop = 42;
  thirdTitleIndent = 8;
  thirdTitleTextTop = isMac() ? 6 : 8;
  thirdTitleMarginBottomVisual = 0;

  divisionEntireMap = map.action.itemMap;
  divisionMap = [];
  thirdClassIndexArr = [];
  for (let arr of divisionEntireMap) {
    thirdClassIndexArr.push([ divisionMap.length, arr[0] ]);
    divisionMap = divisionMap.concat(arr[1]);
  }

  divideArr = [];
  sizeArr = [];
  for (let i = 0; i < 5; i++) {
    totalStandard = (window.innerWidth - this.grayBarWidth - (outerMargin * 2) - (margin * 2) - 2 - (tongPaddingRight * 2) - (((tongPaddingRight * 2) + tongMargin + 2) * i)) / (i + 1);
    divideNumber = Math.floor(totalStandard / (margin + cardWidthConstant));
    size = (totalStandard - (margin * (divideNumber + 1))) / divideNumber;
    divideArr.push(divideNumber);
    sizeArr.push(size);
  }

  instance.boardGrayBar(divisionMap, cases, staticList);

  division = new Map();
  numbers = new Map();
  domMatrix = [];
  for (let i = 0; i < divisionMap.length; i++) {
    tempArr = [];

    tongMother = createNode({
      mother: scrollTong,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        marginTop: String(tongMarginTop) + ea,
        verticalAlign: "top",
      }
    });

    for (let j = 0; j < divisionMap[i].length; j++) {
      tong = createNode({
        mother: tongMother,
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(100% - " + String(tongMargin * (divisionMap[i].length - 1)) + ea + ") / " + String(divisionMap[i].length) + ")",
          marginRight: (j === divisionMap[i].length - 1 ? String(0) + ea : String(tongMargin) + ea),
          paddingTop: String(tongPaddingTop) + ea,
          paddingBottom: String(tongPaddingBottom) + ea,
          paddingRight: String(tongPaddingRight) + ea,
          paddingLeft: String(tongPaddingRight) + ea,
          border: "1px dashed " + GeneralJs.colorChip.gray4,
          boxSizing: "border-box",
          borderRadius: String(5) + "px",
          verticalAlign: "top",
        }
      });

      tongTitle = createNode({
        mother: tong,
        text: divisionMap[i][j],
        style: {
          position: "absolute",
          top: String(totalTitleTop) + ea,
          left: String(totalTitleLeft) + ea,
          fontSize: String(totalTitleSize) + ea,
          fontWeight: String(600),
          color: GeneralJs.colorChip.black,
        }
      });

      tongNumber = createNode({
        mother: tong,
        text: String(0) + "명",
        attribute: {
          kinds: "number",
        },
        style: {
          position: "absolute",
          top: String(numberTitleTop) + ea,
          left: String(totalTitleLeft + tongTitle.getBoundingClientRect().width + numberTitleBetween) + ea,
          fontSize: String(numberTitleSize) + ea,
          fontWeight: String(500),
          color: GeneralJs.colorChip.gray5,
        }
      });

      tongArea = createNode({
        mother: tong,
        class: [ actionArea ],
        attribute: {
          kinds: "area",
          name: divisionMap[i][j],
          action: divisionMap[i][j],
          opposite: divisionMap[i][divisionMap[i].length - 1 - j],
          family: JSON.stringify(divisionMap[i]),
          length: String(divisionMap[i].length),
          size: String(sizeArr[divisionMap[i].length - 1]),
          divide: String(divideArr[divisionMap[i].length - 1]),
        },
        events: {
          dragenter: (e) => { e.preventDefault(); },
          dragleave: function (e) {
            e.preventDefault();
            this.style.background = colorChip.gray1;
            this.parentElement.firstChild.style.color = colorChip.black;
          },
          dragover: function (e) {
            e.preventDefault();
            this.style.background = colorChip.whiteGreen;
            this.parentElement.firstChild.style.color = colorChip.green;
          },
          drop: async function (e) {
            e.preventDefault();
            e.stopPropagation();
            const name = this.getAttribute("name");
            const opposite = division.get(this.getAttribute("opposite"));
            const oppositeName = opposite.getAttribute("name");
            const length = Number(this.getAttribute("length"));
            const size = Number(this.getAttribute("size"));
            const divide = Number(this.getAttribute("divide"));
            const oppositeDivide = Number(opposite.getAttribute("divide"));
            const cliid = e.dataTransfer.getData("dragData").split(token)[0];
            const fromAction = e.dataTransfer.getData("dragData").split(token)[1];
            const requestNumber = Number(e.dataTransfer.getData("dragData").split(token)[2]);
            const card = findByAttribute(instance.totalFatherChildren, [ "cliid", "request" ], [ cliid, String(requestNumber) ]);
            const from = division.get(fromAction);
            const fromSize = Number(from.getAttribute("size"));
            const fromName = from.getAttribute("name");
            const fromOpposite = division.get(from.getAttribute("opposite"));
            const fromOppositeName = fromOpposite.getAttribute("name");
            const fromDivide = Number(from.getAttribute("divide"));
            const fromOppositeDivide = Number(fromOpposite.getAttribute("divide"));
            const boardDoms = [ ...document.querySelectorAll("." + actionClass) ];
            instance.randomToken = uniqueValue();
            try {
              let thisChildren, oppositeChildren;
              let thisChildrenLength, oppositeChildrenLength;
              let thisHeightNumber, oppositeHeightNumber;
              let thisHeight, oppositeHeight;
              let finalHeight;
              let index, thisCase;
              let indexTong;
              let rowDom;

              this.style.background = colorChip.gray1;
              this.parentElement.firstChild.style.color = colorChip.black;
              this.appendChild(card);

              thisChildren = this.children;
              oppositeChildren = opposite.children;
              thisChildrenLength = thisChildren.length;
              oppositeChildrenLength = oppositeChildren.length;
              thisHeightNumber = Math.ceil(thisChildrenLength / divide);
              oppositeHeightNumber = Math.ceil(oppositeChildrenLength / oppositeDivide);
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
              for (let c of thisChildren) {
                c.style.width = String(size) + ea;
              }
              this.parentElement.style.height = String(finalHeight) + ea;
              opposite.parentElement.style.height = String(finalHeight) + ea;
              this.parentElement.children[1].setAttribute("number", String(thisChildren.length));
              this.parentElement.children[1].textContent = String(thisChildren.length) + "명";
              findByAttribute(boardDoms, "action", name).textContent = String(thisChildren.length);
              opposite.parentElement.children[1].setAttribute("number", String(oppositeChildren.length));
              opposite.parentElement.children[1].textContent = String(oppositeChildren.length) + "명";
              findByAttribute(boardDoms, "action", oppositeName).textContent = String(oppositeChildren.length);


              thisChildren = from.children;
              oppositeChildren = fromOpposite.children;
              thisChildrenLength = thisChildren.length;
              oppositeChildrenLength = oppositeChildren.length;
              thisHeightNumber = Math.ceil(thisChildrenLength / fromDivide);
              oppositeHeightNumber = Math.ceil(oppositeChildrenLength / fromOppositeDivide);
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
              for (let c of thisChildren) {
                c.style.width = String(fromSize) + ea;
              }
              from.parentElement.style.height = String(finalHeight) + ea;
              fromOpposite.parentElement.style.height = String(finalHeight) + ea;
              from.parentElement.children[1].setAttribute("number", String(thisChildren.length));
              from.parentElement.children[1].textContent = String(thisChildren.length) + "명";
              findByAttribute(boardDoms, "action", fromName).textContent = String(thisChildren.length);
              fromOpposite.parentElement.children[1].setAttribute("number", String(oppositeChildren.length));
              fromOpposite.parentElement.children[1].textContent = String(oppositeChildren.length) + "명";
              findByAttribute(boardDoms, "action", fromOppositeName).textContent = String(oppositeChildren.length);


              indexTong = [];
              for (let i = 0; i < instance.cases.length; i++) {
                if (instance.cases[i] !== null) {
                  if (instance.cases[i].cliid === cliid) {
                    indexTong.push({ index: i, thisCase: equalJson(JSON.stringify(instance.cases[i])) });
                  }
                }
              }
              index = indexTong[requestNumber].index;
              thisCase = indexTong[requestNumber].thisCase;


              instance.cases[index].action = name;
              rowDom = findByAttribute([ ...document.querySelector("." + cliid).children ], "column", "action");
              if (rowDom !== null) {
                rowDom.textContent = name;
              }
              card.setAttribute("action", name);


              await ajaxJson({
                thisId: cliid,
                requestIndex: String(requestNumber),
                column: "action",
                pastValue: name,
                value: name,
                index,
                thisCase,
                user: cookies.homeliaisonConsoleLoginedName + token + cookies.homeliaisonConsoleLoginedEmail
              }, "/updateClient");

              await ajaxJson({
                mode: "sse",
                db: "console",
                collection: "sse_clientCard",
                log: true,
                who: cookies.homeliaisonConsoleLoginedEmail,
                updateQuery: {
                  cliid,
                  requestNumber,
                  mode: "action",
                  from: fromName,
                  to: name,
                  randomToken: instance.randomToken,
                }
              }, "/generalMongo");

            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          position: "relative",
          paddingBottom: String(margin) + ea,
          minHeight: String(fixedHeightSize + margin) + ea,
          background: GeneralJs.colorChip.gray1,
          height: withOut(margin, ea),
          borderBottomRightRadius: String(5) + "px",
          borderBottomLeftRadius: String(5) + "px",
        }
      });

      numbers.set(divisionMap[i][j], tong.children[1]);
      division.set(divisionMap[i][j], tong.children[2]);
      tempArr.push(tong);
    }

    domMatrix.push(tempArr);
  }

  //make card
  contextMenuEvent = function (cliid, index, requestNumber, from, fromAction) {
    const boardDoms = [ ...document.querySelectorAll("." + actionClass) ];
    const areaDoms = [ ...document.querySelectorAll("." + actionArea) ];
    return async function (e) {

      e.stopPropagation();
      instance.randomToken = uniqueValue();

      const value = this.getAttribute("value");
      const mode = this.getAttribute("mode");
      const card = this.parentElement.parentElement;
      try {
        let thisCase;
        let thisStandardDom, thisCaseDom;
        let rowDom;
        let length;

        thisCase = equalJson(JSON.stringify(instance.cases[index]));
        thisStandardDom = Array.from(instance.standardDoms).find((dom) => { return dom.firstChild.textContent.trim() === cliid; });
        thisCaseDom = [ ...document.querySelector("." + cliid).children ];

        if (mode === "status") {

          instance.cases[index].status = value;
          rowDom = findByAttribute(thisCaseDom, "column", "status");
          if (rowDom !== null) {
            rowDom.textContent = value;
          }
          card.setAttribute("status", value);
          instance.statusColorSync(value, thisStandardDom, thisCaseDom);
          if (!instance.statusNumberSync(from, value)) {
            length = card.parentElement.children.length;
            card.remove();
            length = length - 1;
            findByAttribute(boardDoms, "action", fromAction).textContent = String(length);
            findByAttribute(areaDoms, "action", fromAction).parentElement.children[1].textContent = String(length) + "명";
            setQueue(() => {
              GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?cliid=" + cliid + "&view=row");
            });
          }

          await ajaxJson({
            thisId: cliid,
            requestIndex: String(requestNumber),
            column: "status",
            pastValue: value,
            value: value,
            index,
            thisCase,
            user: cookies.homeliaisonConsoleLoginedName + token + cookies.homeliaisonConsoleLoginedEmail
          }, "/updateClient");

          await ajaxJson({
            mode: "sse",
            db: "console",
            collection: "sse_clientCard",
            log: true,
            who: cookies.homeliaisonConsoleLoginedEmail,
            updateQuery: {
              cliid,
              requestNumber,
              mode: "status",
              from: from,
              to: value,
              randomToken: instance.randomToken,
            }
          }, "/generalMongo");

        } else {

          for (let obj of instance.cardCases) {
            if (obj.cliid === cliid) {
              obj.manager = (value === "미정" ? '-' : value);
            }
          }
          instance.cases[index].manager = value;
          await ajaxJson({
            id: cliid,
            column: "manager",
            value: value,
            email: cookies.homeliaisonConsoleLoginedEmail
          }, "/updateClientHistory");
          await instance.mother.greenAlert("담당자가 " + value + "(으)로 설정되었습니다!");

        }
        card.removeChild(card.children[card.children.length - 2]);
        card.removeChild(card.lastChild);
      } catch (e) {
        console.log(e);
      }
    };
  }

  instance.totalFatherChildren = [];
  requestTong = {};
  num = 0;
  for (let obj of cases) {

    if (requestTong[obj.cliid] === undefined) {
      requestTong[obj.cliid] = 0;
      thisRequestNumber = 0;
    } else {
      requestTong[obj.cliid] = requestTong[obj.cliid] + 1;
      thisRequestNumber = requestTong[obj.cliid];
    }

    index = instance.cases.findIndex((c) => { return (c !== null && c.cliid === obj.cliid); });

    whiteCard = createNode({
      mother: division.get(obj.action),
      attribute: {
        kinds: "card",
        cliid: obj.cliid,
        draggable: "true",
        action: obj.action,
        status: obj.status,
        request: String(thisRequestNumber),
        index: String(index),
        important: ((obj.important && !obj.curation.analytics.full) ? 1 : 0),
      },
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData("dragData", this.getAttribute("cliid") + token + this.getAttribute("action") + token + this.getAttribute("request") + token + this.getAttribute("status"));
        },
        dragend: function (e) {
          e.preventDefault();
        },
        dragenter: function (e) {
          e.preventDefault();
        },
        dragleave: function (e) {
          e.preventDefault();
        },
        click: function (e) {
          const self = this;
          const index = Number(this.getAttribute("index"));
          const cliid = this.getAttribute("cliid");
          const important = Number(this.getAttribute("important"));
          if (e.altKey) {
            ajaxJson({
              id: cliid,
              column: "important",
              value: 1 - important,
              email: cookies.homeliaisonConsoleLoginedEmail
            }, "/updateClientHistory").then(() => {
              const target = self.children[1];
              if (important === 0) {
                target.style.color = colorChip.red;
                this.setAttribute("important", String(1));
              } else {
                target.style.color = colorChip.green;
                this.setAttribute("important", String(0));
              }
            }).catch((err) => {
              console.log(err);
            });
          } else {
            instance.whiteViewMaker(index).call(this, e);
          }
        },
        contextmenu: function (e) {
          e.preventDefault();
          e.stopPropagation();

          const self = this;
          const cliid = this.getAttribute("cliid");
          const status = this.getAttribute("status");
          const action = this.getAttribute("action");
          const requestNumber = Number(this.getAttribute("request"));
          const index = Number(this.getAttribute("index"));
          let menu;
          let cancelBox, menuBox;
          let cxMembers;

          cancelBox = null;
          menuBox = null;

          map.status.items
          cxMembers = instance.allMembers.filter((obj) => { return obj.roles.includes("CX") || obj.roles.includes("CEO"); }).map((obj) => { return obj.name; });

          if (cxMembers.length > map.status.items.length) {
            menu = new Array(cxMembers.length);
          } else {
            menu = new Array(map.status.items.length);
          }

          for (let i = 0; i < menu.length; i++) {
            menu[i] = (new Array(2)).fill('-');
            if (map.status.items[i] !== undefined) {
              menu[i][0] = map.status.items[i];
            }
            if (cxMembers[i] !== undefined) {
              menu[i][1] = cxMembers[i];
            }
          }

          cancelBox = createNode({
            mother: this,
            event: {
              click: (e) => {
                e.stopPropagation();
                self.removeChild(menuBox);
                self.removeChild(cancelBox);
              }
            },
            style: {
              position: "fixed",
              zIndex: String(2),
              width: String(100) + '%',
              height: String(100) + '%',
              background: "transparent",
              top: String(0),
              left: String(0),
            }
          });

          menuBox = createNode({
            mother: this,
            event: {
              click: (e) => { e.stopPropagation(); },
              contextmenu: (e) => { e.preventDefault(); e.stopPropagation(); },
            },
            style: {
              position: "absolute",
              zIndex: String(2),
              width: String((contextMenuBlockWidth * 2) + contextMenuBlockMargin) + ea,
              top: String(fixedHeightSize + contextMenuBlockBetween) + ea,
              left: withOut(50, ((contextMenuBlockWidth * 2) + contextMenuBlockMargin) / 2, ea),
              animation: "fadeuplite 0.2s ease forwards",
            }
          });

          for (let [ left, right ] of menu) {

            createNode({
              mother: menuBox,
              attribute: {
                mode: "status",
                value: left,
              },
              event: {
                click: contextMenuEvent(cliid, index, String(requestNumber), status, action),
                contextmenu: (e) => { e.preventDefault(); e.stopPropagation(); }
              },
              style: {
                display: "inline-block",
                position: "relative",
                background: left !== '-' ? colorChip.green : colorChip.deactive,
                borderRadius: String(3) + "px",
                width: String(contextMenuBlockWidth) + ea,
                height: String(contextMenuBlockHeight) + ea,
                marginRight: String(contextMenuBlockMargin) + ea,
                marginBottom: String(contextMenuBlockMargin) + ea,
                boxShadow: "0px 2px 15px -9px " + colorChip.shadow,
              },
              children: [
                {
                  text: left,
                  style: {
                    position: "absolute",
                    fontSize: String(contextMenuBlockSize) + ea,
                    fontWeight: String(500),
                    color: colorChip.whiteBlack,
                    width: String(100) + '%',
                    top: String(contextMenuBlockTextTop) + ea,
                    left: String(0),
                    textAlign: "center",
                  }
                }
              ]
            });

            createNode({
              mother: menuBox,
              attribute: {
                mode: "manager",
                value: right,
              },
              event: {
                click: contextMenuEvent(cliid, index, String(requestNumber), status, action),
                contextmenu: (e) => { e.preventDefault(); e.stopPropagation(); }
              },
              style: {
                display: "inline-block",
                position: "relative",
                background: right !== '-' ? colorChip.green : colorChip.deactive,
                borderRadius: String(3) + "px",
                width: String(contextMenuBlockWidth) + ea,
                height: String(contextMenuBlockHeight) + ea,
                marginBottom: String(contextMenuBlockMargin) + ea,
                boxShadow: "0px 2px 15px -9px " + colorChip.shadow,
              },
              children: [
                {
                  text: right,
                  style: {
                    position: "absolute",
                    fontSize: String(contextMenuBlockSize) + ea,
                    fontWeight: String(500),
                    color: colorChip.whiteBlack,
                    width: String(100) + '%',
                    top: String(contextMenuBlockTextTop) + ea,
                    left: String(0),
                    textAlign: "center",
                  }
                }
              ]
            });

          }

        },
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.action); })].length - 1]) + ea,
        height: String(fixedHeightSize) + ea,
        marginLeft: String(margin) + ea,
        marginTop: String(margin) + ea,
        background: GeneralJs.colorChip.white,
        borderRadius: String(5) + ea,
        cursor: "pointer",
      }
    });

    nameWord = createNode({
      mother: whiteCard,
      text: obj.name,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(nameFontSize) + ea,
        fontWeight: String(500),
        top: String(titleTop) + ea,
        marginLeft: String(intend) + ea,
        color: GeneralJs.colorChip.black,
        cursor: "pointer",
      }
    });

    idWord = createNode({
      mother: whiteCard,
      text: obj.cliid,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(fontSize) + ea,
        fontWeight: String(400),
        top: String(titleTop) + ea,
        marginLeft: String(between) + ea,
        color: (obj.important && !obj.curation.analytics.full) ? colorChip.red : (obj.curation.analytics.full ? colorChip.purple : colorChip.green),
        cursor: "pointer",
      }
    });

    instance.totalFatherChildren.push(whiteCard);

    num++;
  }

  for (let i = 0; i < divisionMap.length; i++) {
    if (divisionMap[i].length > 1) {
      pastHeight = domMatrix[i].map((dom) => { return dom.getBoundingClientRect().height; });
      pastHeight.sort((a, b) => { return b - a; });
      pastHeight = pastHeight[0];
      for (let j = 0; j < divisionMap[i].length; j++) {
        domMatrix[i][j].style.height = String(pastHeight) + ea;
      }
    }
  }

  numbers.forEach((value, key) => {
    numbers.get(key).textContent = String(division.get(key).children.length) + "명";
    numbers.get(key).setAttribute("number", String(division.get(key).children.length));
  });

  this.divisionMap = division;

  num2 = 0;
  pastIndex = 0;
  thirdTitlePastDom = null;
  thirdMatrixDom = [];
  for (let [ index, title ] of thirdClassIndexArr) {
    thirdTitleDom = createNode({
      mother: scrollTong,
      before: domMatrix[index][0].parentElement,
      text: title,
      attribute: {
        first: String(tongMarginTop),
        second: String(tongMarginTop + thirdTitleMarginTop),
        toggle: "on",
      },
      style: {
        position: "relative",
        fontSize: String(thirdTitleSize) + ea,
        fontWeight: String(thirdTitleWeight),
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        marginTop: String(tongMarginTop + (num2 === 0 ? 0 : thirdTitleMarginTop)) + ea,
        paddingLeft: String(thirdTitleIndent) + ea,
        paddingTop: String(thirdTitleTextTop) + ea,
        verticalAlign: "top",
      },
    });
    domMatrix[index][0].parentElement.style.marginTop = String(tongMarginTop - thirdTitleMarginBottomVisual) + ea;

    if (thirdTitlePastDom !== null) {
      thirdMatrixDomTemp = [ thirdTitlePastDom ];
      for (let i = pastIndex; i < index; i++) {
        thirdMatrixDomTemp.push(domMatrix[i][0].parentElement);
      }
      thirdMatrixDom.push(thirdMatrixDomTemp);
    }

    num2++;
    pastIndex = index;
    thirdTitlePastDom = thirdTitleDom;
  }

  thirdMatrixDomTemp = [ thirdTitlePastDom ];
  for (let i = pastIndex; i < domMatrix.length; i++) {
    thirdMatrixDomTemp.push(domMatrix[i][0].parentElement);
  }
  thirdMatrixDom.push(thirdMatrixDomTemp);

  this.thirdMatrixDom = thirdMatrixDom;

}

ClientJs.prototype.cardViewMaker = function () {
  const instance = this;
  const { equalJson, createNode, withOut, colorChip, ajaxJson, scrollTo, setQueue, stringToDate } = GeneralJs;
  const { ea, belowHeight, grayBarWidth } = this;
  return async function (e) {
    const { totalContents, totalMother } = instance;
    let thisCases;
    let totalFather;
    let totalFatherPaddingTop;
    let outerMargin;
    let scrollTongPaddingBottom;
    let managerObj;
    let newSearchInput, newSearchInputMother;

    totalFatherPaddingTop = 15;
    outerMargin = 20;
    scrollTongPaddingBottom = 500;

    newSearchInputMother = instance.searchInput.parentElement.cloneNode(true)
    newSearchInput = newSearchInputMother.firstChild;
    instance.searchInput.parentElement.parentElement.appendChild(newSearchInputMother);
    instance.searchInput.parentElement.style.display = "none";

    newSearchInput.addEventListener("keypress", function (e) {
      const thisValue = this.value.trim();
      let target;
      let tempFunction;
      let getTarget;
      if (GeneralJs.confirmKey.includes(e.key)) {
        this.value = thisValue;
        if (thisValue === '' || thisValue === '-') {
          for (let dom of instance.totalFatherChildren) {
            dom.style.background = GeneralJs.colorChip.white;
            dom.children[0].style.color = GeneralJs.colorChip.black;
            dom.children[1].style.color = GeneralJs.colorChip.green;
            dom.children[1].style.opacity = String(1);
          }
          scrollTo(instance.totalFather.children[1], 0);
        } else {
          target = null;
          for (let dom of instance.totalFatherChildren) {
            if ((new RegExp(this.value, "gi")).test(dom.textContent)) {
              scrollTo(instance.totalFather.children[1], dom, ((window.innerHeight - belowHeight) / 2) - (40 * 2));
              dom.style.background = GeneralJs.colorChip.green;
              dom.children[0].style.color = GeneralJs.colorChip.whiteBlack;
              dom.children[1].style.color = GeneralJs.colorChip.whiteBlack;
              dom.children[1].style.opacity = String(0.6);
              target = dom;
            } else {
              dom.style.background = GeneralJs.colorChip.white;
              dom.children[0].style.color = GeneralJs.colorChip.black;
              dom.children[1].style.color = GeneralJs.colorChip.green;
              dom.children[1].style.opacity = String(1);
            }
          }
          if (target === null) {
            instance.rowViewMaker().call({}, {});
            setQueue(() => {
              tempFunction = instance.makeSearchEvent(thisValue);
              tempFunction({ key: "Enter" }).catch((err) => { console.log(err); });
            }, 401);
          } else {
            setQueue(() => {
              target.click();
            }, 300);
          }
        }
      }
    });

    thisCases = equalJson(JSON.stringify(instance.cases)).slice(1).filter((obj) => { return !/드랍/gi.test(obj.status) && !/진행/gi.test(obj.status); });
    managerObj = await ajaxJson({
      method: "client",
      property: [ "manager", "important", "curation" ],
      idArr: thisCases.map((obj) => { return obj.cliid; }),
    }, "/getHistoryProperty");
    for (let obj of thisCases) {
      if (managerObj[obj.cliid] !== undefined) {
        obj.manager = managerObj[obj.cliid].manager;
        obj.important = managerObj[obj.cliid].important;
        obj.curation = managerObj[obj.cliid].curation;
      }
    }
    thisCases.sort((a, b) => {
      return stringToDate(a.timeline).valueOf() - stringToDate(b.timeline).valueOf();
    });

    instance.cardCases = thisCases;
    instance.allMembers = await ajaxJson({ type: "get" }, "/getMembers");

    if (instance.whiteBox !== null) {
      if (GeneralJs.stacks.whiteBox !== 1) {
        instance.whiteBox.cancelBox.click();
      }
    }

    if (instance.totalFather !== null) {

      instance.totalFather.style.zIndex = String(1);
      instance.totalFather.classList.remove("fadeout");
      instance.totalFather.classList.add("fadein");

    } else {

      totalFather = createNode({
        mother: document.getElementById("totalcontents"),
        class: (e.instantMode ? [ "totalFather" ] : [ "totalFather", "fadein" ]),
        style: {
          height: "calc(100vh - " + String(belowHeight) + ea + ")",
          width: String(100) + '%',
          zIndex: String(1),
          overflow: "hidden",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              left: String(0),
              top: String(0),
              width: String(grayBarWidth) + ea,
              background: colorChip.gray1,
              verticalAlign: "top",
              height: String(100) + '%',
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              paddingTop: String(totalFatherPaddingTop) + ea,
              paddingLeft: String(outerMargin) + ea,
              paddingRight: String(outerMargin) + ea,
              width: withOut((outerMargin * 2) + grayBarWidth, ea),
              height: String(100) + '%',
              verticalAlign: "top",
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  verticalAlign: "top",
                  width: String(100) + '%',
                  paddingBottom: String(scrollTongPaddingBottom) + ea,
                }
              }
            ]
          }
        ]
      });

      instance.totalMother.style.display = "none";
      instance.totalFather = totalFather;
      instance.makeBoard(thisCases);

    }
    instance.onView = "father";
  }
}

ClientJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
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
            pageName = "추천서";
          } else if (/estimation/gi.test(obj.page)) {
            pageName = "견적서";
          } else if (/pure/gi.test(obj.page)) {
            pageName = "순수 부재중 알림";
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
      background: colorChip.white,
      top: String(margin) + ea,
      left: String(instance.grayBarWidth + margin) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0 2px 10px -6px " + colorChip.shadow,
      width: String(window.innerWidth - instance.grayBarWidth - (margin * 2)) + ea,
      height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
      zIndex: String(2),
    };
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
  boxHeight = 410;
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
    summaryBox.insertAdjacentHTML(`beforeend`, `<br>MAU <b style="color:${colorChip.green}">${String(report[i].mau)}</b>명&nbsp;&nbsp;/&nbsp;&nbsp;광고유입 <b style="color:${colorChip.green}">${String(report[i].adClients)}</b>명`);

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
        totalBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;열람 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명`);
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

  totalBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("client_number")}</b>명&nbsp;&nbsp;추천 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("proposal_number")}</b>명&nbsp;&nbsp;열람 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("recommend_number")}</b>명&nbsp;&nbsp;계약 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("contract_number")}</b>명&nbsp;&nbsp;진행 <b style="color:${GeneralJs.colorChip.green}">${scrollBox.getAttribute("process_number")}</b>명`);
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
    () => { return "드랍시 서비스 소개"; },
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
          if (window.confirm(thisCase.name + " 고객님께 드랍시 서비스 소개 알림톡을 전송합니다. 확실합니까?")) {

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
    const { dateToString, returnGet, setQueue, cssInjection, requestPromise } = GeneralJs;
    const getObj = returnGet();
    let getTarget;
    let tempFunction;
    let cardViewInitial;

    // cardViewInitial = (getObj.cliid === undefined);
    // if (typeof getObj.specificids === "string") {
    //   cardViewInitial = false;
    // }

    cardViewInitial = false;

    this.cardViewInitial = cardViewInitial;
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
    this.boardSwipe();

    // const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/clientCard");
    // es.addEventListener("updateTong", (e) => {
    //   instance.sseCardParsing(e.data);
    // });

    getTarget = null;
    if (typeof getObj.specificids === "string") {
      tempFunction = this.makeSearchEvent("id:" + getObj.specificids);
      await tempFunction({ key: "Enter" });
    } else {
      if (!cardViewInitial) {
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
        }
      } else {
        instance.cardViewMaker().call(instance.mother.belowButtons.square.up, {
          instantMode: true
        });
      }
    }

  } catch (e) {
    GeneralJs.ajax({ message: "ClientJs 프론트 스크립트 문제 생김 " + e.message, channel: "#error_log" }, "/sendSlack", function () {});
    console.log(e);
  }
}
