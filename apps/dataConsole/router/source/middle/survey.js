/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": true,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.designer + ' 디자이너님 체크리스트');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.designer + ' 디자이너님의 체크리스트 작성 페이지입니다.');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ]
  }
} %/%/g

const SurveyJs = function () {
  this.mother = new GeneralJs();
  this.whiteBox = null;
  this.contentsBox = null;
  this.margin = 0;
  this.mode = "desktop";
  this.sero = false;
  this.totalContents = document.getElementById("totalcontents");
}

SurveyJs.prototype.baseMaker = function () {
  const instance = this;
  let div_clone;
  let whiteBox, contentsBox;
  let style;
  let ea;
  let margin;
  let mode;

  margin = this.margin;
  ea = "px";

  div_clone = GeneralJs.nodes.div.cloneNode();
  style = {
    position: "absolute",
    width: String(100) + '%',
    height: String(100) + '%',
    background: GeneralJs.colorChip.gray1,
    top: String(0),
    left: String(0)
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  if (this.modeMinus === 0) {
    this.totalContents.appendChild(div_clone);
  }

  whiteBox = GeneralJs.nodes.div.cloneNode();
  style = {
    position: "relative",
    top: String(margin) + ea,
    left: String(margin) + ea,
    width: String(window.innerWidth - (margin * 2)) + ea,
    height: String(window.innerHeight - (margin * 2)) + ea,
    borderRadius: String(5) + ea,
    background: GeneralJs.colorChip.white,
    boxShadow: "0px 2px 11px -6px #808080",
    animation: "fadeuplite 0.3s ease forwards",
  };
  if (this.modeMinus !== 0) {
    style.top = String(0) + ea;
    style.left = String(0) + ea;
    style.width = String(window.innerWidth) + ea;
    style.height = String(window.innerHeight) + ea;
    style.boxShadow = "";
  }
  for (let i in style) {
    whiteBox.style[i] = style[i];
  }

  contentsBox = GeneralJs.nodes.div.cloneNode();
  style = {
    position: "absolute",
    top: String(margin) + ea,
    left: String(0) + ea,
    width: String(window.innerWidth - (margin * 2)) + ea,
    height: String(window.innerHeight - (margin * 4)) + ea,
    background: GeneralJs.colorChip.white,
  };
  if (this.modeMinus !== 0) {
    style.width = String(window.innerWidth) + ea;
    style.height = String(window.innerHeight - (margin * 2)) + ea;
  }
  for (let i in style) {
    contentsBox.style[i] = style[i];
  }

  whiteBox.appendChild(contentsBox);
  this.totalContents.appendChild(whiteBox);
  this.whiteBox = whiteBox;
  this.contentsBox = contentsBox;

  return this;
}

SurveyJs.prototype.convertWhiteContents = function (motherArea, contentsArea, leftMargin, thisCase) {
  const instance = this;
  const { designer, desid } = thisCase;
  const modeMinus = this.modeMinus;
  const sero = this.sero;
  let fontSize0, fontSize1, fontSize2, fontSize3;

  fontSize0 = 14 - modeMinus;
  fontSize1 = 13 - modeMinus;
  fontSize2 = 34 - (modeMinus * 3);
  fontSize3 = 23 - modeMinus;

  return async function (e) {
    try {

      let div_clone;
      let style, style2, style3;
      let ea = "px";
      let temp;

      //start matrixA
      div_clone = contentsArea.cloneNode(false);
      div_clone.style.animation = "fadeinlite 0.3s ease forwards";
      if (sero) {
        div_clone.style.top = String(0);
        div_clone.style.height = "auto";
      }

      const responseObject = JSON.parse(await GeneralJs.ajaxPromise("button=get" + "&desid=" + desid + "&target=matrixA", "/designerMatrix"));
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
      let matrixStyle, matrixMargin;
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
      let checkListBaseStyle, matrixBaseStyle;

      totalMatrix = [];
      leftWordWidth = 30;
      bottomWordWidth = 34;
      margin = 10;
      matrixMargin = 8 - modeMinus;
      boxNumber = xValues.length * yValues.length;
      checkListWidth = (Number(motherArea.style.width.replace(/[^0-9\.\-]/g, '')) - (leftMargin * 2)) * (0.5);
      checkListMargin = 20;
      minimumButtonWidth = sero ? 40 : 75;
      checkDivideNum = Math.floor((checkListWidth - checkListMargin - (matrixMargin * 8)) / minimumButtonWidth);
      checkFactorButtonMargin = 5;
      domDictionary = {};

      //check list base
      checkList = DataPatch.designerCheckList(analytics);
      checkListBase = GeneralJs.nodes.div.cloneNode(true);
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
      if (sero) {
        checkListBaseStyle.position = "relative";
        checkListBaseStyle.width = String(100) + '%';
        checkListBaseStyle.right = String(0) + ea;
        checkListBaseStyle.borderRadius = String(0) + ea;
        checkListBaseStyle.border = String(0);
        checkListBaseStyle.height = "auto";
      }
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
        fontSize: String(fontSize0) + ea,
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
        for (let { name, column, items, multiple, type, value, dependency, survey } of checkList[c].items) {
          if (survey) {

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
                  height: String(30 - modeMinus) + ea,
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
                    fontSize: String(fontSize1) + ea,
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
                    height: String(30 - modeMinus) + ea,
                    fontSize: String(fontSize1) + ea,
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
                    if (instance.mode === "desktop") {
                      checkListFactorContentsItemText.classList.add("hoverDefault");
                    }
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
                      height: String(30 - modeMinus) + ea,
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
                  checkListFactorContentsItemText.textContent = items[i].name.replace(/한 /g, "");
                  style = {
                    position: "absolute",
                    width: String(minimumButtonWidth) + ea,
                    height: String(30 - modeMinus) + ea,
                    fontSize: String(fontSize1) + ea,
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
                    height: String(30 - modeMinus) + ea,
                    fontSize: String(fontSize1) + ea,
                    fontWeight: String(500),
                    borderRadius: String(3) + ea,
                    top: String(checkFactorButtonMargin - (modeMinus / 2) + (GeneralJs.isMac() ? 0 : 2)) + ea,
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
                fontSize: String(fontSize0) + ea,
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
        }
        checkListFactorMiddle.appendChild(checkListBaseWhite);
      }

      checkListBase.appendChild(checkListFactorMiddle);
      div_clone.appendChild(checkListBase);

      //memo box
      matrixBaseStyle = {
        position: "absolute",
        top: String(0) + ea,
        left: String(leftMargin) + ea,
        width: "calc(100% - " + String((leftMargin * 2) + checkListWidth + (checkListMargin / 2)) + ea + ")",
        height: String(100) + '%',
        background: GeneralJs.colorChip.white,
      };

      if (!sero) {
        GeneralJs.ajax("method=designer&property=needs&idArr=" + JSON.stringify([ desid ]), "/getHistoryProperty", function (res) {
          const resObj = JSON.parse(res);
          if (resObj[desid] === undefined) {
            throw new Error("needs error");
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
          memoTitle.insertAdjacentHTML("beforeend", '<b style="color:' + GeneralJs.colorChip.green + '">0. </b> 홈리에종에게 하고 싶은 말');
          style = {
            position: "absolute",
            top: String((matrixMargin * 2) + 3) + ea,
            left: String(matrixMargin * 2) + ea,
            fontSize: String(14) + ea,
            fontWeight: String(600),
            color: GeneralJs.colorChip.black,
            marginBottom: String(7) + ea,
          };
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
          };
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
          };
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
          };
          for (let i in style) {
            memoText.style[i] = style[i];
          }
          memoText.addEventListener("blur", function (e) {
            const cookies = GeneralJs.getCookiesAll();
            const ajaxData = "method=designer&id=" + desid + "&column=needs&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
            GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
          });
          memoText.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
              const cookies = GeneralJs.getCookiesAll();
              const ajaxData = "method=designer&id=" + desid + "&column=needs&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
              GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
            }
          });

          memoTextScroll.appendChild(memoText);

          instance.whiteMemoBox = memoBox;
          div_clone.appendChild(memoBox);

          memoText.focus();
        });
      }

      //base
      /*


      matrixBase = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        top: String(0) + ea,
        left: String(leftMargin) + ea,
        width: "calc(100% - " + String((leftMargin * 2) + checkListWidth + (checkListMargin / 2)) + ea + ")",
        height: String(100) + '%',
        background: GeneralJs.colorChip.white,
      };
      if (sero) {
        style.display = "none";
        style.position = "relative";
        style.marginTop = String(leftMargin + 3) + ea;
        style.marginBottom = String(leftMargin + 3) + ea;
        style.left = String(matrixMargin * 2) + ea;
        style.width = "calc(100% - " + String(matrixMargin * 4) + ea + ")";
        style.height = String((window.innerWidth * 1)) + ea;
      }
      for (let i in style) {
        matrixBase.style[i] = style[i];
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
        fontSize: String(fontSize0) + ea,
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
        fontSize: String(fontSize2) + ea,
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
        if (instance.mode === "desktop") {
          invisibleText.classList.add("hoverDefault_lite");
        }
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
        fontSize: String(fontSize3) + ea,
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
        fontSize: String(fontSize3) + ea,
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

      */

      instance.whiteMatrixA = div_clone;
      motherArea.appendChild(div_clone);



    } catch (e) {
      console.log(e);
    }
  }
}

SurveyJs.checkListSseEvent = function (e) {
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

SurveyJs.prototype.confirmLaunching = function (desid, designer) {
  const instance = this;
  let ea;

  //set sse
  es = new EventSource("https://" + SSEHOST + ":3000/specificsse/get_checklist/" + desid);
  es.addEventListener("updateTong", SurveyJs.checkListSseEvent);

  //tablet
  if (window.innerWidth < 1400 && window.innerWidth > 1000) {
    this.modeMinus = 1;
    this.mode = "tablet";
    this.sero = false;
  //mobile
  } else if (window.innerWidth <= 1000) {
    this.modeMinus = 1;
    this.mode = "mobile";
    this.sero = true;
  //desktop
  } else {
    this.modeMinus = 0;
    this.mode = "desktop";
    this.sero = false;
  }

  if (this.modeMinus !== 0) {
    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease}");
  }

  this.margin = 20;
  this.margin = this.margin - this.modeMinus;

  this.baseMaker();
  this.convertWhiteContents(this.whiteBox, this.contentsBox, this.margin, { designer, desid }).call(this.whiteBox, null);

}

SurveyJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();
    let thisPerson, desid, designers, designer, phone;

    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

    if (getObj.desid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
      throw new Error("invaild query string");
    } else {

      //get this person
      desid = getObj.desid;
      designers = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ desid }), "/getDesigners"));
      if (designers.length === 0) {
        alert("잘못된 접근입니다!");
        window.location.href = "https://home-liaison.com";
        throw new Error("invaild desid");
      }
      thisPerson = designers[0];
      phone = thisPerson.information.phone;
      designer = thisPerson.designer;

      //test
      instance.confirmLaunching(desid, designer);

      //get dead line
      /*
      GeneralJs.ajax("json=" + JSON.stringify({ mode: "get", name: "designerCheckList_" + desid }), "/manageDeadline", function (json) {
        const { expired, dead } = JSON.parse(json);
        if (!dead) {
          // if (!expired) {
          //   instance.confirmLaunching(desid, designer);
          // } else {
          //   const targetPhone = /localhost/.test(window.location.host) ? "010-2747-3403" : phone;
          //   instance.mother.certificationBox(designer, targetPhone, function (back, box) {
          //     document.body.removeChild(box);
          //     document.body.removeChild(back);
          //     instance.confirmLaunching(desid, designer);
          //   });
          // }
          instance.confirmLaunching(desid, designer);
        } else {
          alert("페이지가 만료되었습니다! 관리자에게 문의하세요!");
          window.location.href = "https://home-liaison.com";
        }
      });
      */
    }
  } catch (e) {
    console.log(e);
  }
}
