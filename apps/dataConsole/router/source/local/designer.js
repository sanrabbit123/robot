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
}

DesignerJs.prototype.standardBar = function (standard) {
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

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = desid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("contextmenu", sortEventFunction(0));
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = designer;
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
      div_clone2.addEventListener("contextmenu", this.makeClipBoardEvent(desid));
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

  if (this.standardDoms.length === 2) {
    GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
      instance.standardDoms[1].click();
      clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
    }, 401);
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
              background: "#2fa678",
              textAlign: "center",
              fontSize: "inherit",
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
            button_clone2.textContent = thisMap.items[i];
            button_clone.appendChild(button_clone2);

            button_clone.addEventListener("click", updateValueEvent);
            this.appendChild(button_clone);
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

DesignerJs.prototype.spreadData = async function (search = null) {
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

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search });
    this.infoArea({ standard: standard.info, data: infoDataTong, search: search });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

DesignerJs.prototype.cardViewMaker = function () {
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
      let style, infoStyle;
      let areaStyle, areaNameStyle, areaTongStyle;
      let areaNumberStyle;
      let div_clone, div_clone2;
      let size, margin;
      let ea = "px";
      let num;
      let cardWidthConstant;
      let intend, totalWidth;
      let lineHeight, titleTop, startTop;
      let divideNumber;
      let fontSize, nameFontSize;
      let fixedHeightSize;
      let whereQuery;
      let tempResult, tempResult2, tempInfo, tempTarget, tempArr;
      let division, divisionName;
      let numbers;

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
        color: "#404040",
        cursor: "pointer",
      };

      proidStyle = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(200),
        top: String(titleTop + (nameFontSize - fontSize + 2) + (GeneralJs.isMac() ? 0 : 2)) + ea,
        color: "#2fa678",
        cursor: "pointer",
      };

      barStyle = {
        position: "absolute",
        background: "#ececec",
        top: String(startTop + 13 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(intend) + ea,
        width: String(totalWidth) + ea,
        height: String(1) + ea,
      };

      //info style
      infoStyle = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(500),
        top: String(startTop + lineHeight + (GeneralJs.isMac() ? 0 : 3)) + ea,
        left: String(intend) + ea,
        width: String(totalWidth) + ea,
        color: "#404040",
        lineHeight: String(1.5),
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
        border: "1px dashed #cccccc",
        borderRadius: String(5) + ea,
      };

      areaNameStyle = {
        position: "absolute",
        top: String(margin * (GeneralJs.isMac() ? 1 : 1.07)) + ea,
        left: String(margin * 1.7) + ea,
        fontSize: String(fontSize + 6) + ea,
        fontWeight: String(600),
        color: "#404040",
      };

      areaNumberStyle = {
        position: "absolute",
        top: String((margin * (GeneralJs.isMac() ? 1 : 1.07)) + ((fontSize + 6) * 1.368421052631579)) + ea,
        left: String(margin * 1.7) + ea,
        fontSize: String(fontSize + 4) + ea,
        fontWeight: String(200),
        color: "#aaaaaa",
      };

      areaTongStyle = {
        position: "relative",
        paddingBottom: String(margin) + ea,
        minHeight: String(fixedHeightSize + margin) + ea,
        background: "#f2f2f2",
        borderRadius: String(5) + ea,
      };

      //make division
      division = new Map();
      numbers = new Map();
      divisionName = [];
      for (let i = 1; i < cases.length; i++) {
        divisionName.push({ desid: cases[i].desid, designer: cases[i].designer });
      }

      for (let i = 0; i < divisionName.length; i++) {
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let i in areaStyle) {
          div_clone.style[i] = areaStyle[i];
        }

        //title
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.textContent = divisionName[i].designer;
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
        numbers.set(divisionName[i].desid, div_clone2);
        div_clone.appendChild(div_clone2);

        //tong
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in areaTongStyle) {
          div_clone2.style[i] = areaTongStyle[i];
        }
        div_clone2.setAttribute("kinds", "area");
        div_clone2.setAttribute("name", divisionName[i].designer);
        div_clone2.setAttribute("desid", divisionName[i].desid);
        division.set(divisionName[i].desid, div_clone2);
        div_clone.appendChild(div_clone2);

        totalFather.appendChild(div_clone);
      }

      //make card
      instance.totalFatherChildren = [];

      whereQuery = {};
      whereQuery["$or"] = [];
      for (let i = 1; i < cases.length; i++) {
        // whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "대기" });
        // whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "진행중" });
        // whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "홀딩" });
        whereQuery["$or"].push({ desid: cases[i].desid });
      }
      tempResult = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getProjects"));

      whereQuery = {};
      whereQuery["$or"] = [];
      for (let i = 0; i < tempResult.length; i++) {
        whereQuery["$or"].push({ cliid: tempResult[i].cliid });
      }
      tempResult2 = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify(whereQuery), "/getClients"));

      for (let i of tempResult) {
        for (let j of tempResult2) {
          if (i.cliid === j.cliid) {
            i.name = j.name;
            i.phone = j.phone;
          }
        }
      }

      tempInfo = [
        "process.status",
        "phone"
      ];

      num = 0;
      for (let obj of tempResult) {

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
        div_clone2.addEventListener("click", function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?proid=" + obj.proid, "_blank");
        });
        div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.proid));
        div_clone.appendChild(div_clone2);

        //proid
        proidStyle.left = String(intend + GeneralJs.calculationWordWidth(nameFontSize, obj.name, true)) + ea;
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.textContent = obj.proid;
        for (let i in proidStyle) {
          div_clone2.style[i] = proidStyle[i];
        }
        div_clone2.addEventListener("click", function (e) {
          window.open(window.location.protocol + "//" + window.location.host + "/project?proid=" + obj.proid, "_blank");
        });
        div_clone2.addEventListener("contextmenu", instance.makeClipBoardEvent(obj.proid));
        div_clone.appendChild(div_clone2);

        //bar
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in barStyle) {
          div_clone2.style[i] = barStyle[i];
        }
        div_clone.appendChild(div_clone2);

        //sub info
        for (let j = 0; j < tempInfo.length; j++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          tempArr = tempInfo[j].split(".");
          tempTarget = obj[tempArr[0]];
          if (tempArr.length > 1) {
            for (let z = 1; z < tempArr.length; z++) {
              tempTarget = tempTarget[tempArr[z]];
            }
          }
          div_clone2.textContent = tempTarget;
          for (let i in infoStyle) {
            div_clone2.style[i] = infoStyle[i];
          }
          div_clone2.style.top = String(startTop + (lineHeight * (j + 1)) + (GeneralJs.isMac() ? 0 : 3)) + ea;
          div_clone.appendChild(div_clone2);
        }

        div_clone.setAttribute("kinds", "card");
        div_clone.setAttribute("proid", obj.proid);
        div_clone.setAttribute("cliid", obj.cliid);

        division.get(obj.desid).appendChild(div_clone);

        instance.totalFatherChildren.push(div_clone);

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
  convertIcon.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (49 / 60) : (52 / 60)))) + ea;
  convertIcon.style.height = String(iconHeight) + ea;
  convertIcon.style.width = String(iconHeight * SvgTong.getRatio(convertIcon)) + ea;
  div_clone2.appendChild(convertIcon);

  //m initial button
  convertIconBox = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    convertIconBox.style[i] = style[i];
  }
  convertIconBox.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? (46 / 60) : (49 / 60)))) + ea;
  convertIconBox.style.height = String(leftMargin * (20 / 60)) + ea;
  convertIconBox.style.width = String(leftMargin * (17 / 60)) + ea;
  convertIconBox.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  div_clone2.appendChild(convertIconBox);

  //alimtalk icon
  alimtalkIcon = SvgTong.stringParsing(this.mother.returnAinitial(GeneralJs.colorChip.green));
  for (let i in style) {
    alimtalkIcon.style[i] = style[i];
  }
  alimtalkIcon.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? ((49 + 49 - 35.5 + 1.5) / 60) : ((52 + 52 - 38.5 + 1.5) / 60)))) + ea;
  alimtalkIcon.style.height = String(iconHeight) + ea;
  alimtalkIcon.style.width = String(iconHeight * SvgTong.getRatio(alimtalkIcon)) + ea;
  div_clone2.appendChild(alimtalkIcon);

  //alimtalk button
  alimtalkButton = GeneralJs.nodes.div.cloneNode(true);
  for (let i in style) {
    alimtalkButton.style[i] = style[i];
  }
  alimtalkButton.style.right = String(leftMargin + (leftMargin * (GeneralJs.isMac() ? ((46 + 17) / 60) : ((49 + 17) / 60)))) + ea;
  alimtalkButton.style.height = String(leftMargin * (20 / 60)) + ea;
  alimtalkButton.style.width = String(leftMargin * (17 / 60)) + ea;
  alimtalkButton.style.bottom = String((leftMargin * (12 / 60)) + 1) + ea;
  div_clone2.appendChild(alimtalkButton);

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
              background: "#2fa678",
              textAlign: "center",
              fontSize: "inherit",
              color: GeneralJs.colorChip.white,
              zIndex: String(3),
              borderRadius: String(3) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              boxShadow: "0px 2px 11px -6px #2fa678",
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
            button_clone2.textContent = thisMap.items[i];
            button_clone.appendChild(button_clone2);

            button_clone.addEventListener("click", updateValueEvent);
            this.appendChild(button_clone);
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

      for (let i = 0; i < contents.length + 1; i++) {

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
        if (i !== contents.length) {
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
        if (i !== contents.length) {
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
        if (i !== contents.length) {

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

          ghost = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where" + JSON.stringify({ desid: thisCase[standard[1]] }), "/getDesigners"))[0].setting.ghost;

          for (let j = 0; j < ghost.length; j++) {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = S3HOST + ghost[j].link;
            img_clone.addEventListener("dblclick", function (e) {
              e.preventDefault();
              window.open(S3HOST + ghost[j].link, "_blank");
            });
            style = {
              display: "inline-block",
              position: "relative",
              height: String(height - (titleHeight + (margin / 2)) - margin) + ea,
              marginRight: String(margin / 2) + ea,
              borderRadius: String(3) + ea,
            };
            if (j === ghost.length - 1) {
              delete style.marginRight;
            }

            if (ghost.sgTrue === 'g') {
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
  convertIconBox.addEventListener("click", this.convertWhiteContents(div_clone, titleArea, contentsArea, leftMargin, thisCase));
  if (instance.whiteConvert !== 0) {
    GeneralJs.timeouts["convertChaining"] = setTimeout(async function () {
      try {
        let num = instance.whiteConvert;
        instance.whiteConvert = 0;
        instance.whiteMatrixA = null;
        instance.whiteMatrixB = null;
        for (let i = 0; i < num; i++) {
          convertIconBox.click();
          await GeneralJs.sleep(400);
        }
        clearTimeout(GeneralJs.timeouts["convertChaining"]);
        GeneralJs.timeouts["convertChaining"] = null;
      } catch (e) {
        GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
        console.log(e);
      }
    }, 400);
  }

  //alimtalk event
  alimtalkButton.addEventListener("click", function (e) {
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

    if (window.confirm(thisCase[standard[0]] + " 디자이너님에게 알림톡을 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {
      GeneralJs.ajax("method=designerCheckList&name=" + thisCase[standard[0]] + "&phone=" + thisCase.phone + "&option=" + JSON.stringify({ date: expiredString, desid: thisCase[standard[1]] }), "/alimTalk", function (rawJson) {
        let middleDate, deadDate;

        if (JSON.parse(rawJson).message !== "success") {

          throw new Error("alimTalk error");

        } else {

          instance.mother.greenAlert("알림톡이 전송되었습니다!");

          //copy link and set deadline
          if (GeneralJs.timeouts["linkCreateTimeout_" + thisCase[standard[1]]] === null || GeneralJs.timeouts["linkCreateTimeout_" + thisCase[standard[1]]] === undefined) {
            middleDate = new Date();
            middleDate.setHours(middleDate.getHours() + 8);
            deadDate = new Date();
            deadDate.setDate(deadDate.getDate() + 9);
            GeneralJs.ajax("json=" + JSON.stringify({ deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + thisCase[standard[1]], mode: "set" }), "/manageDeadline", function (res) {
              window.navigator.clipboard.writeText("https://" + GHOSTHOST + "/middle/survey?desid=" + thisCase[standard[1]]).then(function () {
                GeneralJs.timeouts["linkCreateTimeout_" + thisCase[standard[1]]] = setTimeout(function () {
                  clearTimeout(GeneralJs.timeouts["linkCreateTimeout_" + thisCase[standard[1]]]);
                  GeneralJs.timeouts["linkCreateTimeout_" + thisCase[standard[1]]] = null;
                }, 6000);
              }).catch(function (err) {
                throw new Error(err);
              });
            });
          }

        }
      });
    }

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

DesignerJs.prototype.convertWhiteContents = function (motherArea, titleArea, contentsArea, leftMargin, thisCase) {
  const instance = this;
  const { designer, desid } = thisCase;
  let es;
  let esConnect = false;
  this.whiteSse = es;
  return async function (e) {
    try {

      let div_clone;
      let style, style2, style3;
      let ea = "px";
      let temp;

      if (instance.whiteConvert === 0) {

        //sse connetion
        if (!esConnect) {
          es = new EventSource("https://" + SSEHOST + ":3000/specificsse/get_checklist/" + desid);
          es.addEventListener("updateTong", DesignerJs.checkListSseEvent);
          instance.whiteSse = es;
        }

        //make total base
        instance.whiteConvert = 3;
        contentsArea.style.opacity = String(0);
        div_clone = contentsArea.cloneNode(false);
        div_clone.style.animation = "fadeinlite 0.3s ease forwards";
        GeneralJs.ajax("button=get" + "&desid=" + desid + "&target=matrixA", "/designerMatrix", function (rawString) {
          instance.whiteConvert = 1;
          const responseObject = JSON.parse(rawString);
          if (responseObject.analytics === undefined) {
            throw new Error(responseObject.error);
            return;
          }
          class ItemsArray extends Array {
            constructor(arr) {
              super();
              for (let i of arr) {
                this.push(i);
              }
            }
            get maxLength() {
              let tong = [];
              for (let i of this) {
                if (typeof i !== "string") {
                  return null;
                } else {
                  tong.push(i.length);
                }
              }
              tong.sort((a, b) => { return b - a; });
              return tong[0];
            }
          }
          const { matrixA, analytics, values } = responseObject;
          const { xValues, yValues, zValues } = values;
          const classNameConst = "designerMatrixFactor";
          let matrixBase;
          let matrix;
          let leftWordWidth;
          let bottomWordWidth;
          let margin;
          let boxNumber;
          let matrixFactor;
          let matrixBaseStyle, matrixStyle, matrixMargin;
          let xTitleBoxesTong, yTitleBoxesTong;
          let xTitleBox, yTitleBox, zTitleBox;
          let xTitleBoxWord, yTitleBoxWord, zTitleBoxWord;
          let zToggleEvent;
          let invisible;
          let invisibleStyle;
          let invisibleText;
          let invisibleTextStyle;
          let totalMatrix;
          let x, y, z;
          let checkList;
          let checkListBase, checkListBaseWhite;
          let checkListBaseStyle;
          let checkListFactor, checkListFactorTitle, checkListFactorContents, checkListFactorContentsItem, checkListFactorContentsItemText, checkListFactorContentsItemText2;
          let checkListWidth, checkListMargin;
          let minimumButtonWidth;
          let checkDivideNum;
          let checkNum;
          let checkBoxEvent, radioEvent, rangeEvent;
          let styleFactorTitle;
          let checkFactorButtonMargin;
          let designNumberArr, purchaseArr, constructArr, relationArr;
          let checkListFactorMiddle;
          let baseWhiteStyle;
          let domDictionary;
          let inputEvent;

          totalMatrix = [];
          leftWordWidth = 30;
          bottomWordWidth = 34;
          margin = 10;
          matrixMargin = 8;
          boxNumber = xValues.length * yValues.length;
          checkListWidth = (Number(motherArea.style.width.replace(/[^0-9\.\-]/g, '')) - (leftMargin * 2)) * (0.5);
          checkListMargin = 20;
          minimumButtonWidth = 75;
          checkDivideNum = Math.floor((checkListWidth - checkListMargin - (matrixMargin * 8)) / minimumButtonWidth);
          checkFactorButtonMargin = 5;
          domDictionary = {};

          //start check list
          checkList = DataPatch.designerCheckList(analytics);
          checkListBase = GeneralJs.nodes.div.cloneNode(true);
          checkListBase.addEventListener("dblclick", function (e) {
            if (instance.whiteMemoBox !== undefined && instance.whiteMemoBox !== null) {
              instance.whiteMemoBox.style.display = "block";
              instance.whiteMemoBox.style.animation = "fadeupmiddle 0.3s ease forwards";
            }
          });
          checkListBaseStyle = {
            position: "absolute",
            width: String(checkListWidth - (checkListMargin / 2)) + ea,
            top: String(0) + ea,
            right: String(leftMargin) + ea,
            height: String(100) + '%',
            borderRadius: String(5) + ea,
            border: "1px solid " + GeneralJs.colorChip.gray3,
            background: GeneralJs.colorChip.gray1,
          };
          for (let i in checkListBaseStyle) {
            checkListBase.style[i] = checkListBaseStyle[i];
          }

          checkBoxEvent = function (e) {
            const column = this.getAttribute("column");
            const type = this.getAttribute("type");
            const { children: siblings } = this.parentElement;
            let resultObj, checkOrder;

            if (this.getAttribute("toggle") === "off") {
              this.style.background = GeneralJs.colorChip.green;
              this.children[0].style.color = GeneralJs.colorChip.white;
              this.setAttribute("toggle", "on");
            } else {
              this.style.background = GeneralJs.colorChip.gray1;
              this.children[0].style.color = GeneralJs.colorChip.deactive;
              this.setAttribute("toggle", "off");
            }

            resultObj = [];
            checkOrder = [];
            for (let dom of siblings) {
              checkOrder.push(dom.getAttribute("toggle") === "on" ? 1 : 0);
              if (dom.getAttribute("toggle") === "on") {
                if (type === "number") {
                  resultObj.push(Number(dom.getAttribute("value").replace(/[^0-9\.\-]/g, '')));
                } else if (type === "boolean") {
                  resultObj.push(!/[안미비n]/gi.test(dom.getAttribute("value")));
                } else {
                  resultObj.push(dom.getAttribute("value"));
                }
              }
            }

            GeneralJs.ajax("type=check&order=" + JSON.stringify(checkOrder) + "&column=" + column + "&button=update&desid=" + desid + "&update=" + JSON.stringify(checkList.search(column).position(resultObj)), "/designerMatrix", function(res) {});
          }

          radioEvent = function (e) {
            const column = this.getAttribute("column");
            const type = this.getAttribute("type");
            const { children: siblings } = this.parentElement;
            let checkOrder;

            checkOrder = [];
            if (this.getAttribute("toggle") === "off") {
              this.style.background = GeneralJs.colorChip.green;
              this.children[0].style.color = GeneralJs.colorChip.white;
              this.setAttribute("toggle", "on");
              for (let dom of siblings) {
                if (dom !== this) {
                  dom.setAttribute("toggle", "off");
                  dom.style.background = GeneralJs.colorChip.gray1;
                  dom.children[0].style.color = GeneralJs.colorChip.deactive;
                }
                checkOrder.push(dom.getAttribute("toggle") === "on" ? 1 : 0);
              }
            } else {
              this.style.background = GeneralJs.colorChip.gray1;
              this.children[0].style.color = GeneralJs.colorChip.deactive;
              this.setAttribute("toggle", "off");
              for (let dom of siblings) {
                if (dom !== this) {
                  dom.setAttribute("toggle", "on");
                  dom.style.background = GeneralJs.colorChip.green;
                  dom.children[0].style.color = GeneralJs.colorChip.white;
                }
                checkOrder.push(dom.getAttribute("toggle") === "on" ? 1 : 0);
              }
            }

            GeneralJs.ajax("type=radio&order=" + JSON.stringify(checkOrder) + "&column=" + column + "&button=update&desid=" + desid + "&update=" + JSON.stringify(checkList.search(column).position(this.getAttribute("value"))), "/designerMatrix", function(res) {});
          }

          rangeEvent = function (e) {
            const column = this.getAttribute("column");
            const nameConst = "checkRange";
            const [ x, y, z ] = [ Number(this.getAttribute('x')), Number(this.getAttribute('y')), Number(this.getAttribute('z')) ];
            const max = Number(this.getAttribute('max'));
            const multiple = this.getAttribute("multiple") === "true";
            let onTarget, offTarget;
            let target, oppositeTarget;
            let resultObj;
            let thisCheckListObj;
            let itemsTong;

            resultObj = {};
            thisCheckListObj = checkList.search(column);

            onTarget = [];
            offTarget = [];
            for (let i = 0; i < max; i++) {
              target = document.getElementById(nameConst + column + String(x) + String(y) + String(i));
              if (i <= z) {
                onTarget.push(target);
              } else {
                offTarget.push(target);
              }
              if (!multiple) {
                oppositeTarget = document.getElementById(nameConst + column + String(x) + String(1 - y) + String(max - i - 1));
                if (i > z) {
                  onTarget.push(oppositeTarget);
                } else {
                  offTarget.push(oppositeTarget);
                }
              }
            }

            for (let dom of onTarget) {
              dom.style.background = GeneralJs.colorChip.green;
            }

            for (let dom of offTarget) {
              dom.style.background = GeneralJs.colorChip.gray1;
            }

            document.getElementById(nameConst + column + String(x) + String(y) + "value").firstChild.textContent = String(z + 1);
            if (!multiple) {
              document.getElementById(nameConst + column + String(x) + String(1 - y) + "value").firstChild.textContent = String(max - (z + 1));
            }

            for (let k = 0; k < thisCheckListObj.items.length; k++) {
              resultObj[thisCheckListObj.items[k].column] = Number(document.getElementById(nameConst + column + String(x) + String(k) + "value").firstChild.textContent);
            }

            itemsTong = [];
            for (let k in resultObj) {
              itemsTong.push({ column: k, value: resultObj[k] });
            }

            GeneralJs.ajax("type=range&order=" + JSON.stringify(itemsTong) + "&column=" + column + "&button=update&desid=" + desid + "&update=" + JSON.stringify(thisCheckListObj.position(itemsTong)), "/designerMatrix", function(res) {});
          }

          inputEvent = function (e) {
            if ((e.type === "keypress" && e.keyCode === 13) || (e.type === "blur")) {
              const column = this.getAttribute("column");
              const updateQuery = JSON.stringify(checkList.search(column).position(this.value));
              GeneralJs.ajax("type=input&order=" + JSON.stringify([ this.value ]) + "&column=" + column + "&button=update&desid=" + desid + "&update=" + updateQuery, "/designerMatrix", function(res) {});
            }
          }

          styleFactorTitle = {
            position: "relative",
            fontSize: String(14) + ea,
            fontWeight: String(600),
            color: GeneralJs.colorChip.black,
            marginBottom: String(7) + ea,
          };

          checkNum = 0;

          checkListFactorMiddle = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "relative",
            width: String(100) + '%',
            height: String(100) + '%',
            borderRadius: String(5) + ea,
            background: "transparent",
            overflow: "scroll",
          };
          for (let i in style) {
            checkListFactorMiddle.style[i] = style[i];
          }

          baseWhiteStyle = {
            position: "relative",
            width: "calc(100% - " + String(matrixMargin * 8) + ea + ")",
            marginTop: String(matrixMargin * 2) + ea,
            marginLeft: String(matrixMargin * 2) + ea,
            padding: String(matrixMargin * 2) + ea,
            paddingTop: String((matrixMargin * 2) + 3) + ea,
            paddingBottom: String((matrixMargin * 2) - 6) + ea,
            borderRadius: String(5) + ea,
            background: GeneralJs.colorChip.white,
            overflow: "scroll",
          };

          for (let c = 0; c < checkList.length; c++) {
            checkListBaseWhite = GeneralJs.nodes.div.cloneNode(true);
            if (c === checkList.length - 1) {
              baseWhiteStyle.marginBottom = String(matrixMargin * 4) + ea;
            }
            for (let i in baseWhiteStyle) {
              checkListBaseWhite.style[i] = baseWhiteStyle[i];
            }
            for (let { name, column, items, multiple, type, value, dependency } of checkList[c].items) {

              items = new ItemsArray(items);

              checkListFactor = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
              };
              for (let i in style) {
                checkListFactor.style[i] = style[i];
              }

              checkListFactorTitle = GeneralJs.nodes.div.cloneNode(true);
              checkListFactorTitle.insertAdjacentHTML("beforeend", "<b style=\"color:" + GeneralJs.colorChip.green + "\" >" + String(checkNum + 1) + ".</b>&nbsp;" + name);
              for (let i in styleFactorTitle) {
                checkListFactorTitle.style[i] = styleFactorTitle[i];
              }
              checkListFactor.appendChild(checkListFactorTitle);

              //items tong
              checkListFactorContents = GeneralJs.nodes.div.cloneNode(true);
              checkListFactorContents.id = desid + "_" + column;
              style = {
                position: "relative",
                background: GeneralJs.colorChip.white,
                borderRadius: String(5) + ea,
                padding: String(checkFactorButtonMargin) + ea,
                paddingRight: String(0) + ea,
                marginBottom: String(14) + ea,
                overflow: "hidden",
                width: "calc(100% - " + String(checkFactorButtonMargin + 0) + ea + ")",
                border: "1px solid " + GeneralJs.colorChip.gray2,
              };
              if (!/^object/gi.test(type) && items.maxLength < 16) {
                style.height = String((30 * Math.ceil(items.length / checkDivideNum)) + (checkFactorButtonMargin * (Math.ceil(items.length / checkDivideNum) - 1))) + ea;
              } else {
                style.height = String((30 * Math.ceil(items.length / 1)) + (checkFactorButtonMargin * (Math.ceil(items.length / 1) - 1))) + ea;
              }
              for (let i in style) {
                checkListFactorContents.style[i] = style[i];
              }

              if (type !== "input") {
                for (let i = 0; i < items.length; i++) {
                  checkListFactorContentsItem = GeneralJs.nodes.div.cloneNode(true);
                  if (value.includes(items[i])) {
                    checkListFactorContentsItem.setAttribute("toggle", "on");
                  } else {
                    checkListFactorContentsItem.setAttribute("toggle", "off");
                  }
                  style = {
                    position: "relative",
                    height: String(30) + ea,
                    borderRadius: String(3) + ea,
                    marginRight: String(checkFactorButtonMargin) + ea,
                    marginBottom: String(checkFactorButtonMargin) + ea,
                    cursor: "pointer",
                    transition: "all 0s ease",
                    overflow: "hidden",
                  }
                  if (!/^object/gi.test(type) && items.maxLength < 16) {
                    style.display = "inline-block";
                    style.width = "calc(calc(100% - " + String(checkFactorButtonMargin * (items.length <= checkDivideNum ? items.length : checkDivideNum)) + ea + ") / " + String((items.length <= checkDivideNum ? items.length : checkDivideNum)) + ")";
                    style.background = value.includes(items[i]) ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1;
                  } else {
                    style.display = "block";
                    style.width = "calc(100% - " + String(checkFactorButtonMargin) + ea + ")";
                    if (/^object/gi.test(type)) {
                      style.background = GeneralJs.colorChip.white;
                    } else {
                      style.background = value.includes(items[i]) ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1;
                    }
                  }
                  for (let j in style) {
                    checkListFactorContentsItem.style[j] = style[j];
                  }

                  if (/^object/gi.test(type)) {
                    //gray back
                    checkListFactorContentsItemText = GeneralJs.nodes.div.cloneNode(true);
                    style = {
                      position: "absolute",
                      width: String(minimumButtonWidth) + ea,
                      height: String(30) + ea,
                      borderRadius: String(3) + ea,
                      top: String(0) + ea,
                      left: String(0),
                      background: GeneralJs.colorChip.gray0,
                      cursor: "pointer",
                      transition: "all 0s ease",
                      fontSize: String(13) + ea,
                      fontWeight: String(500),
                      color: GeneralJs.colorChip.black,
                    };
                    for (let j in style) {
                      checkListFactorContentsItemText.style[j] = style[j];
                    }
                    checkListFactorContentsItem.appendChild(checkListFactorContentsItemText);

                    //range number tong
                    checkListFactorContentsItemText = GeneralJs.nodes.div.cloneNode(true);
                    checkListFactorContentsItemText.id = "checkRange" + String(column) + String(checkNum) + String(i) + "value";
                    checkListFactorContentsItemText.classList.add("checkRange" + String(column) + "_value");
                    for (let j in style) {
                      checkListFactorContentsItemText.style[j] = style[j];
                    }
                    checkListFactorContentsItemText.style.left = "";
                    checkListFactorContentsItemText.style.right = String(0);

                    //range number text
                    checkListFactorContentsItemText2 = GeneralJs.nodes.div.cloneNode(true);
                    checkListFactorContentsItemText2.textContent = String(value.search(items[i].column).value);
                    style = {
                      position: "absolute",
                      width: String(minimumButtonWidth) + ea,
                      height: String(30) + ea,
                      fontSize: String(13) + ea,
                      fontWeight: String(500),
                      borderRadius: String(3) + ea,
                      top: String(checkFactorButtonMargin + (GeneralJs.isMac() ? 0 : 2)) + ea,
                      left: String(0),
                      textAlign: "center",
                      color: GeneralJs.colorChip.green,
                      cursor: "pointer",
                      transition: "all 0s ease",
                    };
                    for (let j in style) {
                      checkListFactorContentsItemText2.style[j] = style[j];
                    }
                    checkListFactorContentsItemText.appendChild(checkListFactorContentsItemText2);
                    checkListFactorContentsItem.appendChild(checkListFactorContentsItemText);

                    //ranges
                    for (let j = 0; j < items[i].value; j++) {
                      checkListFactorContentsItemText = GeneralJs.nodes.div.cloneNode(true);
                      checkListFactorContentsItemText.classList.add("hoverDefault");
                      checkListFactorContentsItemText.classList.add("checkRange" + String(column) + "_boxes");
                      checkListFactorContentsItemText.id = "checkRange" + String(column) + String(checkNum) + String(i) + String(j);
                      checkListFactorContentsItemText.setAttribute('x', String(checkNum));
                      checkListFactorContentsItemText.setAttribute('y', String(i));
                      checkListFactorContentsItemText.setAttribute('z', String(j));
                      checkListFactorContentsItemText.setAttribute('max', String(items[i].value));
                      checkListFactorContentsItemText.setAttribute("column", column);
                      checkListFactorContentsItemText.setAttribute("type", type);
                      checkListFactorContentsItemText.setAttribute("value", String(j + 1));
                      checkListFactorContentsItemText.setAttribute("multiple", (type.split('.')[1] === "multiple") ? "true" : "false");
                      style = {
                        position: "absolute",
                        width: "calc(calc(100% - " + String(minimumButtonWidth * 2) + ea + " - " + String(checkFactorButtonMargin * (items[i].value + 1)) + ea + ") / " + String(items[i].value) + ")",
                        height: String(30) + ea,
                        borderRadius: String(3) + ea,
                        top: String(0) + ea,
                        left: "calc(" + String(minimumButtonWidth) + ea + " + calc(calc(calc(100% - " + String(minimumButtonWidth * 2) + ea + " - " + String(checkFactorButtonMargin * (items[i].value + 1)) + ea + ") / " + String(items[i].value) + ") * " + String(j) + " + " + String(checkFactorButtonMargin * (j + 1)) + ea + "))",
                        background: (j < value.search(items[i].column).value) ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray1,
                        cursor: "pointer",
                        transition: "all 0s ease",
                      };
                      for (let k in style) {
                        checkListFactorContentsItemText.style[k] = style[k];
                      }
                      checkListFactorContentsItemText.addEventListener("click", rangeEvent);
                      checkListFactorContentsItem.appendChild(checkListFactorContentsItemText);
                    }

                    //name text
                    checkListFactorContentsItemText = GeneralJs.nodes.div.cloneNode(true);
                    checkListFactorContentsItemText.textContent = items[i].name;
                    style = {
                      position: "absolute",
                      width: String(minimumButtonWidth) + ea,
                      height: String(30) + ea,
                      fontSize: String(13) + ea,
                      fontWeight: String(500),
                      borderRadius: String(3) + ea,
                      top: String(checkFactorButtonMargin + (GeneralJs.isMac() ? 0 : 2)) + ea,
                      left: String(0),
                      textAlign: "center",
                      color: GeneralJs.colorChip.black,
                      cursor: "pointer",
                      transition: "all 0s ease",
                    }
                    for (let j in style) {
                      checkListFactorContentsItemText.style[j] = style[j];
                    }
                    checkListFactorContentsItem.appendChild(checkListFactorContentsItemText);
                  } else {
                    checkListFactorContentsItemText = GeneralJs.nodes.div.cloneNode(true);
                    checkListFactorContentsItemText.textContent = items[i];
                    style = {
                      position: "absolute",
                      width: String(100) + '%',
                      height: String(30) + ea,
                      fontSize: String(13) + ea,
                      fontWeight: String(500),
                      borderRadius: String(3) + ea,
                      top: String(checkFactorButtonMargin + (GeneralJs.isMac() ? 0 : 2)) + ea,
                      textAlign: "center",
                      color: value.includes(items[i]) ? GeneralJs.colorChip.white : GeneralJs.colorChip.deactive,
                      cursor: "pointer",
                      transition: "all 0s ease",
                    }
                    for (let j in style) {
                      checkListFactorContentsItemText.style[j] = style[j];
                    }
                    checkListFactorContentsItem.appendChild(checkListFactorContentsItemText);
                    checkListFactorContentsItem.setAttribute("column", column);
                    checkListFactorContentsItem.setAttribute("type", type);
                    checkListFactorContentsItem.setAttribute("value", items[i]);
                    checkListFactorContentsItem.addEventListener("click", (multiple ? checkBoxEvent : radioEvent));
                  }
                  checkListFactorContents.appendChild(checkListFactorContentsItem);
                }
              } else {
                checkListFactorContentsItem = GeneralJs.nodes.input.cloneNode(true);
                checkListFactorContentsItem.setAttribute("type", "text");
                checkListFactorContentsItem.setAttribute("column", column);
                checkListFactorContentsItem.value = value[0];
                style = {
                  position: "relative",
                  width: String(100) + "%",
                  height: String(26) + ea,
                  fontSize: String(14) + ea,
                  fontWeight: String(300),
                  border: String(0),
                  outline: String(0),
                  left: String(0),
                  padding: String(5) + ea,
                  paddingBottom: String(7) + ea,
                  overflow: "hidden",
                };
                for (let i in style) {
                  checkListFactorContentsItem.style[i] = style[i];
                }
                checkListFactorContentsItem.addEventListener("keypress", inputEvent);
                checkListFactorContentsItem.addEventListener("blur", inputEvent);
                checkListFactorContents.appendChild(checkListFactorContentsItem);
              }

              checkListFactor.appendChild(checkListFactorContents);
              checkListBaseWhite.appendChild(checkListFactor);
              domDictionary[column] = checkListFactorContents;

              checkNum++;
            }
            checkListFactorMiddle.appendChild(checkListBaseWhite);
          }

          checkListBase.appendChild(checkListFactorMiddle);
          div_clone.appendChild(checkListBase);

          //start matrixA
          matrixBase = GeneralJs.nodes.div.cloneNode(true);
          matrixBaseStyle = {
            position: "absolute",
            top: String(0) + ea,
            left: String(leftMargin) + ea,
            width: "calc(100% - " + String((leftMargin * 2) + checkListWidth + (checkListMargin / 2)) + ea + ")",
            height: String(100) + '%',
            background: GeneralJs.colorChip.white,
          };
          for (let i in matrixBaseStyle) {
            matrixBase.style[i] = matrixBaseStyle[i];
          }

          //entire matrix
          matrix = GeneralJs.nodes.div.cloneNode(true);
          matrix.id = desid + "_" + "matrixA";
          style = {
            position: "absolute",
            top: String(0) + ea,
            right: String(0) + ea,
            width: "calc(100% - " + String(leftWordWidth + margin) + ea + ")",
            height: "calc(100% - " + String(bottomWordWidth + margin) + ea + ")",
            background: GeneralJs.colorChip.gray1,
            borderRadius: String(5) + ea,
            border: "1px solid " + GeneralJs.colorChip.gray3,
          };
          for (let i in style) {
            matrix.style[i] = style[i];
          }

          //make 12 boxes
          matrixStyle = {
            position: "absolute",
            width: "calc(calc(100% - " + String(matrixMargin * (xValues.length + 3)) + ea + ") / " + String(xValues.length) + ")",
            height: "calc(calc(100% - " + String(matrixMargin * (yValues.length + 3)) + ea + ") / " + String(yValues.length) + ")",
            borderRadius: String(5) + ea,
            background: GeneralJs.colorChip.white,
            overflow: "hidden",
          };

          style2 = {
            position: "relative",
            display: "block",
            height: "calc(100% / " + String(zValues.length) + ")",
            background: "transparent",
            cursor: "pointer",
            transition: "all 0s ease",
            borderBottom: "1px dashed #dddddd",
            color: "#dddddd",
          };

          style3 = {
            position: "absolute",
            fontSize: String(14) + ea,
            top: "calc(50% - " + String(13.5) + ea + ")",
            width: String(100) + '%',
            textAlign: "center",
            fontFamily: "graphik",
            fontWeight: String(400),
            color: "inherit",
          };

          invisibleStyle = {
            position: "absolute",
            width: String(100) + '%',
            height: String(100) + '%',
            top: String(0) + ea,
            left: String(0) + ea,
            color: "transparent",
            fontSize: String(34) + ea,
            fontWeight: String(400),
            fontFamily: "graphik",
          };

          invisibleTextStyle = {
            position: "absolute",
            top: "calc(50% - " + String(25) + ea + ")",
            width: String(84) + ea,
            left: "calc(50% - " + String(42) + ea + ")",
            textAlign: "center",
            color: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            fontFamily: "inherit",
            cursor: "pointer",
            zIndex: String(0),
          };

          zToggleEvent = async function (e) {
            try {
              const xyzArr = this.getAttribute("xyz").split("_");
              const [ x, y, z ] = xyzArr;
              const xyz = xyzArr.join("");
              const xy = xyzArr[0] + xyzArr[1];
              let friends, boo, invisible;
              let temp0, temp1, temp2;

              if (this.getAttribute("toggle") === "off") {
                this.style.background = "#2fa678";
                this.style.color = GeneralJs.colorChip.white;
                this.firstChild.textContent = this.getAttribute("name") + " : " + this.getAttribute("original");
                this.setAttribute("toggle", "on");
              } else if (this.getAttribute("toggle") === "on") {
                this.style.background = "transparent";
                this.style.color = "#dddddd";
                this.firstChild.textContent = this.getAttribute("original");
                this.setAttribute("toggle", "off");
              }

              friends = document.querySelectorAll("." + classNameConst + xy);
              boo = true;
              invisible = document.getElementById(classNameConst + xy + "invisible");

              for (let i of friends) {
                if (i.getAttribute("toggle") === "off") {
                  boo = false;
                }
              }

              if (boo) {
                for (let i = 0; i < friends.length - 1; i++) {
                  friends[i].style.borderBottom = "1px dashed #2fa678";
                  friends[i].style.color = "transparent";
                }
                friends[friends.length - 1].style.color = "transparent";
                invisible.style.color = GeneralJs.colorChip.white;
                invisible.firstChild.style.zIndex = String(1);
              } else {
                for (let i = 0; i < friends.length - 1; i++) {
                  if (friends[i].getAttribute("toggle") === "on") {
                    friends[i].style.color = GeneralJs.colorChip.white;
                  } else {
                    friends[i].style.color = "#dddddd";
                  }
                  friends[i].style.borderBottom = "1px dashed #dddddd";
                }
                if (friends[friends.length - 1].getAttribute("toggle") === "on") {
                  friends[friends.length - 1].style.color = GeneralJs.colorChip.white;
                } else {
                  friends[friends.length - 1].style.color = "#dddddd";
                }
                invisible.style.color = "transparent";
                invisible.firstChild.style.zIndex = String(0);
              }

              temp0 = [];
              for (let i = 0; i < xValues.length; i++) {
                temp1 = [];
                for (let j = 0; j < yValues.length; j++) {
                  temp2 = [];
                  for (let k = 0; k < zValues.length; k++) {
                    if (totalMatrix[i][j][k].getAttribute("toggle") === "on") {
                      temp2.push(1);
                    } else {
                      temp2.push(0);
                    }
                  }
                  temp1.push(temp2);
                }
                temp0.push(temp1);
              }

              await GeneralJs.ajaxPromise("type=matrix&order=" + JSON.stringify(temp0) + "&column=matrixA&button=update&desid=" + desid + "&matrixA=" + JSON.stringify(temp0), "/designerMatrix");

            } catch (e) {
              GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
              console.log(e);
            }
          }

          //make totalMatrix dom
          for (let i = 0; i < xValues.length; i++) {
            temp = [];
            for (let j = 0; j < yValues.length; j++) {
              temp.push([]);
            }
            totalMatrix.push(temp);
          }

          for (let i = 0; i < boxNumber; i++) {
            x = i % xValues.length;
            y = Math.floor(i / xValues.length);

            matrixFactor = GeneralJs.nodes.div.cloneNode(true);
            for (let j in matrixStyle) {
              matrixFactor.style[j] = matrixStyle[j];
            }
            matrixFactor.style.top = "calc(" + String(matrixMargin * 2) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (yValues.length + 3)) + ea + ") / " + String(yValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(y) + "))";
            matrixFactor.style.left = "calc(" + String(matrixMargin * 2) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (xValues.length + 3)) + ea + ") / " + String(xValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(x) + "))";

            //make invisible background
            invisible = GeneralJs.nodes.div.cloneNode(true);
            invisible.id = classNameConst + String(x) + String(y) + "invisible";
            for (let j in invisibleStyle) {
              invisible.style[j] = invisibleStyle[j];
            }
            invisibleText = GeneralJs.nodes.div.cloneNode(true);
            invisibleText.classList.add("hoverDefault_lite");
            for (let j in invisibleTextStyle) {
              invisibleText.style[j] = invisibleTextStyle[j];
            }
            invisibleText.textContent = xValues[x] + yValues[y];
            invisibleText.setAttribute('x', x);
            invisibleText.setAttribute('y', y);
            invisibleText.addEventListener("click", function (e) {
              document.getElementById(classNameConst + String(this.getAttribute('x')) + String(this.getAttribute('y')) + String(1)).click();
            });
            invisible.appendChild(invisibleText);
            matrixFactor.appendChild(invisible);

            //make z titles
            for (let j = 0; j < zValues.length; j++) {
              z = j;

              zTitleBox = GeneralJs.nodes.div.cloneNode(true);
              zTitleBox.classList.add(classNameConst);
              zTitleBox.classList.add(classNameConst + String(x) + String(y));
              zTitleBox.id = classNameConst + String(x) + String(y) + String(j);
              zTitleBox.setAttribute("name", xValues[x] + yValues[y]);
              zTitleBox.setAttribute("original", zValues[j]);
              zTitleBox.setAttribute("xyz", String(x) + '_' + String(y) + '_' + String(j));

              if (matrixA[x][y][z] === 0) {
                zTitleBox.setAttribute("toggle", "off");
                style2.background = "transparent";
                style2.color = "#dddddd";
              } else {
                zTitleBox.setAttribute("toggle", "on");
                style2.background = "#2fa678";
                style2.color = GeneralJs.colorChip.white;
              }

              for (let k in style2) {
                zTitleBox.style[k] = style2[k];
              }
              if (j === zValues.length - 1) {
                zTitleBox.style.borderBottom = "";
              }
              zTitleBox.addEventListener("click", zToggleEvent);

              zTitleBoxWord = GeneralJs.nodes.div.cloneNode(true);
              for (let k in style3) {
                zTitleBoxWord.style[k] = style3[k];
              }
              zTitleBoxWord.textContent = zValues[j];
              zTitleBox.appendChild(zTitleBoxWord);

              totalMatrix[x][y].push(zTitleBox);
              matrixFactor.appendChild(zTitleBox);
            }

            if (!matrixA[x][y].includes(0)) {
              for (let z = 0; z < totalMatrix[x][y].length; z++) {
                if (z !== totalMatrix[x][y].length - 1) {
                  totalMatrix[x][y][z].style.borderBottom = "1px dashed #2fa678";
                }
                totalMatrix[x][y][z].style.color = "transparent";
              }
              invisible.style.color = GeneralJs.colorChip.white;
              invisible.firstChild.style.zIndex = String(1);
            }

            matrix.appendChild(matrixFactor);
          }
          matrixBase.appendChild(matrix);

          //make x-titles
          xTitleBoxesTong = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            bottom: String(0) + ea,
            right: String(0) + ea,
            width: "calc(100% - " + String(leftWordWidth + margin) + ea + ")",
            height: String(bottomWordWidth) + ea,
          };
          for (let i in style) {
            xTitleBoxesTong.style[i] = style[i];
          }
          style = {
            position: "absolute",
            width: "calc(calc(100% - " + String(matrixMargin * (xValues.length + 3)) + ea + ") / " + String(xValues.length) + ")",
            height: String(bottomWordWidth) + ea,
          };
          style2 = {
            position: "absolute",
            width: String(100) + '%',
            fontSize: String(23) + ea,
            bottom: String(0),
            textAlign: "center",
            fontFamily: "graphik",
            fontWeight: String(400),
          };
          for (let i = 0; i < xValues.length; i++) {
            xTitleBox = GeneralJs.nodes.div.cloneNode(true);
            for (let j in style) {
              xTitleBox.style[j] = style[j];
            }
            xTitleBox.style.left = "calc(" + String(matrixMargin * 2) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (xValues.length + 3)) + ea + ") / " + String(xValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(i % xValues.length) + "))";

            xTitleBoxWord = GeneralJs.nodes.div.cloneNode(true);
            for (let j in style2) {
              xTitleBoxWord.style[j] = style2[j];
            }
            xTitleBoxWord.textContent = xValues[i];
            xTitleBox.appendChild(xTitleBoxWord);

            xTitleBoxesTong.appendChild(xTitleBox);
          }
          matrixBase.appendChild(xTitleBoxesTong);

          //make ytitles
          yTitleBoxesTong = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(leftWordWidth + margin) + ea,
            height: "calc(100% - " + String(bottomWordWidth + margin) + ea + ")",
          };
          for (let i in style) {
            yTitleBoxesTong.style[i] = style[i];
          }
          style = {
            position: "absolute",
            width: String(leftWordWidth) + ea,
            height: "calc(calc(100% - " + String(matrixMargin * (yValues.length + 3)) + ea + ") / " + String(yValues.length) + ")",
            left: String(0) + ea,
          };
          style2 = {
            position: "absolute",
            fontSize: String(23) + ea,
            top: "calc(50% - " + String(16) + ea + ")",
            textAlign: "center",
            fontFamily: "graphik",
            fontWeight: String(400),
          };
          for (let i = 0; i < yValues.length; i++) {
            yTitleBox = GeneralJs.nodes.div.cloneNode(true);
            for (let j in style) {
              yTitleBox.style[j] = style[j];
            }
            yTitleBox.style.top = "calc(" + String(matrixMargin * 2) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (yValues.length + 3)) + ea + ") / " + String(yValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(i) + "))";

            yTitleBoxWord = GeneralJs.nodes.div.cloneNode(true);
            for (let j in style2) {
              yTitleBoxWord.style[j] = style2[j];
            }
            yTitleBoxWord.textContent = yValues[i];
            yTitleBox.appendChild(yTitleBoxWord);

            yTitleBoxesTong.appendChild(yTitleBox);
          }
          matrixBase.appendChild(yTitleBoxesTong);

          div_clone.appendChild(matrixBase);

          //memo box
          GeneralJs.timeouts["checkListMemoBox"] = setTimeout(function () {
            GeneralJs.ajax("method=designer&property=history&idArr=" + JSON.stringify([ desid ]), "/getHistoryProperty", function (res) {
              const resObj = JSON.parse(res);
              if (resObj[desid] === undefined) {
                throw new Error("history error");
              }
              const history = resObj[desid];
              let memoBox;
              let memoWhite;
              let memoTitle;
              let memoArea;
              let memoTextScroll, memoText;
              let style;
              let ea;

              ea = "px";

              memoBox = GeneralJs.nodes.div.cloneNode(true);
              memoBox.setAttribute("mode", "left");
              style = {
                ...matrixBaseStyle,
                display: "block",
                right: "",
                borderRadius: String(5) + ea,
                border: "1px solid " + GeneralJs.colorChip.gray3,
                background: GeneralJs.colorChip.gray1,
                animation: "fadeupmiddle 0.3s ease forwards"
              };
              for (let i in style) {
                memoBox.style[i] = style[i];
              }
              memoBox.addEventListener("contextmenu", function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (this.getAttribute("mode") === "left") {
                  this.style.width = checkListBaseStyle.width;
                  this.style.left = "";
                  this.style.right = checkListBaseStyle.right;
                  this.setAttribute("mode", "right");
                } else {
                  this.style.width = matrixBaseStyle.width;
                  this.style.right = "";
                  this.style.left = matrixBaseStyle.left;
                  this.setAttribute("mode", "left");
                }
              });
              memoBox.addEventListener("dblclick", function (e) {
                this.style.display = "none";
                this.style.animation = "";
              });

              memoWhite = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                top: String(matrixMargin * 2) + ea,
                left: String(matrixMargin * 2) + ea,
                width: "calc(100% - " + String(matrixMargin * 4) + ea + ")",
                height: "calc(100% - " + String(matrixMargin * 4) + ea + ")",
                borderRadius: String(5) + ea,
                background: GeneralJs.colorChip.white,
              };
              for (let i in style) {
                memoWhite.style[i] = style[i];
              }
              memoBox.appendChild(memoWhite);

              memoTitle = GeneralJs.nodes.div.cloneNode(true);
              memoTitle.insertAdjacentHTML("beforeend", '<b style="color:' + GeneralJs.colorChip.green + '">0. </b> ' + designer + ' 디자이너 메모');
              style = {
                position: "absolute",
                top: String((matrixMargin * 2) + 3) + ea,
                left: String(matrixMargin * 2) + ea,
                fontSize: String(14) + ea,
                fontWeight: String(600),
                color: GeneralJs.colorChip.black,
                marginBottom: String(7) + ea,
              }
              for (let i in style) {
                memoTitle.style[i] = style[i];
              }
              memoWhite.appendChild(memoTitle);

              memoArea = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                top: String((matrixMargin * 2) + 3 + 19 + 7) + ea,
                left: String(matrixMargin * 2) + ea,
                width: "calc(100% - " + String(matrixMargin * 4) + ea + ")",
                height: "calc(100% - " + String((matrixMargin * 4) + 3 + 19 + 7) + ea + ")",
                borderRadius: String(5) + ea,
                border: "1px solid " + GeneralJs.colorChip.gray2,
                boxSizing: "border-box",
              }
              for (let i in style) {
                memoArea.style[i] = style[i];
              }

              memoWhite.appendChild(memoArea);

              memoTextScroll = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String((matrixMargin * 2) - 4) + ea,
                left: String(matrixMargin * 2) + ea,
                width: "calc(100% - " + String(matrixMargin * 4) + ea + ")",
                height: "calc(100% - " + String((matrixMargin * 4) - 4) + ea + ")",
                overflow: "scroll",
              }
              for (let i in style) {
                memoTextScroll.style[i] = style[i];
              }
              memoArea.appendChild(memoTextScroll);

              memoText = GeneralJs.nodes.textarea.cloneNode(true);
              memoText.value = history;
              style = {
                position: "absolute",
                top: String(0) + ea,
                left: String(0) + ea,
                width: String(100) + '%',
                height: String(5000) + ea,
                fontSize: String(14) + ea,
                fontWeight: String(300),
                outline: String(0),
                border: String(0),
                lineHeight: String(1.66),
                wordSpacing: String(-1) + ea,
                color: GeneralJs.colorChip.black
              }
              for (let i in style) {
                memoText.style[i] = style[i];
              }
              memoText.addEventListener("blur", function (e) {
                const cookies = GeneralJs.getCookiesAll();
                const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
              });
              memoText.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                  const cookies = GeneralJs.getCookiesAll();
                  const ajaxData = "method=designer&id=" + desid + "&column=history&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              })

              memoTextScroll.appendChild(memoText);

              instance.whiteMemoBox = memoBox;
              div_clone.appendChild(memoBox);

              memoText.focus();
            });
            clearTimeout(GeneralJs.timeouts["checkListMemoBox"]);
            GeneralJs.timeouts["checkListMemoBox"] = null;
          }, 500);

          instance.whiteMatrixA = div_clone;
          motherArea.appendChild(div_clone);

        });

      // DEV => designer needs and schedule area =================================================================
      // =========================================================================================================
      // =========================================================================================================
      } else if (false) {
      // } else if (instance.whiteConvert === 1) {

        //convert animation
        if (instance.whiteMatrixA !== null) {
          instance.whiteMatrixA.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        if (contentsArea.style.animation !== "fadeoutlite 0.3s ease forwards") {
          contentsArea.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        instance.whiteConvert = 3;
        GeneralJs.timeouts["whiteConvertMatrixB"] = setTimeout(function () {
          if (instance.whiteMatrixA !== null) {
            motherArea.removeChild(instance.whiteMatrixA);
          }
          instance.whiteConvert = 2;
          instance.whiteMatrixA = null;
          clearTimeout(GeneralJs.timeouts["whiteConvertMatrixB"]);
          GeneralJs.timeouts["whiteConvertMatrixB"] = null;
        }, 301);

        //start matrixB
        div_clone = contentsArea.cloneNode(false);
        div_clone.style.animation = "fadeinlite 0.3s ease forwards";

        const { matrixB, values } = JSON.parse(await GeneralJs.ajaxPromise("button=get" + "&desid=" + desid + "&target=matrixB", "/designerMatrix"));
        const { xValues, yValues } = values;
        const classNameConst = "designerMatrixFactor";

        let matrixBase;
        let matrix;
        let leftWordWidth;
        let bottomWordWidth;
        let margin;
        let boxNumber;
        let matrixFactor;
        let matrixStyle, matrixMargin;
        let xTitleBoxesTong, yTitleBoxesTong;
        let xTitleBox, yTitleBox;
        let xTitleBoxWord, yTitleBoxWord;
        let x, y;
        let hoverEvent, leaveEvent, clickEvent;
        let domBox;

        domBox = [];
        leftWordWidth = 26;
        bottomWordWidth = 30;
        margin = 10;
        matrixMargin = 6;
        boxNumber = xValues.length * yValues.length;

        //base
        matrixBase = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(0) + ea,
          left: String(leftMargin) + ea,
          width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
          height: String(100) + '%',
          background: GeneralJs.colorChip.white,
        };
        for (let i in style) {
          matrixBase.style[i] = style[i];
        }

        //entire matrix
        matrix = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(0) + ea,
          right: String(0) + ea,
          width: "calc(100% - " + String(leftWordWidth + margin) + ea + ")",
          height: "calc(100% - " + String(bottomWordWidth + margin) + ea + ")",
          borderRadius: String(5) + ea,
        };
        for (let i in style) {
          matrix.style[i] = style[i];
        }

        //make boxes
        matrixStyle = {
          position: "absolute",
          width: "calc(calc(100% - " + String(matrixMargin * (xValues.length - 1)) + ea + ") / " + String(xValues.length) + ")",
          height: "calc(calc(100% - " + String(matrixMargin * (yValues.length - 1)) + ea + ") / " + String(yValues.length) + ")",
          borderRadius: String(5) + ea,
          background: GeneralJs.colorChip.white,
          overflow: "hidden",
          border: "1px solid #dddddd",
          cursor: "pointer",
          transition: "all 0.2s ease",
        };

        hoverEvent = function (e) {
          const xyArr = this.getAttribute("xy").split("_");
          const thisLevel = this.getAttribute("level");
          const [ x, y ] = xyArr;
          let targets;

          if (this.getAttribute("hover") === "off" && this.getAttribute("toggle") === "off") {
            targets = document.querySelectorAll('.' + classNameConst + x);
            for (let dom of targets) {
              if (Number(dom.getAttribute("level")) < Number(thisLevel)) {
                if (dom.getAttribute("toggle") === "off") {
                  dom.style.background = "#d5ede4";
                  dom.setAttribute("hover", "on");
                }
              }
            }
            this.style.background = "#acdbc9";
            this.setAttribute("hover", "on");
          } else {
            this.style.background = "#acdbc9";
            this.setAttribute("hover", "on");
          }
        }

        leaveEvent = function (e) {
          const xyArr = this.getAttribute("xy").split("_");
          const thisLevel = this.getAttribute("level");
          const [ x, y ] = xyArr;
          let targets;

          if (this.getAttribute("hover") === "on" && this.getAttribute("toggle") === "off") {
            targets = document.querySelectorAll('.' + classNameConst + x);
            for (let dom of targets) {
              if (Number(dom.getAttribute("level")) < Number(thisLevel)) {
                if (dom.getAttribute("toggle") === "off") {
                  dom.style.background = "";
                  dom.setAttribute("hover", "off");
                }
              }
            }
            this.style.background = "";
            this.setAttribute("hover", "off");
          } else {
            this.style.background = "#2fa678";
            this.setAttribute("hover", "off");
          }
        }

        clickEvent = async function (e) {
          try {
            const xyArr = this.getAttribute("xy").split("_");
            const thisLevel = this.getAttribute("level");
            const [ x, y ] = xyArr;
            let targets;
            let resultArr;
            let num;

            targets = document.querySelectorAll('.' + classNameConst + x);
            for (let dom of targets) {
              if (Number(dom.getAttribute("level")) < Number(thisLevel)) {
                dom.style.background = "#2fa678";
                dom.setAttribute("toggle", "on");
              } else {
                dom.style.background = "";
                dom.setAttribute("toggle", "off");
              }
            }
            this.style.background = "#2fa678";
            this.setAttribute("toggle", "on");

            resultArr = [];
            for (let arr of domBox) {
              num = 0;
              for (let dom of arr) {
                if (dom.getAttribute("toggle") === "on") {
                  num = num + 1;
                }
              }
              resultArr.push(num);
            }

            await GeneralJs.ajaxPromise("button=update" + "&desid=" + desid + "&matrixB=" + JSON.stringify(resultArr), "/designerMatrix");
          } catch (e) {
            GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
            console.log(e);
          }
        }

        for (let i = 0; i < xValues.length; i++) {
          temp = [];
          for (let j = 0; j < yValues.length; j++) {
            temp.push({});
          }
          domBox.push(temp);
        }

        for (let i = 0; i < boxNumber; i++) {
          x = i % xValues.length;
          y = Math.floor(i / xValues.length);

          matrixFactor = GeneralJs.nodes.div.cloneNode(true);
          for (let j in matrixStyle) {
            matrixFactor.style[j] = matrixStyle[j];
          }
          matrixFactor.style.top = "calc(" + String(0) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (yValues.length - 1)) + ea + ") / " + String(yValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(y) + "))";
          matrixFactor.style.left = "calc(" + String(0) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (xValues.length - 1)) + ea + ") / " + String(xValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(x) + "))";

          matrixFactor.classList.add(classNameConst + String(x));
          matrixFactor.setAttribute("hover", "off");
          matrixFactor.setAttribute("xy", String(x) + "_" + String(y));
          matrixFactor.setAttribute("level", yValues[y]);

          matrixFactor.addEventListener("mouseover", hoverEvent);
          matrixFactor.addEventListener("mouseleave", leaveEvent);
          matrixFactor.addEventListener("click", clickEvent);

          domBox[x][y] = matrixFactor;
          matrix.appendChild(matrixFactor);
        }
        matrixBase.appendChild(matrix);

        for (let i = 0; i < domBox.length; i++) {
          for (let j = 0; j < domBox[i].length; j++) {
            if (j >= matrixB[i]) {
              domBox[i][domBox[i].length - j - 1].setAttribute("toggle", "off");
              domBox[i][domBox[i].length - j - 1].style.background = "transparent";
            } else {
              domBox[i][domBox[i].length - j - 1].setAttribute("toggle", "on");
              domBox[i][domBox[i].length - j - 1].style.background = "#2fa678";
            }
          }
        }

        //make x-titles
        xTitleBoxesTong = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          bottom: String(0) + ea,
          right: String(0) + ea,
          width: "calc(100% - " + String(leftWordWidth + margin) + ea + ")",
          height: String(bottomWordWidth) + ea,
        };
        for (let i in style) {
          xTitleBoxesTong.style[i] = style[i];
        }
        style = {
          position: "absolute",
          width: "calc(calc(100% - " + String(matrixMargin * (xValues.length - 1)) + ea + ") / " + String(xValues.length) + ")",
          height: String(bottomWordWidth) + ea,
        };
        style2 = {
          position: "absolute",
          width: String(100) + '%',
          fontSize: String(17) + ea,
          bottom: String(0),
          textAlign: "center",
          fontWeight: String(600),
        };
        for (let i = 0; i < xValues.length; i++) {
          xTitleBox = GeneralJs.nodes.div.cloneNode(true);
          for (let j in style) {
            xTitleBox.style[j] = style[j];
          }
          xTitleBox.style.left = "calc(" + String(0) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (xValues.length - 1)) + ea + ") / " + String(xValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(i % xValues.length) + "))";

          xTitleBoxWord = GeneralJs.nodes.div.cloneNode(true);
          for (let j in style2) {
            xTitleBoxWord.style[j] = style2[j];
          }
          xTitleBoxWord.textContent = xValues[i];
          xTitleBox.appendChild(xTitleBoxWord);

          xTitleBoxesTong.appendChild(xTitleBox);
        }
        matrixBase.appendChild(xTitleBoxesTong);

        //make ytitles
        yTitleBoxesTong = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(leftWordWidth + margin) + ea,
          height: "calc(100% - " + String(bottomWordWidth + margin) + ea + ")",
        };
        for (let i in style) {
          yTitleBoxesTong.style[i] = style[i];
        }
        style = {
          position: "absolute",
          width: String(leftWordWidth) + ea,
          height: "calc(calc(100% - " + String(matrixMargin * (yValues.length - 1)) + ea + ") / " + String(yValues.length) + ")",
          left: String(0) + ea,
        };
        style2 = {
          position: "absolute",
          fontSize: String(18) + ea,
          top: "calc(50% - " + String(12) + ea + ")",
          textAlign: "center",
          fontFamily: "graphik",
          fontWeight: String(400),
        };
        for (let i = 0; i < yValues.length; i++) {
          yTitleBox = GeneralJs.nodes.div.cloneNode(true);
          for (let j in style) {
            yTitleBox.style[j] = style[j];
          }
          yTitleBox.style.top = "calc(" + String(0) + ea + " + calc(calc(calc(calc(100% - " + String(matrixMargin * (yValues.length - 1)) + ea + ") / " + String(yValues.length) + ") + " + String(matrixMargin) + ea + ") * " + String(i) + "))";

          yTitleBoxWord = GeneralJs.nodes.div.cloneNode(true);
          for (let j in style2) {
            yTitleBoxWord.style[j] = style2[j];
          }
          yTitleBoxWord.textContent = yValues[i];
          yTitleBox.appendChild(yTitleBoxWord);

          yTitleBoxesTong.appendChild(yTitleBox);
        }
        matrixBase.appendChild(yTitleBoxesTong);

        div_clone.appendChild(matrixBase);

        instance.whiteMatrixB = div_clone;
        motherArea.appendChild(div_clone);

      // =========================================================================================================
      // =========================================================================================================
      } else if (instance.whiteConvert === 1 || instance.whiteConvert === 2) {
      // } else if (instance.whiteConvert === 2) {

        //disconnect sse
        es.close();
        esConnect = false;
        es = null;
        instance.whiteSse = null;

        //convert animation
        if (instance.whiteMatrixA !== null) {
          instance.whiteMatrixA.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        if (instance.whiteMatrixB !== null) {
          instance.whiteMatrixB.style.animation = "fadeoutlite 0.3s ease forwards";
        }
        contentsArea.style.opacity = String(1);
        instance.whiteConvert = 3;
        GeneralJs.timeouts["whiteConvertMatrixReturn"] = setTimeout(function () {
          if (instance.whiteMatrixA !== null) {
            motherArea.removeChild(instance.whiteMatrixA);
          }
          if (instance.whiteMatrixB !== null) {
            motherArea.removeChild(instance.whiteMatrixB);
          }
          instance.whiteConvert = 0;
          instance.whiteMatrixA = null;
          instance.whiteMatrixB = null;
          clearTimeout(GeneralJs.timeouts["whiteConvertMatrixReturn"]);
          GeneralJs.timeouts["whiteConvertMatrixReturn"] = null;
        }, 301);

      }

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
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

DesignerJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.backGrayBar();
    await this.spreadData();
    this.addTransFormEvent();
    this.addSearchEvent();
    this.addExtractEvent();
    this.whiteResize();

    this.user = GeneralJs.getUser();

    const getObj = GeneralJs.returnGet();
    let getTarget;
    let tempFunction;

    getTarget = null;
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
    } else if (getObj.mode === "aspirant") {

      tempFunction = this.cardViewMaker();
      tempFunction().then(() => {
        const temp = instance.reportViewMaker();
        temp();
      });

    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
