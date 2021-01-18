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
}

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
      let s, h, arr, toggle;
      s = document.createDocumentFragment();
      h = document.createDocumentFragment();
      arr = [];
      toggle = Number(instance.standardDoms[0].getAttribute("sort"));
      for (let i = 1; i < instance.standardDoms.length; i++) {
        arr.push({ standard: instance.standardDoms[i], caseDom: instance.caseDoms[i] });
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
      for (let { standard, caseDom } of arr) {
        s.appendChild(standard);
        h.appendChild(caseDom);
      }
      instance.totalMother.firstChild.appendChild(s);
      instance.totalMother.lastChild.appendChild(h);
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
      div_clone3.addEventListener("click", sortEventFunction(0));
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = pid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[1]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("click", sortEventFunction(1));
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
      const clickEventFunction = eventFunction(left);
      clickEventFunction.call(this, e);

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
          const standardArea = instance.totalMother.lastChild;
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
            finalValue = GeneralJs.vaildValue(column, this.value, pastRawData);
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
      let button_clone;
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
          height: String(document.querySelector('.totalMother').lastChild.getBoundingClientRect().height) + ea,
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
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

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
          const calendar = instance.mother.makeCalendar((this.textContent === '-' || this.textContent === '') ? (new Date()) : this.textContent, updateValueEvent);
          button_clone.appendChild(calendar.calendarBase);
          button_clone.style.height = String(calendar.calendarHeight) + ea;
          this.appendChild(button_clone);

        } else if (thisMap.type !== "object" && thisMap.items !== undefined) {

          cancel_inputBack.style.background = "white";
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;

          width = GeneralJs.calculationMenuWidth(fontSize, thisMap.items);

          for (let i = 0; i < thisMap.items.length; i++) {
            button_clone = GeneralJs.nodes.div.cloneNode(true);
            button_clone.classList.add("removeTarget");
            button_clone.textContent = thisMap.items[i];
            button_clone.setAttribute("buttonValue", thisMap.items[i]);
            style = {
              position: "absolute",
              top: String(((height * 2) * (i + 1)) - top) + ea,
              left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
              width: String(width) + ea,
              paddingTop: String(height * (GeneralJs.isMac() ? 0.3 : 0.4)) + ea,
              height: String(height * (GeneralJs.isMac() ? 1.5 : 1.4)) + ea,
              background: "#2fa678",
              textAlign: "center",
              fontSize: "inherit",
              color: "#ffffff",
              zIndex: String(3),
              borderRadius: String(3) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              boxShadow: "0px 2px 11px -6px #2fa678",
            };
            for (let j in style) {
              button_clone.style[j] = style[j];
            }
            button_clone.addEventListener("click", updateValueEvent);
            this.appendChild(button_clone);
          }

        } else if (thisMap.type !== "object" && thisMap.address !== undefined && e.type === "click") {

          cancel_inputBack.style.background = "white";
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

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
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";
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
      let button_clone;
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
          let s, h, arr;
          s = document.createDocumentFragment();
          h = document.createDocumentFragment();
          arr = [];
          for (let i = 1; i < instance.caseDoms.length; i++) {
            arr.push({ standard: instance.standardDoms[i], caseDom: instance.caseDoms[i] });
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

          for (let { standard, caseDom } of arr) {
            s.appendChild(standard);
            h.appendChild(caseDom);
          }
          instance.totalMother.firstChild.appendChild(s);
          instance.totalMother.lastChild.appendChild(h);
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
        height: String(document.querySelector('.totalMother').lastChild.getBoundingClientRect().height) + ea,
        opacity: String(0.7),
        zIndex: String(3),
        background: "white",
        animation: "justfadeinmiddle 0.3s ease forwards",
      };
      for (let i in style) {
        cancel_inputBack.style[i] = style[i];
      }
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
        button_clone.textContent = items[i];
        button_clone.setAttribute("buttonValue", items[i]);
        style = {
          position: "absolute",
          top: String(((height * 2) * (i + 1)) - top) + ea,
          left: "calc(50% - " + String((width / 2) + 0.1) + ea + ")",
          width: String(width) + ea,
          paddingTop: String(height * (GeneralJs.isMac() ? 0.3 : 0.4)) + ea,
          height: String(height * (GeneralJs.isMac() ? 1.5 : 1.4)) + ea,
          background: "#2fa678",
          textAlign: "center",
          fontSize: "inherit",
          color: "#ffffff",
          zIndex: String(3),
          borderRadius: String(3) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          boxShadow: "0px 2px 11px -6px #2fa678",
        };
        for (let j in style) {
          button_clone.style[j] = style[j];
        }
        if (i < 2) {
          button_clone.addEventListener("click", sort_event(i === 0));
        } else if (i === 2) {
          button_clone.addEventListener("click", function (e) {
            for (let j = 1; j < instance.caseDoms.length; j++) {
              instance.standardDoms[j].style.display = "block";
              instance.caseDoms[j].style.display = "block";
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
                } else {
                  instance.standardDoms[j].style.display = "block";
                  instance.caseDoms[j].style.display = "block";
                }
              } else {
                if (/^1[6789]/.test(instance.caseDoms[j].children[z].textContent)) {
                  instance.standardDoms[j].style.display = this.textContent === "Y" ? "none": "block";
                  instance.caseDoms[j].style.display = this.textContent === "Y" ? "none": "block";
                } else {
                  instance.standardDoms[j].style.display = this.textContent === "Y" ? "block": "none";
                  instance.caseDoms[j].style.display = this.textContent === "Y" ? "block": "none";
                }
              }
            }
            cancel_event.call(this, e);
          });
        }
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

}

ContentsJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let contentsArr, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;
    let designers;

    if (search === null) {
      contentsArr = JSON.parse(await GeneralJs.ajaxPromise("limit=200", "/getContents"));
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
      let clickEvent;
      let resetEvent;
      let originalHeight, compressHeight, expandHeight, expandGrayHeight;
      let domStyle, titleStyle, grayStyle;
      let raws;
      let overrideSearch;
      let allSearchTargets;

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
      };

      titleStyle = {
        fontSize: String(1.8) + "vh",
        fontWeight: String(700),
        display: "block",
        height: String(10) + "%",
        cursor: "pointer",
        color: "#404040",
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
        for (let { dom, title, gray } of createViewDoms) {
          for (let i in domStyle) {
            dom.style[i] = domStyle[i];
          }
          for (let i in titleStyle) {
            title.style[i] = titleStyle[i];
            title.textContent = titles[num];
          }
          for (let i in grayStyle) {
            gray.style[i] = grayStyle[i];
          }

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
        title.textContent = "";
        title.insertAdjacentHTML("beforeend", inputHtml);
        title.style.color = "#2fa678";

        if (/\:/.test(title2.textContent)) {
          inputHtml = (title2.textContent.split(" : "))[0] + appendHtml("#2fa678", true);
        } else {
          inputHtml = title2.textContent + appendHtml("#2fa678", true);
        }
        title2.textContent = "";
        title2.insertAdjacentHTML("beforeend", inputHtml);
        title2.style.color = "#2fa678";

        if (/\:/.test(title3.textContent)) {
          inputHtml = (title3.textContent.split(" : "))[0] ;
        } else {
          inputHtml = title3.textContent;
        }
        title3.textContent = inputHtml;
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
            instance.mother.getWhitePrompt("big", function (white, cancelBox) {
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
                    tempObj = String(tempDate.getFullYear()) + '-' + ((tempDate.getMonth() < 9) ? '0' + String(tempDate.getMonth() + 1) : String(tempDate.getMonth() + 1)) + '-' + ((tempDate.getDate() < 10) ? '0' + String(tempDate.getDate()) : String(tempDate.getDate()));
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
                right: String(122.5) + ea,
                width: String(46) + ea,
                height: String(30) + ea,
                background: "#2fa678",
                borderRadius: String(3) + ea,
              };
              for (let j in style) {
                div_clone.style[j] = style[j];
              }

              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              style = {
                fontSize: String(14) + ea,
                color: "white",
                fontWeight: String(600),
                position: "absolute",
                top: String(GeneralJs.isMac() ? 4 : 5) + ea,
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
                    await GeneralJs.ajaxPromise("requestObj=" + JSON.stringify({ title, description, start, end }), "/makeSchedule");

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
                right: String(46) + ea,
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
                fontSize: String(14) + ea,
                color: "white",
                fontWeight: String(600),
                position: "absolute",
                top: String(GeneralJs.isMac() ? 4 : 5) + ea,
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

            });
          }

          clearTimeout(GeneralJs.timeouts.firstContentsCreateViewDomsTimeout);
          GeneralJs.timeouts.firstContentsCreateViewDomsTimeout = null;
        }, 300);
      }

      GeneralJs.stacks.firstContentsCreateViewDoms = [];
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

        GeneralJs.stacks.firstContentsCreateViewDoms.push(div_clone2);
        div_clone.appendChild(div_clone2);
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
        title.textContent = "";
        title.insertAdjacentHTML("beforeend", inputHtml);
        title.style.color = "#2fa678";

        if (/\:/.test(title2.textContent)) {
          inputHtml = (title2.textContent.split(" : "))[0] + appendHtml("#2fa678", true);
        } else {
          inputHtml = title2.textContent + appendHtml("#2fa678", true);
        }
        title2.textContent = "";
        title2.insertAdjacentHTML("beforeend", inputHtml);
        title2.style.color = "#2fa678";

        if (/\:/.test(title3.textContent)) {
          inputHtml = (title3.textContent.split(" : "))[0] ;
        } else {
          inputHtml = title3.textContent;
        }
        title3.textContent = inputHtml;
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
  let rInitial, rInitialBox;
  let updateEventFunction;
  let contentsBoxHeight, contentsBoxBottom;
  let lineHeightRatio;
  let detailTongTarget, detailTargetHeightConst;
  let detailFocusEvent, detailBlurEvent;
  let visualSpecificMarginTop;
  let textAreas;
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

  //r initial icon
  rInitial = SvgTong.stringParsing(this.mother.returnRinitial("#2fa678"));
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
  rInitialBox.style.background = "white";
  div_clone2.appendChild(rInitialBox);

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
            finalValue = GeneralJs.vaildValue(column, this.value, pastRawData);
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
      let button_clone;
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
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

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
          const calendar = instance.mother.makeCalendar((this.textContent === '-' || this.textContent === '') ? (new Date()) : this.textContent, updateValueEvent);
          button_clone.appendChild(calendar.calendarBase);
          button_clone.style.height = String(calendar.calendarHeight) + ea;
          this.appendChild(button_clone);

        } else if (thisMap.type !== "object" && thisMap.items !== undefined) {

          cancel_inputBack.style.background = "white";
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

          this.style.overflow = "";
          height = Number(this.style.height.replace((new RegExp(ea, "gi")), ''));
          fontSize = Number(this.style.fontSize.replace((new RegExp(ea, "gi")), ''));
          top = height * 0.5;

          width = GeneralJs.calculationMenuWidth(fontSize, thisMap.items);

          for (let i = 0; i < thisMap.items.length; i++) {
            button_clone = GeneralJs.nodes.div.cloneNode(true);
            button_clone.classList.add("removeTarget");
            button_clone.textContent = thisMap.items[i];
            button_clone.setAttribute("buttonValue", thisMap.items[i]);
            style = {
              position: "absolute",
              top: String(((height * 2) * (i + 1)) - top) + ea,
              left: String(0) + ea,
              width: String(width) + ea,
              paddingTop: String(height * (GeneralJs.isMac() ? 0.3 : 0.4)) + ea,
              height: String(height * (GeneralJs.isMac() ? 1.5 : 1.3)) + ea,
              background: "#2fa678",
              textAlign: "center",
              fontSize: "inherit",
              color: "#ffffff",
              zIndex: String(3),
              borderRadius: String(3) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              boxShadow: "0px 2px 11px -6px #2fa678",
              cursor: "pointer",
            };
            for (let j in style) {
              button_clone.style[j] = style[j];
            }
            button_clone.addEventListener("click", updateValueEvent);
            this.appendChild(button_clone);
          }

        } else if (thisMap.type !== "object" && thisMap.address !== undefined && e.type === "click") {

          cancel_inputBack.style.background = "white";
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";

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
          cancel_inputBack.style.animation = "justfadeinmiddle 0.3s ease forwards";
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
      console.log(e);
    }
  });

  //r initial event
  GeneralJs.stacks["rInitialBoxButtonToggle"] = 0;
  GeneralJs.stacks["rInitialBoxButtonDom"] = null;
  rInitialBox.addEventListener("click", function (e) {
    if (GeneralJs.stacks["rInitialBoxButtonToggle"] === 0) {
      for (let { dom } of detailTongTarget) {
        dom.style.opacity = String(0);
      }
      const mother = detailTongTarget[0].dom.parentElement;
      let div_clone4, div_clone5, div_clone6;
      let textArea_clone;
      let saveEventFunction;

      //contents box
      div_clone4 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: "100%",
        marginTop: String(visualSpecificMarginTop) + ea,
        height: "calc(" + String(100) + "% - " + String(detailTargetHeightConst) + ea + ")",
        fontSize: String(fontSize) + ea,
        fontWeight: String(300),
        border: "solid 1px #dddddd",
        borderRadius: String(5) + ea,
        top: String(fontSize * (1 / 5)) + ea,
        animation: "fadeuplite 0.3s ease forwards",
      };
      for (let j in style) {
        div_clone4.style[j] = style[j];
      }

      //title
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      div_clone5.classList.add("hoverDefault_lite");
      div_clone5.textContent = "홈스타일링 의뢰서";
      style = {
        position: "absolute",
        top: String(((fontSize * (5 / 15.3027)) + visualSpecificMarginTop) * -1) + ea,
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
        color: "#202020",
        border: String(0),
        outline: String(0),
        lineHeight: String(1.6),
      };
      for (let j in style) {
        textArea_clone.style[j] = style[j];
      }
      div_clone5.appendChild(textArea_clone);
      div_clone4.appendChild(div_clone5);

      //save event
      saveEventFunction = async function (e) {
        try {
          const targetValue = textArea_clone.value;
          const totalParsingArr = targetValue.split("\n");

          let indexArr;
          let matrix;
          let temp;
          let tempString;
          let vaildTong;
          let item;
          let createRequestDocumentResponse;

          indexArr = [];
          for (let t = 0; t < totalParsingArr.length; t++) {
            if (/^\[/.test(totalParsingArr[t])) {
              indexArr.push(t);
            }
          }

          matrix = [];
          for (let t = 1; t < indexArr.length; t++) {
            temp = [];
            for (let s = indexArr[t - 1] + 1; s < indexArr[t]; s++) {
              if (totalParsingArr[s] !== '' && totalParsingArr[s] !== '\n' && totalParsingArr[s] !== ' ' && totalParsingArr[s] !== '  ') {
                if (!/^\<\%item\%\>/.test(totalParsingArr[s]) && /[^ \n]/g.test(totalParsingArr[s].replace(/[\n ]/g, ''))) {
                  tempString = totalParsingArr[s].trim().replace(/^- /g, '').replace(/^-/g, '').trim();
                  temp.push('- ' + tempString);
                } else if (/^\<\%item\%\>/.test(totalParsingArr[s])) {
                  temp.push(totalParsingArr[s]);
                }
              }
            }
            matrix.push(temp);
          }

          temp = [];
          for (let s = indexArr[indexArr.length - 1] + 1; s < totalParsingArr.length; s++) {
            if (totalParsingArr[s] !== '' && totalParsingArr[s] !== '\n' && totalParsingArr[s] !== ' ' && totalParsingArr[s] !== '  ') {
              if (!/^\<\%item\%\>/.test(totalParsingArr[s]) && /[^ \n]/g.test(totalParsingArr[s].replace(/[\n ]/g, ''))) {
                tempString = totalParsingArr[s].trim().replace(/^- /g, '').replace(/^-/g, '').trim();
                temp.push('- ' + tempString);
              } else if (/^\<\%item\%\>/.test(totalParsingArr[s])) {
                temp.push(totalParsingArr[s]);
              }
            }
          }
          matrix.push(temp);

          for (let t = 0; t < matrix.length; t++) {

            if (t !== 2 && t !== 3) {
              await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + detailTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
            } else if (t === 2) {
              vaildTong = matrix[t];
              if (!/^\<\%item\%\>/.test(vaildTong[0])) {
                alert("스타일링 범위 정의를 입력해주셔야 합니다! (스타일링 타이틀 우클릭)");
                rInitialBox.click();
                return;
              } else {
                if (!(/컨셉/g.test(vaildTong[1]) && /\:/g.test(vaildTong[1]))) {
                  alert("선호 컨셉을 가장 앞줄에 적어주셔야 합니다! (형식 => - 선호 컨셉 : 컨셉명)");
                  rInitialBox.click();
                  return;
                } else {
                  await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + detailTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
                }
              }
            } else if (t === 3) {
              vaildTong = matrix[t];
              if (!/^\<\%item\%\>/.test(vaildTong[0])) {
                alert("시공 범위 정의를 입력해주셔야 합니다! (시공 타이틀 우클릭)");
                rInitialBox.click();
                return;
              } else {
                await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + detailTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
              }
            }
          }

          if (this.textContent === "제작") {
            createRequestDocumentResponse = JSON.parse(await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]], "/createRequestDocument"));
            window.alert(createRequestDocumentResponse.alert);
          }

          GeneralJs.ajax("id=" + thisCase[standard[1]], "/getClientHistory", function (res) {
            const dataArr = JSON.parse(res);
            for (let i = 0; i < textAreas.length; i++) {
              textAreas[i].value = dataArr[i];
            }
            rInitialBox.click();
          });

        } catch (e) {
          console.log(e);
        }
      }

      //button0
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: String(55) + ea,
        height: String(30) + ea,
        bottom: String(13) + ea,
        right: String(12) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
        background: "#2fa678",
        borderRadius: String(5) + ea,
        opacity: String(0.92),
        cursor: "pointer",
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone6 = GeneralJs.nodes.div.cloneNode(true);
      div_clone6.classList.add("hoverDefault_lite");
      div_clone6.textContent = "제작";
      style = {
        position: "absolute",
        top: String(4 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(15) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
      };
      for (let j in style) {
        div_clone6.style[j] = style[j];
      }
      div_clone6.addEventListener("click", saveEventFunction);
      div_clone5.appendChild(div_clone6);
      div_clone4.appendChild(div_clone5);

      //button1
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: String(55) + ea,
        height: String(30) + ea,
        bottom: String(13) + ea,
        right: String(73) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
        background: "#2fa678",
        borderRadius: String(5) + ea,
        opacity: String(0.92),
        cursor: "pointer",
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone6 = GeneralJs.nodes.div.cloneNode(true);
      div_clone6.classList.add("hoverDefault_lite");
      div_clone6.textContent = "취소";
      style = {
        position: "absolute",
        top: String(4 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(15) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
      };
      for (let j in style) {
        div_clone6.style[j] = style[j];
      }
      div_clone6.addEventListener("click", function (e) {
        rInitialBox.click();
      });
      div_clone5.appendChild(div_clone6);
      div_clone4.appendChild(div_clone5);

      //button2
      div_clone5 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: String(55) + ea,
        height: String(30) + ea,
        bottom: String(13) + ea,
        right: String(134) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
        background: "#2fa678",
        borderRadius: String(5) + ea,
        opacity: String(0.92),
        cursor: "pointer",
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone6 = GeneralJs.nodes.div.cloneNode(true);
      div_clone6.classList.add("hoverDefault_lite");
      div_clone6.textContent = "저장";
      style = {
        position: "absolute",
        top: String(4 + (GeneralJs.isMac() ? 0 : 2)) + ea,
        left: String(15) + ea,
        fontSize: String(fontSize * 0.92) + ea,
        fontWeight: String(600),
        color: "white",
      };
      for (let j in style) {
        div_clone6.style[j] = style[j];
      }
      div_clone6.addEventListener("click", saveEventFunction);
      div_clone5.appendChild(div_clone6);
      div_clone4.appendChild(div_clone5);

      GeneralJs.stacks["rInitialBoxButtonDom"] = div_clone4;
      mother.appendChild(div_clone4);

      GeneralJs.ajax("id=" + thisCase[standard[1]], "/getClientHistory", function (res) {
        const dataArr = JSON.parse(res);
        let totalString = '\n';
        for (let i = 0; i < detailTongTarget.length; i++) {
          totalString += "[" + String(i + 1) + "] " + detailTongTarget[i].name;
          totalString += "\n\n";
          totalString += dataArr[i];
          totalString += "\n\n\n";
        }
        textArea_clone.value = totalString;
      });

      GeneralJs.stacks["rInitialBoxButtonToggle"] = 1;
    } else {
      for (let { dom } of detailTongTarget) {
        dom.style.opacity = '';
      }
      if (GeneralJs.stacks["rInitialBoxButtonDom"] !== null) {
        GeneralJs.stacks["rInitialBoxButtonDom"].parentElement.removeChild(GeneralJs.stacks["rInitialBoxButtonDom"]);
      }
      GeneralJs.stacks["rInitialBoxButtonToggle"] = 0;
      GeneralJs.stacks["rInitialBoxButtonDom"] = null;
    }
  });

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
        width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0)) + ea,
        height: String(window.innerHeight - instance.belowHeight) + ea,
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
    console.log(instance.whiteBox.id)
    console.log(standard)
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

ContentsJs.prototype.reportScrollBox = function (data, motherWidth) {
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

  margin = 18;
  boxNumber = Math.floor((motherWidth - (margin * 3)) / (margin + 400));
  boxHeight = 400;
  boxWidth = (motherWidth - (margin * (boxNumber + 1 + 2))) / boxNumber;
  boxTop = 90;

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

  for (let i = 0; i < report.length; i++) {

    //numbers
    titleTop = 18;
    columnTop = 0;
    columnLineHeight = 30;
    columnPaddingTop = 7;
    matrixFontSize = 14.5;
    matrixInnerLine = "1px solid #ececec";
    matrixOuterLine = "1px solid #cccccc";
    matrixTop = titleTop + 40;
    matrixBoxMargin = 23;
    matrixWidth = boxWidth - (matrixBoxMargin * 2) - 3;
    matrixHeight = 240;
    summaryTong = {
      client: 0,
      proposal: 0,
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
      background: "#f7f7f7",
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
      borderTop: "1px solid #dddddd",
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
      background: "#f7f7f7",
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
      width: String(matrixWidth * (2 / 6)) + ea,
      textAlign: "center",
      left: String(0) + ea,
      paddingTop: String(columnPaddingTop + (GeneralJs.isMac() ? 0 : 2.5)) + ea,
      top: String(columnTop) + ea,
      height: String(columnLineHeight + (GeneralJs.isMac() ? 0 : -2.5)) + ea,
      borderBottom: matrixInnerLine,
      background: "white",
    };
    for (let z in matrixStyle0) {
      div_clone2.style[z] = matrixStyle0[z];
    }
    matrixBox.appendChild(div_clone2);

    //client
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1 = JSON.parse(JSON.stringify(matrixStyle0));
    matrixStyle1.left = String(matrixWidth * (2 / 6)) + ea;
    matrixStyle1.width = String(matrixWidth * (1 / 6)) + ea;
    matrixStyle1.borderLeft = matrixInnerLine;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "문의";
    matrixBox.appendChild(div_clone2);

    //proposal
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (3 / 6)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "제안";
    matrixBox.appendChild(div_clone2);

    //contract
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (4 / 6)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "계약";
    matrixBox.appendChild(div_clone2);

    //process start
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    matrixStyle1.left = String(matrixWidth * (5 / 6)) + ea;
    for (let z in matrixStyle1) {
      div_clone2.style[z] = matrixStyle1[z];
    }
    div_clone2.textContent = "진행";
    matrixBox.appendChild(div_clone2);

    reportNumber = 0;
    for (let { startDay, endDay, client, proposal, contract, process } of report[i]) {

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
      matrixStyle1.left = String(matrixWidth * (2 / 6)) + ea;
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
      matrixStyle1.left = String(matrixWidth * (3 / 6)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(proposal);
      matrixBox.appendChild(div_clone2);
      summaryTong.proposal += proposal;

      //contract
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (4 / 6)) + ea;
      for (let z in matrixStyle1) {
        div_clone2.style[z] = matrixStyle1[z];
      }
      div_clone2.textContent = String(contract);
      matrixBox.appendChild(div_clone2);
      summaryTong.contract += contract;

      //contract
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      matrixStyle1.left = String(matrixWidth * (5 / 6)) + ea;
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
      fontSize: String(matrixFontSize + 3) + ea,
      left: String(matrixBoxMargin) + ea,
      bottom: String(titleTop +  + (GeneralJs.isMac() ? 8 : 4)) + ea,
      fontWeight: String(200),
      textAlign: "right",
    };
    for (let z in style) {
      summaryBox.style[z] = style[z];
    }

    summaryBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:#2fa678">${String(summaryTong.client)}</b>명&nbsp;&nbsp;제안 <b style="color:#2fa678">${String(summaryTong.proposal)}</b>명&nbsp;&nbsp;계약 <b style="color:#2fa678">${String(summaryTong.contract)}</b>명&nbsp;&nbsp;진행 <b style="color:#2fa678">${String(summaryTong.process)}</b>명`);
    div_clone.appendChild(summaryBox);

    scrollBox.appendChild(div_clone);
  }

  return scrollBox;
}

ContentsJs.prototype.reportContents = function (data, mother, loadingIcon) {
  const instance = this;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    input_clone.style.color = "#404040";
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
  let style, inputStyle;
  let ea = "px";
  let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  const scrollBox = this.reportScrollBox(data, motherWidth);
  const today = new Date();
  let todayString;
  let top, height, margin;

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
    fontWeight: String(100),
    border: String(0) + ea,
    outline: String(0) + ea,
    color: "#404040",
  };
  for (let i in inputStyle) {
    input_clone.style[i] = inputStyle[i];
  }
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("value", todayString);
  input_clone.addEventListener("focus", function (e) {
    input_clone.style.color = "#2fa678";
    GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
  });
  input_clone.addEventListener("blur", function (e) {
    vaildValue(this);
  });
  input_clone.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      const queryObj = vaildValue(this);
      input_clone.blur();
      mother.removeChild(mother.lastChild);
      loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
      loadingIcon.style.opacity = "1";
      GeneralJs.ajax(GeneralJs.objectToRawquery(queryObj), "/getClientReport", function (data) {
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
    color: "#2fa678",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.textContent = "today : " + String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
  div_clone.appendChild(div_clone2);

  //end
  mother.appendChild(div_clone);

  //scroll box
  mother.appendChild(scrollBox);
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
          width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0)) + ea,
          height: String(window.innerHeight - instance.belowHeight) + ea,
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

      GeneralJs.ajax("month=8", "/getClientReport", function (data) {
        svg_icon.style.opacity = "0";
        instance.reportContents(data, div_clone, svg_icon);
      });

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
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

      instance.whiteBox = null;
      instance.onView = "mother";

      if (search === null) {
        await instance.spreadData(this.value);
      } else {
        await instance.spreadData(search);
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
          width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0)) + ea,
          height: String(window.innerHeight - instance.belowHeight) + ea,
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
    console.log(e);
  }
}
