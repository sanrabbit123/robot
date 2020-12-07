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
}

DesignerJs.prototype.standardBar = function (standard) {
  const instance = this;
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;

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
      div_clone3.addEventListener("click", function (e) {
        let h, arr, toggle;
        h = document.createDocumentFragment();
        arr = [];
        toggle = Number(instance.standardDoms[0].getAttribute("sort"));
        for (let i = 1; i < instance.standardDoms.length; i++) {
          arr.push(instance.standardDoms[i]);
        }
        arr.sort((a, b) => {
          if (a.children[0].textContent < b.children[0].textContent) {
            return toggle ? -1 : 1;
          }
          if (a.children[0].textContent > b.children[0].textContent) {
            return toggle ? 1 : -1;
          }
          return 0;
        });
        for (let div of arr) {
          h.appendChild(div);
        }
        div_clone.appendChild(h);
        instance.standardDoms[0].setAttribute("sort", String(toggle ? 0 : 1));
      });
    }
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = designer;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[1]) + ea;
    if (num === 0) {
      div_clone3.addEventListener("click", function (e) {
        let h, arr, toggle;
        h = document.createDocumentFragment();
        arr = [];
        toggle = Number(instance.standardDoms[0].getAttribute("sort"));
        for (let i = 1; i < instance.standardDoms.length; i++) {
          arr.push(instance.standardDoms[i]);
        }
        arr.sort((a, b) => {
          if (a.children[1].textContent < b.children[1].textContent) {
            return toggle ? -1 : 1;
          }
          if (a.children[1].textContent > b.children[1].textContent) {
            return toggle ? 1 : -1;
          }
          return 0;
        });
        for (let div of arr) {
          h.appendChild(div);
        }
        div_clone.appendChild(h);
        instance.standardDoms[0].setAttribute("sort", String(toggle ? 0 : 1));
      });
    }
    div_clone2.appendChild(div_clone3);

    div_clone2.style.cursor = "pointer";
    if (num !== 0) {
      div_clone2.addEventListener("click", this.whiteViewMaker(num));
      div_clone2.addEventListener("contextmenu", this.makeNotionEvent(desid, num));
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

  temp = {};
  columns = [];
  leftPosition = [];
  widthArr = [];
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
      const targets = document.querySelectorAll(".moveTarget");
      const ea = "px";
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

  updateEventFunction = function (left) {
    return function (e) {
      e.preventDefault();
      (eventFunction(left))(e);

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
        window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
        GeneralJs.stacks["addressEvent"] = null;
      }
      const updateValueEvent = async function (e) {
        let thisId, requestIndex, column;
        let idDom;
        let mothers, targetDom;
        let originalDiv = this.parentNode;
        let finalValue;
        let pastRawData;

        if ((e.type === "keypress" && GeneralJs.confirmKeyCode.includes(e.keyCode)) || e.type === "click" || e.type === "message") {

          idDom = this.parentNode.parentNode;

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
          column = this.parentNode.getAttribute("column");

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

        if (thisMap.items !== undefined) {

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
              paddingTop: String(height * 0.3) + ea,
              height: String(height * 1.5) + ea,
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

        } else if (thisMap.address !== undefined) {

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
      div_clone3.style.width = String(widthArr[z]) + ea;
      div_clone3.style.left = String(leftPosition[z]) + ea;
      div_clone3.setAttribute("column", columns[z]);
      div_clone3.addEventListener("contextmenu", updateEventFunction(leftPosition[z] - (window.innerWidth / 2) + grayBarWidth));

      if (num === 0) {
        div_clone3.addEventListener("click", function (e) {
          let h, arr, toggle;
          h = document.createDocumentFragment();
          arr = [];
          toggle = Number(instance.caseDoms[0].getAttribute("sort"));
          for (let i = 1; i < instance.caseDoms.length; i++) {
            arr.push(instance.caseDoms[i]);
          }

          arr.sort((a, b) => {
            if (/^[0-9]/.test(a.children[z].textContent) && !/\-/g.test(a.children[z].textContent)) {
              if (toggle) {
                return Number(a.children[z].textContent.replace(/[^0-9\.]/g, '')) - Number(b.children[z].textContent.replace(/[^0-9\.]/g, ''));
              } else {
                return Number(b.children[z].textContent.replace(/[^0-9\.]/g, '')) - Number(a.children[z].textContent.replace(/[^0-9\.]/g, ''));
              }
            } else {
              if (a.children[z].textContent < b.children[z].textContent) {
                return toggle ? -1 : 1;
              }
              if (a.children[z].textContent > b.children[z].textContent) {
                return toggle ? 1 : -1;
              }
              return 0;
            }
          });
          for (let div of arr) {
            h.appendChild(div);
          }
          div_clone.appendChild(h);
          instance.caseDoms[0].setAttribute("sort", String(toggle ? 0 : 1));
        });
      } else {
        div_clone3.addEventListener("click", eventFunction(leftPosition[z] - (window.innerWidth / 2) + grayBarWidth));
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

DesignerJs.prototype.spreadData = async function (search = null) {
  const instance = this;
  try {
    let designers, totalMother;
    let standardDataTong = [], infoDataTong = [];
    let standardDomsFirst, casesFirst;
    let standardDomsTargets, casesTargets;

    if (search === null) {
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
      casesFirst = this.cases.shift();
      this.standardDoms = [];
      this.cases = [];
      this.standardDoms.push(standardDomsFirst);
      this.cases.push(casesFirst);

      standardDomsTargets = this.totalMother.children[0].children;
      while (standardDomsTargets[2] !== undefined) {
        this.totalMother.children[0].removeChild(this.totalMother.children[0].lastChild);
      }
      casesTargets = this.totalMother.children[2].children;
      while (casesTargets[1] !== undefined) {
        this.totalMother.children[2].removeChild(this.totalMother.children[2].lastChild);
      }
    }

    this.standardBar({ standard: standard.standard, data: standardDataTong, search: search });
    this.infoArea({ standard: standard.info, data: infoDataTong, search: search });

  } catch (e) {
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
      let makeNotionEvent;

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
      makeNotionEvent = function (obj) {
        return async function (e) {
          if (e.cancelable) {
            e.preventDefault();
          }

          let thisCliid, requestIndex;

          const projects = await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ proid: obj.proid }), "/getProjects");
          thisCliid = JSON.parse(projects)[0].cliid;

          const tempProjects = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid: thisCliid }), "/getProjects"));
          for (let z = 0; z < tempProjects.length; z++) {
            if (tempProjects[z].proid === obj.proid) {
              requestIndex = z;
            }
          }

          const clients = await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ cliid: thisCliid }), "/getClients");
          const client = JSON.parse(clients)[0];
          const notionId = client.requests[requestIndex].request.notionId;
          if (notionId !== '') {
            window.open("https://notion.so/" + notionId.split('-')[0] + "?p=" + notionId.split('-')[1], "_blank");
          } else {
            alert("노션에 정보가 없습니다!");
          }
        }
      }

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
        top: String(titleTop) + ea,
        left: String(intend) + ea,
        color: "#404040",
        cursor: "pointer",
      };

      proidStyle = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(200),
        top: String(titleTop + (nameFontSize - fontSize + 2)) + ea,
        color: "#2fa678",
        cursor: "pointer",
      };

      barStyle = {
        position: "absolute",
        background: "#ececec",
        top: String(startTop + 13) + ea,
        left: String(intend) + ea,
        width: String(totalWidth) + ea,
        height: String(1) + ea,
      };

      //info style
      infoStyle = {
        position: "absolute",
        fontSize: String(fontSize) + ea,
        fontWeight: String(500),
        top: String(startTop + lineHeight) + ea,
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
        border: "1px dashed #2fa678",
        borderRadius: String(5) + ea,
      };

      areaNameStyle = {
        position: "absolute",
        top: String(margin * 0.9) + ea,
        left: String(margin * 1.7) + ea,
        fontSize: String(21) + ea,
        fontWeight: String(200),
        color: "#2fa678",
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

        //tong
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let i in areaTongStyle) {
          div_clone2.style[i] = areaTongStyle[i];
        }
        div_clone.appendChild(div_clone2);
        div_clone2.setAttribute("kinds", "area");
        div_clone2.setAttribute("name", divisionName[i].designer);
        div_clone2.setAttribute("desid", divisionName[i].desid);
        division.set(divisionName[i].desid, div_clone2);

        totalFather.appendChild(div_clone);
      }

      //make card
      instance.totalFatherChildren = [];

      whereQuery = {};
      whereQuery["$or"] = [];
      for (let i = 1; i < cases.length; i++) {
        whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "대기" });
        whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "진행중" });
        whereQuery["$or"].push({ desid: cases[i].desid, "process.status": "홀딩" });
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
        div_clone2.addEventListener("contextmenu", makeNotionEvent(obj));
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
        div_clone2.addEventListener("contextmenu", makeNotionEvent(obj));
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
          div_clone2.style.top = String(startTop + (lineHeight * (j + 1))) + ea;
          div_clone.appendChild(div_clone2);
        }

        div_clone.setAttribute("kinds", "card");
        div_clone.setAttribute("proid", obj.proid);
        div_clone.setAttribute("cliid", obj.cliid);

        division.get(obj.desid).appendChild(div_clone);

        instance.totalFatherChildren.push(div_clone);

        num++;
      }

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
  const { standard, info } = DataPatch.designerWhiteViewStandard();
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
  let fixedFontSizeConst;
  let notionEvent;

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
  notionEvent = instance.makeNotionEvent(thisCase[standard[1]], thisCase["index"]);

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
    bottom: String(leftMargin * (12 / 60)) + ea,
    left: String(leftMargin - 3) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone3.addEventListener("click", notionEvent);
  div_clone2.appendChild(div_clone3);

  //desid
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = thisCase[standard[1]];
  div_clone3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    color: "#2fa678",
    fontSize: String(titleFontSize * (19 / 42)) + ea,
    bottom: String(leftMargin * (17 / 60)) + ea,
    left: String(leftMargin * 3) + ea,
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
  hInitial.style.width = String(leftMargin * (10 / 60)) + ea;
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
  contentsBoxHeight = motherHeight - titleHeight - (topMargin * 2.4);
  contentsBoxBottom = topMargin * 0.9;
  lineHeightRatio = 29 / 16;
  fixedFontSizeConst = ((contentsBoxHeight / info.length) / 15.302673635919229) - lineHeightRatio;
  fontSize = (contentsBoxHeight / info.length) / (lineHeightRatio + fixedFontSizeConst);

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
        window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
        GeneralJs.stacks["addressEvent"] = null;
      }
      const updateValueEvent = async function (e) {
        let grandMother, mother;
        let thisId, requestIndex, column;
        let targetDom;
        let fatherTarget = null;
        let originalDiv = this.parentNode;
        let finalValue;
        let pastRawData;

        if ((e.type === "keypress" && GeneralJs.confirmKeyCode.includes(e.keyCode)) || e.type === "click" || e.type === "message") {
          grandMother = instance.whiteBox.contentsBox;
          mother = this.parentNode.parentNode;

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

        if (thisMap.items !== undefined) {

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
              paddingTop: String(height * 0.3) + ea,
              height: String(height * 1.5) + ea,
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

        } else if (thisMap.address !== undefined) {

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
      top: String(0) + ea,
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
  GeneralJs.ajax("desid=" + thisCase[standard[1]], "/realtimeDesigner", function (data) {
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
      top: String(0) + ea,
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
        color: (dateArr[j].onoff ? "#2fa678" : "#bbbbbb"),
      };
      for (let j in style) {
        div_clone5.style[j] = style[j];
      }
      div_clone5.setAttribute("onoff", (dateArr[j].onoff ? "true" : "false"))
      div_clone5.addEventListener("click", function (e) {
        if (this.getAttribute("onoff") === "true") {
          this.style.color = "#bbbbbb";
          this.setAttribute("onoff", "false");
        } else {
          this.style.color = "#2fa678";
          this.setAttribute("onoff", "true");
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
        top: String(0) + ea,
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
        background: "#f7f7f7",
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
          background: "white",
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
          top: String(0) + ea,
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
            window.open("https://home-liaison.com/portdetail.php?qqq=" + contents[i].contents.portfolio.pid, "_blank");
          });
        }
        div_clone.appendChild(div_clone2);

        //picture tong
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("noScrollBar");
        style = {
          position: "relative",
          top: String(titleHeight + (margin / 2)) + ea,
          left: String(0) + ea,
          background: "#f7f7f7",
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
      console.log(e);
    }
  });

  div_clone2.appendChild(portfolioBox);
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

  div_clone.appendChild(div_clone2);

  //end ---------------------------------------------
  mother.appendChild(div_clone);
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
    instance.totalContents.appendChild(div_clone);
    GeneralJs.stacks.whiteBox = 0;
  }
}

DesignerJs.prototype.whiteViewMaker = function (index) {
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

DesignerJs.prototype.reportScrollBox = function (data, motherWidth) {
  // const instance = this;
  // const report = JSON.parse(data);
  //
  // let div_clone, div_clone2;
  // let style;
  // let ea = "px";
  // let entireMargin;
  // let margin;
  // let scrollBox, boxTop, boxWidth, boxHeight, boxNumber;
  // let titleBox, titleTop;
  // let matrixTop, matrixBox, matrixWidth, matrixBoxMargin, matrixHeight;
  // let matrixStyle0, matrixStyle1;
  // let matrixFontSize;
  // let matrixOuterLine, matrixInnerLine;
  // let columnTop, columnLineHeight, columnPaddingTop;
  // let reportNumber;
  // let grayBar;
  // let summaryBox, summaryTong;
  //
  // margin = 18;
  // boxNumber = Math.floor((motherWidth - (margin * 3)) / (margin + 400));
  // boxHeight = 400;
  // boxWidth = (motherWidth - (margin * (boxNumber + 1 + 2))) / boxNumber;
  // boxTop = 90;
  //
  // //entire scroll box
  // scrollBox = GeneralJs.nodes.div.cloneNode(true);
  // scrollBox.classList.add("reportScrollBox");
  // entireMargin = margin * 2;
  // style = {
  //   position: "relative",
  //   top: String(boxTop) + ea,
  //   paddingLeft: String(entireMargin) + ea,
  //   paddingBottom: String(margin) + ea,
  //   width: String(motherWidth - entireMargin) + ea,
  //   height: "calc(100% - " + String(boxTop + margin) + ea + ")",
  //   overflow: "scroll",
  // };
  // for (let z in style) {
  //   scrollBox.style[z] = style[z];
  // }
  //
  // for (let i = 0; i < report.length; i++) {
  //
  //   //numbers
  //   titleTop = 18;
  //   columnTop = 0;
  //   columnLineHeight = 30;
  //   columnPaddingTop = 7;
  //   matrixFontSize = 14.5;
  //   matrixInnerLine = "1px solid #ececec";
  //   matrixOuterLine = "1px solid #cccccc";
  //   matrixTop = titleTop + 40;
  //   matrixBoxMargin = 23;
  //   matrixWidth = boxWidth - (matrixBoxMargin * 2) - 3;
  //   matrixHeight = 240;
  //   summaryTong = {
  //     client: 0,
  //     proposal: 0,
  //     contract: 0,
  //   };
  //
  //   //gray card
  //   div_clone = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     display: "inline-block",
  //     position: "relative",
  //     width: String(boxWidth) + ea,
  //     height: String(boxHeight) + ea,
  //     overflow: "scroll",
  //     marginRight: String(margin) + ea,
  //     marginBottom: String(margin) + ea,
  //     fontSize: String(15) + ea,
  //     background: "#f7f7f7",
  //     borderRadius: String(5) + ea,
  //   };
  //   for (let z in style) {
  //     div_clone.style[z] = style[z];
  //   }
  //
  //   //title gray bar
  //   grayBar = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     position: "absolute",
  //     width: String(matrixWidth) + ea,
  //     right: String(matrixBoxMargin + 1) + ea,
  //     top: String(titleTop + 14) + ea,
  //     height: String(0),
  //     borderTop: "1px solid #dddddd",
  //   };
  //   for (let z in style) {
  //     grayBar.style[z] = style[z];
  //   }
  //   div_clone.appendChild(grayBar);
  //
  //   //title
  //   titleBox = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     position: "absolute",
  //     paddingRight: String(12) + ea,
  //     fontSize: String(matrixFontSize + 6) + ea,
  //     left: String(matrixBoxMargin + 1) + ea,
  //     top: String(titleTop) + ea,
  //     fontWeight: String(200),
  //     background: "#f7f7f7",
  //   };
  //   for (let z in style) {
  //     titleBox.style[z] = style[z];
  //   }
  //   titleBox.textContent = `${report[i][0].startDay.split('-')[0]}-${report[i][0].startDay.split('-')[1]}`;
  //   div_clone.appendChild(titleBox);
  //
  //   //matrix
  //   matrixBox = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     position: "relative",
  //     width: String(matrixWidth) + ea,
  //     height: String(matrixHeight) + ea,
  //     top: String(matrixTop) + ea,
  //     left: String(matrixBoxMargin) + ea,
  //     borderRadius: String(5) + ea,
  //     border: matrixOuterLine,
  //     overflow: "hidden",
  //   };
  //   for (let z in style) {
  //     matrixBox.style[z] = style[z];
  //   }
  //
  //   //case name
  //   div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //   matrixStyle0 = {
  //     position: "absolute",
  //     fontSize: String(matrixFontSize) + ea,
  //     fontWeight: String(600),
  //     width: String(matrixWidth * (2 / 5)) + ea,
  //     textAlign: "center",
  //     left: String(0) + ea,
  //     paddingTop: String(columnPaddingTop) + ea,
  //     top: String(columnTop) + ea,
  //     height: String(columnLineHeight) + ea,
  //     borderBottom: matrixInnerLine,
  //     background: "white",
  //   };
  //   for (let z in matrixStyle0) {
  //     div_clone2.style[z] = matrixStyle0[z];
  //   }
  //   matrixBox.appendChild(div_clone2);
  //
  //   //client
  //   div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //   matrixStyle1 = JSON.parse(JSON.stringify(matrixStyle0));
  //   matrixStyle1.left = String(matrixWidth * (2 / 5)) + ea;
  //   matrixStyle1.width = String(matrixWidth * (1 / 5)) + ea;
  //   matrixStyle1.borderLeft = matrixInnerLine;
  //   for (let z in matrixStyle1) {
  //     div_clone2.style[z] = matrixStyle1[z];
  //   }
  //   div_clone2.textContent = "문의";
  //   matrixBox.appendChild(div_clone2);
  //
  //   //proposal
  //   div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //   matrixStyle1.left = String(matrixWidth * (3 / 5)) + ea;
  //   for (let z in matrixStyle1) {
  //     div_clone2.style[z] = matrixStyle1[z];
  //   }
  //   div_clone2.textContent = "제안";
  //   matrixBox.appendChild(div_clone2);
  //
  //   //contract
  //   div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //   matrixStyle1.left = String(matrixWidth * (4 / 5)) + ea;
  //   for (let z in matrixStyle1) {
  //     div_clone2.style[z] = matrixStyle1[z];
  //   }
  //   div_clone2.textContent = "계약";
  //   matrixBox.appendChild(div_clone2);
  //
  //   reportNumber = 0;
  //   for (let { startDay, endDay, client, proposal, contract } of report[i]) {
  //
  //     columnTop = columnTop + columnLineHeight + columnPaddingTop;
  //
  //     //case name
  //     div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //     matrixStyle0.top = String(columnTop) + ea;
  //     matrixStyle0.background = "";
  //     if (reportNumber === report[i].length - 1) {
  //       matrixStyle0.borderBottom = '';
  //     }
  //     for (let z in matrixStyle0) {
  //       div_clone2.style[z] = matrixStyle0[z];
  //     }
  //     div_clone2.textContent = `${startDay.split('-')[2]} ~ ${endDay.split('-')[2]}`;
  //     matrixBox.appendChild(div_clone2);
  //
  //     //client
  //     div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //     matrixStyle1.top = String(columnTop) + ea;
  //     matrixStyle1.left = String(matrixWidth * (2 / 5)) + ea;
  //     matrixStyle1.background = "";
  //     matrixStyle1.fontWeight = String(200);
  //     if (reportNumber === report[i].length - 1) {
  //       matrixStyle1.borderBottom = '';
  //     }
  //     for (let z in matrixStyle1) {
  //       div_clone2.style[z] = matrixStyle1[z];
  //     }
  //     div_clone2.textContent = String(client);
  //     matrixBox.appendChild(div_clone2);
  //     summaryTong.client += client;
  //
  //     //proposal
  //     div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //     matrixStyle1.left = String(matrixWidth * (3 / 5)) + ea;
  //     for (let z in matrixStyle1) {
  //       div_clone2.style[z] = matrixStyle1[z];
  //     }
  //     div_clone2.textContent = String(proposal);
  //     matrixBox.appendChild(div_clone2);
  //     summaryTong.proposal += proposal;
  //
  //     //contract
  //     div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  //     matrixStyle1.left = String(matrixWidth * (4 / 5)) + ea;
  //     for (let z in matrixStyle1) {
  //       div_clone2.style[z] = matrixStyle1[z];
  //     }
  //     div_clone2.textContent = String(contract);
  //     matrixBox.appendChild(div_clone2);
  //     summaryTong.contract += contract;
  //
  //     reportNumber++;
  //   }
  //   matrixBox.style.height = String(columnTop + columnLineHeight + columnPaddingTop) + ea;
  //   div_clone.appendChild(matrixBox);
  //
  //   //summary
  //   summaryBox = GeneralJs.nodes.div.cloneNode(true);
  //   style = {
  //     position: "absolute",
  //     width: String(matrixWidth) + ea,
  //     fontSize: String(matrixFontSize + 6) + ea,
  //     left: String(matrixBoxMargin) + ea,
  //     bottom: String(titleTop + 8) + ea,
  //     fontWeight: String(200),
  //     textAlign: "right",
  //   };
  //   for (let z in style) {
  //     summaryBox.style[z] = style[z];
  //   }
  //
  //   summaryBox.insertAdjacentHTML(`beforeend`, `문의 <b style="color:#2fa678">${String(summaryTong.client)}</b>명&nbsp;&nbsp;제안 <b style="color:#2fa678">${String(summaryTong.proposal)}</b>명&nbsp;&nbsp;계약 <b style="color:#2fa678">${String(summaryTong.contract)}</b>명`);
  //   div_clone.appendChild(summaryBox);
  //
  //   scrollBox.appendChild(div_clone);
  // }
  //
  // return scrollBox;
}

DesignerJs.prototype.reportContents = function (data, mother, loadingIcon) {
  // const instance = this;
  // const vaildValue = function (target) {
  //   const today = new Date();
  //   let valueArr0, valueArr1, valueArr2;
  //   input_clone.style.color = "#404040";
  //   if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
  //     if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
  //       target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
  //     } else if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
  //       target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
  //     } else if (/[0-9][0-9][0-9][0-9]\-[0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9]/.test(target.value)) {
  //       target.value = target.value.slice(0, 5) + '0' + target.value.slice(5);
  //       target.value = target.value.slice(0, -1) + '0' + target.value.slice(-1);
  //     } else {
  //       target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //     }
  //   }
  //   target.value = (/[0-9][0-9][0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9][0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];
  //   valueArr0 = target.value.split(" ~ ");
  //   valueArr1 = valueArr0[0].split("-");
  //   valueArr2 = valueArr0[1].split("-");
  //   if ((Number(valueArr1[0]) * 12) + Number(valueArr1[1].replace(/^0/, '')) > (Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, ''))) {
  //     target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //   }
  //   if (Number(valueArr1[1].replace(/^0/, '')) > 12 || Number(valueArr1[1].replace(/^0/, '')) < 1) {
  //     target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //   }
  //   if (Number(valueArr2[1].replace(/^0/, '')) > 12 || Number(valueArr2[1].replace(/^0/, '')) < 1) {
  //     target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //   }
  //   if (Number(valueArr1[0]) < 2019) {
  //     target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //   }
  //   if ((Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, '')) > (today.getFullYear() * 12) + (today.getMonth() + 1)) {
  //     target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
  //   }
  //
  //   GeneralJs.stacks.reportBoxStartDayInputValue = target.value;
  //
  //   valueArr0 = target.value.split(" ~ ");
  //   valueArr1 = valueArr0[0].split("-");
  //   valueArr2 = valueArr0[1].split("-");
  //
  //   return { startYear: valueArr1[0], startMonth: valueArr1[1], endYear: valueArr2[0], endMonth: valueArr2[1], };
  // }
  // const zeroAddition = function (number) {
  //   if (number < 10) {
  //     return "0" + String(number);
  //   } else {
  //     return String(number);
  //   }
  // }
  //
  // let div_clone, div_clone2, input_clone;
  // let style, inputStyle;
  // let ea = "px";
  // let motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  // const scrollBox = this.reportScrollBox(data, motherWidth);
  // const today = new Date();
  // let top, height, margin;
  //
  // //numbers
  // top = 0;
  // margin = 36;
  // height = 90;
  //
  // //search box
  // div_clone = GeneralJs.nodes.div.cloneNode(true);
  // style = {
  //   position: "absolute",
  //   top: String(top) + ea,
  //   left: String(margin) + ea,
  //   width: String(motherWidth - (margin * 2)) + ea,
  //   height: String(height) + ea,
  // };
  // for (let i in style) {
  //   div_clone.style[i] = style[i];
  // }
  //
  // //start day
  // input_clone = GeneralJs.nodes.input.cloneNode(true);
  // inputStyle = {
  //   position: "absolute",
  //   left: String(0) + ea,
  //   top: String(40) + ea,
  //   width: String(500) + ea,
  //   height: String(30) + ea,
  //   fontSize: String(29) + ea,
  //   fontWeight: String(100),
  //   border: String(0) + ea,
  //   outline: String(0) + ea,
  //   color: "#404040",
  // };
  // for (let i in inputStyle) {
  //   input_clone.style[i] = inputStyle[i];
  // }
  // input_clone.setAttribute("type", "text");
  // input_clone.setAttribute("value", "2020-04 ~ 2020-11");
  // input_clone.addEventListener("focus", function (e) {
  //   input_clone.style.color = "#2fa678";
  //   GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
  // });
  // input_clone.addEventListener("blur", function (e) {
  //   vaildValue(this);
  // });
  // input_clone.addEventListener("keyup", function (e) {
  //   if (e.keyCode === 13) {
  //     const queryObj = vaildValue(this);
  //     input_clone.blur();
  //     mother.removeChild(mother.lastChild);
  //     loadingIcon.style.animation = "loadingrotate 1.7s linear infinite";
  //     loadingIcon.style.opacity = "1";
  //     GeneralJs.ajax(GeneralJs.objectToRawquery(queryObj), "/getClientReport", function (data) {
  //       loadingIcon.style.opacity = "0";
  //       const scrollBox = instance.reportScrollBox(data, motherWidth);
  //       mother.appendChild(scrollBox);
  //     });
  //   }
  // });
  //
  // div_clone.appendChild(input_clone);
  //
  // //today box
  // div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  // style = {
  //   position: "absolute",
  //   fontSize: String(14) + ea,
  //   fontWeight: String(500) + ea,
  //   right: String(1) + ea,
  //   top: String(58) + ea,
  //   color: "#2fa678",
  // };
  // for (let i in style) {
  //   div_clone2.style[i] = style[i];
  // }
  // div_clone2.textContent = "today : " + String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
  // div_clone.appendChild(div_clone2);
  //
  // //end
  // mother.appendChild(div_clone);
  //
  // //scroll box
  // mother.appendChild(scrollBox);
}

DesignerJs.prototype.reportViewMakerDetail = function (recycle = false) {
  // const instance = this;
  // try {
  //   return function () {
  //     let div_clone, svg_icon;
  //     let style;
  //     let ea = "px";
  //     let margin;
  //     let domTargets;
  //     let motherBoo;
  //     let width;
  //
  //     motherBoo = (instance.onView === "mother") ? true : false;
  //
  //     margin = 30;
  //
  //     if (!recycle) {
  //
  //       instance.whiteBox = {};
  //
  //       //cancel box
  //       div_clone = GeneralJs.nodes.div.cloneNode(true);
  //       div_clone.classList.add("justfadein");
  //       style = {
  //         position: "fixed",
  //         background: "#404040",
  //         top: String(0) + ea,
  //         left: String(motherBoo ? instance.grayBarWidth : 0) + ea,
  //         width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0)) + ea,
  //         height: String(window.innerHeight - instance.belowHeight) + ea,
  //         zIndex: String(2),
  //       };
  //       for (let i in style) {
  //         div_clone.style[i] = style[i];
  //       }
  //
  //       div_clone.addEventListener("click", instance.whiteCancelMaker());
  //
  //       instance.whiteBox.cancelBox = div_clone;
  //       instance.totalContents.appendChild(div_clone);
  //
  //     }
  //
  //     div_clone = GeneralJs.nodes.div.cloneNode(true);
  //     div_clone.classList.add("fadeup");
  //     div_clone.classList.add("totalWhite");
  //     style = {
  //       position: "fixed",
  //       background: "white",
  //       top: String(margin) + ea,
  //       left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
  //       borderRadius: String(5) + ea,
  //       boxShadow: "0 2px 10px -6px #808080",
  //       width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
  //       height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
  //       zIndex: String(2),
  //     };
  //     for (let i in style) {
  //       div_clone.style[i] = style[i];
  //     }
  //
  //     width = 50;
  //
  //     svg_icon = instance.mother.returnLoadingIcon();
  //     style = {
  //       width: String(width) + ea,
  //       height: String(width) + ea,
  //       top: 'calc(50% - ' + String(width / 2) + ea + ')',
  //       left: 'calc(50% - ' + String(width / 2) + ea + ')',
  //     }
  //     for (let i in style) {
  //       svg_icon.style[i] = style[i];
  //     }
  //     div_clone.appendChild(svg_icon);
  //
  //     instance.whiteBox.contentsBox = div_clone;
  //     instance.totalContents.appendChild(div_clone);
  //
  //     GeneralJs.ajax("month=8", "/getClientReport", function (data) {
  //       svg_icon.style.opacity = "0";
  //       instance.reportContents(data, div_clone, svg_icon);
  //     });
  //
  //     GeneralJs.stacks.whiteBox = 0;
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
}

DesignerJs.prototype.reportViewMaker = function () {
  // const instance = this;
  // return function (e) {
  //   let tempFunc;
  //   if (GeneralJs.stacks.whiteBox !== 1) {
  //     if (instance.whiteBox !== null) {
  //       tempFunc = instance.whiteCancelMaker(instance.reportViewMakerDetail(true), true);
  //       tempFunc();
  //     } else {
  //       tempFunc = instance.reportViewMakerDetail(false);
  //       tempFunc();
  //     }
  //   }
  // }
}

DesignerJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { square: { up, down, reportIcon, returnIcon } } = this.mother.belowButtons;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", this.rowViewMaker());
  // reportIcon.addEventListener("click", this.reportViewMaker());
  reportIcon.style.opacity = String(0.4);
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

DesignerJs.prototype.extractViewMaker = function (link) {
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
      })

    } catch (e) {
      console.log(e);
    }
  }

  extractIcon.addEventListener("click", sendEvent);
}

DesignerJs.prototype.makeNotionEvent = function (id, index) {
  const instance = this;
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }

    let indexArr, requestIndex;

    index = Number(index);
    indexArr = [];
    for (let dom of document.querySelectorAll('.' + id)) {
      indexArr.push(Number(dom.getAttribute("index")));
    }
    indexArr.sort((a, b) => { return a - b; });
    for (let z = 0; z < indexArr.length; z++) {
      if (indexArr[z] === index) {
        requestIndex = z;
      }
    }

    const designers = await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ desid: id }), "/getDesigners");
    const designer = JSON.parse(designers)[0];
    const notionId = designer.information.notionId;
    if (notionId !== '') {
      window.open("https://notion.so/" + notionId.split('-')[0] + "?p=" + notionId.split('-')[1], "_blank");
    } else {
      alert("노션에 정보가 없습니다!");
    }
  }
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
    }

  } catch (e) {
    console.log(e);
  }
}
