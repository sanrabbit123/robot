DesignerJs.prototype.priceBase = function () {
  const instance = this;
  const { ea, belowHeight, garoStandards, seroStandards } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
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
  titleSize = 21;
  titleFontHeight = titleSize + 2;
  belowBottom = 40;
  feeButton = 6;

  garo = garoStandards.length;
  sero = seroStandards.length;

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
      events: [
        {
          type: "click",
          event: instance.priceFeeAdjust(),
        }
      ],
      style: {
        position: "absolute",
        bottom: String(belowBottom) + ea,
        right: String(margin) + ea,
        width: String(belowPannelHeight + feeButton - margin) + ea,
        height: String(belowPannelHeight - belowBottom + (margin * (1 / 3))) + ea,
        background: colorChip.gradientGreen,
        borderRadius: String(5) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      text: "수수료",
      class: [ "hoverDefault_lite" ],
      style: {
        position: "absolute",
        fontSize: String(titleSize - 7) + ea,
        fontWeight: String(600),
        width: String(100) + '%',
        textAlign: "center",
        left: String(0),
        top: withOut(50, (titleSize / 2) + (isMac() ? 1 : 0), ea),
        color: colorChip.white,
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
  this.matrixBase = matrixBase;
  this.garoZone = garoZone;
  this.seroZone = seroZone;

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
  let allCaseLaunching;

  allCaseLaunching = (document.querySelector('.' + "caseTarget") !== null);
  doms.removeAll();

  size = <%% 30, 26, 26, 26, 26 %%>;
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
                for (let child of dom.children) {
                  child.style.color = colorChip.green;
                }
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
                  mother.firstChild.textContent = String(Math.round(value * (instance.newcomer.boo ? instance.newcomer.ratio : 1) * (instance.premium.boo ? instance.premium.ratio : 1)));
                  instance.price.pick(...instance.key).matrix[x][y] = value;
                  mother.style.background = colorChip[value === 0 ? "gray0" : "white"];
                  instance.cancelBox.click();
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
                  doms.next(x, y).firstChild.click();
                }).catch((err) => {
                  throw new Error(err);
                });
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
          width: String(30) + '%',
          textAlign: "center",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          height: String(height) + ea,
          left: String(35) + '%',
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
          for (let child of dom.children) {
            child.style.color = colorChip.gray3;
          }
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
      text: String(Math.round(matrix[x][y] * (instance.newcomer.boo ? instance.newcomer.ratio : 1) * (instance.premium.boo ? instance.premium.ratio : 1))),
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

  if (allCaseLaunching) {
    this.priceAllCase(false);
  }
}

DesignerJs.prototype.priceAllCase = function (remove = false) {
  const instance = this;
  const { ea, doms, price: pricePast } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const { price, standard } = pricePast.allCase(...this.key);
  const className = "caseTarget";
  let subSize;
  let size;
  let x, y;
  let removeTargets;
  let topStart, between;
  let lineHeight;

  subSize = <%% 5, 4, 4, 4, 4 %%>;
  size = <%% 18, 15, 15, 15, 15 %%>;
  topStart = isMac() ? 10 : 11;
  between = isMac() ? 7 : 6;
  lineHeight = 29;

  this.newcomer.boo = false;
  this.premium.boo = false;
  document.getElementById("newcomerBoo").textContent = 'N';
  document.getElementById("premiumBoo").textContent = 'N';

  removeTargets = document.querySelectorAll('.' + className);
  for (let dom of removeTargets) {
    dom.parentElement.removeChild(dom);
  }

  if (!remove) {
    for (let i = 0; i < doms.length; i++) {
      x = Number(doms[i].getAttribute('x'));
      y = Number(doms[i].getAttribute('y'));
      for (let j = 0; j < price.length; j++) {

        if (j === 4) {
          doms[i].firstChild.textContent = String(price[j].matrix[x][y]);
          continue;
        }

        createNode({
          mother: doms[i],
          class: [ className ],
          text: standard[i][j],
          style: {
            position: "absolute",
            fontSize: String(subSize) + ea,
            fontWeight: String(700),
            textAlign: "center",
            color: colorChip.green,
            width: "calc(100% / 3)",
            top: "calc(" + String(topStart) + "% + calc(" + String(lineHeight) + "% * " + String(Math.floor(j / 3)) + "))",
            left: "calc(calc(100% / 3) * " + String(j % 3) + ")",
          }
        });

        createNode({
          mother: doms[i],
          class: [ className ],
          text: String(price[j].matrix[x][y]),
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(200),
            fontFamily: "graphik",
            textAlign: "center",
            color: colorChip.green,
            width: "calc(100% / 3)",
            top: "calc(" + String(topStart + between) + "% + calc(" + String(lineHeight) + "% * " + String(Math.floor(j / 3)) + "))",
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
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const standard = [ "하", "중", "상" ];
  const widthSpec = {
    left: [
      89.47,
      13.84,
      117.14,
      13.84,
      89.47,
    ],
    right: [
      18.56,
      86.25,
      10.84,
      86.25,
      23.61,
      58.58,
      10.84,
      58.58,
    ]
  };
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
  let premiumEvent;
  let newcomerEvent;
  let premiumRatioEvent;
  let newcomerRatioEvent;

  price = this.price.pick(3, 3);

  motherHeight = Number(belowPannel.style.height.replace(/[^0-9]/gi, ''));
  size = 16;
  margin = 24;
  top = isMac() ? 17 : 20;
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
    if (document.querySelector('.' + "caseTarget") === null) {
      instance.priceAllCase(false);
    } else {
      instance.priceAllCase(true);
    }
  }
  premiumEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const doms = instance.doms;
    const { matrix } = instance.price.pick(...instance.key);
    let x, y;
    if (!instance.premium.boo) {
      for (let dom of doms) {
        dom.firstChild.textContent = String(Math.round(Number(dom.firstChild.textContent) * instance.premium.ratio));
      }
      ratioValue1.textContent = 'Y';
    } else {
      for (let dom of doms) {
        x = Number(dom.getAttribute('x'));
        y = Number(dom.getAttribute('y'));
        dom.firstChild.textContent = String(Math.round(matrix[x][y] * (instance.newcomer.boo ? instance.newcomer.ratio : 1) * (!instance.premium.boo ? instance.premium.ratio : 1)));
      }
      ratioValue1.textContent = 'N';
    }
    instance.premium.boo = !instance.premium.boo;
  }
  newcomerEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const doms = instance.doms;
    const { matrix } = instance.price.pick(...instance.key);
    let x, y;
    if (!instance.newcomer.boo) {
      for (let dom of doms) {
        dom.firstChild.textContent = String(Math.round(Number(dom.firstChild.textContent) * instance.newcomer.ratio));
      }
      ratioValue3.textContent = 'Y';
    } else {
      for (let dom of doms) {
        x = Number(dom.getAttribute('x'));
        y = Number(dom.getAttribute('y'));
        dom.firstChild.textContent = String(Math.round(matrix[x][y] * (!instance.newcomer.boo ? instance.newcomer.ratio : 1) * (instance.premium.boo ? instance.premium.ratio : 1)));
      }
      ratioValue3.textContent = 'N';
    }
    instance.newcomer.boo = !instance.newcomer.boo;
  }
  premiumRatioEvent = async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const ratio = instance.premium.ratio;
      if (1 <= ratio && ratio < 2) {
        instance.premium.ratio = Math.round((ratio + (e.type === "click" ? 0.1 : -0.1)) * 10) / 10;
      } else {
        instance.premium.ratio = 1.1;
      }
      ratioValue0.textContent = String(Math.round(instance.premium.ratio * 10) / 10);
      if (instance.premium.boo) {
        premiumEvent.call(ratioValue1, { preventDefault: () => {}, stopPropagation: () => {} });
        premiumEvent.call(ratioValue1, { preventDefault: () => {}, stopPropagation: () => {} });
      }
      await GeneralJs.ajaxJson({
        mode: "update",
        db: "console",
        collection: "designerPrice",
        whereQuery: { key: 33 },
        updateQuery: { premium: (Math.round(instance.premium.ratio * 10) / 10), newcomer: (Math.round(instance.newcomer.ratio * 10) / 10) }
      }, "/generalMongo");
    } catch (e) {
      console.log(e);
    }
  }
  newcomerRatioEvent = async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const ratio = Math.round(instance.newcomer.ratio * 10) / 10;
      if (0 < ratio && ratio < 1) {
        instance.newcomer.ratio = Math.round((ratio + (e.type === "click" ? -0.1 : 0.1)) * 10) / 10;
      } else {
        instance.newcomer.ratio = 0.9;
      }
      ratioValue2.textContent = String(Math.round(instance.newcomer.ratio * 10) / 10);
      if (instance.newcomer.boo) {
        newcomerEvent.call(ratioValue1, { preventDefault: () => {}, stopPropagation: () => {} });
        newcomerEvent.call(ratioValue1, { preventDefault: () => {}, stopPropagation: () => {} });
      }
      await GeneralJs.ajaxJson({
        mode: "update",
        db: "console",
        collection: "designerPrice",
        whereQuery: { key: 33 },
        updateQuery: { premium: (Math.round(instance.premium.ratio * 10) / 10), newcomer: (Math.round(instance.newcomer.ratio * 10) / 10) }
      }, "/generalMongo");
    } catch (e) {
      console.log(e);
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

  accumulate += widthSpec.left[0] + between;
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

  accumulate += widthSpec.left[1] + betweenWords;
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

  accumulate += widthSpec.left[2] + between;
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

  accumulate += widthSpec.left[3] + betweenWords;
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
        type: [ "click", "contextmenu" ],
        event: premiumRatioEvent
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

  accumulate += widthSpec.right[0] + between;
  ratio0 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "프리미엄 비율",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: premiumRatioEvent
      }
    ],
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

  accumulate += widthSpec.right[1] + betweenWords;
  ratioValue1 = createNode({
    mother: belowPannel,
    id: "premiumBoo",
    class: [ "hoverDefault_lite" ],
    text: "N",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: premiumEvent
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

  accumulate += widthSpec.right[2] + between;
  ratio1 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "프리미엄 적용",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: premiumEvent
      }
    ],
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

  accumulate += widthSpec.right[3] + betweenWords;
  ratioValue2 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: String(price.newcomer),
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: newcomerRatioEvent
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

  accumulate += widthSpec.right[4] + between;
  ratio2 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "신입 비율",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: newcomerRatioEvent
      }
    ],
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

  accumulate += widthSpec.right[5] + betweenWords;
  ratioValue3 = createNode({
    mother: belowPannel,
    id: "newcomerBoo",
    class: [ "hoverDefault_lite" ],
    text: "N",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: newcomerEvent
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

  accumulate += widthSpec.right[6] + between;
  ratio3 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "신입 적용",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: newcomerEvent
      }
    ],
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

  accumulate += widthSpec.right[7] + betweenWords;
  ratio3 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    text: "출장비 관리",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: this.priceTravel(),
      }
    ],
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

DesignerJs.prototype.priceTravel = function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      let samples;
      if (/출/gi.test(this.textContent)) {
        samples = await ajaxJson({ mode: "sample" }, "/parsingAddress");
        this.textContent = "디자이너비 관리";
        const travelBase = instance.matrixBase.cloneNode(false);
        instance.matrixBase.style.display = "none";
        instance.garoZone.style.opacity = String(0.2);
        instance.seroZone.style.opacity = String(0.2);
        instance.travelBase = travelBase;
        instance.samples = samples;
        instance.matrixBase.parentElement.appendChild(travelBase);
        instance.priceTravelDetail();
      } else {
        this.textContent = "출장비 관리"
        instance.matrixBase.parentElement.removeChild(instance.travelBase);
        instance.matrixBase.style.display = "block";
        instance.garoZone.style.opacity = String(1);
        instance.seroZone.style.opacity = String(1);
        instance.travelBase = null;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.priceTravelDetail = function () {
  const instance = this;
  const { ea, travelBase, samples, belowHeight } = this;
  const { createNode, createNodes, withOut, colorChip, autoComma, cleanChildren, ajaxJson } = GeneralJs;
  let leftMargin, margin, baseTong;
  let size;
  let blockHeight;
  let between, betweenWords;
  let tong;
  let designerTong, contentsTong;
  let designerTongWidth;
  let lineTop;
  let blockMargin, contentsMargin;
  let addressWidth, distanceWidth, timeWidth, amountWidth;
  let contentsTongWidth;
  let totalTongWidth;
  let temp, temp2, temp3, temp4;
  let ratio;
  let num;
  let smallBoo;
  let veryBigBoo;
  let totalPaddingBottom;
  let updateEvent, saveEvent;
  let updateClassName;
  let buttonBottom;
  let buttonRight;
  let buttonWidth;
  let buttonHeight;
  let buttonTextTop;

  size = 15;
  margin = 28;
  leftMargin = 32;
  blockHeight = 20;
  travelBase.style.overflow = "scroll";
  between = 14;
  betweenWords = 6;
  designerTongWidth = 230;
  contentsTongWidth = 500;
  addressWidth = 260;
  distanceWidth = 60;
  timeWidth = 85;
  amountWidth = 75;
  lineTop = 3;
  blockMargin = 20;
  contentsMargin = 12;
  totalTongWidth = 760;
  totalPaddingBottom = 160;
  buttonBottom = 147;
  buttonRight = 57;
  buttonWidth = 56;
  buttonHeight = 34;
  buttonTextTop = 6;

  temp = (((window.innerWidth - (60 + 54)) - (leftMargin * (4.5))) / 2);
  temp2 = temp - distanceWidth - timeWidth - amountWidth;
  temp3 = temp2 * (designerTongWidth / (designerTongWidth + addressWidth));
  temp4 = temp2 * (addressWidth / (designerTongWidth + addressWidth));
  designerTongWidth = temp3;
  addressWidth = temp4;
  contentsTongWidth = addressWidth + distanceWidth + timeWidth + amountWidth + (betweenWords * 3);
  totalTongWidth = designerTongWidth + contentsTongWidth;

  smallBoo = false;
  if (designerTongWidth < 200) {
    smallBoo = true;
  }
  veryBigBoo = false;
  if (window.innerWidth > 1760) {
    veryBigBoo = true;
  }

  updateClassName = "updateTarget";

  updateEvent = function (e) {
    const self = this;
    let cancelBox, inputBox;
    cancelBox = createNode({
      mother: this,
      events: [
        {
          type: "click",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.removeChild(self.lastChild);
            self.removeChild(self.lastChild);
          }
        }
      ],
      style: {
        position: "fixed",
        width: String(100) + '%',
        height: String(100) + '%',
        top: String(0) + ea,
        left: String(0) + ea,
        zIndex: String(1),
      }
    });
    inputBox = createNode({
      mother: this,
      mode: "input",
      attribute: [
        { type: "text" },
        { value: this.textContent },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        {
          type: "keydown",
          event: function (e) {
            if (e.key === "Enter" || e.key === "Tab") {
              e.preventDefault();
              this.blur();
            }
          }
        },
        {
          type: "blur",
          event: function (e) {
            let targets, tong, temp, amount;
            e.preventDefault();
            this.parentElement.firstChild.textContent = this.value;
            this.parentElement.setAttribute("value", this.value.replace(/[^0-9\.]/gi, ''));

            targets = document.querySelectorAll('.' + updateClassName);
            tong = {};
            for (let dom of targets) {
              tong[dom.getAttribute("name")] = Number(dom.getAttribute("value").replace(/[^0-9\.]/gi, ''));
            }

            instance.samples.standard.unit.meters = tong.meters;
            instance.samples.standard.unit.seconds = tong.seconds;
            instance.samples.standard.consulting.hours = tong.hours;
            instance.samples.standard.consulting.labor = tong.labor;

            for (let obj of instance.samples.designers) {
              for (let obj2 of obj.detail) {
                temp = (obj2.distance * tong.meters * 2) + (tong.seconds * obj2.time * 2);
                amount = (Math.round(temp / 1000) * 1000) + (tong.hours * tong.labor);
                obj2.amount = amount;
                obj2.amountString = autoComma(amount) + '원';
              }
            }

            instance.priceTravelDetail();
          }
        }
      ],
      style: {
        position: "absolute",
        width: String(100) + '%',
        height: String(100) + '%',
        top: String(0) + ea,
        left: String(0) + ea,
        zIndex: String(1),
        border: String(0),
        outline: String(0),
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
      }
    });
    inputBox.focus();
  }

  saveEvent = function (e) {
    let targets, tong, temp, amount;

    targets = document.querySelectorAll('.' + updateClassName);
    tong = {};
    for (let dom of targets) {
      tong[dom.getAttribute("name")] = Number(dom.getAttribute("value").replace(/[^0-9\.]/gi, ''));
    }

    instance.samples.standard.unit.meters = tong.meters;
    instance.samples.standard.unit.seconds = tong.seconds;
    instance.samples.standard.consulting.hours = tong.hours;
    instance.samples.standard.consulting.labor = tong.labor;

    for (let obj of instance.samples.designers) {
      for (let obj2 of obj.detail) {
        temp = (obj2.distance * tong.meters * 2) + (tong.seconds * obj2.time * 2);
        amount = (Math.round(temp / 1000) * 1000) + (tong.hours * tong.labor);
        obj2.amount = amount;
        obj2.amountString = autoComma(amount) + '원';
      }
    }

    ajaxJson({
      mode: "update",
      db: "console",
      collection: "designerPrice",
      whereQuery: { key: 33 },
      updateQuery: {
        "travel.unit.meters": tong.meters,
        "travel.unit.seconds": tong.seconds,
        "travel.consulting.hours": tong.hours,
        "travel.consulting.labor": tong.labor,
      }
    }, "/generalMongo").then((json) => {
      window.alert("저장되었습니다!");
    }).catch((err) => {
      console.log(err);
    });

  }

  cleanChildren(travelBase);

  baseTong = createNode({
    mother: travelBase,
    style: {
      position: "relative",
      top: String(margin) + ea,
      left: String(leftMargin) + ea,
      width: withOut(100, leftMargin * 2, ea),
      paddingBottom: String(totalPaddingBottom) + ea,
      background: colorChip.white,
    }
  });

  createNode({
    mother: baseTong,
    style: {
      position: "relative",
      display: "block",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      color: colorChip.black,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      marginBottom: String(blockMargin) + ea,
    },
    children: [
      {
        text: "미터당 가격 : ",
        style: {
          display: "inline-block",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          paddingRight: String(betweenWords) + ea,
        }
      },
      {
        text: String(samples.standard.unit.meters) + "원",
        events: [ { type: "click", event: updateEvent } ],
        class: [ updateClassName ],
        attribute: [ { name: "meters" }, { value: String(samples.standard.unit.meters) } ],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: colorChip.green,
          cursor: "pointer",
          paddingRight: String(between) + ea,
        }
      },
      {
        text: "초당 가격 : ",
        style: {
          display: "inline-block",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          paddingRight: String(betweenWords) + ea,
        }
      },
      {
        text: String(samples.standard.unit.seconds) + "원",
        events: [ { type: "click", event: updateEvent } ],
        class: [ updateClassName ],
        attribute: [ { name: "seconds" }, { value: String(samples.standard.unit.seconds) } ],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: colorChip.green,
          paddingRight: String(between) + ea,
        }
      },
      {
        text: "1회 미팅 시간 : ",
        style: {
          display: "inline-block",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          paddingRight: String(betweenWords) + ea,
        }
      },
      {
        text: String(samples.standard.consulting.hours) + "시간",
        events: [ { type: "click", event: updateEvent } ],
        class: [ updateClassName ],
        attribute: [ { name: "hours" }, { value: String(samples.standard.consulting.hours) } ],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: colorChip.green,
          paddingRight: String(between) + ea,
        }
      },
      {
        text: "시간당 인건비 : ",
        style: {
          display: "inline-block",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          paddingRight: String(betweenWords) + ea,
        }
      },
      {
        text: autoComma(samples.standard.consulting.labor) + "원",
        events: [ { type: "click", event: updateEvent } ],
        class: [ updateClassName ],
        attribute: [ { name: "labor", value: String(samples.standard.consulting.labor) } ],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: colorChip.green,
          paddingRight: String(between) + ea,
        }
      },
    ]
  });

  num = 0;
  for (let { desid, designer, address, detail } of samples.designers) {
    tong = createNode({
      mother: baseTong,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(size) + ea,
        fontWeight: String(500),
        color: colorChip.black,
        width: String(totalTongWidth) + ea,
        marginBottom: String(blockMargin) + ea,
        marginRight: String(num % 2 === 0 ? (leftMargin - betweenWords + (leftMargin * 0.5)) : 0) + ea,
      }
    });
    [ designerTong, contentsTong ] = createNodes([
      {
        mother: tong,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(designerTongWidth) + ea,
          height: String(100) + '%',
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          verticalAlign: "top",
        },
        children: [
          {
            text: designer,
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(600),
              color: "inherit",
              paddingRight: String(betweenWords) + ea,
            }
          },
          {
            text: desid,
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(200),
              color: colorChip.gray5,
              paddingRight: String(betweenWords) + ea,
            }
          },
          {
            text: address.replace(/ \([^\)]+\)/gi, '').slice(0, 27).split(' ').slice(0, (smallBoo ? 2 : (veryBigBoo ? 20 : 3))).join(' '),
            style: {
              display: "block",
              fontSize: "inherit",
              fontWeight: String(400),
              color: "inherit",
              marginTop: String(lineTop) + ea,
              paddingRight: String(betweenWords) + ea,
            }
          },
        ]
      },
      {
        mother: tong,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(contentsTongWidth) + ea,
          height: String(100) + '%',
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          verticalAlign: "top",
        }
      }
    ]);

    for (let { amountString: amount, distanceString: distance, timeString: time, to } of detail) {
      createNode({
        mother: contentsTong,
        style: {
          display: "block",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          height: String(100) + '%',
          marginBottom: String(contentsMargin) + ea,
        },
        children: [
          {
            text: to.replace(/ \([^\)]+\)/gi, '').slice(0, 27).split(' ').slice(0, (smallBoo ? 2 : (veryBigBoo ? 20 : 3))).join(' '),
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(400),
              color: "inherit",
              width: String(addressWidth) + ea,
              paddingRight: String(betweenWords) + ea,
            }
          },
          {
            text: distance,
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(200),
              color: colorChip.gray5,
              width: String(distanceWidth) + ea,
              paddingRight: String(betweenWords) + ea,
            }
          },
          {
            text: time,
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(200),
              color: colorChip.gray5,
              width: String(timeWidth) + ea,
              paddingRight: String(betweenWords) + ea,
            }
          },
          {
            text: amount,
            style: {
              display: "inline-block",
              fontSize: "inherit",
              fontWeight: String(400),
              color: colorChip.green,
              width: String(amountWidth) + ea,
            }
          },
        ]
      })
    }

    num++;
  }

  createNode({
    mother: travelBase,
    class: [ "hoverDefault_lite" ],
    events: [ { type: "click", event: saveEvent } ],
    style: {
      position: "fixed",
      bottom: String(belowHeight + buttonBottom) + ea,
      right: String(buttonRight) + ea,
      width: String(buttonWidth) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(3) + "px",
      background: colorChip.gradientGreen,
    },
    children: [
      {
        text: "저장",
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(500),
          color: colorChip.white,
          width: String(100) + '%',
          textAlign: "center",
          top: String(buttonTextTop) + ea,
        }
      }
    ]
  });

}

DesignerJs.prototype.priceFeeAdjust = function () {
  const instance = this;
  const { createNode, createNodes, withOut, colorChip, ajaxJson } = GeneralJs;
  return function (e) {
    const { ea, matrixBase, garoStandards } = instance;
    const length = garoStandards.length;
    const className = "feeTarget";
    const classNameValue = "feeTargetValue";
    const fee = instance.price.pick(3, 3).fee;
    if (document.querySelector('.' + className) === null) {
      let top;
      let height, width;
      let size;

      top = <%% 16, 19, 19, 19, 19 %%>;
      width = 72;
      size = <%% 28, 24, 24, 24, 24 %%>;
      height = (top * 2) + size + 19;

      createNode({
        mother: matrixBase,
        class: [ className ],
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          background: colorChip.gray5,
          opacity: String(0.6),
        }
      });

      for (let i = 0; i < length; i++) {
        createNodes([
          {
            mother: matrixBase,
            class: [ className ],
            events: [
              {
                type: "click",
                event: function (e) {
                  const targets = document.querySelectorAll('.' + className);
                  for (let dom of targets) {
                    dom.parentElement.removeChild(dom);
                  }
                }
              }
            ],
            style: {
              position: "absolute",
              width: "calc(100% / " + String(length) + ")",
              height: String(100) + '%',
              top: String(0),
              left: "calc(calc(100% / " + String(length) + ") * " + String(i) + ")",
              cursor: "pointer",
            }
          },
          {
            mother: -1,
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
            }
          },
          {
            mother: -1,
            events: [ { type: "click", event: (e) => { e.stopPropagation(); } } ],
            style: {
              position: "absolute",
              width: String(width) + '%',
              height: String(height) + ea,
              left: String((100 - width) / 2) + '%',
              top: withOut(50, (height / 2), ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeup 0.3s ease forwards",
            }
          },
          {
            mother: -1,
            text: String(fee[i]) + '%',
            attribute: [
              { index: String(i) }
            ],
            class: [ classNameValue ],
            events: [
              {
                type: "click",
                event: function (e) {
                  e.stopPropagation();
                  const index = Number(this.getAttribute("index"));
                  const input = createNode({
                    mother: this.parentNode,
                    mode: "input",
                    attribute: [
                      { type: "text" },
                      { value: this.textContent },
                      { index: String(index) },
                    ],
                    events: [
                      {
                        type: "keydown",
                        event: async function (e) {
                          try {
                            if (e.key === "Tab" || e.key === "Enter") {
                              e.stopPropagation();
                              e.preventDefault();
                              const index = Number(this.getAttribute("index"));
                              const children = document.querySelectorAll('.' + classNameValue);
                              const next = (children[index + 1] === undefined) ? children[0] : children[index + 1];
                              const mother = children[index].parentElement;
                              instance.price.pick(3, 3).fee[index] = Number(this.value.replace(/[^0-9]/g, ''));
                              await ajaxJson({
                                mode: "update",
                                db: "console",
                                collection: "designerPrice",
                                whereQuery: { key: 33 },
                                updateQuery: { fee: instance.price.pick(3, 3).fee }
                              }, "/generalMongo");
                              mother.querySelector("div").textContent = String(instance.price.pick(3, 3).fee[index]) + '%';
                              mother.removeChild(mother.querySelector("input"));
                              if (e.key === "Tab") {
                                next.click();
                              }
                            }
                          } catch (e) {
                            console.log(e);
                          }
                        }
                      }
                    ],
                    style: {
                      position: "absolute",
                      fontSize: String(size) + ea,
                      fontFamily: "graphik",
                      fontWeight: String(200),
                      color: colorChip.red,
                      width: String(100) + '%',
                      textAlign: "center",
                      top: String(top) + ea,
                      border: String(0),
                      outline: String(0),
                    }
                  });
                  input.focus();
                }
              }
            ],
            style: {
              position: "absolute",
              fontSize: String(size) + ea,
              fontFamily: "graphik",
              fontWeight: String(200),
              color: colorChip.green,
              width: String(100) + '%',
              textAlign: "center",
              top: String(top) + ea,
            }
          }
        ]);
      }
    } else {
      const targets = document.querySelectorAll('.' + className);
      for (let dom of targets) {
        dom.parentElement.removeChild(dom);
      }
    }
  }
}

DesignerJs.prototype.priceView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, sleep, cssInjection } = GeneralJs;
    let loading, price;

    cssInjection("* { transition: all 0.2s ease }");
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
      allCase(key0, key1) {
        if (typeof key0 !== "number" || typeof key1 !== "number") {
          throw new Error("input must be level, level");
        }
        const words = [ "하", "중", "상" ];
        const add = (num) => { return ((num + 1) === 4 ? 1 : (num + 1)); }
        const subtract = (num) => { return ((num - 1) === 0 ? 3 : (num - 1)); }
        let arr;
        let standard;
        let tempArr;
        let order = [
          [ subtract(key0), add(key1) ],
          [ key0, add(key1) ],
          [ add(key0), add(key1) ],
          [ subtract(key0), key1 ],
          [ key0, key1 ],
          [ add(key0), key1 ],
          [ subtract(key0), subtract(key1) ],
          [ key0, subtract(key1) ],
          [ add(key0), subtract(key1) ],
        ];
        tempArr = [];
        arr = [];
        for (let [ x, y ] of order) {
          tempArr.push(words[x - 1] + words[y - 1]);
          arr.push(this.pick(x, y));
        }
        standard = [];
        for (let i = 0; i < 36; i++) {
          standard.push(JSON.parse(JSON.stringify(tempArr)));
        }
        return { price: (new PriceMatrix(arr)), standard };
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
    this.seroStandards = this.price.pick(3, 3).standard.y.string;
    this.garoStandards = this.price.pick(3, 3).standard.x.string;
    this.key = [ 2, 2 ];
    this.doms = null;
    this.eventFunc = null;
    this.cancelBox = null;
    this.belowPannel = null;
    this.newcomer = {
      boo: false,
      ratio: this.price.pick(3, 3).newcomer
    };
    this.premium = {
      boo: false,
      ratio: this.price.pick(3, 3).premium
    };
    this.matrixBase = null;
    this.priceBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
