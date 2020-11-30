class MapArray extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(i);
    }
  }
  get map() {
    const thisMap = new Map();
    let keys = Object.keys(this[0]);
    let anotherKey;
    for (let i of keys) {
      if (i !== "name") {
        anotherKey = i;
      }
    }

    for (let obj of this) {
      thisMap.set(obj.name, obj[anotherKey]);
    }
    return thisMap;
  }
}

const DashboardJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
  this.totalContents = this.mother.totalContents;
  this.margin = 14;
  this.borderRadius = 22;
}

DashboardJs.prototype.svgTitles = function (color) {
  const instance = this;
  const { items, src } = this.map.main.titles;
  let targetArr = [];
  for (let i = 0; i < items.length; i++) {
    targetArr.push({ name: items[i], svg: SvgTong[src[i].replace(/\.svg$/, '')] });
  }
  const resultArr = new MapArray(targetArr);
  this.titleMap = resultArr;
  return resultArr;
}

DashboardJs.prototype.spreadMatrix = function () {
  const instance = this;
  const { margin, borderRadius } = this;
  const titleMap = this.svgTitles("#303030");
  let div_clone, div_clone2, div_clone3;
  let svg_clone, svg_clone2;
  let tempArr, tempObj;
  let matrixMother;
  let style, ea = "px";
  let bigWidth, smallWidth;
  let bigHeight, smallHeight;
  let zeroLeft;
  let firstRight, secondRight, thirdRight;
  let firstTop, secondTop, thirdBottom;
  let cancelEvent;
  let bigSvgHeight;
  let detailSvgTop, detailSvgLeft;
  let categoryDetailBoxMargin;
  let detailSvgWordingHeight, detailSvgWordingWidth;

  bigSvgHeight = 21;
  detailSvgTop = 22;
  detailSvgLeft = 25;
  categoryDetailBoxMargin = 8;

  const generalStyle = {
    position: "absolute",
    background: "#f2f2f2",
    opacity: String(1),
    borderRadius: String(borderRadius - 6) + ea,
    cursor: "pointer",
  };

  const svgStyle = {
    position: "absolute",
    height: String(bigSvgHeight) + ea,
    top: String(detailSvgTop) + ea,
    left: String(detailSvgLeft) + ea,
    opacity: String(1),
    transform: "",
  };

  const categoryBoxStyle = {
    position: "relative",
    width: "calc(100% - " + String(detailSvgLeft * 2) + ea + ")",
    height: "calc(100% - " + String(bigSvgHeight + (detailSvgTop * 2.8)) + ea + ")",
    top: String(bigSvgHeight + (detailSvgTop * 1.6)) + ea,
    left: String(detailSvgLeft) + ea,
    borderRadius: String(borderRadius - 10) + ea,
    opacity: String(1),
    transform: "",
    transition: "all 0s ease",
  };

  const categoryDetailBoxStyle0 = {
    display: "inline-block",
    position: "relative",
    marginRight: String((categoryDetailBoxMargin - 3)) + ea,
    marginBottom: String((categoryDetailBoxMargin - 3)) + ea,
    width: "calc(calc(100% - " + String((categoryDetailBoxMargin - 3) * 3) + ea + ") / 4)",
    height: "calc(calc(100% - " + String((categoryDetailBoxMargin - 3) * 2) + ea + ") / 3)",
    background: "#dddddd",
    borderRadius: String(borderRadius - 13) + ea,
    color: "#dddddd",
  };

  const categoryDetailBoxStyle1 = {
    display: "inline-block",
    position: "relative",
    marginRight: String(categoryDetailBoxMargin) + ea,
    marginBottom: String(categoryDetailBoxMargin) + ea,
    width: "calc(calc(100% - " + String(categoryDetailBoxMargin * 3) + ea + ") / 4)",
    height: "calc(calc(100% - " + String(categoryDetailBoxMargin * 2) + ea + ") / 3)",
    background: "white",
    borderRadius: String(borderRadius - 10) + ea,
    color: "#2fa678",
  };

  bigWidth = "calc(50% - " + String(margin * 2.5) + ea + ")";
  smallWidth = "calc(calc(50% - " + String(margin * 4.5) + ea + ") / 3)";
  bigHeight = "calc(50% - " + String(margin * 2.5) + ea + ")";
  smallHeight = "calc(calc(100% - " + String(margin * 6) + ea + ") / 3)";

  zeroLeft = String(margin * 2) + ea;

  thirdRight = String(margin * 2) + ea;
  secondRight = "calc(" + thirdRight + ' + ' + smallWidth + ' + ' + String(margin) + ea + ")";
  firstRight = "calc(" + thirdRight + ' + ' + smallWidth + ' + ' + smallWidth + ' + ' + String(margin * 2) + ea + ")";

  firstTop = String(margin * 2) + ea;
  secondTop = "calc(" + firstTop + ' + ' + smallHeight + ' + ' + String(margin) + ea + ")";
  thirdBottom = firstTop;

  const matrixInfo = new MapArray([
    { name: this.map.main.titles.items[0], styleObj: { ...generalStyle, top: firstTop, left: zeroLeft, width: bigWidth, height: bigHeight, } },
    { name: this.map.main.titles.items[1], styleObj: { ...generalStyle, bottom: thirdBottom, left: zeroLeft, width: bigWidth, height: bigHeight, } },
    { name: this.map.main.titles.items[2], styleObj: { ...generalStyle, top: firstTop, right: firstRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[3], styleObj: { ...generalStyle, top: firstTop, right: secondRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[4], styleObj: { ...generalStyle, top: firstTop, right: thirdRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[5], styleObj: { ...generalStyle, top: secondTop, right: firstRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[6], styleObj: { ...generalStyle, top: secondTop, right: secondRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[7], styleObj: { ...generalStyle, top: secondTop, right: thirdRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[8], styleObj: { ...generalStyle, bottom: thirdBottom, right: firstRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[9], styleObj: { ...generalStyle, bottom: thirdBottom, right: secondRight, width: smallWidth, height: smallHeight, } },
    { name: this.map.main.titles.items[10], styleObj: { ...generalStyle, bottom: thirdBottom, right: thirdRight, width: smallWidth, height: smallHeight, } },
  ]);

  const makeMatrixEvents = function (index) {

    let bigWidth0, bigWidth1;
    let bigHeight0, bigHeight1, bigHeight2;
    let smallWidth0, smallHeight0;
    let firstRight0, secondRight0, thirdRight0;
    let firstRight1, secondRight1, thirdRight1;
    let smallHeight1, smallHeight2;
    let secondTop0, secondTop1;
    let smallWidth1;
    let smallSvgHeight;

    bigHeight0 = String((borderRadius * 2)) + ea;
    bigHeight1 = "calc(100% - " + String((borderRadius * 2 * 1) + (margin * 5)) + ea + ")";
    bigHeight2 = "calc(50% - " + String(margin * 2.5) + ea + ")";

    bigWidth0 = String((borderRadius * 2)) + ea;
    bigWidth1 = "calc(100% - " + String((borderRadius * 2 * 3) + (margin * 7)) + ea + ")";

    smallWidth0 = String(borderRadius * 2) + ea;
    smallHeight0 = "calc(calc(100% - " + String(margin * 6) + ea + ") / 3)";
    smallWidth1 = "calc(100% - " + String((borderRadius * 2 * 3) + (margin * 7)) + ea + ")";

    smallHeight1 = String(borderRadius * 2) + ea;
    smallHeight2 = "calc(100% - " + String((borderRadius * 2 * 2) + (margin * 6)) + ea + ")";

    firstRight0 = String((borderRadius * 2 * 2) + (margin * 4)) + ea;
    secondRight0 = String((borderRadius * 2) + (margin * 3)) + ea;
    thirdRight0 = String((margin * 2)) + ea;

    firstRight1 = "calc(100% - " + String((borderRadius * 2 * 2) + (margin * 3)) + ea + ")";
    secondRight1 = "calc(100% - " + String((borderRadius * 2 * 3) + (margin * 4)) + ea + ")";
    thirdRight1 = "calc(100% - " + String((borderRadius * 2 * 4) + (margin * 5)) + ea + ")";

    secondTop0 = "calc(" + smallHeight2 + " + " + String(margin * 3) + ea + ")";
    secondTop1 = String((borderRadius * 2 * 1) + (margin * 3)) + ea;

    smallSvgHeight = 15;

    const targetArr = [
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth1, height: bigHeight1 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth1, height: bigHeight0 },
          { top: firstTop, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth1, height: bigHeight0 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth1, height: bigHeight1 },
          { top: firstTop, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight0, width: smallWidth1, height: smallHeight2 },
          { top: firstTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop0, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight0, width: smallWidth1, height: smallHeight2 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop0, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth1, height: smallHeight2 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop0, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { top: firstTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: firstRight0, width: smallWidth1, height: smallHeight2 },
          { top: secondTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: secondRight0, width: smallWidth1, height: smallHeight2 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: thirdRight0, width: smallWidth1, height: smallHeight2 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { top: firstTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: firstRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight0, width: smallWidth1, height: smallHeight2 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { top: firstTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: secondRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight0, width: smallWidth1, height: smallHeight2 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth0, height: smallHeight0 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
        ],
      ],
      [
        [
          { top: firstTop, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { bottom: thirdBottom, left: zeroLeft, width: bigWidth0, height: bigHeight2 },
          { top: firstTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: firstTop, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
          { top: secondTop, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { top: secondTop1, right: thirdRight0, width: smallWidth1, height: smallHeight1 },
          { bottom: thirdBottom, right: firstRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: secondRight1, width: smallWidth0, height: smallHeight0 },
          { bottom: thirdBottom, right: thirdRight0, width: smallWidth1, height: smallHeight2 },
        ],
        [
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(0.2), height: String(smallSvgHeight) + ea, transform: "rotate(90deg)", top: "calc(50% - " + String(smallSvgHeight / 2) + ea + ")", left: "leftSvgCalculation", },
          { opacity: String(1), transform: "", ...svgStyle },
        ],
      ],
    ];

    return function (e) {
      for (let i = 0; i < instance.matrixDoms.length; i++) {
        for (let j in targetArr[index][0][i]) {
          instance.matrixDoms[i].dom.style[j] = targetArr[index][0][i][j];
        }
        for (let j in targetArr[index][1][i]) {
          if (targetArr[index][1][i][j] === "leftSvgCalculation") {
            instance.matrixDoms[i].dom.children[0].style[j] = "calc(50% - " + String((SvgTong.getRatio(instance.matrixDoms[i].dom.children[0]) * smallSvgHeight) / 2) + ea + ")";
          } else {
            instance.matrixDoms[i].dom.children[0].style[j] = targetArr[index][1][i][j];
          }
        }
        instance.matrixDoms[i].dom.children[1].style.transition = "all 0s ease";
        instance.matrixDoms[i].dom.children[1].style.opacity = String(0);
        for (let j = 0; j < instance.matrixDoms[i].dom.children[1].children.length; j++) {
          for (let k in categoryDetailBoxStyle1) {
            instance.matrixDoms[i].dom.children[1].children[j].style[k] = categoryDetailBoxStyle1[k];
          }
          if (j % 4 === 3) {
            instance.matrixDoms[i].dom.children[1].children[j].style.marginRight = "0";
          }
          if (j > 7) {
            instance.matrixDoms[i].dom.children[1].children[j].style.marginBottom = "0";
          }
          if (instance.matrixDoms[i].dom.children[1].children[j].querySelector('svg') !== null) {
            instance.matrixDoms[i].dom.children[1].children[j].querySelector('svg').style.display = "none";
          }
        }
      }
      GeneralJs.stacks["matrixTimeout"] = setTimeout(function () {
        for (let i = 0; i < instance.matrixDoms.length; i++) {
          instance.matrixDoms[i].dom.children[1].style.opacity = String(1);
          instance.matrixDoms[i].dom.children[1].style.transition = "all 0.5s ease";
        }
        for (let i = 0; i < instance.matrixDoms[index].dom.children[1].children.length; i++) {
          if (instance.matrixDoms[index].dom.children[1].children[i].querySelector('svg') !== null) {
            instance.matrixDoms[index].dom.children[1].children[i].querySelector('svg').style.display = "block";
          }
        }
        clearTimeout(GeneralJs.stacks["matrixTimeout"]);
        GeneralJs.stacks["matrixTimeout"] = null;
      }, 501);
    }

  }

  matrixMother = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: "100%",
    height: "calc(100% - " + String(this.belowHeight) + ea + ")",
  };
  for (let i in style) {
    matrixMother.style[i] = style[i];
  }

  tempArr = [];

  cancelEvent = function (e) {
    e.preventDefault();
    for (let i = 0; i < matrixInfo.length; i++) {
      for (let j in matrixInfo[i].styleObj) {
        instance.matrixDoms[i].dom.style[j] = matrixInfo[i].styleObj[j];
      }
      for (let j in svgStyle) {
        instance.matrixDoms[i].dom.children[0].style[j] = svgStyle[j];
      }

      instance.matrixDoms[i].dom.children[1].style.transition = "all 0s ease";
      instance.matrixDoms[i].dom.children[1].style.opacity = String(0);
      for (let j = 0; j < instance.matrixDoms[i].dom.children[1].children.length; j++) {
        for (let k in categoryDetailBoxStyle0) {
          instance.matrixDoms[i].dom.children[1].children[j].style[k] = categoryDetailBoxStyle0[k];
        }
        if (j % 4 === 3) {
          instance.matrixDoms[i].dom.children[1].children[j].style.marginRight = "0";
        }
        if (j > 7) {
          instance.matrixDoms[i].dom.children[1].children[j].style.marginBottom = "0";
        }
        if (instance.matrixDoms[i].dom.children[1].children[j].querySelector('svg') !== null) {
          instance.matrixDoms[i].dom.children[1].children[j].querySelector('svg').style.display = "none";
        }
      }

      GeneralJs.stacks["matrixTimeout"] = setTimeout(function () {
        for (let i = 0; i < instance.matrixDoms.length; i++) {
          instance.matrixDoms[i].dom.children[1].style.opacity = String(1);
          instance.matrixDoms[i].dom.children[1].style.transition = "all 0.5s ease";
        }
        clearTimeout(GeneralJs.stacks["matrixTimeout"]);
        GeneralJs.stacks["matrixTimeout"] = null;
      }, 501);

    }
  }

  for (let i = 0; i < matrixInfo.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.setAttribute("name", matrixInfo[i].name);
    for (let j in matrixInfo[i].styleObj) {
      div_clone.style[j] = matrixInfo[i].styleObj[j];
    }
    div_clone.addEventListener("click", makeMatrixEvents(i));
    div_clone.addEventListener("contextmenu", cancelEvent);

    svg_clone = SvgTong.stringParsing(titleMap.map.get(matrixInfo[i].name));
    for (let j in svgStyle) {
      svg_clone.style[j] = svgStyle[j];
    }
    div_clone.appendChild(svg_clone);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let j in categoryBoxStyle) {
      div_clone2.style[j] = categoryBoxStyle[j];
    }

    for (let j = 0; j < 12; j++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      for (let k in categoryDetailBoxStyle0) {
        div_clone3.style[k] = categoryDetailBoxStyle0[k];
      }
      if (j % 4 === 3) {
        div_clone3.style.marginRight = "0";
      }
      if (j > 7) {
        div_clone3.style.marginBottom = "0";
      }
      if (matrixInfo[i].name.toLowerCase() !== "calendar" && matrixInfo[i].name.toLowerCase() !== "navigation") {
        if (this.map.main.subTitles[matrixInfo[i].name.toLowerCase()].src[j] !== undefined) {
          svg_clone2 = SvgTong.stringParsing(SvgTong[this.map.main.subTitles[matrixInfo[i].name.toLowerCase()].src[j].replace(/\.svg$/, '')]);
          detailSvgWordingHeight = 20;
          detailSvgWordingWidth = SvgTong.getRatio(svg_clone2) * detailSvgWordingHeight;
          svg_clone2.style.position = "absolute";
          svg_clone2.style.height = String(detailSvgWordingHeight) + ea;
          svg_clone2.style.width = String(detailSvgWordingWidth) + ea;
          svg_clone2.style.top = "calc(50% - " + String((detailSvgWordingHeight / 2) + 4) + ea + ")";
          svg_clone2.style.left = "calc(50% - " + String(detailSvgWordingWidth / 2) + ea + ")";
          svg_clone2.style.display = "none";
          div_clone3.appendChild(svg_clone2);
        }
      }
      div_clone2.appendChild(div_clone3);
    }

    div_clone.appendChild(div_clone2);

    matrixMother.appendChild(div_clone);
    tempObj = {};
    tempObj.name = matrixInfo[i].name;
    tempObj.dom = div_clone;
    tempArr.push(tempObj);
  }

  this.matrixDoms = new MapArray(tempArr);
  this.matrixMother = matrixMother;
  this.totalContents.appendChild(matrixMother);
}

DashboardJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.spreadMatrix();

  } catch (e) {
    console.log(e);
  }
}
