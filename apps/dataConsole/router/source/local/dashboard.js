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
  this.standardItemNames = [];
  let { main: { titles: { items } } } = this.map;
  for (let i = 0; i < items.length; i++) {
    this.standardItemNames.push(items[i]);
  }
}

DashboardJs.prototype.svgTitles = function (color) {
  const instance = this;
  const { items, src, lightSrc } = this.map.main.titles;

  let targetArr = [];
  for (let i = 0; i < items.length; i++) {
    targetArr.push({ name: items[i], svg: SvgTong[src[i].replace(/\.svg$/, '')] });
  }
  const resultArr = new MapArray(targetArr);
  this.titleMap = resultArr;

  targetArr = [];
  for (let i = 0; i < items.length; i++) {
    targetArr.push({ name: items[i], svg: SvgTong[lightSrc[i].replace(/\.svg$/, '')] });
  }
  const lightArr = new MapArray(targetArr);
  this.titleLightMap = lightArr;

  return resultArr;
}

DashboardJs.prototype.projectStatus = async function (on = true) {
  const instance = this;
  const [ svgTitle, mainArea ] = this.matrixDoms[0].dom.children;
  const { main: { titles: { items, src } }, sub: { on: { src: onSrc }, numbers } } = this.map;
  while (mainArea.firstChild) {
    mainArea.removeChild(mainArea.lastChild);
  }
  mainArea.style.background = "#dddddd";
  if (on) {
    mainArea.style.background = "";
    try {
      let div_clone, div_clone2, div_clone3, svg_clone;
      let style;
      let barStyle, svgStyle, contentsStyle, svgSubStyle, detailBarStyle, detailNumberStyle;
      let ea = "px";
      let margin, height, top, height2;
      let detailsTop;
      let detailMargin;
      let middleMargin;

      margin = (8 / 976) * window.innerHeight;
      height = (20 / 976) * window.innerHeight;
      height2 = height * 0.9;
      top = (25 / 976) * window.innerHeight;
      detailsTop = [
        String(0) + '%',
        "calc(50% - " + String(height * 0.5) + ea + ")",
        "calc(100% - " + String(height2) + ea + ")"
      ];
      detailMargin = (10 / 976) * window.innerHeight;
      middleMargin = (2.5 / 976) * window.innerHeight;

      style = {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String(margin * 2) + ea + ") / 3)",
        height: "calc(calc(100% - " + String(margin * 2) + ea + ") / 3)",
        background: "white",
        borderRadius: String(5) + ea,
        marginRight: String(margin) + ea,
        marginBottom: String(margin) + ea,
      };

      barStyle = {
        position: "absolute",
        borderBottom: "1px solid #dddddd",
        height: String(0) + ea,
        width: "calc(100% - " + String((top) * 2) + ea + ")",
        left: String(top) + ea,
        top: String(top + height + margin) + ea,
      };

      contentsStyle = {
        position: "relative",
        height: "calc(51% - " + String(top / 3) + ea + ")",
        width: "calc(100% - " + String(top * 2) + ea + ")",
        left: String(top) + ea,
        top: "39%",
      };

      svgStyle = {
        position: "absolute",
        height: String(height) + ea,
        top: String(top) + ea,
        left: String(top) + ea,
      };

      svgSubStyle = JSON.parse(JSON.stringify(svgStyle));
      svgSubStyle.height = String(height2) + ea;
      svgSubStyle.left = String(0) + ea;

      detailBarStyle = {
        position: "absolute",
        borderBottom: "1px dashed #2fa678",
        height: String(0),
        opacity: String(0.4),
      };

      detailNumberStyle = {
        position: "absolute",
        height: String(height2) + ea,
      };

      for (let i = 2; i < items.length; i++) {

        //white tong
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }
        if (((i - 1) % 3) === 0) {
          div_clone.style.marginRight = String(0);
        }
        if (i > items.length - 4) {
          div_clone.style.marginBottom = String(0);
        }
        div_clone.setAttribute("name", items[i]);

        //title
        svg_clone = SvgTong.stringParsing(this.titleLightMap.map.get(items[i]))
        for (let j in svgStyle) {
          svg_clone.style[j] = svgStyle[j];
        }
        svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height) + ea;
        div_clone.appendChild(svg_clone);

        //title bar
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in barStyle) {
          div_clone2.style[j] = barStyle[j];
        }
        div_clone.appendChild(div_clone2);

        //contents box
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in contentsStyle) {
          div_clone2.style[j] = contentsStyle[j];
        }

        //details
        for (let j = 0; j < onSrc.length; j++) {

          //detail title
          svg_clone = SvgTong.stringParsing(SvgTong[onSrc[j].replace(/\.svg$/, '')]);
          for (let k in svgSubStyle) {
            svg_clone.style[k] = svgSubStyle[k];
          }
          svg_clone.style.top = detailsTop[j % (onSrc.length / 2)];
          svg_clone.style.left = ((j >= onSrc.length / 2) ? String(50 + middleMargin) : String(0)) + '%';
          svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height2) + ea;
          div_clone2.appendChild(svg_clone);

          //detail bar
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          for (let k in detailBarStyle) {
            div_clone3.style[k] = detailBarStyle[k];
          }
          div_clone3.style.top = "calc(" + detailsTop[j % (onSrc.length / 2)] + " + " + String(height2 / 2) + ea + ' - ' + String(2) + ea + ")";
          div_clone3.style.left = "calc(" + svg_clone.style.width + ' + ' + (((j >= onSrc.length / 2) ? String(50 + middleMargin) : String(0)) + '%') + ' + ' + String(detailMargin) + ea + ")";
          div_clone3.style.width = "calc(" + String(50 - middleMargin) + "% - " + String(SvgTong.getRatio(svg_clone) * height2) + ea + ")";
          div_clone2.appendChild(div_clone3);

          //detail number
          svg_clone = SvgTong.stringParsing(SvgTong[numbers[0].replace(/\.svg$/, '')]);
          for (let k in detailNumberStyle) {
            svg_clone.style[k] = detailNumberStyle[k];
          }
          svg_clone.style.top = detailsTop[j % (onSrc.length / 2)];
          svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height2) + ea;
          svg_clone.style.left = "calc(" + ((j >= onSrc.length / 2) ? String(100) : String(50 - middleMargin)) + '%' + " - " + svg_clone.style.width + ")";
          div_clone2.appendChild(svg_clone);

          div_clone3.style.width = "calc(" + div_clone3.style.width + " - " + svg_clone.style.width + " - " + String(detailMargin * 2) + ea + ")";

        }

        div_clone.appendChild(div_clone2);
        mainArea.appendChild(div_clone);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DashboardJs.prototype.memberBoard = async function (on = true) {
  const instance = this;
  const [ svgTitle, mainArea ] = this.matrixDoms[1].dom.children;
  const { main: { members: { names, src } }, sub: { memberWording: { src: memberWordingSrc } } } = this.map;
  while (mainArea.firstChild) {
    mainArea.removeChild(mainArea.lastChild);
  }

  const projectSamples = [
    3,
    7,
    2,
    5,
    4,
    6,
    1,
    3
  ];

  mainArea.style.background = "#dddddd";
  mainArea.style.paddingTop = GeneralJs.stacks["onMemberBoxPaddingTopPastConst"];
  mainArea.style.height = GeneralJs.stacks["onMemberBoxHeightPastConst"];

  if (on) {
    mainArea.style.background = "";
    mainArea.style.border = "1px solid #dddddd";
    mainArea.style.overflow = "scroll";
    mainArea.classList.add("noScrollBar");

    try {
      let div_clone, div_clone2, div_clone3, svg_clone;
      let style;
      let barStyle, svgStyle, projectBoxStyle;
      let ea = "px";
      let margin, height, top;
      let detailMargin;
      let middleMargin;
      let tempWidth;
      let initLeft;
      let marginRatio;
      let whiteBoxHeight;
      let circle;

      margin = (10 / 976) * window.innerHeight;
      height = (16 / 976) * window.innerHeight;
      top = (18 / 976) * window.innerHeight;
      detailMargin = (10 / 976) * window.innerHeight;
      middleMargin = (2.5 / 976) * window.innerHeight;
      initLeft = (16 / 976) * window.innerHeight;
      marginRatio = 1.4;
      whiteBoxHeight = (55 / 976) * window.innerHeight;

      GeneralJs.stacks["onMemberBoxPaddingTopPastConst"] = String(0) + ea;
      mainArea.style.paddingTop = String(margin) + ea;
      GeneralJs.stacks["onMemberBoxHeightPastConst"] = mainArea.style.height;
      mainArea.style.height = "calc(" + mainArea.style.height + " - " + String(margin) + ea + ")";

      style = {
        position: "relative",
        display: "block",
        width: "calc(100% - " + String(margin * 2) + ea + ")",
        height: String(whiteBoxHeight) + ea,
        background: "white",
        borderRadius: String(5) + ea,
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        marginBottom: String(margin) + ea,
      };

      barStyle = {
        position: "absolute",
        borderRight: "1px solid #dddddd",
        height: String(height + 2) + ea,
        width: String(0) + ea,
        left: String(top) + ea,
        top: String(top - 1) + ea,
      };

      svgStyle = {
        position: "absolute",
        height: String(height) + ea,
        top: String(top) + ea,
        left: String(top) + ea,
      };

      projectBoxStyle = {
        position: "absolute",
        background: "#59af89",
        borderRadius: String(5) + ea,
        height: "58%",
        width: String(80) + ea,
        top: "21%",
        cursor: "pointer",
      };

      for (let i = 0; i < names.length; i++) {

        //white tong
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }
        div_clone.setAttribute("name", names[i]);

        //name
        svg_clone = SvgTong.stringParsing(SvgTong[src[i].replace(/\.svg$/, '')]);
        for (let k in svgStyle) {
          svg_clone.style[k] = svgStyle[k];
        }
        svg_clone.style.top = "calc(50% - " + String((top / 2) + 1) + ea + ")";
        svg_clone.style.left = String(initLeft) + ea;
        tempWidth = SvgTong.getRatio(svg_clone) * height;
        svg_clone.style.width = String(tempWidth) + ea;
        div_clone.appendChild(svg_clone);

        //bar
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in barStyle) {
          div_clone2.style[j] = barStyle[j];
        }
        div_clone2.style.top = "calc(50% - " + String((top / 2) + 1) + ea + ")";
        div_clone2.style.left = String(tempWidth + (margin * marginRatio) + initLeft) + ea;
        div_clone.appendChild(div_clone2);

        //daily work wording
        svg_clone = SvgTong.stringParsing(SvgTong[memberWordingSrc[0].replace(/\.svg$/, '')]);
        svg_clone.classList.add("hoverDefault");
        for (let k in svgStyle) {
          svg_clone.style[k] = svgStyle[k];
        }
        svg_clone.style.top = "calc(50% - " + String((top / 2) + 1) + ea + ")";
        svg_clone.style.left = String(tempWidth + (margin * (marginRatio * 2)) + initLeft) + ea;
        svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height) + ea;
        svg_clone.style.cursor = "pointer";
        svg_clone.addEventListener("click", function (e) {
          window.open("https://drive.google.com/drive/folders/1AGAmAGuj3C5UbdnR50n24WXuSKNbyNmx?usp=sharing", "_blank");
        });
        div_clone.appendChild(svg_clone);
        tempWidth = tempWidth + (margin * (marginRatio * 2)) + initLeft + (SvgTong.getRatio(svg_clone) * height);

        //bar
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in barStyle) {
          div_clone2.style[j] = barStyle[j];
        }
        div_clone2.style.top = "calc(50% - " + String((top / 2) + 1) + ea + ")";
        div_clone2.style.left = String(tempWidth + (margin * marginRatio)) + ea;
        div_clone.appendChild(div_clone2);

        //project list wording
        svg_clone = SvgTong.stringParsing(SvgTong[memberWordingSrc[1].replace(/\.svg$/, '')]);
        for (let k in svgStyle) {
          svg_clone.style[k] = svgStyle[k];
        }
        svg_clone.style.top = "calc(50% - " + String((top / 2) + 1) + ea + ")";
        svg_clone.style.left = String(tempWidth + (margin * (marginRatio * 2))) + ea;
        svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height) + ea;
        div_clone.appendChild(svg_clone);
        tempWidth = tempWidth + (margin * (marginRatio * 2)) + (SvgTong.getRatio(svg_clone) * height);

        //project list
        for (let k = 0; k < projectSamples[i]; k++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("hoverDefault_lite");
          for (let j in projectBoxStyle) {
            div_clone2.style[j] = projectBoxStyle[j];
          }
          div_clone2.style.left = String(3 + tempWidth + (margin * marginRatio) + (k * 85)) + ea;
          svg_clone = SvgTong.stringParsing(SvgTong[memberWordingSrc[2].replace(/\.svg$/, '')]);
          svg_clone.style.position = "absolute";
          svg_clone.style.left = String(14) + ea;
          svg_clone.style.top = String(8.5) + ea;
          svg_clone.style.height = String(15) + ea;
          div_clone2.appendChild(svg_clone);

          div_clone.appendChild(div_clone2);
        }

        //circles
        for (let k = 0; k < 3; k++) {
          circle = this.mother.returnCircle("", "#ececec");
          circle = SvgTong.stringParsing(circle);
          circle.style.position = "absolute";
          circle.style.right = String(11 + (13 * k)) + ea;
          circle.style.top = String(20) + ea;
          circle.style.height = String(12) + ea;
          circle.style.transform = "scale(0.7)"
          div_clone.appendChild(circle);
        }

        mainArea.appendChild(div_clone);

      }



      /*

      for (let i = 2; i < items.length; i++) {

        //white tong
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }
        if (((i - 1) % 3) === 0) {
          div_clone.style.marginRight = String(0);
        }
        if (i > items.length - 4) {
          div_clone.style.marginBottom = String(0);
        }
        div_clone.setAttribute("name", items[i]);

        //title
        svg_clone = SvgTong.stringParsing(this.titleLightMap.map.get(items[i]))
        for (let j in svgStyle) {
          svg_clone.style[j] = svgStyle[j];
        }
        svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height) + ea;
        div_clone.appendChild(svg_clone);

        //title bar
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in barStyle) {
          div_clone2.style[j] = barStyle[j];
        }
        div_clone.appendChild(div_clone2);

        //contents box
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in contentsStyle) {
          div_clone2.style[j] = contentsStyle[j];
        }

        //details
        for (let j = 0; j < onSrc.length; j++) {

          //detail title
          svg_clone = SvgTong.stringParsing(SvgTong[onSrc[j].replace(/\.svg$/, '')]);
          for (let k in svgSubStyle) {
            svg_clone.style[k] = svgSubStyle[k];
          }
          svg_clone.style.top = detailsTop[j % (onSrc.length / 2)];
          svg_clone.style.left = ((j >= onSrc.length / 2) ? String(50 + middleMargin) : String(0)) + '%';
          svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height2) + ea;
          div_clone2.appendChild(svg_clone);

          //detail bar
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          for (let k in detailBarStyle) {
            div_clone3.style[k] = detailBarStyle[k];
          }
          div_clone3.style.top = "calc(" + detailsTop[j % (onSrc.length / 2)] + " + " + String(height2 / 2) + ea + ' - ' + String(2) + ea + ")";
          div_clone3.style.left = "calc(" + svg_clone.style.width + ' + ' + (((j >= onSrc.length / 2) ? String(50 + middleMargin) : String(0)) + '%') + ' + ' + String(detailMargin) + ea + ")";
          div_clone3.style.width = "calc(" + String(50 - middleMargin) + "% - " + String(SvgTong.getRatio(svg_clone) * height2) + ea + ")";
          div_clone2.appendChild(div_clone3);

          //detail number
          svg_clone = SvgTong.stringParsing(SvgTong[numbers[0].replace(/\.svg$/, '')]);
          for (let k in detailNumberStyle) {
            svg_clone.style[k] = detailNumberStyle[k];
          }
          svg_clone.style.top = detailsTop[j % (onSrc.length / 2)];
          svg_clone.style.width = String(SvgTong.getRatio(svg_clone) * height2) + ea;
          svg_clone.style.left = "calc(" + ((j >= onSrc.length / 2) ? String(100) : String(50 - middleMargin)) + '%' + " - " + svg_clone.style.width + ")";
          div_clone2.appendChild(svg_clone);

          div_clone3.style.width = "calc(" + div_clone3.style.width + " - " + svg_clone.style.width + " - " + String(detailMargin * 2) + ea + ")";

        }

        div_clone.appendChild(div_clone2);
        mainArea.appendChild(div_clone);
      }

      */

    } catch (e) {
      console.log(e);
    }
  }
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

  //matrix infomations
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

  //moving events
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

      //matrix moving
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

        if (instance.matrixDoms[i].name !== instance.standardItemNames[0] && instance.matrixDoms[i].name !== instance.standardItemNames[1]) {
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
      }

      //matrix contents setting
      if (instance.matrixDoms[index].name === instance.standardItemNames[0]) {
        instance.projectStatus(true);
      } else {
        instance.projectStatus(false);
      }
      if (instance.matrixDoms[index].name === instance.standardItemNames[1]) {
        instance.memberBoard(true);
      } else {
        instance.memberBoard(false);
      }

      GeneralJs.stacks["matrixTimeout"] = setTimeout(function () {

        for (let i = 0; i < instance.matrixDoms.length; i++) {
          instance.matrixDoms[i].dom.children[1].style.opacity = String(1);
          instance.matrixDoms[i].dom.children[1].style.transition = "all 0.5s ease";
        }

        if (instance.matrixDoms[index].name !== instance.standardItemNames[0] && instance.matrixDoms[index].name !== instance.standardItemNames[1]) {
          for (let i = 0; i < instance.matrixDoms[index].dom.children[1].children.length; i++) {
            if (instance.matrixDoms[index].dom.children[1].children[i].querySelector('svg') !== null) {
              instance.matrixDoms[index].dom.children[1].children[i].querySelector('svg').style.display = "block";
            }
          }
        }

        clearTimeout(GeneralJs.stacks["matrixTimeout"]);
        GeneralJs.stacks["matrixTimeout"] = null;
      }, 501);

    }
  }

  //cancel event
  cancelEvent = function (e) {
    e.preventDefault();
    if (GeneralJs.stacks["matrixTimeout"] !== null) {
      clearTimeout(GeneralJs.stacks["matrixTimeout"]);
    }
    for (let i = 0; i < matrixInfo.length; i++) {
      for (let j in matrixInfo[i].styleObj) {
        instance.matrixDoms[i].dom.style[j] = matrixInfo[i].styleObj[j];
      }
      for (let j in svgStyle) {
        instance.matrixDoms[i].dom.children[0].style[j] = svgStyle[j];
      }

      instance.matrixDoms[i].dom.children[1].style.transition = "all 0s ease";
      instance.matrixDoms[i].dom.children[1].style.opacity = String(0);

      //matrix moving
      if (instance.matrixDoms[i].name !== instance.standardItemNames[0] && instance.matrixDoms[i].name !== instance.standardItemNames[1]) {
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
      }

      //matrix contents
      instance.projectStatus(false);
      instance.memberBoard(false);

      GeneralJs.stacks["matrixTimeoutCancel"] = setTimeout(function () {
        for (let i = 0; i < instance.matrixDoms.length; i++) {
          instance.matrixDoms[i].dom.children[1].style.opacity = String(1);
          instance.matrixDoms[i].dom.children[1].style.transition = "all 0.5s ease";
        }
        clearTimeout(GeneralJs.stacks["matrixTimeoutCancel"]);
        GeneralJs.stacks["matrixTimeoutCancel"] = null;
      }, 501);
    }
  }

  //total mother
  matrixMother = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: "100%",
    height: "calc(100% - " + String(this.belowHeight) + ea + ")",
  };
  for (let i in style) {
    matrixMother.style[i] = style[i];
  }

  //make matrix doms
  tempArr = [];
  for (let i = 0; i < matrixInfo.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.setAttribute("name", matrixInfo[i].name);
    for (let j in matrixInfo[i].styleObj) {
      div_clone.style[j] = matrixInfo[i].styleObj[j];
    }
    div_clone.addEventListener("click", makeMatrixEvents(i));
    div_clone.addEventListener("contextmenu", cancelEvent);

    //title
    svg_clone = SvgTong.stringParsing(titleMap.map.get(matrixInfo[i].name));
    for (let j in svgStyle) {
      svg_clone.style[j] = svgStyle[j];
    }
    div_clone.appendChild(svg_clone);

    //contents tong
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let j in categoryBoxStyle) {
      div_clone2.style[j] = categoryBoxStyle[j];
    }

    if (div_clone.getAttribute("name") !== this.standardItemNames[0] && div_clone.getAttribute("name") !== this.standardItemNames[1]) {
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
        if (matrixInfo[i].name !== this.standardItemNames[0] && matrixInfo[i].name !== this.standardItemNames[1]) {
          if (this.map.main.subTitles[matrixInfo[i].name.toLowerCase()].src[j] !== undefined) {
            svg_clone2 = SvgTong.stringParsing(SvgTong[this.map.main.subTitles[matrixInfo[i].name.toLowerCase()].src[j].replace(/\.svg$/, '')]);
            detailSvgWordingHeight = 20;
            detailSvgWordingWidth = SvgTong.getRatio(svg_clone2) * detailSvgWordingHeight;
            svg_clone2.style.position = "absolute";
            svg_clone2.style.height = String(detailSvgWordingHeight) + ea;
            svg_clone2.style.width = String(detailSvgWordingWidth) + ea;
            svg_clone2.style.top = "calc(50% - " + String((detailSvgWordingHeight / 2) + 5) + ea + ")";
            svg_clone2.style.left = "calc(50% - " + String(detailSvgWordingWidth / 2) + ea + ")";
            svg_clone2.style.display = "none";
            div_clone3.appendChild(svg_clone2);
          }
        }
        div_clone2.appendChild(div_clone3);
      }

    } else {
      div_clone2.style.background = "#dddddd";
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
