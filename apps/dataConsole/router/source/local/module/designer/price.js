DesignerJs.prototype.priceBase = function () {
  const instance = this;
  const { ea, belowHeight, garoStandards, seroStandards } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  class PriceDoms extends Array {
    constructor(arr) {
      super();
      for (let i of arr) {
        this.push(i);
      }
    }
    pick(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("input must be x, y");
      }
      let target = null;
      let length = instance.garoStandards.length;
      if (this[(y * length) + x] !== undefined) {
        target = this[(y * length) + x];
      }
      return target;
    }
    pickY(y) {
      if (typeof y !== "number") {
        throw new Error("input must be y");
      }
      let arr = [];
      let length = instance.garoStandards.length;
      for (let i = 0; i < length; i++) {
        if (this[(y * length) + i] !== undefined) {
          arr.push(this[(y * length) + i]);
        }
      }
      return arr;
    }
    pickX(x) {
      if (typeof x !== "number") {
        throw new Error("input must be x");
      }
      let arr = [];
      let length = instance.seroStandards.length;
      let length2 = instance.garoStandards.length;
      for (let i = 0; i < length; i++) {
        if (this[(i * length2) + x] !== undefined) {
          arr.push(this[(i * length2) + x]);
        }
      }
      return arr;
    }
    next(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("input must be x, y");
      }
      if (this.length === 0) {
        throw new Error("invaild instance");
      }
      let target = null;
      let length = instance.garoStandards.length;
      if (this[(y * length) + x + 1] !== undefined) {
        target = this[(y * length) + x + 1];
      } else {
        target = this[0];
      }
      return target;
    }
    previous(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("input must be x, y");
      }
      if (this.length === 0) {
        throw new Error("invaild instance");
      }
      let target = null;
      let length = instance.garoStandards.length;
      if (this[(y * length) + x - 1] !== undefined) {
        target = this[(y * length) + x - 1];
      } else {
        target = this[this.length - 1];
      }
      return target;
    }
    up(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("input must be x, y");
      }
      if (this.length === 0) {
        throw new Error("invaild instance");
      }
      if (y === 0) {
        return this.pick(x, instance.seroStandards.length - 1);
      } else if (y < instance.seroStandards.length) {
        return this.pick(x, y - 1);
      }
    }
    down(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("input must be x, y");
      }
      if (this.length === 0) {
        throw new Error("invaild instance");
      }
      if (y === instance.seroStandards.length - 1) {
        return this.pick(x, 0);
      } else if (y > -1) {
        return this.pick(x, y + 1);
      }
    }
    removeAll() {
      for (let dom of this) {
        while (dom.firstChild) {
          dom.removeChild(dom.lastChild);
        }
      }
    }
  }
  let margin;
  let totalMother;
  let belowPannelHeight;
  let matrixBaseMother, matrixBase;
  let garoZone, seroZone;
  let garo, sero;
  let titleMargin_top, titleMargin_left;
  let length;
  let nodeArr;
  let titleSize, titleFontHeight;
  let belowPannel, belowButton;
  let belowBottom;
  let x, y;
  let feeButton;

  margin = 30;
  belowPannelHeight = 90;
  titleMargin_top = 38;
  titleMargin_left = 54;
  titleSize = 22;
  titleFontHeight = titleSize + 2;
  belowBottom = 40;
  feeButton = 6;

  garo = garoStandards.length;
  sero = seroStandards.length;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "relative",
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

  [ matrixBaseMother, belowPannel, belowButton ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "relative",
        paddingTop: String(titleMargin_top) + ea,
        paddingLeft: String(titleMargin_left) + ea,
        width: withOut(100, titleMargin_left, ea),
        height: withOut(100, belowPannelHeight + titleMargin_top + margin, ea),
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        marginTop: String(margin * (2 / 3)) + ea,
        marginLeft: String(titleMargin_left) + ea,
        width: withOut(100, titleMargin_left + belowPannelHeight + feeButton - (margin / 2), ea),
        height: String(belowPannelHeight - belowBottom + (margin * (1 / 3))) + ea,
        background: colorChip.gray1,
        borderRadius: String(5) + ea,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "absolute",
        bottom: String(belowBottom) + ea,
        right: String(margin) + ea,
        width: String(belowPannelHeight + feeButton - margin) + ea,
        height: String(belowPannelHeight - belowBottom + (margin * (1 / 3))) + ea,
        background: colorChip.gradientGreen,
        borderRadius: String(5) + ea,
      }
    }
  ]);

  [ matrixBase, garoZone, seroZone ] = createNodes([
    {
      mother: matrixBaseMother,
      style: {
        position: "relative",
        width: String(100) + '%',
        height: String(100) + '%',
        borderRadius: String(5) + ea,
        boxSizing: "border-box",
        border: "1px solid " + colorChip.gray3,
        overflow: "hidden",
      }
    },
    {
      mother: matrixBaseMother,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(titleMargin_left) + ea,
        width: withOut(100, titleMargin_left, ea),
        height: String(titleMargin_top) + ea,
        boxSizing: "border-box",
      }
    },
    {
      mother: matrixBaseMother,
      style: {
        position: "absolute",
        top: String(titleMargin_top) + ea,
        left: String(0) + ea,
        width: String(titleMargin_left) + ea,
        height: withOut(100, titleMargin_top, ea),
        boxSizing: "border-box",
      }
    }
  ]);

  length = garo * sero;
  nodeArr = [];
  for (let i = 0; i < length; i++) {
    x = String(i % garo);
    y = String(Math.floor(i / garo));
    nodeArr.push({
      mother: matrixBase,
      attribute: [ { x }, { y } ],
      class: [ this.domClassName + x + y ],
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(100% / " + String(garo) + ")",
        height: "calc(100% / " + String(sero) + ")",
        boxSizing: "border-box",
        borderBottom: (Math.floor(i / garo) >= (sero - 1)) ? "" : "1px solid " + colorChip.gray3,
        borderRight: ((i + 1) % garo === 0) ? "" : "1px solid " + colorChip.gray3,
      }
    });
  }

  for (let i = 0; i < sero; i++) {
    createNodes([
      {
        mother: seroZone,
        id: "titleY" + String(i),
        class: [ "titleY" ],
        style: {
          display: "block",
          position: "relative",
          width: String(50) + '%',
          height: "calc(100% / " + String(sero) + ")",
          boxSizing: "border-box",
        }
      },
      {
        mother: -1,
        text: seroStandards[i],
        style: {
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          height: String(titleFontHeight) + ea,
          fontSize: String(titleSize) + ea,
          fontWeight: String(400),
          fontFamily: "graphik",
          top: withOut(50, (titleFontHeight / 2) + 5, ea),
          left: String(0) + ea,
        }
      }
    ]);
  }

  for (let i = 0; i < garo; i++) {
    createNodes([
      {
        mother: garoZone,
        id: "titleX" + String(i),
        class: [ "titleX" ],
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(100% / " + String(garo) + ")",
          height: String(100) + '%',
          boxSizing: "border-box",
        }
      },
      {
        mother: -1,
        text: garoStandards[i],
        style: {
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          fontSize: String(titleSize - 3) + ea,
          fontWeight: String(400),
          fontFamily: "graphik",
          top: String(0) + ea,
          left: String(0) + ea,
        }
      }
    ]);
  }

  this.doms = new PriceDoms(createNodes(nodeArr));
  this.belowPannel = belowPannel;
  this.priceNumbers();
  this.pricePannel();
}

DesignerJs.prototype.priceNumbers = function () {
  const instance = this;
  const price = this.price.pick(...this.key);
  const matrix = price.matrix;
  const { ea, doms } = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
  let x, y;
  let height, size;
  let divVisualSpecific, inputVisualSpecific;

  doms.removeAll();

  size = 32;
  height = size + 4;
  divVisualSpecific = 8;
  inputVisualSpecific = divVisualSpecific - 3;

  if (this.eventFunc === null) {
    this.eventFunc = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const x = Number(this.getAttribute('x'));
      const y = Number(this.getAttribute('y'));
      const thisDom = doms.pick(x, y);
      const xDoms = doms.pickX(x);
      const yDoms = doms.pickY(y);
      const matrix = instance.price.pick(...instance.key).matrix;
      let input;
      let titleX, titleY;

      if (document.querySelector('.' + "caseTarget") !== null) {
        instance.priceAllCase(true);
      }

      titleX = document.querySelectorAll(".titleX");
      titleY = document.querySelectorAll(".titleY");

      instance.cancelBox = createNode({
        mother: this.parentElement,
        events: [
          {
            type: "click",
            event: function (e) {
              e.preventDefault();
              e.stopPropagation();
              const mother = this.parentElement;
              mother.removeChild(mother.lastChild);
              mother.removeChild(mother.lastChild);
              for (let dom of doms) {
                dom.firstChild.style.color = colorChip.black;
              }
              for (let dom of titleX) {
                dom.firstChild.style.color = colorChip.black;
              }
              for (let dom of titleY) {
                dom.firstChild.style.color = colorChip.black;
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
          background: "transparent",
          zIndex: String(1),
          cursor: "pointer",
        }
      });

      input = createNode({
        mother: this.parentElement,
        mode: "input",
        attribute: [
          { x },
          { y },
          { type: "text" },
          { value: String(matrix[x][y]) },
        ],
        events: [
          {
            type: "keypress",
            event: function (e) {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                const mother = this.parentElement;
                const x = Number(this.getAttribute('x'));
                const y = Number(this.getAttribute('y'));
                const value = Number(this.value.replace(/[^0-9]/g, ''));
                let updateQuery;
                updateQuery = {};
                updateQuery["matrix." + String(x) + '.' + String(y)] = value;
                ajaxJson({
                  mode: "update",
                  db: "console",
                  collection: "designerPrice",
                  whereQuery: { key: (instance.key[0] * 10) + instance.key[1] },
                  updateQuery
                }, "/generalMongo").then((data) => {
                  mother.firstChild.textContent = String(value);
                  instance.price.pick(...instance.key).matrix[x][y] = value;
                  mother.style.background = colorChip[value === 0 ? "gray0" : "white"];
                  instance.cancelBox.click();
                  if (instance.autoNext) {
                    doms.next(x, y).firstChild.click();
                  }
                }).catch((err) => {
                  throw new Error(err);
                });
              }
            }
          },
          {
            type: "keydown",
            event: function (e) {
              if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                instance.cancelBox.click();
                doms.next(x, y).firstChild.click();
              } else if (e.key === "Escape" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                instance.cancelBox.click();
              }
              if (e.altKey) {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  e.stopPropagation();
                  instance.cancelBox.click();
                  doms.previous(x, y).firstChild.click();
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  e.stopPropagation();
                  instance.cancelBox.click();
                  doms.next(x, y).firstChild.click();
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  e.stopPropagation();
                  instance.cancelBox.click();
                  doms.up(x, y).firstChild.click();
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  e.stopPropagation();
                  instance.cancelBox.click();
                  doms.down(x, y).firstChild.click();
                }
              }
            }
          }
        ],
        style: {
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          height: String(height) + ea,
          left: String(0) + ea,
          top: withOut(50, (height / 2) + inputVisualSpecific, ea),
          color: colorChip.green,
          border: String(0),
          outline: String(0),
          boxSizing: "border-box",
          zIndex: String(1),
          background: colorChip[matrix[x][y] === 0 ? "gray0" : "white"],
        }
      });
      input.focus();

      for (let dom of doms) {
        if (!xDoms.includes(dom) && !yDoms.includes(dom)) {
          dom.firstChild.style.color = colorChip.gray3;
        }
      }
      document.getElementById("titleX" + String(x)).firstChild.style.color = colorChip.green;
      document.getElementById("titleY" + String(y)).firstChild.style.color = colorChip.green;

    }
  }

  for (let i = 0; i < doms.length; i++) {
    x = Number(doms[i].getAttribute('x'));
    y = Number(doms[i].getAttribute('y'));
    createNode({
      mother: doms[i],
      attribute: [ { x }, { y } ],
      events: [ { type: [ "click", "contextmenu" ], event: instance.eventFunc } ],
      text: String(matrix[x][y]),
      style: {
        position: "absolute",
        width: String(100) + '%',
        textAlign: "center",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(200),
        height: String(height) + ea,
        left: String(0) + ea,
        top: withOut(50, (height / 2) + divVisualSpecific, ea),
        color: colorChip.black,
        cursor: "pointer",
      }
    });
    if (matrix[x][y] !== 0) {
      doms[i].style.background = colorChip["white"];
    } else {
      doms[i].style.background = colorChip["gray0"];
    }
  }
}

DesignerJs.prototype.priceAllCase = function (remove = false) {
  const instance = this;
  const { ea, doms, price } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const priceNew = price.allCase();
  const className = "caseTarget";
  let size;
  let x, y;
  let removeTargets;

  size = 18;

  removeTargets = document.querySelectorAll('.' + className);
  for (let dom of removeTargets) {
    dom.parentElement.removeChild(dom);
  }

  if (!remove) {
    this.mother.greenAlert("가로가 시공 능력, 세로가 스타일링 능력입니다!");
    for (let i = 0; i < doms.length; i++) {
      x = Number(doms[i].getAttribute('x'));
      y = Number(doms[i].getAttribute('y'));
      for (let j = 0; j < priceNew.length; j++) {
        if (j === 4) {
          continue;
        }
        createNode({
          mother: doms[i],
          class: [ className ],
          text: String(priceNew[j].matrix[x][y]),
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(200),
            fontFamily: "graphik",
            textAlign: "center",
            color: colorChip.green,
            width: "calc(100% / 3)",
            top: "calc(11% + calc(31% * " + String(Math.floor(j / 3)) + "))",
            left: "calc(calc(100% / 3) * " + String(j % 3) + ")",
          }
        });
      }
    }

  }

}

DesignerJs.prototype.pricePannel = function () {
  const instance = this;
  const { ea, belowPannel } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const standard = [ "하", "중", "상" ];
  let motherHeight;
  let size;
  let margin;
  let title0 = {}, title1 = {}, title2 = {}, title3 = {}, title4 = {};
  let ratio0 = {}, ratio1 = {}, ratio2 = {}, ratio3 = {};
  let value0 = {}, value1 = {};
  let ratioValue0 = {}, ratioValue1 = {}, ratioValue2 = {}, ratioValue3 = {};
  let top;
  let between;
  let clickEvent;
  let accumulate;
  let betweenWords;
  let price;
  let caseEvent;

  price = this.price.pick(...this.key);

  motherHeight = Number(belowPannel.style.height.replace(/[^0-9]/gi, ''));
  size = 18;
  margin = 24;
  top = 15;
  between = 8;
  betweenWords = margin * 1;

  clickEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const key = Number(this.getAttribute("key"));
    const target = document.getElementById("key" + String(key));
    let num;
    if (instance.key[key] === 1) {
      num = (e.type === "click" ? 2 : 3);
    } else if (instance.key[key] === 2) {
      num = (e.type === "click" ? 3 : 1);
    } else if (instance.key[key] === 3) {
      num = (e.type === "click" ? 1 : 2);
    }
    instance.key[key] = num;
    target.textContent = standard[num - 1];
    price = instance.price.pick(...instance.key);
    instance.priceNumbers();
  }
  caseEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const a0 = instance.key[0];
    const a1 = instance.key[1];
    let num0, num1;
    if (document.querySelector('.' + "caseTarget") === null) {
      if (a0 === 1) {
        num0 = 1;
      } else if (a0 === 2) {
        num0 = 0;
      } else if (a0 === 3) {
        num0 = 2;
      }
      if (a1 === 1) {
        num1 = 1;
      } else if (a1 === 2) {
        num1 = 0;
      } else if (a1 === 3) {
        num1 = 2;
      }
      for (let i = 0; i < num0; i++) {
        clickEvent.call(title0, { type: "click", preventDefault: () => {}, stopPropagation: () => {} });
      }
      for (let i = 0; i < num1; i++) {
        clickEvent.call(title1, { type: "click", preventDefault: () => {}, stopPropagation: () => {} });
      }
      instance.priceAllCase(false);
    } else {
      instance.priceAllCase(true);
    }
  }
  belowPannel.addEventListener("selectstart", (e) => { e.preventDefault(); });

  accumulate = margin;
  title0 = createNode({
    mother: belowPannel,
    attribute: [ { key: String(0) } ],
    class: [ "hoverDefault_lite" ],
    events: [ { type: [ "click", "contextmenu" ], event: clickEvent }, { type: "selectstart", event: (e) => { e.preventDefault(); } } ],
    text: "시공 능력 단계",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      left: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate += title0.getBoundingClientRect().width + between;
  value0 = createNode({
    mother: belowPannel,
    id: "key" + String(0),
    attribute: [ { key: String(0) } ],
    class: [ "hoverDefault_lite" ],
    events: [ { type: [ "click", "contextmenu" ], event: clickEvent }, { type: "selectstart", event: (e) => { e.preventDefault(); } } ],
    text: standard[this.key[0] - 1],
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      left: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += value0.getBoundingClientRect().width + betweenWords;
  title1 = createNode({
    mother: belowPannel,
    attribute: [ { key: String(1) } ],
    class: [ "hoverDefault_lite" ],
    events: [ { type: [ "click", "contextmenu" ], event: clickEvent }, { type: "selectstart", event: (e) => { e.preventDefault(); } } ],
    text: "스타일링 능력 단계",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      left: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate += title1.getBoundingClientRect().width + between;
  value1 = createNode({
    mother: belowPannel,
    id: "key" + String(1),
    attribute: [ { key: String(1) } ],
    class: [ "hoverDefault_lite" ],
    events: [ { type: [ "click", "contextmenu" ], event: clickEvent }, { type: "selectstart", event: (e) => { e.preventDefault(); } } ],
    text: standard[this.key[1] - 1],
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      left: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += value1.getBoundingClientRect().width + betweenWords;
  title2 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "모든 경우 보기",
    events: [ { type: "click", event: caseEvent } ],
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      left: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate = margin;
  ratioValue0 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: String(price.premium),
    events: [
      {
        type: "click",
        event: function (e) {

        }
      }
    ],
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += ratioValue0.getBoundingClientRect().width + between;
  ratio0 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "프리미엄 비율",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate += ratio0.getBoundingClientRect().width + betweenWords;
  ratioValue1 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "N",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += ratioValue1.getBoundingClientRect().width + between;
  ratio1 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "프리미엄 적용",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate += ratio1.getBoundingClientRect().width + betweenWords;
  ratioValue2 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: String(price.newcomer),
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += ratioValue2.getBoundingClientRect().width + between;
  ratio2 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "신입 비율",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

  accumulate += ratio2.getBoundingClientRect().width + betweenWords;
  ratioValue3 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "N",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(600),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.green,
      cursor: "pointer",
    }
  });

  accumulate += ratioValue3.getBoundingClientRect().width + between;
  ratio3 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "신입 적용",
    style: {
      position: "absolute",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      top: String(top) + ea,
      right: String(accumulate) + ea,
      color: colorChip.black,
      cursor: "pointer",
    }
  });

}

DesignerJs.prototype.priceView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, sleep } = GeneralJs;
    let loading, price;

    class PriceMatrix extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      select(key0, key1) {
        if (typeof key0 !== "number" || typeof key1 !== "number") {
          throw new Error("input must be level, level");
        }
        if (!(0 < key0 && key0 < 4)) {
          throw new Error("invaild level");
        }
        if (!(0 < key1 && key1 < 4)) {
          throw new Error("invaild level");
        }
        const key = (key0 * 10) + key1;
        let target = null;
        for (let obj of this) {
          if (obj.key === key) {
            target = obj;
            break;
          }
        }
        return target;
      }
      search(key0, key1) {
        return this.select(key0, key1);
      }
      find(key0, key1) {
        return this.select(key0, key1);
      }
      pick(key0, key1) {
        return this.select(key0, key1);
      }
      key(key0, key1) {
        return this.select(key0, key1);
      }
      allCase() {
        let arr = [];
        arr.push(this.pick(1, 3));
        arr.push(this.pick(2, 3));
        arr.push(this.pick(3, 3));
        arr.push(this.pick(1, 2));
        arr.push(this.pick(2, 2));
        arr.push(this.pick(3, 2));
        arr.push(this.pick(1, 1));
        arr.push(this.pick(2, 1));
        arr.push(this.pick(3, 1));
        return new PriceMatrix(arr);
      }
    }

    loading = await this.mother.loadingRun();

    this.domClassName = "priceDom";
    this.seroStandards = [ 'F', 'S', 'T', 'XT' ];
    this.garoStandards = [ '0 - 8', '9 - 14', '15 - 22', '23 - 29', '30 - 33', '34 - 38', '39 - 44', '44 - 999' ];
    this.price = new PriceMatrix(await ajaxJson({
      mode: "read",
      db: "console",
      collection: "designerPrice",
      whereQuery: {},
    }, "/generalMongo", { equal: true }));
    this.key = [ 3, 3 ];
    this.doms = null;
    this.eventFunc = null;
    this.cancelBox = null;
    this.belowPannel = null;
    this.autoNext = true;

    this.priceBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
