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

ClientJs.prototype.standardBar = function (standard) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;
  let sortEventFunction;

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
      instance.totalMother.children[2].appendChild(h);
      instance.standardDoms[0].setAttribute("sort", String(toggle ? 0 : 1));
    }
  }

  num = (standard.search === null ? 0 : 1);
  for (let { cliid, name } of target) {
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
    div_clone3.textContent = cliid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("click", sortEventFunction(0));
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = name;
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
      div_clone2.addEventListener("contextmenu", this.makeClipBoardEvent(cliid));
    }

    if (num !== 0) {
      this.cases.push({ cliid, name });
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
  let dropPoint;
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
        const thisId = /c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
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
    const cliidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = "#2fa678";
    }
    for (let z = 0; z < cliidChildren.length; z++) {
      if (cliidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < cliidChildren[z].children.length; y++) {
          cliidChildren[z].children[y].style.color = "#2fa678";
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
    const finalColor = (mother.getAttribute("drop") === "true") ? "#cccccc" : "#404040";
    for (let z = 0; z < mother.children.length; z++) {
      if (!onOffObj[mother.children[z].getAttribute("column")]) {
        mother.children[z].style.color = finalColor;
      } else {
        mother.children[z].style.color = "#2fa678";
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
      const clickEventFunction = eventFunction(left);
      clickEventFunction.call(this, e);

      const thisIndex = this.parentElement.getAttribute("index");
      const thisId = /c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];

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
        const map = DataPatch.clientMap();
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
      const map = DataPatch.clientMap();
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
          instance.totalMother.children[2].appendChild(h);
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
                if (/^1[6789]/.test(instance.caseDoms[j].children[z].textContent) || instance.caseDoms[j].children[z].textContent === '' || instance.caseDoms[j].children[z].textContent === '-') {
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

    if (window.localStorage.getItem("client_columnsOrder") !== null && window.localStorage.getItem("client_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("client_columnsOrder"));
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

    e.stopPropagation();
  }

  dropPoint = DataPatch.clientDropPoint();

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
      if (dropPoint.values.includes(obj[dropPoint.column])) {
        style2.color = "#cccccc";
        for (let z = 0; z < this.standardDoms[num].children.length; z++) {
          this.standardDoms[num].children[z].style.color = "#cccccc";
        }
        div_clone2.setAttribute("drop", "true");
      } else {
        style2.color = "inherit";
        div_clone2.setAttribute("drop", "false");
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

ClientJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let clients, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, caseDomsFirst, casesFirst;
    let standardDomsTargets, caseDomsTargets;

    if (search === null) {
      clients = JSON.parse(await GeneralJs.ajaxPromise("limit=100", "/getClients"));
    } else {
      clients = JSON.parse(await GeneralJs.ajaxPromise("query=" + search, "/searchClients"));
    }

    const { standard, data } = clients;

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
        background: "#ffffff",
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

      cliidStyle = {
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
      styles = [];
      for (let i = 0; i < DataPatch.clientCardViewStandard().info.length; i++) {
        temp = {
          position: "absolute",
          fontSize: String(fontSize) + ea,
          fontWeight: String(500),
          top: String(startTop + (lineHeight * (i + 1)) + (DataPatch.clientCardViewStandard().exceptionHeight[i] ? exceptionMargin : 0) + (GeneralJs.isMac() ? 0 : 3)) + ea,
          left: String(intend) + ea,
          width: String(totalWidth) + ea,
          color: "#404040",
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

          await GeneralJs.updateValue({
            thisId: cliid,
            requestIndex: requestIndex,
            column: column,
            pastValue: originalStatus,
            value: finalValue,
            index: Number(index),
          });

          instance.cases[Number(index)][column] = finalValue;
          originalDiv.textContent = finalValue;

        } catch (e) {
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
  let notionEvent;
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
  notionEvent = instance.makeClipBoardEvent(thisCase[standard[1]]);

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
    color: "#404040",
    fontSize: String(titleFontSize) + ea,
    fontWeight: String(600),
    bottom: String(leftMargin * (GeneralJs.isMac() ? (12 / 60) : (5 / 60))) + ea,
    left: String(leftMargin - 3) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", notionEvent);
  div_clone2.appendChild(div_clone3);

  //cliid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[1]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: "#2fa678",
    fontSize: String(titleFontSize * (19 / 42)) + ea,
    bottom: String(leftMargin * (GeneralJs.isMac() ? (17 / 60) : (14 / 60))) + ea,
    left: String(leftMargin * 3) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", notionEvent);
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
        const map = DataPatch.clientMap();
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
      this.style.color = "#202020";
    }

    //blur event
    historyBlurEvent = function (e) {
      const thisIndex = i;
      let target;
      for (let { dom } of historyTongTarget) {
        dom.style.height = "calc(" + String(100 / historyTongTarget.length) + "% - " + String(historyTargetHeightConst) + ea + ")";
        if (Number(dom.getAttribute("index")) === thisIndex) {
          target = dom.querySelector("textarea");
        }
      }
      this.style.color = "#cccccc";

      const originalValue = target.value;
      const originalValueArr = originalValue.split("\n");

      let tempString;
      let vaildTong;
      let item = null;
      let tong = [];
      for (let text of originalValueArr) {
        if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
          tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
          tong.push('- ' + tempString);
        } else if (/^\<\%item\%\>/.test(text)) {
          item = text;
        }
      }

      if (item !== null) {
        target.value = item + "\n\n" + tong.join("\n");
      } else {
        target.value = tong.join("\n");
      }

      target.value = target.value.replace(/\&/g, ",");

      if (thisIndex !== 2 && thisIndex !== 3) {
        GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, ''), "/updateClientHistory", function (res) {});
      } else if (thisIndex === 2) {
        vaildTong = target.value.split("\n");
        if (!/^\<\%item\%\>/.test(vaildTong[0])) {
          alert("스타일링 범위 정의를 입력해주셔야 합니다! (스타일링 타이틀 우클릭)");
          target.value = "<%item%> 재배치" + "\n\n" + target.value;
          e.preventDefault();
          this.focus();
        } else {
          if (!(/컨셉/g.test(vaildTong[2]) && /\:/g.test(vaildTong[2]))) {
            alert("선호 컨셉을 가장 앞줄에 적어주셔야 합니다! (형식 => - 선호 컨셉 : 컨셉명)");
            target.value = item + "\n\n" + "- 선호 컨셉 : 모던 화이트\n" + tong.join("\n");
            e.preventDefault();
            this.focus();
          } else {
            GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, ''), "/updateClientHistory", function (res) {});
          }
        }
      } else if (thisIndex === 3) {
        vaildTong = target.value.split("\n");
        if (!/^\<\%item\%\>/.test(vaildTong[0])) {
          alert("시공 범위 정의를 입력해주셔야 합니다! (시공 타이틀 우클릭)");
          target.value = "<%item%> 시공 없음" + "\n\n" + target.value;
          e.preventDefault();
          this.focus();
        } else {
          GeneralJs.ajax("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[thisIndex].column + "&value=" + target.value.replace(/[\=\&]/g, ''), "/updateClientHistory", function (res) {});
        }
      }
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
      border: "solid 1px #dddddd",
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
      color: "#404040",
      background: "white",
      paddingBottom: String(fontSize * (7 / 15.3027)) + ea,
      paddingRight: String(fontSize * (12 / 15.3027)) + ea,
      cursor: "pointer",
    };
    for (let j in style) {
      div_clone5.style[j] = style[j];
    }

    if (i === 2 || i === 3) {
      div_clone5.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        if (!/historyMenuItem/gi.test(this.className)) {
          const motherTong = this.parentElement;
          let itemTargets;
          let menu_tong;
          let div_clone, div_clone2;
          let style;
          let ea = "px";

          const thisIndex = i;
          for (let { dom } of historyTongTarget) {
            if (Number(dom.getAttribute("index")) !== thisIndex) {
              dom.style.height = "calc(" + String(5) + "% - " + String(historyTargetHeightConst) + ea + ")";
            } else {
              this.parentElement.scroll(0, 0);
              dom.style.height = "calc(" + String(100 - (5 * (historyTongTarget.length - 1))) + "% - " + String(historyTargetHeightConst) + ea + ")";
            }
          }
          this.style.color = "#202020";

          if (i === 2) {
            itemTargets = [
              "재배치",
              "재배치 > 구매",
              "재배치 < 구매",
              "전체 구매"
            ];
          } else {
            itemTargets = [
              "시공 없음",
              "부분 시공",
              "전체 시공",
            ];
          }

          //cancel back
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("historyMenuItem");
          style = {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: String(0) + ea,
            left: String(0) + ea,
            background: "transparent",
            zIndex: String(4),
          };
          for (let z in style) {
            div_clone.style[z] = style[z];
          }
          div_clone.addEventListener("click", function (e) {
            const targets = document.querySelectorAll(".historyMenuItem");
            for (let dom of targets) {
              dom.parentNode.removeChild(dom);
            }
          });
          this.parentElement.appendChild(div_clone);

          //menu tong
          menu_tong = GeneralJs.nodes.div.cloneNode(true);
          menu_tong.classList.add("historyMenuItem");
          style = {
            position: "absolute",
            width: String((i === 2) ? 106 : 85) + ea,
            top: String(19) + ea,
            left: String(-3) + ea,
            zIndex: String(4),
            animation: "fadeuplite 0.3s ease forwards",
          };
          for (let z in style) {
            menu_tong.style[z] = style[z];
          }

          for (let t = 0; t < itemTargets.length; t++) {
            //items
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "relative",
              width: String(100) + "%",
              height: String(32) + ea,
              borderRadius: String(4) + ea,
              background: "#2fa678",
              marginBottom: String(4) + ea,
            };
            for (let z in style) {
              div_clone.style[z] = style[z];
            }
            div_clone.addEventListener("click", function (e) {
              const targetTextTong = motherTong.children[motherTong.children.length - 3].querySelector("textarea");
              const originalValue = targetTextTong.value;
              const originalValueArr = originalValue.split("\n");
              const thisValue = this.firstChild.textContent;

              let tempString;
              let tong = [];
              for (let text of originalValueArr) {
                if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
                  tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
                  tong.push('- ' + tempString);
                }
              }

              targetTextTong.value = "<%item%> " + thisValue + "\n\n" + tong.join("\n");
              targetTextTong.focus();
              targetTextTong.selectionEnd = 0;
              targetTextTong.parentElement.scroll(0, 0);

              const removeTargets = document.querySelectorAll(".historyMenuItem");
              for (let dom of removeTargets) {
                dom.parentNode.removeChild(dom);
              }
            });

            //text
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.textContent = itemTargets[t];
            div_clone2.classList.add("hoverDefault");
            style = {
              position: "absolute",
              top: String(6) + ea,
              left: String(0) + ea,
              color: "#ffffff",
              fontSize: String(14) + ea,
              fontWeight: String(300),
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            };
            for (let z in style) {
              div_clone2.style[z] = style[z];
            }
            div_clone.appendChild(div_clone2);
            menu_tong.appendChild(div_clone);
          }

          motherTong.appendChild(menu_tong);

        }
      });
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
      fontWeight: String(400),
      color: "#aaaaaa",
      border: String(0),
      outline: String(0),
      lineHeight: String(1.6),
    };
    for (let j in style) {
      textArea_clone.style[j] = style[j];
    }
    textArea_clone.addEventListener("focus", historyFocusEvent);
    textArea_clone.addEventListener("blur", historyBlurEvent);
    if (i === historyTongTarget.length - 1) {
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
    if (GeneralJs.stacks["rInitialBoxButtonToggle"] === 0) {
      for (let { dom } of historyTongTarget) {
        dom.style.opacity = String(0);
      }
      const mother = historyTongTarget[0].dom.parentElement;
      let div_clone4, div_clone5, div_clone6;
      let textArea_clone;
      let saveEventFunction;

      //contents box
      div_clone4 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        width: "100%",
        marginTop: String(visualSpecificMarginTop) + ea,
        height: "calc(" + String(100) + "% - " + String(historyTargetHeightConst) + ea + ")",
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
              await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
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
                  await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
                }
              }
            } else if (t === 3) {
              vaildTong = matrix[t];
              if (!/^\<\%item\%\>/.test(vaildTong[0])) {
                alert("시공 범위 정의를 입력해주셔야 합니다! (시공 타이틀 우클릭)");
                rInitialBox.click();
                return;
              } else {
                await GeneralJs.ajaxPromise("id=" + thisCase[standard[1]] + "&column=" + historyTongTarget[t].column + "&value=" + matrix[t].join("\n").replace(/[\=\&]/g, ''), "/updateClientHistory");
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
        for (let i = 0; i < historyTongTarget.length; i++) {
          totalString += "[" + String(i + 1) + "] " + historyTongTarget[i].name;
          totalString += "\n\n";
          totalString += dataArr[i];
          totalString += "\n\n\n";
        }
        textArea_clone.value = totalString;
      });

      GeneralJs.stacks["rInitialBoxButtonToggle"] = 1;
    } else {
      for (let { dom } of historyTongTarget) {
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

ClientJs.prototype.reportContents = function (data, mother, loadingIcon) {
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

ClientJs.prototype.makeClipBoardEvent = function (id) {
  const instance = this;
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    try {
      await window.navigator.clipboard.writeText(id);
      instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
    } catch (e) {
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

ClientJs.prototype.launching = async function () {
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
    if (getObj.cliid !== undefined) {
      for (let dom of this.standardDoms) {
        if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
          getTarget = dom;
        }
      }
      if (getTarget === null) {
        tempFunction = this.makeSearchEvent(getObj.cliid);
        await tempFunction({ keyCode: 13 });
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
    console.log(e);
  }
}
