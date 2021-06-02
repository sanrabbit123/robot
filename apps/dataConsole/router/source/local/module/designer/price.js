DesignerJs.prototype.priceBase = function () {
  const instance = this;
  const { ea, belowHeight, garoStandards, seroStandards } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
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

  margin = 30;
  belowPannelHeight = 125;
  titleMargin_top = 38;
  titleMargin_left = 54;
  titleSize = 22;
  titleFontHeight = titleSize + 2;
  belowBottom = 40;

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
        width: withOut(100, titleMargin_left + belowPannelHeight - (margin / 2), ea),
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
        width: String(belowPannelHeight - margin) + ea,
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
  this.priceNumbers(createNodes(nodeArr));

  for (let i = 0; i < sero; i++) {
    createNodes([
      {
        mother: seroZone,
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
          top: withOut(50, (titleFontHeight / 2) + 4, ea),
          left: String(0) + ea,
        }
      }
    ]);
  }

  for (let i = 0; i < garo; i++) {
    createNodes([
      {
        mother: garoZone,
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

}

DesignerJs.prototype.priceNumbers = function (doms) {
  const instance = this;
  const price = this.price.pick(...this.key);
  const matrix = price.matrix[this.partial ? "partial" : "entire"];
  let x, y;
  for (let i = 0; i < doms.length; i++) {
    x = Number(doms[i].getAttribute('x'));
    y = Number(doms[i].getAttribute('y'));
    this.priceNumber(doms[i], matrix[y][x]);
  }
}

DesignerJs.prototype.priceNumber = function (mother, value) {
  const instance = this;

  console.log(mother, value);


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
    this.partial = false;

    this.priceBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
