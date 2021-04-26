module.exports = {
  exec: function (options, boo) {
    let h = `
Folder.prototype.get_file = function (index) {
  let ka = this.getFiles();
  let file = app.open(ka[index]);
  file.layer_select = function (m) { return this.layers.getByName(m); }
  file.artboard_select = function (m) { return this.artboards.getByName(m); }
  return file;
}

File.prototype.get_file = function () {
  let file = app.open(this);
  file.layer_select = function (m) { return this.layers.getByName(m); }
  file.artboard_select = function (m) { return this.artboards.getByName(m); }
  return file;
}

const ExecMain = function (text, dir, etc = {}) {
  this.list = [ "desktop", "mobile" ];
  if (dir.slice(-1) !== '/') {
    this.dir = dir;
  } else {
    this.dir = dir.slice(0, -1);
  }
  this.text = text;
  this.filename = {};
  this.createSetting = {};
  this.createDocSetting = {
    title: "example.ai",
    height: 200,
    width: 300,
  }
  this.etc = etc;
  this.logs = [];
    `;

    if (boo === 'P') {
      h += `
  this.folder_list = {
    main: {},
    portp: {},
    svg: {},
    mobile: {},
  }
  this.folder_list.main.string = this.dir + "/result/" + this.text.p_id + "code";
  this.folder_list.main.obj = new Folder(this.folder_list.main.string);
  this.folder_list.portp.string = this.dir + "/result/" + this.text.p_id + "code/portp" + this.text.p_id;
  this.folder_list.portp.obj = new Folder(this.folder_list.portp.string);
  this.folder_list.svg.string = this.dir + "/result/" + this.text.p_id + "code/portp" + this.text.p_id + "/svg";
  this.folder_list.svg.obj = new Folder(this.folder_list.svg.string);
  this.folder_list.mobile.string = this.dir + "/result/" + this.text.p_id + "code/portp" + this.text.p_id + "/mobile";
  this.folder_list.mobile.obj = new Folder(this.folder_list.mobile.string);
      `;

    } else if (boo === 'R') {
      h += `
  this.folder_list = {
    main: {},
    rev: {},
  }
  this.folder_list.main.string = this.dir + "/result/" + this.text.r_id + "code";
  this.folder_list.main.obj = new Folder(this.folder_list.main.string);
  this.folder_list.rev.string = this.dir + "/result/" + this.text.r_id + "code/" + this.text.r_id;
  this.folder_list.rev.obj = new Folder(this.folder_list.rev.string);
      `;
    }
    h += `
}

const Mother = function () {}

Mother.prototype.fontFilter = function (arg) {
  let str;
  str = arg;
  if (str === "Futura-Medium" || /futura/gi.test(str)) {
    return "Futura-Medium";
  } else if (str === "SDGothicNeoa-aTh" || (/sandoll/gi.test(str) && /100/gi.test(str))) {
    return "SDGothicNeoa-aTh";
  } else if (str === "SDGothicNeoa-bUltLt" || (/sandoll/gi.test(str) && /200/gi.test(str))) {
    return "SDGothicNeoa-bUltLt";
  } else if (str === "SDGothicNeoa-cLt" || (/sandoll/gi.test(str) && /300/gi.test(str))) {
    return "SDGothicNeoa-cLt";
  } else if (str === "SDGothicNeoa-dRg" || (/sandoll/gi.test(str) && /400/gi.test(str))) {
    return "SDGothicNeoa-dRg";
  } else if (str === "SDGothicNeoa-eMd" || (/sandoll/gi.test(str) && /500/gi.test(str))) {
    return "SDGothicNeoa-eMd";
  } else if (str === "SDGothicNeoa-fSm" || (/sandoll/gi.test(str) && /600/gi.test(str))) {
    return "SDGothicNeoa-fSm";
  } else if (str === "SDGothicNeoa-gBd" || (/sandoll/gi.test(str) && /700/gi.test(str))) {
    return "SDGothicNeoa-gBd";
  } else if (str === "SDGothicNeoa-hExBd" || (/sandoll/gi.test(str) && /800/gi.test(str))) {
    return "SDGothicNeoa-hExBd";
  } else if (str === "SDGothicNeoa-iHv" || (/sandoll/gi.test(str) && /900/gi.test(str))) {
    return "SDGothicNeoa-iHv";
  } else if (str === "Graphik-Light" || (/graphik/gi.test(str) && /100/gi.test(str)) || (/graphik/gi.test(str) && /light/gi.test(str))) {
    if (/italic/gi.test(str)) {
      return "Graphik-LightItalic";
    } else {
      return "Graphik-Light";
    }
  } else if (str === "Graphik-Regular" || (/graphik/gi.test(str) && /200/gi.test(str)) || (/graphik/gi.test(str) && /regular/gi.test(str))) {
    if (/italic/gi.test(str)) {
      return "Graphik-RegularItalic";
    } else {
      return "Graphik-Regular";
    }
  } else if (str === "Graphik-Medium" || (/graphik/gi.test(str) && /300/gi.test(str)) || (/graphik/gi.test(str) && /medium/gi.test(str))) {
    if (/italic/gi.test(str)) {
      return "Graphik-MediumItalic";
    } else {
      return "Graphik-Medium";
    }
  } else if (str === "Graphik-Semibold" || (/graphik/gi.test(str) && /400/gi.test(str)) || (/graphik/gi.test(str) && /semibold/gi.test(str))) {
    if (/italic/gi.test(str)) {
      return "Graphik-SemiboldItalic";
    } else {
      return "Graphik-Semibold";
    }
  } else if (str === "Graphik-Bold" || (/graphik/gi.test(str) && /500/gi.test(str)) || (/graphik/gi.test(str) && /bold/gi.test(str))) {
    if (/italic/gi.test(str)) {
      return "Graphik-BoldItalic";
    } else {
      return "Graphik-Bold";
    }
  } else {
    return arg;
  }
}

Mother.prototype.convertMillimeters = function (num) {
  let g = 74.0833 / 210;
  return num / g;
}

Mother.prototype.pick = function (name, name2) {
  return app.activeDocument.layers.getByName(name).pageItems.getByName(name2);
}

Mother.prototype.itempick = function (name) {
  let item;
  try {
    item = app.activeDocument.pageItems.getByName(name);
    return item;
  } catch (e) {
    return null;
  }
}

Mother.prototype.colorpick = function (obj) {
  let newRGBColor = new RGBColor();
  function convert(str) {
    let result = 0;
    switch (str) {
      case "0":
        result = 0;
        break;
      case "1":
        result = 1;
        break;
      case "2":
        result = 2;
        break;
      case "3":
        result = 3;
        break;
      case "4":
        result = 4;
        break;
      case "5":
        result = 5;
        break;
      case "6":
        result = 6;
        break;
      case "7":
        result = 7;
        break;
      case "8":
        result = 8;
        break;
      case "9":
        result = 9;
        break;
      case "a":
        result = 10;
        break;
      case "b":
        result = 11;
        break;
      case "c":
        result = 12;
        break;
      case "d":
        result = 13;
        break;
      case "e":
        result = 14;
        break;
      case "f":
        result = 15;
        break;
    }
    return result;
  }
  if (typeof obj === "string") {
    newRGBColor.red = (convert(obj.slice(1, 2)) * 16) + convert(obj.slice(2, 3))
    newRGBColor.green = (convert(obj.slice(3, 4)) * 16) + convert(obj.slice(4, 5))
    newRGBColor.blue = (convert(obj.slice(5, 6)) * 16) + convert(obj.slice(6))
  } else {
    newRGBColor.red = obj.color[0];
    newRGBColor.green = obj.color[1];
    newRGBColor.blue = obj.color[2];
  }
  return newRGBColor;
}

Mother.prototype.return_width = function (dom) {
  let copyItem, outline_group, width;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    width = outline_group.width;
    outline_group.remove();
  } else {
    width = dom.width;
  }
  return width;
}

Mother.prototype.return_height = function (dom) {
  let copyItem, outline_group, height;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    height = outline_group.height;
    outline_group.remove();
  } else {
    height = dom.height;
  }
  return height;
}

Mother.prototype.return_top = function (dom) {
  let copyItem, outline_group, top;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    top = outline_group.top;
    outline_group.remove();
  } else {
    top = dom.top;
  }
  return top;
}

Mother.prototype.return_left = function (dom) {
  let copyItem, outline_group, left;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    left = outline_group.left;
    outline_group.remove();
  } else {
    left = dom.left;
  }
  return left;
}

Mother.prototype.return_bottom = function (dom) {
  let copyItem, outline_group, bottom;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    if (outline_group.top < 0) {
      bottom = Math.abs(outline_group.top) + outline_group.height;
      outline_group.remove();
      return bottom * -1;
    } else {
      bottom = outline_group.top - outline_group.height;
      outline_group.remove();
      return bottom;
    }
  } else {
    if (dom.top < 0) {
      bottom = Math.abs(dom.top) + dom.height;
      return bottom * -1;
    } else {
      bottom = dom.top - dom.height;
      return bottom;
    }
  }
}

Mother.prototype.return_englishBottom = function (dom) {
  let copyItem, outline_group;
  let words, wordsArr;

  copyItem = dom.duplicate();
  copyItem.contents = dom.contents.replace(/[\\'\\"\\^\\*\\+\\@\\=\\-\\~\`\\{\\}\\[\\]\\(\\)\\#\\!\\$\\%\\&\\:\\;\\?\\/\\\\]/gi, '');
  outline_group = copyItem.createOutline();

  words = outline_group.pageItems;

  wordsArr = [];
  for (let i = 0; i < words.length; i++) {
    wordsArr.push(words[i].top - words[i].height);
  }

  wordsArr.sort(function (a, b) { return b - a; });

  let result = wordsArr[0];
  outline_group.remove();

  return result;
}

Mother.prototype.return_englishMaxMin = function (dom) {
  let copyItem_maxMin, result;
  copyItem_maxMin = dom.duplicate();
  copyItem_maxMin.contents = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'^,.!?()";
  result = { max: this.return_top(copyItem_maxMin), min: this.return_bottom(copyItem_maxMin) };
  copyItem_maxMin.remove();
  return result;
}

Mother.prototype.return_right = function (dom) {
  let copyItem, outline_group, right;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    right = outline_group.left + outline_group.width;
    outline_group.remove();
  } else {
    right = dom.left + dom.width;
  }
  return right;
}

Mother.prototype.return_ratio = function (dom) {
  let target = app.activeDocument.artboards[0];
  let ratio_raw = (target.artboardRect[2] - target.artboardRect[0]) / (target.artboardRect[3] - target.artboardRect[1]);
  let ratio = Math.round(Math.abs(ratio_raw) * 1000) / 1000;
  return ratio;
}

Mother.prototype.return_center = function (dom) {
  let copyItem, outline_group, center;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    center = outline_group.left + (outline_group.width / 2);
    outline_group.remove();
  } else {
    center = dom.left + (dom.width / 2);
  }
  return center;
}

Mother.prototype.return_middle = function (dom) {
  let copyItem, outline_group, middle;
  if (dom.createOutline !== undefined) {
    copyItem = dom.duplicate();
    outline_group = copyItem.createOutline();
    middle = outline_group.top - (outline_group.height / 2);
    outline_group.remove();
  } else {
    middle = dom.top - (dom.height / 2);
  }
  return middle;
}

Mother.prototype.return_asterisk = function (options = {}) {
  let pathAsterisk, ratio;
  const asterisk = [
    [ 406.428798947329, -311.711869336008 ],
    [ 318.199201024168, -367.869747639535 ],
    [ 299.868806935543, -334.890614472268 ],
    [ 391.57262034654, -284.073666820195 ],
    [ 299.868806935543, -233.282666960624 ],
    [ 318.199197265798, -199.422000387576 ],
    [ 406.428798947329, -255.553975999024 ],
    [ 404.665762202734, -147.723556913403 ],
    [ 443.115504850142, -147.723556913403 ],
    [ 442.233986477846, -255.553975999024 ],
    [ 531.319177530997, -199.422000387576 ],
    [ 549.675496861928, -233.282666960624 ],
    [ 457.090165078633, -284.073666820195 ],
    [ 549.675496861928, -334.890614472268 ],
    [ 531.319177530997, -367.869747639535 ],
    [ 442.233986477846, -311.711869336008 ],
    [ 443.115504850142, -419.542265871403 ],
    [ 404.665762202734, -419.542265871403 ],
  ];
  pathAsterisk = app.activeDocument.pathItems.add();
  pathAsterisk.setEntirePath(asterisk);
  pathAsterisk.closed = true;

  if (options.height === undefined) {
    options.height = pathAsterisk.height;
  }
  if (options.color === undefined) {
    options.color = "#ececec";
  }

  pathAsterisk.strokeColor = new NoColor();
  pathAsterisk.fillColor = this.colorpick(options.color);
  ratio = (options.height / pathAsterisk.height) * 100;
  pathAsterisk.resize(ratio, ratio);
  return pathAsterisk;
}

Mother.prototype.return_arrow = function (options = {}) {
  let pathArrow, ratio, points;
  let x0, x1, x2, x3, x4, x5, y0, y1, y2, y3, y4, y5;
  let anchors, leftHandle, rightHandle;

  x0 = 445.830130989714;
  y0 = -433.930483092399;
  x1 = 605.880341209988;
  y1 = -156.715269559292;
  x2 = 585.112454453134;
  y2 = -120.745084860751;
  x3 = 265.012056741798;
  y3 = -120.745084860751;
  x4 = 244.24467286879;
  y4 = -156.715744031619;
  x5 = 404.294868883306;
  y5 = -433.930960405878;

  anchors = [
    [ x0, y0 ],
    [ x1, y1 ],
    [ x2, y2 ],
    [ x3, y3 ],
    [ x4, y4 ],
    [ x5, y5 ],
  ];
  leftHandle = [
    [ 436.59995657231, -449.917848061534 ],
    [ x1, y1 ],
    [ 603.572780558727, y2 ],
    [ x3, y3 ],
    [ 235.014510171135, -140.728836487902 ],
    [ x5, y5 ],
  ];
  rightHandle = [
    [ x0, y0 ],
    [ 615.110492898177, -140.728836487902 ],
    [ x2, y2 ],
    [ 246.552215052565, y3 ],
    [ x4, y4 ],
    [ 413.5250319361, -449.917848061534 ],
  ];

  pathArrow = app.activeDocument.pathItems.add();
  pathArrow.setEntirePath(anchors);
  pathArrow.closed = true;

  points = pathArrow.pathPoints;
  for (let i = 0; i < points.length; i++) {
    points[i].leftDirection = leftHandle[i];
    points[i].rightDirection = rightHandle[i];
  }

  if (options.height === undefined) {
    options.height = pathArrow.height;
  }
  if (options.color === undefined) {
    options.color = "#2fa678";
  }

  pathArrow.strokeColor = new NoColor();
  pathArrow.fillColor = this.colorpick(options.color);
  ratio = (options.height / pathArrow.height) * 100;
  pathArrow.resize(ratio, ratio);
  return pathArrow;
}

Mother.prototype.return_checkBox = function (options = {}) {
  let anchors, leftHandle, rightHandle, newPath, points, ratio;

  let checkBox = app.activeDocument.groupItems.add();
  checkBox.name = "checkBox";

  anchors = [
    [523.549302457832, -400.860681577949],
    [325.995157171055, -400.860681577949],
    [307.544303797469, -382.409828204363],
    [307.544303797469, -184.855838749025],
    [325.995001339637, -166.405141206857],
    [523.549146626412, -166.405141206857],
    [542.0, -184.855994580446],
    [542.0, -382.409984035781],
  ];

  leftHandle = [
    [533.739341334112, -400.860681577949],
    [325.995157171055, -400.860681577949],
    [307.544303797469, -392.599953143959],
    [307.544303797469, -184.855838749025],
    [315.804962463357, -166.405141206857],
    [523.549146626412, -166.405141206857],
    [542.0, -174.665869640849],
    [542.0, -382.409984035781],
  ];

  rightHandle = [
    [523.549302457832, -400.860681577949],
    [315.80503223146, -400.860681577949],
    [307.544303797469, -382.409828204363],
    [307.544303797469, -174.665799872745],
    [325.995001339637, -166.405141206857],
    [533.739271566008, -166.405141206857],
    [542.0, -184.855994580446],
    [542.0, -392.600022912062]
  ];

  newPath = app.activeDocument.pathItems.add();
  newPath.setEntirePath(anchors);
  newPath.closed = true;

  points = newPath.pathPoints;
  for (var i = 0; i < points.length; i++) {
    points[i].leftDirection = leftHandle[i];
    points[i].rightDirection = rightHandle[i];
  }

  if (options.height === undefined) {
    options.height = newPath.height;
  }

  if (options.color === undefined) {
    options.color = "#2fa678";
  }

  newPath.fillColor = this.colorpick(options.color);
  newPath.strokeColor = new NoColor();
  newPath.moveToBeginning(checkBox);

  anchors = [
    [397.551750573374, -347.862756096569],
    [343.08283706011, -289.382280709711],
    [343.24612139701, -284.810286175976],
    [353.470107940181, -275.295162699799],
    [358.040871204254, -275.458997632323],
    [397.55140481746, -317.901534644863],
    [402.286278806952, -317.901262082447],
    [486.656626778651, -227.249022312917],
    [491.227643746774, -227.084914817979],
    [501.451856931808, -236.600249222183],
    [501.61560587008, -241.17174483186],
    [402.285690091251, -347.862257172512],
  ];

  leftHandle = [
    [398.830967735666, -349.236185874193],
    [343.08283706011, -289.382280709711],
    [341.938163128727, -286.027559337657],
    [353.470107940181, -275.295162699799],
    [356.82387740012, -274.151692975756],
    [397.55140481746, -317.901534644863],
    [401.007206275417, -319.275569438039],
    [486.656626778651, -227.249022312917],
    [489.92006858525, -225.867998200988],
    [501.451856931808, -236.600249222183],
    [502.832938061298, -239.864205263831],
    [402.285690091251, -347.862257172512],
  ];

  rightHandle = [
    [397.551750573374, -347.862756096569],
    [341.865047815391, -288.074802932781],
    [343.24612139701, -284.810286175976],
    [354.777576653509, -274.078345150595],
    [358.040871204254, -275.458997632323],
    [398.830635564172, -319.275694732052],
    [402.286278806952, -317.901262082447],
    [487.87356913495, -225.941471106586],
    [491.227643746774, -227.084914817979],
    [502.759620293975, -237.817340991241],
    [501.61560587008, -241.17174483186],
    [401.006762457126, -349.235956560673]
  ];

  newPath = app.activeDocument.pathItems.add();
  newPath.setEntirePath(anchors);
  newPath.closed = true;

  points = newPath.pathPoints;
  for (var i = 0; i < points.length; i++) {
    points[i].leftDirection = leftHandle[i];
    points[i].rightDirection = rightHandle[i];
  }

  newPath.fillColor = this.colorpick("#ffffff");
  newPath.strokeColor = new NoColor();
  newPath.moveToBeginning(checkBox);

  ratio = (options.height / newPath.height) * 100;
  checkBox.resize(ratio, ratio);

  return checkBox;
}

Mother.prototype.ratio_string = function (num) {
  let str;
  str = String(num);
  if (/\\./g.test(str)) {
    str = str.replace(/\\./g, "rspot");
  } else {
    str = str + "rspot0";
  }
  return str;
}

Mother.prototype.compoundColor = function (compound, color) {
  let count = compound.pathItems.length;
  for (let i = 0; i < count; i++) {
    compound.pathItems[i].fillColor = color;
  }
}

Mother.prototype.default_para = function (dom, lineHeight) {
  let height = lineHeight || 16.8;
  dom.textRange.characterAttributes.size = 9.5;
  dom.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-eMd");
  dom.textRange.characterAttributes.horizontalScale = 98;
  dom.textRange.characterAttributes.tracking = -25;
  dom.textRange.characterAttributes.fillColor = this.colorpick("#606060");
  dom.textRange.characterAttributes.autoLeading = false;
  dom.textRange.characterAttributes.leading = height;
  for (let i = 0; i < dom.paragraphs.length; i++) {
    dom.paragraphs[i].paragraphAttributes.justification = Justification.FULLJUSTIFYLASTLINELEFT;
  }
}

Mother.prototype.copy_area = function (dom, margin, ratio, leftright) {
  let rectangle = app.activeDocument.pathItems.rectangle(((this.return_bottom(dom) + margin) * -1), dom.left, dom.width, dom.height);
  if (leftright === "right") { rectangle.left = rectangle.left + (rectangle.width * (1 - ratio)); }
  rectangle.width = rectangle.width * ratio;
  return app.activeDocument.textFrames.areaText(rectangle);
}

Mother.prototype.fit_box = function (force = false, fixOption = {}) {
  //this.mother.fit_box({ width: { value: 800, direction: "left" }, height: { value: 1200 } });
  if (typeof force === "object") {
    fixOption = force;
    force = false;
  }
  const instance = this;
  let allItems = app.activeDocument.pageItems;
  let maxValue = {
    top: 0,
    left: 1000000,
    right: -1000000,
    height: 0,
  }
  let tops = [];
  let bottoms = [];
  let tempNum;
  if (force) {
    app.doScript("expandall", "contents_maker");
  }
  for (let i = 0; i < allItems.length; i++) {
    tops.push(allItems[i]);
    bottoms.push(allItems[i]);
    tempNum = this.return_left(allItems[i]);
    if (tempNum < maxValue.left) { maxValue.left = tempNum; }
    tempNum = this.return_right(allItems[i]);
    if (tempNum > maxValue.right) { maxValue.right = tempNum; }
  }
  tops.sort(function (a, b) {
    return instance.return_top(b) - instance.return_top(a);
  });
  bottoms.sort(function (a, b) {
    return instance.return_bottom(b) - instance.return_bottom(a);
  });
  maxValue.top = this.return_top(tops[0]);
  maxValue.height = this.return_bottom(bottoms[bottoms.length - 1]) - this.return_top(tops[0]);
  let target = app.activeDocument.artboards[0];
  let resultRectArr = [ maxValue.left, maxValue.top, maxValue.right, maxValue.top + maxValue.height ];
  if (fixOption.width !== undefined) {
    if (fixOption.width.direction === "left") {
      resultRectArr[2] = maxValue.left + fixOption.width.value;
    } else {
      resultRectArr[0] = maxValue.right - fixOption.width.value;
    }
  }
  if (fixOption.height !== undefined) {
    resultRectArr[3] = maxValue.top - fixOption.height.value;
  }
  app.activeDocument.artboards.add(resultRectArr);
  target.remove();
  if (force) {
    app.doScript("expandall", "contents_maker");
  }
}

Mother.prototype.white_box = function (force = false, fixOption = {}) {

  this.fit_box(force, fixOption);

  let top, left, width, height;
  let artRect = app.activeDocument.artboards[0].artboardRect;

  top = artRect[1];
  left = artRect[0];
  width = artRect[2] - artRect[0];
  height = artRect[1] - artRect[3];

  let rec = app.activeDocument.pathItems.rectangle(top, left, width, height);
  rec.strokeColor = new NoColor();
  rec.fillColor = this.colorpick("#ffffff");
  rec.zOrder(ZOrderMethod.SENDTOBACK);

}

Mother.prototype.lineMaker = function (xy, options = {}) {
  let this_ai = app.activeDocument;
  let line = this_ai.pathItems.add();
  line.stroked = true;
  line.setEntirePath(xy);
  line.fillColor = new NoColor();
  line.strokeColor = this.colorpick("#2fa678");
  line.strokeCap = StrokeCap.ROUNDENDCAP;
  line.strokeJoin = StrokeJoin.ROUNDENDJOIN;
  line.strokeWidth = 1.25;
  if (options !== undefined) {
    for (let i in options) {
      line[i] = options[i];
    }
  }
  return line;
}

Mother.prototype.deleteWithout = function (itemName) {
  const this_ai = app.activeDocument;
  let items = [];
  for (let i = 0; i < this_ai.pageItems.length; i++) { if (this_ai.pageItems[i].name !== '') {
    items.push(this_ai.pageItems[i]);
  }}

  const count = items.length;
  for (let i = 0; i < count; i++) {
    if (items[i].name !== itemName) {
      items[i].remove();
    }
  }
}

Mother.prototype.deleteWithoutLayer = function (layerName) {
  const this_ai = app.activeDocument;
  let layers = [];
  for (let i = 0; i < this_ai.layers.length; i++) {
    layers.push(this_ai.layers[i]);
  }

  const count = layers.length;
  for (let i = 0; i < count; i++) {
    if (layers[i].name !== layerName) {
      layers[i].remove();
    }
  }
}

Mother.prototype.allGroup = function (callback = function (group, items) {}, ungroup = false) {
  const this_ai = app.activeDocument;
  let count, count2;
  let selectionArr = [];
  let groupItem;

  count = this_ai.pageItems.length;
  for (let i = 0; i < count; i++) {
    selectionArr.push(this_ai.pageItems[i]);
  }
  count2 = selectionArr.length;

  groupItem = this_ai.groupItems.add();
  for (let i = 0; i < count2; i++) {
    selectionArr[i].moveToEnd(groupItem);
  }

  callback(groupItem, selectionArr);

  if (ungroup) {
    count = selectionArr.length;
    for (let i = 0; i < count; i++) {
      selectionArr[i].move(this_ai.layers[0], ElementPlacement.PLACEATBEGINNING);
    }
    return { items: selectionArr };
  } else {
    return { group: groupItem, items: selectionArr };
  }

}

Mother.prototype.upRoundRectangle = function (original_top, original_left, original_width, original_height, original_radius1, original_radius2) {
  const this_ai = app.activeDocument;
  const radius = original_radius1;
  const circleRatio = radius * (0.552516041877744);
  const boo = original_height >= 0 ? true : false;

  let rectangle = this_ai.pathItems.rectangle(original_top, original_left, original_width, original_height);
  let originalPoints = rectangle.pathPoints;
  let pointsNum = rectangle.pathPoints.length;
  let yAnchors = [];

  for (let i = 0; i < pointsNum; i++) {
    yAnchors.push({ y: rectangle.pathPoints[i].anchor[1], index: i });
  }

  let targetIndex = [], leftIndex = [], targets = [], left = [];

  yAnchors.sort((a, b) => { return b.y - a.y; });

  if (boo) {
    targetIndex.push(yAnchors[0].index);
    targetIndex.push(yAnchors[1].index);
    leftIndex.push(yAnchors[2].index);
    leftIndex.push(yAnchors[3].index);
  } else {
    targetIndex.push(yAnchors[2].index);
    targetIndex.push(yAnchors[3].index);
    leftIndex.push(yAnchors[0].index);
    leftIndex.push(yAnchors[1].index);
  }

  for (let i = 0; i < targetIndex.length; i++) {
    targets.push(originalPoints[targetIndex[i]]);
  }
  for (let i = 0; i < leftIndex.length; i++) {
    left.push(originalPoints[leftIndex[i]]);
  }

  let finalAnchors, leftHandle, rightHandle;

  if (boo) {

    finalAnchors = [
      [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
      [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
    ];

    leftHandle = [
      [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
      [ targets[0].anchor[0] + radius - circleRatio, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] - radius + circleRatio ],
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
    ];

    rightHandle = [
      [ targets[0].anchor[0], targets[0].anchor[1] - radius + circleRatio ],
      [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius + circleRatio, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
    ];

  } else {

    finalAnchors = [
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
      [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
      [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
    ];

    leftHandle = [
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
      [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
      [ targets[0].anchor[0] + radius - circleRatio, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] + radius - circleRatio ],
    ];

    rightHandle = [
      [ left[0].anchor[0], left[0].anchor[1] ],
      [ left[1].anchor[0], left[1].anchor[1] ],
      [ targets[0].anchor[0], targets[0].anchor[1] + radius - circleRatio ],
      [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
      [ targets[1].anchor[0] - radius + circleRatio, targets[1].anchor[1] ],
      [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
    ];

  }

  let newPath, points;

  rectangle.remove();

  newPath = this_ai.pathItems.add();
  newPath.setEntirePath(finalAnchors);
  newPath.closed = true;

  points = newPath.pathPoints;
  for (let i = 0; i < points.length; i++) {
    points[i].leftDirection = leftHandle[i];
    points[i].rightDirection = rightHandle[i];
  }

  return newPath;
}

Mother.prototype.abcFilter = function (font, abc, left, width) {
  if (/futura/gi.test(font)) {

    switch (abc) {
      case "g":
        return [ left + (width * (0.629 / 3.679) * (-1)), left + (width * (4.417 / 3.679) * (1)) ];
        break;
      case "j":
        return [ left + (width * (0.943 / 1.087) * (-1)), left + (width * (1.984 / 1.087) * (1)) ];
        break;
      case "p":
        return [ left + (width * (0.943 / 3.679) * (-1)), left + (width * (1.72 / 3.679) * (1)) ];
        break;
      case "q":
        return [ left + (width * (1.84 / 3.679) * (1)), left + (width * (4.697 / 3.679) * (1)) ];
        break;
      case "y":
        return [ left + (width * (0.541 / 4.049) * (-1)), left + (width * (2.522 / 4.049) * (1)) ];
        break;
    }

  } else if (/graphik/gi.test(font)) {

    switch (abc) {
      case "g":
        return [ left + (width * (0.857 / 3.988) * (-1)), left + (width * (4.849 / 3.988) * (1)) ];
        break;
      case "j":
        return [ left + (width * (1.14 / 1.571) * (-1)), left + (width * (2.51 / 1.571) * (1)) ];
        break;
      case "p":
        return [ left + (width * (1.072 / 3.988) * (-1)), left + (width * (2.001 / 3.988) * (1)) ];
        break;
      case "q":
        return [ left + (width * (1.947 / 3.988) * (1)), left + (width * (5.146 / 3.988) * (1)) ];
        break;
      case "y":
        return [ left + (width * (0.096 / 3.928) * (-1)), left + (width * (2.947 / 3.928) * (1)) ];
        break;
    }
  }

  return [];
}

Mother.prototype.rectangle = function (top, left, width, height, radius = null) {
  let stroke = null, fill = null;
  let upRound = false, downRound = false;
  let finalReturnObj;
  let customLayer = "default";
  if (typeof top === "object" && left === undefined && width === undefined && height === undefined && radius === null) {
    if (top.top === undefined || top.left === undefined || top.width === undefined || top.height === undefined|| top.stroke === undefined|| top.fill === undefined|| top.radius === undefined) {
      throw new Error("object argument must be { number: top, number: left, number: width, number: height, NULL or string: stroke, NULL or string: fill, NULL or number: radius }");
    } else {
      left = top.left;
      width = top.width;
      height = top.height;
      radius = top.radius;
      stroke = top.stroke;
      fill = top.fill;
      upRound = (top.upRound === true) ? true : false;
      downRound = (top.downRound === true) ? true : false;
      customLayer = (top.layer !== undefined) ? top.layer : "default";
      top = top.top;
    }
  }
  if (typeof top !== "number" || typeof left !== "number" || typeof width !== "number" || typeof height !== "number") {
    throw new Error("arguments must be (number: top, number: left, number: width, number: height[, number: radius])");
  }
  if (upRound && downRound) {
    upRound = true;
    downRound = false;
  }
  const this_ai = app.activeDocument;
  const this_layer = customLayer === "default" ? this_ai.layers[0] : customLayer;
  let rectangle;

  rectangle = this_layer.pathItems.rectangle(top, left, width, height);

  if (!upRound && !downRound) {
    if (typeof radius === "number") {
      rectangle.remove();
      rectangle = this_layer.pathItems.roundedRectangle(top, left, width, height, radius, radius);
    }
    finalReturnObj = rectangle;
  } else {

    const circleRatio = radius * (0.552516041877744);
    let boo;
    if (upRound) {
      boo = (height >= 0);
    } else {
      boo = (height < 0);
    }

    let originalPoints = rectangle.pathPoints;
    let pointsNum = rectangle.pathPoints.length;
    let yAnchors = [];

    for (let i = 0; i < pointsNum; i++) {
      yAnchors.push({ y: rectangle.pathPoints[i].anchor[1], index: i });
    }

    let targetIndex = [], leftIndex = [], targets = [], left = [];
    let finalAnchors, leftHandle, rightHandle;
    let newPath, points;

    yAnchors.sort((a, b) => { return b.y - a.y; });

    if (boo) {
      targetIndex.push(yAnchors[0].index);
      targetIndex.push(yAnchors[1].index);
      leftIndex.push(yAnchors[2].index);
      leftIndex.push(yAnchors[3].index);
    } else {
      targetIndex.push(yAnchors[2].index);
      targetIndex.push(yAnchors[3].index);
      leftIndex.push(yAnchors[0].index);
      leftIndex.push(yAnchors[1].index);
    }

    for (let i = 0; i < targetIndex.length; i++) {
      targets.push(originalPoints[targetIndex[i]]);
    }
    for (let i = 0; i < leftIndex.length; i++) {
      left.push(originalPoints[leftIndex[i]]);
    }

    if (boo) {

      if (height >= 0) {

        finalAnchors = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
          [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

        leftHandle = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
          [ targets[0].anchor[0] + radius - circleRatio, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius + circleRatio ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

        rightHandle = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius + circleRatio ],
          [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius + circleRatio, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

      } else {

        finalAnchors = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
          [ targets[0].anchor[0] - radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

        leftHandle = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius ],
          [ targets[0].anchor[0] - radius + circleRatio, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius + circleRatio ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

        rightHandle = [
          [ targets[0].anchor[0], targets[0].anchor[1] - radius + circleRatio ],
          [ targets[0].anchor[0] - radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius - circleRatio, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] - radius ],
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
        ];

      }

    } else {

      if (height < 0) {

        finalAnchors = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
          [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
        ];

        leftHandle = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
          [ targets[0].anchor[0] + radius - circleRatio, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius - circleRatio ],
        ];

        rightHandle = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius - circleRatio ],
          [ targets[0].anchor[0] + radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] - radius + circleRatio, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
        ];

      } else {

        finalAnchors = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
          [ targets[0].anchor[0] - radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
        ];

        leftHandle = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius ],
          [ targets[0].anchor[0] - radius + circleRatio, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius - circleRatio ],
        ];

        rightHandle = [
          [ left[0].anchor[0], left[0].anchor[1] ],
          [ left[1].anchor[0], left[1].anchor[1] ],
          [ targets[0].anchor[0], targets[0].anchor[1] + radius - circleRatio ],
          [ targets[0].anchor[0] - radius, targets[0].anchor[1] ],
          [ targets[1].anchor[0] + radius - circleRatio, targets[1].anchor[1] ],
          [ targets[1].anchor[0], targets[1].anchor[1] + radius ],
        ];

      }

    }

    rectangle.remove();

    newPath = this_ai.pathItems.add();
    newPath.setEntirePath(finalAnchors);
    newPath.closed = true;

    points = newPath.pathPoints;
    for (let i = 0; i < points.length; i++) {
      points[i].leftDirection = leftHandle[i];
      points[i].rightDirection = rightHandle[i];
    }

    finalReturnObj = newPath;
  }

  if (stroke === null) {
    finalReturnObj.strokeColor = new NoColor();
  } else if (typeof stroke === "string") {
    finalReturnObj.strokeColor = this.colorpick(stroke);
  } else {
    throw new Error("stroke must be null or string");
  }

  if (fill === null) {
    finalReturnObj.fillColor = new NoColor();
  } else if (typeof fill === "string") {
    finalReturnObj.fillColor = this.colorpick(fill);
  } else {
    throw new Error("fill must be null or string");
  }

  return finalReturnObj;
}

Mother.prototype.artboardIsolate = function (thisAi, index, d = 6) {
  const dolyeon = d;
  const artboardIndex = index;
  let length;
  let items;
  let standard_top, standard_left, standard_right, standard_bottom;
  items = [];
  for (let i = 0; i < thisAi.pageItems.length; i++) {
    items.push(thisAi.pageItems[i]);
  }
  length = items.length;
  standard_top = thisAi.artboards[artboardIndex].artboardRect[1];
  standard_left = thisAi.artboards[artboardIndex].artboardRect[0];
  standard_bottom = thisAi.artboards[artboardIndex].artboardRect[3];
  standard_right = thisAi.artboards[artboardIndex].artboardRect[2];
  for (let i = 0; i < length; i++) {
    if (items[i].locked) {
      items[i].locked = false;
    }
    if (items[i].top > standard_top + dolyeon || items[i].top - items[i].height < standard_bottom - dolyeon || items[i].left < standard_left - dolyeon || items[i].left + items[i].width > standard_right + dolyeon) {
      items[i].remove();
    }
  }
  while (thisAi.artboards.length !== artboardIndex + 1) {
    thisAi.artboards.remove(thisAi.artboards.length - 1);
  }
  while (thisAi.artboards.length !== 1) {
    thisAi.artboards.remove(0);
  }
}

Mother.prototype.whiteBack = function () {
  const thisAi = app.activeDocument;
  const layer = thisAi.layers.add();
  let artboards, length, tempArr;
  layer.name = "white";
  layer.zOrder(ZOrderMethod.SENDTOBACK);
  length = thisAi.artboards.length;
  artboards = [];
  for (let i = 0; i < length; i++) {
    artboards.push(thisAi.artboards[i]);
  }
  for (let i = 0; i < length; i++) {
    tempArr = artboards[i].artboardRect;
    this.rectangle({
      top: tempArr[1],
      left: tempArr[0],
      width: Math.abs(tempArr[2] - tempArr[0]),
      height: Math.abs(tempArr[3] - tempArr[1]),
      stroke: null,
      fill: "#ffffff",
      radius: null,
      layer: layer
    });
  }
  layer.zOrder(ZOrderMethod.SENDTOBACK);
  layer.locked = true;
}

ExecMain.prototype.mother = new Mother();

//execute main only vaild : create and save and excute functions

ExecMain.prototype.log = function (message) {
  this.logs.push(message);
}

ExecMain.prototype.echo = function () {
  if (this.logs.length > 0) {
    var result = '';
    for (var i = 0; i < this.logs.length; i++) {
      result += String(this.logs[i]) + '\\n';
    }
    return result.slice(0, -1);
  } else {
    return 'adobe script done';
  }
}

ExecMain.prototype.newdoc_setting = function (obj) {
  let newdoc_setting = new DocumentPreset();
  newdoc_setting.colorMode = DocumentColorSpace.RGB;
  newdoc_setting.units = RulerUnits.Millimeters;
  newdoc_setting.rasterResolution = DocumentRasterResolution.HighResolution;
  newdoc_setting.title = obj.title;
  newdoc_setting.height = this.mother.convertMillimeters(obj.height);
  newdoc_setting.width = this.mother.convertMillimeters(obj.width);
  newdoc_setting.numArtboards = 1;
  return newdoc_setting;
}

ExecMain.prototype.createDoc = function () {
  let this_ai = app.documents.addDocument("", this.newdoc_setting(this.createDocSetting));
  return this_ai;
}

ExecMain.prototype.createDocument = ExecMain.prototype.createDoc;

ExecMain.prototype.returnMileoPosition = function (arr) {
  let temp, temp2, startNum, endNum, small, big;

  let [ o, a, b ] = arr;
  let oArr = o.split(' ');
  let aArr = a.split(' ');

  let startBold = [];
  let endBold = [];
  let aBold = [];
  let bBold = [];

  let startColor = [];
  let endColor = [];
  let aColor = [];
  let bColor = [];

  let map = [];
  let aMap = {};
  let stack = 0;

  let aCopy, bCopy;
  let commaArr = [];
  let minusStack = 0;

  //make map
  if (a.replace(/ /g, '') !== b.replace(/ /g, '')) {
    aCopy = a;
    bCopy = b;

    for (let i = 0; i < bCopy.length; i++) {
      if (aCopy[i] !== bCopy[i] && (aCopy[i] === '_' || aCopy[i] === '.' || aCopy[i] === ',')) {
        aCopy = aCopy.slice(0, i - 1) + aCopy.slice(i);
        commaArr.push(i);
      } else if (aCopy[i] !== bCopy[i]) {
        aCopy = aCopy.slice(0, i) + ' ' + aCopy.slice(i);
        map.push(i);
      }
    }

    for (let i = 0; i < bCopy.length - map.length + commaArr.length + 1; i++) {
      if (map.indexOf(i) !== -1) { stack++; }
      if (commaArr.indexOf(i) !== -1) {
        minusStack = minusStack - 1;
      }
      aMap[String(i)] = i + stack + minusStack;
    }

  } else {
    for (let i = 0; i < b.length; i++) {
      if (a[i] !== b[i]) {
        a = a.slice(0, i) + ' ' + a.slice(i);
        map.push(i);
      }
    }
    for (let i = 0; i < b.length - map.length + 1; i++) {
      if (map.indexOf(i) !== -1) {
        stack++;
      }
      aMap[String(i)] = i + stack;
    }
  }

  //original to index
  for (let i = 0; i < oArr.length; i++) {
    if (/<b%/g.test(oArr[i])) { startBold.push(i); }
    if (/%b>/g.test(oArr[i])) { endBold.push(i); }
    if (/<g%/g.test(oArr[i])) { startColor.push(i); }
    if (/%g>/g.test(oArr[i])) { endColor.push(i); }
  }

  //bold
  for (let j = 0; j < startBold.length; j++) {
    startNum = 0;
    endNum = 0;
    for (let i = 0; i < startBold[j]; i++) {
      startNum += aArr[i].length + 1
    }
    for (let i = 0; i < endBold[j]; i++) {
      endNum += aArr[i].length + 1
    }
    if (/<b%/g.test(oArr[endBold[j]])) {
      endNum += oArr[endBold[j]].indexOf('%b>') - 3;
    } else {
      endNum += oArr[endBold[j]].indexOf('%b>');
    }
    temp = [];
    for (let i = startNum; i < endNum; i++) {
      temp.push(i);
    }
    aBold.push(temp);
  }
  for (let i = 0; i < aBold.length; i++) {
    temp = [];
    temp2 = [];
    for (let j = 0; j < aBold[i].length; j++) {
      temp.push(aMap[String(aBold[i][j])]);
    }
    temp.sort((a, b) => { return a - b; })
    small = temp[0];
    temp.sort((a, b) => { return b - a; })
    big = temp[0];
    for (let j = small; j < big + 1; j++) {
      temp2.push(j);
    }
    bBold.push(temp2);
  }

  //color
  for (let j = 0; j < startColor.length; j++) {
    startNum = 0;
    endNum = 0;
    for (let i = 0; i < startColor[j]; i++) {
      startNum += aArr[i].length + 1
    }
    for (let i = 0; i < endColor[j]; i++) {
      endNum += aArr[i].length + 1
    }
    if (/<g%/g.test(oArr[endColor[j]])) {
      endNum += oArr[endColor[j]].indexOf('%g>') - 3;
    } else {
      endNum += oArr[endColor[j]].indexOf('%g>');
    }
    temp = [];
    for (let i = startNum; i < endNum; i++) {
      temp.push(i);
    }
    aColor.push(temp);
  }
  for (let i = 0; i < aColor.length; i++) {
    temp = [];
    temp2 = [];
    for (let j = 0; j < aColor[i].length; j++) {
      temp.push(aMap[String(aColor[i][j])]);
    }
    temp.sort((a, b) => { return a - b; })
    small = temp[0];
    temp.sort((a, b) => { return b - a; })
    big = temp[0];
    for (let j = small; j < big + 1; j++) {
      temp2.push(j);
    }
    bColor.push(temp2);
  }
  return [ bBold, bColor ];
}

ExecMain.prototype.setCreateSetting = function (obj) {
  let basicObj = {
    general: {
      width: this.createDocSetting.width,
      height: this.createDocSetting.height,
      color: "#505050",
      pointColor: "#2fa678",
      fontSize: 22,
      font: "SDGothicNeoa-fSm",
      bold: "SDGothicNeoa-gBd",
      leading: 38,
      horizontalScale: 98,
      tracking: -25,
      justification: (/left/gi.test(obj.direction) || /left/gi.test(obj.justification) ? "LEFT" : (/right/gi.test(obj.direction) || /right/gi.test(obj.justification) ? "RIGHT" : "CENTER")),
    },
    main: {
      width: this.createDocSetting.width,
      height: this.createDocSetting.height,
      color: "#505050",
      pointColor: "#2fa678",
      fontSize: 37,
      font: "SDGothicNeoa-fSm",
      bold: "SDGothicNeoa-gBd",
      leading: 58.7,
      horizontalScale: 98,
      tracking: -25,
      justification: (/left/gi.test(obj.direction) || /left/gi.test(obj.justification) ? "LEFT" : (/right/gi.test(obj.direction) || /right/gi.test(obj.justification) ? "RIGHT" : "CENTER")),
    },
    sub: {
      width: this.createDocSetting.width,
      height: this.createDocSetting.height,
      color: "#505050",
      pointColor: "#2fa678",
      fontSize: 22,
      font: "SDGothicNeoa-dRg",
      bold: "SDGothicNeoa-fSm",
      leading: 38,
      horizontalScale: 98,
      tracking: -25,
      justification: (/left/gi.test(obj.direction) || /left/gi.test(obj.justification) ? "LEFT" : (/right/gi.test(obj.direction) || /right/gi.test(obj.justification) ? "RIGHT" : "CENTER")),
    },
  }
  this.createSetting[obj.to] = basicObj[obj.from];
  if (obj.exception !== undefined) {
    for (let i in obj.exception) {
      this.createSetting[obj.to][i] = obj.exception[i];
    }
  }
}

ExecMain.prototype.setParagraph = function (obj) {
  this.createSetting[obj.to].text = '';
  if (typeof obj.from !== "string") {
    for (let j = 0; j < obj.from[obj.order].length; j++) {
      this.createSetting[obj.to].text += obj.from[obj.order][j];
      if (j !== obj.from[obj.order].length - 1) {
        this.createSetting[obj.to].text += "\\n";
      }
    }
  } else {
    this.createSetting[obj.to].text = obj.from;
  }
}

ExecMain.prototype.createElements = function (doc, obj) {
  let rectRef = doc.pathItems.rectangle(doc.height, 0, this.mother.convertMillimeters(obj.width), this.mother.convertMillimeters(obj.height));
  let areaTextRef = doc.textFrames.areaText(rectRef);
  if (/\\n$/.test(obj.text)) {
    areaTextRef.contents = obj.text.slice(0, -1);
  } else {
    areaTextRef.contents = obj.text;
  }

  for (let i = 0; i < areaTextRef.paragraphs.length; i++) {
    try {
      areaTextRef.paragraphs[i].paragraphAttributes.justification = Justification[obj.justification];
    } catch (e) {}
  }
  areaTextRef.textRange.characterAttributes.size = obj.fontSize;
  areaTextRef.textRange.characterAttributes.textFont = textFonts.getByName(this.mother.fontFilter(obj.font));
  areaTextRef.textRange.characterAttributes.fillColor = this.mother.colorpick(obj.color);
  areaTextRef.textRange.characterAttributes.autoLeading = false;
  areaTextRef.textRange.characterAttributes.leading = obj.leading;
  areaTextRef.textRange.characterAttributes.horizontalScale = obj.horizontalScale;
  areaTextRef.textRange.characterAttributes.tracking = obj.tracking;
  areaTextRef.selected = true;



  //bold
  let total_arrBold, total_arrColor, numbers;
  total_arrBold = [];
  while (areaTextRef.contents.indexOf("<b%") !== -1) {
    numbers = {};
    numbers.start = areaTextRef.contents.indexOf("<b%");
    numbers.end = areaTextRef.contents.indexOf("%b>");
    numbers.length = numbers.end - numbers.start - 3;
    total_arrBold.push(numbers);
    areaTextRef.contents = areaTextRef.contents.replace(/<b%/, '').replace(/%b>/, '');
  }

  // color
  total_arrColor = [];
  while (areaTextRef.contents.indexOf("<g%") !== -1) {
    numbers = {};
    numbers.start = areaTextRef.contents.indexOf("<g%");
    numbers.end = areaTextRef.contents.indexOf("%g>");
    numbers.length = numbers.end - numbers.start - 3;
    total_arrColor.push(numbers);
    areaTextRef.contents = areaTextRef.contents.replace(/<g%/, '').replace(/%g>/, '');
    for (let z = 0; z < total_arrBold.length; z++) {
      if (numbers.start < total_arrBold[z].start) {
        total_arrBold[z].start = total_arrBold[z].start - 6;
        total_arrBold[z].end = total_arrBold[z].end - 6;
      }
    }
  }

  // bold / color execute
  for (let z = 0; z < total_arrBold.length; z++) {
    for (let w = 0; w < total_arrBold[z].length; w++) {
      areaTextRef.textRanges[total_arrBold[z].start + w].characterAttributes.textFont = textFonts.getByName(this.mother.fontFilter(obj.bold));
    }
  }
  for (let z = 0; z < total_arrColor.length; z++) {
    for (let w = 0; w < total_arrColor[z].length; w++) {
      areaTextRef.textRanges[total_arrColor[z].start + w].characterAttributes.fillColor = this.mother.colorpick(obj.pointColor);
    }
  }

  //mobile
  let mileo, mileoResult, mileoBbold, mileoBcolor, mileoText;
  mileoText = '';
  if (/FULLJUSTIFY/g.test(obj.justification)) {
    for (let w = 0; w < areaTextRef.textRanges.length; w++) {
      areaTextRef.textRanges[w].characterAttributes.fillColor = this.mother.colorpick(obj.color);
    }
    mileoText = obj.text.replace(/<[bg]%/g, '').replace(/%[bg]>/g, '');
    mileo = new Mileo(mileoText, areaTextRef, "mobile");
    mileoResult = mileo.execute();
    [ mileoBbold, mileoBcolor ] = this.returnMileoPosition([ obj.text, mileoText, mileoResult ]);

    for (let i = 0; i < mileoBbold.length; i++) {
      for (let j = 0; j < mileoBbold[i].length; j++) {
        if (mileoBbold[i][j] < mileoResult.length) {
          areaTextRef.textRanges[mileoBbold[i][j]].characterAttributes.textFont = textFonts.getByName(this.mother.fontFilter(obj.bold));
        }
      }
    }
    for (let i = 0; i < mileoBcolor.length; i++) {
      for (let j = 0; j < mileoBcolor[i].length; j++) {
        if (mileoBcolor[i][j] < mileoResult.length) {
          areaTextRef.textRanges[mileoBcolor[i][j]].characterAttributes.fillColor = this.mother.colorpick(obj.pointColor);
        }
      }
    }
  }

  return areaTextRef;
}

ExecMain.prototype.saveSvg = function (ai, name, recycle = false) {
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  let fileName;
  if (this.dayString === undefined) {
    fileName = name + '_' + this.mother.ratio_string(this.mother.return_ratio()) + "_000000";
  } else {
    fileName = name + '_' + this.mother.ratio_string(this.mother.return_ratio()) + '_' + this.dayString;
  }
  ai.exportFile(new File(this.dir + '/' + fileName), ExportType.SVG, exportOptions);
  if (!recycle) {
    ai.close(SaveOptions.DONOTSAVECHANGES);
  } else {
    let items = [];
    for (let i = 0; i < ai.pageItems.length; i++) {
      items.push(ai.pageItems[i]);
    }
    const count = items.length;
    for (let i = 0; i < count; i++) {
      items[i].remove();
    }
  }
}

ExecMain.prototype.savePng = function (ai, name, scale, widthRatio = []) {
  let exportOptions = new ExportOptionsPNG24();
  exportOptions.artBoardClipping = true;
  exportOptions.horizontalScale = Number(scale);
  exportOptions.verticalScale = Number(scale);
  let fileName, ratioName;
  if (widthRatio.length === 0) {
    if (this.dayString === undefined) {
      fileName = name + '_' + this.mother.ratio_string(this.mother.return_ratio()) + "_000000";
    } else {
      fileName = name + '_' + this.mother.ratio_string(this.mother.return_ratio()) + '_' + this.dayString;
    }
  } else {
    ratioName = '';
    for (let i = 0; i < widthRatio.length; i++) {
      ratioName += this.mother.ratio_string(widthRatio[i]) + "a";
    }
    ratioName = ratioName.slice(0, -1);
    if (this.dayString === undefined) {
      fileName = name + '_' + ratioName + "_000000";
    } else {
      fileName = name + '_' + ratioName + '_' + this.dayString;
    }
  }
  ai.exportFile(new File(this.dir + '/' + fileName), ExportType.PNG24, exportOptions);
  ai.close(SaveOptions.DONOTSAVECHANGES);
}

ExecMain.prototype.splitAi = function (filePath, fullMode = false) {
  let thisAi;
  let filePathArr;
  let folderPath0, folderPath1, folderPath2, folderPath3, folderPath4;
  let folder;
  let artBoardsLength;
  let saveOptions;
  let fName;
  let fList;
  let binaryBoo;
  let binaryLayerIndex;

  binaryLayerIndex = null;

  filePathArr = filePath.split("/");
  filePathArr.pop();
  filePathArr.push("split");
  folderPath0 = filePathArr.join("/");
  filePathArr.push("ai");
  folderPath1 = filePathArr.join("/");
  filePathArr.pop();
  filePathArr.push("svg");
  folderPath2 = filePathArr.join("/");
  filePathArr.pop();
  filePathArr.push("jpg");
  folderPath3 = filePathArr.join("/");
  filePathArr.pop();
  filePathArr.push("pdf");
  folderPath4 = filePathArr.join("/");

  folder = new Folder(folderPath0);
  if (!folder.exists) {
    folder.create();
  }
  folder = new Folder(folderPath1);
  if (!folder.exists) {
    folder.create();
  }

  if (fullMode) {
    folder = new Folder(folderPath2);
    if (!folder.exists) {
      folder.create();
    }
    folder = new Folder(folderPath3);
    if (!folder.exists) {
      folder.create();
    }
    folder = new Folder(folderPath4);
    if (!folder.exists) {
      folder.create();
    }
  }

  thisAi = app.open(new File(filePath));
  artBoardsLength = thisAi.artboards.length;
  thisAi.close(SaveOptions.DONOTSAVECHANGES);

  fList = [];
  for (let i = 0; i < artBoardsLength; i++) {
    thisAi = app.open(new File(filePath));
    fName = folderPath1 + "/" + thisAi.artboards[i].name + ".ai";
    fList.push(fName);
    this.mother.artboardIsolate(thisAi, i);
    saveOptions = new IllustratorSaveOptions();
    thisAi.saveAs(new File(fName), saveOptions);
    thisAi.close(SaveOptions.DONOTSAVECHANGES);
  }

  if (!fullMode) {
    return fList;
  } else {
    for (let i = 0; i < fList.length; i++) {
      thisAi = app.open(new File(fList[i]));
      binaryBoo = false;
      saveOptions = new ExportOptionsSVG();
      saveOptions.coordinatePrecision = 7;
      fName = folderPath2 + "/" + thisAi.artboards[0].name + ".svg";

      for (let j = 0; j < thisAi.layers.length; j++) {
        if (thisAi.layers[j].name !== "svg") {
          binaryLayerIndex = j;
        }
      }

      if (binaryLayerIndex !== null) {
        binaryBoo = (thisAi.layers[binaryLayerIndex].pageItems.length !== 0);
        while (thisAi.layers[binaryLayerIndex].pageItems.length !== 0) {
          thisAi.layers[binaryLayerIndex].pageItems[0].remove();
        }
      } else {
        binaryBoo = false;
      }

      app.doScript("expandall", "contents_maker");
      thisAi.exportFile(new File(fName), ExportType.SVG, saveOptions);
      thisAi.close(SaveOptions.DONOTSAVECHANGES);

      if (binaryBoo) {
        thisAi = app.open(new File(fList[i]));
        saveOptions = new ExportOptionsJPEG();
        saveOptions.artBoardClipping = true;
        saveOptions.horizontalScale = 190;
        saveOptions.verticalScale = 190;
        saveOptions.antiAliasing = true;
        saveOptions.qualitySetting = 84;

        fName = folderPath3 + "/" + thisAi.artboards[0].name + ".jpg";
        while (thisAi.layers.getByName("svg").pageItems.length !== 0) {
          thisAi.layers.getByName("svg").pageItems[0].remove();
        }
        thisAi.exportFile(new File(fName), ExportType.JPEG, saveOptions);
        thisAi.close(SaveOptions.DONOTSAVECHANGES);

        thisAi = app.open(new File(fList[i]));
        saveOptions = new ExportOptionsJPEG();
        saveOptions.artBoardClipping = true;
        saveOptions.horizontalScale = 100;
        saveOptions.verticalScale = 100;
        saveOptions.antiAliasing = true;
        saveOptions.qualitySetting = 60;

        fName = folderPath3 + "/mo" + thisAi.artboards[0].name + ".jpg";
        while (thisAi.layers.getByName("svg").pageItems.length !== 0) {
          thisAi.layers.getByName("svg").pageItems[0].remove();
        }
        thisAi.exportFile(new File(fName), ExportType.JPEG, saveOptions);
        thisAi.close(SaveOptions.DONOTSAVECHANGES);
      }
    }

    thisAi = app.open(new File(filePath));
    this.mother.whiteBack();
    saveOptions = new PDFSaveOptions();
    saveOptions.pDFPreset = "uragenpdf";
    app.activeDocument.saveAs(new File(folderPath4 + "/tong.pdf"), saveOptions);
    thisAi.close(SaveOptions.DONOTSAVECHANGES);

  }

}

    `;
    return h;
  }
}
