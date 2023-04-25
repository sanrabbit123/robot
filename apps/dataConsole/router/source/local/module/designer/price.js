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
  this.pricePannel();
  this.priceAllCase();
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
  const { createNode, createNodes, colorChip, withOut, isMac, ajaxJson } = GeneralJs;
  const { price, standard } = pricePast.allCase(...this.key);
  const className = "caseTarget";
  const validRangeNumber = 12;
  let subSize;
  let size;
  let x, y;
  let removeTargets;
  let topStart, between;
  let lineHeight;
  let leftPadding;

  subSize = <%% 5, 4, 4, 4, 4 %%>;
  size = <%% 16, 15, 15, 15, 15 %%>;
  topStart = isMac() ? 9 : 10;
  between = isMac() ? 7 : 6;
  lineHeight = 21;
  leftPadding = 16;

  this.newcomer.boo = false;
  this.premium.boo = false;
  document.getElementById("newcomerBoo").textContent = 'N';
  document.getElementById("premiumBoo").textContent = 'N';

  for (let i = 0; i < doms.length; i++) {
    x = Number(doms[i].getAttribute('x'));
    y = Number(doms[i].getAttribute('y'));
    for (let j = 0; j < price.length; j++) {

      createNode({
        mother: doms[i],
        class: [ className ],
        text: standard[i][j],
        style: {
          position: "absolute",
          fontSize: String(subSize) + ea,
          fontWeight: String(700),
          textAlign: "center",
          color: j >= validRangeNumber ? colorChip.deactive : colorChip.green,
          width: "calc(calc(100% - " + String(leftPadding * 3) + ea + ") / 4)",
          top: "calc(" + String(topStart) + "% + calc(" + String(lineHeight) + "% * " + String(Math.floor(j / 4)) + "))",
          left: "calc(" + String(leftPadding) + ea + " + calc(calc(calc(100% - " + String(leftPadding * 2) + ea + ") / 4) * " + String(j % 4) + "))",
        }
      });
      createNode({
        mother: doms[i],
        class: [ className ],
        attribute: {
          key: String(price[j].key),
          x: String(x),
          y: String(y),
          i: String(i),
          j: String(j),
          value: String(price[j].matrix[x][y]),
        },
        event: {
          click: function (e) {
            const self = this;
            const tempTargetClassName = "tempTargetClassName";
            const key = Number(this.getAttribute("key"));
            const x = Number(this.getAttribute("x"));
            const y = Number(this.getAttribute("y"));
            const i = Number(this.getAttribute("i"));
            const j = Number(this.getAttribute("j"));
            const value = Number(this.getAttribute("value"));
            let cancelBack, input;

            cancelBack = createNode({
              mother: doms[i],
              class: [ tempTargetClassName ],
              event: {
                click: function (e) {
                  const removeTargets = document.querySelectorAll('.' + tempTargetClassName);
                  for (let dom of removeTargets) {
                    dom.remove();
                  }
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
              mother: doms[i],
              class: [ tempTargetClassName ],
              mode: "input",
              attribute: {
                type: "text",
              },
              event: {
                keypress: async function (e) {
                  if (e.key === "Enter") {
                    try {
                      if (this.value.replace(/[^0-9]/gi, '') === '') {
                        this.value = String(0);
                      } else {
                        this.value = this.value.replace(/[^0-9]/gi, '');
                      }
                      const finalValue = Number(this.value);
                      const removeTargets = document.querySelectorAll('.' + tempTargetClassName);
                      let updateQuery;

                      updateQuery = {};
                      updateQuery["matrix." + String(x) + '.' + String(y)] = finalValue;
                      await ajaxJson({
                        mode: "update",
                        db: "console",
                        collection: "designerPrice",
                        whereQuery: { key: key },
                        updateQuery
                      }, BACKHOST + "/generalMongo");
                      instance.price.pick(Math.floor(key / 10), key % 10).matrix[x][y] = finalValue;
                      self.setAttribute("value", String(finalValue));
                      self.textContent = String(finalValue);
                      for (let dom of removeTargets) {
                        dom.remove();
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              },
              style: {
                position: "absolute",
                fontSize: String(size) + ea,
                fontWeight: String(300),
                fontFamily: "graphik",
                textAlign: "center",
                color: colorChip.green,
                width: "calc(calc(100% - " + String(leftPadding * 3) + ea + ") / 4)",
                top: "calc(" + String(topStart + between) + "% + calc(" + String(lineHeight) + "% * " + String(Math.floor(j / 4)) + "))",
                left: "calc(" + String(leftPadding) + ea + " + calc(calc(calc(100% - " + String(leftPadding * 2) + ea + ") / 4) * " + String(j % 4) + "))",
                border: String(0),
                outline: String(0),
                background: colorChip.white,
                zIndex: String(1),
              }
            });

            input.value = String(value);
            input.focus();

          }
        },
        text: String(price[j].matrix[x][y]),
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(300),
          fontFamily: "graphik",
          textAlign: "center",
          color: j >= validRangeNumber ? colorChip.gray3 : colorChip.black,
          width: "calc(calc(100% - " + String(leftPadding * 3) + ea + ") / 4)",
          top: "calc(" + String(topStart + between) + "% + calc(" + String(lineHeight) + "% * " + String(Math.floor(j / 4)) + "))",
          left: "calc(" + String(leftPadding) + ea + " + calc(calc(calc(100% - " + String(leftPadding * 2) + ea + ") / 4) * " + String(j % 4) + "))",
        }
      });

    }
  }

}

DesignerJs.prototype.pricePannel = function () {
  const instance = this;
  const { ea, belowPannel } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const standard = [ "없", "하", "중", "상" ];
  const widthSpec = {
    left: [
      89.47,
      13.84,
      117.14,
      13.84,
      89.47,
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
      72.42,
      72.42,
    ]
  };
  const priceTravelButton = "priceTravelButton";
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
  let premiumEvent;
  let newcomerEvent;
  let premiumRatioEvent;
  let newcomerRatioEvent;
  let onlineEvent;
  let onlineViewEvent;

  price = this.price.pick(3, 3);

  motherHeight = Number(belowPannel.style.height.replace(/[^0-9]/gi, ''));
  size = 16;
  margin = 24;
  top = isMac() ? 17 : 19;
  between = 8;
  betweenWords = margin * 1;

  clickEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (/디자이너/gi.test(document.getElementById(priceTravelButton).textContent)) {
      instance.priceTravel().call(document.getElementById(priceTravelButton));
    }
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
    target.textContent = standard[num];
    price = instance.price.pick(...instance.key);
    instance.priceNumbers();
  }
  premiumEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (/디자이너/gi.test(document.getElementById(priceTravelButton).textContent)) {
      instance.priceTravel().call(document.getElementById(priceTravelButton));
    }
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
    if (/디자이너/gi.test(document.getElementById(priceTravelButton).textContent)) {
      instance.priceTravel().call(document.getElementById(priceTravelButton));
    }
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
      if (/디자이너/gi.test(document.getElementById(priceTravelButton).textContent)) {
        instance.priceTravel().call(document.getElementById(priceTravelButton));
      }
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
      if (/디자이너/gi.test(document.getElementById(priceTravelButton).textContent)) {
        instance.priceTravel().call(document.getElementById(priceTravelButton));
      }
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
    class: [ "hoverDefault_lite" ],
    text: "디자이너 판단",
    events: [ { type: "click", event: this.priceDesignersLevel() } ],
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
    text: "온라인 관리",
    events: [
      {
        type: [ "click", "contextmenu" ],
        event: this.priceOnlineAdjust(),
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

  accumulate += widthSpec.right[8] + betweenWords;
  ratio3 = createNode({
    mother: belowPannel,
    class: [ "hoverDefault_lite" ],
    id: priceTravelButton,
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

DesignerJs.prototype.priceDesignersLevel = function () {
  const instance = this;
  return function (e) {
    let samples;
    if (instance.levelBase === undefined || instance.levelBase === null) {
      const levelBase = instance.matrixBase.cloneNode(false);
      instance.matrixBase.style.display = "none";
      instance.garoZone.style.opacity = String(0.2);
      instance.seroZone.style.opacity = String(0.2);
      instance.levelBase = levelBase;
      instance.samples = samples;
      instance.matrixBase.parentElement.appendChild(levelBase);
      instance.priceDesignersLevelDetail();
    } else {
      instance.matrixBase.parentElement.removeChild(instance.levelBase);
      instance.matrixBase.style.display = "block";
      instance.garoZone.style.opacity = String(1);
      instance.seroZone.style.opacity = String(1);
      instance.levelBase = null;
    }
  }
}

DesignerJs.prototype.priceDesignersLevelDetail = function () {
  const instance = this;
  const { ea, levelBase, designers } = this;
  const { createNode, createNodes, withOut, colorChip, autoComma, cleanChildren, ajaxJson, isMac } = GeneralJs;
  const levelWords = [ '없', '하', '중', '상' ];
  const className = "baguni";
  let leftMargin, margin, baseTong;
  let size;
  let blocks;
  let blockMargin;
  let titleHeight;
  let innerMargin;
  let textTop;
  let x, y;
  let designerBlock;
  let blockSplit;
  let innerBlockMargin;
  let innerBlockSize;
  let innerBlockTextTop;
  let innerBlockHeight;
  let baguni;
  let dropEvent;
  let dragenterEvent;
  let dragleaveEvent;
  let dragoverEvent;

  size = 13;
  margin = 20;
  leftMargin = 32;
  blockMargin = 8;
  titleHeight = 24;
  innerMargin = 8;
  textTop = 1;
  innerBlockMargin = 4;
  innerBlockSize = 11;
  innerBlockTextTop = isMac() ? 5 : 7;
  innerBlockHeight = 27;
  blockSplit = 6;

  cleanChildren(levelBase);

  designerBlock = function (designer, fiveBoo = false) {
    let block, name;
    let style;

    block = GeneralJs.nodes.div.cloneNode(true);
    block.setAttribute("x", String(designer.analytics.construct.level));
    block.setAttribute("y", String(designer.analytics.styling.level));
    block.setAttribute("draggable", "true");
    block.setAttribute("desid", designer.desid);
    block.id = designer.desid;
    style = {
      position: "relative",
      display: "inline-block",
      marginRight: String(fiveBoo ? 0 : innerBlockMargin) + ea,
      marginBottom: String(innerBlockMargin) + ea,
      background: colorChip.white,
      width: "calc(calc(100% - " + String(innerBlockMargin * (blockSplit - 1)) + ea + ") / " + String(blockSplit) + ")",
      height: String(innerBlockHeight) + ea,
      borderRadius: String(3) + "px",
      cursor: "pointer",
      transition: "all 0s ease",
    }
    block.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("dragData", this.getAttribute("desid"));
    });
    block.addEventListener("dragenter", (e) => { e.preventDefault(); });
    block.addEventListener("dragleave", (e) => { e.preventDefault(); });
    block.addEventListener("dragover", (e) => { e.preventDefault(); });
    block.addEventListener("drop", (e) => { e.preventDefault(); });
    for (let i in style) {
      block.style[i] = style[i];
    }

    name = GeneralJs.nodes.div.cloneNode(true);
    name.textContent = designer.designer;
    style = {
      position: "absolute",
      top: String(innerBlockTextTop) + ea,
      width: String(100) + '%',
      textAlign: "center",
      fontSize: String(innerBlockSize) + ea,
      fontWeight: String(500),
      color: colorChip.black,
      wordSpacing: String(-1),
      transition: "all 0s ease",
    }
    for (let i in style) {
      name.style[i] = style[i];
    }

    block.appendChild(name);

    return block;
  }

  baseTong = createNode({
    mother: levelBase,
    style: {
      position: "relative",
      top: String(margin - textTop) + ea,
      left: String(leftMargin) + ea,
      width: withOut(100, leftMargin * 2, ea),
      height: withOut(100, margin + (margin - textTop), ea),
    }
  });

  blocks = [];
  dragenterEvent = function (e) {
    e.preventDefault();
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const thisTarget = blocks["xy" + String(x) + String(y)];
    const baguni = thisTarget.querySelector('.' + className);
    const pan = baguni.parentElement.parentElement;
    pan.style.background = colorChip.whiteGreen;
  }
  dragoverEvent = function (e) {
    e.preventDefault();
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const thisTarget = blocks["xy" + String(x) + String(y)];
    const baguni = thisTarget.querySelector('.' + className);
    const pan = baguni.parentElement.parentElement;
    pan.style.background = colorChip.whiteGreen;
  }
  dragleaveEvent = function (e) {
    e.preventDefault();
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const thisTarget = blocks["xy" + String(x) + String(y)];
    const baguni = thisTarget.querySelector('.' + className);
    const pan = baguni.parentElement.parentElement;
    pan.style.background = colorChip.gray1;
  }
  dropEvent = function (e) {
    e.preventDefault();
    const desid = e.dataTransfer.getData("dragData");
    const designerDom = document.getElementById(desid);
    const x = Number(this.getAttribute('x'));
    const y = Number(this.getAttribute('y'));
    const fromX = Number(designerDom.getAttribute('x'));
    const fromY = Number(designerDom.getAttribute('y'));
    const thisTarget = blocks["xy" + String(x) + String(y)];
    const fromTarget = blocks["xy" + String(fromX) + String(fromY)];
    const baguni = thisTarget.querySelector('.' + className);
    const fromBaguni = fromTarget.querySelector('.' + className);
    const pan = baguni.parentElement.parentElement;
    let length, fromLength;
    let whereQuery, updateQuery;
    pan.style.background = colorChip.gray1;
    baguni.appendChild(designerDom);

    length = baguni.children.length;
    fromLength = fromBaguni.children.length;
    for (let i = 0; i < length; i++) {
      baguni.children[i].style.marginRight = String(i % blockSplit === (blockSplit - 1) ? 0 : innerBlockMargin) + ea;
    }
    for (let i = 0; i < fromLength; i++) {
      fromBaguni.children[i].style.marginRight = String(i % blockSplit === (blockSplit - 1) ? 0 : innerBlockMargin) + ea;
    }

    designerDom.setAttribute('x', String(x));
    designerDom.setAttribute('y', String(y));
    whereQuery = { desid };
    updateQuery = { "analytics.construct.level": (x), "analytics.styling.level": (y) };
    instance.designers.update([ whereQuery, updateQuery ]);
    ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner").catch((err) => { console.log(err); });
  }
  for (let i = 0; i < 16; i++) {
    x = i % 4;
    y = 3 - Math.floor(i / 4);
    blocks.push(createNode({
      mother: baseTong,
      attribute: [
        { x: String(x) },
        { y: String(y) },
      ],
      events: [
        {
          type: "dragenter",
          event: (e) => { e.preventDefault(); }
        },
        {
          type: "dragleave",
          event: (e) => { e.preventDefault(); }
        },
        {
          type: "dragover",
          event: (e) => { e.preventDefault(); }
        },
      ],
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String(blockMargin * 3) + ea + ") / 4)",
        height: "calc(calc(100% - " + String(blockMargin * 3) + ea + ") / 4)",
        marginRight: String(i % 4 === 3 ? 0 : blockMargin) + ea,
        marginBottom: String(Math.floor(i / 4) === 3 ? 0 : blockMargin) + ea,
      },
      children: [
        {
          text: `시공 능력 <b style="color:${colorChip.green}">${levelWords[x]}</b>&nbsp;&nbsp;&nbsp;&nbsp;스타일링 능력 <b style="color:${colorChip.green}">${levelWords[y]}</b>`,
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            width: String(100) + '%',
            textAlign: "center",
            top: String(textTop) + ea,
            left: String(0) + ea,
          }
        },
        {
          style: {
            position: "relative",
            top: String(titleHeight) + ea,
            paddingTop: String(innerMargin) + ea,
            height: withOut(titleHeight + innerMargin, ea),
            borderRadius: String(3) + "px",
            background: colorChip.gray1,
            overflow: "hidden",
            transition: "all 0.4s ease",
          },
          children: [
            {
              attribute: [
                { x: String(x) },
                { y: String(y) },
              ],
              events: [
                {
                  type: "dragenter",
                  event: dragenterEvent
                },
                {
                  type: "dragleave",
                  event: dragleaveEvent
                },
                {
                  type: "dragover",
                  event: dragoverEvent
                },
                {
                  type: "drop",
                  event: dropEvent
                }
              ],
              style: {
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: withOut(innerMargin, ea),
                overflow: "scroll",
              },
              children: [
                {
                  class: [ className ],
                  attribute: [
                    { x: String(x) },
                    { y: String(y) },
                  ],
                  events: [
                    {
                      type: "dragenter",
                      event: dragenterEvent
                    },
                    {
                      type: "dragleave",
                      event: dragleaveEvent
                    },
                    {
                      type: "dragover",
                      event: dragoverEvent
                    },
                    {
                      type: "drop",
                      event: dropEvent
                    }
                  ],
                  style: {
                    position: "relative",
                    width: String(100) + '%',
                    height: "auto",
                  }
                }
              ]
            }
          ]
        }
      ]
    }));
    blocks["xy" + String(x) + String(y)] = blocks[blocks.length - 1];
  }

  for (let designer of designers) {
    baguni = blocks["xy" + String(designer.analytics.construct.level) + String(designer.analytics.styling.level)].querySelector('.' + className);
    baguni.appendChild(designerBlock(designer, baguni.children.length % blockSplit === (blockSplit - 1)));
  }

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
    const className = "grayTarget";
    const classNameValue = "grayTargetValue";
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
                  let targets, boo;
                  targets = document.querySelectorAll('.' + classNameValue);
                  boo = false;
                  for (let dom of targets) {
                    if (dom.parentElement.querySelector("input") !== null) {
                      boo = true;
                      dom.parentElement.removeChild(dom.parentElement.querySelector("input"));
                    }
                  }
                  if (!boo) {
                    targets = document.querySelectorAll('.' + className);
                    for (let dom of targets) {
                      dom.parentElement.removeChild(dom);
                    }
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

DesignerJs.prototype.priceOnlineAdjust = function () {
  const instance = this;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, autoComma, isMac } = GeneralJs;
  return function (e) {
    if (/디자이너/gi.test(document.getElementById("priceTravelButton").textContent)) {
      instance.priceTravel().call(document.getElementById("priceTravelButton"));
    }
    const { ea, matrixBase, seroStandards } = instance;
    const length = seroStandards.length;
    const className = "grayTarget";
    const classNameValue = "grayTargetValue";
    const online = instance.price.pick(3, 3).online;

    if (document.querySelector('.' + className) === null) {
      let top;
      let height, width;
      let size;
      let subPannel, subPannelBase;
      let subPannelMargin, subPannelWidth, subPannelHeight;
      let smallSize;
      let nodeArr;
      let subPannelLeftMargin, subPannelTopMargin, subPannelTextTop, lineHeight, subPannelInputWidth, subPannelInputHeight;

      top = 16;
      width = 120;
      size = 28;
      height = (top * 2) + size + 19;
      subPannelMargin = 32;
      subPannelWidth = 352;
      subPannelHeight = 148;
      smallSize = 16;
      subPannelLeftMargin = 24;
      subPannelTopMargin = 21;
      subPannelTextTop = 2.5;
      lineHeight = 38;
      subPannelInputWidth = 160;
      subPannelInputHeight = 29;

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
                  let targets, boo;
                  targets = document.querySelectorAll('.' + classNameValue);
                  boo = false;
                  for (let dom of targets) {
                    if (dom.parentElement.querySelector("input") !== null) {
                      boo = true;
                      dom.parentElement.removeChild(dom.parentElement.querySelector("input"));
                    }
                  }
                  if (!boo) {
                    targets = document.querySelectorAll('.' + className);
                    for (let dom of targets) {
                      dom.parentElement.removeChild(dom);
                    }
                  }
                }
              }
            ],
            style: {
              position: "absolute",
              height: "calc(100% / " + String(length) + ")",
              width: String(100) + '%',
              left: String(0),
              top: "calc(calc(100% / " + String(length) + ") * " + String(i) + ")",
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
              width: String(width) + ea,
              height: String(height) + ea,
              left: withOut(50, (width / 2), ea),
              top: withOut(50, (height / 2), ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeup 0.3s ease forwards",
            }
          },
          {
            mother: -1,
            text: String(online.matrix[i]) + "회",
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
                              instance.price.pick(3, 3).online.matrix[index] = Number(this.value.replace(/[^0-9]/g, ''));

                              await ajaxJson({
                                mode: "update",
                                db: "console",
                                collection: "designerPrice",
                                whereQuery: { key: 33 },
                                updateQuery: { online: instance.price.pick(3, 3).online }
                              }, "/generalMongo");

                              mother.querySelector("div").textContent = String(instance.price.pick(3, 3).online.matrix[index]) + '회';
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
              fontWeight: String(200),
              color: colorChip.green,
              width: String(100) + '%',
              textAlign: "center",
              top: String(top + (isMac() ? 0 : 5)) + ea,
            }
          }
        ]);
      }

      subPannel = createNode({
        mother: matrixBase,
        class: [ className ],
        style: {
          position: "absolute",
          width: String(subPannelWidth) + ea,
          height: String(subPannelHeight) + ea,
          right: String(subPannelMargin) + ea,
          bottom: String(subPannelMargin) + ea,
          background: colorChip.white,
          borderRadius: String(3) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeup 0.3s ease forwards",
        }
      });

      subPannelBase = createNode({
        mother: subPannel,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          fontSize: String(smallSize) + ea,
          fontWeight: String(500),
          color: colorChip.black,
        }
      });

      subContents = [
        { name: "온라인 감소치 최소값", value: online.minus.min, position: "online.minus.min" },
        { name: "온라인 감소치 최대값", value: online.minus.max, position: "online.minus.max" },
        { name: "온라인 절대량 최소값", value: online.absolute.min, position: "online.absolute.min" },
      ];

      nodeArr = [];

      for (let i = 0; i < subContents.length; i++) {
        nodeArr.push({
          mother: subPannelBase,
          text: subContents[i].name,
          style: {
            position: "absolute",
            fontSize: "inherit",
            fontWeight: String(300),
            color: "inherit",
            left: String(subPannelLeftMargin) + ea,
            top: String(subPannelTopMargin + subPannelTextTop + (lineHeight * i)) + ea,
          }
        });
        nodeArr.push({
          mother: subPannelBase,
          style: {
            position: "absolute",
            width: String(subPannelInputWidth) + ea,
            height: String(subPannelInputHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            right: String(subPannelLeftMargin) + ea,
            top: String(subPannelTopMargin + (lineHeight * i)) + ea,
            fontSize: "inherit",
            fontWeight: "inherit",
            color: "inherit",
          },
          children: [
            {
              mode: "input",
              attribute: [
                { index: String(i) },
                { type: "text" },
                { value: autoComma(subContents[i].value) + '원' },
              ],
              events: [
                {
                  type: "focus",
                  event: function (e) {
                    this.style.color = colorChip.green;
                  }
                },
                {
                  type: "blur",
                  event: function (e) {
                    const index = Number(this.getAttribute("index"));
                    const position = subContents[index].position;
                    let whereQuery, updateQuery;

                    whereQuery = { key: 33 };
                    updateQuery = {};
                    updateQuery[position] = Number(this.value.trim().replace(/[^0-9]/gi, ''));

                    ajaxJson({
                      mode: "update",
                      db: "console",
                      collection: "designerPrice",
                      whereQuery: whereQuery,
                      updateQuery: updateQuery
                    }, "/generalMongo").catch((err) => {
                      console.log(err);
                    });

                    instance.price.update([ whereQuery, updateQuery ]);
                    this.value = autoComma(Number(this.value.trim().replace(/[^0-9]/gi, ''))) + '원';
                    this.style.color = colorChip.black;
                  }
                },
                {
                  type: "keydown",
                  event: function (e) {
                    if (e.key === "Enter") {
                      this.blur();
                    }
                  }
                }
              ],
              style: {
                position: "absolute",
                width: String(100) + '%',
                height: String(isMac() ? 95 : 100) + '%',
                fontSize: String(smallSize - 1) + ea,
                fontWeight: "inherit",
                color: "inherit",
                border: String(0),
                outline: String(0),
                background: "transparent",
                textAlign: "center",
              }
            }
          ]
        });
      }

      createNodes(nodeArr);

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
        if (!(0 <= key0 && key0 < 4)) {
          throw new Error("invaild level");
        }
        if (!(0 <= key1 && key1 < 4)) {
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
        const words = [ "없", "하", "중", "상" ];
        const add = (num) => { return ((num + 1) === 4 ? 1 : (num + 1)); }
        const subtract = (num) => { return ((num - 1) === -1 ? 3 : (num - 1)); }
        const doubleAdd = (num) => { return ((num + 2) === 4 ? 1 : (num + 2)); }
        const doubleSubtract = (num) => { return ((num - 2) === -1 ? 3 : (num - 2)); }
        let arr;
        let standard;
        let tempArr;
        let order = [
          [ doubleSubtract(key0), add(key1) ],
          [ subtract(key0), add(key1) ],
          [ key0, add(key1) ],
          [ add(key0), add(key1) ],

          [ doubleSubtract(key0), key1 ],
          [ subtract(key0), key1 ],
          [ key0, key1 ],
          [ add(key0), key1 ],
          
          [ doubleSubtract(key0), subtract(key1) ],
          [ subtract(key0), subtract(key1) ],
          [ key0, subtract(key1) ],
          [ add(key0), subtract(key1) ],

          [ doubleSubtract(key0), doubleSubtract(key1) ],
          [ subtract(key0), doubleSubtract(key1) ],
          [ key0, doubleSubtract(key1) ],
          [ add(key0), doubleSubtract(key1) ],
        ];
        tempArr = [];
        arr = [];
        for (let [ x, y ] of order) {
          tempArr.push(words[x] + words[y]);
          arr.push(this.pick(x, y));
        }
        standard = [];
        for (let i = 0; i < 36; i++) {
          standard.push(JSON.parse(JSON.stringify(tempArr)));
        }

        return { price: (new PriceMatrix(arr)), standard };
      }
      update(queryArr) {
        if (!Array.isArray(queryArr)) {
          throw new Error("must be query arr");
        }
        if (queryArr.length !== 2) {
          throw new Error("must be query arr");
        }
        const [ whereQuery, updateQuery ] = queryArr;
        if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
          throw new Error("invaild query");
        }
        if (whereQuery.key === undefined) {
          throw new Error("invaild whereQuery");
        }
        let tempArr, targetObj;
        for (let position in updateQuery) {
          tempArr = position.split('.');
          targetObj = this.pick(Math.floor(whereQuery.key / 10), whereQuery.key % 10);
          for (let i = 0; i < tempArr.length - 1; i++) {
            targetObj = targetObj[tempArr[i]];
          }
          targetObj[tempArr[tempArr.length - 1]] = updateQuery[position];
        }
      }
    }

    loading = await this.mother.loadingRun();

    this.designers = new Designers(await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true }));
    this.domClassName = "priceDom";
    this.price = new PriceMatrix(await ajaxJson({
      mode: "read",
      db: "console",
      collection: "designerPrice",
      whereQuery: {},
    }, BACKHOST + "/generalMongo", { equal: true }));


    
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
