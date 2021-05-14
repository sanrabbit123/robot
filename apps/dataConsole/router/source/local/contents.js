const ContentsJs = function () {
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
  this.whiteConvert = 0;
  this.whiteMatrixA = null;
  this.overrideSearch = null;
  this.overrideSearchWhite = null;
}

ContentsJs.abandonProjects = [
  "p2002_aa09s",
  "p1911_aa19s",
  "p1911_aa01s",
  "p1908_aa04s",
  "p1906_aa03s",
  "p1906_aa01s",
];

ContentsJs.prototype.standardBar = function (standard) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;
  let sortEventFunction;

  temp = {
    conid: standard.standard.conid.name,
    pid: standard.standard.pid.name
  };

  target = standard.data;
  if (standard.search === null) {
    target.unshift(temp);
  }

  style = {
    display: "block",
    position: "relative",
    background: "#f7f7f7",
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
    background: "#f7f7f7",
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
  for (let { conid, pid } of target) {
    if (num === 1) {
      style2.position = "relative";
      style3.color = "#404040";
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      leftPosition = [
        38,
        142,
      ];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = conid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("contextmenu", sortEventFunction(0));
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = pid;
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
    }

    if (num !== 0) {
      this.cases.push({ conid, pid });
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

  if (this.standardDoms.length === 2) {
    GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
      instance.standardDoms[1].click();
      clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
    }, 401);
  }

}

ContentsJs.prototype.infoArea = function (info) {
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
  let onoffDummy;
  let thisOnOff;
  let originalColumns;

  temp = {};
  columns = [];
  leftPosition = [];
  widthArr = [];

  if (window.localStorage.getItem("contents_columnsOrder") !== null && window.localStorage.getItem("contents_columnsOrder") !== undefined) {
    originalColumns = JSON.parse(window.localStorage.getItem("contents_columnsOrder"));
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
    background: "#ffffff",
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
        const thisId = /t[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
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
    const conidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = "#2fa678";
    }
    for (let z = 0; z < conidChildren.length; z++) {
      if (conidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < conidChildren[z].children.length; y++) {
          conidChildren[z].children[y].style.color = "#2fa678";
        }
      }
    }
  }

  leaveEventFunction = function (e) {
    const mother = this.parentElement;
    const thisIndex = mother.getAttribute("index");
    const thisId = /t[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(mother.className)[0];
    const onOffObj = JSON.parse(window.localStorage.getItem(thisId));
    const conidChildren = instance.totalMother.children[0].children;
    const finalColor = (mother.getAttribute("drop") === "true") ? "#cccccc" : "#404040";
    for (let z = 0; z < mother.children.length; z++) {
      if (!onOffObj[mother.children[z].getAttribute("column")]) {
        mother.children[z].style.color = finalColor;
      } else {
        mother.children[z].style.color = "#2fa678";
      }
    }
    for (let z = 0; z < conidChildren.length; z++) {
      if (conidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < conidChildren[z].children.length; y++) {
          conidChildren[z].children[y].style.color = finalColor;
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
      const thisId = /t[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];

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
              if (standardArea.children[z].getAttribute("drop") === "true") {
                finalColor = "#cccccc";
              } else {
                finalColor = "#404040";
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
        const map = DataPatch.contentsMap();
        const thisMap = map[this.getAttribute("column")];

        if (thisMap.type === "date" && e.type === "click") {

          cancel_inputBack.style.background = "white";
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
            background: "white",
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

          cancel_inputBack.style.background = "white";
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

          cancel_inputBack.style.background = "white";
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
            background: "white",
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

          cancel_inputBack.style.background = "white";
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
      const map = DataPatch.contentsMap();
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
        background: "white",
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
          color: "#ffffff",
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
          color: "#ffffff",
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

    if (window.localStorage.getItem("contents_columnsOrder") !== null && window.localStorage.getItem("contents_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("contents_columnsOrder"));
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

    window.localStorage.setItem("contents_columnsOrder", JSON.stringify(allColumns));

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
      div_clone2.classList.add(this.cases[num].conid);
      if (window.localStorage.getItem(this.cases[num].conid) === null) {
        window.localStorage.setItem(this.cases[num].conid, JSON.stringify(onoffDummy));
        thisOnOff = onoffDummy;
      } else {
        thisOnOff = JSON.parse(window.localStorage.getItem(this.cases[num].conid));
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

ContentsJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let contentsArr, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;
    let designers;

    if (search === null || search === '' || search === '-') {
      contentsArr = JSON.parse(await GeneralJs.ajaxPromise("limit=100", "/getContents"));
    } else {
      contentsArr = JSON.parse(await GeneralJs.ajaxPromise("query=" + search, "/searchContents"));
    }

    designers = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({}), "/getDesigners"));
    GeneralJs.stacks.allDesignerTong = designers;

    const { standard, data } = contentsArr;

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

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search });
    this.infoArea({ standard: standard.info, data: infoDataTong, search: search });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ContentsJs.prototype.snsContentsMaker = function (proidArr, mother, callback) {
  const instance = this;
  const today = new Date();
  const filterDoms = [];
  const items = [];
  const area = [
    {
      title: "준비된 컨텐츠",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          num = num + 1;
          doms.push(obj);
        }

        eventFunc = function (e) {
          const thisIndex = Number(this.getAttribute("index"));
          let temp;
          for (let i = 0; i < GeneralJs.stacks["snsAdjustDom0"].length; i++) {
            if (i !== thisIndex) {
              temp = GeneralJs.stacks["snsAdjustDom0"][i].dom;
              GeneralJs.stacks["snsAdjustDom0"][i].onoff = "off";
              temp.style.background = "white";
              temp.firstChild.style.color = "#202020";
              temp.lastChild.style.color = "#2fa678";
            } else {
              temp = GeneralJs.stacks["snsAdjustDom0"][thisIndex].dom;
              GeneralJs.stacks["snsAdjustDom0"][thisIndex].onoff = "on";
              GeneralJs.stacks["snsAdjustDom0"].target = GeneralJs.stacks["snsAdjustDom0"][thisIndex].dom;
              temp.style.background = "#2fa678";
              for (let j of temp.children) {
                j.style.color = "white";
              }
            }
          }
        }

        titleEventFunc = function (e) {}

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "발행 채널",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        doms = [
          { method: "블로그", link: "blog.naver.com", keyWords: "B", },
          { method: "인스타그램", link: "instagram.com", keyWords: "I", },
          { method: "유튜브", link: "youtube.com", keyWords: "Y", },
        ];
        num = doms.length;

        eventFunc = function (e) {
          const thisIndex = Number(this.getAttribute("index"));
          let temp;
          for (let i = 0; i < GeneralJs.stacks["snsAdjustDom1"].length; i++) {
            if (i !== thisIndex) {
              temp = GeneralJs.stacks["snsAdjustDom1"][i].dom;
              GeneralJs.stacks["snsAdjustDom1"][i].onoff = "off";
              temp.style.background = "white";
              temp.firstChild.style.color = "#202020";
              temp.lastChild.style.color = "#2fa678";
            } else {
              temp = GeneralJs.stacks["snsAdjustDom1"][thisIndex].dom;
              GeneralJs.stacks["snsAdjustDom1"][thisIndex].onoff = "on";
              GeneralJs.stacks["snsAdjustDom1"].target = GeneralJs.stacks["snsAdjustDom1"][thisIndex].dom;
              temp.style.background = "#2fa678";
              for (let j of temp.children) {
                j.style.color = "white";
              }
            }
          }
        }

        titleEventFunc = function (e) {}

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "컨텐츠 종류",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        doms = [
          { method: "포트폴리오", link: "portfolio", keyWords: "portfolio" },
          { method: "고객 후기", link: "review", keyWords: "review" },
        ];
        num = doms.length;

        eventFunc = function (e) {
          const thisIndex = Number(this.getAttribute("index"));
          let temp;
          for (let i = 0; i < GeneralJs.stacks["snsAdjustDom2"].length; i++) {
            if (i !== thisIndex) {
              temp = GeneralJs.stacks["snsAdjustDom2"][i].dom;
              GeneralJs.stacks["snsAdjustDom2"][i].onoff = "off";
              temp.style.background = "white";
              temp.firstChild.style.color = "#202020";
              temp.lastChild.style.color = "#2fa678";
            } else {
              temp = GeneralJs.stacks["snsAdjustDom2"][thisIndex].dom;
              GeneralJs.stacks["snsAdjustDom2"][thisIndex].onoff = "on";
              GeneralJs.stacks["snsAdjustDom2"].target = GeneralJs.stacks["snsAdjustDom2"][thisIndex].dom;
              temp.style.background = "#2fa678";
              for (let j of temp.children) {
                j.style.color = "white";
              }
            }
          }
        }

        titleEventFunc = function (e) {}

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
  ];
  const motherWidth = Number(mother.style.width.replace(/[^0-9\.\-]/gi, ''));
  const motherHeight = Number(mother.style.height.replace(/[^0-9\.\-]/gi, ''));
  let tong, entireBox, titleBox, poolBox;
  let scrollBase, scrollBox;
  let div_clone, div_clone2;
  let style;
  let entireStyle, titleStyle, poolStyle;
  let scrollBaseStyle, scrollBoxStyle;
  let factorStyle;
  let cardStyle, cardStyle2;
  let ea;
  let margin;
  let entireWidth, entireHeight;
  let titleHeight, areaMargin;
  let titleFont;
  let result;
  let tempObj, tempArr;

  ea = "px";
  margin = 50;
  entireWidth = motherWidth - (margin * 2);
  entireHeight = motherHeight - (margin * 2);
  titleHeight = 32;
  areaMargin = 19;
  titleFont = 17;

  entireStyle = {
    display: "inline-block",
    position: "relative",
    width: String(Math.floor((entireWidth + areaMargin) / 5)) + ea,
    height: String(100) + '%',
  };

  titleStyle = {
    position: "absolute",
    top: String(0) + ea,
    left: String(1) + ea,
    fontSize: String(titleFont) + ea,
    fontWeight: String(600),
  };

  poolStyle = {
    position: "relative",
    marginTop: String(titleHeight) + ea,
    width: "calc(100% - " + String(areaMargin) + ea + ")",
    height: "calc(100% - " + String(titleHeight) + ea + ")",
    border: "1px solid #dddddd",
    borderRadius: String(5) + ea,
  };

  scrollBaseStyle = {
    position: "absolute",
    background: "#f2f2f2",
    borderRadius: String(5) + ea,
    width: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    height: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    top: String(areaMargin * (2 / 3)) + ea,
    left: String(areaMargin * (2 / 3)) + ea,
    overflow: "scroll",
    border: "3px solid #f2f2f2",
    boxSizing: "border-box",
  };

  scrollBoxStyle = {
    position: "relative",
    height: String(motherHeight * 5) + ea,
    background: "#f2f2f2",
    width: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    top: String(areaMargin * (2 / 3)) + ea,
    left: String(areaMargin * (2 / 3)) + ea,
  };

  factorStyle = {
    display: "block",
    position: "relative",
    width: String(100) + '%',
    height: String(42) + ea,
    background: "white",
    marginBottom: String(Math.floor(areaMargin * 0.4)) + ea,
    borderRadius: String(3) + ea,
    cursor: "pointer",
    transition: "all 0s ease",
  };

  cardStyle = {
    fontSize: String(16) + ea,
    fontWeight: String(200),
    position: "absolute",
    top: String(9) + ea,
    left: String(13) + ea,
    color: "#202020",
    cursor: "pointer",
    transition: "all 0s ease",
  };

  cardStyle2 = {
    fontSize: String(12) + ea,
    fontWeight: String(400),
    position: "absolute",
    top: String(11.5) + ea,
    right: String(13) + ea,
    color: "#2fa678",
    cursor: "pointer",
    transition: "all 0s ease",
  };

  tong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "relative",
    left: String(margin) + ea,
    top: String(margin) + ea,
    width: String(entireWidth + areaMargin) + ea,
    height: String(entireHeight) + ea,
  };
  for (let i in style) {
    tong.style[i] = style[i];
  }

  for (let i = 0; i < area.length; i++) {
    result = area[i].condition();
    tempObj = {};
    tempArr = [];

    entireBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in entireStyle) {
      entireBox.style[j] = entireStyle[j];
    }
    tempObj.entire = entireBox;
    if (i !== 0) {
      entireBox.style.position = "absolute";
      entireBox.style.height = String(48.7) + '%';
      entireBox.style.left = entireStyle.width;
      if (i === 1) {
        entireBox.style.top = String(0) + ea;
      } else {
        entireBox.style.bottom = String(0) + ea;
      }
    }

    titleBox = GeneralJs.nodes.div.cloneNode(true);
    titleBox.classList.add("hoverDefault_lite");
    titleBox.textContent = area[i].title;
    for (let j in titleStyle) {
      titleBox.style[j] = titleStyle[j];
    }
    titleBox.addEventListener("click", result.titleEventFunc);
    titleBox.setAttribute("onoff", "off");
    entireBox.appendChild(titleBox);
    tempObj.title = titleBox;

    poolBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in poolStyle) {
      poolBox.style[j] = poolStyle[j];
    }

    scrollBase = GeneralJs.nodes.div.cloneNode(true);
    for (let j in scrollBaseStyle) {
      scrollBase.style[j] = scrollBaseStyle[j];
    }

    scrollBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in scrollBoxStyle) {
      scrollBox.style[j] = scrollBoxStyle[j];
    }

    GeneralJs.stacks["snsAdjustDom" + String(i)] = [];
    GeneralJs.stacks["snsAdjustDom" + String(i)].target = null;
    for (let j = 0; j < result.number; j++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let k in factorStyle) {
        div_clone.style[k] = factorStyle[k];
      }
      if (i !== 0) {
        div_clone.setAttribute("keywords", result.doms[j].keyWords);
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      for (let k in cardStyle) {
        div_clone2.style[k] = cardStyle[k];
      }
      if (i === 0) {
        div_clone2.insertAdjacentHTML("beforeend", `${result.doms[j].name}C / ${result.doms[j].designer}D`);
      } else {
        div_clone2.insertAdjacentHTML("beforeend", result.doms[j].method);
      }
      div_clone.appendChild(div_clone2);

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      for (let k in cardStyle2) {
        div_clone2.style[k] = cardStyle2[k];
      }
      if (i === 0) {
        div_clone2.insertAdjacentHTML("beforeend", `${result.doms[j].proid}`);
      } else {
        div_clone2.insertAdjacentHTML("beforeend", `${result.doms[j].link}`);
      }
      div_clone.appendChild(div_clone2);

      if (i === 0) {
        div_clone.setAttribute("cliid", result.doms[j].cliid);
        div_clone.setAttribute("proid", result.doms[j].proid);
        div_clone.setAttribute("name", result.doms[j].name);
        div_clone.setAttribute("desid", result.doms[j].desid);
        div_clone.setAttribute("designer", result.doms[j].designer);
        div_clone.setAttribute("photoDate", ((result.doms[j].photoDate === null) ? "null" : String(result.doms[j].photoDate.valueOf())));
      }

      div_clone.setAttribute("index", String(j));
      div_clone.addEventListener("click", result.eventFunc);
      GeneralJs.stacks["snsAdjustDom" + String(i)].push({ dom: div_clone, onoff: "off" });
      scrollBox.appendChild(div_clone);
    }

    scrollBase.appendChild(scrollBox);
    poolBox.appendChild(scrollBase);
    entireBox.appendChild(poolBox);

    tempObj.pool = poolBox;

    tong.appendChild(entireBox);
    filterDoms.push(tempObj);
  }

  const calendar = this.mother.makeCalendar(new Date(), function (e) {
    let [ year, month, date ] = this.getAttribute("buttonValue").split("-");
    let title;

    if (GeneralJs.stacks["snsAdjustDom0"].target !== null && GeneralJs.stacks["snsAdjustDom1"].target !== null && GeneralJs.stacks["snsAdjustDom2"].target !== null) {
      year = Number(year);
      month = Number(month) - 1;
      date = Number(date);

      title = GeneralJs.stacks["snsAdjustDom1"].target.getAttribute("keywords") + ") " + GeneralJs.stacks["snsAdjustDom0"].target.getAttribute("name") + " " + GeneralJs.stacks["snsAdjustDom2"].target.getAttribute("keywords");
      this.setDateEvents([ { date: new Date(year, month, date, 11, 0, 0), title, eventFunc: function (e) {} } ], false);
    } else {
      instance.mother.greenAlert("컨텐츠 / 채널 / 종류를 선택해주세요!");
    }

  }, {
    bigMode: true,
    width: "calc(100% - " + String((Math.floor((entireWidth + areaMargin) / 5) * 2) + areaMargin) + ea + ")",
    height: "calc(100% - " + String(29) + ea + ")",
    events: [],
  });
  calendar.calendarBase.style.position = "absolute";
  calendar.calendarBase.style.top = String(31) + ea;
  calendar.calendarBase.style.left = String(Math.floor((entireWidth + areaMargin) / 5) * 2) + ea;
  tong.appendChild(calendar.calendarBase);

  filterDoms.tong = tong;
  mother.appendChild(tong);

  this.overrideSearchWhite.querySelector("input").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      const offStandard = [
        "white",
        "rgb(32, 32, 32)",
        "#2fa678",
      ];
      const onStandard = [
        "#2fa678",
        "white",
        "white",
      ];
      const [ one ] = filterDoms;
      const { pool: onePool } = one;

      let childrenTargets, strings, regex, firstTargets, fianlTarget;

      childrenTargets = onePool.firstChild.firstChild.children;

      if (this.value !== '' && this.value !== ' ') {
        regex = new RegExp(this.value, "gi");
      } else {
        regex = new RegExp("^99999999$", "gi");
      }

      firstTargets = [];
      for (let dom of childrenTargets) {
        strings = '';
        strings += dom.firstChild.textContent;
        strings += dom.lastChild.textContent;
        strings += dom.getAttribute("cliid");
        strings += dom.getAttribute("desid");
        if (regex.test(strings)) {
          firstTargets.push(dom);
        } else {
          dom.style.background = offStandard[0];
          dom.firstChild.style.color = offStandard[1];
          dom.lastChild.style.color = offStandard[1];
        }
      }

      fianlTarget = firstTargets[firstTargets.length - 1];
      fianlTarget.click();
      fianlTarget.parentElement.insertBefore(fianlTarget, fianlTarget.parentElement.firstChild)

    }
  });

  callback();
}

ContentsJs.prototype.filterContentsMaker = function (proidArr, mother, callback) {
  const instance = this;
  const today = new Date();
  const filterDoms = [];
  const motherWidth = Number(mother.style.width.replace(/[^0-9\.\-]/gi, ''));
  const motherHeight = Number(mother.style.height.replace(/[^0-9\.\-]/gi, ''));
  let tong, entireBox, titleBox, poolBox;
  let scrollBase, scrollBox;
  let div_clone, div_clone2;
  let style;
  let entireStyle, titleStyle, poolStyle;
  let scrollBaseStyle, scrollBoxStyle;
  let factorStyle;
  let cardStyle, cardStyle2;
  let ea;
  let margin;
  let entireWidth, entireHeight;
  let titleHeight, areaMargin;
  let titleFont;
  let result;
  let tempObj;

  ea = "px";
  margin = 50;
  entireWidth = motherWidth - (margin * 2);
  entireHeight = motherHeight - (margin * 2);
  titleHeight = 32;
  areaMargin = 19;
  titleFont = 17;

  const area = [
    {
      title: "촬영 일자 조정 필요",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          if (obj.photoDate === null) {
            num = num + 1;
            doms.push(obj);
          }
        }

        eventFunc = function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/contents?" + "proid=" + this.getAttribute("proid") + "&view=create", "_blank");
        }

        titleEventFunc = function (e) {}

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "촬영 대기중",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          if (obj.photoDate !== null) {
            if (obj.photoDate.valueOf() >= today.valueOf()) {
              num = num + 1;
              doms.push(obj);
            }
          }
        }

        eventFunc = function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + this.getAttribute("proid"), "_blank");
        }

        titleEventFunc = function (e) {
          let num, eventArr;
          if (this.getAttribute("onoff") === "off") {
            eventArr = [];
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 1) {
                obj.entire.style.display = "none";
              }
              num++;
            }
            this.setAttribute("onoff", "on");
            for (let { photoDate, name, designer, proid } of doms) {
              eventArr.push({ date: photoDate, title: `${name}C / ${designer}D`, eventFunc: function (e) {
                window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + proid, "_blank");
              }});
            }
            const calendar = instance.mother.makeCalendar(new Date(), function (e) {}, {
              bigMode: true,
              width: "calc(100% - " + String((Math.floor((entireWidth + areaMargin) / area.length)) + areaMargin) + ea + ")",
              height: "calc(100% - 29px)",
              events: eventArr
            });
            calendar.calendarBase.style.position = "absolute";
            calendar.calendarBase.style.top = String(31) + ea;
            calendar.calendarBase.style.left = String(Math.floor((entireWidth + areaMargin) / area.length)) + ea;
            filterDoms.tong.appendChild(calendar.calendarBase);
          } else {
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 1) {
                obj.entire.style.display = "inline-block";
              }
              num++;
            }
            this.setAttribute("onoff", "off");
            filterDoms.tong.removeChild(filterDoms.tong.lastChild);
          }
        }

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "원본 사진 대기중",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          if (obj.photoDate !== null) {
            if (obj.photoDate.valueOf() < today.valueOf()) {
              if (!/^htt/.test(obj.rawLink)) {
                num = num + 1;
                doms.push(obj);
              }
            }
          }
        }

        eventFunc = function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + this.getAttribute("proid"), "_blank");
        }

        titleEventFunc = function (e) {
          let num, eventArr;
          if (this.getAttribute("onoff") === "off") {
            eventArr = [];
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 2) {
                obj.entire.style.display = "none";
              }
              num++;
            }
            this.setAttribute("onoff", "on");
            for (let { photoDate, name, designer, proid } of doms) {
              eventArr.push({ date: photoDate, title: `${name}C / ${designer}D`, eventFunc: function (e) {
                window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + proid, "_blank");
              }});
            }
            const calendar = instance.mother.makeCalendar(new Date(), function (e) {}, {
              bigMode: true,
              width: "calc(100% - " + String((Math.floor((entireWidth + areaMargin) / area.length)) + areaMargin) + ea + ")",
              height: "calc(100% - 29px)",
              events: eventArr
            });
            calendar.calendarBase.style.position = "absolute";
            calendar.calendarBase.style.top = String(31) + ea;
            calendar.calendarBase.style.left = String(Math.floor((entireWidth + areaMargin) / area.length)) + ea;
            filterDoms.tong.appendChild(calendar.calendarBase);

          } else {
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 2) {
                obj.entire.style.display = "inline-block";
              }
              num++;
            }
            this.setAttribute("onoff", "off");
            filterDoms.tong.removeChild(filterDoms.tong.lastChild);
          }
        }

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "원본 컨텐츠 대기중",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          if (obj.photoDate !== null) {
            if (!obj.portfolioExist || !obj.reviewExist) {
              num = num + 1;
              doms.push(obj);
            }
          }
        }

        eventFunc = function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + this.getAttribute("proid"), "_blank");
        }

        titleEventFunc = function (e) {
          let num, eventArr;
          if (this.getAttribute("onoff") === "off") {
            eventArr = [];
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 3) {
                obj.entire.style.display = "none";
              }
              num++;
            }
            this.setAttribute("onoff", "on");
            for (let { photoDate, name, designer, proid } of doms) {
              eventArr.push({ date: photoDate, title: `${name}C / ${designer}D`, eventFunc: function (e) {
                window.open(window.location.protocol + "//" + window.location.host + "/project?" + "proid=" + proid, "_blank");
              }});
            }
            const calendar = instance.mother.makeCalendar(new Date(), function (e) {}, {
              bigMode: true,
              width: "calc(100% - " + String((Math.floor((entireWidth + areaMargin) / area.length)) + areaMargin) + ea + ")",
              height: "calc(100% - 29px)",
              events: eventArr
            });
            calendar.calendarBase.style.position = "absolute";
            calendar.calendarBase.style.top = String(31) + ea;
            calendar.calendarBase.style.left = String(Math.floor((entireWidth + areaMargin) / area.length)) + ea;
            filterDoms.tong.appendChild(calendar.calendarBase);
          } else {
            num = 0;
            for (let obj of filterDoms) {
              if (num !== 3) {
                obj.entire.style.display = "inline-block";
              }
              num++;
            }
            this.setAttribute("onoff", "off");
            filterDoms.tong.removeChild(filterDoms.tong.lastChild);
          }
        }

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
    {
      title: "컨텐츠 교정 대기중",
      condition: function () {
        let num, doms, eventFunc, titleEventFunc;
        const today = new Date();

        num = 0;
        doms = [];

        for (let obj of proidArr) {
          if (obj.photoDate !== null) {
            if (obj.portfolioExist && obj.reviewExist && /^htt/.test(obj.rawLink)) {
              num = num + 1;
              doms.push(obj);
            }
          }
        }

        eventFunc = function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/contents?" + "proid=" + this.getAttribute("proid") + "&view=create", "_blank");
        }

        titleEventFunc = function (e) {}

        return { number: num, doms: doms, eventFunc: eventFunc, titleEventFunc: titleEventFunc };
      },
    },
  ];

  entireStyle = {
    display: "inline-block",
    position: "relative",
    width: String(Math.floor((entireWidth + areaMargin) / area.length)) + ea,
    height: String(100) + '%',
  };

  titleStyle = {
    position: "absolute",
    top: String(0) + ea,
    left: String(1) + ea,
    fontSize: String(titleFont) + ea,
    fontWeight: String(600),
  };

  poolStyle = {
    position: "relative",
    marginTop: String(titleHeight) + ea,
    width: "calc(100% - " + String(areaMargin) + ea + ")",
    height: "calc(100% - " + String(titleHeight) + ea + ")",
    border: "1px solid #dddddd",
    borderRadius: String(5) + ea,
  };

  scrollBaseStyle = {
    position: "absolute",
    background: "#f2f2f2",
    borderRadius: String(5) + ea,
    width: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    height: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    top: String(areaMargin * (2 / 3)) + ea,
    left: String(areaMargin * (2 / 3)) + ea,
    overflow: "scroll",
    border: "3px solid #f2f2f2",
    boxSizing: "border-box",
  };

  scrollBoxStyle = {
    position: "relative",
    height: String(motherHeight * 5) + ea,
    background: "#f2f2f2",
    width: "calc(100% - " + String(areaMargin * (4 / 3)) + ea + ")",
    top: String(areaMargin * (2 / 3)) + ea,
    left: String(areaMargin * (2 / 3)) + ea,
  };

  factorStyle = {
    display: "block",
    position: "relative",
    width: String(100) + '%',
    height: String(42) + ea,
    background: "white",
    marginBottom: String(Math.floor(areaMargin * 0.4)) + ea,
    borderRadius: String(3) + ea,
    cursor: "pointer",
    transition: "all 0s ease",
  };

  cardStyle = {
    fontSize: String(16) + ea,
    fontWeight: String(200),
    position: "absolute",
    top: String(9) + ea,
    left: String(13) + ea,
    color: "#202020",
    cursor: "pointer",
    transition: "all 0s ease",
  };

  cardStyle2 = {
    fontSize: String(12) + ea,
    fontWeight: String(400),
    position: "absolute",
    top: String(11.5) + ea,
    right: String(13) + ea,
    color: "#2fa678",
    cursor: "pointer",
    transition: "all 0s ease",
  };

  tong = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "relative",
    left: String(margin) + ea,
    top: String(margin) + ea,
    width: String(entireWidth + areaMargin) + ea,
    height: String(entireHeight) + ea,
  };
  for (let i in style) {
    tong.style[i] = style[i];
  }

  for (let i = 0; i < area.length; i++) {
    result = area[i].condition();
    tempObj = {};

    entireBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in entireStyle) {
      entireBox.style[j] = entireStyle[j];
    }
    tempObj.entire = entireBox;

    titleBox = GeneralJs.nodes.div.cloneNode(true);
    titleBox.classList.add("hoverDefault_lite");
    titleBox.textContent = area[i].title;
    for (let j in titleStyle) {
      titleBox.style[j] = titleStyle[j];
    }
    titleBox.addEventListener("click", result.titleEventFunc);
    titleBox.setAttribute("onoff", "off");
    entireBox.appendChild(titleBox);
    tempObj.title = titleBox;

    poolBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in poolStyle) {
      poolBox.style[j] = poolStyle[j];
    }

    scrollBase = GeneralJs.nodes.div.cloneNode(true);
    for (let j in scrollBaseStyle) {
      scrollBase.style[j] = scrollBaseStyle[j];
    }

    scrollBox = GeneralJs.nodes.div.cloneNode(true);
    for (let j in scrollBoxStyle) {
      scrollBox.style[j] = scrollBoxStyle[j];
    }

    for (let j = 0; j < result.number; j++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let k in factorStyle) {
        div_clone.style[k] = factorStyle[k];
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      for (let k in cardStyle) {
        div_clone2.style[k] = cardStyle[k];
      }
      div_clone2.insertAdjacentHTML("beforeend", `${result.doms[j].name}C / ${result.doms[j].designer}D`);
      div_clone.appendChild(div_clone2);

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      for (let k in cardStyle2) {
        div_clone2.style[k] = cardStyle2[k];
      }
      div_clone2.insertAdjacentHTML("beforeend", `${result.doms[j].proid}`);
      div_clone.appendChild(div_clone2);

      div_clone.setAttribute("cliid", result.doms[j].cliid);
      div_clone.setAttribute("proid", result.doms[j].proid);
      div_clone.setAttribute("name", result.doms[j].name);
      div_clone.setAttribute("desid", result.doms[j].desid);
      div_clone.setAttribute("designer", result.doms[j].designer);
      div_clone.setAttribute("photoDate", ((result.doms[j].photoDate === null) ? "null" : String(result.doms[j].photoDate.valueOf())));
      div_clone.addEventListener("click", result.eventFunc);

      scrollBox.appendChild(div_clone);
    }

    scrollBase.appendChild(scrollBox);
    poolBox.appendChild(scrollBase);
    entireBox.appendChild(poolBox);

    tempObj.pool = poolBox;

    tong.appendChild(entireBox);
    filterDoms.push(tempObj);
  }

  filterDoms.tong = tong;

  mother.appendChild(tong);

  this.overrideSearchWhite.querySelector("input").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      const offStandard = [
        "white",
        "rgb(32, 32, 32)",
        "#2fa678",
      ];
      const onStandard = [
        "#2fa678",
        "white",
        "white",
      ];
      const [ one, two, three, four, five ] = filterDoms;
      const { pool: onePool } = one;
      const { pool: twoPool } = two;
      const { pool: threePool } = three;
      const { pool: fourPool } = four;
      const { pool: fivePool } = five;

      let childrenTargets, strings, regex, firstTargets;

      childrenTargets = [
        onePool.firstChild.firstChild.children,
        twoPool.firstChild.firstChild.children,
        threePool.firstChild.firstChild.children,
        fourPool.firstChild.firstChild.children,
        fivePool.firstChild.firstChild.children,
      ];

      if (this.value !== '' && this.value !== ' ') {
        regex = new RegExp(this.value, "gi");
      } else {
        regex = new RegExp("^99999999$", "gi");
      }

      for (let i = 0; i < childrenTargets.length; i++) {
        firstTargets = [];
        for (let dom of childrenTargets[i]) {
          strings = '';
          strings += dom.firstChild.textContent;
          strings += dom.lastChild.textContent;
          strings += dom.getAttribute("cliid");
          strings += dom.getAttribute("desid");
          if (regex.test(strings)) {
            dom.style.background = onStandard[0];
            dom.firstChild.style.color = onStandard[1];
            dom.lastChild.style.color = onStandard[1];
            firstTargets.push(dom);
          } else {
            dom.style.background = offStandard[0];
            dom.firstChild.style.color = offStandard[1];
            dom.lastChild.style.color = offStandard[1];
          }
        }
        for (let dom of firstTargets) {
          dom.parentElement.insertBefore(dom, dom.parentElement.firstChild);
        }
      }

    }
  });

  callback();
}

ContentsJs.prototype.filterViewMakerDetail = function (proidArr, recycle = false, mode = "filter") {
  const instance = this;
  return function () {
    let div_clone;
    let style;
    let ea = "px";
    let margin;
    let domTargets;
    let motherBoo;
    let indexArr, requestIndex;
    let loadingIcon;
    let width;

    margin = 30;
    width = 50;

    if (!recycle) {

      instance.whiteBox = {};

      //cancel box
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        background: "#404040",
        top: String(0) + ea,
        left: String(0) + ea,
        width: "calc(100% - " + String(0) + ea + ")",
        height: "calc(100% - " + String(instance.belowHeight) + ea + ")",
        zIndex: String(2),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      div_clone.addEventListener("click", function (e) {
        let generalCancelFunc = instance.whiteCancelMaker();
        instance.mother.below.removeChild(instance.overrideSearchWhite);
        instance.overrideSearch.querySelector("input").style.opacity = "";
        generalCancelFunc.call(this, e);
      });

      instance.whiteBox.cancelBox = div_clone;
      instance.totalContents.appendChild(div_clone);

    }

    //contents box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("fadeup");
    div_clone.classList.add("totalWhite");

    style = {
      position: "fixed",
      background: "white",
      top: String(margin) + ea,
      left: String(margin) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0 2px 10px -6px #808080",
      width: String(window.innerWidth - (margin * 2)) + ea,
      height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
      zIndex: String(2),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    loadingIcon = instance.mother.returnLoadingIcon();
    style = {
      position: "absolute",
      width: String(width) + ea,
      height: String(width) + ea,
      left: "calc(50% - " + String(width / 2) + ea + ")",
      top: "calc(49% - " + String(width / 2) + ea + ")",
    };
    for (let i in style) {
      loadingIcon.style[i] = style[i];
    }
    div_clone.appendChild(loadingIcon);

    if (mode === "filter") {
      instance.filterContentsMaker(proidArr, div_clone, function () {
        div_clone.removeChild(loadingIcon);
      });
    } else if (mode === "sns") {
      instance.snsContentsMaker(proidArr, div_clone, function () {
        div_clone.removeChild(loadingIcon);
      });
    }

    instance.whiteBox.contentsBox = div_clone;
    instance.totalContents.appendChild(div_clone);
    GeneralJs.stacks.whiteBox = 0;
  }
}

ContentsJs.prototype.filterViewMaker = function (proidArr, mode = "filter") {
  const instance = this;
  return function (e) {
    let tempFunc;
    let overrideSearch;

    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        tempFunc = instance.whiteCancelMaker(instance.filterViewMakerDetail(proidArr, true, mode), true);
        tempFunc();
      } else if (instance.whiteBox === null) {
        tempFunc = instance.filterViewMakerDetail(proidArr, false, mode);
        overrideSearch = instance.overrideSearch.cloneNode(true);
        instance.mother.below.appendChild(overrideSearch);
        instance.overrideSearchWhite = overrideSearch;
        instance.overrideSearch.querySelector("input").style.opacity = String(0);
        tempFunc();
      }
    }
  }
}

ContentsJs.prototype.photoAdjust = async function (objectInfo) {
  if (objectInfo.cliid === undefined || objectInfo.proid === undefined || objectInfo.name === undefined || objectInfo.desid === undefined || objectInfo.designer === undefined) {
    throw new Error("invaild input, objectinfo must be { cliid, proid, name, desid, designer }");
  }
  const instance = this;
  const { cliid, proid, name, desid, designer } = objectInfo;
  const thisClientName = name;
  const thisDesignerName = designer;
  const zeroAddtion = function (num) {
    if (num < 10) {
      return '0' + String(num);
    } else {
      return String(num);
    }
  }
  try {
    let thisProject;
    if (objectInfo.thisProject !== undefined) {
      thisProject = objectInfo.thisProject;
    } else {
      thisProjects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ proid: proid }), "/getProjects"));
      thisProject = thisProjects[0];
    }

    this.mother.getWhitePrompt("big", function (white, cancelBox) {
      let div_clone, div_clone2;
      let input_clone;
      let style;
      let inputTitleStyle, inputInputStyle, inputTextStyle;
      let ea;
      let tempObj, tempDate;
      let width, height;
      let whiteWidth;
      let barTop;
      let titleIndent;
      let inputMargin;
      let buttonBottom;
      let inputTitleTop;
      let injectionHtml;
      let inputTitles;
      let photoInput;
      let photographerInput;
      let interviewerInput;
      let pastValuesArr;
      let inputTargetMaps;

      ea = "px";
      whiteWidth = 800;
      barTop = 45;
      titleIndent = 46;
      inputMargin = 39;
      buttonBottom = 49;
      inputTitleTop = GeneralJs.isMac() ? 150 : 153;
      inputTitles = [
        "촬영 일자",
        "사진 작가",
        "인터뷰어"
      ];
      inputTargetMaps = [
        "contents.photo.date",
        "contents.photo.info.photographer",
        "contents.photo.info.interviewer",
      ];
      photoInput = {};
      photographerInput = {};
      interviewerInput = {};
      pastValuesArr = [];

      //style
      inputTitleStyle = {
        position: "absolute",
        left: "calc(50% + " + String(47) + ea + ")",
        fontSize: String(18) + ea,
        fontWeight: String(500),
        top: String(inputTitleTop) + ea,
      };

      inputInputStyle = {
        position: "absolute",
        left: "calc(50% + " + String(128) + ea + ")",
        background: "#f2f2f2",
        width: String(226) + ea,
        height: String(31) + ea,
        top: String(inputTitleTop - 1) + ea,
        borderRadius: String(4) + ea,
      };

      inputTextStyle = {
        position: "absolute",
        width: String(100) + "%",
        height: String(30) + ea,
        top: String(0) + ea,
        left: String(0) + ea,
        border: String(0),
        outline: String(0),
        fontSize: String(15) + ea,
        background: "transparent",
        textAlign: "center",
      };

      //calendar and white
      const calendar = instance.mother.makeCalendar((new Date()), function (e) {
        const grandMother = this.parentNode.parentNode;
        let allDates;

        photoInput.value = this.getAttribute("buttonValue") + " 14:00:00";
        photographerInput.focus();

        allDates = [];
        for (let i = 1; i < grandMother.children.length; i++) {
          for (let j = 0; j < grandMother.children[i].children.length; j++) {
            allDates.push({ dom: grandMother.children[i].children[j], day: j });
          }
        }

        for (let i = 0; i < allDates.length; i++) {
          allDates[i].dom.firstChild.style.transition = "all 0s ease";
          if (allDates[i].dom.firstChild.textContent !== '') {
            if (allDates[i].dom !== this) {
              allDates[i].dom.firstChild.style.fontWeight = String(200);
              allDates[i].dom.firstChild.style.color = (allDates[i].day > 4) ? "#2fa678" : "#404040";
            } else {
              allDates[i].dom.firstChild.style.fontWeight = String(400);
              allDates[i].dom.firstChild.style.color = "#2fa678";
            }
          }
        }

      }, { left: 19, title: 0.9, titleBottom: -4, margin: 1.6, height: 1.1, factorFont: 0.85, scaleUp: 1.4, arrow: { width: 11, bottom: 20, left: 29 } });
      white.appendChild(calendar.calendarBase);
      white.style.height = String(calendar.calendarHeight) + ea;
      white.style.transition = "all 0s";
      white.style.width = String(whiteWidth) + ea;
      white.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";
      white.style.top = "calc(calc(calc(100% - " + String(instance.belowHeight) + ea + ") / 2) - " + String(calendar.calendarHeight / 2) + ea + ")";

      //bar
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        height: "calc(100% - " + String(barTop * 2) + ea + ")",
        borderRight: "1px solid #dddddd",
        top: String(barTop) + ea,
        left: "50%",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      white.appendChild(div_clone);

      //proid
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        left: "calc(50% + " + String(titleIndent) + ea + ")",
        fontSize: String(23.5) + ea,
        fontWeight: String(500),
        top: String(65) + ea,
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      injectionHtml = '';
      injectionHtml += thisClientName;
      injectionHtml += " ";
      injectionHtml += '<b style="font-size:15px;color:#2fa678;font-weight:200">';
      injectionHtml += proid;
      injectionHtml += "</b>";

      div_clone.insertAdjacentHTML("beforeend", injectionHtml);
      div_clone.classList.add("hoverDefault");
      div_clone.addEventListener("click", function (e) {
        window.open(window.location.protocol + "//" + window.location.host + "/project?proid=" + proid, "_blank");
      });
      white.appendChild(div_clone);

      //desid
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style.top = String(99) + ea;
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      injectionHtml = '';
      injectionHtml += thisDesignerName;
      injectionHtml += " ";
      injectionHtml += '<b style="font-size:15px;color:#2fa678;font-weight:200">';
      injectionHtml += desid;
      injectionHtml += "</b>";

      div_clone.insertAdjacentHTML("beforeend", injectionHtml);
      div_clone.classList.add("hoverDefault");
      div_clone.addEventListener("click", function (e) {
        window.open(window.location.protocol + "//" + window.location.host + "/designer?desid=" + desid, "_blank");
      });
      white.appendChild(div_clone);

      //inputs
      for (let i = 0; i < inputTitles.length; i++) {

        //inputs - title
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        inputTitleStyle.top = String(inputTitleTop + (inputMargin * i)) + ea;
        for (let j in inputTitleStyle) {
          div_clone.style[j] = inputTitleStyle[j];
        }
        div_clone.textContent = inputTitles[i];
        white.appendChild(div_clone);

        //inputs - input
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        inputInputStyle.top = String((inputTitleTop - (GeneralJs.isMac() ? 1 : 4)) + (inputMargin * i)) + ea;
        for (let j in inputInputStyle) {
          div_clone.style[j] = inputInputStyle[j];
        }
        white.appendChild(div_clone);

        //inputs - text input
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.setAttribute("type", "text");

        tempObj = thisProject;
        for (let k of inputTargetMaps[i].split(".")) {
          tempObj = tempObj[k];
        }
        if (i === 0) {
          if (/^1[678]/.test(tempObj)) {
            tempObj = '-';
          } else {
            tempDate = new Date(tempObj);
            tempObj = String(tempDate.getFullYear()) + '-' + zeroAddtion(tempDate.getMonth() + 1) + '-' + zeroAddtion(tempDate.getDate()) + ' ' + zeroAddtion(tempDate.getHours()) + ':' + zeroAddtion(tempDate.getMinutes()) + ':' + zeroAddtion(tempDate.getSeconds());
          }
        }

        input_clone.value = tempObj;
        pastValuesArr.push(tempObj);
        for (let j in inputTextStyle) {
          input_clone.style[j] = inputTextStyle[j];
        }
        div_clone.appendChild(input_clone);
        if (i === 0) {
          photoInput = input_clone;
          photoInput.addEventListener("blur", function (e) {
            if (this.value !== "-") {
              if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(this.value)) {
                alert("포맷에 맞게 정확히 입력해주세요! (촬영 시간 포맷 : yyyy-mm-dd hh:mm:ss)");
              } else {
                if (Number((((this.value.split(" "))[1]).split(":"))[0].replace(/^0/, '')) < 7) {
                  alert("시간이 새벽으로 설정됩니다! 오전 / 오후 개념을 정확히 반영한 시간대를 알려주세요. (촬영 시간 포맷 : yyyy-mm-dd hh:mm:ss)");
                }
              }
            }
          });
        } else if (i === 1) {
          photographerInput = input_clone;
        } else {
          interviewerInput = input_clone;
        }

      }

      //button0
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("hoverDefault");
      style = {
        position: "absolute",
        bottom: String(buttonBottom) + ea,
        right: String(199) + ea,
        width: String(44.5) + ea,
        height: String(30) + ea,
        background: "#2fa678",
        borderRadius: String(3) + ea,
      };
      for (let j in style) {
        div_clone.style[j] = style[j];
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        fontSize: String(13.5) + ea,
        color: "white",
        fontWeight: String(600),
        position: "absolute",
        top: String(GeneralJs.isMac() ? 4.5 : 5.5) + ea,
        left: String(11) + ea,
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone2.textContent = "저장";
      div_clone.appendChild(div_clone2);
      div_clone.addEventListener("click", async function (e) {
        try {
          let message;
          let whereQuery, updateQuery;
          let tempDateArr, tempDateStr;
          let tempDateArr2, tempDateArr3;
          let title, description, start, end;
          let loadingBack, loadingIcon;
          let width;
          let style = {};
          let ea = "px";

          if (!/^1[6789]/.test(photoInput.value) && photoInput.value !== '' && photoInput.value !== '-' && /^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(photoInput.value.trim()) && photographerInput.value !== '' && photographerInput.value !== '-' && interviewerInput.value !== '' && interviewerInput.value !== '-') {

            loadingBack = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              width: String(100) + '%',
              height: String(100) + '%',
              top: String(0) + ea,
              left: String(0) + ea,
              background: "gray",
              opacity: String(0.25),
              borderRadius: String(5) + ea,
            };
            for (let z in style) {
              loadingBack.style[z] = style[z];
            }
            white.appendChild(loadingBack);

            width = 50;
            loadingIcon = instance.mother.returnLoadingIcon();
            style = {
              position: "absolute",
              zIndex: String(2),
              width: String(width) + ea,
              height: String(width) + ea,
              top: "calc(50% - " + String((width / 2) + 3) + ea + ")",
              left: "calc(50% - " + String(width / 2) + ea + ")",
            };
            for (let z in style) {
              loadingIcon.style[z] = style[z];
            }
            white.appendChild(loadingIcon);

            //update
            whereQuery = {};
            updateQuery = {};
            dateQuery = {};

            whereQuery.proid = proid;

            tempDateStr = GeneralJs.queryFilter(photoInput.value.trim());
            tempDateArr = tempDateStr.split(' ');
            tempDateArr2 = tempDateArr[0].split("-");
            tempDateArr3 = tempDateArr[1].split(":");

            updateQuery["contents.photo.date"] = new Date(Number(tempDateArr2[0]), Number(tempDateArr2[1].replace(/^0/g, '')) - 1, Number(tempDateArr2[2].replace(/^0/g, '')), Number(tempDateArr3[0].replace(/^0/g, '')), Number(tempDateArr3[1].replace(/^0/g, '')), Number(tempDateArr3[2].replace(/^0/g, '')));
            updateQuery["contents.photo.info.photographer"] = GeneralJs.queryFilter(photographerInput.value.trim());
            updateQuery["contents.photo.info.interviewer"] = GeneralJs.queryFilter(interviewerInput.value.trim());

            dateQuery["contents.photo.date"] = true;
            dateQuery["contents.photo.info.photographer"] = false;
            dateQuery["contents.photo.info.interviewer"] = false;

            await GeneralJs.ajaxPromise("where=" + JSON.stringify(whereQuery) + "&updateQuery=" + JSON.stringify(updateQuery) + "&dateQuery=" + JSON.stringify(dateQuery), "/rawUpdateProject");

            title = thisClientName + "C/" + thisDesignerName + "D 촬영";
            description = "포토 : " + updateQuery["contents.photo.info.photographer"];
            description += "\n";
            description += "인터뷰어 : " + updateQuery["contents.photo.info.interviewer"];
            start = updateQuery["contents.photo.date"];
            end = updateQuery["contents.photo.date"];
            // await GeneralJs.ajaxPromise("requestObj=" + JSON.stringify({ title, description, start, end }), "/makeSchedule");

            //slack
            message = '';
            message += thisClientName;
            message += " 고객님의 촬영 일자(" + photoInput.value + ")를 조정하였습니다! 원본 글, 원본 사진을 입력해주세요! link: ";
            await GeneralJs.ajaxPromise("linkmake=true&link=/contents&query=" + GeneralJs.queryFilter(JSON.stringify([ { standard: "proid", value: proid }, { standard: "view", value: "create" } ])) + "&message=" + GeneralJs.queryFilter(message) + "&channel=#400_customer", "/sendSlack");

            //end
            cancelBox.click();

          } else {
            alert("모든 값을 포맷에 맞춰 정확히 입력해주세요! (촬영 시간 포맷 : yyyy-mm-dd hh:mm:ss)");
          }
        } catch (e) {
          GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
          console.log(e);
        }
      });
      white.appendChild(div_clone);

      //button1
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("hoverDefault");
      style = {
        position: "absolute",
        bottom: String(buttonBottom) + ea,
        right: String(123) + ea,
        width: String(72) + ea,
        height: String(30) + ea,
        background: "#2fa678",
        borderRadius: String(3) + ea,
      };
      for (let j in style) {
        div_clone.style[j] = style[j];
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        fontSize: String(13.5) + ea,
        color: "white",
        fontWeight: String(600),
        position: "absolute",
        top: String(GeneralJs.isMac() ? 4.5 : 5.5) + ea,
        left: String(12) + ea,
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone2.textContent = "되돌리기";
      div_clone.appendChild(div_clone2);
      div_clone.addEventListener("click", function (e) {
        photoInput.value = pastValuesArr[0];
        photographerInput.value = pastValuesArr[1];
        interviewerInput.value = pastValuesArr[2];
      });
      white.appendChild(div_clone);

      //button2
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("hoverDefault");
      style = {
        position: "absolute",
        bottom: String(buttonBottom) + ea,
        right: String(46) + ea,
        width: String(73.5) + ea,
        height: String(30) + ea,
        background: "#2fa678",
        borderRadius: String(3) + ea,
      };
      for (let j in style) {
        div_clone.style[j] = style[j];
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        fontSize: String(13.5) + ea,
        color: "white",
        fontWeight: String(600),
        position: "absolute",
        top: String(GeneralJs.isMac() ? 4.5 : 5.5) + ea,
        left: String(12) + ea,
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone2.textContent = "촬영 취소";
      div_clone.appendChild(div_clone2);
      div_clone.addEventListener("click", function (e) {
        photoInput.value = '-';
        photographerInput.value = '';
        interviewerInput.value = '';
      });
      white.appendChild(div_clone);

    });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ContentsJs.prototype.cardViewMaker = function () {
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
      instance.mother.belowButtons.moveArea.left.style.display = "none";

      let initLoadingIcon, initLoadingIconWidth;
      let totalFather;
      let createViewBase;
      let createViewDoms;
      let div_clone, div_clone2, div_clone3;
      let input_clone, label_clone;
      let icon_clone;
      let blockStyle;
      let style;
      let ea;
      let leftMargin;
      let titles;
      let tempObj;
      let projects;
      let cliidArr;
      let clients;
      let desidArr;
      let cliidArrPure;
      let desidArrPure;
      let designers;
      let clickEvent, forcePhotoAdjustEvent, resetEvent;
      let originalHeight, compressHeight, expandHeight, expandGrayHeight;
      let domStyle, titleStyle, grayStyle, iconStyle;
      let raws;
      let overrideSearch;
      let allSearchTargets;
      let proidArrMaker;

      createViewDoms = [];
      ea = "px";
      leftMargin = 48;
      titles = [
        "발행전 프로젝트",
        "원본 종류 선택",
        "발행된 프로젝트"
      ];
      originalHeight = "calc(calc(100% / " + String(titles.length) + ") - " + String(21) + ea + ")";
      originalMarginBottom = String(21) + ea;
      compressHeight = String(3.2) + "vh";
      expandHeight = "calc(69.5% - 3.2vh - 63px)";
      expandGrayHeight = "calc(90% + 0.9vh)";
      raws = [
        "포트폴리오",
        "고객 후기",
        "원본 사진"
      ];
      allSearchTargets = [];

      //loading
      initLoadingIconWidth = 50;
      initLoadingIcon = instance.mother.returnLoadingIcon();
      initLoadingIcon.style.width = String(initLoadingIconWidth) + ea;
      initLoadingIcon.style.height = String(initLoadingIconWidth) + ea;
      initLoadingIcon.style.top = "calc(50% - " + String((instance.mother.belowHeight + initLoadingIconWidth) / 2) + ea + ")";
      initLoadingIcon.style.left = "calc(50% - " + String(initLoadingIconWidth / 2) + ea + ")";
      document.body.appendChild(initLoadingIcon);

      //new search setting
      overrideSearch = instance.mother.searchInput.parentNode.cloneNode(true);
      instance.mother.below.appendChild(overrideSearch);
      instance.overrideSearch = overrideSearch;
      instance.mother.searchInput.style.opacity = String(0);

      //make father
      totalFather = GeneralJs.nodes.div.cloneNode(true);
      totalFather.classList.add("totalFather");
      style = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - " + String(instance.belowHeight) + ea + ")",
        overflow: "hidden",
      };
      for (let i in style) {
        totalFather.style[i] = style[i];
      }

      //make base
      createViewBase = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
        display: "block",
        width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
        height: "calc(100% - " + String((leftMargin + 8) * 2) + ea + ")",
      };
      for (let i in style) {
        createViewBase.style[i] = style[i];
      }

      domStyle = {
        width: "100%",
        display: "block",
        height: originalHeight,
        marginBottom: originalMarginBottom,
        overflow: "hidden",
        borderBottom: String(0),
      };

      titleStyle = {
        fontSize: String(1.8) + "vh",
        fontWeight: String(700),
        display: "block",
        position: "relative",
        height: String(10) + "%",
        cursor: "pointer",
        color: "#404040",
      };

      iconStyle = {
        display: "block",
        position: "absolute",
        right: String(2) + ea,
        height: String(1.6) + 'vh',
        top: String(0.6) + 'vh',
      };

      grayStyle = {
        display: "block",
        height: "calc(" + String(100 - 10) + "% - " + String(10) + ea + ")",
        marginTop: String(10) + ea,
        background: "#f7f7f7",
        borderRadius: String(10) + ea,
        paddingRight: String(30) + ea,
        paddingLeft: String(30) + ea,
        boxSizing: "border-box",
      };

      blockStyle = {
        display: "block",
        position: "relative",
        textAlign: "center",
        height: "calc(100% - " + String(33) + ea + ")",
        top: String(16) + ea,
        overflow: "scroll"
      };

      resetEvent = function (e) {
        let num;

        if (document.getElementById("returnIcon") !== null) {
          document.getElementById("returnIcon").remove();
          document.getElementById("interActionIcon").remove();
        }
        if (document.getElementById("textZone") !== null) {
          document.getElementById("textZone").remove();
          createViewDoms[1].gray.firstChild.style.display = "block";
        }
        while (document.querySelectorAll(".whitePrompt").length !== 0) {
          document.body.removeChild(document.querySelector(".whitePrompt"));
        }

        num = 0;
        for (let { dom, title, icon, gray } of createViewDoms) {
          for (let i in domStyle) {
            dom.style[i] = domStyle[i];
          }

          for (let i in titleStyle) {
            title.style[i] = titleStyle[i];
          }
          if (title.firstElementChild !== null) {
            if (title.firstElementChild.nodeName === 'B') {
              title.firstElementChild.remove();
            }
          }
          title.firstChild.textContent = titles[num];
          title.setAttribute("cliid", "null");
          title.setAttribute("proid", "null");
          title.setAttribute("name", "null");
          title.setAttribute("desid", "null");
          title.setAttribute("designer", "null");

          for (let i in grayStyle) {
            gray.style[i] = grayStyle[i];
          }

          icon.style.display = "block";

          if (num === 0) {
            for (let { style } of gray.firstChild.children) {
              style.background = "#ffffff";
              style.color = "#404040";
            }
          } else if (num === 1) {
            for (let dom of gray.firstChild.children) {
              dom.setAttribute("cliid", "null");
              dom.setAttribute("proid", "null");
              dom.setAttribute("name", "null");
              dom.setAttribute("desid", "null");
              dom.setAttribute("designer", "null");
              dom.firstChild.setAttribute("cliid", "null");
              dom.firstChild.setAttribute("proid", "null");
              dom.firstChild.setAttribute("name", "null");
              dom.firstChild.setAttribute("desid", "null");
              dom.firstChild.setAttribute("designer", "null");
              dom.style.background = "#dddddd";
              dom.firstChild.style.color = "#aaaaaa";
              dom.firstChild.style.fontSize = String(2) + "vh";
            }
          } else {
            for (let { style } of gray.firstChild.children) {
              style.background = "#eaeaea";
              style.color = "#bbbbbb";
            }
          }

          num++;
        }
      }

      forcePhotoAdjustEvent = async function (e) {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
        try {
          const target = this.parentNode;
          let cliid, proid, name, desid, designer;
          cliid = target.getAttribute("cliid");
          proid = target.getAttribute("proid");
          name = target.getAttribute("name");
          desid = target.getAttribute("desid");
          designer = target.getAttribute("designer");
          if (cliid !== "null" && proid !== "null" && name !== "null" && desid !== "null" && designer !== "null") {
            await instance.photoAdjust({ cliid, proid, name, desid, designer });
          } else {
            await instance.mother.greenAlert("고객을 선택해주세요!");
          }
        } catch (e) {
          GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
          console.log(e);
        }
      }

      proidArrMaker = function (index) {
        return function (e) {
          let proidArr;
          let whiteOnEvent;
          const { gray } = createViewDoms[index];

          proidArr = [];
          for (let dom of gray.firstChild.children) {
            proidArr.push({
              index: dom.getAttribute("index"),
              name: dom.getAttribute("name"),
              proid: dom.getAttribute("proid"),
              id: dom.getAttribute("id"),
              cliid: dom.getAttribute("cliid"),
              desid: dom.getAttribute("desid"),
              designer: dom.getAttribute("designer"),
              portfolioExist: (dom.getAttribute("portfolioExist") === "true" ? true : false),
              reviewExist: (dom.getAttribute("reviewExist") === "true" ? true : false),
              rawLink: dom.getAttribute("rawLink"),
              photoDate: (dom.getAttribute("photoDate") === "false" ? null : new Date(dom.getAttribute("photoDate"))),
            });
          }

          whiteOnEvent = instance.filterViewMaker(proidArr, ((index === 0) ? "filter" : "sns"));
          whiteOnEvent.call(this, e);
        }
      }

      for (let z = 0; z < titles.length; z++) {

        tempObj = {};

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let i in domStyle) {
          div_clone.style[i] = domStyle[i];
        }

        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in titleStyle) {
          div_clone2.style[i] = titleStyle[i];
        }
        div_clone2.textContent = titles[z];
        div_clone2.addEventListener("click", resetEvent);
        div_clone2.setAttribute("cliid", "null");
        div_clone2.setAttribute("proid", "null");
        div_clone2.setAttribute("name", "null");
        div_clone2.setAttribute("desid", "null");
        div_clone2.setAttribute("designer", "null");

        if (z === 0) {
          icon_clone = SvgTong.stringParsing(instance.mother.returnFilter("#aaaaaa"));
          icon_clone.addEventListener("click", proidArrMaker(0));
          iconStyle.height = String(1.7) + 'vh';
        } else if (z === 1) {
          icon_clone = SvgTong.stringParsing(instance.mother.returnCalendar("#aaaaaa"));
          icon_clone.addEventListener("click", forcePhotoAdjustEvent);
          iconStyle.height = String(1.7) + 'vh';
        } else {
          icon_clone = SvgTong.stringParsing(instance.mother.returnFolder("#aaaaaa"));
          icon_clone.addEventListener("click", proidArrMaker(2));
          iconStyle.height = String(1.6) + 'vh';
        }
        for (let i in iconStyle) {
          icon_clone.style[i] = iconStyle[i];
        }
        tempObj.icon = icon_clone;
        div_clone2.appendChild(icon_clone);

        tempObj.title = div_clone2;
        div_clone.appendChild(div_clone2);

        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in grayStyle) {
          div_clone2.style[i] = grayStyle[i];
        }
        tempObj.gray = div_clone2;
        div_clone.appendChild(div_clone2);

        tempObj.dom = div_clone;
        createViewDoms.push(tempObj);
        createViewBase.appendChild(div_clone);
      }

      //first - get projects
      projects = JSON.parse(await GeneralJs.ajaxPromise("button=projectNoConid", "/getRawContents"));

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let i in blockStyle) {
        div_clone.style[i] = blockStyle[i];
      }

      style = {
        display: "inline-block",
        position: "relative",
        fontSize: String(1.3) + "vh",
        fontWeight: String(600),
        padding: String(15) + ea,
        paddingTop: (GeneralJs.isMac() ? String(6) : String(7.5)) + ea,
        paddingBottom: (GeneralJs.isMac() ? String(8) : String(7)) + ea,
        background: "white",
        margin: String(3) + ea,
        borderRadius: String(5) + ea,
        boxSizing: "border-box",
        cursor: "pointer",
        color: "#404040",
        transition: "all 0.3s ease",
      };

      clickEvent = function (e) {
        const getObj = GeneralJs.returnGet();
        const that = this;
        const { dom, title, gray } = createViewDoms[0];
        const { title: title2 } = createViewDoms[1];
        const { title: title3 } = createViewDoms[2];
        let appendHtml;
        let inputHtml;
        let cliid, proid, name, desid, designer;
        let thisClientName, thisDesignerName;
        let objectInfo;

        for (let i of GeneralJs.stacks.firstContentsCreateViewDoms) {
          if (i.getAttribute("index") === this.getAttribute("index")) {
            i.style.background = "#2fa678";
            i.style.color = "#ffffff";
            cliid = this.getAttribute("cliid");
            proid = this.getAttribute("proid");
            name = this.getAttribute("name");
            desid = this.getAttribute("desid");
            designer = this.getAttribute("designer");
          } else {
            i.style.background = "#ffffff";
            i.style.color = "#404040";
          }
        }

        thisClientName = this.getAttribute('name');
        thisDesignerName = this.getAttribute('designer');
        objectInfo = { cliid, proid, name, desid, designer };

        appendHtml = function (color, detail = false) {
          let html;
          html = '<b style="font-weight:300;color:' + color + '"> : ' + thisClientName;
          if (detail) {
            html += " 고객님의 포트폴리오 / 고객 후기 / 원본 사진";
          }
          html += '</b>';
          return html;
        }

        if (/\:/.test(title.textContent)) {
          inputHtml = (title.textContent.split(" : "))[0] + appendHtml("#2fa678");
        } else {
          inputHtml = title.textContent + appendHtml("#2fa678");
        }
        title.removeChild(title.firstChild);
        if (title.firstChild.nodeName === 'B') {
          title.removeChild(title.firstChild);
        }
        title.insertAdjacentHTML("afterbegin", inputHtml);
        title.setAttribute("cliid", cliid);
        title.setAttribute("proid", proid);
        title.setAttribute("name", name);
        title.setAttribute("desid", desid);
        title.setAttribute("designer", designer);
        title.style.color = "#2fa678";

        if (/\:/.test(title2.textContent)) {
          inputHtml = (title2.textContent.split(" : "))[0] + appendHtml("#2fa678", true);
        } else {
          inputHtml = title2.textContent + appendHtml("#2fa678", true);
        }
        title2.removeChild(title2.firstChild);
        if (title2.firstChild.nodeName === 'B') {
          title2.removeChild(title2.firstChild);
        }
        title2.insertAdjacentHTML("afterbegin", inputHtml);
        title2.setAttribute("cliid", cliid);
        title2.setAttribute("proid", proid);
        title2.setAttribute("name", name);
        title2.setAttribute("desid", desid);
        title2.setAttribute("designer", designer);
        title2.style.color = "#2fa678";

        if (/\:/.test(title3.textContent)) {
          inputHtml = (title3.textContent.split(" : "))[0];
        } else {
          inputHtml = title3.textContent;
        }
        title3.removeChild(title3.firstChild);
        if (title3.firstChild.nodeName === 'B') {
          title3.removeChild(title3.firstChild);
        }
        title3.insertAdjacentHTML("afterbegin", inputHtml);
        title3.style.color = "#cccccc";

        GeneralJs.timeouts.firstContentsCreateViewDomsTimeout = setTimeout(async function () {
          const { dom: dom0, title: title0, gray: gray0 } = createViewDoms[0];
          const { dom: dom1, title: title1, gray: gray1 } = createViewDoms[1];
          const { dom: dom2, title: title2, gray: gray2 } = createViewDoms[2];
          let thisProjects, thisProject;
          let zNum;

          gray0.style.background = "#f7f7f7";
          dom0.style.height = originalHeight;
          dom0.style.borderBottom = "";

          dom1.style.height = expandHeight;
          gray1.style.height = expandGrayHeight;
          gray1.style.marginTop = String(-0.9) + "vh";

          gray2.style.background = "white";
          dom2.style.height = compressHeight;
          dom2.style.borderBottom = "1px solid #ececec";

          zNum = 0;
          for (let z of gray1.firstChild.children) {
            z.style.background = "white";
            if (zNum === 0) {
              z.firstChild.style.color = that.getAttribute("portfolioExist") === "true" ? "#2fa678" : "#dddddd";
            } else if (zNum === 1) {
              z.firstChild.style.color = that.getAttribute("reviewExist") === "true" ? "#2fa678" : "#dddddd";
            } else {
              z.firstChild.style.color = that.getAttribute("rawLink") !== '' ? "#2fa678" : "#dddddd";
            }
            z.firstChild.style.fontSize = String(2.5) + "vh";

            z.setAttribute("cliid", cliid);
            z.setAttribute("proid", proid);
            z.setAttribute("name", name);
            z.setAttribute("desid", desid);
            z.setAttribute("designer", designer);

            z.firstChild.setAttribute("cliid", cliid);
            z.firstChild.setAttribute("proid", proid);
            z.firstChild.setAttribute("name", name);
            z.firstChild.setAttribute("desid", desid);
            z.firstChild.setAttribute("designer", designer);

            zNum++;
          }

          //adjust photo date
          thisProjects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ proid: proid }), "/getProjects"));
          thisProject = thisProjects[0];
          if (getObj.force !== undefined || /^1[6789]/.test(thisProject.contents.photo.date)) {
            instance.photoAdjust({ ...objectInfo, thisProject });
          }

          clearTimeout(GeneralJs.timeouts.firstContentsCreateViewDomsTimeout);
          GeneralJs.timeouts.firstContentsCreateViewDomsTimeout = null;
        }, 300);
      }

      GeneralJs.stacks.firstContentsCreateViewDoms = [];
      for (let i = 0; i < projects.length; i++) {
        if (!ContentsJs.abandonProjects.includes(projects[i].proid)) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          for (let j in style) {
            div_clone2.style[j] = style[j];
          }
          div_clone2.textContent = projects[i].proid + " | " + projects[i].name;
          div_clone2.addEventListener("click", clickEvent);
          div_clone2.setAttribute("index", String(i));
          div_clone2.setAttribute("name", projects[i].name);
          div_clone2.setAttribute("proid", projects[i].proid);
          div_clone2.setAttribute("id", projects[i].proid);
          div_clone2.setAttribute("cliid", projects[i].cliid);
          div_clone2.setAttribute("desid", projects[i].desid);
          div_clone2.setAttribute("designer", projects[i].designer);
          div_clone2.setAttribute("portfolioExist", String(projects[i].raw.portfolio.exist));
          div_clone2.setAttribute("reviewExist", String(projects[i].raw.review.exist));
          div_clone2.setAttribute("rawLink", String(projects[i].raw.photo.link));
          div_clone2.setAttribute("photoDate", (/^1[6789]/.test(projects[i].contents.photo.date) ? "false" : projects[i].contents.photo.date));

          allSearchTargets.push({ dom: div_clone2, keywords: [ projects[i].name, projects[i].proid, projects[i].cliid, projects[i].desid, projects[i].designer ] });

          GeneralJs.stacks.firstContentsCreateViewDoms.push(div_clone2);
          div_clone.appendChild(div_clone2);
        }
      }

      createViewDoms[0].gray.appendChild(div_clone);

      //second - get method
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let i in blockStyle) {
        div_clone.style[i] = blockStyle[i];
      }
      div_clone.style.height = "calc(100% - 54px)";
      div_clone.style.top = String(28) + ea;

      style = {
        display: "inline-flex",
        height: "100%",
        width: "calc(calc(100% / " + String(raws.length) + ") - " + String(5 * (raws.length - 1)) + "px)",
        background: "#dddddd",
        marginRight: String(5) + ea,
        marginBottom: String(5) + ea,
        borderRadius: String(5) + ea,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: String(1) + ea,
        position: "relative",
        cursor: "pointer",
      };

      intoTextEvent = async function (e) {
        try {
          const that = this;
          const proid = this.getAttribute("proid");
          const cliid = this.getAttribute("cliid");
          const desid = this.getAttribute("desid");
          const name = this.getAttribute("name");
          const designer = this.getAttribute("designer");
          const method = this.getAttribute("method");

          if (this.getAttribute("name") === "null") {
            return;
          }

          if (this.getAttribute("method") !== "photo") {
            const { text } = JSON.parse(await GeneralJs.ajaxPromise("id=" + proid + "&method=" + method + "&button=get", "/getRawContents"));
            const { dom, title, gray } = createViewDoms[1];
            let temp, tempArr;
            let interActionIcon, returnIcon, returnIconEvent;
            let div_clone, textArea_clone;
            let controlPannel;
            let button, buttonText;
            let buttonWidth, buttonHeight, buttonMargin;
            let style, buttonStyle, buttonDetailStyle;
            let margin;
            let ea;
            let saveFunction;

            ea = "px";

            createViewDoms[0].dom.style.height = String(0);
            createViewDoms[0].dom.style.marginBottom = String(0);
            createViewDoms[0].dom.style.borderBottom = "";
            createViewDoms[2].dom.style.height = String(0);
            createViewDoms[2].dom.style.marginBottom = String(0);
            createViewDoms[2].dom.style.borderBottom = "";

            dom.style.height = "calc(100% - 21px)";
            title.style.color = title.querySelector("b").style.color = "#404040";
            tempArr = title.querySelector("b").textContent.split(" ");
            temp = '';
            temp += tempArr[0] + ' ' + tempArr[1] + ' ' + tempArr[2] + ' ' + tempArr[3] + ' ';
            if (method === "portfolio") {
              temp += "포트폴리오";
            } else {
              temp += "고객 후기";
            }
            title.querySelector("b").textContent = temp;
            title.style.height = String(6.5) + "%";
            gray.style.marginTop = String(GeneralJs.isMac() ? -1.2 : -1.3) + "vh";
            gray.style.height = "calc(" + String(100 - 6.5) + "% + " + String(GeneralJs.isMac() ? 1.2 : 1.3) + "vh" + ")";
            gray.firstChild.style.display = "none";

            title.querySelector("svg").style.display = "none";

            interActionIcon = SvgTong.stringParsing(instance.mother.returnInterAction("#aaaaaa"));
            interActionIcon.classList.add("hoverDefault_lite");
            interActionIcon.id = "interActionIcon";
            style = {
              position: "absolute",
              top: String(4 + ((GeneralJs.isMac()) ? 0 : -5)) + ea,
              right: String(26) + ea,
              height: String(19.5) + ea,
              width: String(19.5 * SvgTong.getRatio(interActionIcon)) + ea,
              animation: "justfadeinoriginal 0.4s ease forwards",
            };
            for (let i in style) {
              interActionIcon.style[i] = style[i];
            }
            interActionIcon.addEventListener("click", function (e) {
              e.stopPropagation();
              that.setAttribute("method", (method === "portfolio" ? "review" : "portfolio"));
              GeneralJs.timeouts["interActionIconTimeouts0"] = setTimeout(function () {
                GeneralJs.timeouts["interActionIconTimeouts1"] = setTimeout(function () {
                  that.setAttribute("method", (method === "portfolio" ? "portfolio" : "review"));
                  clearTimeout(GeneralJs.timeouts["interActionIconTimeouts1"]);
                  GeneralJs.timeouts["interActionIconTimeouts1"] = null;
                  clearTimeout(GeneralJs.timeouts["interActionIconTimeouts0"]);
                  GeneralJs.timeouts["interActionIconTimeouts0"] = null;
                }, 0);
                that.click();
              }, 0);
              document.getElementById("returnIcon").remove();
              document.getElementById("interActionIcon").remove();
              document.getElementById("textZone").remove();
            });
            title.appendChild(interActionIcon);

            returnIcon = SvgTong.stringParsing(instance.mother.returnReturn("#aaaaaa"));
            returnIcon.classList.add("hoverDefault_lite");
            returnIcon.id = "returnIcon";
            style = {
              position: "absolute",
              top: String(2 + ((GeneralJs.isMac()) ? 0 : -5)) + ea,
              right: String(1) + ea,
              height: String(22) + ea,
              width: String(22 * SvgTong.getRatio(returnIcon)) + ea,
              animation: "justfadeinoriginal 0.4s ease forwards",
            };
            for (let i in style) {
              returnIcon.style[i] = style[i];
            }
            returnIconEvent = function (e) {
              e.stopPropagation();
              resetEvent.call(this.parentNode, e);
              GeneralJs.timeouts.returnIconResetEvent = setTimeout(function () {
                if (document.querySelector("#" + proid) !== null) {
                  document.querySelector("#" + proid).click();
                }
                clearTimeout(GeneralJs.timeouts.returnIconResetEvent);
                GeneralJs.timeouts.returnIconResetEvent = null;
              }, 0);
            }
            returnIcon.addEventListener("click", returnIconEvent);
            title.appendChild(returnIcon);

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.id = "textZone";
            for (let i in blockStyle) {
              div_clone.style[i] = blockStyle[i];
            }
            div_clone.style.background = "white";
            div_clone.style.height = "calc(100% - 54px)";
            div_clone.style.top = String(28) + ea;
            div_clone.style.borderRadius = String(5) + ea;

            margin = 20;

            textArea_clone = GeneralJs.nodes.textarea.cloneNode(true);
            textArea_clone.value = text;
            style = {
              width: "calc(100% - " + String(margin * 2) + ea + ")",
              height: "calc(100% - " + String(margin * 2) + ea + ")",
              position: "absolute",
              top: String(margin * 1) + ea,
              left: String(margin * 1) + ea,
              border: String(0),
              outline: String(0),
              fontSize: String(15) + ea,
              lineHeight: String(1.7),
            };
            for (let i in style) {
              textArea_clone.style[i] = style[i];
            }
            div_clone.appendChild(textArea_clone);

            controlPannel = GeneralJs.nodes.div.cloneNode(true);
            controlPannel.classList.add("hoverdefault_lite_reverse");
            style = {
              width: String(360) + ea,
              height: String(120) + ea,
              position: "absolute",
              bottom: String(margin) + ea,
              right: String(margin) + ea,
              background: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
              borderRadius: String(5) + ea,
            };
            for (let i in style) {
              controlPannel.style[i] = style[i];
            }

            buttonWidth = 141;
            buttonHeight = 35;
            buttonMargin = 6;
            controlPannel.style.height = String((buttonHeight * 3) + (buttonMargin * 6)) + ea;
            controlPannel.style.width = String((buttonWidth * 1.5) + (buttonMargin * 5)) + ea;

            buttonStyle = {
              width: String(buttonWidth) + ea,
              height: String(buttonHeight) + ea,
              color: "#2fa678",
              position: "absolute",
              top: String(buttonMargin * 2) + ea,
              right: String(buttonMargin * 2) + ea,
              background: "white",
              borderRadius: String(5) + ea,
              boxShadow: "0px 8px 15px -11px #2fa678",
            };

            buttonDetailStyle = {
              width: String(100) + "%",
              fontSize: String(13) + ea,
              fontWeight: String(600),
              color: "#2fa678",
              position: "absolute",
              top: String(GeneralJs.isMac() ? 7.1 : 8.5) + ea,
              textAlign: "center",
            };

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = proid + " | " + name;
            button.appendChild(buttonText);
            button.addEventListener("click", function (e) {
              window.open((window.location.protocol + "//" + window.location.host + "/project?proid=" + proid), "_blank");
            });
            controlPannel.appendChild(button);

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            button.style.top = String((buttonMargin * 2) + buttonHeight + buttonMargin) + ea;
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = cliid + " | " + name;
            button.appendChild(buttonText);
            button.addEventListener("click", function (e) {
              window.open((window.location.protocol + "//" + window.location.host + "/client?cliid=" + cliid), "_blank");
            });
            controlPannel.appendChild(button);

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            button.style.top = String((buttonMargin * 2) + ((buttonHeight + buttonMargin) * 2)) + ea;
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = desid + " | " + designer;
            button.appendChild(buttonText);
            button.addEventListener("click", function (e) {
              window.open((window.location.protocol + "//" + window.location.host + "/designer?desid=" + desid), "_blank");
            });
            controlPannel.appendChild(button);

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            button.style.width = String(buttonWidth * 0.5) + ea;
            button.style.right = String((buttonMargin * 3) + (buttonWidth * 1)) + ea;
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = "저장";
            button.appendChild(buttonText);

            saveFunction = function (e) {

              let refined, ajaxObj;
              let loadingIcon;
              let loadingBack;
              let loadingWidth;
              let style;
              let ea;

              loadingWidth = 50;
              ea = "px";

              refined = textArea_clone.value.replace(/[\=\&]/gi, '').replace(/[\=\&]/gi, '').replace(/[\=\&]/gi, '');
              ajaxObj = {
                button: "insertText",
                id: proid,
                clientName: name,
                designerName: designer,
                method: method,
                text: refined,
                parentId: ((method === "portfolio") ? "1k-vo9L_WB90ACup7WarklVIUFq1mf1ay" : "1jEV0Ii-_TnvpgTygs2-NkIiltmia91mf")
              };

              loadingBack = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                width: "100%",
                height: "100%",
                top: String(0) + ea,
                left: String(0) + ea,
                background: "gray",
                opacity: String(0.2),
                animation: "fadeupbacklite 0.3s ease forwards",
              };
              for (let i in style) {
                loadingBack.style[i] = style[i];
              }
              div_clone.appendChild(loadingBack);

              loadingIcon = instance.mother.returnLoadingIcon();
              style = {
                top: "calc(50% - " + String((loadingWidth / 2) + 2) + ea + ")",
                left: "calc(50% - " + String(loadingWidth / 2) + ea + ")",
                width: String(loadingWidth) + ea,
                height: String(loadingWidth) + ea,
              };
              for (let i in style) {
                loadingIcon.style[i] = style[i];
              }
              div_clone.appendChild(loadingIcon);

              GeneralJs.ajax(GeneralJs.objectToRawquery(ajaxObj), "/getRawContents", function (data) {
                const response = JSON.parse(data);
                const forefather = document.getElementById(proid);

                instance.mother.greenAlert(`${name} 고객님의 ${((method === "portfolio") ? "포트폴리오" : "고객 후기")}가 저장되었습니다!`);

                if (textArea_clone.value !== "" && textArea_clone.value !== "미지정") {
                  window.open(response.link, "_blank");
                  window.open("https://drive.google.com/drive/folders/" + ajaxObj.parentId + "?usp=sharing", "_blank");
                }

                if (textArea_clone.value !== "") {
                  that.style.color = "#2fa678";
                  if (that.firstChild !== null) {
                    that.firstChild.style.color = "#2fa678";
                  }
                  forefather.setAttribute(method + "Exist", "true");
                } else {
                  that.style.color = "rgb(221, 221, 221)";
                  if (that.firstChild !== null) {
                    that.firstChild.style.color = "rgb(221, 221, 221)";
                  }
                  forefather.setAttribute(method + "Exist", "false");
                }

                div_clone.removeChild(loadingBack);
                div_clone.removeChild(loadingIcon);

                returnIconEvent.call(returnIcon, {
                  type: "click",
                  stopPropagation: (new Function())
                });
              });
            }

            button.addEventListener("click", saveFunction);
            controlPannel.appendChild(button);

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            button.style.width = String(buttonWidth * 0.5) + ea;
            button.style.right = String((buttonMargin * 3) + (buttonWidth * 1)) + ea;
            button.style.top = String((buttonMargin * 2) + ((buttonHeight + buttonMargin) * 1)) + ea;
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = "되돌리기";
            button.appendChild(buttonText);
            button.addEventListener("click", function (e) {
              textArea_clone.value = text;
            });
            controlPannel.appendChild(button);

            button = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonStyle) {
              button.style[i] = buttonStyle[i];
            }
            button.style.width = String(buttonWidth * 0.5) + ea;
            button.style.right = String((buttonMargin * 3) + (buttonWidth * 1)) + ea;
            button.style.top = String((buttonMargin * 2) + ((buttonHeight + buttonMargin) * 2)) + ea;
            buttonText = GeneralJs.nodes.div.cloneNode(true);
            for (let i in buttonDetailStyle) {
              buttonText.style[i] = buttonDetailStyle[i];
            }
            buttonText.textContent = "미지정";
            button.appendChild(buttonText);
            button.addEventListener("click", function (e) {
              textArea_clone.value = "미지정";
              saveFunction.call(this, e);
            });
            controlPannel.appendChild(button);

            div_clone.appendChild(controlPannel);

            gray.appendChild(div_clone);

          } else {
            let { link } = JSON.parse(await GeneralJs.ajaxPromise("id=" + proid + "&button=photo", "/getRawContents"));
            link = decodeURIComponent(link);

            instance.mother.getWhitePrompt("big", function (white, cancelBox) {
              let whiteWidth, whiteHeight;
              let div_clone, div_clone2;
              let input_clone;
              let style;
              let buttonStyle, buttonTextStyle;
              let ea;

              ea = "px";
              whiteWidth = 650;
              whiteHeight = 257;

              white.style.width = String(whiteWidth) + ea;
              white.style.height = String(whiteHeight) + ea;
              white.style.top = "calc(calc(calc(100% - " + String(instance.mother.belowHeight) + ea + ") / 2) - " + String(whiteHeight / 2) + ea + ")";
              white.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";

              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                fontSize: String(28) + ea,
                fontWeight: String(500),
                position: "absolute",
                top: String(GeneralJs.isMac() ? 42 : 47) + ea,
                width: "100%",
                textAlign: "center",
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }
              div_clone.textContent = "원본 사진의 링크를 기입해주세요!";
              white.appendChild(div_clone);

              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                width: "100%",
                textAlign: "center",
                fontSize: String(15) + ea,
                color: "#2fa678",
                top: String(GeneralJs.isMac() ? 83 : 85) + ea,
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }
              div_clone.textContent = "*링크가 없을 경우, 드라이브 등의 클라우드상에서 링크를 만들어 기입해주세요.";
              white.appendChild(div_clone);

              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(GeneralJs.isMac() ? 117 : 118) + ea,
                width: String(540) + ea,
                height: String(40) + ea,
                background: "#f2f2f2",
                borderRadius: String(4) + ea,
                left: "calc(50% - " + String(270) + ea + ")",
                overflow: "hidden",
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              style = {
                width: "calc(100% - " + String(30) + ea + ")",
                height: String(37) + ea,
                left: String(15) + ea,
                position: "absolute",
                border: String(0) + ea,
                outline: String(0) + ea,
                background: "transparent",
                textAlign: "center",
                fontSize: String(15) + ea,
                overflow: "hidden",
              };
              for (let i in style) {
                input_clone.style[i] = style[i];
              }

              input_clone.setAttribute("type", "text");
              input_clone.value = link;
              div_clone.appendChild(input_clone);
              white.appendChild(div_clone);


              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("hoverDefault_lite");
              buttonStyle = {
                position: "absolute",
                bottom: String(GeneralJs.isMac() ? 50 : 49) + ea,
                width: String(47) + ea,
                height: String(32) + ea,
                background: "#2fa678",
                color: "white",
                borderRadius: String(3) + ea,
                left: "calc(50% - " + String(113) + ea + ")",
                fontSize: String(12) + ea,
              };
              for (let i in buttonStyle) {
                div_clone.style[i] = buttonStyle[i];
              }
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              buttonTextStyle = {
                position: "absolute",
                color: "white",
                fontSize: String(14) + ea,
                fontWeight: String(600),
                top: String(GeneralJs.isMac() ? 5 : 6) + ea,
                width: String(100) + '%',
                textAlign: "center",
              };
              for (let i in buttonTextStyle) {
                div_clone2.style[i] = buttonTextStyle[i];
              }
              div_clone2.textContent = "저장";
              div_clone.addEventListener("click", async function (e) {
                try {
                  let target, final;
                  const forefather = document.getElementById(proid);

                  target = encodeURIComponent(input_clone.value.trim());

                  if (!/^http/.test(target) && target !== '') {
                    alert("올바른 형식의 링크가 아닙니다!");
                    return;
                  } else {
                    final = target.trim().replace(/\=/g, '').replace(/\&/g, '');
                    await GeneralJs.ajaxPromise("button=insertPhoto" + "&id=" + proid + "&link=" + final + "&clientName=" + name + "&designerName=" + designer, "/getRawContents");

                    instance.mother.greenAlert(`${name} 고객님의 원본 사진이 저장되었습니다!`);

                    if (final !== "") {
                      that.style.color = "#2fa678";
                      if (that.firstChild !== null) {
                        that.firstChild.style.color = "#2fa678";
                      }
                      forefather.setAttribute("rawLink", "true");
                    } else {
                      that.style.color = "rgb(221, 221, 221)";
                      if (that.firstChild !== null) {
                        that.firstChild.style.color = "rgb(221, 221, 221)";
                      }
                      forefather.setAttribute("rawLink", "");
                    }

                    cancelBox.click();
                  }
                } catch (e) {
                  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
                  console.log(e);
                }
              });
              div_clone.appendChild(div_clone2);
              white.appendChild(div_clone);

              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("hoverDefault_lite");
              for (let i in buttonStyle) {
                div_clone.style[i] = buttonStyle[i];
              }
              div_clone.style.width = String(70) + ea;
              div_clone.style.left = "calc(50% - " + String(62) + ea + ")";
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              for (let i in buttonTextStyle) {
                div_clone2.style[i] = buttonTextStyle[i];
              }
              div_clone2.textContent = "되돌리기";
              div_clone.addEventListener("click", function (e) {
                input_clone.value = link;
                input_clone.focus();
              });
              div_clone.appendChild(div_clone2);
              white.appendChild(div_clone);


              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("hoverDefault_lite");
              for (let i in buttonStyle) {
                div_clone.style[i] = buttonStyle[i];
              }
              div_clone.style.left = "calc(50% + " + String(13) + ea + ")";
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              for (let i in buttonTextStyle) {
                div_clone2.style[i] = buttonTextStyle[i];
              }
              div_clone2.textContent = "복사";
              div_clone.addEventListener("click", async function (e) {
                try {
                  await window.navigator.clipboard.writeText(input_clone.value);
                  instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
                } catch (e) {
                  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
                  console.log(e);
                }
              });
              div_clone.appendChild(div_clone2);
              white.appendChild(div_clone);


              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("hoverDefault_lite");
              for (let i in buttonStyle) {
                div_clone.style[i] = buttonStyle[i];
              }
              div_clone.style.left = "calc(50% + " + String(65) + ea + ")";
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              for (let i in buttonTextStyle) {
                div_clone2.style[i] = buttonTextStyle[i];
              }
              div_clone2.textContent = "이동";
              div_clone.addEventListener("click", function (e) {
                window.open(input_clone.value, "_blank");
              });
              div_clone.appendChild(div_clone2);
              white.appendChild(div_clone);

              input_clone.focus();

            });
          }

        } catch (e) {
          GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
          console.log(e);
        }
      }

      GeneralJs.stacks.secondContentsCreateViewDoms = [];
      for (let i = 0; i < raws.length; i++) {
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone2.setAttribute("cliid", "null");
        div_clone2.setAttribute("proid", "null");
        div_clone2.setAttribute("name", "null");
        div_clone2.setAttribute("desid", "null");
        div_clone2.setAttribute("designer", "null");
        div_clone2.setAttribute("method", ([ "portfolio", "review", "photo" ])[i]);

        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        div_clone3.classList.add("hoverDefault");
        div_clone3.style.fontSize = String(2) + "vh";
        div_clone3.style.fontWeight = String(300);
        div_clone3.style.color = "#aaaaaa";
        div_clone3.style.position = "absolute";
        div_clone3.style.marginTop = String(GeneralJs.isMac() ? -1 : 0) + "vh";
        div_clone3.textContent = raws[i];
        div_clone3.setAttribute("cliid", "null");
        div_clone3.setAttribute("proid", "null");
        div_clone3.setAttribute("name", "null");
        div_clone3.setAttribute("desid", "null");
        div_clone3.setAttribute("designer", "null");
        div_clone3.setAttribute("method", ([ "portfolio", "review", "photo" ])[i]);
        div_clone2.appendChild(div_clone3);

        div_clone2.addEventListener("click", intoTextEvent);
        GeneralJs.stacks.secondContentsCreateViewDoms.push(div_clone2);
        div_clone.appendChild(div_clone2);
      }

      createViewDoms[1].gray.appendChild(div_clone);

      //third - complete contents
      projects = JSON.parse(await GeneralJs.ajaxPromise("button=projectYesConid", "/getRawContents"));

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let i in blockStyle) {
        div_clone.style[i] = blockStyle[i];
      }

      style = {
        display: "inline-block",
        position: "relative",
        fontSize: String(1.3) + "vh",
        fontWeight: String(600),
        padding: String(15) + ea,
        paddingTop: (GeneralJs.isMac() ? String(6) : String(7)) + ea,
        paddingBottom: (GeneralJs.isMac() ? String(8) : String(7)) + ea,
        background: "#eaeaea",
        margin: String(3) + ea,
        borderRadius: String(5) + ea,
        boxSizing: "border-box",
        cursor: "pointer",
        color: "#bbbbbb",
        transition: "all 0.3s ease",
      };

      clickEvent = function (e) {
        const that = this;
        const { dom, title, gray } = createViewDoms[2];
        const { title: title2 } = createViewDoms[1];
        const { title: title3 } = createViewDoms[0];
        let appendHtml;
        let inputHtml;
        let cliid, proid, name, desid, designer;

        for (let i of GeneralJs.stacks.thirdContentsCreateViewDoms) {
          if (i.getAttribute("index") === this.getAttribute("index")) {
            i.style.background = "#2fa678";
            i.style.color = "#ffffff";
            cliid = this.getAttribute("cliid");
            proid = this.getAttribute("proid");
            name = this.getAttribute("name");
            desid = this.getAttribute("desid");
            designer = this.getAttribute("designer");
          } else {
            i.style.background = "#eaeaea";
            i.style.color = "#bbbbbb";
          }
        }

        appendHtml = function (color, detail = false) {
          let html;
          html = '<b style="font-weight:300;color:' + color + '"> : ' + that.getAttribute('name');
          if (detail) {
            html += " 고객님의 포트폴리오 / 고객 후기 / 원본 사진";
          }
          html += '</b>';
          return html;
        }

        if (/\:/.test(title.textContent)) {
          inputHtml = (title.textContent.split(" : "))[0] + appendHtml("#2fa678");
        } else {
          inputHtml = title.textContent + appendHtml("#2fa678");
        }

        title.removeChild(title.firstChild);
        if (title.firstChild.nodeName === 'B') {
          title.removeChild(title.firstChild);
        }
        title.insertAdjacentHTML("afterbegin", inputHtml);
        title.setAttribute("cliid", cliid);
        title.setAttribute("proid", proid);
        title.setAttribute("name", name);
        title.setAttribute("desid", desid);
        title.setAttribute("designer", designer);
        title.style.color = "#2fa678";

        if (/\:/.test(title2.textContent)) {
          inputHtml = (title2.textContent.split(" : "))[0] + appendHtml("#2fa678", true);
        } else {
          inputHtml = title2.textContent + appendHtml("#2fa678", true);
        }

        title2.removeChild(title2.firstChild);
        if (title2.firstChild.nodeName === 'B') {
          title2.removeChild(title2.firstChild);
        }
        title2.insertAdjacentHTML("afterbegin", inputHtml);
        title2.setAttribute("cliid", cliid);
        title2.setAttribute("proid", proid);
        title2.setAttribute("name", name);
        title2.setAttribute("desid", desid);
        title2.setAttribute("designer", designer);
        title2.style.color = "#2fa678";

        if (/\:/.test(title3.textContent)) {
          inputHtml = (title3.textContent.split(" : "))[0] ;
        } else {
          inputHtml = title3.textContent;
        }

        title3.removeChild(title3.firstChild);
        if (title3.firstChild.nodeName === 'B') {
          title3.removeChild(title3.firstChild);
        }
        title3.insertAdjacentHTML("afterbegin", inputHtml);
        title3.style.color = "#cccccc";

        GeneralJs.timeouts.thirdContentsCreateViewDomsTimeout = setTimeout(function () {
          const { dom: dom0, title: title0, gray: gray0 } = createViewDoms[0];
          const { dom: dom1, title: title1, gray: gray1 } = createViewDoms[1];
          const { dom: dom2, title: title2, gray: gray2 } = createViewDoms[2];
          let zNum;

          gray0.style.background = "white";
          dom0.style.height = compressHeight;
          dom0.style.borderBottom = "1px solid #ececec";

          dom1.style.height = expandHeight;
          gray1.style.height = expandGrayHeight;
          gray1.style.marginTop = String(-0.9) + "vh";

          gray2.style.background = "#f7f7f7";
          dom2.style.height = originalHeight;
          dom2.style.borderBottom = "";

          zNum = 0;
          for (let z of gray1.children[0].children) {
            z.style.background = "white";
            if (zNum === 0) {
              z.firstChild.style.color = that.getAttribute("portfolioExist") === "true" ? "#2fa678" : "#dddddd";
            } else if (zNum === 1) {
              z.firstChild.style.color = that.getAttribute("reviewExist") === "true" ? "#2fa678" : "#dddddd";
            } else {
              z.firstChild.style.color = that.getAttribute("rawLink") !== '' ? "#2fa678" : "#dddddd";
            }
            z.firstChild.style.fontSize = String(2.5) + "vh";

            z.setAttribute("cliid", cliid);
            z.setAttribute("proid", proid);
            z.setAttribute("name", name);
            z.setAttribute("desid", desid);
            z.setAttribute("designer", designer);

            z.firstChild.setAttribute("cliid", cliid);
            z.firstChild.setAttribute("proid", proid);
            z.firstChild.setAttribute("name", name);
            z.firstChild.setAttribute("desid", desid);
            z.firstChild.setAttribute("designer", designer);

            zNum++;
          }

          clearTimeout(GeneralJs.timeouts.thirdContentsCreateViewDomsTimeout);
          GeneralJs.timeouts.thirdContentsCreateViewDomsTimeout = null;
        }, 300);
      }

      GeneralJs.stacks.thirdContentsCreateViewDoms = [];
      for (let i = 0; i < projects.length; i++) {
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone2.textContent = projects[i].proid + " | " + projects[i].name;
        div_clone2.addEventListener("click", clickEvent);
        div_clone2.setAttribute("index", String(i));
        div_clone2.setAttribute("name", projects[i].name);
        div_clone2.setAttribute("proid", projects[i].proid);
        div_clone2.setAttribute("id", projects[i].proid);
        div_clone2.setAttribute("cliid", projects[i].cliid);
        div_clone2.setAttribute("desid", projects[i].desid);
        div_clone2.setAttribute("designer", projects[i].designer);
        div_clone2.setAttribute("portfolioExist", String(projects[i].raw.portfolio.exist));
        div_clone2.setAttribute("reviewExist", String(projects[i].raw.review.exist));
        div_clone2.setAttribute("rawLink", String(projects[i].raw.photo.link));

        allSearchTargets.push({ dom: div_clone2, keywords: [ projects[i].name, projects[i].proid, projects[i].cliid, projects[i].desid, projects[i].designer ] });

        GeneralJs.stacks.thirdContentsCreateViewDoms.push(div_clone2);
        div_clone.appendChild(div_clone2);
      }

      createViewDoms[2].gray.appendChild(div_clone);

      //make search event
      instance.overrideSearch.querySelector("input").addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          let targetDoms, intervalId, num;
          targetDoms = [];
          for (let { dom, keywords } of allSearchTargets) {
            if (keywords.includes(this.value)) {
              targetDoms.push(dom);
            }
          }
          if (targetDoms.length >= 1) {

            while (document.querySelectorAll(".whitePrompt").length !== 0) {
              document.body.removeChild(document.querySelector(".whitePrompt"));
            }
            createViewDoms[0].title.click();
            targetDoms[0].click();

            if (targetDoms.length > 1) {
              num = 1;
              intervalId = setInterval(function () {
                if (num < targetDoms.length) {
                  while (document.querySelectorAll(".whitePrompt").length !== 0) {
                    document.body.removeChild(document.querySelector(".whitePrompt"));
                  }
                  targetDoms[num].click();
                  num = num + 1;
                } else {
                  clearInterval(intervalId);
                }
              }, 1000);
            }

          }
        }
      });

      //end
      totalFather.appendChild(createViewBase);
      totalFather.classList.add("fadein");
      totalContents.appendChild(totalFather);
      instance.totalFather = totalFather;
      instance.createViewDoms = createViewDoms;
      document.body.removeChild(initLoadingIcon);
      instance.overrideSearch.querySelector("input").focus();
    }
    instance.onView = "father";
  }
}

ContentsJs.prototype.viewDetail = async function (mother, leftMargin, fontSize, thisCase) {
  const instance = this;
  try {
    const { conid, pid } = thisCase;
    const [ portfolio, review, photoGs ] = JSON.parse(await GeneralJs.ajaxPromise("id=" + conid + "&noFlat=true", "/getContentsDetail"));
    let div_clone, div_clone2;
    let style;
    let scrollBox, contentsBox, photoKeyBox, photoScrollBox, photoBox, titleBox, smallTalkTitleBox, smallTalkContentsBox;
    let photoStyle, photoScrollStyle, contentsStyle, photoKeyStyle, titleStyle, smallTalkTitleStyle, smallTalkContentsStyle;
    let margin;
    let ea;
    let pastKey = null;
    let totalWidth;

    ea = "px";
    margin = fontSize * (0.58);

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
      height: String(100) + "%",
      top: String(0) + ea,
      left: String(leftMargin) + ea,
      border: "1px solid #dddddd",
      borderRadius: String(5) + ea,
      overflow: "hidden",
      animation: "justfadeinoriginal 0.4s ease forwards",
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    scrollBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "block",
      position: "relative",
      left: String(fontSize * 1.6) + ea,
      top: String(fontSize * 2) + ea,
      width: "calc(100% - " + String(fontSize * 3.2) + ea + ")",
      height: "calc(100% - " + String(fontSize * 4) + ea + ")",
      overflow: "scroll",
    };
    for (let i in style) {
      scrollBox.style[i] = style[i];
    }
    div_clone.appendChild(scrollBox);

    style = {
      display: "block",
      position: "relative",
      width: String(100) + "%",
      fontSize: String(fontSize) + ea,
      fontWeight: String(300),
      lineHeight: String(1.7),
      marginBottom: String(56) + ea,
    };

    contentsStyle = JSON.parse(JSON.stringify(style));
    titleStyle = JSON.parse(JSON.stringify(style));
    smallTalkTitleStyle = JSON.parse(JSON.stringify(style));
    smallTalkContentsStyle = JSON.parse(JSON.stringify(style));

    photoKeyStyle = {
      display: "block",
      position: "relative",
      width: String(100) + "%",
      height: String(fontSize * 15) + ea,
      marginBottom: String(54) + ea,
      overflow: "scroll",
      borderRadius: String(6) + ea,
      border: "1px solid #dddddd",
      boxSizing: "border-box",
    };

    photoScrollStyle = {
      position: "absolute",
      left: String(fontSize * 1) + ea,
      top: String(fontSize * 1) + ea,
      height: String(fontSize * 13) + ea,
      width: String(5000) + ea,
    };

    photoStyle = {
      display: "inline-block",
      position: "relative",
      height: String(fontSize * 13) + ea,
      marginRight: String(margin) + ea,
      borderRadius: String(3) + ea,
      cursor: "pointer",
    };

    titleStyle.fontWeight = "700";
    titleStyle.fontSize = String(fontSize + 2) + ea;
    titleStyle.marginBottom = String(2) + ea;

    smallTalkTitleStyle.color = "#2fa678";
    smallTalkTitleStyle.fontWeight = "600";
    smallTalkTitleStyle.marginBottom = String(1) + ea;
    smallTalkTitleStyle.fontSize = String(fontSize - 2) + ea;

    smallTalkContentsStyle.fontSize = smallTalkTitleStyle.fontSize;


    //portfolio
    for (let { photoKey, title, contents, smallTalk: { title: smallTalkTitle, contents: smallTalkContents } } of portfolio) {

      if (pastKey !== null) {

        //photo base box
        photoKeyBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in photoKeyStyle) {
          photoKeyBox.style[i] = photoKeyStyle[i];
        }

        //photo scroll box
        photoScrollBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in photoScrollStyle) {
          photoScrollBox.style[i] = photoScrollStyle[i];
        }

        //photos
        totalWidth = 0;
        if (pastKey !== photoKey) {
          for (let p = pastKey + 1; p < photoKey + 1; p++) {
            photoBox = GeneralJs.nodes.img.cloneNode(true);
            photoBox.src = S3HOST + "/corePortfolio/listImage/" + pid + "/t" + String(p) + pid + ".jpg";
            photoBox.classList.add("hoverDefault_lite");
            photoBox.addEventListener("dblclick", function (e) {
              e.preventDefault();
              window.open(S3HOST + "/corePortfolio/original/" + pid + "/i" + String(p) + pid + ".jpg", "_blank");
            });
            for (let i in photoStyle) {
              photoBox.style[i] = photoStyle[i];
            }
            photoScrollBox.appendChild(photoBox);
            totalWidth += (fontSize * 13) * ((photoGs[p - 1] === 'g') ? (297 / 210) : (210 / 297));
            totalWidth += margin;
          }
        } else {
          photoBox = GeneralJs.nodes.img.cloneNode(true);
          photoBox.src = S3HOST + "/corePortfolio/listImage/" + pid + "/t" + String(photoKey) + pid + ".jpg";
          for (let i in photoStyle) {
            photoBox.style[i] = photoStyle[i];
          }
          photoScrollBox.appendChild(photoBox);
          totalWidth += (fontSize * 13) * ((photoGs[photoKey - 1] === 'g') ? (297 / 210) : (210 / 297));
          totalWidth += margin;
        }

        totalWidth += margin;
        photoScrollBox.style.width = String(totalWidth) + ea;
        photoKeyBox.appendChild(photoScrollBox);
        scrollBox.appendChild(photoKeyBox);

        //title
        titleBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in titleStyle) {
          titleBox.style[i] = titleStyle[i];
        }
        titleBox.textContent = title;
        scrollBox.appendChild(titleBox);
      }

      //contents
      contentsBox = GeneralJs.nodes.div.cloneNode(true);
      for (let i in contentsStyle) {
        contentsBox.style[i] = contentsStyle[i];
      }
      contentsBox.textContent = contents;
      scrollBox.appendChild(contentsBox);


      if (smallTalkTitle !== '') {
        contentsBox.style.marginBottom = String(10) + ea;

        //small talk title
        smallTalkTitleBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in smallTalkTitleStyle) {
          smallTalkTitleBox.style[i] = smallTalkTitleStyle[i];
        }
        smallTalkTitleBox.textContent = smallTalkTitle;
        scrollBox.appendChild(smallTalkTitleBox);

        //small talk contents
        smallTalkContentsBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in smallTalkContentsStyle) {
          smallTalkContentsBox.style[i] = smallTalkContentsStyle[i];
        }
        smallTalkContentsBox.textContent = smallTalkContents;
        scrollBox.appendChild(smallTalkContentsBox);
      }

      pastKey = photoKey;
    }

    //bar
    if (review.length > 0) {
      for (let i = 0; i < 3; i++) {
        photoKeyBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in photoKeyStyle) {
          photoKeyBox.style[i] = photoKeyStyle[i];
        }
        photoKeyBox.style.height = String(0) + ea;
        photoKeyBox.style.borderTop = String(0) + ea;
        if (i !== 1) {
          photoKeyBox.style.border = String(0) + ea;
        }
        scrollBox.appendChild(photoKeyBox);
      }
    }

    //review
    for (let { type, photos, contents } of review) {
      if (type === "init") {
        for (let { answer } of contents) {
          contentsBox = GeneralJs.nodes.div.cloneNode(true);
          for (let i in contentsStyle) {
            contentsBox.style[i] = contentsStyle[i];
          }
          contentsBox.textContent = answer;
          scrollBox.appendChild(contentsBox);
        }
      } else {

        //photo entire box
        photoKeyBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in photoKeyStyle) {
          photoKeyBox.style[i] = photoKeyStyle[i];
        }

        //photo scroll box
        photoScrollBox = GeneralJs.nodes.div.cloneNode(true);
        for (let i in photoScrollStyle) {
          photoScrollBox.style[i] = photoScrollStyle[i];
        }

        //photos
        totalWidth = 0;
        for (let p of photos) {
          photoBox = GeneralJs.nodes.img.cloneNode(true);
          photoBox.src = S3HOST + "/corePortfolio/listImage/" + pid + "/t" + String(p) + pid + ".jpg";
          photoBox.classList.add("hoverDefault_lite");
          photoBox.addEventListener("dblclick", function (e) {
            e.preventDefault();
            window.open(S3HOST + "/corePortfolio/original/" + pid + "/i" + String(p) + pid + ".jpg", "_blank");
          });
          for (let i in photoStyle) {
            photoBox.style[i] = photoStyle[i];
          }
          photoScrollBox.appendChild(photoBox);
          totalWidth += (fontSize * 13) * ((photoGs[p - 1] === 'g') ? (297 / 210) : (210 / 297));
          totalWidth += margin;
        }

        totalWidth += margin;
        photoScrollBox.style.width = String(totalWidth) + ea;
        photoKeyBox.appendChild(photoScrollBox);
        scrollBox.appendChild(photoKeyBox);

        //review contents
        for (let { question, answer } of contents) {
          contentsBox = GeneralJs.nodes.div.cloneNode(true);
          for (let i in contentsStyle) {
            contentsBox.style[i] = contentsStyle[i];
          }
          contentsBox.style.fontWeight = String(600);
          contentsBox.style.marginBottom = String(4) + ea;
          contentsBox.textContent = "Q. " + question;
          scrollBox.appendChild(contentsBox);

          contentsBox = GeneralJs.nodes.div.cloneNode(true);
          for (let i in contentsStyle) {
            contentsBox.style[i] = contentsStyle[i];
          }
          contentsBox.style.fontWeight = String(300);
          contentsBox.style.marginBottom = String(24) + ea;
          contentsBox.textContent = "A. " + answer;
          scrollBox.appendChild(contentsBox);
        }

        contentsBox.style.marginBottom = contentsStyle.marginBottom;

      }
    }

    mother.appendChild(div_clone);
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ContentsJs.prototype.whiteContentsMaker = function (thisCase, mother) {
  const instance = this;
  let { standard, info } = DataPatch.contentsWhiteViewStandard();
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, textArea_clone;
  let propertyBox, detailBox;
  let style;
  let ea = "px";
  let titleHeight, titleFontSize, topMargin, leftMargin;
  let fontSize;
  let motherHeight;
  let rightArrowBox, leftArrowBox;
  let rightArrow, leftArrow;
  let hInitial, hInitialBox;
  let mInitial, mInitialBox;
  let updateEventFunction;
  let contentsBoxHeight, contentsBoxBottom;
  let lineHeightRatio;
  let detailTongTarget, detailTargetHeightConst;
  let detailFocusEvent, detailBlurEvent;
  let visualSpecificMarginTop;
  let textAreas;
  let dragstartEventFunction, dragendEventFunction, dragenterEventFunction, dragleaveEventFunction, dragoverEventFunction, dropEventFunction;
  let titleArea, contentsArea;

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

  //pid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[0]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: "#404040",
    fontSize: String(titleFontSize) + ea,
    fontWeight: String(600),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (9 / 60) : (2 / 60))) + ea,
    left: String(leftMargin - 3) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", function (e) {
    const homeliaison = "https://home-liaison.com";
    window.open(homeliaison + "/portdetail.php?qqq=" + thisCase.pid, "_blank");
    if (thisCase.rid !== "re999") {
      window.open(homeliaison + "/revdetail.php?qqq=" + thisCase.rid, "_blank");
    }
  });
  div_clone2.appendChild(div_clone3);

  //conid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[1]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: "#2fa678",
    fontSize: String(titleFontSize * (19 / 42)) + ea,
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * 2.3) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);

  //right arrow
  rightArrow = SvgTong.stringParsing(this.mother.returnArrow("right", "#2fa678"));
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
  leftArrow = SvgTong.stringParsing(this.mother.returnArrow("left", "#2fa678"));
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
  hInitial = SvgTong.stringParsing(this.mother.returnHinitial("#2fa678"));
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
  hInitialBox.style.background = "white";
  div_clone2.appendChild(hInitialBox);

  //m initial icon
  mInitial = SvgTong.stringParsing(this.mother.returnMinitial("#2fa678"));
  for (let i in style) {
    mInitial.style[i] = style[i];
  }
  mInitial.style.right = String(leftMargin + (leftMargin * (50 / 60))) + ea;
  mInitial.style.width = String(leftMargin * (GeneralJs.isMac() ? (12 / 60) : (11 / 60))) + ea;
  div_clone2.appendChild(mInitial);

  //m initial button
  mInitialBox = GeneralJs.nodes.div.cloneNode(true);
  mInitialBox.classList.add("hoverdefault_reverse");
  for (let i in style) {
    mInitialBox.style[i] = style[i];
  }
  mInitialBox.style.opacity = '';
  mInitialBox.style.right = String(leftMargin + (leftMargin * (48 / 60))) + ea;
  mInitialBox.style.height = String(leftMargin * (20 / 60)) + ea;
  mInitialBox.style.width = String(leftMargin * (18 / 60)) + ea;
  mInitialBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  mInitialBox.style.background = "white";
  div_clone2.appendChild(mInitialBox);

  //bar
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    background: "#dddddd",
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
        const map = DataPatch.contentsMap();
        const thisMap = map[this.parentNode.getAttribute("index")];

        if (thisMap.type === "date" && e.type === "click") {

          cancel_inputBack.style.background = "white";
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
            background: "white",
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

          cancel_inputBack.style.background = "white";
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

          cancel_inputBack.style.background = "white";
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
            background: "white",
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

          cancel_inputBack.style.background = "white";
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
    const { info } = DataPatch.contentsWhiteViewStandard();
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

    window.localStorage.setItem("contents_whiteOrder", JSON.stringify(thisStorage));

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

  if (window.localStorage.getItem("contents_whiteOrder") !== null && window.localStorage.getItem("contents_whiteOrder") !== undefined) {
    info = JSON.parse(window.localStorage.getItem("contents_whiteOrder"));
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
  contentsArea = div_clone2;
  this.whiteBox.propertyBox = propertyBox;

  //detail box
  detailBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    height: "100%",
    bottom: String(0) + ea,
    right: String(leftMargin) + ea,
    width: "calc(55% - " + String(leftMargin) + ea + ")",
  };
  for (let i in style) {
    detailBox.style[i] = style[i];
  }

  //detail title box
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = "DETAIL";
  style = {
    position: "absolute",
    width: String(fontSize * 5) + ea,
    height: "100%",
    fontSize: String(fontSize) + ea,
    fontWeight: String(700),
    top: String(-1) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  detailBox.appendChild(div_clone3);

  //detail text box tong
  detailTongTarget = [
    { column: "history", name: "포트폴리오", dom: null },
    { column: "space", name: "고객 후기", dom: null },
  ];
  visualSpecificMarginTop = fontSize * (1 / 5);
  detailTargetHeightConst = (fontSize * 1) + visualSpecificMarginTop;
  textAreas = [];

  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    left: String(fontSize * 5) + ea,
    width: "calc(100% - " + String((fontSize * 5) + 1) + ea + ")",
    height: "100%",
    fontSize: String(fontSize) + ea,
    fontWeight: String(300),
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }

  for (let i = 0; i < detailTongTarget.length; i++) {

    //focus event
    detailFocusEvent = function (e) {
      const thisIndex = i;
      for (let { dom } of detailTongTarget) {
        if (Number(dom.getAttribute("index")) !== thisIndex) {
          dom.style.height = "calc(" + String(5) + "% - " + String(detailTargetHeightConst) + ea + ")";
        } else {
          this.parentElement.scroll(0, 0);
          dom.style.height = "calc(" + String(100 - (5 * (detailTongTarget.length - 1))) + "% - " + String(detailTargetHeightConst) + ea + ")";
        }
      }
      this.style.color = "#202020";
    }

    //blur event
    detailBlurEvent = function (e) {
      const thisIndex = i;
      let target;
      for (let { dom } of detailTongTarget) {
        dom.style.height = "calc(" + String(100 / detailTongTarget.length) + "% - " + String(detailTargetHeightConst) + ea + ")";
        if (Number(dom.getAttribute("index")) === thisIndex) {
          target = dom.querySelector("textarea");
        }
      }
      this.style.color = "#cccccc";
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
      height: "calc(" + String(100 / detailTongTarget.length) + "% - " + String(detailTargetHeightConst) + ea + ")",
      fontSize: String(fontSize) + ea,
      fontWeight: String(300),
      border: "solid 1px #dddddd",
      borderRadius: String(5) + ea,
    };
    for (let j in style) {
      div_clone4.style[j] = style[j];
    }

    //title
    div_clone5 = GeneralJs.nodes.div.cloneNode(true);
    div_clone5.classList.add("hoverDefault_lite");
    div_clone5.textContent = detailTongTarget[i].name;
    style = {
      position: "absolute",
      top: String(((fontSize * (GeneralJs.isMac() ? (5 / 15.3027) : (4 / 15.3027))) + visualSpecificMarginTop) * -1) + ea,
      left: String(fontSize * (2 / 15.3027) * -1) + ea,
      fontSize: String(fontSize) + ea,
      fontWeight: String(600),
      color: "#404040",
      background: "white",
      paddingBottom: String(fontSize * (7 / 15.3027)) + ea,
      paddingRight: String(fontSize * (12 / 15.3027)) + ea,
      cursor: "pointer",
    };
    for (let j in style) {
      div_clone5.style[j] = style[j];
    }

    div_clone5.addEventListener("click", detailFocusEvent);
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
      fontWeight: String(400),
      color: "#aaaaaa",
      border: String(0),
      outline: String(0),
      lineHeight: String(1.6),
    };
    for (let j in style) {
      textArea_clone.style[j] = style[j];
    }
    textArea_clone.addEventListener("focus", detailFocusEvent);
    textArea_clone.addEventListener("blur", detailBlurEvent);
    if (i === detailTongTarget.length - 1) {
      textArea_clone.addEventListener("keydown", function (e) {
        if (e.keyCode === 9) {
          e.preventDefault();
          this.blur();
        }
      });
    }

    div_clone5.appendChild(textArea_clone);
    textAreas.push(textArea_clone);

    div_clone4.appendChild(div_clone5);
    div_clone4.setAttribute("index", String(i));
    detailTongTarget[i].dom = div_clone4;

    div_clone3.appendChild(div_clone4);
  }

  detailBox.appendChild(div_clone3);
  div_clone2.appendChild(detailBox);
  this.whiteBox.detailBox = detailBox;

  //h initial event
  GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
  hInitialBox.addEventListener("click", async function (e) {
    try {
      if (GeneralJs.stacks["hInitialBoxButtonToggle"] === 0) {
        propertyBox.style.opacity = String(0);
        detailBox.style.opacity = String(0);
        await instance.viewDetail(div_clone2, leftMargin, fontSize, thisCase);
        GeneralJs.stacks["hInitialBoxButtonToggle"] = 1;
      } else {
        div_clone2.removeChild(div_clone2.lastChild);
        propertyBox.style.opacity = String(1);
        detailBox.style.opacity = String(1);
        GeneralJs.stacks["hInitialBoxButtonToggle"] = 0;
      }
    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  });

  //m initial event
  mInitialBox.addEventListener("click", this.convertWhiteContents(div_clone, titleArea, contentsArea, leftMargin, thisCase));
  GeneralJs.timeouts["convertChaining"] = setTimeout(async function () {
    try {
      let num = instance.whiteConvert;
      instance.whiteConvert = 0;
      instance.whiteMatrixA = null;
      for (let i = 0; i < num; i++) {
        mInitialBox.click();
        await GeneralJs.sleep(400);
      }
      clearTimeout(GeneralJs.timeouts["convertChaining"]);
      GeneralJs.timeouts["convertChaining"] = null;
    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }, 400);

  //get textAreaTong
  GeneralJs.ajax("id=" + thisCase[standard[1]], "/getContentsDetail", function (res) {
    const dataArr = JSON.parse(res);
    for (let i = 0; i < textAreas.length; i++) {
      textAreas[i].value = dataArr[i];
    }
  });

  div_clone.appendChild(div_clone2);

  //end ---------------------------------------------
  mother.appendChild(div_clone);
}

ContentsJs.prototype.convertWhiteContents = function (motherArea, titleArea, contentsArea, leftMargin, thisCase) {
  const instance = this;
  const { pid, conid } = thisCase;
  return async function (e) {
    try {
      let div_clone;
      let treeBox;
      let style, style2, style3;
      let ea = "px";
      let temp;
      let formBox, formBoxText;
      let matrix;
      let formStyle, formTextStyle;
      let num, matrixNum;
      let widthArr, topArr, leftArr;
      let dateBox;
      let dateStyle;
      let margin;
      let height;
      let lineDom;
      let dateWidth;
      let marginMiddle;
      let heightMargin;
      let lineColor;
      let titleArr;
      let titleBox;
      let keyHeight;
      let treeTop;
      let dateText;
      let dateTextStyle;
      let dateTextBar;
      let widthRatio, heightRatio;

      if (instance.whiteConvert === 0) {

        //convert animation
        if (contentsArea.style.animation !== "fadeoutlite 0.3s ease forwards") {
          contentsArea.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        instance.whiteConvert = 3;
        GeneralJs.timeouts["whiteConvertMatrixA"] = setTimeout(function () {
          instance.whiteConvert = 1;
          clearTimeout(GeneralJs.timeouts["whiteConvertMatrixA"]);
          GeneralJs.timeouts["whiteConvertMatrixA"] = null;
        }, 301);

        //start matrixA
        div_clone = contentsArea.cloneNode(false);
        div_clone.style.animation = "fadeinlite 0.3s ease forwards";

        widthRatio = function (number) {
          return (window.innerWidth * (number / 1712));
        }

        heightRatio = function (number) {
          return (window.innerHeight * (number / 977));
        }

        titleArr = [
          "원본 소스",
          "산문 형태",
          "카드 형태",
          "영상 형태",
        ];

        matrix = [
          [
            "Contents form 0",
            "Contents form 1",
            "Contents form 2",
          ],
          [
            "Web",
            "Blog",
          ],
          [
            "Insta",
            "Post",
            "Story"
          ],
          [
            "Youtube",
            "NaverTV",
            "KakaoTV",
            "Vimeo"
          ],
        ];

        widthArr = [
          widthRatio(270),
          widthRatio(140),
          widthRatio(140),
          widthRatio(180)
        ];

        keyHeight = (144);

        topArr = [
          0,
          keyHeight,
          heightRatio(keyHeight * 2),
          heightRatio(keyHeight * 3)
        ];

        leftArr = [
          0,
          widthRatio(660),
          widthRatio(350),
          0
        ];

        treeTop = heightRatio(34);
        margin = 5;
        height = heightRatio(106);
        dateWidth = widthRatio(100);

        treeBox = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "relative",
          width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
          height: String(topArr[topArr.length - 1] + height) + ea,
          left: String(leftMargin) + ea,
          top: String(treeTop) + ea,
        };
        for (let i in style) {
          treeBox.style[i] = style[i];
        }

        formStyle = {
          position: "absolute",
          background: "#ececec",
          borderRadius: String(5) + ea,
          width: String(270) + ea,
          height: String(height) + ea,
          borderTopRightRadius: String(0) + ea,
          borderBottomRightRadius: String(0) + ea,
        };

        formTextStyle = {
          position: "absolute",
          fontSize: String(22) + ea,
          fontFamily: "graphik",
          fontWeight: String(400),
          textAlign: "center",
          width: String(100) + '%',
          top: "calc(50% - " + String(21) + ea + ")",
          color: "#606060",
        };

        dateStyle = {
          position: "absolute",
          border: "1px solid #dddddd",
          borderRadius: String(5) + ea,
          width: String(dateWidth) + ea,
          height: String(height) + ea,
          boxSizing: "border-box",
          borderTopLeftRadius: String(0) + ea,
          borderBottomLeftRadius: String(0) + ea,
        };

        dateTextStyle = {
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          fontSize: String(19) + ea,
          fontWeight: String(200),
          height: String(30) + ea,
        };

        matrixNum = 0;
        for (let arr of matrix) {

          num = 0;
          for (let i of arr) {
            formBox = GeneralJs.nodes.div.cloneNode(true);
            for (let j in formStyle) {
              formBox.style[j] = formStyle[j];
            }

            if (matrixNum === 0 && num === 0) {
              formBox.style.background = "#2fa678";
            }

            formBox.style.width = String(widthArr[matrixNum]) + ea;
            formBox.style.top = String(topArr[num]) + ea;
            if (matrixNum === 0) {
              formBox.style.left = String(0) + ea;
              if (num === 2) {
                formBox.style.top = String(topArr[num + 1]) + ea;
              }
            } else {
              formBox.style.right = String(leftArr[matrixNum] + dateWidth) + ea;
            }

            if (matrixNum === 0) {
              formBox.style.borderTopRightRadius = String(5) + ea;
              formBox.style.borderBottomRightRadius = String(5) + ea;
            }

            formBoxText = GeneralJs.nodes.div.cloneNode(true);
            for (let j in formTextStyle) {
              formBoxText.style[j] = formTextStyle[j];
            }
            formBoxText.textContent = i;

            if (matrixNum === 0 && num === 0) {
              formBoxText.style.color = "white";
            }

            formBox.appendChild(formBoxText);
            treeBox.appendChild(formBox);

            if (matrixNum !== 0) {

              dateBox = GeneralJs.nodes.div.cloneNode(true);
              for (let j in dateStyle) {
                dateBox.style[j] = dateStyle[j];
              }
              dateBox.style.top = String(topArr[num]) + ea;
              dateBox.style.right = String(leftArr[matrixNum]) + ea;

              dateText = GeneralJs.nodes.div.cloneNode(true);
              dateText.textContent = "06 / 24";
              for (let j in dateTextStyle) {
                dateText.style[j] = dateTextStyle[j];
              }
              dateText.style.top = "calc(25% - " + String(15) + ea + ")";
              dateBox.appendChild(dateText);

              dateTextBar = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                borderBottom: "1px dashed #dddddd",
                width: String(70) + '%',
                left: String(15) + '%',
                top: String(50) + '%',
              };
              for (let j in style) {
                dateTextBar.style[j] = style[j];
              }
              dateBox.appendChild(dateTextBar);

              dateText = GeneralJs.nodes.div.cloneNode(true);
              dateText.textContent = "07 / 02";
              for (let j in dateTextStyle) {
                dateText.style[j] = dateTextStyle[j];
              }
              dateText.style.top = "calc(75% - " + String(15) + ea + ")";
              dateBox.appendChild(dateText);

              treeBox.appendChild(dateBox);

            }
            num++;
          }
          matrixNum++;
        }

        marginMiddle = (leftArr[2] - (widthArr[3] + dateWidth)) / 2;
        heightMargin = topArr[1] - topArr[0] - height;
        lineColor = "#cccccc";

        //line third
        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[0] + (height / 2)) + ea,
          right: String(widthArr[3] + dateWidth) + ea,
          width: String(marginMiddle) + ea,
          height: String(topArr[3] - topArr[0]) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderBottom: String(0) + ea,
          borderTopLeftRadius: String(5) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[1] + (height / 2)) + ea,
          right: String(widthArr[3] + dateWidth) + ea,
          width: String(marginMiddle) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderLeft: String(0) + ea,
          borderBottom: String(0) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[2] + (height / 2)) + ea,
          right: String(widthArr[3] + dateWidth) + ea,
          width: String(marginMiddle) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderLeft: String(0) + ea,
          borderBottom: String(0) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[3] + (height / 2)) + ea,
          right: String(widthArr[3] + dateWidth) + ea,
          width: "calc(100% - " + String(widthArr[0] + widthArr[3] + dateWidth) + ea + ")",
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderLeft: String(0) + ea,
          borderTop: String(0) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        //line second
        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[0] + (height / 2)) + ea,
          right: String(widthArr[2] + dateWidth + leftArr[2]) + ea,
          width: String(marginMiddle) + ea,
          height: String(topArr[2] - topArr[0]) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderBottom: String(0) + ea,
          borderTopLeftRadius: String(5) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[1] + (height / 2)) + ea,
          right: String(widthArr[2] + dateWidth + leftArr[2]) + ea,
          width: String(marginMiddle) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderLeft: String(0) + ea,
          borderBottom: String(0) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[1] + height) + ea,
          right: String(widthArr[2] + dateWidth + leftArr[2]) + ea,
          width: "calc(100% - " + String((widthArr[0] / 2) + widthArr[2] + dateWidth + leftArr[2]) + ea + ")",
          height: String(topArr[2] - topArr[1] - (height / 2)) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderTop: String(0) + ea,
          borderBottomLeftRadius: String(5) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        //line first
        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[0] + (height / 2)) + ea,
          right: String(widthArr[1] + dateWidth + leftArr[1]) + ea,
          width: "calc(100% - " + String(widthArr[0] + widthArr[1] + dateWidth + leftArr[1]) + ea + ")",
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderLeft: String(0) + ea,
          borderRight: String(0) + ea,
          borderBottom: String(0) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        lineDom = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(topArr[0] + (height / 2)) + ea,
          right: String(widthArr[1] + dateWidth + leftArr[1]) + ea,
          width: String(marginMiddle) + ea,
          height: String(topArr[1] - topArr[0]) + ea,
          border: "1px solid " + lineColor,
          boxSizing: "border-box",
          borderRight: String(0) + ea,
          borderTop: String(0) + ea,
          borderBottomLeftRadius: String(5) + ea,
        };
        for (let i in style) {
          lineDom.style[i] = style[i];
        }
        treeBox.appendChild(lineDom);

        for (let i = 0; i < titleArr.length; i++) {
          titleBox = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            fontSize: String(17) + ea,
            fontWeight: String(600),
            width: String(widthArr[i] + ((i === 0) ? 0 : dateWidth)) + ea,
            textAlign: "center",
            height: String(30) + ea,
            top: String(-33) + ea,
          };
          for (let j in style) {
            titleBox.style[j] = style[j];
          }
          titleBox.textContent = titleArr[i];

          if (i === 0) {
            titleBox.style.left = String(leftArr[i]) + ea;
          } else {
            titleBox.style.right = String(leftArr[i]) + ea;
          }

          treeBox.appendChild(titleBox);
        }

        titleBox = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          fontSize: String(14) + ea,
          fontWeight: String(500),
          textAlign: "left",
          height: String(15) + ea,
          bottom: String(2) + ea,
          left: String(widthArr[0] + 16) + ea,
        };
        for (let j in style) {
          titleBox.style[j] = style[j];
        }
        titleBox.textContent = "*원본 소스는 폴더에 모아 드라이브의 링크 형태로 담아주세요.";
        treeBox.appendChild(titleBox);

        div_clone.appendChild(treeBox);

        instance.whiteMatrixA = div_clone;
        motherArea.appendChild(div_clone);

      } else if (instance.whiteConvert === 1) {

        //convert animation
        if (instance.whiteMatrixA !== null) {
          instance.whiteMatrixA.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        contentsArea.style.animation = "fadeinlite 0.3s ease forwards";
        instance.whiteConvert = 3;
        GeneralJs.timeouts["whiteConvertMatrixReturn"] = setTimeout(function () {
          if (instance.whiteMatrixA !== null) {
            motherArea.removeChild(instance.whiteMatrixA);
          }
          instance.whiteConvert = 0;
          instance.whiteMatrixA = null;
          clearTimeout(GeneralJs.timeouts["whiteConvertMatrixReturn"]);
          GeneralJs.timeouts["whiteConvertMatrixReturn"] = null;
        }, 301);

      } else {
        //pass
      }

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

ContentsJs.prototype.whiteCancelMaker = function (callback = null, recycle = false) {
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

ContentsJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.contentsWhiteViewStandard();
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
    for (let dom of document.querySelectorAll('.' + thisCase["conid"])) {
      indexArr.push(Number(dom.getAttribute("index")));
    }
    indexArr.sort((a, b) => { return a - b; });
    for (let z = 0; z < indexArr.length; z++) {
      if (indexArr[z] === index) {
        requestIndex = z;
      }
    }

    div_clone.setAttribute("index", thisCase["conid"]);
    div_clone.setAttribute("request", String(requestIndex));

    style = {
      position: "fixed",
      background: "white",
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

ContentsJs.prototype.whiteViewMaker = function (index) {
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

ContentsJs.prototype.rowViewMaker = function () {
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
        instance.overrideSearch.remove();
        instance.mother.searchInput.style.opacity = '';
        instance.mother.belowButtons.moveArea.left.style.display = "block";
      }
      instance.totalFather = null;
      instance.totalMother.classList.remove("justfadeinoriginal");
      clearTimeout(GeneralJs.timeouts.fadeinTimeout);
      GeneralJs.timeouts.fadeinTimeout = null;
    }, 401);
  }
}

ContentsJs.prototype.returnValueEventMaker = function () {
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

    for (let i of textTargets) {
      i.textContent = pastObj.value;
    }
    instance.cases[Number(pastObj.index)][pastObj.column] = pastObj.value;

  }
}

ContentsJs.prototype.reportContents = function (data, mother, loadingIcon) {
  const instance = this;
  const report = JSON.parse(data);
  const dateToString = function (raw) {
    const thisDate = new Date(raw);
    const zeroAddtion = function (number) {
      if (number < 10) {
        return `0${String(number)}`;
      } else {
        return String(number);
      }
    }
    return `${String(thisDate.getFullYear())}-${zeroAddtion(thisDate.getMonth() + 1)}-${zeroAddtion(thisDate.getDate())}`;
  }
  const matrixMap = [
    { column: "conid", name: "아이디" },
    { column: "pid", name: "별칭" },
    { column: "portfolioLink", name: "포트폴리오 웹", children: [
      { column: "portfolioDate", name: "발행일" },
      { column: "portfolioTitle", name: "제목" },
    ] },
    { column: "reviewLink", name: "고객 후기 웹", children: [
      { column: "reviewDate", name: "발행일" },
      { column: "reviewTitle", name: "제목" },
    ] },
    { column: "blogPortfolioLink", name: "포트폴리오 블로그", children: [
      { column: "blogPortfolioDate", name: "발행일" },
      { column: "blogPortfolioTitle", name: "제목" },
    ] },
    { column: "blogReviewLink", name: "고객 후기 블로그", children: [
      { column: "blogReviewDate", name: "발행일" },
      { column: "blogReviewTitle", name: "제목" },
    ] },
  ];

  class MatrixArray extends Array {
    getEventArrAll() {
      let tempArr;
      let result;

      result = [];
      for (let i of this) {
        tempArr = i.getEventArr();
        for (let j of tempArr) {
          result.push(j);
        }
      }

      return result;
    }
  }

  class MatrixFactor extends Array {

    setPid(pid) {
      this.pid = pid;
    }

    setName(name) {
      this.name = name;
    }

    setDesigner(designer) {
      this.designer = designer;
    }

    getEventArr() {
      const that = this;
      let arr = [];
      let tempObj;
      let tempArr;

      for (let i = 2; i < this.length; i++) {
        if (this[i].date !== "미발행") {
          tempObj = {};
          tempArr = this[i].date.split("-");

          tempObj.date = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          if (i === 2) {
            tempObj.title = "WP) " + this.pid;
          } else if (i === 3) {
            tempObj.title = "WR) " + this.pid;
          } else if (i === 4) {
            tempObj.title = "BP) " + this.pid;
          } else {
            tempObj.title = "BR) " + this.pid;
          }

          tempObj.eventFunc = function (e) {
            window.open(that[i].link, "_blank");
          }

          tempObj.hours = false;

          arr.push(tempObj);
        }
      }

      return arr;
    }

  }

  let div_clone, div_clone2;
  let style;
  let ea;
  let matrix;
  let nameColumns;
  let temp;
  let matrixArea;
  let margin;
  let matrixAreaWidth;
  let matrixTitleBox, matrixScrollBox;
  let titleHeight;
  let titleArr;
  let titleLength;
  let caseDiv;
  let matrixCaseEnter, matrixCaseLeave, matrixCaseClick;
  let calendarArea;
  let calendar;

  ea = "px";

  //make matrix
  matrix = new MatrixArray();
  for (let i = 0; i < report.data.length; i++) {
    temp = new MatrixFactor();
    for (let obj of matrixMap) {
      if (obj.children !== undefined) {
        if (report.flat[i][obj.column] !== '') {
          temp.push({ date: dateToString(report.flat[i][obj.children[0].column]), title: report.flat[i][obj.children[1].column], link: report.flat[i][obj.column] });
        } else {
          temp.push({ date: "미발행", title: "", link: "" });
        }
      } else {
        temp.push(report.flat[i][obj.column]);
      }
    }
    temp.setPid(report.data[i].pid);
    temp.setName(report.data[i].name);
    temp.setDesigner(report.data[i].designer);
    matrix.push(temp);
  }

  matrix.sort((a, b) => {
    return Number(b[0].replace(/[^0-9]/g, '')) - Number(a[0].replace(/[^0-9]/g, ''));
  });

  nameColumns = [];
  for (let { name } of matrixMap) {
    nameColumns.push(name);
  }
  matrix.unshift(nameColumns);

  //matrix area
  margin = 40;
  matrixAreaWidth = 900;
  titleHeight = 46;
  titleArr = matrix.shift();
  titleLength = titleArr.length;
  GeneralJs.stacks["matrixCaseTitlePopup"] = null;

  matrixArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(matrixAreaWidth) + ea,
    height: "calc(100% - " + String(margin * 2) + ea + ")",
    left: String(margin) + ea,
    top: String(margin) + ea,
    overflow: "scroll",
    borderRadius: String(7) + ea,
    border: "1px solid #dddddd",
    boxSizing: "border-box",
  };
  for (let i in style) {
    matrixArea.style[i] = style[i];
  }
  matrixArea.addEventListener("mouseleave", function (e) {
    if (GeneralJs.stacks["matrixCaseTitlePopup"] !== null) {
      GeneralJs.stacks["matrixCaseTitlePopup"].remove();
      GeneralJs.stacks["matrixCaseTitlePopup"] = null;
    }
  });

  //matrix scroll box
  matrixScrollBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(matrixAreaWidth) + ea,
    left: String(0) + ea,
    top: String(titleHeight + 3) + ea,
    boxSizing: "border-box",
  };
  for (let i in style) {
    matrixScrollBox.style[i] = style[i];
  }

  //matrix case
  matrixCaseEnter = function (e) {
    e.stopPropagation();
    const index = Number(this.getAttribute("index"));
    const position = Number(this.getAttribute("position"));
    const thisCase = instance.contentsReportMatrix[index];
    const thisValue = thisCase[position];
    const thisRect = this.getBoundingClientRect();
    const [ conid, pid ] = thisCase;
    const targetMother = this.parentNode;
    const { x, y, width, height } = thisRect;

    let targets;
    let div_clone, div_clone2;
    let style;
    let ea;
    let popupWidth;
    let fixedWidth;
    let margin;

    ea = "px";
    popupWidth = 1500;
    margin = 15;

    targets = [
      this.parentElement.parentElement.children[0].lastChild,
      this.parentElement.parentElement.children[1].lastChild,
      this,
    ];
    for (let i of targets) {
      i.style.color = "#2fa678";
    }

    if (GeneralJs.stacks["matrixCaseTitlePopup"] !== null) {
      GeneralJs.stacks["matrixCaseTitlePopup"].remove();
      GeneralJs.stacks["matrixCaseTitlePopup"] = null;
    }

    //popup
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "fixed",
      width: String(popupWidth) + ea,
      height: String(32) + ea,
      background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
      zIndex: String(1),
      top: String(y) + ea,
      left: String(x - 29.6 - (instance.totalFather === null ? instance.grayBarWidth : 0) + (width / 2) - (popupWidth / 2)) + ea,
      borderRadius: String(4) + ea,
      opacity: String(0.95),
      boxShadow: "0px 2px 12px -9px #404040",
      transition: "all 0s ease",
    }
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      fontSize: String(14) + ea,
      fontWeight: String(500),
      top: String(5) + ea,
      left: String(margin) + ea,
      color: "white",
    }
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }

    if (typeof thisValue === "string") {
      if (thisCase.name !== '') {
        div_clone2.textContent = `${thisCase.name}C / ${thisCase.designer}D`;
      } else {
        div_clone2.textContent = `${thisCase.designer}D`;
      }
    } else {
      if (thisValue.date === "미발행") {
        div_clone2.textContent = "미발행";
      } else {
        div_clone2.textContent = thisValue.title;
      }
    }

    div_clone.appendChild(div_clone2);
    targetMother.appendChild(div_clone);

    fixedWidth = div_clone2.getBoundingClientRect().width;
    popupWidth = fixedWidth + (margin * 2);
    div_clone.style.width = String(popupWidth) + ea;
    div_clone.style.left = String(x - 29.6 - (instance.totalFather === null ? instance.grayBarWidth : 0) + (width / 2) - (popupWidth / 2)) + ea;

    GeneralJs.stacks["matrixCaseTitlePopup"] = div_clone;

  }

  matrixCaseLeave = function (e) {
    e.stopPropagation();
    const index = Number(this.getAttribute("index"));
    const position = Number(this.getAttribute("position"));
    const thisCase = instance.contentsReportMatrix[index];
    const thisValue = thisCase[position];
    const [ conid, pid ] = thisCase;
    const targetMother = this.parentNode;

    let targets;
    targets = [
      this.parentElement.parentElement.children[0].lastChild,
      this.parentElement.parentElement.children[1].lastChild,
      this,
    ];
    for (let i of targets) {
      i.style.color = "#404040";
    }
    if (this.textContent === "미발행") {
      this.style.color = "#dd3424";
    }

    if (GeneralJs.stacks["matrixCaseTitlePopup"] !== null) {
      GeneralJs.stacks["matrixCaseTitlePopup"].remove();
      GeneralJs.stacks["matrixCaseTitlePopup"] = null;
    }
  }

  matrixCaseClick = function (e) {
    const index = Number(this.getAttribute("index"));
    const position = Number(this.getAttribute("position"));
    const thisCase = instance.contentsReportMatrix[index];
    const thisValue = thisCase[position];
    const [ conid, pid ] = thisCase;
    if (position > 1) {
      if (thisValue.link !== '') {
        window.open(thisValue.link, "_blank");
      }
    } else {
      window.open("/contents?conid=" + conid, "_blank");
    }
  }

  for (let z = 0; z < matrix.length; z++) {
    caseDiv = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "block",
      position: "relative",
      width: String(matrixAreaWidth) + ea,
      height: String(titleHeight - 10) + ea,
      cursor: "pointer",
      boxSizing: "border-box",
    };
    for (let y in style) {
      caseDiv.style[y] = style[y];
    }

    for (let i = 0; i < titleLength; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(" + String(matrixAreaWidth) + ea + " / " + String(titleLength) + ") " + ((i < 2) ? '-' : '+') + " " + String((i < 2) ? ((i !== 1) ? 25 : 75) : ((i < 4) ? 10 : 39)) + ea + ")",
        height: String(titleHeight) + ea,
        boxSizing: "border-box",
      };
      for (let j in style) {
        div_clone.style[j] = style[j];
      }

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: String(100) + '%',
        textAlign: "center",
        top: String(13) + ea,
        height: String(20) + ea,
        borderRight: ((i !== titleLength - 1) ? "1px solid #e0e0e0" : ""),
        boxSizing: "border-box",
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone.appendChild(div_clone2);

      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.setAttribute("index", String(z));
      div_clone2.setAttribute("position", String(i));
      if (typeof matrix[z][i] === "string") {
        div_clone2.textContent = matrix[z][i];
      } else {
        div_clone2.textContent = matrix[z][i].date;
      }
      style = {
        position: "absolute",
        width: String(100) + '%',
        textAlign: "center",
        top: String(12) + ea,
        fontSize: String(14) + ea,
        fontWeight: String(300),
        cursor: "pointer",
        color: "#404040",
        transition: "all 0s ease",
        boxSizing: "border-box",
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      if (div_clone2.textContent === "미발행") {
        div_clone2.style.color = "#dd3424";
      }
      div_clone2.addEventListener("mouseenter", matrixCaseEnter);
      div_clone2.addEventListener("mouseleave", matrixCaseLeave);
      div_clone2.addEventListener("click", matrixCaseClick);
      div_clone.appendChild(div_clone2);

      caseDiv.appendChild(div_clone);
    }

    matrixScrollBox.appendChild(caseDiv);
  }

  matrixArea.appendChild(matrixScrollBox);

  //matrix title box
  matrixTitleBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "fixed",
    width: String(matrixAreaWidth) + ea,
    height: String(titleHeight) + ea,
    left: String(margin) + ea,
    top: String(margin) + ea,
    background: "#f7f7f7",
    borderTopLeftRadius: String(6) + ea,
    borderTopRightRadius: String(6) + ea,
    border: "1px solid #dddddd",
    boxSizing: "border-box",
  };
  for (let i in style) {
    matrixTitleBox.style[i] = style[i];
  }

  for (let i = 0; i < titleLength; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(" + String(matrixAreaWidth) + ea + " / " + String(titleLength) + ") " + ((i < 2) ? '-' : '+') + " " + String((i < 2) ? ((i !== 1) ? 25 : 75) : ((i < 4) ? 10 : 39)) + ea + ")",
      height: String(titleHeight) + ea,
      boxSizing: "border-box",
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.textContent = titleArr[i];
    style = {
      position: "absolute",
      width: String(100) + '%',
      textAlign: "center",
      top: String(12) + ea,
      fontSize: String(14) + ea,
      fontWeight: String(600),
      boxSizing: "border-box",
    };
    for (let j in style) {
      div_clone2.style[j] = style[j];
    }
    div_clone.appendChild(div_clone2);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(100) + '%',
      textAlign: "center",
      top: String(13) + ea,
      height: String(20) + ea,
      borderRight: ((i !== titleLength - 1) ? "1px solid #aaaaaa" : ""),
      boxSizing: "border-box",
    };
    for (let j in style) {
      div_clone2.style[j] = style[j];
    }
    div_clone.appendChild(div_clone2);

    matrixTitleBox.appendChild(div_clone);
  }

  matrixArea.appendChild(matrixTitleBox);

  mother.appendChild(matrixArea);

  instance.contentsReportMatrix = matrix;

  //calendar
  calendarArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: "calc(100% - " + String(matrixAreaWidth + (margin * 2.5)) + ea + ")",
    height: "calc(100% - " + String(margin * 2) + ea + ")",
    left: String(matrixAreaWidth + (margin * 1.5)) + ea,
    top: String(margin) + ea,
    borderRadius: String(7) + ea,
  };
  for (let i in style) {
    calendarArea.style[i] = style[i];
  }

  console.log(instance.contentsReportMatrix.getEventArrAll());

  calendar = this.mother.makeCalendar(new Date(), function (e) {}, {
    bigMode: true,
    width: "calc(100%)",
    height: "calc(100%)",
    events: instance.contentsReportMatrix.getEventArrAll(),
  });
  calendar.calendarBase.style.position = "absolute";
  calendar.calendarBase.style.top = String(0) + ea;
  calendar.calendarBase.style.left = String(0) + ea;
  calendarArea.appendChild(calendar.calendarBase);

  mother.appendChild(calendarArea);

}

ContentsJs.prototype.reportViewMakerDetail = function (recycle = false) {
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
        background: "white",
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

      GeneralJs.ajax("", "/getContentsReport", function (data) {
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

ContentsJs.prototype.reportViewMaker = function () {
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

ContentsJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

ContentsJs.prototype.makeSearchEvent = function (search = null) {
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
          instance.overrideSearch.remove();
          instance.mother.searchInput.style.opacity = '';
          instance.mother.belowButtons.moveArea.left.style.display = "block";
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

ContentsJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
}

ContentsJs.prototype.backGrayBar = function () {
  const instance = this;
  let div_clone;
  let style;
  let ea = "px";

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    background: "#f7f7f7",
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

ContentsJs.prototype.extractViewMakerDetail = function (recycle = false, link) {
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
        background: "white",
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

ContentsJs.prototype.extractViewMaker = function (link) {
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

ContentsJs.prototype.addExtractEvent = function () {
  const instance = this;
  const { sub: { extractIcon } } = this.mother.belowButtons;
  let sendEvent;

  sendEvent = async function (e) {
    try {
      const today = new Date();
      const caseCopied = JSON.parse(JSON.stringify(instance.cases));
      caseCopied.shift();
      const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
      const map = DataPatch.contentsMap();

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
      })

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }

  extractIcon.addEventListener("click", sendEvent);
}

ContentsJs.prototype.whiteResize = function () {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if (instance.whiteBox !== undefined && instance.whiteBox !== null) {
        if (instance.whiteBox.id !== undefined) {
          window.location.search = "conid=" + instance.whiteBox.id;
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

ContentsJs.prototype.launching = async function () {
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

    const getObj = GeneralJs.returnGet();
    let getTarget;
    let tempFunction;

    getTarget = null;
    if (getObj.conid !== undefined) {
      for (let dom of this.standardDoms) {
        if ((new RegExp(getObj.conid, 'gi')).test(dom.textContent)) {
          getTarget = dom;
        }
      }
      if (getTarget === null) {
        tempFunction = this.makeSearchEvent(getObj.conid);
        await tempFunction({ keyCode: 13 });
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.conid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
      }
      if (getTarget !== null) {
        getTarget.click();
      }
    } else if (getObj.pid !== undefined) {
      for (let dom of this.standardDoms) {
        if ((new RegExp(getObj.pid, 'gi')).test(dom.textContent)) {
          getTarget = dom;
        }
      }
      if (getTarget === null) {
        tempFunction = this.makeSearchEvent(getObj.pid);
        await tempFunction({ keyCode: 13 });
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.pid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
      }
      if (getTarget !== null) {
        getTarget.click();
      }
    }

    if (getObj.view === "create") {
      tempFunction = this.cardViewMaker();
      tempFunction.call(this.mother.belowButtons.square.up, { type: "click" }).then(function () {
        if (getObj.proid !== undefined) {
          if (document.querySelector("#" + getObj.proid) !== null) {
            document.querySelector("#" + getObj.proid).click();
          }

        }
      });
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
