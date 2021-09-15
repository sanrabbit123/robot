const SvgTong = function () {}

const SvgTongListClass = function () {
  this.list = [];
}

SvgTongListClass.prototype.add = function (str) {
  this.list.push(str);
}

const SvgTongHtmlParsingClass = function () {
  this.attribute = {}
  this.src = "";
  this.id = "";
  this.style = {}
  this.events = [];
  this.classList = new SvgTongListClass();
}

SvgTongHtmlParsingClass.prototype.setAttribute = function (key, value) {
  this.attribute[key] = value;
}

SvgTongHtmlParsingClass.prototype.getAttribute = function (key) {
  return this.attribute[key];
}

SvgTongHtmlParsingClass.prototype.addEventListener = function (eventName, callback) {
  let obj = {};
  obj.name = eventName;
  obj.callback = callback;
  this.events.push(obj);
}

SvgTong.tongMaker = function () {
  let obj = new SvgTongHtmlParsingClass();
  return obj;
}

SvgTong.stringParsing = function (str) {
  const resultDom = new DOMParser().parseFromString(str, "image/svg+xml");
  return resultDom.childNodes[0];
}

SvgTong.getRatio = function (svgDom) {
  if (typeof svgDom === "string") {
    svgDom = SvgTong.stringParsing(svgDom);
  } else if (svgDom === undefined) {
    throw new Error("invaild svg");
  }

  let viewBoxString, viewBoxArr;
  viewBoxString = svgDom.getAttribute("viewBox");
  if (viewBoxString === undefined || viewBoxString === null) {
    throw new Error("invaild svg");
  }
  viewBoxArr = viewBoxString.split(' ');

  return (Number(viewBoxArr[2]) / Number(viewBoxArr[3]));
}

SvgTong.parsing = function (obj) {
  let tempArr = obj.src.split('/');
  let target = tempArr[tempArr.length - 1].replace(/\.svg$/, '');
  let camelCase = {
    marginTop: "margin-top",
    marginLeft: "margin-left",
    marginBottom: "margin-bottom",
    marginRight: "margin-right",
    paddingTop: "padding-top",
    paddingLeft: "padding-left",
    paddingBottom: "padding-bottom",
    paddingRight: "padding-right",
    backgroundImage: "background-image",
    backgroundSize: "background-size",
    backgroundPosition: "background-position",
    backgroundColor: "background-color",
    borderRadius: "border-radius",
    boxShadow: "box-shadow",
    zIndex: "z-index",
  }
  let camelCaseArr = Object.keys(camelCase);

  let styleString = '<svg style="';
  for (let ch in obj.style) {
    if (camelCaseArr.indexOf(ch) !== -1) {
      styleString += camelCase[ch];
    } else {
      styleString += ch;
    }
    styleString += ':';
    styleString += obj.style[ch];
    styleString += ';';
  }
  styleString += '" ';

  if (obj.id !== "") {
    styleString += 'id="';
    styleString += obj.id;
    styleString += '" ';
  }

  if (obj.classList.list.length !== 0) {
    styleString += 'class="';
    for (let i = 0; i < obj.classList.list.length; i++) {
      styleString += obj.classList.list[i];
      styleString += ' ';
    }
    styleString = styleString.slice(0, -1);
    styleString += '" ';
  }

  for (let att in obj.attribute) {
    styleString += att;
    styleString += '="';
    styleString += obj.attribute[att];
    styleString += '" ';
  }

  let resultDom = new DOMParser().parseFromString((styleString + SvgTong[target].slice(5)), "image/svg+xml");

  for (let i = 0; i < obj.events.length; i++) {
    resultDom.childNodes[0].addEventListener(obj.events[i].name, obj.events[i].callback);
  }

  return resultDom.childNodes[0];
}
