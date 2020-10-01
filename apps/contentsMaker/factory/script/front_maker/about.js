//About page Level 1 - main
ExecMain.prototype.titleMaker = function (obj) {
  let this_ai;

  this_ai = this.createDoc();
  this.setCreateSetting({ from: "general", to: ("title" + String(obj.order)) });
  this.setParagraph({ from: obj.text, to: ("title" + String(obj.order)), });
  this.createElements(this_ai, this.createSetting[("title" + String(obj.order))]);
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("title" + String(obj.order)));

  this_ai = this.createDoc();
  this.setCreateSetting({ from: "general", to: ("titleNum" + String(obj.order)), exception: { font: "Graphik-Medium", horizontalScale: 100, }, });
  this.setParagraph({ from: ("0" + String(obj.order + 1)), to: ("titleNum" + String(obj.order)), });
  this.createElements(this_ai, this.createSetting[("titleNum" + String(obj.order))]);
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("titleNum" + String(obj.order)));
}

ExecMain.prototype.wordMaker_desktop = function (obj, x, textObj) {
  let this_ai, temp, dom, from, to, contents;
  let list = [ "main", "sub" ];
  let margin = { main: 35, sub: 35, }

  this_ai = this.createDoc();
  dom = { main: [], sub: [], }
  for (let i of list) {
    contents = textObj[i].contents;
    for (let j = 0; j < contents.length; j++) {
      from = textObj[i].type;
      to = textObj[i].type + String(x) + String(j);
      this.setCreateSetting({ from: from, to: to, direction: textObj["direction"] });
      this.setParagraph({ from: contents, to: to, order: j });
      temp = this.createElements(this_ai, this.createSetting[to]);
      dom[i].push(temp);
    }
  }
  for (let i = 0; i < dom.sub.length; i++) {
    if (i === 0) {
      dom.sub[i].top = this.mother.return_bottom(dom.main[0]) - margin.main;
    } else {
      dom.sub[i].top = this.mother.return_bottom(dom.sub[i - 1]) - margin.sub;
    }
  }
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("words" + String(obj.order) + String(x)));
}

ExecMain.prototype.wordMaker_mobile = function (obj, x, textObj) {
  let this_ai, temp, dom, from, to, contents;
  let margin = { main: 35, sub: 35, }
  let mobileWidth = 175.6;
  let circleWidth, circle;

  this_ai = this.createDoc();
  dom = { main: [], sub: [], }

  from = "sub";
  to = "mo" + (textObj.main.type + String(x) + String(0));
  contents = '';
  for (let j = 0; j < textObj.main.contents.length; j++) {
    contents += textObj.main.contents[j] + " ";
  }
  contents = contents.slice(0, -1);

  this.setCreateSetting({ from: from, to: to, direction: "left", exception: { width: mobileWidth, font: "SDGothicNeoa-gBd", fontSize: 26.5, }, });
  this.setParagraph({ from: contents, to: to, order: 0 });
  temp = this.createElements(this_ai, this.createSetting[to]);
  dom.main.push(temp);

  from = "sub";
  to = "mo" + (textObj.sub.type + String(x) + String(0));
  contents = '';
  for (let j = 0; j < textObj.sub.contents.length; j++) {
    for (let k = 0; k < textObj.sub.contents[j].length; k++) {
      contents += textObj.sub.contents[j][k] + " ";
    }
  }
  contents = contents.slice(0, -1);
  this.setCreateSetting({ from: from, to: to, direction: "left", exception: { width: mobileWidth, justification: "FULLJUSTIFYLASTLINELEFT", font: "SDGothicNeoa-cLt", fontSize: 21, leading: 37, }, });
  this.setParagraph({ from: contents, to: to, order: 0 });
  temp = this.createElements(this_ai, this.createSetting[to]);
  dom.sub.push(temp);

  dom.sub[0].top = this.mother.return_bottom(dom.main[0]) - (margin.main - 3);
  for (let j = 0; j < 3; j++) {
    circleWidth = 11;
    circle = app.activeDocument.pathItems.ellipse(this.mother.return_top(dom.main[0]) - 4, this.mother.convertMillimeters(mobileWidth) - (circleWidth * (j + 1)) - (6.5 * j) - 1, circleWidth, circleWidth);
    circle.fillColor = this.mother.colorpick("#2fa678");
    circle.strokeColor = new NoColor();
  }

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("mo" + "words" + String(obj.order) + String(x)));
}

ExecMain.prototype.wordMaker_button = function (obj, x, textObj) {
  let this_ai, temp_arr, from, to, contents;

  temp_arr = textObj.buttons;
  for (let b = 0; b < temp_arr.length; b++) {
    this_ai = this.createDoc();
    from = "general";
    contents = textObj.buttons;
    to = "button" + String(x) + String(b);

    this.setCreateSetting({ from: from, to: to, exception: { color: "#ffffff", }, });
    this.setParagraph({ from: contents, to: to, order: b });
    this.createElements(this_ai, this.createSetting[to]);
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("button" + String(obj.order) + String(x) + String(b)));

    this_ai = this.createDoc();
    from = "general";
    contents = "0" + String(b + 1);
    to = "buttonNum" + String(x) + String(b);

    this.setCreateSetting({ from: from, to: to, exception: { font: "Graphik-Medium", horizontalScale: 100, color: "#ffffff" }, });
    this.setParagraph({ from: contents, to: to, });
    this.createElements(this_ai, this.createSetting[to]);
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("buttonNum" + String(obj.order) + String(x) + String(b)));
  }
}

ExecMain.prototype.wordMaker_popup = function (obj, x, textObj) {
  let this_ai, temp, dom, from, to, contents, contentsArr;
  let list = [ "main", "sub" ];
  let margin = { main: 35, sub: 35, }
  let popups = textObj.popup.words;
  let mobileWidth = 175.6;
  let bar, barX, barH;
  let popupNumber = 0;

  for (let p of popups) {
    this_ai = this.createDoc();
    dom = { main: [], sub: [], }
    for (let i of list) {
      contents = p[i].contents;
      for (let j = 0; j < contents.length; j++) {
        from = i;
        to = "popup" + i + String(x) + String(j) + String(popupNumber);
        this.setCreateSetting({ from: from, to: to, direction: p.direction, doc: this.createDocSetting });
        this.setParagraph({ from: contents, to: to, order: j });
        temp = this.createElements(this_ai, this.createSetting[to]);
        dom[i].push(temp);
      }
    }
    for (let i = 0; i < dom.sub.length; i++) {
      if (i === 0) {
        dom.sub[i].top = this.mother.return_bottom(dom.main[0]) - margin.main;
      } else {
        dom.sub[i].top = this.mother.return_bottom(dom.sub[i - 1]) - margin.sub;
      }
    }
    this.mother.fit_box({ width: { value: 600, direction: p.direction }});
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("popups" + String(obj.order) + String(x) + String(popupNumber)));


    //popup
    this_ai = this.createDoc();

    contents = String(obj.order + x + 1) + " - " + String(popupNumber + 1);
    from = "main";
    to = "popnumber" + String(x) + String(0) + String(popupNumber);
    this.setCreateSetting({ from: from, to: to, direction: "left", exception: { font: "SDGothicNeoa-gBd", fontSize: 26.5, color: "#2fa678" } });
    this.setParagraph({ from: contents, to: to, order: 0 });
    this.createElements(this_ai, this.createSetting[to]);

    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("popnumber" + String(obj.order) + String(x) + String(popupNumber)));


    //mobile - popup title
    this_ai = this.createDoc();
    dom = { main: [], sub: [], }

    from = "sub";
    to = "mopopup" + "main" + String(x) + String(0) + String(popupNumber);
    contents = '';
    for (let j = 0; j < p["main"].contents.length; j++) {
      contents += p["main"].contents[j] + " ";
    }
    contents = contents.slice(0, -1);

    this.setCreateSetting({ from: from, to: to, direction: "left", exception: { width: mobileWidth, font: "SDGothicNeoa-gBd", fontSize: 28, }, });
    this.setParagraph({ from: contents, to: to, order: 0 });
    temp = this.createElements(this_ai, this.createSetting[to]);
    dom.main.push(temp);

    barX = this.mother.return_right(dom.main[0]) + 18;
    barH = this.mother.convertMillimeters(0.6);
    bar = app.activeDocument.pathItems.rectangle(this.mother.return_top(dom.main[0]) - (this.mother.return_height(dom.main[0]) / 2) + (barH / 2) + 2, barX, this.mother.convertMillimeters(mobileWidth) - barX, barH);
    bar.fillColor = this.mother.colorpick("#ececec");
    bar.strokeColor = new NoColor();

    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("mopopupstitle" + String(obj.order) + String(x) + String(popupNumber)));

    //mobile - popup contents
    this_ai = this.createDoc();

    from = "sub";
    to = "mopopup" + "main" + String(x) + String(0) + String(popupNumber);
    contents = '';
    for (let j = 0; j < p["sub"].contents.length; j++) {
      for (let k = 0; k < p["sub"].contents[j].length; k++) {
        contents += p["sub"].contents[j][k] + " ";
      }
    }
    contents = contents.slice(0, -1);
    contentsArr = contents.split(/<g%\*%g>/g);

    for (let j = 0; j < contentsArr.length; j++) {
      from = "sub";
      to = "mopopup" + "sub" + String(x) + String(j) + String(popupNumber);
      contents = (j !== 0 ? "<g%*%g>" : '') + contentsArr[j];
      this.setCreateSetting({ from: from, to: to, direction: "left", exception: { width: mobileWidth, justification: "FULLJUSTIFYLASTLINELEFT", font: "SDGothicNeoa-cLt", }, });
      this.setParagraph({ from: contents, to: to, order: j });
      temp = this.createElements(this_ai, this.createSetting[to]);
      dom.sub.push(temp);
    }

    for (let j = 0; j < dom.sub.length; j++) {
      if (j === 0) {
        //
      } else if (j === 1) {
        dom.sub[j].top = this.mother.return_bottom(dom.sub[j - 1]) - (margin.sub - 3);
      } else {
        dom.sub[j].top = this.mother.return_bottom(dom.sub[j - 1]) - (margin.sub - 17.6);
      }
    }

    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("mopopupscontents" + String(obj.order) + String(x) + String(popupNumber)));

    popupNumber++;
  }
}

ExecMain.prototype.wordMaker = function (obj) {
  for (let i = 0; i < obj.text.length; i++) {
    this.wordMaker_desktop(obj, i, obj.text[i]);
    this.wordMaker_button(obj, i, obj.text[i]);
    this.wordMaker_mobile(obj, i, obj.text[i]);
    this.wordMaker_popup(obj, i, obj.text[i]);
  }
}

ExecMain.prototype.imageMaker = function (obj) {
  let this_ai;
  let images = obj.text;
  for (let i of images) {
    if (i.vector) {
      this_ai = this.createDoc();
      this.setCreateSetting({ from: "general", to: i.name });
      this.setParagraph({ from: i.vectoroption.content, to: i.name, });
      this.createElements(this_ai, this.createSetting[i.name]);
      this.mother.fit_box();
      app.doScript("expandall", "contents_maker");
      this.saveSvg(this_ai, i.name);
    }
  }
}

ExecMain.prototype.generalTitle = function (obj) {
  let this_ai, temp;
  let nameList = [ "title", "main", "sub" ];
  let exceptionList = [
    { color: "#ffffff", font: "Futura-Medium", fontSize: 11.5, },
    { color: "#ffffff" },
    { color: "#ffffff", font: "SDGothicNeoa-eMd", fontSize: 10.5, },
  ];
  let nameArr = [];
  this_ai = this.createDoc();
  obj.text.unshift("About");
  for (let i = 0; i < nameList.length; i++) {
    this.setCreateSetting({ from: "general", to: "subtitle" + obj.list + nameList[i], exception: exceptionList[i] });
    this.setParagraph({ from: obj.text[i], to: "subtitle" + obj.list + nameList[i], });
    nameArr.push(this.createElements(this_ai, this.createSetting["subtitle" + obj.list + nameList[i]]));
  }
  let [ title, main, sub ] = nameArr;

  let title_bottom = this.mother.return_bottom(title);
  main.top = title_bottom - this.mother.convertMillimeters(3.8);
  sub.top = this.mother.return_bottom(main) - this.mother.convertMillimeters(3);

  let line = this_ai.pathItems.add();
  line.stroked = true;
  line.setEntirePath([[this.mother.return_left(title), (title_bottom - 2.2)], [this.mother.return_right(title), (title_bottom - 2.2)]]);
  line.fillColor = new NoColor();
  line.strokeColor = this.mother.colorpick("#ffffff");
  line.strokeWidth = 0.5;

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, (obj.list + "subtitle"));
}

ExecMain.prototype.arrowMaker = function () {
  let this_ai;

  this_ai = this.createDoc();
  this.mother.lineMaker([[120, 100], [200, 100]], { strokeColor: this.mother.colorpick("#ffffff"), strokeWidth: 5 });
  this.mother.lineMaker([[190, 90], [200, 100], [190, 110]], { strokeColor: this.mother.colorpick("#ffffff"), strokeWidth: 5 });
  this.mother.fit_box(true);
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "arrow0");

  this_ai = this.createDoc();
  this.mother.lineMaker([[185, 85], [200, 100], [185, 115]], { strokeColor: this.mother.colorpick("#dddddd"), strokeWidth: 2.75 });
  this.mother.fit_box(true);
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "arrow1");

  this_ai = this.createDoc();
  this.mother.lineMaker([[185, 85], [200, 100], [185, 115]], { strokeColor: this.mother.colorpick("#ffffff"), strokeWidth: 2.75 });
  this.mother.fit_box(true);
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "arrow2");
}

ExecMain.prototype.generalBelow = function (obj) {
  let this_ai, temp;
  let upDom = []
  let downDom = []
  if (obj.text.length > 0) {
    this_ai = this.createDoc();
  }
  for (let i = 0; i < obj.text.length; i++) {
    this.setCreateSetting({
      from: "general",
      to: "below" + obj.list + "up",
    });
    this.setParagraph({
      from: obj.text[i][0],
      to: "below" + obj.list + "up",
    });
    upDom.push(this.createElements(this_ai, this.createSetting["below" + obj.list + "up"]).createOutline());

    this.setCreateSetting({
      from: "general",
      to: "below" + obj.list + "down",
      exception: { color: "#d3d2d0", font: "Futura-Medium", fontSize: 18 }
    });
    this.setParagraph({
      from: obj.text[i][1],
      to: "below" + obj.list + "down",
    });
    downDom.push(this.createElements(this_ai, this.createSetting["below" + obj.list + "down"]).createOutline());
  }

  if (upDom.length > 2) {
    upDom[0].left = this.mother.return_left(upDom[1]) - 200 - upDom[0].width;
    upDom[2].left = this.mother.return_right(upDom[1]) + 200;

    for (let i = 0; i < downDom.length; i++) {
      downDom[i].top = this.mother.return_bottom(upDom[1]) - 9;
      downDom[i].left = upDom[i].left + (upDom[i].width / 2) - (downDom[i].width / 2);
    }
    this.mother.lineMaker([[this.mother.return_left(upDom[1]) - 100, this.mother.return_top(upDom[1])],[this.mother.return_left(upDom[1]) - 100, this.mother.return_bottom(downDom[1])]], {
      strokeColor: this.mother.colorpick("#d3d2d0"),
      strokeWidth: 1.5,
    });
    this.mother.lineMaker([[this.mother.return_right(upDom[1]) + 100, this.mother.return_top(upDom[1])],[this.mother.return_right(upDom[1]) + 100, this.mother.return_bottom(downDom[1])]], {
      strokeColor: this.mother.colorpick("#d3d2d0"),
      strokeWidth: 1.5,
    });
    this.mother.fit_box(true);

    this.saveSvg(this_ai, obj.list + "below");
  }
}

//About page Level 2 - popup

const AboutPopup = function (file) {
  this.file = file;
  this.mother = new Mother();
  app.open(new File(this.file));
  let this_ai = app.activeDocument;
  let targets = [];
  for (let i = 0; i < this_ai.artboards.length; i++) {
    targets.push(this_ai.artboards[i].name);
  }
  function filter(str) {
    return Number(str.replace(/[^0-9]/g, ''));
  }
  targets.sort((a, b) => {
    if (filter(a) !== filter(b)) {
      return filter(a) - filter(b);
    } else {
      if (/a$/.test(a)) {
        return -1;
      } else {
        return 1;
      }
    }
  });
  this_ai.close(SaveOptions.DONOTSAVECHANGES);
  this.targets = targets;
}

AboutPopup.prototype.svgLoop = function (order, layerNum) {
  layerNum = String(layerNum);
  app.open(new File(this.file));
  let this_ai = app.activeDocument;
  let removeList = [
    "etc",
    "wording",
    "back"
  ];
  let layerList = [
    "layer0",
    "layer1",
    "layer2",
  ];
  for (let i of removeList) {
    this_ai.layers.getByName(i).locked = false;
    this_ai.layers.getByName(i).pageItems.removeAll();
    this_ai.layers.getByName(i).remove();
  }

  let layerRemoveList = [];
  for (let i = 0; i < layerList.length; i++) { if (i !== Number(layerNum.replace(/[^0-9]/g, ''))) {
    layerRemoveList.push(layerList[i]);
  }}

  for (let i of layerRemoveList) {
    this_ai.layers.getByName(i).locked = false;
    this_ai.layers.getByName(i).pageItems.removeAll();
    this_ai.layers.getByName(i).remove();
  }
  this_ai.layers.getByName("layer" + String(layerNum.replace(/[^0-9]/g, ''))).locked = false;
  this_ai.layers.getByName("frame").locked = false;
  let layers = this_ai.layers.getByName("layer" + String(layerNum.replace(/[^0-9]/g, ''))).layers;

  for (let i = 0; i < this.targets.length; i++) {
    if (layers[i].name !== this.targets[order]) {
      if (layers.getByName(this.targets[i]).pageItems) {
        layers.getByName(this.targets[i]).pageItems.removeAll();
      }
      this_ai.artboards.getByName(this.targets[i]).remove();
      this_ai.layers.getByName("frame").pageItems.getByName(this.targets[i]).remove();
    }
  }
  let this_frame = this_ai.layers.getByName("frame").pageItems.getByName(this.targets[order]);
  app.activeDocument.artboards.add(this_frame.geometricBounds);
  this_frame.remove();
  this_ai.artboards.getByName(this.targets[order]).remove();

  return [ this_ai, this.targets[order] + "l" + String(layerNum.replace(/[^0-9]/g, '')) ];
}

AboutPopup.prototype.groupImages = function (id) {
  let this_ai = app.activeDocument;
  let selectionArr = [];
  let tempRectangle, frameItem, groupItem, item, tempArr, count, count2;

  groupItem = this_ai.layers.getByName("frame").groupItems.add();
  groupItem.name = id + "_group";

  frameItem = this_ai.layers.getByName("frame").pageItems.getByName(id);
  frameItem.fillColor = new NoColor();
  frameItem.strokeColor = new NoColor();
  selectionArr.push(frameItem);

  count = this_ai.layers.getByName("layer1").layers.getByName(id).pageItems.length;
  for (let i = 0; i < count; i++) {
    selectionArr.push(this_ai.layers.getByName("layer1").layers.getByName(id).pageItems[i]);
  }

  if (count === 0) {
    tempRectangle = app.activeDocument.layers.getByName("layer1").pathItems.rectangle(frameItem.top, frameItem.left, frameItem.width, frameItem.height);
    tempRectangle.fillColor = new NoColor();
    tempRectangle.strokeColor = new NoColor();
    selectionArr.push(tempRectangle);
  }

  count2 = selectionArr.length;
  for (let i = 0; i < count2; i++) {
    selectionArr[i].moveToEnd(groupItem);
  }

  return { group: groupItem, path: frameItem }
}

AboutPopup.prototype.compositionClip = function (arr) {

  let { group: target0, path: target0Path } = this.groupImages(arr[0]);
  target0.top = 0;
  target0.left = 0;

  let { group: target1, path: target1Path } = this.groupImages(arr[1]);
  target1.top = 0;
  target1.left = this.mother.return_right(target0) + 10;

  let { group: target2, path: target2Path } = this.groupImages(arr[2]);
  target2.top = this.mother.return_bottom(target0) - 10;
  target2.left = 0;

  let { group: target3, path: target3Path } = this.groupImages(arr[3]);
  target3.top = this.mother.return_bottom(target1) - 10;
  target3.left = this.mother.return_right(target2) + 10;

  let r = app.activeDocument.pathItems.rectangle(0, 0, this.mother.return_right(target3Path), -1 * this.mother.return_bottom(target3Path));
  let entireWidth = r.width;
  app.activeDocument.artboards.add(r.geometricBounds);
  r.remove();

  let transparent = app.activeDocument.pathItems.rectangle(0, 0, this.mother.return_right(target3Path), -1 * this.mother.return_bottom(target3Path));
  transparent.fillColor = new NoColor();
  transparent.strokeColor = new NoColor();

  let resultObj = {}
  resultObj.dom = [ target0, target1, target2, target3 ];
  resultObj.entireWidth = entireWidth;
  resultObj.widthRatio = [
    (Math.round((entireWidth / target0.width) * 100) / 100),
    (Math.round((entireWidth / target1.width) * 100) / 100),
    (Math.round((entireWidth / target2.width) * 100) / 100),
    (Math.round((entireWidth / target3.width) * 100) / 100),
  ];

  return resultObj;
}

AboutPopup.prototype.pngLoop = function (order) {
  app.open(new File(this.file));
  let this_ai = app.activeDocument;
  let removeList = [
    "etc",
    "wording",
    "back",
    "layer0",
    "layer2",
  ];
  for (let i of removeList) {
    this_ai.layers.getByName(i).locked = false;
    this_ai.layers.getByName(i).pageItems.removeAll();
    this_ai.layers.getByName(i).remove();
  }

  this_ai.layers.getByName("layer1").locked = false;
  this_ai.layers.getByName("frame").locked = false;
  let layers = this_ai.layers.getByName("layer1").layers;

  let { widthRatio } = this.compositionClip([ this.targets[order], this.targets[order + 1], this.targets[order + 2], this.targets[order + 3] ]);

  for (let i = 0; i < this.targets.length; i++) {
    if (i !== order && i !== order + 1 && i !== order + 2 && i !== order + 3) {
      this_ai.layers.getByName("frame").pageItems.getByName(this.targets[i]).remove();
    }
    this_ai.artboards.getByName(this.targets[i]).remove();
  }

  this_ai.layers.getByName("layer1").pageItems.removeAll();
  this_ai.layers.getByName("layer1").remove();

  return [ this_ai, this.targets[order] + "l1", 320, widthRatio ];
}

ExecMain.prototype.svgPopupMake = function () {
  let temp = [];
  let list = [ "desktop", "mobile" ];

  for (let j of list) {
    for (let i = 0; i < this.aboutpopup[j].targets.length; i++) {
      temp = this.aboutpopup[j].svgLoop(i, 0);
      app.doScript("expandall", "contents_maker");
      app.activeDocument.selection = null;
      this.saveSvg(...temp);
      temp = this.aboutpopup[j].svgLoop(i, 2);
      app.doScript("expandall", "contents_maker");
      app.activeDocument.selection = null;
      this.saveSvg(...temp);
    }
  }

}

ExecMain.prototype.pngPopupMake = function () {
  let temp, count;
  let list = [ "desktop", "mobile" ];

  for (let j of list) {
    count = 0;
    while (count < this.aboutpopup[j].targets.length) {
      temp = this.aboutpopup[j].pngLoop(count);
      app.doScript("expandall", "contents_maker");
      app.activeDocument.selection = null;
      this.savePng(...temp);
      count = count + 4
    }
  }

}

ExecMain.prototype.start = function (dayString) {
  let temp;
  let list = [
    "desktop",
    "mobile",
  ]
  this.dayString = dayString;

  // main vector make
  for (let i = 0; i < this.text.main.length; i++) {
    temp = {}
    temp.text = this.text.main[i].title;
    temp.order = i;
    this.titleMaker(temp);
    temp = {}
    temp.text = this.text.main[i].words;
    temp.order = i;
    this.wordMaker(temp);
    temp = {}
    temp.text = this.text.main[i].images;
    temp.order = i;
    this.imageMaker(temp);
  }

  // general make
  for (let d of list) {
    temp = {}
    temp.text = this.text.sub.title[d].words.contents;
    temp.list = d;
    this.generalTitle(temp);
    temp = {}
    temp.text = this.text.sub.below[d].words.contents;
    temp.list = d;
    this.generalBelow(temp);
  }
  this.arrowMaker();

  //popup make
  this.aboutpopup = {}
  this.aboutpopup.desktop = new AboutPopup(this.etc.targetFile[0]);
  this.aboutpopup.mobile = new AboutPopup(this.etc.targetFile[1]);
  this.svgPopupMake();
  this.pngPopupMake();

}
