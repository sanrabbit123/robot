const BuilderJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {};
  this.module.paddingTop = 38;
  this.module.height = <%% 18, 16, 16, 16, 18 %%>;
  this.module.marginBottom = 18;
  this.module.initialLine = 14;
  this.module.initialMargin = 14;

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
  this.whiteMatrixB = null;
  this.aspirants = [];
  this.aspirants_searchInput = null;
  this.whiteSse = null;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  this.designers = [];
}

BuilderJs.prototype.standardBar = function (standard, localMode = false, specificDesid = null) {
  const instance = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition, secondLeftPosition;
  let sortEventFunction;
  let desidDom, desidArr;
  let size;

  size = <%% 14, 13, 13, 13, 0 %%>;

  leftPosition = new Array(2);
  secondLeftPosition = new Array(2);

  leftPosition[0] = <%% 57, 56, 56, 56, 0 %%>;
  leftPosition[1] = <%% 141, 136, 136, 136, 0 %%>;

  secondLeftPosition[0] = <%% 38, 36, 36, 36, 0 %%>;
  secondLeftPosition[1] = <%% 135, 131, 131, 131, 0 %%>;

  temp = {
    desid: standard.standard.desid.name,
    designer: standard.standard.designer.name
  };
  target = standard.data;
  if (standard.search === null) {
    target.unshift(temp);
  }

  style = {
    display: desktop ? "block" : "none",
    position: "relative",
    background: GeneralJs.colorChip.gray0,
    top: String(0),
    left: String(0),
    width: String(this.grayBarWidth) + ea,
    zIndex: String(2),
  };

  style2 = {
    display: desktop ? "block" : "none",
    position: "fixed",
    height: String(this.module.height + this.module.marginBottom) + ea,
    paddingTop: String(this.module.paddingTop) + ea,
    top: String(0) + ea,
    zIndex: String(1),
    background: GeneralJs.colorChip.gray0,
    width: style.width,
  };

  style3 = {
    display: desktop ? "blcok" : "none",
    position: "absolute",
    height: String(this.module.height + this.module.marginBottom) + ea,
    fontSize: String(size) + ea,
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

  desidDom = [];
  desidArr = [];
  num = (standard.search === null ? 0 : 1);
  for (let { desid, designer } of target) {
    if (num === 1) {
      style2.position = "relative";
      style3.color = GeneralJs.colorChip.black;
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      leftPosition[0] = secondLeftPosition[0];
      leftPosition[1] = secondLeftPosition[1];
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
    } else {
      if (specificDesid === "middle") {
        div_clone2.style.display = "none";
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
        // div_clone2.addEventListener("contextmenu", this.makeClipBoardEvent(desid));
      }
      desidDom.push({ desid, dom: div_clone2 });
      desidArr.push(desid);
    }

    if (num !== 0) {
      this.cases.push({ desid, designer });
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

  if (!localMode) {
    if (this.standardDoms.length === 2) {
      GeneralJs.timeouts["oneWhiteCardOnSelection"] = setTimeout(function () {
        instance.standardDoms[1].click();
        clearTimeout(GeneralJs.timeouts["oneWhiteCardOnSelection"]);
        GeneralJs.timeouts["oneWhiteCardOnSelection"] = null;
      }, 401);
    }
  }

  GeneralJs.ajax({
    idArr: desidArr,
    method: "designer",
    property: "important"
  }, "/getHistoryProperty", function (obj) {
    const desidObj = JSON.parse(obj);
    let boo, tempFunction;

    if (desidObj !== null) {
      for (let { desid, dom } of desidDom) {
        if (desidObj[desid] === undefined) {
          boo = false;
        } else {
          if (desidObj[desid]) {
            boo = true;
          } else {
            boo = false;
          }
        }
        dom.setAttribute("important", "false");
        dom.addEventListener("contextmenu", instance.makeImportantEvent(desid));
        if (boo) {
          tempFunction = instance.makeImportantEvent(desid, !boo);
          tempFunction.call(dom, { type: "click" });
        }
      }
    }
  });

}

BuilderJs.prototype.infoArea = function (info) {
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
  let size;

  size = <%% 14, 13, 13, 13, 3 %%>;

  temp = {};
  columns = [];
  leftPosition = [];
  widthArr = [];

  if (window.localStorage.getItem("designer_columnsOrder") !== null && window.localStorage.getItem("designer_columnsOrder") !== undefined) {
    originalColumns = JSON.parse(window.localStorage.getItem("designer_columnsOrder"));
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
    fontSize: String(size) + ea,
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
        const thisId = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/i.exec(this.parentElement.className)[0];
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
    const desidChildren = instance.totalMother.children[0].children;
    for (let z = 0; z < mother.children.length; z++) {
      mother.children[z].style.color = GeneralJs.colorChip.green;
    }
    for (let z = 0; z < desidChildren.length; z++) {
      if (desidChildren[z].getAttribute("index") === thisIndex) {
        for (let y = 0; y < desidChildren[z].children.length; y++) {
          desidChildren[z].children[y].style.color = GeneralJs.colorChip.green;
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
            thisCase: instance.cases[Number(idDom.getAttribute("index"))],
          });

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

    if (window.localStorage.getItem("designer_columnsOrder") !== null && window.localStorage.getItem("designer_columnsOrder") !== undefined) {
      originalColumns = JSON.parse(window.localStorage.getItem("designer_columnsOrder"));
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

BuilderJs.prototype.spreadData = async function (search = null, localMode = false, specificDesid = null) {
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

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search }, localMode, specificDesid);
    if (!localMode) {
      this.infoArea({ standard: standard.info, data: infoDataTong, search: search });
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

BuilderJs.prototype.makeImportantEvent = function (id, update = true) {
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
        await GeneralJs.ajaxPromise("id=" + id + "&column=important&value=" + value + "&email=" + cookies.homeliaisonConsoleLoginedEmail, "/updateDesignerHistory");
      }

    } catch (e) {
      GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
      console.log(e);
    }
  }
}

BuilderJs.prototype.cardViewMaker = function (force = false) {
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
        instance.totalMother.classList.remove("justfadeinoriginal");
        instance.totalMother.classList.add("justfadeoutoriginal");
      }

      const ea = "px";
      const { createNodes, colorChip, withOut } = GeneralJs;
      const modeHref = (mode) => { window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?mode=${mode}`; }
      const cards = [
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>파트너 정보", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>기본 관리", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>디자이너사", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>수수료 정보", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>견적서 관리", event: (e) => { modeHref("estimation"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>공정표 관리", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>의뢰서 관리", event: (e) => { modeHref("construct"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">시공</b><br>정산 관리", event: (e) => { modeHref("construct"); } },
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
            background: colorChip.gray3,
            overflow: "hidden",
            transition: "all 0s ease",
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
            attribute: {
              index: String(i),
            },
            events: [
              {
                type: "click",
                event: cards[i].event
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.preventDefault();
                  const index = Number(this.getAttribute("index"));
                  if (typeof cards[index].contextmenu === "function") {
                    cards[index].contextmenu.call(this, e);
                  } else {
                    cards[index].event.call(this, e);
                  }
                }
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
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              marginBottom: (i < (cards.length / 2)) ? String(margin) + ea : String(0) + ea,
              opacity: String(0),
              animation: "fadeup 0.5s ease " + String(0.1 * (i % 4)) + "s forwards"
            }
          },
          {
            mother: -1,
            text: String(i + 1),
            style: {
              position: "absolute",
              fontSize: String(25) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              top: String(16) + ea,
              left: String(29) + ea,
              color: colorChip.red,
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
              borderBottom: "1px solid " + colorChip.red,
              transformOrigin: "50% 100%",
              transition: "all 0s ease",
              opacity: String(0.3)
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

BuilderJs.prototype.whiteContentsMaker = function (thisCase, mother) {
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
  // div_clone3.addEventListener("click", clipboardEvent);
  div_clone3.addEventListener("contextmenu", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid: thisCase[standard[1]] }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 폴더가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].drive);
      }
    } catch (e) {
      console.log(e);
    }
  });
  div_clone3.addEventListener("click", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid: thisCase[standard[1]] }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 문서가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].docs);
      }
    } catch (e) {
      console.log(e);
    }
  });
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
    left: String(leftMargin * (thisCase[standard[0]].length === 4 ? 3.6 : (thisCase[standard[0]].length === 2 ? 2.3 : 3))) + ea,
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
    overflow: "scroll",
    borderBottom: "1px dashed " + GeneralJs.colorChip.gray3,
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
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
  };
  for (let i in style) {
    portfolioBox.style[i] = style[i];
  }

  //realtime
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
  div_clone4.textContent = "일정 관리 콘솔";
  div_clone4.classList.add("hoverDefault");
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
    color: GeneralJs.colorChip.green,
  };
  for (let j in style) {
    div_clone4.style[j] = style[j];
  }
  div_clone4.addEventListener("click", function (e) {
    window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=calendar&desid=" + thisCase[standard[1]];
  });

  div_clone3.appendChild(div_clone4);
  propertyBox.appendChild(div_clone3);


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
        div_clone6.insertAdjacentHTML('beforeend', pairs[z].name + ' <b style="color:' + GeneralJs.colorChip.green + ';font-size:' + String(fontSize - 5) + ea + '" >' + pairs[z].proid + '</b>');
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
      let cliidArr;
      let clients, client;

      for (let obj of contents) {
        obj.name = "개인";
      }

      cliidArr = [ ...(new Set(contents.map((obj) => { return obj.cliid }).filter((c) => { return c !== ''; }))) ].map((cliid) => {
        return { cliid };
      });
      if (cliidArr.length !== 0) {
        clients = await GeneralJs.ajaxJson({
          noFlat: true,
          whereQuery: { $or: cliidArr }
        }, "/getClients", { equal: true });
        for (let obj of contents) {
          client = clients.find((o) => { return o.cliid === obj.cliid });
          if (client !== undefined) {
            obj.name = client.name;
          }
        }
      }

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
          div_clone2.textContent = contents[i].name + "(" + contents[i].contents.portfolio.pid + ") : " + contents[i].contents.portfolio.title.main;
        } else {
          div_clone2.textContent = "기타 미등록 포트폴리오";
        }
        style = {
          position: "absolute",
          top: String(GeneralJs.isMac() ? 0 : -2) + ea,
          left: String(0) + ea,
          fontSize: String(fontSize) + ea,
          fontWeight: String(600),
          color: GeneralJs.colorChip.black,
          width: "100%",
          height: String(titleHeight) + ea,
          cursor: "pointer",
        };
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        if (i < contents.length) {
          div_clone2.addEventListener("click", function (e) {
            if (contents[i].cliid !== '') {
              window.open(window.location.protocol + "//" + window.location.host + "/client?cliid=" + contents[i].cliid, "_blank");
            }
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

BuilderJs.prototype.whiteCancelMaker = function (callback = null, recycle = false) {
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

BuilderJs.prototype.whiteViewMakerDetail = function (index, recycle = false) {
  const instance = this;
  const { standard, info } = DataPatch.designerWhiteViewStandard();
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
      if (instance.standardDoms[z].firstChild.textContent === thisCase.desid) {
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
      background: colorChip.white,
      top: String(margin) + ea,
      left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0 2px 10px -6px " + colorChip.shadow,
      width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
      height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
      zIndex: String(2),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    if (hasQuery("desid")) {
      removeQuery("desid");
    }
    appendQuery({ desid: thisCase[standard[1]] });

    instance.whiteContentsMaker(thisCase, div_clone);
    instance.whiteBox.contentsBox = div_clone;
    instance.whiteBox.index = index;
    instance.whiteBox.id = thisCase[standard[1]];
    instance.totalContents.appendChild(div_clone);
    GeneralJs.stacks.whiteBox = 0;
  }
}

BuilderJs.prototype.whiteViewMaker = function (index) {
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

BuilderJs.prototype.rowViewMaker = function () {
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

BuilderJs.prototype.returnValueEventMaker = function () {
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

BuilderJs.prototype.reportViewMaker = function () {
  const instance = this;
  return function (e) {
    let tempFunc;
    if (GeneralJs.stacks.whiteBox !== 1) {
      if (instance.whiteBox !== null) {
        if (instance.reportViewMakerDetail !== undefined && instance.reportViewMakerDetail !== null) {
          tempFunc = instance.whiteCancelMaker(instance.reportViewMakerDetail(true), true);
          tempFunc();
        }
      } else {
        if (instance.reportViewMakerDetail !== undefined && instance.reportViewMakerDetail !== null) {
          tempFunc = instance.reportViewMakerDetail(false);
          tempFunc();
        }
      }
    }
  }
}

BuilderJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  reportIcon.addEventListener("click", this.reportViewMaker());
  returnIcon.addEventListener("click", this.returnValueEventMaker());
}

BuilderJs.prototype.makeSearchEvent = function (search = null) {
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

BuilderJs.prototype.addSearchEvent = function () {
  const instance = this;
  const input = this.searchInput;
  input.addEventListener("keypress", this.makeSearchEvent(null));
}

BuilderJs.prototype.backGrayBar = function () {
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

BuilderJs.prototype.extractViewMakerDetail = function (recycle = false, link) {
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

BuilderJs.prototype.extractViewMaker = function (link) {
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

BuilderJs.prototype.addExtractEvent = function () {
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
        if (map[i] === undefined || typeof map[i] !== "object") {
          temp.push("알 수 없음");
        } else {
          temp.push(map[i].name);
        }
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

BuilderJs.prototype.makeClipBoardEvent = function (id) {
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

BuilderJs.prototype.whiteResize = function () {
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

// DATA -----------------------------------------------------------------------------------------------------------------

BuilderJs.prototype.constructDataRender = function (project, titleMode) {
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, autoComma, equalJson, ajaxJson, sleep } = GeneralJs;
  const { process, proid, address } = project;
  const { contract, design: { construct } } = process;
  const { form: { date: { from, to } } } = contract;
  const { status, request, estimate, contract: { partner, form, payments } } = construct;
  const { id, guide, date: formDate } = form;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => {
    return `<b id="${!titleMode ? project.proid : "title"}_${column}" title="${title}" class="value" style="color:${colorChip[titleMode ? "whiteBlack" : color]};">${titleMode ? title : value}</b>`;
  }
  const dateToColor = (dateObj, reverse = true) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "red";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "gray5";
    } else {
      if (dateObj.valueOf() <= (new Date()).valueOf()) {
        return !reverse ? "green" : "black";
      } else {
        return !reverse ? "black" : "green";
      }
    }
  }
  const emptyDate = new Date(1800, 0, 1);
  const emptyDateValue = ((new Date(2000, 0, 1))).valueOf();
  const emptyValue = "해당 없음";
  let height, margin;
  let whiteBlock;
  let top, left, size;
  let startLeft;
  let previousWidth;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let stringArr, tempDom;
  let tempString, tempString0, tempString1, tempString2, tempString3;
  let updateArr;
  let map;
  let displayBoo;
  let grayBoo;
  let num;
  let calendarEvent;
  let temp;
  let statusValues, partnerValues;
  let statusValuesMatrix;

  height = 43;
  margin = 1;

  top = (titleMode ? (isMac() ? 12 : 13) : (isMac() ? 11 : 12.5));
  left = 16;
  size = 14;
  startLeft = 0;

  stringArr = [];
  updateArr = [];

  grayBoo = ![ "완료", "고객 완료", "디자이너 완료", "드랍" ].includes(status);

  statusValuesMatrix = [
    [ "대기" ],
    [ "의뢰서 작성중" ],
    [ "견적 확인중" ],
    [ "견적 안내" ],
    [ "홈리에종 진행", "고객 진행", "디자이너 진행" ],
    [ "미팅 예정", "-", "-" ],
    [ "계약 발송", "-", "-" ],
    [ "계약금 입금", "-", "-" ],
    [ "착수금 입금", "-", "확인 필요" ],
    [ "중도금 입금", "-", "확인 요청" ],
    [ "잔금 입금", "-", "수수료 요청" ],
    [ "AS 진행중", "-", "AS 진행중" ],
    [ "완료", "고객 완료", "디자이너 완료" ],
    [ "드랍" ],
    [ "해당 없음" ],
  ];

  statusValues = [
    "대기",
    "의뢰서 작성중",
    "견적 확인중",
    "견적 안내",
    "미팅 예정",
    "계약 발송",
    "계약금 입금",
    "착수금 입금",
    "중도금 입금",
    "잔금 입금",
    "완료",
    "드랍",
    "고객 진행",
    "디자이너 진행",
    "수수료 요청",
    "AS 진행중",
    "해당 없음",
  ];
  partnerValues = this.builderNames;

  if (this.type === "construct") {

    displayBoo = true;

    map = {
      projectFrom: {
        title: "프로젝트 시작",
        position: "process.contract.form.date.from",
        values: [],
        chain: null
      },
      request: {
        title: "시공 의뢰",
        position: "process.design.construct.request",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      status: {
        title: "진행 단계",
        position: "process.design.construct.status",
        values: statusValues,
        chain: null
      },
      estimate: {
        title: "견적 발생",
        position: "process.design.construct.estimate",
        values: [],
        chain: null
      },
      partner: {
        title: "시공사",
        position: "process.design.construct.contract.partner",
        values: partnerValues,
        chain: null
      },
      contractFrom: {
        title: "시공 시작일",
        position: "process.design.construct.contract.form.date.from",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      contractTo: {
        title: "시공 종료일",
        position: "process.design.construct.contract.form.date.to",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      contractGuide: {
        title: "계약서 발송",
        position: "process.design.construct.contract.form.guide",
        values: [],
        chain: null
      },
      // contractConfirm: {
      //   title: "계약서 서명",
      //   position: "process.design.construct.contract.form.id",
      //   values: [],
      //   chain: null
      // },
      address: {
        title: "현장 위치",
        position: "",
        values: [],
        chain: null
      },
    };

    stringArr.push(textMaker(map["projectFrom"].title, dateToString(from), "black", "projectFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
    });

    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNode, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let maxColumnNumber;
      let tong, tongTong;
      let factorWidth;
      let paddingLeft;
      let unitBlockWidth;
      let factor, factorTong, factorWidthTong;
      let tempMax;
      let maxTong;
      let maxWidth;
      let tongTongArr;
      let children;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      factorWidth = 500;
      margin = 4;
      paddingLeft = 14;
      maxColumnNumber = statusValuesMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return Math.max(acc, curr) });
      width = (factorWidth * maxColumnNumber) + (margin * (maxColumnNumber - 1));

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);
          instance.constructDeactivate(proid, /^[드완]/.test(value));

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

        } catch (e) {
          console.log(e);
        }
      }

      tong = createNode({
        mother: this,
        mode: "aside",
        style: {
          display: "block",
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          height: "auto",
          transition: "all 0s ease",
          zIndex, animation
        }
      });

      maxTong = [];
      tongTongArr = [];
      for (let arr of statusValuesMatrix) {

        unitBlockWidth = (width - (margin * (arr.length - 1))) / arr.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);

        tongTong = createNode({
          mother: tong,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            marginBottom: String(margin) + ea,
            height: String(height) + ea,
            width: String(100) + '%',
          }
        });
        tongTongArr.push(tongTong);

        factorTong = [];
        for (let i = 0; i < arr.length; i++) {
          factor = createNode({
            mother: tongTong,
            attribute: { value: arr[i], position, proid: project.proid },
            events: [ { type: "click", event: updateEvent } ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(unitBlockWidth) + ea,
              height: String(100) + '%',
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              marginRight: String(i !== arr.length - 1 ? margin : 0) + ea,
              background: (arr[i].trim() !== '-' && arr[i].trim() !== '' ? colorChip.gradientGreen : colorChip.deactive),
              justifyContent: "center",
              transition: "all 0s ease",
              boxShadow, borderRadius,
            },
            children: [
              {
                text: arr[i],
                style: {
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(size) + ea,
                  fontWeight: String(500),
                  color: colorChip.whiteBlack,
                }
              }
            ]
          });
          factorTong.push(factor);
        }

        for (let dom of factorTong) {
          dom.style.width = "auto";
        }
        factorWidthTong = factorTong.map((dom) => { return dom.getBoundingClientRect().width });
        tempMax = Math.max(...factorWidthTong);
        for (let dom of factorTong) {
          dom.style.width = String(tempMax) + ea;
        }
        maxTong.push((tempMax * arr.length) + (margin * (arr.length - 1)));

      }

      maxWidth = Math.max(...maxTong);
      tong.style.width = String(maxWidth) + ea;

      for (let tongTong of tongTongArr) {
        children = [ ...tongTong.children ];
        unitBlockWidth = (maxWidth - (margin * (children.length - 1))) / children.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);
        for (let dom of children) {
          dom.style.width = String(unitBlockWidth) + ea;
        }
      }

    });

    stringArr.push(textMaker(map["request"].title, dateToString(request), dateToColor(request, false), "request"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "request";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];
        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    temp = estimate.map((obj) => { return dateToString(obj.date) }).join(", ");
    stringArr.push(textMaker(map["estimate"].title, temp === '' ? "-" : temp, temp === '' ? "gray5" : "black", "estimate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNode, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "estimate";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr, thisProject, thisEstimate;
          let thisBuilder, thisBuiid, newInvoice;
          let loading;

          do {
            thisBuilder = await GeneralJs.prompt("어느 소장님이 만드실 견적서인가요? 소장님 이름을 알려주세요!");
          } while (thisBuilder === null || !instance.builders.map((obj) => { return obj.builder }).includes(thisBuilder));

          if (instance.builders.map((obj) => { return obj.builder }).filter((str) => { return str === thisBuilder }).length !== 1) {
            do {
              thisBuiid = await GeneralJs.prompt("중복되는 이름이 있습니다. 소장님 아이디로 알려주세요!");
            } while (thisBuiid === null || !instance.builders.map((obj) => { return obj.buiid }).includes(thisBuiid));
          } else {
            thisBuiid = instance.builders.find((obj) => { return obj.builder === thisBuilder }).buiid;
          }

          loading = instance.mother.grayLoading();
          // if (window.confirm("견적 관리 페이지로 갈까요?")) {
          //   window.location.href = window.location.protocol + "//" + window.location.host + "/builder?mode=estimation&buiid=" + thisBuiid;
          // }
          //
          // newInvoice = await ajaxJson({ buiid: thisBuiid, proid: project.proid }, PYTHONHOST + "/invoiceCreate", { equal: true });

          tempArr = value.split('-');

          thisProject = instance.projects.search("proid", project.proid);
          thisEstimate = thisProject.process.design.construct.estimate;
          thisEstimate.unshift({
            invid: null,
            date: new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')))
          });
          thisEstimate.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

          instance.projects.search("proid", project.proid).process.design.construct.estimate = equalJson(JSON.stringify(thisEstimate));
          updateQuery[position] = thisEstimate;

          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);

          loading.remove();

          valueDom.textContent = thisEstimate.map((obj) => { return dateToString(obj.date) }).join(", ");

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          thisCase[column].style.color = colorChip.black;

        } catch (e) {
          console.log(e);
        }
      };

      calendarTong = createNode({
        mother: this,
        mode: "aside",
        events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
        style: {
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          zIndex, borderRadius, animation,
          boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
          background: colorChip.white,
          transition: "all 0s ease",
        }
      });

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["partner"].title, partner === '' ? "-" : partner, partner === '' ? "gray5" : "black", "partner"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "partner";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      width = 126;
      margin = 4;

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip.black;

          
        } catch (e) {
          console.log(e);
        }
      }

      nodeArr = [];
      for (let i = 0; i < values.length; i++) {
        nodeArr.push({
          mother: this,
          mode: "aside",
          attribute: { value: values[i], position, proid: project.proid },
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top + ((margin + height) * i)) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            height: String(height) + ea,
            background, zIndex, boxShadow, borderRadius, animation,
          }
        });
        nodeArr.push({
          mother: -1,
          text: values[i],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.whiteBlack,
          }
        });
      }
      createNodes(nodeArr);
    });

    stringArr.push(textMaker(map["contractFrom"].title, dateToString(formDate.from), dateToColor(formDate.from, false), "contractFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "contractFrom";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];

        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["contractTo"].title, dateToString(formDate.to), dateToColor(formDate.to, false), "contractTo"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "contractTo";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      updateQuery = {};
      whereQuery = { proid: project.proid };
      position = map[column].position;
      values = map[column].values;
      chainQuery = map[column].chain;
      startLeft = 0;
      width = 260;
      margin = 4;

      background = colorChip.gradientGreen;
      updateEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        try {
          const value = this.getAttribute("value");
          const removeTargets = mother.querySelectorAll("aside");
          let tempArr;
          if (value === "예정") {
            updateQuery[position] = new Date(3800, 0, 1);
          } else if (value === "해당 없음") {
            updateQuery[position] = new Date(1800, 0, 1);
          } else {
            tempArr = value.split('-');
            updateQuery[position] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          }
          await instance.constructUpdate(whereQuery, updateQuery, chainQuery, value);
          valueDom.textContent = value;
          // calendarEvent(thisCase);
          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }
          thisCase[column].style.color = colorChip[dateToColor(updateQuery[position], false)];

        } catch (e) {
          console.log(e);
        }
      };

      nodeArr = createNodes([
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[0] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[0],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          attribute: [ { value: values[1] } ],
          events: [ { type: "click", event: updateEvent } ],
          style: {
            position: "absolute",
            top: String(top) + ea,
            left: String(startLeft + ((width - margin) / 2) + margin) + ea,
            width: String((width - margin) / 2) + ea,
            height: String(height) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            zIndex, borderRadius, animation,
          }
        },
        {
          mother: -1,
          text: values[1],
          style: {
            position: "absolute",
            top: String(textTop) + ea,
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          mother: this,
          mode: "aside",
          events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
          style: {
            position: "absolute",
            top: String(top + height + margin) + ea,
            left: String(startLeft) + ea,
            width: String(width) + ea,
            zIndex, borderRadius, animation,
            boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
            background: colorChip.white,
            transition: "all 0s ease",
          }
        }
      ]);

      calendarTong = nodeArr[4];

      const calendar = instance.mother.makeCalendar(new Date(), function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.setAttribute("value", this.getAttribute("buttonValue"));
        updateEvent.call(this, e);
      });
      calendarTong.appendChild(calendar.calendarBase);

    });

    stringArr.push(textMaker(map["contractGuide"].title, dateToString(guide), dateToColor(guide, true), "contractGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      class DomMap extends Array {

        thisDom(kind, contentsKey) {
          let target;
          target = null;
          for (let key in this) {
            if (key.replace(/[0-9]/gi, '') !== '') {
              if (kind === key) {
                target = this[key].contents[contentsKey];
              }
            }
          }
          return target;
        }

        oppositeDoms(kind, contentsKey) {
          let tong;
          tong = [];
          for (let key in this) {
            if (key.replace(/[0-9]/gi, '') !== '') {
              if (kind !== key) {
                tong.push(this[key].contents[contentsKey]);
              }
            }
          }
          return tong;
        }

        get totalDom() {
          return this[0].total;
        }

      }
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      let boxWidth, boxHeight;
      let paddingLeft, paddingTop;
      let fontSize;
      let titleMarginBottom;
      let textSize;
      let rowMargin;
      let middlePaddingTop, middlePaddingLeft;
      let titleWidth;
      let titleWeight;
      let areaHeight;
      let areaTop;
      let areaWeight;
      let betweenMargin0, betweenMargin1;
      let firstMoney, firstRatio;
      let startMoney, startRatio;
      let middleMoney, middleRatio;
      let remainMoney, remainRatio;
      let totalMoney;
      let thisProject;
      let updateEvent;
      let sendVisual;
      let sendSize;
      let sendWeight;
      let totalTong;
      let totalBase;
      let titleArea, contentsArea;
      let dom_constructName, dom_address, dom_range, dom_total, dom_first, dom_start, dom_middle, dom_remain;
      let contractContentsMap;
      let ratio, money, date, etc;
      let tempDom;
      let domMap;
      let tempTitleDom, tempContentsDoms;
      let tempRatioDom, tempMoneyDom, tempDateDom, tempEtcDom;
      let ratioEventFunction, moneyEventFunction, dateEventFunction, etcEventFunction;
      let tempObj;
      let totalValueDom;
      let greenInputEvent;

      thisProject = instance.projects.search("proid", project.proid);

      boxWidth = 680;
      boxHeight = 400;

      paddingLeft = 28;
      paddingTop = 23;

      middlePaddingLeft = 20;
      middlePaddingTop = 18;

      fontSize = 23;
      titleMarginBottom = 16;

      textSize = 15;
      rowMargin = 10;

      titleWidth = 100;
      titleWeight = 500;
      areaWeight = 300;

      areaHeight = 25;
      areaTop = 0;

      betweenMargin0 = 4;
      betweenMargin1 = 15;

      sendVisual = 1;
      sendSize = 13;
      sendWeight = 500;

      firstMoney = Math.floor(payments.first === null ? 0 : payments.first.calculation.amount.consumer);
      startMoney = Math.floor(payments.start === null ? 0 : payments.start.calculation.amount.consumer);
      middleMoney = Math.floor(payments.middle === null ? 0 : payments.middle.calculation.amount.consumer);
      remainMoney = Math.floor(payments.remain === null ? 0 : payments.remain.calculation.amount.consumer);

      totalMoney = Math.floor(firstMoney + startMoney + middleMoney + remainMoney);

      firstRatio = totalMoney !== 0 ? firstMoney / totalMoney : 0;
      startRatio = totalMoney !== 0 ? startMoney / totalMoney : 0;
      middleRatio = totalMoney !== 0 ? middleMoney / totalMoney : 0;
      remainRatio = totalMoney !== 0 ? remainMoney / totalMoney : 0;

      contractContentsMap = [
        {
          kind: "first",
          title: "계약금 정보",
          contents: [
            (String(Math.round(firstRatio * 100)) + "%"),
            (autoComma(firstMoney) + "원"),
            dateToString(project.history.payments.first.date),
            (project.history.payments.first.etc === '' ? "해당 없음" : project.history.payments.first.etc),
          ]
        },
        {
          kind: "start",
          title: "착수금 정보",
          contents: [
            (String(Math.round(startRatio * 100)) + "%"),
            (autoComma(startMoney) + "원"),
            dateToString(project.history.payments.start.date),
            (project.history.payments.start.etc === '' ? "해당 없음" : project.history.payments.start.etc)
          ]
        },
        {
          kind: "middle",
          title: "중도금 정보",
          contents: [
            (String(Math.round(middleRatio * 100)) + "%"),
            (autoComma(middleMoney) + "원"),
            dateToString(project.history.payments.middle.date),
            (project.history.payments.middle.etc === '' ? "해당 없음" : project.history.payments.middle.etc)
          ]
        },
        {
          kind: "remain",
          title: "잔금 정보",
          contents: [
            (String(Math.round(remainRatio * 100)) + "%"),
            (autoComma(remainMoney) + "원"),
            dateToString(project.history.payments.remain.date),
            (project.history.payments.remain.etc === '' ? "해당 없음" : project.history.payments.remain.etc)
          ]
        },
      ];
      domMap = new DomMap();

      if (thisProject.process.design.construct.contract.form.date.from.valueOf() > (new Date(2000, 0, 1)).valueOf() && thisProject.process.design.construct.contract.form.date.to.valueOf() > (new Date(2000, 0, 1)).valueOf() && thisProject.process.design.construct.contract.partner !== "") {

        updateEvent = function (key) {
          let to, column;
          if (key === "historyName") {
            to = "history";
            column = "construct.name";
          } else if (key === "historyAddress") {
            to = "history";
            column = "construct.address";
          } else if (key === "amount") {
            to = "core";
            column = "amount"
          }
          return async function (e) {
            try {
              const self = this;
              const selfBox = self.getBoundingClientRect();
              const div = this.children[0];
              let cancel, input;
              cancel = createNode({
                mother: this,
                mode: "aside",
                event: {
                  click: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    self.removeChild(self.lastChild);
                    self.removeChild(self.lastChild);
                  }
                },
                style: {
                  position: "fixed",
                  top: String(selfBox.top * -1) + ea,
                  left: String(selfBox.left * -1) + ea,
                  width: String(window.outerWidth) + ea,
                  height: String(window.outerHeight) + ea,
                  background: "transparent",
                  zIndex: String(1),
                }
              });
              input = createNode({
                mother: this,
                mode: "input",
                event: {
                  click: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  },
                  keypress: async function (e) {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      e.preventDefault();
                      let value, questions;
                      let answer;
                      let num;
                      let result;
                      let totalNumber;
                      let ajaxResult;
                      try {
                        if (key === "historyName" || key === "historyAddress") {
                          value = this.value.trim();
                          await GeneralJs.ajaxJson({
                            id: project.proid,
                            column,
                            value,
                            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                          }, "/updateProjectHistory");
                          instance.projects.search("proid", project.proid).history[key === "historyName" ? "name" : "address"] = value;
                          div.textContent = value;
                        } else {
                          value = Number(this.value.replace(/[^0-9\.\-]/gi, ''));
                          if (!Number.isNaN(value)) {

                            totalNumber = Math.floor(value);
                            questions = [
                              { question: "계약금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "first", dom: 4, column: "ratio" },
                              { question: "착수금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "start", dom: 5, column: "ratio" },
                              { question: "중도금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "middle", dom: 6, column: "ratio" },
                              { question: "잔금의 비율을 숫자로만 알려주세요! 단위 %", answer: null, target: "remain", dom: 7, column: "ratio" },
                            ];

                            for (let obj of questions) {
                              do {
                                answer = await GeneralJs.prompt(obj.question);
                              } while (answer === null || answer === '');
                              obj.answer = Math.floor(Number(answer.replace(/[^0-9\.\-]/gi, '')));
                            }

                            if (questions.some((obj) => { return typeof obj.answer !== "string" && typeof obj.answer !== "number" })) {
                              window.alert("올바른 값이 아닙니다!");
                            } else {

                              result = {};
                              for (let { answer, target, column, dom } of questions) {
                                if (result[target] === undefined) {
                                  result[target] = {};
                                }
                                result[target][column] = answer;
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[0].setAttribute("value", String(answer) + '%');
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[0].textContent = String(answer) + '%';
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[2].setAttribute("value", autoComma(Math.round(totalNumber * (answer / 100))) + '원');
                                self.parentNode.parentNode.parentNode.children[dom].children[1].children[0].children[2].textContent = autoComma(Math.round(totalNumber * (answer / 100))) + '원';
                              }

                              result.total = totalNumber;
                              result.proid = project.proid;
                              result.mode = "updatePayments";

                              ajaxResult = await GeneralJs.ajaxJson(result, "/constructInteraction", { equal: true });
                              if (ajaxResult.message === "success") {
                                const { core } = ajaxResult;

                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                                instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;
                                div.textContent = autoComma(value) + '원';

                              } else {
                                window.alert("서버 통신에서 문제가 생겼습니다!");
                              }
                            }
                          } else {
                            window.alert("올바른 값이 아닙니다!");
                          }
                        }
                        self.removeChild(self.lastChild);
                        self.removeChild(self.lastChild);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }
                },
                style: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  border: String(0),
                  outline: String(0),
                  fontSize: String(textSize) + ea,
                  fontWeight: String(areaWeight),
                  color: colorChip.green,
                  background: colorChip.white,
                  width: String(div.getBoundingClientRect().width + 100) + ea,
                  height: String(100) + '%',
                  zIndex: String(1),
                }
              });
              input.value = div.textContent;

              input.focus();

            } catch (e) {
              console.log(e);
            }
          }
        }

        totalTong = createNode({
          mother: this,
          mode: "aside",
          style: {
            position: "fixed",
            top: withOut(50, boxHeight / 2, ea),
            left: withOut(50, boxWidth / 2, ea),
            width: String(boxWidth - (paddingLeft * 2)) + ea,
            height: String(boxHeight - (paddingTop * 2)) + ea,
            background: colorChip.white,
            paddingTop: String(paddingTop) + ea,
            paddingLeft: String(paddingLeft) + ea,
            paddingRight: String(paddingLeft) + ea,
            paddingBottom: String(paddingLeft) + ea,
            zIndex: String(5),
            boxShadow, borderRadius, animation,
          }
        });

        totalBase = createNode({
          mother: totalTong,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
          },
        });

        titleArea = createNode({
          mother: totalBase,
          text: "계약서 작성",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            marginBottom: String(titleMarginBottom) + ea,
          },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              event: {
                selectstart: (e) => { e.preventDefault() },
                click: async function (e) {
                  e.stopPropagation();
                  e.preventDefault();
                  try {
                    const children = this.parentElement.nextElementSibling.children;
                    let name, address, start, end, message;
                    let contractName, contractAddress, contractPhone;

                    name = children[0].children[1].textContent.trim();
                    address = children[1].children[1].textContent.trim();
                    [ start, end ] = [ ...children[2].children[1].textContent.matchAll(/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g) ].map((arr) => { return arr[0] });

                    const { result, summary } = await ajaxJson({
                      mode: "inspection",
                      proid: project.proid,
                      name, address, start, end,
                    }, "/constructInteraction", { equal: true });

                    if (result) {
                      message = '';
                      message += "총 금액 : " + autoComma(summary.total) + "원 | " + summary.hangul + "\n";
                      message += "계약금 : " + String(summary.first.percentage) + "% | " + autoComma(summary.first.amount) + "원 | " + summary.first.date + " | " + summary.first.etc + "\n";
                      message += "착수금 : " + String(summary.start.percentage) + "% | " + autoComma(summary.start.amount) + "원 | " + summary.start.date + " | " + summary.start.etc + "\n";
                      message += "중도금 : " + String(summary.middle.percentage) + "% | " + autoComma(summary.middle.amount) + "원 | " + summary.middle.date + " | " + summary.middle.etc + "\n";
                      message += "잔금 : " + String(summary.remain.percentage) + "% | " + autoComma(summary.remain.amount) + "원 | " + summary.remain.date + " | " + summary.remain.etc + "\n\n";
                      message += "정보가 올바르게 기입되었나요?";

                      if (window.confirm(message)) {

                        contractName = await GeneralJs.prompt("계약서 작성시 별도의 이름이 있나요? (별도로 없다면 '없음' 또는 공백)");
                        if (contractName === null || (typeof contractName === "string" && contractName.trim() === '') || (typeof contractName === "string" && /없/gi.test(contractName))) {
                          contractName = project.name;
                        }
                        contractAddress = await GeneralJs.prompt("계약서 작성시 별도의 주소가 있나요? (별도로 없다면 '없음' 또는 공백)");
                        if (contractAddress === null || (typeof contractAddress === "string" && contractAddress.trim() === '') || (typeof contractAddress === "string" && /없/gi.test(contractAddress))) {
                          contractAddress = project.address;
                        }
                        contractPhone = await GeneralJs.prompt("계약서 작성시 별도의 사업자 번호가 있나요? (별도로 없다면 '없음' 또는 공백)");
                        if (contractPhone === null || (typeof contractPhone === "string" && contractPhone.trim() === '') || (typeof contractPhone === "string" && /없/gi.test(contractPhone))) {
                          contractPhone = project.phone;
                        }

                        summary.contractName = contractName;
                        summary.contractAddress = contractAddress;
                        summary.contractPhone = contractPhone;

                        ajaxJson({ mode: "sendContract", proid: project.proid, summary }, "/constructInteraction").then((obj) => {
                          if (obj.message === "success") {
                            window.alert("계약서 자동 생성 및 발송 요청이 완료되었습니다!");
                            window.location.reload();
                          } else {
                            window.alert("계약서 생성 요청에 문제가 생겨 완료하지 못했습니다!");
                          }
                        }).catch((err) => {
                          window.alert("계약서 생성 요청에 문제가 생겨 완료하지 못했습니다!");
                        });

                      } else {
                        window.alert("정보를 올바르게 다시 기입해주세요!");
                      }

                    } else {
                      window.alert("정보 기입 후에 계약서를 제작할 수 있습니다!");
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              text: "계약서 보내기",
              style: {
                position: "absolute",
                bottom: String(0) + ea,
                right: String(sendVisual) + ea,
                fontSize: String(sendSize) + ea,
                fontWeight: String(sendWeight),
                color: colorChip.green,
                cursor: "pointer",
              }
            }
          ]
        });

        contentsArea = createNode({
          mother: totalBase,
          style: {
            flexDirection: "column",
            position: "relative",
            border: "1px solid " + colorChip.gray3,
            boxSizing: "border-box",
            borderRadius: String(5) + "px",
            width: String(100) + '%',
            height: String(boxHeight) + ea,
            paddingTop: String(middlePaddingTop) + ea,
            paddingLeft: String(middlePaddingLeft) + ea,
            paddingRight: String(middlePaddingLeft) + ea,
          },
        });

        dom_constructName = createNode({
          mother: contentsArea,
          style: {
            display: "block",
            position: "relative",
            marginBottom: String(rowMargin) + ea,
          },
          children: [
            {
              text: "공사명",
              style: {
                display: "inline-block",
                verticalAlign: "top",
                width: String(titleWidth) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(titleWidth, ea),
                height: String(areaHeight) + ea,
                top: String(areaTop) + ea,
                overflow: "hidden",
              },
              children: [
                {
                  event: {
                    click: updateEvent("historyName")
                  },
                  style: {
                    position: "relative",
                    width: String(3000) + ea,
                    left: String(0),
                    top: String(0),
                  },
                  children: [
                    {
                      text: (project.history.name === '' ? project.address + " 내부 리모델링" : project.history.name),
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.black,
                      }
                    }
                  ]
                }
              ]
            }
          ]
        });
        dom_address = createNode({
          mother: contentsArea,
          style: {
            display: "block",
            position: "relative",
            marginBottom: String(rowMargin) + ea,
          },
          children: [
            {
              text: "시공 장소",
              style: {
                display: "inline-block",
                verticalAlign: "top",
                width: String(titleWidth) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(titleWidth, ea),
                height: String(areaHeight) + ea,
                top: String(areaTop) + ea,
              },
              children: [
                {
                  event: {
                    click: updateEvent("historyAddress")
                  },
                  style: {
                    position: "relative",
                    width: String(3000) + ea,
                    left: String(0),
                    top: String(0),
                  },
                  children: [
                    {
                      text: (project.history.address === '' ? project.address : project.history.address),
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.black,
                      }
                    }
                  ]
                }
              ]
            }
          ]
        });
        dom_range = createNode({
          mother: contentsArea,
          style: {
            display: "block",
            position: "relative",
            marginBottom: String(rowMargin) + ea,
          },
          children: [
            {
              text: "공사 기간",
              style: {
                display: "inline-block",
                verticalAlign: "top",
                width: String(titleWidth) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(titleWidth, ea),
                height: String(areaHeight) + ea,
                top: String(areaTop) + ea,
              },
              children: [
                {
                  style: {
                    position: "relative",
                    width: String(3000) + ea,
                    left: String(0),
                    top: String(0),
                  },
                  children: [
                    {
                      text: "착공 : ",
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.deactive,
                        marginRight: String(betweenMargin0) + ea,
                      }
                    },
                    {
                      text: dateToString(project.process.design.construct.contract.form.date.from),
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.black,
                        marginRight: String(betweenMargin1) + ea,
                      }
                    },
                    {
                      text: " | ",
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.green,
                        marginRight: String(betweenMargin1) + ea,
                      }
                    },
                    {
                      text: "완공 : ",
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.deactive,
                        marginRight: String(betweenMargin0) + ea,
                      }
                    },
                    {
                      text: dateToString(project.process.design.construct.contract.form.date.to),
                      style: {
                        display: "inline-block",
                        fontSize: String(textSize) + ea,
                        fontWeight: String(areaWeight),
                        color: colorChip.black,
                      }
                    },
                  ]
                }
              ]
            }
          ]
        });
        dom_total = createNode({
          mother: contentsArea,
          style: {
            display: "block",
            position: "relative",
            marginBottom: String(rowMargin) + ea,
          },
          children: [
            {
              text: "공사 금액",
              style: {
                display: "inline-block",
                verticalAlign: "top",
                width: String(titleWidth) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(titleWidth, ea),
                height: String(areaHeight) + ea,
                top: String(areaTop) + ea,
              },
            }
          ]
        });

        totalValueDom = createNode({
          mother: dom_total.children[1],
          event: {
            click: updateEvent("amount")
          },
          style: {
            position: "relative",
            width: String(3000) + ea,
            left: String(0),
            top: String(0),
          },
          children: [
            {
              attribute: {
                value: autoComma(totalMoney) + "원"
              },
              text: autoComma(totalMoney) + "원",
              style: {
                display: "inline-block",
                fontSize: String(textSize) + ea,
                fontWeight: String(areaWeight),
                color: colorChip.black,
              }
            }
          ]
        }).firstChild;

        greenInputEvent = (callback) => {
          return function (e) {
            const self = this;
            let cancel, input;
            cancel = createNode({
              mother: this,
              mode: "aside",
              event: {
                selectstart: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                click: function (e) {
                  e.stopPropagation();
                  e.preventDefault();
                  self.removeChild(self.lastChild);
                  self.removeChild(self.lastChild);
                }
              },
              style: {
                position: "fixed",
                top: String(0) + ea,
                left: String(0) + ea,
                width: String(window.outerWidth) + ea,
                height: String(window.outerHeight) + ea,
                background: "transparent",
                zIndex: String(1),
                transition: "all 0s ease",
              }
            });
            cancel.style.top = String(cancel.getBoundingClientRect().top * -1) + ea;
            cancel.style.left = String(cancel.getBoundingClientRect().left * -1) + ea;
            cancel.style.width = String(window.innerWidth) + ea;

            input = createNode({
              mother: this,
              mode: "input",
              event: {
                selectstart: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                click: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                keypress: async function (e) {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    await callback(this.value);
                    self.removeChild(self.lastChild);
                    self.removeChild(self.lastChild);
                  }
                }
              },
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                border: String(0),
                outline: String(0),
                fontSize: String(textSize) + ea,
                fontWeight: String(areaWeight),
                color: colorChip.green,
                background: colorChip.white,
                width: String(self.getBoundingClientRect().width + 10) + ea,
                height: String(100) + '%',
                zIndex: String(1),
              }
            });
            input.value = this.getAttribute("value");
            input.focus();
          }
        }

        ratioEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  const max = 100;
                  const unit = '%';
                  const key = "ratio";
                  const amountKey = "amount";
                  const thisDom = domMap.thisDom(kind, key);
                  const thisValue = Number(value.replace(/[^0-9\-\.]/gi, ''));
                  const thisAmountDom = domMap.thisDom(kind, amountKey);
                  const [ oppoDom0, oppoDom1, oppoDom2 ] = domMap.oppositeDoms(kind, key);
                  const oppoValue0 = Number(oppoDom0.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue1 = Number(oppoDom1.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue2 = Number(oppoDom2.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoTotal = oppoValue0 + oppoValue1 + oppoValue2;
                  const [ oppoAmountDom0, oppoAmountDom1, oppoAmountDom2 ] = domMap.oppositeDoms(kind, amountKey);
                  const totalAmount = Number(domMap.totalDom.textContent.replace(/[^0-9\-]/gi, ''));
                  let oppositeMax;
                  let oppoFinal0, oppoFinal1, oppoFinal2;
                  let thisAmountFinal, oppoAmountFinal0, oppoAmountFinal1, oppoAmountFinal2;
                  let map;

                  oppositeMax = max - thisValue;
                  if (oppoTotal === 0) {
                    oppoFinal0 = Math.round(oppositeMax * (1 / 3));
                    oppoFinal1 = Math.round(oppositeMax * (1 / 3));
                  } else {
                    oppoFinal0 = Math.round(oppositeMax * (oppoValue0 / oppoTotal));
                    oppoFinal1 = Math.round(oppositeMax * (oppoValue1 / oppoTotal));
                  }
                  oppoFinal2 = oppositeMax - oppoFinal0 - oppoFinal1;

                  thisDom.firstChild.textContent = String(thisValue) + unit;
                  thisDom.setAttribute("value", String(thisValue) + unit);
                  oppoDom0.firstChild.textContent = String(oppoFinal0) + unit;
                  oppoDom0.setAttribute("value", String(oppoFinal0) + unit);
                  oppoDom1.firstChild.textContent = String(oppoFinal1) + unit;
                  oppoDom1.setAttribute("value", String(oppoFinal1) + unit);
                  oppoDom2.firstChild.textContent = String(oppoFinal2) + unit;
                  oppoDom2.setAttribute("value", String(oppoFinal2) + unit);

                  thisAmountFinal = autoComma(Math.floor((totalAmount * (thisValue / 100)) / 10) * 10) + '원';
                  oppoAmountFinal0 = autoComma(Math.floor((totalAmount * (oppoFinal0 / 100)) / 10) * 10) + '원';
                  oppoAmountFinal1 = autoComma(Math.floor((totalAmount * (oppoFinal1 / 100)) / 10) * 10) + '원';
                  oppoAmountFinal2 = autoComma(Math.floor((totalAmount * (oppoFinal2 / 100)) / 10) * 10) + '원';

                  thisAmountDom.firstChild.textContent = thisAmountFinal;
                  thisAmountDom.setAttribute("value", thisAmountFinal);
                  oppoAmountDom0.firstChild.textContent = oppoAmountFinal0;
                  oppoAmountDom0.setAttribute("value", oppoAmountFinal0);
                  oppoAmountDom1.firstChild.textContent = oppoAmountFinal1;
                  oppoAmountDom1.setAttribute("value", oppoAmountFinal1);
                  oppoAmountDom2.firstChild.textContent = oppoAmountFinal2;
                  oppoAmountDom2.setAttribute("value", oppoAmountFinal2);

                  const { core } = await ajaxJson({
                    mode: "changeAmount",
                    proid: project.proid,
                    map: {
                      first: Number(domMap[0].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      start: Number(domMap[1].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      middle: Number(domMap[2].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      remain: Number(domMap[3].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                    }
                  }, "/constructInteraction", { equal: true });

                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;

                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        moneyEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  const unit = '원';
                  const key = "amount";
                  const ratioKey = "ratio";
                  const thisDom = domMap.thisDom(kind, key);
                  const thisValue = Number(value.replace(/[^0-9\-\.]/gi, ''));
                  const thisRatioDom = domMap.thisDom(kind, ratioKey);
                  const [ oppoDom0, oppoDom1, oppoDom2 ] = domMap.oppositeDoms(kind, key);
                  const oppoValue0 = Number(oppoDom0.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue1 = Number(oppoDom1.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoValue2 = Number(oppoDom2.textContent.replace(/[^0-9\-\.]/gi, ''));
                  const oppoTotal = oppoValue0 + oppoValue1 + oppoValue2;
                  const [ oppoRatioDom0, oppoRatioDom1, oppoRatioDom2 ] = domMap.oppositeDoms(kind, ratioKey);
                  const totalDom = domMap.totalDom;
                  let thisFinal, oppoFinal0, oppoFinal1, oppoFinal2;
                  let thisRatioFinal, oppoRatioFinal0, oppoRatioFinal1, oppoRatioFinal2;
                  let totalValue;

                  totalValue = thisValue + oppoValue0 + oppoValue1 + oppoValue2;

                  totalDom.textContent = autoComma(totalValue) + unit;
                  totalDom.setAttribute("value", autoComma(totalValue) + unit);

                  thisDom.firstChild.textContent = autoComma(thisValue) + unit;
                  thisDom.setAttribute("value", autoComma(thisValue) + unit);

                  thisRatioFinal = Math.round(100 * (thisValue / totalValue));
                  oppoRatioFinal0 = Math.round(100 * (oppoValue0 / totalValue));
                  oppoRatioFinal1 = Math.round(100 * (oppoValue1 / totalValue));
                  oppoRatioFinal2 = 100 - thisRatioFinal - oppoRatioFinal0 - oppoRatioFinal1;

                  thisRatioDom.firstChild.textContent = String(thisRatioFinal) + '%';
                  thisRatioDom.setAttribute("value", String(thisRatioFinal) + '%');
                  oppoRatioDom0.firstChild.textContent = String(oppoRatioFinal0) + '%';
                  oppoRatioDom0.setAttribute("value", String(oppoRatioFinal0) + '%');
                  oppoRatioDom1.firstChild.textContent = String(oppoRatioFinal1) + '%';
                  oppoRatioDom1.setAttribute("value", String(oppoRatioFinal1) + '%');
                  oppoRatioDom2.firstChild.textContent = String(oppoRatioFinal2) + '%';
                  oppoRatioDom2.setAttribute("value", String(oppoRatioFinal2) + '%');

                  const { core } = await ajaxJson({
                    mode: "changeAmount",
                    proid: project.proid,
                    map: {
                      first: Number(domMap[0].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      start: Number(domMap[1].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      middle: Number(domMap[2].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                      remain: Number(domMap[3].contents.amount.getAttribute("value").replace(/[^0-9\-\.]/gi, '')),
                    }
                  }, "/constructInteraction", { equal: true });

                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.first = core.first;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.start = core.start;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.middle = core.middle;
                  instance.projects.search("proid", project.proid).process.design.construct.contract.payments.remain = core.remain;

                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        dateEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(value.trim()) || value.trim() === '-') {
                    domMap[kind].contents.date.firstChild.textContent = value;
                    domMap[kind].contents.date.setAttribute("value", value);
                    instance.projects.search("proid", project.proid).history.payments[kind].date = GeneralJs.stringToDate(value);
                    await ajaxJson({
                      mode: "historyUpdate",
                      proid: project.proid,
                      column: "date",
                      kind, value
                    }, "/constructInteraction");
                  } else {
                    window.alert("표준 형식으로 작성해주셔야 업데이트가 가능합니다!\n표준 형식 => 0000-00-00 또는 '-'");
                  }
                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        etcEventFunction = (kind) => {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.querySelector("input") === null) {
              greenInputEvent(async (value) => {
                try {
                  domMap[kind].contents.etc.firstChild.textContent = value;
                  domMap[kind].contents.etc.setAttribute("value", value);
                  instance.projects.search("proid", project.proid).history.payments[kind].etc = value;
                  await ajaxJson({
                    mode: "historyUpdate",
                    proid: project.proid,
                    column: "etc",
                    kind, value
                  }, "/constructInteraction");
                } catch (e) {
                  console.log(e);
                }
              }).call(this, e);
            }
          }
        }

        for (let { title, kind, contents } of contractContentsMap) {
          [ ratio, money, date, etc ] = contents;
          tempDom = createNode({
            mother: contentsArea,
            style: {
              display: "block",
              position: "relative",
              marginBottom: String(rowMargin) + ea,
            }
          });
          tempTitleDom = createNode({
            mother: tempDom,
            text: title,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              width: String(titleWidth) + ea,
              fontSize: String(textSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
            }
          });
          tempContentsDoms = createNode({
            mother: tempDom,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: withOut(titleWidth, ea),
              height: String(areaHeight) + ea,
              top: String(areaTop) + ea,
            },
            children: [
              {
                style: {
                  position: "relative",
                  width: String(3000) + ea,
                  left: String(0),
                  top: String(0),
                }
              }
            ]
          });
          tempRatioDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: ratio },
            text: ratio,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: ratioEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          tempMoneyDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: money },
            text: money,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: moneyEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: "예상일 : ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.deactive,
              marginRight: String(betweenMargin0) + ea,
            }
          });
          tempDateDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: date },
            text: date,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: dateEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: " | ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.green,
              marginRight: String(betweenMargin1) + ea,
            }
          });
          createNode({
            mother: tempContentsDoms.firstChild,
            text: "비고 : ",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.deactive,
              marginRight: String(betweenMargin0) + ea,
            }
          });
          tempEtcDom = createNode({
            mother: tempContentsDoms.firstChild,
            attribute: { value: etc },
            text: etc,
            event: {
              selectstart: (e) => { e.preventDefault(); e.stopPropagation(); },
              click: etcEventFunction(kind),
            },
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(textSize) + ea,
              fontWeight: String(areaWeight),
              color: colorChip.black,
            }
          });

          tempObj = {
            mother: tempDom,
            title: tempTitleDom,
            kind,
            total: totalValueDom,
            contents: {
              ratio: tempRatioDom,
              amount: tempMoneyDom,
              date: tempDateDom,
              etc: tempEtcDom
            }
          }

          domMap[kind] = tempObj;
          domMap.push(tempObj);
        }

      } else {
        window.alert("공사 기간, 파트너 시공사를 먼저 모두 설정해주세요!");
        cancelBox.parentNode.removeChild(cancelBox);

      }

    });

    stringArr.push(textMaker(map["address"].title, address, "black", "address"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

  } else if (this.type === "payment") {

    displayBoo = !(partner.trim() === "디자이너" || partner.trim() === "고객" || partner.trim() === "" || partner.trim === "외부업체");

    map = {
      status: {
        title: "진행 단계",
        position: "process.design.construct.status",
        values: statusValues,
        chain: null
      },
      firstGuide: {
        title: "계약금 안내",
        position: "process.design.construct.contract.payments.first.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      firstAmount: {
        title: "계약금",
        position: "process.design.construct.contract.payments.first.calculation.amount.consumer",
        values: [],
        chain: null
      },
      firstDate: {
        title: "계약금 입금",
        position: "process.design.construct.contract.payments.first.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      startGuide: {
        title: "착수금 안내",
        position: "process.design.construct.contract.payments.start.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      startAmount: {
        title: "착수금",
        position: "process.design.construct.contract.payments.start.calculation.amount.consumer",
        values: [],
        chain: null
      },
      startDate: {
        title: "착수금 입금",
        position: "process.design.construct.contract.payments.start.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      middleGuide: {
        title: "중도금 안내",
        position: "process.design.construct.contract.payments.middle.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      middleAmount: {
        title: "중도금",
        position: "process.design.construct.contract.payments.middle.calculation.amount.consumer",
        values: [],
        chain: null
      },
      middleDate: {
        title: "중도금 입금",
        position: "process.design.construct.contract.payments.middle.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      remainGuide: {
        title: "잔금 안내",
        position: "process.design.construct.contract.payments.remain.guide",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
      remainAmount: {
        title: "잔금",
        position: "process.design.construct.contract.payments.remain.calculation.amount.consumer",
        values: [],
        chain: null
      },
      remainDate: {
        title: "잔금 입금",
        position: "process.design.construct.contract.payments.remain.date",
        values: [ '예정', '해당 없음' ],
        chain: null
      },
    };

    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNode, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let maxColumnNumber;
      let tong, tongTong;
      let factorWidth;
      let paddingLeft;
      let unitBlockWidth;
      let factor, factorTong, factorWidthTong;
      let tempMax;
      let maxTong;
      let maxWidth;
      let tongTongArr;
      let children;

      position = map[column].position;
      values = map[column].values;
      startLeft = 0;
      factorWidth = 500;
      margin = 4;
      paddingLeft = 14;
      maxColumnNumber = statusValuesMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return Math.max(acc, curr) });
      width = (factorWidth * maxColumnNumber) + (margin * (maxColumnNumber - 1));

      background = colorChip.gradientGreen4;
      updateEvent = async function (e) {
        try {
          const value = this.getAttribute("value");
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const removeTargets = mother.querySelectorAll("aside");
          let whereQuery, updateQuery;

          whereQuery = { proid };
          updateQuery = {};
          updateQuery[position] = value;
          valueDom.textContent = value;

          await instance.constructUpdate(whereQuery, updateQuery, map[column].chain, value);
          instance.constructDeactivate(proid, /^[드완]/.test(value));

          for (let dom of removeTargets) {
            mother.removeChild(dom);
          }

          
        } catch (e) {
          console.log(e);
        }
      }

      tong = createNode({
        mother: this,
        mode: "aside",
        style: {
          display: "block",
          position: "absolute",
          top: String(top) + ea,
          left: String(startLeft) + ea,
          width: String(width) + ea,
          height: "auto",
          transition: "all 0s ease",
          zIndex, animation
        }
      });

      maxTong = [];
      tongTongArr = [];
      for (let arr of statusValuesMatrix) {

        unitBlockWidth = (width - (margin * (arr.length - 1))) / arr.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);

        tongTong = createNode({
          mother: tong,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            marginBottom: String(margin) + ea,
            height: String(height) + ea,
            width: String(100) + '%',
          }
        });
        tongTongArr.push(tongTong);

        factorTong = [];
        for (let i = 0; i < arr.length; i++) {
          factor = createNode({
            mother: tongTong,
            attribute: { value: arr[i], position, proid: project.proid },
            events: [ { type: "click", event: updateEvent } ],
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(unitBlockWidth) + ea,
              height: String(100) + '%',
              paddingLeft: String(paddingLeft) + ea,
              paddingRight: String(paddingLeft) + ea,
              marginRight: String(i !== arr.length - 1 ? margin : 0) + ea,
              background: (arr[i].trim() !== '-' && arr[i].trim() !== '' ? colorChip.gradientGreen : colorChip.deactive),
              justifyContent: "center",
              transition: "all 0s ease",
              boxShadow, borderRadius,
            },
            children: [
              {
                text: arr[i],
                style: {
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(size) + ea,
                  fontWeight: String(500),
                  color: colorChip.whiteBlack,
                }
              }
            ]
          });
          factorTong.push(factor);
        }

        for (let dom of factorTong) {
          dom.style.width = "auto";
        }
        factorWidthTong = factorTong.map((dom) => { return dom.getBoundingClientRect().width });
        tempMax = Math.max(...factorWidthTong);
        for (let dom of factorTong) {
          dom.style.width = String(tempMax) + ea;
        }
        maxTong.push((tempMax * arr.length) + (margin * (arr.length - 1)));

      }

      maxWidth = Math.max(...maxTong);
      tong.style.width = String(maxWidth) + ea;

      for (let tongTong of tongTongArr) {
        children = [ ...tongTong.children ];
        unitBlockWidth = (maxWidth - (margin * (children.length - 1))) / children.length;
        unitBlockWidth = unitBlockWidth - (paddingLeft * 2);
        for (let dom of children) {
          dom.style.width = String(unitBlockWidth) + ea;
        }
      }

    });

    tempValue = (payments.first !== null ? payments.first.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.first.date;
    }
    stringArr.push(textMaker(map["firstGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "firstGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "firstGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
        if (window.confirm("계약금 안내를 보낼까요?")) {

          ajaxJson({
            mode: "chargeGuide",
            proid,
            method: "first",
          }, "/constructInteraction", { equal: true }).then((result) => {
            const { date, now } = result;
            window.alert("계약금 안내를 전송하였습니다!");
            mother.querySelector(".value").textContent = date;
            mother.querySelector(".value").style.color = colorChip.black;
            instance.projects.search("proid", proid).process.design.construct.contract.payments.first.guide = now;

          }).catch((err) => {
            console.log(err);
          });

        }
        cancelBox.parentNode.removeChild(cancelBox);
      } else {

        values = map[column].values;
        startLeft = 0;
        width = 260;
        margin = 4;

        background = colorChip.gradientGreen;
        updateEvent = async function (e) {
          e.stopPropagation();
          e.preventDefault();
          try {
            const value = this.getAttribute("value");
            const removeTargets = mother.querySelectorAll("aside");
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.first.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];

          } catch (e) {
            console.log(e);
          }
        };

        nodeArr = createNodes([
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[0] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[0],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[1] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft + ((width - margin) / 2) + margin) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[1],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
            style: {
              position: "absolute",
              top: String(top + height + margin) + ea,
              left: String(startLeft) + ea,
              width: String(width) + ea,
              zIndex, borderRadius, animation,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              background: colorChip.white,
              transition: "all 0s ease",
            }
          }
        ]);

        calendarTong = nodeArr[4];

        const calendar = instance.mother.makeCalendar(new Date(), function (e) {
          e.stopPropagation();
          e.preventDefault();
          this.setAttribute("value", this.getAttribute("buttonValue"));
          updateEvent.call(this, e);
        });
        calendarTong.appendChild(calendar.calendarBase);

      }


    });

    stringArr.push(textMaker(map["firstAmount"].title, autoComma(payments.first !== null ? payments.first.calculation.amount.consumer : 0) + '원', "black", "firstAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    stringArr.push(textMaker(map["firstDate"].title, dateToString(payments.first !== null ? payments.first.date : emptyDate), dateToColor(payments.first !== null ? payments.first.date : emptyDate, true), "firstDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    tempValue = (payments.start !== null ? payments.start.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.start.date;
    }
    stringArr.push(textMaker(map["startGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "startGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "startGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
        if (window.confirm("착수금 안내를 보낼까요?")) {

          ajaxJson({
            mode: "chargeGuide",
            proid,
            method: "start",
          }, "/constructInteraction", { equal: true }).then((result) => {
            const { date, now } = result;
            window.alert("착수금 안내를 전송하였습니다!");
            mother.querySelector(".value").textContent = date;
            mother.querySelector(".value").style.color = colorChip.black;
            instance.projects.search("proid", proid).process.design.construct.contract.payments.start.guide = now;

          }).catch((err) => {
            console.log(err);
          });

        }
        cancelBox.parentNode.removeChild(cancelBox);
      } else {
        values = map[column].values;
        startLeft = 0;
        width = 260;
        margin = 4;

        background = colorChip.gradientGreen;
        updateEvent = async function (e) {
          e.stopPropagation();
          e.preventDefault();
          try {
            const value = this.getAttribute("value");
            const removeTargets = mother.querySelectorAll("aside");
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.start.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];

          } catch (e) {
            console.log(e);
          }
        };

        nodeArr = createNodes([
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[0] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[0],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[1] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft + ((width - margin) / 2) + margin) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[1],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
            style: {
              position: "absolute",
              top: String(top + height + margin) + ea,
              left: String(startLeft) + ea,
              width: String(width) + ea,
              zIndex, borderRadius, animation,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              background: colorChip.white,
              transition: "all 0s ease",
            }
          }
        ]);

        calendarTong = nodeArr[4];

        const calendar = instance.mother.makeCalendar(new Date(), function (e) {
          e.stopPropagation();
          e.preventDefault();
          this.setAttribute("value", this.getAttribute("buttonValue"));
          updateEvent.call(this, e);
        });
        calendarTong.appendChild(calendar.calendarBase);

      }


    });

    stringArr.push(textMaker(map["startAmount"].title, autoComma(payments.start !== null ? payments.start.calculation.amount.consumer : 0) + '원', "black", "startAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    stringArr.push(textMaker(map["startDate"].title, dateToString(payments.start !== null ? payments.start.date : emptyDate), dateToColor(payments.start !== null ? payments.start.date : emptyDate, true), "startDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    tempValue = (payments.middle !== null ? payments.middle.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.middle.date;
    }
    stringArr.push(textMaker(map["middleGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "middleGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "middleGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
        if (window.confirm("중도금 안내를 보낼까요?")) {

          ajaxJson({
            mode: "chargeGuide",
            proid,
            method: "middle",
          }, "/constructInteraction", { equal: true }).then((result) => {
            const { date, now } = result;
            window.alert("중도금 안내를 전송하였습니다!");
            mother.querySelector(".value").textContent = date;
            mother.querySelector(".value").style.color = colorChip.black;
            instance.projects.search("proid", proid).process.design.construct.contract.payments.middle.guide = now;

          }).catch((err) => {
            console.log(err);
          });

        }
        cancelBox.parentNode.removeChild(cancelBox);
      } else {
        values = map[column].values;
        startLeft = 0;
        width = 260;
        margin = 4;

        background = colorChip.gradientGreen;
        updateEvent = async function (e) {
          e.stopPropagation();
          e.preventDefault();
          try {
            const value = this.getAttribute("value");
            const removeTargets = mother.querySelectorAll("aside");
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.middle.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];

          } catch (e) {
            console.log(e);
          }
        };

        nodeArr = createNodes([
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[0] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[0],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[1] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft + ((width - margin) / 2) + margin) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[1],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
            style: {
              position: "absolute",
              top: String(top + height + margin) + ea,
              left: String(startLeft) + ea,
              width: String(width) + ea,
              zIndex, borderRadius, animation,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              background: colorChip.white,
              transition: "all 0s ease",
            }
          }
        ]);

        calendarTong = nodeArr[4];

        const calendar = instance.mother.makeCalendar(new Date(), function (e) {
          e.stopPropagation();
          e.preventDefault();
          this.setAttribute("value", this.getAttribute("buttonValue"));
          updateEvent.call(this, e);
        });
        calendarTong.appendChild(calendar.calendarBase);

      }


    });

    stringArr.push(textMaker(map["middleAmount"].title, autoComma(payments.middle !== null ? payments.middle.calculation.amount.consumer : 0) + '원', "black", "middleAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    stringArr.push(textMaker(map["middleDate"].title, dateToString(payments.middle !== null ? payments.middle.date : emptyDate), dateToColor(payments.middle !== null ? payments.middle.date : emptyDate, true), "middleDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

    tempValue = (payments.remain !== null ? payments.remain.guide : emptyDate);
    if (tempValue.valueOf() < emptyDateValue) {
      tempValue = project.history.payments.remain.date;
    }
    stringArr.push(textMaker(map["remainGuide"].title, dateToString(tempValue), dateToColor(tempValue, true), "remainGuide"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "remainGuide";
      let startLeft, width, margin, background;
      let values, updateEvent;
      let nodeArr;
      let position;
      let whereQuery, updateQuery, chainQuery;
      let calendarTong;

      if (e.type === "click") {
        if (window.confirm("잔금 안내를 보낼까요?")) {

          ajaxJson({
            mode: "chargeGuide",
            proid,
            method: "remain",
          }, "/constructInteraction", { equal: true }).then((result) => {
            const { date, now } = result;
            window.alert("잔금 안내를 전송하였습니다!");
            mother.querySelector(".value").textContent = date;
            mother.querySelector(".value").style.color = colorChip.black;
            instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.guide = now;

          }).catch((err) => {
            console.log(err);
          });

        }
        cancelBox.parentNode.removeChild(cancelBox);
      } else {
        values = map[column].values;
        startLeft = 0;
        width = 260;
        margin = 4;

        background = colorChip.gradientGreen;
        updateEvent = async function (e) {
          e.stopPropagation();
          e.preventDefault();
          try {
            const value = this.getAttribute("value");
            const removeTargets = mother.querySelectorAll("aside");
            let dateValue, tempArr;
            if (value === "예정") {
              dateValue = new Date(3800, 0, 1);
            } else if (value === "해당 없음") {
              dateValue = new Date(1800, 0, 1);
            } else {
              tempArr = value.split('-');
              dateValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
            }

            await ajaxJson({
              method: "project",
              id: project.proid,
              column: "construct.payments.remain.date",
              value: dateValue,
              email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            }, "/updateHistory");

            valueDom.textContent = value;
            for (let dom of removeTargets) {
              mother.removeChild(dom);
            }
            thisCase[column].style.color = colorChip[dateToColor(dateValue, true)];

          } catch (e) {
            console.log(e);
          }
        };

        nodeArr = createNodes([
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[0] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[0],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            attribute: [ { value: values[1] } ],
            events: [ { type: "click", event: updateEvent } ],
            style: {
              position: "absolute",
              top: String(top) + ea,
              left: String(startLeft + ((width - margin) / 2) + margin) + ea,
              width: String((width - margin) / 2) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              zIndex, borderRadius, animation,
            }
          },
          {
            mother: -1,
            text: values[1],
            style: {
              position: "absolute",
              top: String(textTop) + ea,
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(size) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          },
          {
            mother: this,
            mode: "aside",
            events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
            style: {
              position: "absolute",
              top: String(top + height + margin) + ea,
              left: String(startLeft) + ea,
              width: String(width) + ea,
              zIndex, borderRadius, animation,
              boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
              background: colorChip.white,
              transition: "all 0s ease",
            }
          }
        ]);

        calendarTong = nodeArr[4];

        const calendar = instance.mother.makeCalendar(new Date(), function (e) {
          e.stopPropagation();
          e.preventDefault();
          this.setAttribute("value", this.getAttribute("buttonValue"));
          updateEvent.call(this, e);
        });
        calendarTong.appendChild(calendar.calendarBase);

      }


    });

    stringArr.push(textMaker(map["remainAmount"].title, autoComma(payments.remain !== null ? payments.remain.calculation.amount.consumer : 0) + '원', "black", "remainAmount"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("시공 금액을 변경하시겠습니까?")) {
        const valueInput = async function () {
          let answer, answerRaw, boo, message, zeroBoo;
          do {
            do {
              answer = await GeneralJs.prompt("새로운 시공 잔금을 소비자가 기준으로 숫자로만, 또는 만원 단위로 써서 입력해주세요!\n예) 24000000원 또는 2400만원 등등");
              if (typeof answer === "string") {
                answerRaw = answer;
                answer = answer.trim().replace(/[^0-9]/gi, '');
                if (answer === '') {
                  boo = false;
                } else {
                  answer =  Number(answer);
                  if (Number.isNaN(answer)) {
                    boo = false;
                  } else {
                    if (answer < 100000) {
                      if (/만/gi.test(answerRaw)) {
                        answer = answer * 10000;
                        boo = true;
                      } else if (/억/gi.test(answerRaw)) {
                        answer = answer * 10000 * 10000;
                        boo = true;
                      } else {
                        boo = false;
                      }
                    } else {
                      boo = true;
                    }
                  }
                }
              } else {
                boo = false;
              }
            } while (!boo);
            message = '';
            if ((answer / 10000) > 10000) {
              message = String(answer / (10000 * 10000)) + "억원";
            } else {
              message = String(answer / 10000) + "만원";
            }
            message += "이 맞습니까?";
            zeroBoo = !window.confirm(message);
          } while (zeroBoo);
          return answer;
        }
        let loading;

        valueInput().then((answer) => {
          loading = instance.mother.grayLoading();

          mother.querySelector(".value").textContent = autoComma(answer) + '원';
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.supply = Math.floor(answer) - Math.floor(answer / 11);
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.vat = Math.floor(answer / 11);
          instance.projects.search("proid", proid).process.design.construct.contract.payments.remain.calculation.amount.consumer = Math.floor(answer);

          return ajaxJson({ mode: "amountSync", proid, amount: answer }, "/constructInteraction");
        }).then(() => {
          loading.remove();
          window.alert("업데이트가 완료되었습니다!");
        }).catch((err) => {
          console.log(err);
        });

      }
      cancelBox.parentNode.removeChild(cancelBox);

    });

    stringArr.push(textMaker(map["remainDate"].title, dateToString(payments.remain !== null ? payments.remain.date : emptyDate), dateToColor(payments.remain !== null ? payments.remain.date : emptyDate, true), "remainDate"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);

    });

  }

  return { map, stringArr, updateArr, grayBoo, displayBoo };
}

BuilderJs.prototype.constructUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
  const instance = this;
  const { colorChip, ajaxJson } = GeneralJs;
  try {
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild input");
    }
    if (chainQuery !== null) {
      if (chainQuery.condition === undefined || chainQuery.updateQuery === undefined) {
        throw new Error("invaild input");
      }
    }
    const { proid } = whereQuery;
    const project = this.projects.search("proid", proid);
    let tempArr, target;
    let boo;
    let tempQsa0, tempQsa1, tempQsa2;

    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");

    for (let query in updateQuery) {
      tempArr = query.split('.');
      target = project;
      for (let i = 0; i < tempArr.length - 1; i++) {
        target = target[tempArr[i]];
      }
      target[tempArr[tempArr.length - 1]] = updateQuery[query];
    }

    if (chainQuery !== null) {
      const { condition, updateQuery: chainUpdateQuery } = chainQuery;
      boo = false;
      if ((new RegExp(condition, "gi")).test(rawValue)) {
        boo = true;
      }
      if (boo) {
        await ajaxJson({ whereQuery, updateQuery: chainUpdateQuery }, "/rawUpdateProject");
        for (let query in chainUpdateQuery) {
          tempArr = query.split('.');
          target = project;
          for (let i = 0; i < tempArr.length - 1; i++) {
            target = target[tempArr[i]];
          }
          target[tempArr[tempArr.length - 1]] = chainUpdateQuery[query];
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.constructDeactivate = function (proid, offMode = true) {
  const instance = this;
  const { colorChip, stacks } = GeneralJs;
  let emptyDate, emptyValue;
  let tempQsa;
  let whiteBlock;
  let num;
  let name;
  let tong;
  let children;
  let length;

  whiteBlock = document.getElementById(proid);
  children = whiteBlock.children;
  length = children.length;
  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";
  name = "deactive_" + proid;

  if (offMode) {
    stacks[name] = [];
    tong = stacks[name];
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tong.push(whiteBlock.firstChild.style.background);
    whiteBlock.firstChild.style.background = colorChip.gray0;
    tong.push(children[length - 2].style.background);
    children[length - 2].style.background = colorChip.gray0;
    tong.push(children[length - 1].style.background);
    children[length - 1].style.background = colorChip.gray4;
  } else {
    if (Array.isArray(stacks[name])) {
      num = 0;
      tong = stacks[name];
      tempQsa = whiteBlock.querySelectorAll("div");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      tempQsa = whiteBlock.querySelectorAll("b");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      whiteBlock.firstChild.style.background = tong[num];
      num = num + 1;
      children[length - 2].style.background = tong[num];
      num = num + 1;
      children[length - 1].style.background = tong[num];
    } else {
      if (![ "rgb(255, 255, 255)", "#ffffff", "#fff", "#FFFFFF", "#FFF", "white" ].includes(whiteBlock.firstChild.style.background)) {
        window.location.reload();
      }
    }
  }

}

// LOGIC -----------------------------------------------------------------------------------------------------------------

BuilderJs.prototype.constructBase = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTong;
  let size;
  let borderBack;
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;
  let topMargin, leftMargin;

  margin = 30;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;
  topMargin = 11;
  leftMargin = 10;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  [ borderBack, dashBoard, contentsArea, contentsTong ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray2,
        borderRadius: String(3) + "px",
        textAlign: "center",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    },
    {
      mother: -1,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        right: String(margin) + ea,
        width: String(leftMargin) + ea,
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
        zIndex: String(4),
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        right: String(0) + ea,
        width: String(margin) + ea,
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        boxSizing: "border-box",
        background: colorChip.white,
        zIndex: String(4),
      }
    },
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.constructBlockInjection();
  this.constructDashBoard();
}

BuilderJs.prototype.constructBlockInjection = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, appendQuery, returnGet, removeQuery, setQueue } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  let scrollTong;
  let width, dom;
  let maxWidth;
  let startLeft, betweenText, widthArr, domArr;
  let temp;
  let firstBoo;
  let leftMargin;
  let firstPaddingTop;
  let tongPaddingBottom;
  let resultArr;

  leftMargin = 10;
  firstPaddingTop = 44;
  tongPaddingBottom = 1000;

  cleanChildren(contentsTong);

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: withOut(leftMargin, ea),
      overflowX: "hidden",
      paddingTop: String(firstPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
    }
  });

  maxWidth = [];

  projects.sort((a, b) => { return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf(); });

  this.scrollTong = scrollTong;
  this.contentsBlocks = [];
  this.ignoreNumbers = [ 3, 1 ];
  this.widthArrMotherConverted = null;

  resultArr = [];
  firstBoo = true;
  for (let i = 0; i < projects.length; i++) {
    if (firstBoo) {
      this.constructWhiteBlock(scrollTong, projects[i], (i === 0), i, true);
      firstBoo = false;
    }
    resultArr.push(this.constructWhiteBlock(scrollTong, projects[i], false, i, false));
  }

  resultArr = resultArr.filter((obj) => { return obj.result; });
  if (resultArr.length === 1) {
    if (returnGet().proid !== resultArr[0].proid) {
      appendQuery({
        proid: resultArr[0].proid
      });
    }
  } else if (resultArr.length === projects.length) {
    setQueue(() => {
      removeQuery("proid");
    });
  }

}

BuilderJs.prototype.constructWhiteBlock = function (mother, project, first, index, titleMode = false) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, blankHref } = GeneralJs;
  const { map, stringArr, updateArr, grayBoo, displayBoo } = this.constructDataRender(project, titleMode);
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let whiteWidth;
  let tempDom;
  let factorHeight;
  let leftMargin;
  let motherMargin;
  let titleBlockTop;
  let menuMargin;
  let menuHeight;
  let menuTextTop;
  let blockArr;
  let blockMap;
  let thisWidthArr;


  if (this.type === "construct") {
    thisWidthArr = [
      79,
      76,
      79,
      158,
      126,
      79,
      79,
      79,
      720,
    ]
  } else {
    thisWidthArr = [
      64,
      78,
      78,
      78,
      78,
      89,
      78,
      78,
      89,
      78,
      78,
      89,
      78,
    ]
  }

  leftMargin = 10;
  motherMargin = 30;

  height = 43;
  margin = 1;

  width0 = 115;
  width1 = 3;
  titleBlockTop = 105;

  top = (titleMode ? (isMac() ? 11 : 12.5) : (isMac() ? 11 : 12.5));
  left = 16;
  size = 14;
  textMargin = 6;
  betweenText = 48;

  whiteWidth = 16;
  factorHeight = 20;

  menuMargin = 24;
  menuHeight = 32;
  menuTextTop = isMac() ? 6 : 7;

  blockMap = window.localStorage.getItem(instance.localStorageConst + instance.blockMapConst + instance.type);
  if (blockMap === null) {
    blockMap = {};
  } else {
    blockMap = JSON.parse(blockMap);
  }

  if (blockMap[project.proid] === undefined) {
    blockArr = (new Array(stringArr.length)).fill("block");
  } else {
    blockArr = blockMap[project.proid];
    blockArr.pop();
  }

  blockArr.push(first ? "block" : instance.contentsSearchIndex.includes(index) ? "none" : (displayBoo ? "block" : "none"));

  whiteBlock = createNode({
    mother,
    id: titleMode ? "title" : project.proid,
    attribute: [
      { index: String(index) },
      { sortstandard: "" },
      { sort: "1" },
      { titlemode: titleMode ? 1 : 0 },
      { blockarr: JSON.stringify(blockArr) }
    ],
    style: {
      display: first ? "block" : blockArr.every((str) => { return str.trim() === "block" }) ? "block" : "none",
      position: titleMode ? "fixed" : "relative",
      width: String(8000) + ea,
      height: String(height) + ea,
      marginBottom: String(margin) + ea,
      transition: "all 0s ease",
      zIndex: titleMode ? String(4) : "",
      top: titleMode ? String(titleBlockTop) + ea : "",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: "calc(100vw - " + String((motherMargin * 2) + (leftMargin * 2)) + ea + ")",
          height: String(100) + '%',
          borderRadius: String(3) + "px",
          background: titleMode ? colorChip.gradientGray : colorChip[grayBoo ? "white" : "gray0"],
          top: String(0),
          left: String(0),
          transition: "all 0s ease",
          boxShadow: titleMode ? "0px 2px 13px -9px " + colorChip.shadow : "",
          opacity: titleMode ? String(0.92) : "",
        }
      },
      {
        text: !titleMode ? project.title : "",
        class: [ "hoverDefault" ],
        events: [
          {
            type: "click",
            event: function (e) {
              blankHref(window.location.protocol + "//" + window.location.host + "/project?proid=" + project.proid + "&rmode=true");
            }
          }
        ],
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width0) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(left) + ea,
          fontSize: String(size) + ea,
          zIndex: String(2),
          color: colorChip.black,
          transition: "all 0s ease",
        }
      },
      {
        text: !titleMode ? `|<b style="display:none">${project.proid + project.cliid + project.desid}</b>` : "",
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width1) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(textMargin) + ea,
          fontSize: String(size) + ea,
          color: colorChip.gray4,
          zIndex: String(2),
          transition: "all 0s ease",
        }
      },
    ]
  });

  widthArr = [];
  domArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    tempDom = createNode({
      mother: whiteBlock,
      attribute: [
        { index: String(index) },
        { arrindex: String(i) },
        { titlemode: titleMode ? 1 : 0 },
        { sort: String(1) }
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            const self = this;
            const { ea, ignoreNumbers, contentsBlocks, scrollTong } = instance;
            const { createNode, createNodes, colorChip, withOut, xyConverting, dateToString, stringToDate, isMac } = GeneralJs;
            const titleMode = Number(this.getAttribute("titlemode")) === 1;
            const thisIndex = Number(this.getAttribute("arrindex"));
            const thisSort = Number(this.getAttribute("sort"));
            if (titleMode) {

              const targets = contentsBlocks.map((dom, index) => { return { dom, index: index - 1 }; }).slice(1);
              const children = xyConverting(targets.map((obj) => { return [ ...obj.dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]); }));
              const sortTargets = children[thisIndex];
              const sortTargetsText = sortTargets.map((dom) => { return dom.querySelector(".value").textContent; });
              let indexArr, tempIndex, numberSortBoo;
              let target, column;
              let width, widthFactor;
              let innerMargin;
              let margin;
              let tong;
              let factor;
              let paddingLeft;
              let widthArr;
              let factorArr;
              let newWidth;
              let originalWidth;
              let height;
              let visual;
              let tongMargin;
              let cancel;
              let callback;
              let cancelLive;
              let onoff;
              let mode;
              let fontSize;

              if (e.type === "contextmenu") {

                // sort

                numberSortBoo = sortTargets.map((dom) => { return dom.querySelector(".value").textContent; }).some((str) => { return (str.replace(/[0-9\-\.\: ]/gi, '').trim() === '' && /[0-9]/gi.test(str)) });

                if (!numberSortBoo) {
                  if (thisSort === 1) {
                    sortTargets.sort((a, b) => {
                      return b.querySelector(".value").textContent > a.querySelector(".value").textContent ? 1 : -1;
                    });
                    this.setAttribute("sort", String(0));
                  } else {
                    sortTargets.sort((a, b) => {
                      return a.querySelector(".value").textContent > b.querySelector(".value").textContent ? 1 : -1;
                    });
                    this.setAttribute("sort", String(1));
                  }
                } else {
                  if (thisSort === 1) {
                    sortTargets.sort((a, b) => {
                      return (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                    });
                    this.setAttribute("sort", String(0));
                  } else {
                    sortTargets.sort((a, b) => {
                      return (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                    });
                    this.setAttribute("sort", String(1));
                  }
                }

                indexArr = sortTargets.map((dom) => { return Number(dom.getAttribute("index")) });
                for (let index of indexArr) {
                  tempIndex = targets.findIndex((obj) => { return obj.index === index });
                  if (tempIndex !== -1) {
                    scrollTong.appendChild(targets[tempIndex].dom);
                  }
                }

              } else {

                // filter
                margin = 10;
                innerMargin = 4;
                widthFactor = 600;
                paddingLeft = 12;
                height = 36;
                visual = isMac() ? -2 : 0.5;
                tongMargin = 13;
                cancelLive = true;
                fontSize = 14;

                cancel = createNode({
                  mother: this,
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

                if (sortTargetsText.some((str) => { return /[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(str); })) {
                  if (sortTargetsText.some((str) => { return /\,/gi.test(str) })) {
                    // date history
                    target = [ "있음", "없음" ];
                    column = 1;
                    mode = "dateHistory";
                  } else {
                    // date
                    target = [ "미래", "과거", "미정" ];
                    column = 1;
                    mode = "date";
                  }
                } else if (sortTargetsText.every((str) => { return str.length < 20; })) {
                  if (sortTargetsText.some((str) => { return /원$/.test(str) && /^[0-9]/gi.test(str) })) {
                    // money
                    target = [ "있음", "없음" ];
                    column = 1;
                    mode = "money";
                  } else {
                    // menu
                    target = [ ...new Set(sortTargetsText) ];
                    column = Math.ceil(target.length / 5);
                    mode = "menu";
                  }
                } else {
                  // long
                  cancel.remove();
                  cancelLive = false;
                }

                if (cancelLive) {

                  width = (widthFactor * column) + (innerMargin * (column - 1));

                  tong = createNode({
                    mother: this,
                    event: {
                      click: (e) => { e.preventDefault(); e.stopPropagation(); }
                    },
                    style: {
                      display: "block",
                      position: "absolute",
                      top: String(this.getBoundingClientRect().height + margin) + ea,
                      left: String((this.firstChild.getBoundingClientRect().width / 2) - (width / 2)) + ea,
                      width: String(width + column) + ea,
                      height: "auto",
                      transition: "all 0s ease",
                      borderRadius: String(3) + ea,
                      animation: "fadeuplite 0.3s ease",
                      boxShadow: "0px 4px 13px -9px " + colorChip.shadow,
                      zIndex: String(1),
                    },
                    children: [
                      {
                        style: {
                          position: "absolute",
                          top: String(0),
                          left: String(0),
                          width: String(100) + '%',
                          height: String(100) + '%',
                          background: colorChip.gray1,
                          opacity: String(0.9),
                          borderRadius: String(3) + ea,
                        }
                      }
                    ]
                  });


                  if (!Array.isArray(GeneralJs.stacks[instance.type + String(thisIndex)])) {
                    if (window.localStorage.getItem(instance.localStorageConst + instance.type + String(thisIndex)) !== null) {
                      GeneralJs.stacks[instance.type + String(thisIndex)] = JSON.parse(window.localStorage.getItem(instance.localStorageConst + instance.type + String(thisIndex)));
                    } else {
                      GeneralJs.stacks[instance.type + String(thisIndex)] = [[]];
                      window.localStorage.setItem(instance.localStorageConst + instance.type + String(thisIndex), JSON.stringify([[]]));
                    }
                  }
                  widthArr = [];
                  factorArr = [];
                  for (let str of target) {
                    onoff = GeneralJs.stacks[instance.type + String(thisIndex)][0].includes(str);
                    factor = createNode({
                      mother: tong,
                      attribute: {
                        toggle: onoff ? "on" : "off",
                        value: str,
                      },
                      event: {
                        click: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          const toggle = this.getAttribute("toggle");
                          if (toggle === "off") {
                            this.style.background = colorChip.green;
                            this.setAttribute("toggle", "on");
                          } else {
                            this.style.background = colorChip.deactive;
                            this.setAttribute("toggle", "off");
                          }
                        }
                      },
                      style: {
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        width: String(widthFactor) + ea,
                        marginRight: String(innerMargin) + ea,
                        marginBottom: String(innerMargin) + ea,
                        height: String(height) + ea,
                        background: onoff ? colorChip.green : colorChip.deactive,
                        borderRadius: String(3) + ea,
                        paddingLeft: String(paddingLeft) + ea,
                        paddingRight: String(paddingLeft) + ea,
                      },
                      children: [
                        {
                          class: [ "hoverDefault_lite" ],
                          text: str,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(500),
                            color: colorChip.whiteBlack,
                            textAlign: "center",
                            width: String(100) + '%',
                            position: "relative",
                            top: String(visual) + ea,
                          }
                        }
                      ]
                    });

                    factor.style.width = "auto";
                    widthArr.push(factor.getBoundingClientRect().width);
                    factorArr.push(factor);
                  }

                  widthArr.sort((a, b) => { return b - a; });
                  originalWidth = Math.ceil(widthArr[0]);
                  newWidth = originalWidth - (paddingLeft * 2);
                  factorArr.forEach((dom) => {
                    dom.style.width = String(newWidth) + ea;
                  });

                  width = (originalWidth * column) + (innerMargin * (column - 1));

                  tong.style.paddingLeft = String(tongMargin) + ea;
                  tong.style.paddingTop = String(tongMargin) + ea;
                  tong.style.paddingRight = String(tongMargin - innerMargin) + ea;
                  tong.style.paddingBottom = String(tongMargin - innerMargin) + ea;

                  tong.style.left = String((this.firstChild.getBoundingClientRect().width / 2) - ((width + tongMargin + tongMargin) / 2)) + ea;
                  tong.style.width = String(width + innerMargin) + ea;

                  callback = async () => {
                    try {
                      const targetValues = factorArr.filter((dom) => { return dom.getAttribute("toggle") === "on" }).map((dom) => { return dom.getAttribute("value"); });
                      let blockArr, blockMap;
                      blockMap = {};

                      if (mode === "dateHistory") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("있음")) {
                              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(dom.querySelector(".value").textContent)) {
                                blockArr[thisIndex] = "none";
                              } else {
                                blockArr[thisIndex] = "block";
                              }
                            }

                            if (targetValues.includes("없음")) {
                              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(dom.querySelector(".value").textContent)) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("있음")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "date") {
                        if (targetValues.length > 0) {

                          const past = new Date(2000, 0, 1);
                          const now = new Date();
                          const future = new Date(3000, 0, 1);

                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("미래")) {
                              if (now.valueOf() <= stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() && stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() < future.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                blockArr[thisIndex] = "none";
                              }
                            }
                            if (targetValues.includes("과거")) {
                              if (now.valueOf() > stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() && stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() > past.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("미래")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }
                            if (targetValues.includes("미정")) {
                              if (future.valueOf() < stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() || stringToDate(dom.querySelector(".value").textContent.trim()).valueOf() < past.valueOf()) {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("미래") && !targetValues.includes("과거")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }

                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "money") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));

                            if (targetValues.includes("있음")) {
                              if (dom.querySelector(".value").textContent.trim() === "0원") {
                                blockArr[thisIndex] = "none";
                              } else {
                                blockArr[thisIndex] = "block";
                              }
                            }

                            if (targetValues.includes("없음")) {
                              if (dom.querySelector(".value").textContent.trim() === "0원") {
                                blockArr[thisIndex] = "block";
                              } else {
                                if (!targetValues.includes("있음")) {
                                  blockArr[thisIndex] = "none";
                                }
                              }
                            }

                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      } else if (mode === "menu") {
                        if (targetValues.length > 0) {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            if (targetValues.includes(dom.querySelector(".value").textContent.trim())) {
                              blockArr[thisIndex] = "block";
                            } else {
                              blockArr[thisIndex] = "none";
                            }
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        } else {
                          for (let dom of sortTargets) {
                            blockArr = JSON.parse(dom.parentElement.getAttribute("blockarr"));
                            blockArr[thisIndex] = "block";
                            blockMap[dom.parentElement.id] = blockArr;
                            dom.parentElement.setAttribute("blockarr", JSON.stringify(blockArr));
                            if (blockArr.every((str) => { return str === "block" })) {
                              dom.parentElement.style.display = "block";
                            } else {
                              dom.parentElement.style.display = "none";
                            }
                          }
                        }
                      }

                      window.localStorage.setItem(instance.localStorageConst + instance.blockMapConst + instance.type, JSON.stringify(blockMap));

                      GeneralJs.stacks[instance.type + String(thisIndex)].unshift(targetValues);
                      window.localStorage.setItem(instance.localStorageConst + instance.type + String(thisIndex), JSON.stringify(GeneralJs.stacks[instance.type + String(thisIndex)]));
                    } catch (e) {
                      console.log(e);
                    }
                  }

                  cancel.addEventListener("click", async (e) => {
                    try {
                      e.preventDefault();
                      e.stopPropagation();

                      if (typeof callback === "function") {
                        await callback();
                      }

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (e) {
                      console.log(e);
                    }
                  });
                }

              }
            } else {
              if (this.querySelectorAll("aside").length === 0) {
                const self = this;
                const index = Number(this.getAttribute("arrindex"));
                const valueDom = this.querySelector(".value");
                let thisCase;
                thisCase = {};
                for (let column in map) {
                  if (document.getElementById(project.proid + "_" + column) === null) {
                    throw new Error("invaild doms : " + column);
                  }
                  thisCase[column] = document.getElementById(project.proid + "_" + column);
                }
                const option = {
                  ea,
                  top: menuMargin,
                  createNode,
                  createNodes,
                  colorChip,
                  withOut,
                  thisCase,
                  boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                  animation: "fadeuplite 0.2s ease forwards",
                  borderRadius: String(5) + "px",
                  zIndex: String(3),
                  valueDom,
                  height: menuHeight,
                  size: size - 1,
                  textTop: menuTextTop
                };
                let cancelBox, parent;

                parent = this.parentElement;
                cancelBox = createNode({
                  mother: this,
                  mode: "aside",
                  events: [
                    {
                      type: "click",
                      event: async function (e) {
                        try {
                          e.stopPropagation();
                          e.preventDefault();
                          const directParent = this.parentElement;
                          const removeTargets = directParent.querySelectorAll("aside");
                          for (let dom of removeTargets) {
                            directParent.removeChild(dom);
                          }
                        } catch (e) {
                          console.log(e);
                        }
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
                    zIndex: option.zIndex,
                  }
                });

                updateArr[index].call(this, e, option, cancelBox, parent);
              }
            }
          }
        },
      ],
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        top: String(top) + ea,
        marginLeft: String(betweenText) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(titleMode ? 700 : 500),
        height: ((i === stringArr.length - 1) ? String(factorHeight) + ea : ""),
        overflow: ((i === stringArr.length - 1) ? "hidden" : "visible"),
        transition: "all 0s ease",
        cursor: "pointer",
        width: String(thisWidthArr[i]) + ea,
      }
    });
    domArr.push(tempDom);
    previousWidth = tempDom.getBoundingClientRect().width;
    widthArr.push(previousWidth);
  }

  whiteBack = createNode({
    mother: whiteBlock,
    style: {
      position: "absolute",
      top: String(0) + ea,
      right: String(0) + ea,
      width: String(whiteWidth) + ea,
      height: String(100) + '%',
      background: colorChip.white
    }
  });

  if (!grayBoo) {
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    whiteBlock.children[2].style.background = colorChip.gray0;
    whiteBack.style.background = colorChip.gray0;
  }

  this.contentsBlocks.push(whiteBlock);

  return {
    proid: project.proid,
    result: (first ? true : instance.contentsSearchIndex.includes(index) ? false : (displayBoo ? true : false))
  };
}

BuilderJs.prototype.constructDashBoard = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { dashBoard } = this.contentsSpec;
  let size, top, left;
  let nodeArr;
  let textArr;
  let typeNum;
  let dashBoardBox;

  size = 16;
  top = 11;
  left = 19;

  textArr = [];
  typeNum = 0;
  for (let i = 0; i < this.typeArr.length; i++) {
    if (this.typeArr[i] === this.type) {
      typeNum = i;
    }
    textArr.push(this.typeArr[i].slice(0, 1).toUpperCase() + this.typeArr[i].slice(1));
  }

  dashBoardBox = createNode({
    mother: dashBoard,
    style: {
      position: "relative",
      width: withOut(left * 2, ea),
      height: String(100) + '%',
      left: String(left) + ea,
      textAlign: "left",
    }
  });

  nodeArr = [];
  for (let i = 0; i < textArr.length; i++) {
    nodeArr.push({
      mother: dashBoardBox,
      text: textArr[i],
      class: [ "hoverDefault" ],
      attribute: [
        { value: instance.typeArr[i] }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.type = this.getAttribute("value");
            for (let i = 0; i < instance.typeArr.length; i++) {
              if (instance.typeArr[i] === instance.type) {
                instance.typeDoms[i].style.color = colorChip.green;
              } else {
                instance.typeDoms[i].style.color = colorChip.shadowWhite;
              }
            }
            instance.constructBlockInjection();
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(400),
        top: String(top) + ea,
        color: colorChip[i === typeNum ? "green" : "shadowWhite"],
      }
    });
    if (i !== textArr.length - 1) {
      nodeArr.push({
        mother: dashBoardBox,
        text: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
        style: {
          display: "inline-block",
          position: "relative",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          top: String(top) + ea,
          color: colorChip.gray5
        }
      });
    }
  }
  nodeArr.push({
    mother: dashBoardBox,
    text: 'D',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?mode=general");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(0) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });
  nodeArr.push({
    mother: dashBoardBox,
    text: 'C',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(18) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });

  nodeArr.push({
    mother: dashBoardBox,
    mode: "svg",
    source: this.mother.returnHamburger(colorChip.black),
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          instance.contentsSearchIndex = [];
          instance.constructBlockInjection();
        }
      }
    ],
    style: {
      position: "absolute",
      height: String(11) + ea,
      top: String(18) + ea,
      right: String(38) + ea,
    }
  });

  nodeArr = createNodes(nodeArr);
  instance.typeDoms = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i % 2 === 0) {
      instance.typeDoms.push(nodeArr[i]);
    }
  }
}

BuilderJs.prototype.constructSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  this.searchEvent = function (e) {
    let tempArr, orArr;
    if (e.key === "Enter") {
      instance.contentsSearchIndex = [];
      orArr = [];
      tempArr = this.value.trim().split(',');
      for (let value of tempArr) {
        if (value.trim() !== '' && value.trim() !== '.') {
          for (let dom of instance.contentsBlocks) {
            if ((new RegExp(value.trim(), "gi")).test(dom.textContent)) {
              orArr.push(Number(dom.getAttribute("index")));
            }
          }
        }
      }
      if (this.value.trim() !== '' && this.value.trim() !== '.') {
        for (let i = 0; i < length; i++) {
          if (!orArr.includes(i)) {
            instance.contentsSearchIndex.push(i);
          }
        }
      }
      instance.constructBlockInjection();
    }
  }
  input.addEventListener("keypress", this.searchEvent);
}

BuilderJs.prototype.constructExtractEvent = function () {
  const instance = this;
  const { ignoreNumbers, parentId, sheetName } = this;
  const { ajaxJson, blankHref } = GeneralJs;
  const { belowButtons: { sub: { extractIcon } } } = this.mother;

  extractIcon.addEventListener("click", async function (e) {
    try {
      const domTargets = instance.contentsBlocks.filter((dom) => {
        return (dom.id !== "title") && (dom.style.display !== "none");
      });
      const childrenTargets = domTargets.map((dom) => {
        let target = [ ...dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]);
        target.unshift(dom.children[1]);
        return target;
      });
      const newMake = true;
      let values, titleMatrix;
      let loading;

      values = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").textContent;
          } else {
            return dom.textContent;
          }
        });
      })

      titleMatrix = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").getAttribute("title");
          } else {
            return "이름";
          }
        });
      })

      if (titleMatrix.length > 0) {
        values.unshift(titleMatrix[0]);
        loading = instance.mother.grayLoading();
        const { link } = await ajaxJson({ values, newMake, parentId, sheetName }, "/sendSheets");
        loading.remove();
        blankHref(link);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

BuilderJs.prototype.constructReportEvent = function () {
  const instance = this;
  const { belowButtons: { square: { reportIcon } } } = this.mother;

  reportIcon.addEventListener("click", function (e) {
    if (document.getElementById("constructReport") === null) {
      instance.constructReportView();
    }
  });

}

BuilderJs.prototype.constructBlockMove = function () {
  const instance = this;
  const { ea } = this;
  const { belowButtons: { arrow: { left, right } } } = this.mother;
  const moveEvent = function (type = "left") {
    return function (e) {
      const blocks = instance.contentsBlocks;
      const movementAmount = 50;
      const ignoreNumbers = [ 1, 1 ];
      let children;
      let left;
      for (let block of blocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          left = Number(children[i].style.left.replace(/[^0-9\-\.]/gi, ''));
          left = left + (movementAmount * (type === "left" ? -1 : 1));
          children[i].style.left = String(left) + ea;
        }
      }
    }
  }
  left.addEventListener("click", moveEvent("left"));
  right.addEventListener("click", moveEvent("right"));
}

BuilderJs.prototype.constructReport = async function (from, to) {
  if (!(from instanceof Date) || !(to instanceof Date)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { projects } = this;
  const { ajaxJson, equalJson } = GeneralJs;
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
  try {
    const fromYear = from.getFullYear();
    const fromMonth = from.getMonth();
    const toYear = to.getFullYear();
    const toMonth = to.getMonth();
    let targets, tong;
    let menuSet, menuDetailSet;
    let thisPosition;
    let tempDate;
    let targetMatrixArr, targetMatrixArrFlat;
    let standardDateTo, standardDateFrom;
    let dateMatrix;
    let minDate, maxDate;
    let mongoRange;
    let copiedDate;
    let final, finalFactor;

    menuSet = {
      before: [
        "대기",
        "의뢰서 작성중",
        "견적 확인중",
        "견적 안내",
        "확인 필요",
        "확인 요청",
      ],
      drop: [
        "드랍",
        "해당 없음",
      ],
      progress: [],
    };
    menuDetailSet = {
      client: [
        "고객 진행",
        "고객 완료",
      ],
      designer: [
        "디자이너 진행",
        "수수료 요청",
        "AS 진행중",
        "디자이너 완료"
      ],
      homeliaison: []
    };

    targets = projects.toNormal();

    tong = [];
    for (let project of targets) {
      if (project.process.contract.first.date.valueOf() > emptyDateValue) {
        thisPosition = "";
        if (menuSet.before.includes(project.process.design.construct.status)) {
          thisPosition = "before";
        } else if (menuSet.drop.includes(project.process.design.construct.status)) {
          thisPosition = "drop";
        } else {
          if (menuDetailSet.client.includes(project.process.design.construct.status)) {
            thisPosition = "progress.client";
          } else if (menuDetailSet.designer.includes(project.process.design.construct.status)) {
            thisPosition = "progress.designer";
          } else {
            thisPosition = "progress.homeliaison";
          }
        }

        tong.push({
          proid: project.proid,
          cliid: project.cliid,
          desid: project.desid,
          status: thisPosition,
          request: project.process.design.construct.request,
          estimate: project.process.design.construct.estimate,
          contract: project.process.contract.first.date,
          start: project.process.contract.form.date.from
        });
      }
    }

    standardDateFrom = new Date(fromYear, fromMonth, 1);
    standardDateTo = new Date(toYear, toMonth, 25);

    dateMatrix = GeneralJs.getDateMatrix();
    tempDate = new Date(dateMatrix.year, dateMatrix.month, 15);

    targetMatrixArr = [];
    do {
      if (tempDate.valueOf() < standardDateTo.valueOf() && tempDate.valueOf() > standardDateFrom.valueOf()) {
        targetMatrixArr.push(dateMatrix.nextMatrix().previousMatrix());
      }
      dateMatrix = dateMatrix.previousMatrix();
      tempDate = new Date(dateMatrix.year, dateMatrix.month, 15);
    } while (tempDate.valueOf() > standardDateFrom.valueOf());


    for (let obj of targetMatrixArr) {
      obj.startEnd = obj.matrix.map((arr) => {
        let obj2 = {};
        obj2.start = arr.find((obj) => { return obj !== null; });
        obj2.end = arr.reverse().find((obj) => { return obj !== null; });
        return obj2;
      })
    }

    targetMatrixArrFlat = targetMatrixArr.map((obj) => { return obj.startEnd }).flat().map((obj) => {
      let obj2 = {};
      obj2.from = obj.start.dateObject;
      obj.end.dateObject.setDate(obj.end.dateObject.getDate() + 1);
      obj2.to = obj.end.dateObject;
      return obj2;
    });
    targetMatrixArrFlat.sort((a, b) => { return b.to.valueOf() - a.to.valueOf() });

    for (let obj of targetMatrixArrFlat) {
      obj.children = [];
      for (let obj2 of tong) {
        if (obj.from.valueOf() <= obj2.start.valueOf() && obj2.start.valueOf() < obj.to.valueOf()) {
          obj.children.push(equalJson(JSON.stringify(obj2)));
        }
      }
    }

    for (let obj of targetMatrixArrFlat) {
      obj.report = {};
      obj.report.total = obj.children.map(o => o).map((o) => { return o.proid });
      obj.report.before = obj.children.filter((o) => {
        return /before/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.progress = obj.children.filter((o) => {
        return /progress/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with = {};
      obj.report.with.homeliaison = obj.children.filter((o) => {
        return /progress\.homeliaison/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with.designer = obj.children.filter((o) => {
        return /progress\.designer/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.with.client = obj.children.filter((o) => {
        return /progress\.client/gi.test(o.status);
      }).map((o) => { return o.proid; });
      obj.report.request = obj.children.filter((o) => {
        return o.request.valueOf() > emptyDateValue;
      }).map((o) => { return o.proid; });
      obj.report.estimate = obj.children.filter((o) => {
        return o.estimate.length > 0;
      }).map((o) => { return o.proid; });

      obj.numbers = {};
      obj.numbers.total = obj.report.total.length;
      obj.numbers.before = obj.report.before.length;
      obj.numbers.progress = obj.report.progress.length;
      obj.numbers.with = {};
      obj.numbers.with.homeliaison = obj.report.with.homeliaison.length;
      obj.numbers.with.designer = obj.report.with.designer.length;
      obj.numbers.with.client = obj.report.with.client.length;
      obj.numbers.request = obj.report.request.length;
      obj.numbers.estimate = obj.report.estimate.length;
    }

    minDate = targetMatrixArrFlat[targetMatrixArrFlat.length - 1].from;
    maxDate = targetMatrixArrFlat[0].from;

    copiedDate = new Date(JSON.stringify(minDate).slice(1, -1));

    mongoRange = 0;
    while (copiedDate.valueOf() < maxDate.valueOf()) {
      mongoRange = mongoRange + 1;
      copiedDate.setMonth(copiedDate.getMonth() + 1);
    }

    final = [];
    for (let i = 0; i < mongoRange; i++) {
      copiedDate = new Date(JSON.stringify(minDate).slice(1, -1));
      copiedDate.setMonth(copiedDate.getMonth() + i);
      final.unshift({
        year: copiedDate.getFullYear(),
        month: copiedDate.getMonth(),
        children: []
      });
    }

    for (let z of final) {
      for (let obj of targetMatrixArrFlat) {
        if (obj.from.getFullYear() === z.year && obj.from.getMonth() === z.month) {
          z.children.push(equalJson(JSON.stringify(obj)));
        }
      }
    }

    for (let obj of targetMatrixArrFlat) {
      obj.from.getFullYear()
      obj.from.getMonth()
    }

    return final;

  } catch (e) {
    console.log(e);
    return null;
  }
}

BuilderJs.prototype.constructReportView = function () {
  const instance = this;
  const { ea, projects, belowHeight, totalContents } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const today = new Date();
  const ago = new Date();
  const zeroAddition = num => (num < 10 ? `0${String(num)}` : String(num));
  let margin;
  let heightVisual;
  let whiteBox, cancelBack;
  let searchArea, dataArea;
  let searchAreaHeight;
  let searchAreaPaddingTop;
  let innerMargin;
  let inputWidth;
  let inputHeight;
  let inputSize;
  let searchInput;
  let subSumSize;
  let subSumRight;
  let subSumTop;
  let subSum;
  let reload;

  margin = 30;
  heightVisual = 10;

  innerMargin = 36;
  searchAreaHeight = 88;
  searchAreaPaddingTop = isMac() ? 42 : 47;
  inputWidth = 500;
  inputHeight = 30;
  inputSize = 29;

  subSumSize = 15;
  subSumRight = 1;
  subSumTop = 56;

  dataArea = {};
  subSum = {};

  ago.setMonth(ago.getMonth() - 6);
  this.constructReport(ago, today).then((data) => {

    // total
    cancelBack = createNode({
      mother: totalContents,
      event: {
        click: function (e) {
          totalContents.removeChild(totalContents.lastChild);
          totalContents.removeChild(totalContents.lastChild);
        }
      },
      style: {
        position: "fixed",
        background: colorChip.cancelBlack,
        animation: "justfadein 0.3s ease forwards",
        zIndex: String(2),
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: withOut(belowHeight, ea),
      }
    });
    whiteBox = createNode({
      mother: totalContents,
      id: "constructReport",
      style: {
        position: "fixed",
        background: colorChip.white,
        top: String(margin) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        width: withOut(margin * 2, ea),
        height: withOut(belowHeight + (margin * 2) + heightVisual, ea),
        zIndex: String(2),
        animation: "fadeup 0.3s ease forwards",
      }
    });

    reload = (strValue) => {
      const arr = strValue.split(" ~ ").map((s) => { return s.trim(); });
      const fromArr = arr[0].split('-').map((s) => { return s.trim(); }).map((s) => { return Number(s); });
      const toArr = arr[1].split('-').map((s) => { return s.trim(); }).map((s) => { return Number(s); });
      const from = new Date(fromArr[0], fromArr[1] - 1, 1);
      const to = new Date(toArr[0], toArr[1] - 1, 1);

      instance.constructReport(from, to).then((data) => {
        instance.constructReportBoxRender(dataArea, data, subSum);
      }).catch((err) => {
        console.log(err);
      });
    }

    // search bar area
    searchArea = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(innerMargin) + ea,
        width: withOut(innerMargin * 2, ea),
        height: String(searchAreaHeight - searchAreaPaddingTop) + ea,
        paddingTop: String(searchAreaPaddingTop) + ea,
      }
    });

    searchInput = createNode({
      mother: searchArea,
      event: {
        focus: function (e) {
          this.setAttribute("pastvalue", this.getAttribute("value"));
          this.style.color = colorChip.green;
        },
        keypress: function (e) {
          if (e.key === "Enter") {
            if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9] ~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]$/.test(this.value)) {
              this.value = this.getAttribute("pastvalue");
            } else {
              reload(this.value);
            }
            this.blur();
            this.style.color = colorChip.black;
          }
        },
        blur: function (e) {
          if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9] ~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]$/.test(this.value)) {
            this.value = this.getAttribute("pastvalue");
          } else {
            reload(this.value);
          }
          this.style.color = colorChip.black;
        }
      },
      mode: "input",
      attribute: {
        type: "text"
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(inputWidth) + ea,
        height: String(inputHeight) + ea,
        fontSize: String(inputSize) + ea,
        fontWeight: String(200),
        border: String(0) + ea,
        outline: String(0) + ea,
        color: colorChip.black,
        transition: "all 0.5s ease",
      }
    });

    searchInput.value = dateToString(ago).slice(0, 7) + " ~ " + dateToString(today).slice(0, 7);

    subSum = createNode({
      mother: searchArea,
      text: "문의 문의 문의 100명",
      style: {
        position: "absolute",
        fontSize: String(subSumSize) + ea,
        fontWeight: String(500) + ea,
        right: String(subSumRight) + ea,
        top: String(subSumTop) + ea,
        color: colorChip.black,
      }
    });

    // data area
    dataArea = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(innerMargin) + ea,
        width: withOut(innerMargin, ea),
        height: withOut(searchAreaHeight, ea),
        overflow: "scroll",
      }
    });

    instance.constructReportBoxRender(dataArea, data, subSum);

  }).catch((err) => {
    console.log(err);
  });
}

BuilderJs.prototype.constructReportBoxRender = function (dataArea, data, subSum) {
  const instance = this;
  const { ea, projects, belowHeight, totalContents } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, cleanChildren } = GeneralJs;
  const zeroAddition = num => (num < 10 ? `0${String(num)}` : String(num));
  let margin, innerMargin;
  let boxNumber, boxHeight, boxWidth, boxMargin;
  let grayBoxPaddingLeft;
  let grayBoxPaddingTop;
  let yearMonthBoxHeight;
  let yearMonthBoxSize;
  let yearMonthBoxPadding;
  let titleLineBottom;
  let titleLineMarginBottom;
  let table, block;
  let blockHeight, blockSize;
  let columns;
  let blockTextTop;
  let values;
  let sumBox;
  let sumBoxBottom;
  let sumSize;
  let sumText, sumArr;
  let sumVisual;
  let proidMatrix;
  let valuesTarget;
  let ratioSuccess, ratioHomeliaison;
  let ratioSuccessWording, ratioHomeliaisonWording;
  let totalMatrix, totalArr;
  let tempNumber;
  let totalSumText;

  margin = 30;
  innerMargin = 36;

  boxMargin = 18;
  boxNumber = Math.floor((window.innerWidth - (boxMargin * 5)) / (boxMargin + 400));
  boxHeight = 400;
  boxWidth = ((window.innerWidth - (margin * 2)) - (boxMargin * (boxNumber - 1)) - (innerMargin * 2)) / boxNumber;
  grayBoxPaddingTop = 18;
  grayBoxPaddingLeft = 24;

  yearMonthBoxHeight = 28;
  yearMonthBoxSize = 20;
  yearMonthBoxPadding = 12;

  titleLineBottom = 14;
  titleLineMarginBottom = 12;

  blockHeight = 36;
  blockSize = 14;
  blockTextTop = -1;

  sumBoxBottom = 25;
  sumSize = 16;
  sumVisual = 1;

  columns = [
    "",
    "대기",
    "견적",
    "진행",
    "HL",
    "DE",
    "CL"
  ];

  ratioSuccessWording = "견적 성공률";
  ratioHomeliaisonWording = "HL 진행율";

  cleanChildren(dataArea);

  totalMatrix = [];
  for (let obj of data) {

    // total table
    table = createNode({
      mother: dataArea,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(boxWidth - (grayBoxPaddingLeft * 2)) + ea,
        height: String(boxHeight - grayBoxPaddingTop) + ea,
        overflow: "scroll",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        background: colorChip.gray0,
        borderRadius: String(5) + "px",
        paddingTop: String(grayBoxPaddingTop) + ea,
        paddingLeft: String(grayBoxPaddingLeft) + ea,
        paddingRight: String(grayBoxPaddingLeft) + ea,
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            width: String(100) + '%',
            height: String(yearMonthBoxHeight) + ea,
            position: "relative",
            marginBottom: String(titleLineMarginBottom) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(0),
                left: String(0) + ea,
                width: withOut(0, ea),
                height: String(titleLineBottom) + ea,
                borderBottom: "1px solid " + colorChip.gray3,
              }
            },
            {
              text: String(obj.year) + "-" + zeroAddition(obj.month + 1),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(yearMonthBoxSize) + ea,
                fontWeight: String(200),
                background: colorChip.gray0,
                paddingRight: String(yearMonthBoxPadding) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "block",
            width: String(100) + '%',
            position: "relative",
            border: "1px solid " + colorChip.gray4,
            boxSizing: "border-box",
            borderRadius: String(5) + "px",
            overflow: "hidden",
          }
        }
      ]
    }).children[1];

    // title set
    block = createNode({
      mother: table,
      style: {
        display: "flex",
        width: String(100) + '%',
        flexDirection: "row",
        height: String(blockHeight) + ea,
        background: colorChip.white,
        boxSizing: "border-box",
        borderBottom: "1px solid " + colorChip.gray2,
      }
    });
    for (let i = 0; i < columns.length; i++) {
      createNode({
        mother: block,
        style: {
          display: "inline-flex",
          flexShrink: String(1),
          borderRight: i === columns.length - 1 ? "" : "1px solid " + colorChip.gray2,
          boxSizing: "border-box",
          width: String(100) + '%',
          height: String(100) + '%',
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            text: columns[i],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(blockSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              top: String(blockTextTop) + ea,
            }
          }
        ]
      });
    }

    // value set
    sumArr = [];
    for (let i = 0; i < obj.children.length; i++) {

      values = [
        [ i + 1, [] ],
        [ obj.children[i].numbers.before, obj.children[i].report.before ],
        [ obj.children[i].numbers.estimate, obj.children[i].report.estimate ],
        [ obj.children[i].numbers.progress, obj.children[i].report.progress ],
        [ obj.children[i].numbers.with.homeliaison, obj.children[i].report.with.homeliaison ],
        [ obj.children[i].numbers.with.designer, obj.children[i].report.with.designer ],
        [ obj.children[i].numbers.with.client, obj.children[i].report.with.client ],
      ];
      sumArr.push(values);

      block = createNode({
        mother: table,
        style: {
          display: "flex",
          width: String(100) + '%',
          flexDirection: "row",
          height: String(blockHeight) + ea,
          boxSizing: "border-box",
          borderBottom: "1px solid " + colorChip.gray2,
        }
      });
      for (let i = 0; i < values.length; i++) {
        createNode({
          mother: block,
          attribute: {
            proid: JSON.stringify(values[i][1])
          },
          event: {
            click: function (e) {
              const proidArr = JSON.parse(this.getAttribute("proid"));
              if (proidArr.length > 0) {
                GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?" + "specificids=" + proidArr.join(","));
              }
            }
          },
          style: {
            display: "inline-flex",
            flexShrink: String(1),
            borderRight: i === values.length - 1 ? "" : "1px solid " + colorChip.gray2,
            boxSizing: "border-box",
            width: String(100) + '%',
            height: String(100) + '%',
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          },
          children: [
            {
              attribute: {
                proid: JSON.stringify(values[i][1])
              },
              text: String(values[i][0]),
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(blockSize) + ea,
                fontWeight: String(i === 0 ? 600 : 300),
                color: colorChip.black,
                top: String(blockTextTop) + ea,
              }
            }
          ]
        })
      }

    }

    // sum set

    sumText = '';
    proidMatrix = [];
    totalArr = [];
    for (let i = 1; i < columns.length; i++) {
      proidMatrix.push(sumArr.map((matrix) => {
        return matrix[i][1];
      }).reduce((acc, curr) => {
        return acc.concat(curr);
      }, []));

      sumText += columns[i];
      sumText += " <b%";
      tempNumber = sumArr.map((matrix) => {
        return matrix[i][0];
      }).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      sumText += String(tempNumber);
      if (i === columns.length - 1) {
        sumText += "%b>명";
      } else {
        sumText += "%b>명&nbsp;&nbsp;&nbsp;";
      }
      totalArr.push(tempNumber);
    }
    totalMatrix.push(totalArr);

    sumBox = createNode({
      mother: table.parentNode,
      text: sumText,
      style: {
        position: "absolute",
        width: withOut((grayBoxPaddingLeft + sumVisual) * 2, ea),
        left: String(grayBoxPaddingLeft + sumVisual) + ea,
        bottom: String(sumBoxBottom) + ea,
        fontSize: String(sumSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        textAlign: "right",
        lineHeight: String(1.6),
      },
      bold: {
        fontSize: String(sumSize) + ea,
        fontWeight: String(300),
        color: colorChip.green,
      }
    });

    valuesTarget = sumBox.querySelectorAll("b");
    for (let i = 0; i < valuesTarget.length; i++) {
      valuesTarget[i].setAttribute("proid", JSON.stringify(proidMatrix[i]));
      valuesTarget[i].addEventListener("click", function (e) {
        const proidArr = JSON.parse(this.getAttribute("proid"));
        if (proidArr.length > 0) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?" + "specificids=" + proidArr.join(","));
        }
      });
    }

    if (Number(valuesTarget[1].textContent.replace(/[^0-9]/gi, '')) === 0) {
      ratioSuccess = 0;
    } else {
      ratioSuccess = Math.round(100 * (Number(valuesTarget[3].textContent.replace(/[^0-9]/gi, '')) / Number(valuesTarget[1].textContent.replace(/[^0-9]/gi, ''))));
    }

    if (Number(valuesTarget[2].textContent.replace(/[^0-9]/gi, '')) === 0) {
      ratioHomeliaison = 0;
    } else {
      ratioHomeliaison = Math.round(100 * (Number(valuesTarget[3].textContent.replace(/[^0-9]/gi, '')) / Number(valuesTarget[2].textContent.replace(/[^0-9]/gi, ''))));
    }

    sumBox.insertAdjacentHTML(`beforeend`, `<br>${ratioSuccessWording} <b style="font-weight:300;color:${colorChip.green}">${String(ratioSuccess)}</b>%&nbsp;&nbsp;&nbsp;${ratioHomeliaisonWording} <b style="font-weight:300;color:${colorChip.green}">${String(ratioHomeliaison)}</b>%`);

  }

  columns.filter((str) => { return str !== '' }).fill(0, 0)

  totalMatrix = totalMatrix.reduce((acc, curr) => {
    for (let i = 0; i < acc.length; i++) {
      acc[i] += curr[i];
    }
    return acc;
  }, columns.filter((str) => { return str !== '' }).fill(0, 0));

  totalSumText = "";
  for (let i = 1; i < columns.length; i++) {
    totalSumText += columns[i];
    totalSumText += ' <b style="font-weight:300;color:' + colorChip.green + '">';
    totalSumText += String(totalMatrix[i - 1]);
    if (i === columns.length - 1) {
      totalSumText += "</b>명";
    } else {
      totalSumText += "</b>명&nbsp;&nbsp;&nbsp;";
    }
  }

  subSum.textContent = '';
  subSum.insertAdjacentHTML(`beforeend`, totalSumText);

}

BuilderJs.prototype.constructView = async function () {
  const instance = this;
  try {
    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }
    const { createNodes, colorChip, ajaxJson, ajaxMultiple, returnGet, equalJson, sleep, uniqueValue } = GeneralJs;
    const todayDateValue = (new Date()).valueOf();
    let loading;
    let projects;
    let designers, desidArr_raw, desidArr;
    let clients, cliidArr_raw, cliidArr;
    let contents;
    let type, typeArr;
    let projectHistory;
    let proidArr;
    let whereQuery;
    let client;
    let requestNumber;
    let builders, builderNames;
    let matrix;

    loading = await this.mother.loadingRun();

    typeArr = [ "construct", "payment" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.parentId = "1lmed8VkFcNFkSdSj4RoT3dYpqLbHU1ps";
    this.sheetName = "fromDB_construct_" + uniqueValue("string");
    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;
    this.localStorageConst = "constructFilter_";
    this.blockMapConst = "blockMap_";

    for (let t of typeArr) {
      window.localStorage.removeItem(this.localStorageConst + this.blockMapConst + t);
      for (let i = 0; i < 20; i++) {
        window.localStorage.removeItem(this.localStorageConst + t + String(i));
      }
    }

    whereQuery = {
      $and: [
        {
          desid: {
            $regex: "^d"
          }
        },
        {
          "process.status": {
            $regex: "^[진홀완]"
          }
        },
        {
          "process.design.construct": {
            $ne: null
          }
        }
      ]
    };
    projects = new SearchArray(await ajaxJson({ noFlat: true, whereQuery }, BACKHOST + "/getProjects", { equal: true }));
    matrix = await ajaxMultiple([
      [ { noFlat: true, whereQuery: { $or: projects.toNormal().map((obj) => { return { desid: obj.desid } }) } }, BACKHOST + "/getDesigners" ],
      [ { noFlat: true, whereQuery: { $or: projects.toNormal().map((obj) => { return { cliid: obj.cliid } }) } }, BACKHOST + "/getClients" ],
      [ { idArr: projects.toNormal().map((obj) => { return obj.proid }), method: "project", property: "construct", }, BACKHOST + "/getHistoryProperty" ],
      [ { noFlat: true, whereQuery: {} }, BACKHOST + "/getBuilders" ],
    ]);

    designers = new SearchArray(matrix[0]);
    clients = new SearchArray(matrix[1]);
    projectHistory = matrix[2];
    builders = matrix[3];

    for (let p of projects) {
      p.designer = designers.search("desid", p.desid).designer;
      client = clients.search("cliid", p.cliid);
      p.name = client.name;
      p.phone = client.phone;
      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (p.proposal.date.valueOf() >= client.requests[i].request.timeline.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      p.address = client.requests[requestNumber].request.space.address;
      p.title = `${p.name} <b style="color:${colorChip.green}">C</b>&nbsp;&nbsp;${p.designer} <b style="color:${colorChip.green}">D</b>`;
      p.history = projectHistory[p.proid];
    }

    builderNames = builders.map((obj) => {
      if (obj.information.business.company.trim() === '') {
        return obj.builder;
      } else {
        return obj.builder + "_" + obj.information.business.company;
      }
    });

    builderNames.push("고객");
    builderNames.push("디자이너");
    builderNames.push("-");

    this.builders = builders;
    this.builderNames = builderNames;
    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    loading.parentNode.removeChild(loading);

    this.constructBase();
    this.constructSearchEvent();
    this.constructBlockMove();
    this.constructExtractEvent();
    this.constructReportEvent();

    if (returnGet().proid !== undefined) {
      this.searchEvent.call({
        value: returnGet().proid
      }, {
        key: "Enter"
      })
    }

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.navigatorLaunching = function () {
  const instance = this;
  const { ea, media, grayBarWidth, tabletWidth, totalContents, totalMother, motherHeight, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, scrollTo, setQueue, downloadFile } = GeneralJs;
  const mother = totalMother.nextElementSibling;
  const mobile = media[4];
  const desktop = !mobile;
  const menuClassName = "leftMenus";
  let margin;
  let size;
  let barHeight;
  let marginBottom;
  let indent;
  let menu;
  let menuMargin;
  let secondBold;
  let boxPadding;
  let boxWidth;
  let factorHeight;
  let factorSize;
  let factorTextTop;
  let naviHeight;
  let mobileNavigator;
  let style;
  let fontTop;
  let fontLeft;
  let naviBuilderWidth;
  let naviBetweenMargin;
  let iconTop;
  let iconWidth;
  let iconIndent;
  let popupTop;
  let menuOnEvent;
  let titleSize;
  let radius;
  let left;
  let left2;
  let bottom;
  let color;
  let idNameHeight;
  let idNameBottom, idNameLeft0, idNameLeft1;
  let listFontSize;
  let scrollTongPaddingTop;
  let scrollTong;
  let valueLeft0, valueLeft1;
  let valueMarginBottom;
  let blocks, tempDom;

  if (desktop) {

    listFontSize = 14;
    idNameHeight = 71;
    idNameBottom = 13;
    idNameLeft0 = 57;
    idNameLeft1 = 141;
    scrollTongPaddingTop = 17;

    valueLeft0 = 38;
    valueLeft1 = 135;
    valueMarginBottom = 17;

    createNode({
      mother,
      style: {
        display: "block",
        position: "relative",
        top: String(0),
        left: String(0),
        background: colorChip.gray0,
        width: String(100) + '%',
        height: String(idNameHeight) + ea,
        borderBottom: "1px dashed " + colorChip.gray3,
        boxSizing: "border-box",
      },
      children: [
        {
          text: "아이디",
          style: {
            position: "absolute",
            fontSize: String(listFontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            bottom: String(idNameBottom) + ea,
            left: String(idNameLeft0) + ea,
          }
        },
        {
          text: "성함",
          style: {
            position: "absolute",
            fontSize: String(listFontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            bottom: String(idNameBottom) + ea,
            left: String(idNameLeft1) + ea,
          }
        },
      ]
    });

    scrollTong = createNode({
      mother,
      style: {
        display: "block",
        width: String(100) + '%',
        paddingTop: String(scrollTongPaddingTop) + ea,
        height: withOut(idNameHeight + scrollTongPaddingTop, ea),
        overflow: "scroll",
      }
    });

    blocks = [];
    for (let { buiid, builder } of this.builders) {
      tempDom = createNode({
        mother: scrollTong,
        attribute: { buiid },
        event: {
          click: function (e) {
            const buiid = this.getAttribute("buiid");
            for (let dom of blocks) {
              if (dom.getAttribute("buiid") === buiid) {
                dom.children[0].style.color = colorChip.green;
                dom.children[1].style.color = colorChip.green;
              } else {
                dom.children[0].style.color = colorChip.black;
                dom.children[1].style.color = colorChip.black;
              }
            }
            instance.listDetailLaunching(buiid);
          }
        },
        style: {
          display: "block",
          position: "relative",
          width: withOut(valueLeft0, ea),
          paddingLeft: String(valueLeft0) + ea,
          marginBottom: String(valueMarginBottom) + ea,
          cursor: "pointer",
        },
        children: [
          {
            text: buiid,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(listFontSize) + ea,
              fontWeight: String(600),
              color: this.buiid === buiid ? colorChip.green : colorChip.black,
              bottom: String(0) + ea,
            }
          },
          {
            text: builder,
            style: {
              position: "absolute",
              fontSize: String(listFontSize) + ea,
              fontWeight: String(600),
              color: this.buiid === buiid ? colorChip.green : colorChip.black,
              top: String(0) + ea,
              left: String(valueLeft1) + ea,
            }
          },
        ]
      });
      blocks.push(tempDom);
    }

  } else {
    mother.style.display = "none";
  }

}

BuilderJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let totalMother, leftPannel;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      height: "calc(100% - " + String(belowHeight) + ea + ")"
    }
  });

  this.totalMother = totalMother;

  leftPannel = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      left: String(0),
      top: String(0),
      width: String(grayBarWidth) + ea,
      height: withOut(belowHeight, ea),
      background: colorChip.gray0,
    }
  });

  this.navigatorLaunching();

  this.searchInput.focus();
}

BuilderJs.prototype.listDetailLaunching = function (buiid) {
  const instance = this;
  const { ea, totalMother } = this;
  const { scrollTo, sleep, cleanChildren, ajaxJson } = GeneralJs;
  class SearchArray extends Array {
    constructor(arr) {
      super();
      for (let i of arr) {
        this.push(i);
      }
    }
    search(target, value) {
      let obj = null;
      for (let i of this) {
        if (i[target] === value) {
          obj = i;
        }
      }
      return obj;
    }
  }
  let loading, pastScrollTop;
  let proidArr;
  let desidArr;
  let cliidArr;

  cleanChildren(totalMother);

  pastScrollTop = totalMother.scrollTop;
  this.buiid = buiid;
  this.builder = this.builders.search("buiid", buiid);
  this.invid = null;

  this.mother.loadingRun().then((dom) => {
    loading = dom;

    return ajaxJson({
      mode: "read",
      collection: "constructInvoice",
      db: "python",
      whereQuery: { "links.buiid": buiid }
    }, PYTHONHOST + "/generalMongo", { equal: true });

  }).then((invoiceList) => {

    instance.invoiceList = new SearchArray(invoiceList);

    proidArr = [];
    desidArr = [];
    cliidArr = [];
    for (let invoice of invoiceList) {
      proidArr.push({ proid: invoice.links.proid });
      desidArr.push({ desid: invoice.links.desid });
      cliidArr.push({ cliid: invoice.links.cliid });
    }

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: proidArr } }, "/getProjects", { equal: true });
    } else {
      return [];
    }

  }).then((projects) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.project = (new SearchArray(projects)).search("proid", invoice.links.proid);
    }

  }).then(() => {

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: desidArr } }, "/getDesigners", { equal: true });
    } else {
      return [];
    }

  }).then((designers) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.designer = (new SearchArray(designers)).search("desid", invoice.links.desid);
    }

  }).then(() => {

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: cliidArr } }, "/getClients", { equal: true });
    } else {
      return [];
    }

  }).then((clients) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.client = (new SearchArray(clients)).search("cliid", invoice.links.cliid);
    }

  }).then(() => {
    loading.parentNode.removeChild(loading);
    instance.estimationList(buiid);
    scrollTo(totalMother, pastScrollTop);
  }).catch((err) => {
    console.log(err);
  });
}

BuilderJs.prototype.estimationList = function (buiid = '') {
  const instance = this;
  const { totalMother, ea, grayBarWidth, invoiceList } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, downloadFile, setQueue, cleanChildren, ajaxForm, uniqueValue, equalJson } = GeneralJs;
  const mobile = this.media[4];
  const desktop = !mobile;
  const wording = `+ 버튼을 눌러 견적서를 추가하거나, <b%샘플 파일%b>로 작업한 엑셀 파일을 + 버튼으로 드래그 앤 드롭해 견적서를 추가하세요.`;
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
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
  let textAreaTop;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let boxNumber, boxNumberArr;
  let requestBox, boxMargin;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;
  let dateString;
  let baseTongPaddingBottom;
  let mobileOuterMargin;
  let borderRadius;
  let secondFont;
  let plusBarHeight, plusHeight;
  let noticeSize, noticeTextTop;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = invoiceList.length;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;
  noticeSize = <%% 15, 15, 15, 14, 4 %%>;
  noticeTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  boxMargin = <%% 13, 13, 12, 10, 2 %%>;

  requestSize = <%% 18, 18, 17, 16, 4.4 %%>;
  secondFont = <%% 2, 2, 2, 2, 1 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0 %%>;
  requestWordPaddingTop = <%% (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), 4.8 %%>;
  requestWordPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 4.6 %%>;

  baseTongPaddingBottom = <%% 4, 4, 3, 3, 20 %%>;
  mobileOuterMargin = 4;

  borderRadius = <%% 10, 10, 10, 10, 8 %%>;

  plusBarHeight = <%% 76, 76, 75, 75, 10 %%>;
  plusHeight = <%% 20, 20, 20, 16, 4 %%>;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : String(0),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: withOut((desktop ? margin * 3 : 0) * 2, ea),
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: withOut(0, ea),
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: withOut((plusBarHeight + margin) * 2, ea),
      overflow: "scroll",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      paddingLeft: String(boxMargin * 1.5) + ea,
      paddingRight: String(boxMargin * 0.5) + ea,
      paddingTop: String(boxMargin * 1.5) + ea,
    }
  });

  this.estimationBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    dateString = zeroAddition(invoiceList[i].date.getFullYear()) + '.' + zeroAddition(invoiceList[i].date.getMonth() + 1) + '.' + zeroAddition(invoiceList[i].date.getDate());

    requestBox = createNode({
      mother: baseTong,
      attribute: {
        invid: invoiceList[i].invid,
        proid: invoiceList[i].links.proid,
        desid: invoiceList[i].links.desid,
        cliid: invoiceList[i].links.cliid,
      },
      event: {
        click: function (e) {
          instance.estimationDetailLaunching(this.getAttribute("invid"), false);
        },
        mouseenter: function (e) {
          this.style.transition = "";
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          if (desktop) {
            this.children[0].style.background = colorChip.gray3;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        cursor: "pointer",
        transition: "all 0s ease",
        transform: "translateY(0px)",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            width: String(100) + '%',
            left: String(0),
            height: String(desktop ? borderRadius : 2) + ea,
            background: colorChip.gray3,
            borderTopRightRadius: String(borderRadius / 2) + "px",
            borderTopLeftRadius: String(borderRadius / 2) + "px",
          }
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: invoiceList[i].links.client.name + " <b%고객님%b>",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              },
              bold: {
                color: colorChip.black,
                fontWeight: String(300),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
          },
          children: [
            {
              text: dateString,
              style: {
                fontSize: String(requestSize - secondFont) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let i = 1; i < Array.from(requestBox.children).length; i++) {
      if (thisChildWidth <= requestBox.children[i].firstChild.getBoundingClientRect().width) {
        thisChildWidth = requestBox.children[i].firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    if (desktop) {
      boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));
      boxNumberArr.push(boxNumber);
    }

    this.estimationBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.estimationBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
      }
    }
  }

  createNode({
    mother: baseTong0,
    event: {
      click: async function (e) {
        e.stopPropagation();
        try {
          const self = this;
          let fileInput;
          fileInput = createNode({
            mother: this,
            mode: "input",
            event: {
              click: (e) => { e.stopPropagation(); },
              change: async function (e) {
                try {
                  const [ file ] = [ ...this.files ];
                  await instance.fileAddition(file, self, e);
                } catch (e) {
                  window.location.reload();
                }
              },
            },
            attribute: {
              type: "file",
            },
            style: {
              display: "none",
            }
          });
          fileInput.click();
        } catch (e) {
          window.location.reload();
        }
      },
      mouseenter: function (e) {
        this.style.transition = "";
        this.style.background = colorChip.green;
        this.querySelector("path").setAttribute("fill", colorChip.white);
      },
      mouseleave: function (e) {
        this.style.background = desktop ? colorChip.gray0 : colorChip.gray1;
        this.querySelector("path").setAttribute("fill", colorChip.gray5);
      },
      dragover: (e) => { e.preventDefault(); },
      dragenter: (e) => { e.preventDefault(); },
      dragleave: (e) => { e.preventDefault(); },
      drop: async function (e) {
        e.preventDefault();
        try {
          const [ file ] = [ ...e.dataTransfer.files ];
          await instance.fileAddition(file, this, e);
        } catch (e) {
          window.location.reload();
        }
      }
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      cursor: "pointer",
    },
    children: [
      {
        mode: "svg",
        source: this.mother.returnAddition(colorChip.gray5),
        style: {
          width: String(plusHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: baseTong0,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(0) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    },
    children: [
      {
        text: wording,
        event: {
          click: function (e) {
            if (e.target.nodeName === 'B' || e.target.nodeName === 'b') {
              downloadFile(instance.sampleFile).catch((err) => {
                console.log(err);
              });
            }
          }
        },
        style: {
          position: "relative",
          fontSize: String(noticeSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(noticeTextTop) + ea,
        },
        bold: {
          fontSize: String(noticeSize) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          cursor: "pointer",
        }
      }
    ]
  });

  this.mainBaseTong = baseTong0;
  this.addSearchEvent();
}

BuilderJs.prototype.estimationDetailLaunching = function (invid, fastMode = false, requestNumber = null) {
  const instance = this;
  const { ea, belowHeight, totalMother, mainBaseTong, invoiceList } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, setQueue } = GeneralJs;
  const invoice = invoiceList.search("invid", invid);

  if (fastMode) {

    const newMainBase = mainBaseTong.cloneNode(false);
    let top;

    mainBaseTong.style.opacity = String(0);
    top = Number(newMainBase.style.top.replace(/[^0-9]/gi, ''));

    newMainBase.style.animation = "";
    newMainBase.style.opacity = String(1);
    newMainBase.style.background = colorChip.white;
    newMainBase.style.height = "calc(100% - " + String(top * 2) + ea + ")";
    newMainBase.style.borderRadius = String(5) + "px";
    newMainBase.style.boxShadow = "0px 3px 14px -9px " + colorChip.shadow;

    totalMother.style.overflow = "visible";

    this.newMainBase = newMainBase;
    totalMother.appendChild(newMainBase);
    this.estimationDocument(newMainBase, invoice, requestNumber);

  } else {
    mainBaseTong.style.animation = "fadedownlite 0.3s ease forwards";

    setQueue(() => {
      const newMainBase = mainBaseTong.cloneNode(false);
      let top;

      mainBaseTong.style.opacity = String(0);
      top = Number(newMainBase.style.top.replace(/[^0-9]/gi, ''));

      newMainBase.style.animation = "fadeuplite 0.3s ease forwards";
      newMainBase.style.background = colorChip.white;
      newMainBase.style.height = "calc(100% - " + String(top * 2) + ea + ")";
      newMainBase.style.borderRadius = String(5) + "px";
      newMainBase.style.boxShadow = "0px 3px 14px -9px " + colorChip.shadow;

      totalMother.style.overflow = "visible";

      instance.newMainBase = newMainBase;
      instance.mainCancleBase = createNode({
        mother: totalMother,
        event: {
          click: function (e) {
            instance.estimationBackward();
          }
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: "calc(100% + " + String(instance.belowHeight) + ea + ")",
          background: colorChip.gray3,
          animation: "justfadeinoriginal 0.3s ease forwards",
        }
      });
      totalMother.appendChild(newMainBase);
      instance.estimationDocument(newMainBase, invoice, requestNumber);

    }, 350);
  }
}

BuilderJs.prototype.estimationBackward = function (fastMode = false) {
  const instance = this;
  const { ea } = this;
  const { setQueue } = GeneralJs;

  if (fastMode) {

    this.newMainBase.remove();
    // this.mainCancleBase.remove();
    this.invid = null;
    this.totalMother.style.overflow = "scroll";

  } else {

    this.newMainBase.style.animation = "fadedownlite 0.3s ease forwards";
    this.mainCancleBase.style.animation = "fadedownlite 0.3s ease forwards";
    this.mainBaseTong.style.animation = "fadeuplite 0.3s ease forwards";
    setQueue(() => {
      instance.newMainBase.remove();
      instance.mainCancleBase.remove();
      instance.invid = null;
      instance.totalMother.style.overflow = "scroll";
    }, 301);

  }
}

BuilderJs.prototype.estimationDocument = function (mother, invoice, pastNumber = null) {
  const instance = this;
  const { totalMother, ea } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, setQueue, autoComma, findByAttribute, uniqueValue, equalJson } = GeneralJs;
  const titleWording = "홈리에종\n시공 견적서";
  const ultimateTotalClassName = "ultimateTotal";
  const won = '원';
  const whiteDetailBlockIdConst = "whiteDetailBlock_";
  const dragConst = "dragData";
  let titleArea, contentsArea, greenArea;
  let titleWidth;
  let topMargin;
  let leftMargin;
  let middleMargin;
  let titleSize, subTitleSize;
  let barWidth, barTop, barHeight;
  let realTopMargin;
  let innerPaddingTop;
  let sumHeight;
  let contentsField;
  let detailField, sumField;
  let subTitleMarginTop, subTitleVisual;
  let request, items;
  let innerPadding;
  let whiteBlock;
  let whiteBlockMarginBottom;
  let whitePaddingTop, whitePaddingLeft;
  let num;
  let whiteBlockTitleSize;
  let titleMarginTop;
  let whiteTableArea;
  let tableHeight;
  let price;
  let namePercentage, numberPercentage, unitEaPercentage, consumerPercentage, pricePercentage, descriptionPercentage;
  let percentages;
  let detailWordings;
  let whiteDetailBlock;
  let tempArr;
  let checkBoxPercentage;
  let detailTextSize, detailTextTop;
  let priceSum;
  let tempDom;
  let checkBoxWidth, checkBoxTop;
  let detailDeactive;
  let itemDeactive;
  let whiteTitleArea;
  let itemCheckWidth, itemCheckTop;
  let totalSum;
  let sumSize, sumTop;
  let sumMarginRight;
  let sumPaddingLeft;
  let sumBarTop;
  let greenButtonWordingSize, greenButtonWordingBottom;
  let greenButtonWidth;
  let greenButtonHeight;
  let greenButtonTextTop;
  let greenButtonBetween;
  let greenButtons;
  let greenButtonBase;
  let greenButtonEvents;
  let greenButtonPaddingTop, greenButtonPaddingLeft, greenButtonMarginRight;
  let columnArr;
  let plusCircleWidth, plusCircleTop;
  let makeDetailBlock;
  let valueArr;
  let amountSync;
  let contextmenuBetween, contextmenuBetweenTop;
  let contextmenuWidth;
  let contextmenuHeight;
  let contextmenuTextTop;
  let contextmenuSize;
  let makeWhiteBlock;
  let blockSum, tempBlock;
  let currentBoo;

  this.invid = invoice.invid;

  titleWidth = 200;
  topMargin = 52;
  leftMargin = 52;
  middleMargin = 20;
  titleSize = 30;
  titleMarginTop = 1;
  subTitleSize = 16;
  subTitleMarginTop = 10;
  subTitleVisual = 2;

  barWidth = 18;
  barTop = 60;
  realTopMargin = barTop;
  barHeight = 99;

  sumHeight = 80;

  innerPadding = 20;

  whiteBlockMarginBottom = 10;
  whiteBlockMarginBottomLast = 300;
  whitePaddingTop = 20;
  whitePaddingLeft = 25;
  whiteBlockTitleSize = 20;
  whiteTitleMarginBottom = 16;

  tableHeight = 36;

  checkBoxPercentage = 4;
  namePercentage = 36;
  numberPercentage = 6;
  unitEaPercentage = 6;
  consumerPercentage = 14;
  pricePercentage = 14;
  descriptionPercentage = 20;
  detailWordings = [ "", "품명", "수량", "단위", "단가", "가격", "규격" ];
  percentages = [ checkBoxPercentage, namePercentage, numberPercentage, unitEaPercentage, consumerPercentage, pricePercentage, descriptionPercentage ];
  columnArr = [ "checkBox", "name", "number", "ea", "consumer", "price", "description" ];

  detailTextSize = 13;
  detailTextTop = -1;

  checkBoxWidth = 11;
  checkBoxTop = 0;

  plusCircleWidth = 12;
  plusCircleTop = 0;

  itemCheckWidth = 13;
  itemCheckTop = 8;

  sumSize = 26;
  sumTop = -4;
  sumMarginRight = 30;
  sumPaddingLeft = 18;
  sumBarTop = 37;

  greenButtonWidth = 300;
  greenButtonHeight = 30;
  greenButtonTextTop = -1;
  greenButtonBetween = 5;
  greenButtonWordingSize = 13;
  greenButtonWordingBottom = 8;

  greenButtonPaddingTop = 12;
  greenButtonPaddingLeft = 6;
  greenButtonMarginRight = 5;

  contextmenuWidth = 90;
  contextmenuHeight = 30;
  contextmenuTextTop = 0;
  contextmenuSize = 14;
  contextmenuBetween = 4;
  contextmenuBetweenTop = 6;

  amountSync = {};
  greenArea = {};
  titleArea = {};
  contentsArea = {};
  contentsField = {};
  detailField = {};
  sumField = {};

  innerPaddingTop = realTopMargin - topMargin;

  currentBoo = (pastNumber === null || pastNumber === 0);
  if (currentBoo) {
    [ request ] = invoice.requests;
    this.invoiceNumber = 0;
  } else {
    request = invoice.requests[pastNumber];
    this.invoiceNumber = pastNumber;
  }

  ({ items } = request);

  greenButtons = [
    [ "견적서 발송" ],
    [ "이전", "다음" ]
  ];

  greenButtonEvents = [
    [
      async function (e) {
        try {
          if (window.confirm("견적서를 전송하시겠습니까?")) {
            await instance.saveState(true);
            const [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid: invoice.links.cliid } }, "/getClients", { equal: true });
            await ajaxJson({
              method: "constructEstimation",
              name: thisClient.name,
              phone: thisClient.phone,
              option: {
                client: thisClient.name,
                host: BACKHOST.slice(8, -5),
                path: "cestimation",
                proid: invoice.links.proid,
                buiid: invoice.links.buiid
              }
            }, "/alimTalk");
            window.alert("견적서를 전송하였습니다!");
          }
        } catch (e) {
          window.location.reload();
        }
      },
    ],
    [
      async function () {
        try {
          if (invoice.requests[instance.invoiceNumber + 1] !== undefined) {
            instance.estimationBackward(true);
            instance.estimationDetailLaunching(invoice.invid, true, instance.invoiceNumber + 1);
          } else {
            window.alert("가장 오래된 버전입니다!");
          }

        } catch (e) {
          window.location.reload();
        }
      },
      async function () {
        try {

          if (invoice.requests[instance.invoiceNumber - 1] !== undefined) {
            instance.estimationBackward(true);
            instance.estimationDetailLaunching(invoice.invid, true, instance.invoiceNumber - 1);
          } else {
            window.alert("가장 최신 버전입니다!");
          }

        } catch (e) {
          window.location.reload();
        }
      },
    ]
  ];

  makeDetailBlock = (whiteTableArea, price, name, number, unitEa, consumer, description, detailDeactive) => {
    valueArr = [];
    valueArr.push('');
    valueArr.push(name);
    valueArr.push(String(number));
    valueArr.push(unitEa);
    valueArr.push(autoComma(consumer) + '원');
    valueArr.push(autoComma(price) + '원');
    valueArr.push(description);

    whiteDetailBlock = createNode({
      id: whiteDetailBlockIdConst + uniqueValue("hex"),
      mother: whiteTableArea,
      attribute: {
        consumer: String(consumer),
        number: String(number),
        draggable: "true",
      },
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData(dragConst, this.id);
        },
        dragenter: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.style.background = colorChip.liteGreen;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        dragleave: function (e) {
          e.preventDefault();
          this.style.marginBottom = "";
          this.style.background = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
        },
        dragover: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.style.background = colorChip.liteGreen;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        drop: function (e) {
          e.preventDefault();
          const from = document.getElementById(e.dataTransfer.getData(dragConst));
          const fromArea = from.parentElement;
          const thisArea = this.parentElement;
          this.style.marginBottom = "";
          this.style.background = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
          this.parentNode.insertBefore(from, this.nextElementSibling);
          if (thisArea !== fromArea) {
            setQueue(() => {
              amountSync(thisArea);
              setQueue(() => {
                amountSync(fromArea);
              });
            });
          }
        }
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
        borderRight: "1px solid " + colorChip.gray3,
        borderLeft: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    });
    for (let i = 0; i < percentages.length; i++) {
      tempDom = createNode({
        mother: whiteDetailBlock,
        attribute: {
          index: String(i),
          column: columnArr[i],
          value: valueArr[i],
        },
        event: {
          click: async function (e) {
            const self = this;
            const index = Number(this.getAttribute("index"));
            const column = this.getAttribute("column");
            try {
              const checkBoxDom = findByAttribute(this.parentElement.children, "column", "checkBox");
              const numberDom = findByAttribute(this.parentElement.children, "column", "number");
              const numberValue = Number(numberDom.getAttribute("value"));
              const consumerDom = findByAttribute(this.parentElement.children, "column", "consumer");
              const consumerValue = Number(consumerDom.getAttribute("value").replace(/[^0-9\-\.]/gi, ''));
              const priceDom = findByAttribute(this.parentElement.children, "column", "price");
              let totalTargets, totalFinal;
              let totalDom, titleDom;
              let areaMother;
              let originalMother, originalMothers;
              let ultimateTotal;
              let cancelBack, cloneInput;
              let rect;
              let updateEvent;
              let checkOn, checkOff;

              checkOn = () => {
                let pastValue;

                if (numberDom.hasAttribute("pastvalue")) {
                  pastValue = Number(numberDom.getAttribute("pastvalue"));
                } else {
                  pastValue = 1;
                }

                checkBoxDom.querySelector("svg").style.background = colorChip.white;
                checkBoxDom.querySelector("path").setAttribute("fill", colorChip.green);

                numberDom.setAttribute("value", String(pastValue));
                numberDom.firstChild.textContent = String(pastValue);

                priceDom.setAttribute("value", autoComma(consumerValue * pastValue) + won);
                priceDom.firstChild.textContent = autoComma(consumerValue * pastValue) + won;

                checkBoxDom.parentElement.setAttribute("number", String(pastValue));

                [ ...checkBoxDom.parentNode.children ].forEach((dom) => {
                  dom.firstChild.style.color = colorChip.black;
                });
              }

              checkOff = () => {
                checkBoxDom.querySelector("svg").style.background = colorChip.gray3;
                checkBoxDom.querySelector("path").setAttribute("fill", colorChip.gray3);

                numberDom.setAttribute("pastvalue", numberDom.getAttribute("value"));
                numberDom.setAttribute("value", String(0));
                numberDom.firstChild.textContent = String(0);

                priceDom.setAttribute("value", autoComma(consumerValue * 0) + won);
                priceDom.firstChild.textContent = autoComma(consumerValue * 0) + won;

                checkBoxDom.parentElement.setAttribute("number", String(0));

                [ ...checkBoxDom.parentNode.children ].forEach((dom) => {
                  dom.firstChild.style.color = colorChip.deactive;
                });
              }

              if (column === "checkBox") {

                if (numberValue === 0) {
                  checkOn();
                } else {
                  checkOff();
                }
                amountSync(self.parentElement.parentElement);
                await instance.saveState();

              } else if (column !== "price") {

                cancelBack = {};
                cloneInput = {};

                if (column === "name") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "number") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");

                      cloneInput.value = cloneInput.value.replace(/[^0-9\.\-]/gi, '');
                      if (cloneInput.value === '0') {
                        checkOff();
                      } else {
                        checkOn();
                      }

                      self.parentNode.setAttribute("number", cloneInput.value);
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);

                      priceDom.firstChild.textContent = autoComma(Math.floor(Number(cloneInput.value) * consumerValue)) + won;
                      priceDom.setAttribute("value", autoComma(Math.floor(Number(cloneInput.value) * consumerValue)) + won);

                      amountSync(self.parentElement.parentElement);

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "ea") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "consumer") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");

                      cloneInput.value = cloneInput.value.replace(/[^0-9\.\-]/gi, '');
                      if (cloneInput.value === '0') {
                        checkOff();
                      }

                      self.parentNode.setAttribute("consumer", cloneInput.value);
                      self.firstChild.textContent = autoComma(Number(cloneInput.value)) + won;
                      self.setAttribute("value", autoComma(Number(cloneInput.value)) + won);

                      priceDom.firstChild.textContent = autoComma(Math.floor(Number(cloneInput.value) * numberValue)) + won;
                      priceDom.setAttribute("value", autoComma(Math.floor(Number(cloneInput.value) * numberValue)) + won);

                      amountSync(self.parentElement.parentElement);

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "description") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }

                self.parentElement.setAttribute("draggable", "false");

                cancelBack = createNode({
                  mother: this,
                  attribute: {
                    draggable: "false",
                  },
                  event: {
                    click: async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        self.parentElement.setAttribute("draggable", "true");
                        await updateEvent(e);
                        await instance.saveState();
                      } catch (e) {
                        console.log(e);
                      }
                    },
                    dragstart: function (e) {
                      e.stopPropagation();
                    },
                  },
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                    transition: "all 0s ease",
                  }
                });

                rect = cancelBack.getBoundingClientRect();
                cancelBack.style.top = String(-1 * rect.top) + ea;
                cancelBack.style.left = String(-1 * rect.left) + ea;
                cancelBack.style.width = String(window.innerWidth) + ea;
                cancelBack.style.height = String(window.innerHeight) + ea;

                cloneInput = createNode({
                  mother: this,
                  mode: "input",
                  attribute: {
                    type: "text",
                    draggable: "false",
                  },
                  event: {
                    click: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                    keypress: async function (e) {
                      try {
                        if (e.key === "Enter") {
                          self.parentElement.setAttribute("draggable", "true");
                          await updateEvent(e);
                          await instance.saveState();
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    },
                    selectstart: function (e) {
                      e.stopPropagation();
                    },
                    dragstart: function (e) {
                      e.stopPropagation();
                    },
                  },
                  style: {
                    fontSize: String(detailTextSize) + ea,
                    fontWeight: String(400),
                    color: colorChip.green,
                    position: "absolute",
                    top: String(detailTextTop) + ea,
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    outline: String(0),
                    border: String(0),
                    zIndex: String(1),
                    textAlign: "center",
                  }
                });

                this.firstChild.setAttribute("past", this.firstChild.style.color);
                this.firstChild.style.color = "transparent";

                if (column !== "number" && column !== "consumer") {
                  cloneInput.value = this.firstChild.textContent;
                } else {
                  cloneInput.value = this.firstChild.textContent.replace(/[^0-9\.\-]/gi, '');
                }

                cloneInput.focus();

              }
            } catch (e) {
              window.location.reload();
            }
          },
          contextmenu: async function (e) {
            const self = this;
            const column = this.getAttribute("column");
            if (column === "checkBox") {
              e.preventDefault();
              e.stopPropagation();
              try {
                const contextMenu = [
                  {
                    name: "항목 삭제",
                    event: async function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        const areaMother = self.parentElement.parentElement;
                        let newBlocks, num;
                        self.parentElement.remove();
                        setQueue(() => {
                          amountSync(areaMother);
                          if (areaMother.children.length === 2) {
                            newBlocks = [];
                            num = 0;
                            for (let block of instance.whiteBlocks) {
                              if (block !== areaMother.parentElement) {
                                block.firstChild.querySelector('b').textContent = String(num + 1);
                                block.style.marginBottom = String(whiteBlockMarginBottom) + ea;
                                newBlocks.push(block);
                                num++;
                              }
                            }
                            newBlocks[newBlocks.length - 1].style.marginBottom = String(whiteBlockMarginBottomLast) + ea;
                            instance.whiteBlocks = newBlocks;
                            areaMother.parentElement.remove();
                            amountSync(newBlocks[newBlocks.length - 1].children[1]);
                          }
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  },
                ];
                let cancelBack;
                let menuTong;
                let rect;
                let tongTopMargin;

                cancelBack = createNode({
                  mother: this,
                  event: {
                    click: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    },
                    contextmenu: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    },
                  },
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                    transition: "all 0s ease",
                  }
                });

                rect = cancelBack.getBoundingClientRect();
                cancelBack.style.top = String(-1 * rect.top) + ea;
                cancelBack.style.left = String(-1 * rect.left) + ea;
                cancelBack.style.width = String(window.innerWidth) + ea;
                cancelBack.style.height = String(window.innerHeight) + ea;

                menuTong = createNode({
                  mother: this,
                  event: {
                    contextmenu: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                  },
                  style: {
                    position: "absolute",
                    top: String(self.querySelector("svg").getBoundingClientRect().top - self.getBoundingClientRect().top + self.querySelector("svg").getBoundingClientRect().height + contextmenuBetweenTop) + ea,
                    left: String(self.querySelector("svg").getBoundingClientRect().left - self.getBoundingClientRect().left) + ea,
                    width: String(contextmenuWidth) + ea,
                    zIndex: String(1),
                    animation: "fadeuplite 0.2s ease forwards",
                  }
                });

                for (let obj of contextMenu) {
                  createNode({
                    mother: menuTong,
                    event: {
                      contextmenu: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                      },
                      click: obj.event
                    },
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      background: colorChip.gradientGreen,
                      borderRadius: String(3) + "px",
                      boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
                      width: String(100) + '%',
                      height: String(contextmenuHeight) + ea,
                      marginBottom: String(contextmenuBetween) + ea,
                    },
                    children: [
                      {
                        text: obj.name,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          fontSize: String(contextmenuSize) + ea,
                          fontWeight: String(400),
                          color: colorChip.white,
                          textAlign: "center",
                          top: String(contextmenuTextTop) + ea,
                        }
                      }
                    ]
                  });
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "top",
          width: String(percentages[i]) + '%',
          boxSizing: "border-box",
          height: String(100) + '%',
          borderRight: i !== percentages.length - 1 ? "1px solid " + colorChip.gray3 : "",
          cursor: i === 0 ? "pointer" : "",
        }
      });
      if (i !== 0) {
        createNode({
          mother: tempDom,
          text: valueArr[i],
          event: {
            selectstart: (e) => { e.preventDefault(); }
          },
          style: {
            fontSize: String(detailTextSize) + ea,
            fontWeight: String(400),
            color: !detailDeactive ? colorChip.black : colorChip.deactive,
            position: "relative",
            top: String(detailTextTop) + ea,
            transition: "all 0s ease",
          }
        })
      } else {
        createNode({
          mother: tempDom,
          mode: "svg",
          source: instance.mother.returnCheckBox(!detailDeactive ? colorChip.green : colorChip.gray3, false, true),
          style: {
            position: "relative",
            width: String(checkBoxWidth) + ea,
            top: String(checkBoxTop) + ea,
            background: !detailDeactive ? colorChip.white : colorChip.gray3,
          }
        });
      }
    }
  }

  amountSync = (areaMother) => {
    let originalMother, originalMothers;
    let totalDom, titleDom;
    let totalTargets;
    let totalFinal;
    let ultimateTotal;

    originalMother = areaMother.parentElement;
    originalMothers = [ ...originalMother.parentElement.children ];
    totalDom = areaMother.children[areaMother.children.length - 1];
    titleDom = originalMother.firstChild;

    totalTargets = [ ...areaMother.children ].filter((dom) => { return dom.hasAttribute("consumer") });
    totalFinal = totalTargets.reduce((sum, dom) => { return sum + (Number(dom.getAttribute("consumer")) * Number(dom.getAttribute("number"))) }, 0);

    totalDom.setAttribute("total", String(totalFinal));
    totalDom.lastChild.firstChild.textContent = autoComma(totalFinal) + won;

    if (totalFinal === 0) {
      titleDom.style.color = colorChip.deactive;
      titleDom.querySelector('b').style.color = colorChip.deactive;
      titleDom.querySelector("svg").style.background = colorChip.gray3;
      titleDom.querySelector("path").setAttribute("fill", colorChip.gray3);
    } else {
      titleDom.style.color = colorChip.black;
      titleDom.querySelector('b').style.color = colorChip.green;
      titleDom.querySelector("svg").style.background = colorChip.white;
      titleDom.querySelector("path").setAttribute("fill", colorChip.green);
    }

    ultimateTotal = originalMothers.reduce((sum, original) => {
      return sum + Number(original.lastChild.lastChild.getAttribute("total"))
    }, 0);
    document.querySelector('.' + ultimateTotalClassName).querySelectorAll('b')[1].textContent = autoComma(ultimateTotal);
    document.querySelector('.' + ultimateTotalClassName).setAttribute("ultimate", String(ultimateTotal));
  }

  makeWhiteBlock = (detailField, item, num) => {
    // total
    whiteBlock = createNode({
      mother: detailField,
      event: {
        contextmenu: function (e) {
          e.stopPropagation();
        }
      },
      style: {
        display: "block",
        width: withOut(whitePaddingLeft * 2, ea),
        borderRadius: String(8) + "px",
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        marginBottom: String(whiteBlockMarginBottom) + ea,
        background: colorChip.white,
        paddingTop: String(whitePaddingTop) + ea,
        paddingBottom: String(whitePaddingTop) + ea,
        paddingLeft: String(whitePaddingLeft) + ea,
        paddingRight: String(whitePaddingLeft) + ea,
      }
    });

    // title area
    whiteTitleArea = createNode({
      mother: whiteBlock,
      text: `<b%${String(num + 1)}%b>&nbsp;&nbsp;${item.name}`,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(whiteTitleMarginBottom) + ea,
        fontSize: String(whiteBlockTitleSize) + ea,
        fontWeight: String(500),
        color: colorChip.black,
      },
      bold: {
        fontSize: String(whiteBlockTitleSize) + ea,
        fontWeight: String(300),
        color: colorChip.green,
      }
    });

    // table area
    whiteTableArea = createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        height: "auto",
      },
    });

    // column row
    whiteDetailBlock = createNode({
      mother: whiteTableArea,
      event: {
        dragenter: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        dragleave: function (e) {
          e.preventDefault();
          this.style.marginBottom = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
        },
        dragover: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        drop: function (e) {
          e.preventDefault();
          const from = document.getElementById(e.dataTransfer.getData(dragConst));
          const fromArea = from.parentElement;
          const thisArea = this.parentElement;
          this.style.marginBottom = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
          this.parentNode.insertBefore(from, this.nextElementSibling);
          if (thisArea !== fromArea) {
            setQueue(() => {
              amountSync(thisArea);
              setQueue(() => {
                amountSync(fromArea);
              });
            });
          }
        }
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        border: "1px solid " + colorChip.gray3,
        borderTopRightRadius: String(5) + "px",
        borderTopLeftRadius: String(5) + "px",
        boxSizing: "border-box",
        background: colorChip.gray0
      }
    });
    for (let i = 0; i < percentages.length; i++) {
      createNode({
        mother: whiteDetailBlock,
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "top",
          width: String(percentages[i]) + '%',
          boxSizing: "border-box",
          height: String(100) + '%',
          borderRight: i !== percentages.length - 1 ? "1px solid " + colorChip.gray3 : "",
        },
        children: [
          {
            text: detailWordings[i],
            style: {
              fontSize: String(detailTextSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              position: "relative",
              top: String(detailTextTop) + ea,
            }
          }
        ]
      });
    }

    priceSum = 0;

    for (let { name, unit: { number, ea: unitEa, amount: { consumer } }, description } of item.detail) {
      price = Math.floor(consumer * number);
      priceSum += price;
      makeDetailBlock(whiteTableArea, price, name, number, unitEa, consumer, description, (price === 0));
    }

    itemDeactive = priceSum === 0;

    // title check
    createNode({
      mother: whiteTitleArea,
      mode: "svg",
      source: instance.mother.returnCheckBox(!itemDeactive ? colorChip.green : colorChip.gray3, false, true),
      style: {
        position: "absolute",
        top: String(itemCheckTop) + ea,
        right: String(0),
        width: String(itemCheckWidth) + ea,
        background: !itemDeactive ? colorChip.white : colorChip.gray3,
      }
    });
    if (itemDeactive) {
      whiteTitleArea.style.color = colorChip.deactive;
      whiteTitleArea.querySelector('b').style.color = colorChip.deactive;
    }

    // sum row
    whiteDetailBlock = createNode({
      mother: whiteTableArea,
      attribute: {
        total: String(priceSum)
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
        borderRight: "1px solid " + colorChip.gray3,
        borderLeft: "1px solid " + colorChip.gray3,
        borderBottomRightRadius: String(5) + "px",
        borderBottomLeftRadius: String(5) + "px",
        marginBottom: String(6) + ea,
        boxSizing: "border-box",
      },
      children: [
        {
          event: {
            click: function (e) {
              makeDetailBlock(this.parentNode.parentNode, 10000, "품명 입력", 1, "개", 10000, "비고", false);
              this.parentNode.parentNode.insertBefore(this.parentNode.parentNode.lastChild, this.parentNode);
              amountSync(this.parentNode.parentNode);
            }
          },
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: String(checkBoxPercentage) + '%',
            boxSizing: "border-box",
            height: String(100) + '%',
            borderRight: "1px solid " + colorChip.gray3,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnPlusCircle(colorChip.green),
              style: {
                position: "relative",
                width: String(plusCircleWidth) + ea,
                top: String(plusCircleTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: String(namePercentage) + '%',
            boxSizing: "border-box",
            height: String(100) + '%',
            borderRight: "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: "합계",
              style: {
                fontSize: String(detailTextSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(detailTextTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: withOut(checkBoxPercentage + namePercentage, '%'),
            boxSizing: "border-box",
            height: String(100) + '%',
          },
          children: [
            {
              text: autoComma(priceSum) + '원',
              style: {
                fontSize: String(detailTextSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(detailTextTop) + ea,
              }
            }
          ]
        },
      ]
    });

    return [ whiteBlock, priceSum ];
  }

  greenArea = createNode({
    mother,
    style: {
      position: "absolute",
      left: String(0),
      top: String(barTop) + ea,
      width: String(barWidth) + ea,
      height: String(barHeight) + ea,
      borderTopRightRadius: String(6) + ea,
      borderBottomRightRadius: String(6) + ea,
      background: colorChip.gradientGreen
    }
  });

  titleArea = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      width: String(titleWidth) + ea,
      height: withOut((topMargin * 2), ea),
      top: String(topMargin) + ea,
      marginLeft: String(leftMargin) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: titleArea,
    text: titleWording,
    style: {
      display: "block",
      position: "relative",
      color: colorChip.black,
      fontSize: String(titleSize) + ea,
      fontWeight: String(500),
      marginTop: String(titleMarginTop) + ea,
    }
  });

  createNode({
    mother: titleArea,
    text: invoice.title.replace(/시공 견적서/gi, '').replace(/시공 견적/gi, '').replace(/견적서/gi, '').replace(/견적/gi, ''),
    style: {
      display: "block",
      position: "relative",
      color: colorChip.deactive,
      fontSize: String(subTitleSize) + ea,
      marginTop: String(subTitleMarginTop) + ea,
      marginLeft: String(subTitleVisual) + ea,
      fontWeight: String(600),
    }
  });

  contentsArea = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      width: withOut(titleWidth + middleMargin + (leftMargin * 2), ea),
      paddingTop: String(innerPaddingTop) + ea,
      paddingBottom: String(innerPaddingTop) + ea,
      height: withOut((topMargin * 2) + (innerPaddingTop * 2), ea),
      top: String(topMargin) + ea,
      marginLeft: String(middleMargin) + ea,
      verticalAlign: "top",
    }
  });

  contentsField = createNode({
    mother: contentsArea,
    style: {
      position: "relative",
      display: "block",
      height: String(100) + '%',
      width: String(100) + '%',
      border: "1px solid " + colorChip.gray4,
      boxSizing: "border-box",
      borderRadius: String(8) + ea,
      overflow: "hidden",
    }
  });

  detailField = createNode({
    mother: contentsField,
    event: {
      contextmenu: function (e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        const contextMenu = [
          {
            name: "중분류 추가",
            event: async function (e) {
              e.preventDefault();
              e.stopPropagation();
              try {
                let response;
                let itemDummy, detailDummy;
                let block, sum;

                do {
                  response = await GeneralJs.prompt("중분류의 명칭을 알려주세요!");
                } while (typeof response !== "string" || response === '');

                itemDummy = equalJson(JSON.stringify(instance.dummy.item));
                itemDummy.name = response;

                detailDummy = equalJson(JSON.stringify(instance.dummy.detail));
                detailDummy.description = "비고";
                detailDummy.name = "품명 입력";
                detailDummy.unit.ea = "개";
                detailDummy.unit.number = 1;
                detailDummy.unit.amount.supply = 10000;
                detailDummy.unit.amount.vat = 1000;
                detailDummy.unit.amount.consumer = 11000;
                itemDummy.detail.unshift(detailDummy);

                for (let block of instance.whiteBlocks) {
                  block.style.marginBottom = String(whiteBlockMarginBottom) + ea;
                }

                [ block, sum ] = makeWhiteBlock(self, itemDummy, instance.whiteBlocks.length);
                block.style.marginBottom = String(whiteBlockMarginBottomLast) + ea;
                instance.whiteBlocks.push(block);
                amountSync(block.children[1]);

                self.parentNode.removeChild(self.parentNode.lastChild);
                self.parentNode.removeChild(self.parentNode.lastChild);

                await instance.saveState();
              } catch (e) {
                window.location.reload();
              }
            }
          },
        ];
        let cancelBack;
        let menuTong;

        cancelBack = createNode({
          mother: this.parentNode,
          events: [
            {
              type: [ "click", "contextmenu" ],
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.parentNode.removeChild(self.parentNode.lastChild);
                self.parentNode.removeChild(self.parentNode.lastChild);
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
          mother: this.parentNode,
          event: {
            contextmenu: function (e) {
              e.preventDefault();
              e.stopPropagation();
            },
          },
          style: {
            position: "absolute",
            top: String(e.offsetY) + ea,
            left: String(e.offsetX) + ea,
            width: String(contextmenuWidth) + ea,
            zIndex: String(1),
            animation: "fadeuplite 0.2s ease forwards",
          }
        });

        for (let obj of contextMenu) {
          createNode({
            mother: menuTong,
            event: {
              contextmenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
              },
              click: obj.event
            },
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.gradientGreen,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              width: String(100) + '%',
              height: String(contextmenuHeight) + ea,
              marginBottom: String(contextmenuBetween) + ea,
              cursor: "pointer",
            },
            children: [
              {
                text: obj.name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contextmenuSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.white,
                  textAlign: "center",
                  top: String(contextmenuTextTop) + ea,
                }
              }
            ]
          });
        }

      }
    },
    style: {
      position: "relative",
      display: "block",
      width: String(100) + '%',
      height: withOut(sumHeight, ea),
      boxSizing: "border-box",
      borderBottom: "1px solid " + colorChip.gray4,
      background: colorChip.gray1,
      paddingTop: String(innerPadding) + ea,
      paddingLeft: String(innerPadding) + ea,
      paddingRight: String(innerPadding) + ea,
      overflow: "scroll",
    }
  });

  sumField = createNode({
    mother: contentsField,
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      width: String(100) + '%',
      height: String(sumHeight) + ea,
    }
  });

  this.whiteBlocks = [];
  totalSum = 0;
  num = 0;
  for (let item of items) {
    [ tempBlock, blockSum ] = makeWhiteBlock(detailField, item, num);
    totalSum += blockSum;
    this.whiteBlocks.push(tempBlock);
    num++;
  }
  tempBlock.style.marginBottom = String(whiteBlockMarginBottomLast) + ea;

  // total sum contents
  createNodes([
    {
      mother: sumField,
      style: {
        position: "absolute",
        left: String(sumMarginRight) + ea,
        top: String(0),
        height: String(sumBarTop) + ea,
        borderBottom: "1px dashed " + colorChip.green,
        width: withOut(((sumMarginRight * 2) + 1), ea),
        opacity: String(0.6),
      }
    },
    {
      mother: sumField,
      class: [ ultimateTotalClassName ],
      attribute: {
        ultimate: String(totalSum),
      },
      text: "합계 <b%: %b>" + "&nbsp;<u%" + autoComma(totalSum) + '%u>원',
      style: {
        position: "relative",
        top: String(sumTop) + ea,
        fontSize: String(sumSize) + ea,
        fontWeight: String(500),
        marginRight: String(sumMarginRight) + ea,
        color: colorChip.black,
        paddingLeft: String(sumPaddingLeft) + ea,
        background: colorChip.white,
      },
      bold: {
        color: colorChip.deactive,
        fontWeight: String(300),
      },
      under: {
        color: colorChip.black,
        fontWeight: String(500),
      }
    }
  ])

  // save button
  for (let i = 0; i < greenButtons.length; i++) {

    greenButtonBase = createNode({
      mother: titleArea,
      style: {
        display: "block",
        position: "absolute",
        width: String(greenButtonWidth) + ea,
        height: String(greenButtonHeight) + ea,
        bottom: String(greenButtonWordingBottom + ((greenButtonHeight + greenButtonBetween) * i)) + ea,
        left: String(0),
      },
    });

    for (let j = 0; j < greenButtons[i].length; j++) {
      createNode({
        mother: greenButtonBase,
        event: {
          contextmenu: (e) => {
            e.preventDefault();
            e.stopPropagation();
          },
          click: greenButtonEvents[i][j]
        },
        style: {
          display: "inline-flex",
          alignItems: "center",
          paddingLeft: String(greenButtonPaddingTop) + ea,
          paddingRight: String(greenButtonPaddingTop) + ea,
          paddingTop: String(greenButtonPaddingLeft) + ea,
          paddingBottom: String(greenButtonPaddingLeft) + ea,
          marginRight: String(greenButtonMarginRight) + ea,
          justifyContent: "center",
          borderRadius: String(3) + "px",
          bottom: String(greenButtonWordingBottom + ((greenButtonHeight + greenButtonBetween) * i)) + ea,
          left: String(0),
          background: colorChip.gradientGreen,
          cursor: "pointer",
        },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: greenButtons[i][j],
            style: {
              position: "relative",
              fontSize: String(greenButtonWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.whiteBlack,
              top: String(greenButtonTextTop) + ea,
            }
          }
        ]
      });
    }

  }

  // auto save launching
  this.autoSave();

}

BuilderJs.prototype.autoSave = function () {
  const instance = this;
  const { autoSaveConst } = this;
  const intervalConst = 10 * 60 * 1000;
  if (GeneralJs.stacks[autoSaveConst] !== null) {
    clearInterval(GeneralJs.stacks[autoSaveConst]);
  }
  GeneralJs.stacks[autoSaveConst] = setInterval(async () => {
    try {
      await instance.saveState();
    } catch (e) {
      console.log(e);
    }
  }, intervalConst);
}

BuilderJs.prototype.saveState = async function (unshiftMode = false) {
  const instance = this;
  const { ajaxJson, uniqueValue, equalJson } = GeneralJs;
  const { invid, dummy: { item, detail } } = this;
  const rConst = "R";
  const iConst = "I";
  const dConst = "D";
  try {
    if (this.invoiceNumber === 0) {
      const blockToJson = function (whiteDom) {
        const optionalValue = (value, d) => { return (value === null ? d : value) }
        let json;
        let tempArr;
        let detailDummy;
        let requestDummy;
        let consumer, vat, supply;
        let thisInvoice;

        json = equalJson(JSON.stringify(item));
        json.id = iConst + uniqueValue("hex");
        json.name = whiteDom.children[0].textContent.replace(/^[0-9]+[^0-9]/, '').trim();

        detailDoms = [ ...whiteDom.children[1].children ].slice(1, -1);
        for (let dom of detailDoms) {
          tempArr = [ ...dom.children ].slice(1);
          detailDummy = equalJson(JSON.stringify(detail));

          detailDummy.id = dConst + uniqueValue("hex");
          detailDummy.name = optionalValue(tempArr[0].getAttribute("value"), '').trim();
          detailDummy.unit.number = Math.floor(Number(optionalValue(tempArr[1].getAttribute("value"), '0').replace(/[^0-9]/gi, '')));
          detailDummy.unit.ea = optionalValue(tempArr[2].getAttribute("value"), '').trim();

          consumer = Math.floor(Number(optionalValue(tempArr[3].getAttribute("value"), '0').replace(/[^0-9]/gi, '')));
          vat = Math.floor((consumer / 11) / 10) * 10;
          supply = Math.floor(consumer - vat);

          detailDummy.unit.amount.consumer = consumer;
          detailDummy.unit.amount.vat = vat;
          detailDummy.unit.amount.supply = supply;

          detailDummy.description = optionalValue(tempArr[5].getAttribute("value"), '').trim();

          json.detail.push(detailDummy);
        }

        return json;
      }
      let whereQuery, updateQuery;
      let tong;

      whereQuery = { invid };
      updateQuery = {};
      tong = [];
      for (let block of this.whiteBlocks) {
        tong.push(blockToJson(block));
      }

      if (!unshiftMode) {
        this.invoiceList.search("invid", this.invid).requests[0].items = tong;
        updateQuery["requests.0.items"] = tong;
      } else {
        thisInvoice = this.invoiceList.search("invid", this.invid);
        requestDummy = equalJson(JSON.stringify(thisInvoice.requests[0]));
        thisInvoice.requests[0].status = "작성 완료";
        thisInvoice.requests.unshift(requestDummy);
        thisInvoice.requests[0].id = rConst + uniqueValue("hex");
        thisInvoice.requests[0].date = new Date();
        thisInvoice.requests[0].items = tong;
        updateQuery["requests"] = thisInvoice.requests;
      }

      await ajaxJson({
        mode: "update",
        collection: "constructInvoice",
        db: "python",
        whereQuery, updateQuery
      }, PYTHONHOST + "/generalMongo");
    }
  } catch (e) {
    window.location.reload();
  }
}

BuilderJs.prototype.addSearchEvent = function () {
  const instance = this;
  const { totalMother, ea, searchInput, estimationBoxes } = this;

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      for (let dom of estimationBoxes) {
        if ((new RegExp(this.value.trim(), "gi")).test(dom.textContent)) {
          dom.style.display = "inline-block";
        } else {
          dom.style.display = "none";
        }
      }
    }
  });

}

BuilderJs.prototype.fileAddition = async function (file, eventDom, event) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, invoiceList } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, setQueue, cleanChildren, ajaxForm, uniqueValue, equalJson } = GeneralJs;
  try {
    const staticConst = "/publicSector/temp/" + uniqueValue("hex");
    const titleWording = "Q. 누구의 견적서 파일인가요?";
    let formData;
    let res, res2;
    let blackBack, questionBase;
    let questionBlock;
    let whiteLineBoxWidth, whiteLineBoxHeight;
    let whiteLineTitleSize, whiteLineTitleTop, whiteLineTitleWeight;
    let blackOpacity;
    let questionTong;
    let questionArr;
    let whiteLineBoxPaddingTop;
    let whiteLineBoxPaddingLeft;
    let whiteLineFactorSize;
    let whiteLineFactorMarginBottom;
    let whiteLineFactorMarginBottomLast;
    let queryBlockWording0, queryBlockWording1;
    let queryLineBetween;
    let queryLineTop;
    let newRequest;
    let loading;

    whiteLineBoxWidth = 303;
    whiteLineBoxHeight = 293;
    whiteLineTitleSize = 22;
    whiteLineTitleTop = -42;
    whiteLineTitleWeight = 700;
    whiteLineBoxPaddingTop = 21;
    whiteLineBoxPaddingLeft = 26;
    whiteLineFactorSize = 18;
    whiteLineFactorMarginBottom = 7;
    whiteLineFactorMarginBottomLast = 60;
    queryLineBetween = 10;
    queryLineTop = 12;

    blackOpacity = 0.7;

    loading = instance.mother.grayLoading();

    formData = new FormData();
    formData.append(staticConst, file);

    await ajaxForm(formData, "https://" + FILEHOST + "/publicSector/file");

    res = await ajaxJson({
      file: staticConst + "/" + file.name,
      sheetsName: "내역서",
    }, "https://" + FILEHOST + "/publicSector/excel", { equal: true });

    res2 = await ajaxJson({ matrix: res }, PYTHONHOST + "/invoiceRequest", { equal: true });

    loading.remove();

    newRequest = JSON.stringify(res2);

    blackBack = createNode({
      mother: document.body,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.realBlack,
        zIndex: String(5),
        transition: "all 0.5s ease",
        opacity: String(0),
      }
    });

    setQueue(() => {
      blackBack.style.opacity = String(blackOpacity);
      setQueue(() => {

        questionBase = createNode({
          mother: document.body,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            height: String(100) + '%',
            zIndex: String(5),
          }
        });

        questionTong = createNode({
          mother: questionBase,
          style: {
            display: "block",
            position: "relative",
            width: String(whiteLineBoxWidth) + ea,
            height: String(whiteLineBoxHeight) + ea,
            borderRadius: String(8) + "px",
            border: "1px solid " + colorChip.white,
            animation: "fadeuplite 0.5s ease",
            paddingTop: String(whiteLineBoxPaddingTop) + ea,
            paddingBottom: String(whiteLineBoxPaddingTop) + ea,
            paddingLeft: String(whiteLineBoxPaddingLeft) + ea,
            paddingRight: String(whiteLineBoxPaddingLeft) + ea,
            overflow: "visible",
          },
          children: [
            {
              text: titleWording,
              style: {
                position: "absolute",
                fontSize: String(whiteLineTitleSize) + ea,
                fontWeight: String(whiteLineTitleWeight),
                color: colorChip.white,
                top: String(whiteLineTitleTop) + ea,
                left: String(0),
              }
            },
            {
              attribute: {
                request: newRequest,
              },
              style: {
                position: "relative",
                top: String(0),
                left: String(0),
                width: String(100) + '%',
                height: String(100) + '%',
                overflow: "scroll",
              }
            }
          ]
        }).children[1];

        for (let box of instance.estimationBoxes) {
          questionArr = box.textContent.split("고객님").map((str) => { return str.trim() });
          questionBlock = createNode({
            mother: questionTong,
            class: [ "hoverDefault_lite" ],
            attribute: {
              invid: box.getAttribute("invid"),
              cliid: box.getAttribute("cliid"),
              desid: box.getAttribute("desid"),
              proid: box.getAttribute("proid"),
            },
            event: {
              click: async function (e) {
                try {
                  const newRequest = equalJson(this.parentElement.getAttribute("request"));
                  const invid = this.getAttribute("invid");
                  const cliid = this.getAttribute("cliid");
                  const desid = this.getAttribute("desid");
                  const proid = this.getAttribute("proid");
                  let targetInvoice;
                  let whereQuery, updateQuery;

                  instance.invoiceList.search("invid", invid).requests[0] = newRequest;
                  targetInvoice = instance.invoiceList.search("invid", invid);

                  document.body.children[([ ...document.body.children ].length - 1)].style.animation = "fadedownlite 0.3s ease forwards";
                  document.body.children[([ ...document.body.children ].length - 2)].style.opacity = String(0);

                  setQueue(() => {
                    document.body.removeChild(document.body.lastChild);
                    document.body.removeChild(document.body.lastChild);

                    const removeTargets = eventDom.querySelectorAll("input");
                    for (let dom of removeTargets) {
                      eventDom.removeChild(dom);
                    }

                    ajaxJson({
                      target: "publicSector",
                    }, "https://" + FILEHOST + "/publicSector/delete").then(() => {
                      instance.estimationBoxes.find((dom) => { return dom.getAttribute("invid") === invid }).click();
                      setQueue(async () => {
                        try {
                          await instance.saveState();
                        } catch (e) {
                          window.location.reload();
                        }
                      }, 1000);
                    }).catch((err) => {
                      window.location.reload();
                    });

                  }, 501);

                } catch (e) {
                  window.location.reload();
                }
              }
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              marginBottom: String(whiteLineFactorMarginBottom) + ea,
            }
          });

          queryBlockWording0 = createNode({
            mother: questionBlock,
            text: questionArr[0],
            style: {
              display: "inline-block",
              fontSize: String(whiteLineFactorSize) + ea,
              fontWeight: String(500),
              color: colorChip.white,
            }
          });

          queryBlockWording1 = createNode({
            mother: questionBlock,
            text: questionArr[1],
            style: {
              position: "absolute",
              right: String(0),
              top: String(0),
              fontSize: String(whiteLineFactorSize) + ea,
              fontWeight: String(500),
              color: colorChip.white,
            }
          });

          createNode({
            mother: questionBlock,
            style: {
              position: "absolute",
              borderBottom: "1px dashed " + colorChip.white,
              height: String(queryLineTop) + ea,
              width: withOut(queryBlockWording0.getBoundingClientRect().width + queryBlockWording1.getBoundingClientRect().width + (queryLineBetween * 2), ea),
              top: String(0),
              left: String(queryBlockWording0.getBoundingClientRect().width + queryLineBetween) + ea,
            }
          });
        }

        createNode({
          mother: questionTong,
          style: {
            display: "block",
            width: String(100) + '%',
            height: String(whiteLineFactorMarginBottomLast) + ea,
          }
        });

      }, 300);
    });

  } catch (e) {
    window.location.reload();
  }
}

BuilderJs.prototype.estimationView = async function () {
  const instance = this;
  try {
    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
    }
    const { ajaxJson, returnGet } = GeneralJs;
    const getObj = returnGet();
    const buiid = getObj.buiid || "u2111_aa01s";
    const host = FILEHOST;
    let builder;
    let itemDummy, detailDummy;
    let invoiceList;

    this.belowHeight = <%% 123, 123, 123, 123, 0 %%>;
    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    this.host = host;
    this.downloadUrl = "https://" + host + "/publicSector";
    this.sampleFile = this.downloadUrl + "/estimationSample.xlsx";
    this.autoSaveConst = "autoSaveInterval";
    GeneralJs.stacks[this.autoSaveConst] = null;

    this.buiid = buiid;
    this.builders = new SearchArray(await ajaxJson({
      mode: "read",
      collection: "builder",
      db: "core",
      whereQuery: {}
    }, "/generalMongo", { equal: true }));

    this.baseMaker();
    this.listDetailLaunching(buiid);

    itemDummy = await ajaxJson({ collection: "constructInvoice", subject: "items" }, PYTHONHOST + "/returnDummy", { equal: true });
    detailDummy = await ajaxJson({ collection: "constructInvoice", subject: "detail" }, PYTHONHOST + "/returnDummy", { equal: true });
    this.dummy = {
      item: itemDummy,
      detail: detailDummy
    };

  } catch (e) {
    console.log(e);
    window.alert("잘못된 접근입니다!");
    window.location.href = "https://home-liaison.com";
  }
}

BuilderJs.prototype.normalDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows, profileList, workList, representativeList } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    const now = new Date();
    const past = new Date();
    const yearsAgo = new Date();
    const agoDelta = 6;
    const agoYearDelta = 1;
    let columns;
    let values;
    let timeDelta;
    let year, month;
    let filteredProjectsProposal;
    let filteredProjectsContract;
    let thisTarget;
    let thisValueDoms;
    let yearDelta;
    let monthDelta;
    let tempDate;
    let tempString;
    let thisYear, from, to;
    let filteredFilteredProjectsProposal;
    let filteredFilteredProjectsContract;
    let thisDate;
    let standards;
    let thisValueTemp;
    let filteredChecklistSendRows;
    let filteredProfileSendRows;
    let filteredWorkSendRows;
    let completeAnalyticsRows;
    let profileListSet;
    let workListSet0, workListSet1, workListSet2, workListSet3;
    let filteredCareerSendRows;
    let filteredEntireSendRows;
    let careerUpdateBoo;
    let schoolUpdateBoo;
    let threeStrengthBoo;
    let representativeBoo;

    past.setFullYear(past.getFullYear() - agoYearDelta);
    past.setMonth(0);
    past.setDate(1);
    past.setHours(9);
    past.setMinutes(0);
    past.setSeconds(0);

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(yearsAgo, now);

    profileListSet = [ ...new Set(profileList.map((o) => { return o.desid })) ];
    workListSet0 = [ ...new Set(workList[0].map((o) => { return o.desid })) ];
    workListSet1 = [ ...new Set(workList[1].map((o) => { return o.desid })) ];
    workListSet2 = [ ...new Set(workList[2].map((o) => { return o.desid })) ];
    workListSet3 = [ ...new Set(workList[3].map((o) => { return o.desid })) ];

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "desid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "담당자",
        width: 80,
        name: "manger",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat(this.members.filter((o) => { return o.roles.includes("CX") }).map((member) => {
          return member.name;
        }).map((name) => {
          return {
            value: name,
            functionName: "filterEvent_" + name,
          }
        }).concat([
          {
            value: "-",
            functionName: "filterEvent_-",
          }
        ]))
      },
      {
        title: "대기",
        width: 80,
        name: "processPending",
        type: "number",
      },
      {
        title: "진행중",
        width: 80,
        name: "processDoing",
        type: "number",
      },
      {
        title: "일괄 안내 전송",
        width: 100,
        name: "entireNoticeSend",
        type: "date",
      },
      {
        title: "프로필 안내 전송",
        width: 100,
        name: "profilePhotoNoticeSend",
        type: "date",
      },
      {
        title: "작업물 안내 전송",
        width: 100,
        name: "workingPhotoNoticeSend",
        type: "date",
      },
      {
        title: "경력 안내 전송",
        width: 100,
        name: "careerSchoolNoticeSend",
        type: "date",
      },
      // {
      //   title: "체크리스트",
      //   width: 100,
      //   name: "checklistDone",
      //   type: "string",
      //   menu: [
      //     {
      //       value: "전체 보기",
      //       functionName: "filterEvent_$all",
      //     },
      //     {
      //       value: "완료",
      //       functionName: "filterEvent_완료",
      //     },
      //     {
      //       value: "미완료",
      //       functionName: "filterEvent_미완료",
      //     },
      //   ],
      // },
      {
        title: "프로필 사진",
        width: 100,
        name: "profilePhotoDone",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "작업물",
        width: 100,
        name: "workingPhotoDone",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "경력 정보",
        width: 100,
        name: "careerUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "학력 정보",
        width: 100,
        name: "schoolUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "3가지 강점",
        width: 100,
        name: "threeStrengthUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "대표 작업물",
        width: 100,
        name: "representativeUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "계약 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "협약 완료",
            color: colorChip.black,
          },
          {
            value: "협약 휴직",
            color: colorChip.deactive,
          },
          {
            value: "협약 해지",
            color: colorChip.gray3,
          },
          {
            value: "신청 대기",
            color: colorChip.red,
          },
          {
            value: "컨택중",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "협약 완료",
          "협약 휴직",
          "협약 해지",
          "신청 대기",
          "컨택중",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        }))
      },
      {
        title: "계약일",
        width: 100,
        name: "contractDate",
        type: "date",
      },
      {
        title: "계약 유지",
        width: 100,
        name: "contractDuring",
        type: "during",
      },
      {
        title: "적용 경력",
        width: 100,
        name: "career",
        type: "during",
      },
      {
        title: "연락처",
        width: 130,
        name: "phone",
        type: "string",
      },
      {
        title: "주소",
        width: 400,
        name: "address",
        type: "string",
      },
      {
        title: "유효 범위",
        width: 100,
        name: "range",
        type: "number",
      },
      {
        title: "한계 범위",
        width: 100,
        name: "expenses",
        type: "number",
      },
      {
        title: "홈퍼니싱",
        width: 100,
        name: "homefurnishing",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "홈스타일링",
        width: 100,
        name: "homestyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "토탈 스타일링",
        width: 100,
        name: "totalstyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "설계 변경",
        width: 100,
        name: "extrastyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "프리미엄",
        width: 100,
        name: "premium",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "부분 공간",
        width: 100,
        name: "partial",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "온라인",
        width: 100,
        name: "online",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "거주중",
        width: 100,
        name: "living",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "총 추천수",
        width: 100,
        name: "proposalNumber",
        type: "number",
      },
      {
        title: "총 진행수",
        width: 100,
        name: "contractNumber",
        type: "number",
      },
      {
        title: "진행율",
        width: 100,
        name: "contractPercentage",
        type: "percentage",
      },
      {
        title: "총 정산액",
        width: 120,
        name: "totalAmount",
        type: "number",
      },
    ];

    for (let i = 0; i < yearDelta; i++) {
      columns.push({
        title: String(now.getFullYear() - i) + " " + "추천수",
        width: 120,
        name: "proposalNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행수",
        width: 120,
        name: "contractNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행율",
        width: 120,
        name: "contractPercentageY" + String(i),
        type: "percentage",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "총 정산액",
        width: 120,
        name: "totalAmountY" + String(i),
        type: "number",
      });
    }

    for (let i = 0; i < monthDelta; i++) {
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({
        title: tempString + " " + "추천수",
        width: 120,
        name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1),
        type: "number",
      });
    }

    values = {};

    for (let designer of instance.designers) {

      filteredChecklistSendRows = noticeSendRows.filter((o) => { return o.type === "checklist" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredProfileSendRows = noticeSendRows.filter((o) => { return o.type === "profile" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredWorkSendRows = noticeSendRows.filter((o) => { return o.type === "work" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredCareerSendRows = noticeSendRows.filter((o) => { return o.type === "career" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredEntireSendRows = noticeSendRows.filter((o) => { return o.type === "until" }).filter((o) => { return o.designer.desid === designer.desid });

      careerUpdateBoo = designer.information.business.career.detail.length > 0;
      schoolUpdateBoo = designer.information.business.career.school.length > 0;
      threeStrengthBoo = designer.setting.description.filter((str) => { return !/null/gi.test(str); }).length > 0;
      representativeBoo = representativeList.filter((o) => { return o.boo }).map(({ desid }) => { return desid }).includes(designer.desid);

      standards.values[designer.desid] = [
        {
          value: designer.desid,
          name: "desid",
        },
        {
          value: designer.designer,
          name: "designer",
        },
      ];

      values[designer.desid] = [
        {
          value: designer.manager,
          name: "manger",
        },
        {
          value: asyncProcessText,
          name: "processPending",
        },
        {
          value: asyncProcessText,
          name: "processDoing",
        },
        {
          value: filteredEntireSendRows.length > 0 ? dateToString(filteredEntireSendRows[0].date) : "-",
          name: "entireNoticeSend",
        },
        {
          value: filteredProfileSendRows.length > 0 ? dateToString(filteredProfileSendRows[0].date) : "-",
          name: "profilePhotoNoticeSend",
        },
        {
          value: filteredWorkSendRows.length > 0 ? dateToString(filteredWorkSendRows[0].date) : "-",
          name: "workingPhotoNoticeSend",
        },
        {
          value: filteredCareerSendRows.length > 0 ? dateToString(filteredCareerSendRows[0].date) : "-",
          name: "careerSchoolNoticeSend",
        },
        // {
        //   value: asyncProcessText,
        //   name: "checklistDone",
        // },
        {
          value: profileListSet.includes(designer.desid) ? "올림" : "안올림",
          name: "profilePhotoDone",
        },
        {
          value: (workListSet0.includes(designer.desid) && workListSet1.includes(designer.desid) && workListSet2.includes(designer.desid) && workListSet3.includes(designer.desid)) ? "올림" : "안올림",
          name: "workingPhotoDone",
        },
        {
          value: careerUpdateBoo ? "올림" : "안올림",
          name: "careerUpdate",
        },
        {
          value: schoolUpdateBoo ? "올림" : "안올림",
          name: "schoolUpdate",
        },
        {
          value: threeStrengthBoo ? "올림" : "안올림",
          name: "threeStrengthUpdate",
        },
        {
          value: representativeBoo ? "올림" : "안올림",
          name: "representativeUpdate",
        },
        {
          value: designer.information.contract.status,
          name: "status",
        },
        {
          value: dateToString(designer.information.contract.date),
          name: "contractDate",
        },
      ];

      timeDelta = calcMonthDelta(designer.information.contract.date, new Date());
      values[designer.desid].push({
        value: String(timeDelta) + "개월",
        name: "contractDuring",
      });

      [ year, month ] = designerCareer(designer);
      values[designer.desid].push({
        value: `${String(year)}년 ${String(month)}개월`,
        name: "career",
      });

      values[designer.desid].push({
        value: designer.information.phone,
        name: "phone",
      });

      values[designer.desid].push({
        value: designer.information.address.length > 0 ? designer.information.address[0] : "",
        name: "address",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.range) + "km",
        name: "range",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.expenses) + "km",
        name: "expenses",
      });

      values[designer.desid].push({
        value: designer.analytics.project.matrix[0][1] === 1 ? "가능" : "불가능",
        name: "homefurnishing",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[1][1] === 1 ? "가능" : "불가능",
        name: "homestyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[2][1] === 1 ? "가능" : "불가능",
        name: "totalstyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[3][1] === 1 ? "가능" : "불가능",
        name: "extrastyling",
      });

      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[2] === 1 }) ? "가능" : "불가능",
        name: "premium",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[0] === 1 }) ? "가능" : "불가능",
        name: "partial",
      });

      values[designer.desid].push({
        value: designer.analytics.project.online ? "가능" : "불가능",
        name: "online",
      });
      values[designer.desid].push({
        value: designer.analytics.project.living ? "가능" : "불가능",
        name: "living",
      });

      values[designer.desid].push({
        value: asyncProcessText,
        name: "proposalNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractPercentage",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "totalAmount",
      });

      for (let i = 0; i < yearDelta; i++) {
        values[designer.desid].push({ value: asyncProcessText, name: "proposalNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractPercentageY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "totalAmountY" + String(i) });
      }
  
      for (let i = 0; i < monthDelta; i++) {
        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - i);
        tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
        values[designer.desid].push({ value: asyncProcessText, name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
      }

    }

    if (firstLoad) {

      ajaxJson({ mode: "total" }, S3HOST + "/designerAboutComplete", { equal: true }).then((c) => {
        completeAnalyticsRows = c;
        return ajaxJson({ noFlat: true, whereQuery: { $or: [ { "proposal.date": { $gte: past } }, { "process.status": { $regex: "^[대진]" } } ] } }, BACKHOST + "/getProjects", { equal: true });
      }).then((projects) => {

        instance.completeAnalyticsRows = completeAnalyticsRows;
        instance.projects = projects;
        instance.normalMatrix = {};
        for (let designer of instance.designers) {

          instance.normalMatrix[designer.desid] = [];

          thisValueDoms = [ ...document.querySelector('.' + designer.desid).querySelectorAll('.' + valueTargetClassName) ];
  
          filteredProjectsProposal = projects.filter((p) => {
            return p.proposal.detail.some((obj) => {
              return obj.desid === designer.desid
            });
          });
  
          filteredProjectsContract = projects.filter((p) => {
            return p.desid === designer.desid;
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "processPending");
          thisValueTemp = filteredProjectsContract.filter((p) => { return /^대/.test(p.process.status) }).length;
          thisTarget.textContent = String(thisValueTemp);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "processPending",
            value: String(thisValueTemp),
          });

          thisTarget = findByAttribute(thisValueDoms, "name", "processDoing");
          thisValueTemp = filteredProjectsContract.filter((p) => { return /^진/.test(p.process.status) }).length;
          thisTarget.textContent = String(thisValueTemp);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "processDoing",
            value: String(thisValueTemp),
          });

          // thisTarget = findByAttribute(thisValueDoms, "name", "checklistDone");
          // thisValueTemp = (completeAnalyticsRows[designer.desid]?.aboutUpdateComplete === 1) ? "완료" : "미완료";
          // thisTarget.textContent = String(thisValueTemp);
          // thisTarget.style.color = colorChip.black;
          // instance.normalMatrix[designer.desid].push({
          //   name: "checklistDone",
          //   value: String(thisValueTemp),
          // });

          thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumber");
          thisTarget.textContent = String(filteredProjectsProposal.length);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "proposalNumber",
            value: filteredProjectsProposal.length,
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractNumber");
          thisTarget.textContent = String(filteredProjectsContract.length);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "contractNumber",
            value: filteredProjectsContract.length,
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentage");
          thisTarget.textContent = String(Math.round((filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length)) * 10000) / 100) + '%';
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "contractPercentage",
            value: filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length),
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "totalAmount");
          thisTarget.textContent = autoComma(Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "totalAmount",
            value: Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0)),
          });
  
          for (let i = 0; i < yearDelta; i++) {
  
            thisYear = (new Date()).getFullYear() - i;
            from = new Date(thisYear, 0, 1);
            to = new Date(thisYear + 1, 0, 1);
    
            filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
              return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
            });
    
            filteredFilteredProjectsContract = filteredProjectsContract.filter((p) => {
              return (p.process.contract.first.date.valueOf() >= from.valueOf() && p.process.contract.first.date.valueOf() < to.valueOf());
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "proposalNumberY" + String(i),
              value: filteredFilteredProjectsProposal.length,
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsContract.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "contractNumberY" + String(i),
              value: filteredFilteredProjectsContract.length,
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentageY" + String(i));
            thisTarget.textContent = String(Math.round((filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length)) * 10000) / 100) + '%';
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "contractPercentageY" + String(i),
              value: filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length),
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "totalAmountY" + String(i));
            thisTarget.textContent = autoComma(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "totalAmountY" + String(i),
              value: Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0)),
            });
    
          }
    
          for (let i = 0; i < monthDelta; i++) {
            thisDate = new Date();
            thisDate.setMonth(thisDate.getMonth() - i);
            from = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
            to = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
            to.setMonth(to.getMonth() + 1);
            filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
              return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
            });
            thisTarget = findByAttribute(thisValueDoms, "name", "monthDelta" + String(thisDate.getFullYear()).slice(2) + String(thisDate.getMonth() + 1));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "monthDelta" + String(thisDate.getFullYear()).slice(2) + String(thisDate.getMonth() + 1),
              value: filteredFilteredProjectsProposal.length,
            });
          }
  
        }
  
        return instance.normalColorSync();
  
      }).catch((err) => { console.log(err); });

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.normalDataRender(false));

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalWhiteCard = function (desid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      const designer = instance.designers.find((d) => { return d.desid === desid });
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;
      let iframeMaker;
      let linkDictionary;
      let isCxMember;

      isCxMember = await GeneralJs.nonCxBan(true);
      linkDictionary = {
        checklist: BACKHOST + "/middle/designerAbout?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        process: BACKHOST + "/middle/designerBoard?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        possible: BACKHOST + "/middle/designerPossible?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        portfolio: BACKHOST + "/designer?mode=general&desid=" + designer.desid + "&dataonly=true&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        report: BACKHOST + "/middle/designerReport?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
      }

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      iframeMaker = (mode) => {
        const src = linkDictionary[mode];
        return function (e) {
          const whiteTong = document.querySelector('.' + whiteBaseClassName);
          const toggle = this.getAttribute("off");
          const desid = this.getAttribute("desid");
          const siblings = Array.from(document.querySelectorAll('.' + titleButtonsClassName));
          whiteTong.removeChild(whiteTong.firstChild);
          createNode({
            mother: whiteTong,
            mode: "iframe",
            attribute: { src },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          });
          this.setAttribute("toggle", "on");
          this.style.color = colorChip.green;
          for (let dom of siblings) {
            if (dom !== this) {
              dom.setAttribute("toggle", "off");
              dom.style.color = colorChip.black;    
            }
          }
          instance.whiteCardMode = mode;
        }
      }

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          attribute: {
            desid: desid
          },
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          child: {
            mode: "iframe",
            attribute: {
              src: linkDictionary[instance.whiteCardMode],
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
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                attribute: { designer: designer.designer, phone: designer.information.phone.replace(/[^0-9]/gi, '') },
                event: {
                  click: function (e) {
                    const designer = this.getAttribute("designer");
                    const phone = this.getAttribute("phone");
                    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                    if (window.confirm(designer + " 실장님께 전화를 걸까요?")) {
                      ajaxJson({
                        who: cookies.homeliaisonConsoleLoginedEmail,
                        phone: phone
                      }, BACKHOST + "/callTo").catch((err) => { console.log(err); });
                    }
                  }
                },
                text: designer.designer,
                style: {
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { desid: desid },
                event: {
                  click: async function (e) {
                    try {
                      const desid = this.getAttribute("desid");
                      await window.navigator.clipboard.writeText(desid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: designer.desid,
                style: {
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  marginLeft: String(fontBetween) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                  cursor: "pointer",
                }
              },
              {
                style: {
                  display: "flex",
                  position: "absolute",
                  bottom: String(0),
                  right: String(0),
                  flexDirection: "row",
                  alignItems: "end",
                  justifyContent: "end",
                },
                children: [
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "checklist" ? "on" : "off"), desid, mode: "checklist" },
                    event: {
                      click: iframeMaker("checklist"),
                    },
                    text: "체크리스트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "checklist" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "possible" ? "on" : "off"), desid, mode: "process" },
                    event: {
                      click: iframeMaker("process"),
                    },
                    text: "프로젝트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "process" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "possible" ? "on" : "off"), desid, mode: "possible" },
                    event: {
                      click: iframeMaker("possible"),
                    },
                    text: "일정 관리",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "possible" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "portfolio" ? "on" : "off"), desid, mode: "portfolio" },
                    event: {
                      click: iframeMaker("portfolio"),
                    },
                    text: "포트폴리오",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "portfolio" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "report" ? "on" : "off"), desid, mode: "report" },
                    event: {
                      click: iframeMaker("report"),
                    },
                    text: "리포트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "report" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref("/file?mode=designer&desid=" + desid);
                      }
                    },
                    text: "디자이너 폴더",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref(FRONTHOST + "/designer/dashboard.php?desid=" + desid + "&view=test");
                      }
                    },
                    text: "디자이너 콘솔",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                ]
              }
            ]
          }
        });
      }

      instance.whiteMaker = whiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

BuilderJs.prototype.normalSendNotice = function (method, desid, untilDate) {
  const instance = this;
  const { ea, totalContents, designers } = this;
  const { ajaxJson } = GeneralJs;
  const dateToUntilString = (date) => {
    let temp;
    temp = String(date.getFullYear()).slice(2);
    temp += "년";
    temp += " ";
    temp += String(date.getMonth() + 1);
    temp += "월";
    temp += " ";
    temp += String(date.getDate());
    temp += "일";
    temp += "까지";
    return temp;
  }
  let tempValue;
  let untilString;
  if (method === "checklist") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }
        if (window.confirm(designer.designer + " 실장님께 체크리스트 기입 요청 알림톡을 전송할까요?")) {
          tempValue = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");
          if (tempValue !== null) {
            untilString = dateToUntilString(tempValue);
            const response = await ajaxJson({
              mode: "send",
              desid: designer.desid,
              designer: designer.designer,
              phone: designer.information.phone,
              type: "until",
              until: untilString,
            }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
            if (response.message === "success") {
              window.alert("전송에 성공하였습니다!");
            } else {
              window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
            }
            window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
          }
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "console") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 디자이너 콘솔 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "console",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "profile") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 프로필 사진 업로드 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "profile",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "work") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 작업 사진 업로드 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "work",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "career") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 경력 및 학력 업데이트 요청 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "career",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalChecklist") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "until",
          until: dateToUntilString(untilDate),
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalProfile") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "profile",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalWork") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "work",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
}

BuilderJs.prototype.normalBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const designerSubMenuEventFactorClassName = "designerSubMenuEventFactorClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let normalContentsLoad;
    let circleRight, circleTop;
    let importantMarkingEvent;
    let designerSubMenuEvent;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 80;
    menuPromptHeight = 28;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 230;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    ({ standards, columns, values } = await this.normalDataRender(true));
  
    hoverEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: menuEventTong[thisFunctionName](...thisArguments),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
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
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    importantMarkingEvent = (desid) => {
      return async function (e) {
        e.preventDefault();
        try {
          const circles = this.querySelectorAll('.' + importantCircleClassName);
          const desid = this.getAttribute("desid");
          let onoff;
          let whereQuery, updateQuery;

          for (let circle of circles) {
            if (circle.getAttribute("toggle") === "on") {
              circle.style.display = "none";
              circle.setAttribute("toggle", "off");
              onoff = "off";
            } else {
              circle.style.display = "inline-block";
              circle.setAttribute("toggle", "on");
              onoff = "on";
            }
          }

          whereQuery = { desid };
          if (onoff === "on") {
            updateQuery = { important: true };
          } else {
            updateQuery = { important: false };
          }

          await ajaxJson({
            id: desid,
            column: "important",
            value: updateQuery.important ? 1 : 0,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
          }, BACKHOST + "/updateDesignerHistory");
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    designerSubMenuEvent = (desid, designer) => {
      return async function (e) {
        e.preventDefault();
        try {
          const px = "px";
          const zIndex = 4;
          const contextMenu = [
            {
              title: designer + " 실장님께 체크리스트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("checklist", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 콘솔 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("console", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 프로필 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("profile", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 작업 사진 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("work", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 경력 업데이트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("career", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
          ];
          const thisBox = this.getBoundingClientRect();
          const { x, y } = e;
          let cancelBack, contextBase;

          cancelBack = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            event: {
              click: (e) => { removeByClass(designerSubMenuEventFactorClassName) },
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          contextBase = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            style: {
              display: "inline-block",
              position: "fixed",
              top: String(y + contextIndent) + px,
              left: String(x + (contextIndent / 2)) + px,
              padding: String(contextButtonOuterMargin) + ea,
              paddingBottom: String(contextButtonOuterMargin - contextButtonInnerMargin) + ea,
              background: colorChip.white,
              borderRadius: String(5) + px,
              boxShadow: "3px 0px 15px -9px " + colorChip.shadow,
              zIndex: String(zIndex),
              animation: "fadeuplite 0.3s ease forwards",
            }
          })

          for (let obj of contextMenu) {
            createNode({
              mother: contextBase,
              event: {
                click: obj.func(desid),
              },
              style: {
                display: "flex",
                width: String(contextButtonWidth) + ea,
                height: String(contextButtonHeight) + ea,
                background: colorChip.gradientGray,
                borderRadius: String(5) + px,
                marginBottom: String(contextButtonInnerMargin) + ea,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              },
              child: {
                text: obj.title,
                style: {
                  fontSize: String(contextButtonSize) + ea,
                  fontWeight: String(contextButtonWeight),
                  color: colorChip.white,
                  position: "relative",
                  display: "inline-block",
                  top: String(contextButtonTextTop) + ea,
                }
              }
            });
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    normalContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.normalDataRender(true));
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let designer of instance.designers) {
      
          createNode({
            mother: idNameArea,
            attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
            event: {
              click: instance.normalWhiteCard(designer.desid),
              dblclick: importantMarkingEvent(designer.desid),
              contextmenu: designerSubMenuEvent(designer.desid, designer.designer),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[designer.desid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                  next: {
                    class: [ importantCircleClassName ],
                    attribute: { toggle: designer.important ? "on" : "off" },
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: designer.important ? "inline-block" : "none",
                      position: "absolute",
                      transform: "scale(0.4)",
                      transformOrigin: "100% 0%",
                      right: String(index === 0 ? 0 : circleRight) + ea,
                      top: String(circleTop) + ea,
                      zIndex: String(0),
                    }
                  }
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { desid: designer.desid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {
            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      desid: designer.desid,
                      name: values[designer.desid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[designer.desid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[designer.desid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
    
        }
    
        await this.normalColorSync();

      } catch (e) {
        console.log(e);
      }
    }

    await normalContentsLoad(false);
    this.normalContentsLoad = normalContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          const designers = await ajaxJson({ noFlat: true, query: value }, BACKHOST + "/searchDesigners", { equal: true });
          const histories = await ajaxJson({
            method: "designer",
            property: [ "manager", "important" ],
            idArr: designers.map((d) => { return d.desid }),
          }, BACKHOST + "/getHistoryProperty", { equal: true });

          for (let designer of designers) {
            designer.manager = histories[designer.desid].manager;
            designer.important = histories[designer.desid].important;
          }

          instance.designers = designers;
          await instance.normalContentsLoad(true);
          
          setQueue(async () => {
            try {
              if (instance.designers.length === 1) {
                const tempFunc = instance.normalWhiteCard(instance.designers[0].desid);
                await tempFunc({});
              }
            } catch (e) {
              console.log(e);
            }
          }, 350);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalDetailSearchEvent = async function () {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
  const detailSearchClassName = "detailSearchClassName";
  try {
    this.searchInput.addEventListener("contextmenu", async function (e) {
      e.preventDefault();
      try {
        const zIndex = 4;
        let cancelBack, whiteBase;
        let margin;
        let titleSize;
        let titleWeight;
        let fontSize;
        let fontWeight;

        margin = 30;

        titleSize = 21;
        titleWeight = 800;

        fontSize = 14;
        fontWeight = 400;

        cancelBack = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          event: {
            click: (e) => {
              removeByClass(detailSearchClassName);
            },
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: colorChip.black,
            opacity: String(0.3),
            zIndex: String(zIndex),
          }
        });

        whiteBase = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          style: {
            position: "fixed",
            top: String(margin) + ea,
            left: String(margin) + ea,
            width: withOut(margin * 2, ea),
            height: withOut((margin * 2) + belowHeight, ea),
            zIndex: String(zIndex),
            background: colorChip.white,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            borderRadius: String(5) + "px",
          }
        });



      } catch (e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalProcessDetailEvent = async function (proid, desid) {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight, grayBarWidth, processDetailEventClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
  try {
    const zIndex = 4;
    let cancelBack, whiteBase;
    let margin;
    let titleSize;
    let titleWeight;
    let fontSize;
    let fontWeight;

    margin = 30;

    titleSize = 21;
    titleWeight = 800;

    fontSize = 14;
    fontWeight = 400;

    cancelBack = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      event: {
        click: (e) => {
          removeByClass(processDetailEventClassName);
        },
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(grayBarWidth) + ea,
        width: withOut(grayBarWidth, ea),
        height: withOut(0, ea),
        background: colorChip.black,
        opacity: String(0.3),
        zIndex: String(zIndex),
      }
    });

    whiteBase = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      style: {
        position: "fixed",
        top: String(margin) + ea,
        left: String(grayBarWidth + margin) + ea,
        width: withOut((margin * 2) + grayBarWidth, ea),
        height: withOut((margin * 2) + belowHeight, ea),
        zIndex: String(zIndex),
        background: colorChip.white,
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    });

    createNode({
      mother: whiteBase,
      mode: "iframe",
      attribute: {
        src: BACKHOST + "/process?proid=" + proid + "&entire=true&dataonly=true",
      },
      style: {
        display: "display",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
        outline: String(0),
        borderRadius: String(5) + "px",
      }
    })

  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalMessageEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, processDetailEventClassName } = this;
  const { findByAttribute, ajaxJson, removeByClass } = GeneralJs;
  try {
    window.addEventListener("message", async function (e) {
      try {
        const data = JSON.parse(e.data);
        if (typeof data === "object" && data !== null) {
          if (data.type === "whiteConverting") {
            if (document.querySelector('.' + whiteBaseClassName) !== null) {
              if (findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode) !== null) {
                findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode).click();
              }
            }
          } else if (data.type === "checklistUpdate") {
            let designers;
            let histories;

            ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true }).then((de) => {
              designers = de;
              return ajaxJson({
                method: "designer",
                property: [ "manager", "important" ],
                idArr: designers.map((d) => { return d.desid }),
              }, BACKHOST + "/getHistoryProperty", { equal: true });
            }).then((h) => {
              histories = h;
              for (let designer of designers) {
                designer.manager = histories[designer.desid].manager;
                designer.important = histories[designer.desid].important;
              }
              instance.designers = designers;
              return instance.normalContentsLoad(true);
            }).catch((err) => {
              console.log(err);
            });

          } else if (data.type === "processDetail") {
            removeByClass(whiteCardClassName);
            await instance.normalProcessDetailEvent(data.proid, data.desid);
          } else if (data.type === "returnToPast") {
            const tempFunction = instance.normalWhiteCard(document.querySelectorAll('.' + processDetailEventClassName)[1].getAttribute("desid"));
            removeByClass(processDetailEventClassName);
            await tempFunction({});
          }
        }
      } catch {}
    })
  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalExtractEvent = async function () {
  const instance = this;
  const { ajaxJson, blankHref } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        if (instance.normalMatrix === null) {
          window.alert("잠시 기다렸다가 다시 시도해주세요!");
        } else {
          const today = new Date();
          const data = await instance.normalDataRender(false);
          let thisName;
          let thisObject;
          let matrix;
          let tempArr;
          let thisDesigner;

          for (let desid in data.values) {
            for (let obj of data.values[desid]) {
              thisName = obj.name;
              thisObject = instance.normalMatrix[desid].find((obj) => { return obj.name === thisName });
              if (thisObject !== undefined) {
                obj.value = thisObject.value;
              }
            }
          }

          console.log(data);

          matrix = [];
          tempArr = [
            "아이디",
            "이름",
            // -------------------------------
            // add
            "이메일",
            "계좌번호",
            "사업자 분류",
            "사업자 등록번호",
            // -------------------------------
          ];
          for (let obj of data.columns) {
            tempArr.push(obj.title);
          }
          matrix.push(tempArr);

          for (let desid in data.values) {

            thisDesigner = instance.designers.find((d) => { return d.desid === desid });

            tempArr = [];
            tempArr.push(desid);
            tempArr.push(thisDesigner.designer);

            // -------------------------------
            // add
            tempArr.push(thisDesigner.information.email);
            tempArr.push(thisDesigner.information.business.account.length > 0 ? thisDesigner.information.business.account[0].bankName + " " + thisDesigner.information.business.account[0].accountNumber : "");
            tempArr.push(thisDesigner.information.business.businessInfo.classification);
            tempArr.push(thisDesigner.information.business.businessInfo.businessNumber);
            // -------------------------------

            for (let obj of data.columns) {
              thisObject = data.values[desid].find((o) => { return o.name === obj.name });
              tempArr.push(thisObject.value);
            }
            matrix.push(tempArr);
          }

          instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
          ajaxJson({
            values: matrix,
            newMake: true,
            parentId: parentId,
            sheetName: "fromDB_designer_" + String(today.getFullYear()) + instance.mother.todayMaker()
          }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
            blankHref(result.link);
          }).catch((err) => {
            console.log(err);
          })

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.normalReportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    target.style.color = GeneralJs.colorChip.black;
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
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let iframeMaker;
      let linkDictionary;
      let base, scrollBox;
      let titleArea;
      let basePaddingTop;
      let basePaddingBottom;
      let divideNumber;
      let lineBetween;
      let linePaddingLeft;
      let wordingSize;
      let linePaddingTop;
      let linePaddingBottom;
      let designerSize;
      let desidSize;
      let subTitleLeft;
      let subTitleBottom;
      let data;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let style;
      let startPaddingTop;
      let todayRange, dateInput;
      let todayString;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;

      today = new Date();
      ago = 30;
      agoDate = new Date();
      agoDate.setDate(agoDate.getDate() - ago);

      margin = 30;
      titleHeight = 58;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      basePaddingTop = 10;
      basePaddingBottom = 6;
      divideNumber = 4;
      lineBetween = 4;
      linePaddingLeft = 16;
      wordingSize = 14;
      linePaddingTop = isMac() ? 10 : 12;
      linePaddingBottom = isMac() ? 11 : 11;
      designerSize = 16;
      desidSize = 11;
      subTitleLeft = 1;
      subTitleBottom = isMac() ? 6 : 4;
      startPaddingTop = 10;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 20;
      inputWeight = 500;

      subTodaySize = 13;
      subTodayWeight = 200;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: String(titleHeight) + ea,
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: withOut(titleHeight + startPaddingTop, ea),
                paddingTop: String(startPaddingTop) + ea,
                overflow: "scroll",
              },
            }
          ]
        });

        [ titleArea, scrollBox ] = Array.from(whitePrompt.children);

        todayRange = dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2);
        todayString = dateToString(new Date());

        dateInput = createNode({
          mode: "input",
          attribute: {
            type: "text",
          },
          event: {
            focus: function (e) {
              this.style.color = colorChip.green;
              GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
            },
            blur: function (e) {
              vaildValue(this);
            },
            keyup: function (e) {
              if (e.key === "Enter") {
                vaildValue(this);
                const dateArr = this.value.split(" ~ ");
                const startDay = "20" + dateArr[0];
                const endDay = "20" + dateArr[1];

                this.blur();

                cleanChildren(scrollBox);

                loading = instance.mother.returnLoadingIcon();
                style = {
                  position: "absolute",
                  width: String(loadingWidth) + ea,
                  height: String(loadingWidth) + ea,
                  top: withOut(50, loadingWidth / 2, ea),
                  left: withOut(50, loadingWidth / 2, ea),
                }
                for (let i in style) {
                  loading.style[i] = style[i];
                }
                whitePrompt.appendChild(loading);

                ajaxJson({
                  mode: "designer",
                  start: stringToDate(startDay),
                  end: stringToDate(endDay)
                }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
            fontFamily: "graphik",
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "today : " + todayString,
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            color: colorChip.green,
            fontFamily: "graphik",
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.appendChild(loading);

        dataLoad = (loading) => {
          return (data) => {
            loading.remove();
            cleanChildren(scrollBox);
  
            for (let designer of data.designers) {
        
              designer.proposal = designer.proposal.filter((obj) => { return obj.amount !== 0 });
              designer.process = designer.process.filter((obj) => { return obj.amount !== 0 });
              designer.first = designer.first.filter((obj) => { return obj.amount !== 0 });
              designer.remain = designer.remain.filter((obj) => { return obj.amount !== 0 });
          
              base = createNode({
                mother: scrollBox,
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  paddingTop: String(basePaddingTop) + ea,
                  paddingBottom: String(basePaddingBottom) + ea,
                }
              });
          
              createNode({
                mother: base,
                class: [ "hoverDefault_lite" ],
                attribute: { desid: designer.desid },
                event: {
                  click: function (e) {
                    blankHref(FRONTHOST + "/designer/report.php?desid=" + this.getAttribute("desid"));
                  }
                },
                text: `${designer.designer}&nbsp;&nbsp;<b%${designer.desid}%b>`,
                style: {
                  display: "inline-block",
                  fontSize: String(designerSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.black,
                  marginLeft: String(subTitleLeft) + ea,
                  marginBottom: String(subTitleBottom) + ea,
                },
                bold: {
                  fontSize: String(desidSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.green
                }
              });
          
              tong = createNode({
                mother: base,
                style: {
                  display: "block",
                  borderRadius: String(5) + "px",
                  border: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",
                  width: String(100) + '%',
                }
              });
          
              for (let i = 0; i < divideNumber; i++) {
                area = createNode({
                  mother: tong,
                  style: {
                    display: "inline-block",
                    width: String(100 / divideNumber) + '%',
                    borderRight: i === divideNumber - 1 ? "" : "1px dashed " + colorChip.gray3,
                    verticalAlign: "top",
                    paddingTop: String(linePaddingTop) + ea,
                    paddingBottom: String(linePaddingBottom) + ea,
                    boxSizing: "border-box",
                  }
                });
                if (i === 0) {
          
                  createNode({
                    mother: area,
                    text: `<b%제안 횟수%b> : ${String(designer.proposal.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 누계%b> : ${autoComma(designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평단가 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else if (i === 1) {
          
                  createNode({
                    mother: area,
                    text: `<b%계약 횟수%b> : ${String(designer.process.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 누계%b> : ${autoComma(designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평균%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평단가%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
        
                } else if (i === 2) {
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 횟수%b> : ${String(designer.first.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 누계%b> : ${autoComma(designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 평균%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.first.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.first.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else {
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 횟수%b> : ${String(designer.remain.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 누계%b> : ${autoComma(designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 평균%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.remain.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.remain.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                }
              }
          
            }
          }
        }

        ajaxJson({
          mode: "designer",
          start: fromDate,
          end: toDate
        }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(agoDate, today, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(agoDate, today, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

BuilderJs.prototype.normalReportEvent = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.mother.belowButtons.square.reportIcon.addEventListener("click", instance.normalReportWhite());
  } catch (e) {
    console.log(e);
  }
}

BuilderJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, sleep, blankHref } = GeneralJs;
  communication.setItem([
    () => { return "체크리스트 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        let tempRes;
        let untilDate;
        untilDate = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");

        if (untilDate !== null) {
          for (let designer of targetDesigners) {
            asyncTempFunc = instance.normalSendNotice("totalChecklist", designer.desid, untilDate);
            tempRes = await asyncTempFunc();
            if (tempRes === null) {
              throw new Error("send fail");
            }
          }
          window.alert("체크리스트 전체 발송에 성공하였습니다!");
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }

      } catch (e) {
        console.log(e);
        window.alert("체크리스트 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "미완료 대상 체크리스트 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const logs = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        const sendDesids = logs.filter((o) => { return o.type === "checklist" }).map((o) => { return o.designer.desid });
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) }).filter((d) => { return !sendDesids.includes(d.desid) });
        let asyncTempFunc;
        let tempRes;
        let untilDate;
        untilDate = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");
        if (untilDate !== null) {
          for (let designer of targetDesigners) {
            asyncTempFunc = instance.normalSendNotice("totalChecklist", designer.desid);
            tempRes = await asyncTempFunc();
            if (tempRes === null) {
              throw new Error("send fail");
            }
          }
        }
        window.alert("미완료 대상 체크리스트 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("미완료 대상 체크리스트 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "프로필 요청 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        for (let designer of targetDesigners) {
          asyncTempFunc = instance.normalSendNotice("totalProfile", designer.desid);
          tempRes = await asyncTempFunc();
          if (tempRes === null) {
            throw new Error("send fail");
          }
        }
        window.alert("프로필 요청 전체 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("프로필 요청 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "작업물 요청 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        for (let designer of targetDesigners) {
          asyncTempFunc = instance.normalSendNotice("totalWork", designer.desid);
          tempRes = await asyncTempFunc();
          if (tempRes === null) {
            throw new Error("send fail");
          }
        }
        window.alert("작업물 요청 전체 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("작업물 요청 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "체크리스트 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("checklist", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "프로필 업로드 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("profile", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "작업 사진 업로드 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("work", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "경력 업데이트 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("career", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
}

BuilderJs.prototype.normalView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, returnGet } = GeneralJs;
    const getObj = returnGet();
    let loading;
    let designers;
    let histories;
    let members;
    let importants;
    let noticeSendRows;
    let profileList, workList;
    let representativeList;
    let execFunc;

    loading = await this.mother.loadingRun();

    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    histories = await ajaxJson({
      method: "designer",
      property: [ "manager", "important" ],
      idArr: designers.map((d) => { return d.desid }),
    }, BACKHOST + "/getHistoryProperty", { equal: true });

    for (let designer of designers) {
      designer.manager = histories[designer.desid].manager;
      designer.important = histories[designer.desid].important;
    }

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    noticeSendRows = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
    profileList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerProfileList", { equal: true });
    workList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerWorksList", { equal: true });
    representativeList = await ajaxJson({ target: "$all" }, BRIDGEHOST + "/representativeFileRead", { equal: true });

    this.members = members;
    this.designers = designers;
    this.projects = null;
    this.normalMatrix = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = "checklist";
    this.asyncProcessText = "로드중..";
    this.noticeSendRows = noticeSendRows;
    this.profileList = profileList;
    this.workList = workList;
    this.representativeList = representativeList;

    await this.normalBase();
    await this.normalSearchEvent();
    await this.normalDetailSearchEvent();
    await this.normalMessageEvent();
    await this.normalExtractEvent();
    await this.normalReportEvent();
    this.communicationRender();

    loading.parentNode.removeChild(loading);

    if (typeof getObj.desid === "string" && /^d/gi.test(getObj.desid)) {
      execFunc = instance.normalWhiteCard(getObj.desid);
      await execFunc(new Event("click", { bubbles: true }));
    }

  } catch (e) {
    console.log(e);
  }
}


BuilderJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, getUser } = GeneralJs;
  try {
    const getObj = returnGet();
    const modulePath = "/module/builder";
    let getTarget;
    let tempFunction;

    this.user = getUser();
    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.desid !== undefined && getObj.mode === undefined) {
      getObj.mode = "construct";
    }

    getTarget = null;
    if (getObj.mode === "construct") {

      this.grayBarWidth = 0;
      this.mother.grayBarWidth = 0;
      document.getElementById("grayLeftOpenButton").remove();
      await this.constructView();
      this.addTransFormEvent();
      document.getElementById("moveRightArea").style.display = "none";
      document.getElementById("moveLeftArea").style.display = "none";

    } else if (getObj.mode === "estimation") {

      this.grayBarWidth = 0;
      this.mother.grayBarWidth = 0;
      document.getElementById("grayLeftOpenButton").remove();
      await this.estimationView();
      this.addTransFormEvent();
      document.getElementById("moveRightArea").style.display = "none";
      document.getElementById("moveLeftArea").style.display = "none";

    } else if (getObj.mode === "normal") {

      document.getElementById("grayLeftOpenButton").remove();
      await this.normalView();

    } else {

      tempFunction = this.cardViewMaker(true);
      await tempFunction();
      document.getElementById("grayLeftOpenButton").remove();
      this.addTransFormEvent();
      document.getElementById("moveRightArea").style.display = "none";
      document.getElementById("moveLeftArea").style.display = "none";

    }

    window.addEventListener("keypress", (e) => {
      if (e.key === "Ω" || (e.altKey && e.key === "z") || (e.altKey && e.key === "Z")) {
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname;
      }
    });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
