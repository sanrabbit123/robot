ExecMain.prototype.generalTitle = function (obj) {
  const mother = this.mother;
  const nameList = [ "title", "main", "sub" ];
  const exceptionList = [
    { color: "#ffffff", font: "Futura-Medium", fontSize: 11.5, },
    { color: "#ffffff" },
    { color: "#ffffff", font: "SDGothicNeoa-eMd", fontSize: 10.5, },
  ];
  let this_ai, from, to, contents, temp;

  //create doc
  let nameArr = [];
  this_ai = this.createDoc();
  from = "general";

  //set contents
  obj.text.unshift("Portfolio");
  for (let i = 0; i < nameList.length; i++) {
    to = "subtitle" + obj.list + nameList[i];
    contents = obj.text[i];
    this.setCreateSetting({ from: from, to: to, exception: exceptionList[i] });
    this.setParagraph({ from: contents, to: to, });
    nameArr.push(this.createElements(this_ai, this.createSetting[to]));
  }

  //position
  let [ title, main, sub ] = nameArr;
  let title_bottom = mother.return_bottom(title);
  main.top = title_bottom - mother.convertMillimeters(3.8);
  sub.top = mother.return_bottom(main) - mother.convertMillimeters(3);

  //make line
  let line = this_ai.pathItems.add();
  line.stroked = true;
  line.setEntirePath([ [ mother.return_left(title), (title_bottom - 2.2) ], [ mother.return_right(title), (title_bottom - 2.2) ] ]);
  line.fillColor = new NoColor();
  line.strokeColor = mother.colorpick("#ffffff");
  line.strokeWidth = 0.5;

  //end
  app.doScript("expandall", "contents_maker");
  mother.fit_box();
  this.saveSvg(this_ai, obj.list + "subtitle");
}

ExecMain.prototype.generalBelow = function (obj) {
  const mother = this.mother;
  let this_ai, from, to, contents, temp;

  //create doc
  let upDom = [];
  let downDom = [];
  if (obj.text.length > 0) {
    this_ai = this.createDoc();
  }
  from = "general";

  //set contents
  for (let i = 0; i < obj.text.length; i++) {

    to = "below" + obj.list + "up";
    contents = obj.text[i][0];
    this.setCreateSetting({ from: from, to: to });
    this.setParagraph({ from: contents, to: to });
    upDom.push(this.createElements(this_ai, this.createSetting[to]).createOutline());

    to = "below" + obj.list + "down";
    contents = obj.text[i][1];
    this.setCreateSetting({ from: from, to: to, exception: { color: "#d3d2d0", font: "Futura-Medium", fontSize: 18 } });
    this.setParagraph({ from: contents, to: to });
    downDom.push(this.createElements(this_ai, this.createSetting[to]).createOutline());

  }

  //position
  if (upDom.length > 2) {
    upDom[0].left = mother.return_left(upDom[1]) - 200 - upDom[0].width;
    upDom[2].left = mother.return_right(upDom[1]) + 200;

    for (let i = 0; i < downDom.length; i++) {
      downDom[i].top = mother.return_bottom(upDom[1]) - 9;
      downDom[i].left = upDom[i].left + (upDom[i].width / 2) - (downDom[i].width / 2);
    }
    mother.lineMaker([ [ mother.return_left(upDom[1]) - 100, mother.return_top(upDom[1]) ], [ mother.return_left(upDom[1]) - 100, mother.return_bottom(downDom[1]) ] ], {
      strokeColor: mother.colorpick("#d3d2d0"),
      strokeWidth: 1.5,
    });
    mother.lineMaker([ [ mother.return_right(upDom[1]) + 100, mother.return_top(upDom[1]) ], [ mother.return_right(upDom[1]) + 100, mother.return_bottom(downDom[1]) ] ], {
      strokeColor: mother.colorpick("#d3d2d0"),
      strokeWidth: 1.5,
    });

    mother.fit_box(true);
    this.saveSvg(this_ai, obj.list + "below");
  }
}

ExecMain.prototype.arrowMaker = function () {
  let this_ai = this.createDoc();
  this.mother.return_arrow();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "arrow0");

  this_ai = app.open(new File(this.etc.targetFile[0]));
  this.mother.deleteWithout("arrow1");
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "arrow1");
}

ExecMain.prototype.searchTitle = function (obj) {
  const { contents, xyz, flatform } = obj;
  let this_ai, from, to, temp, colon;

  //wording
  this_ai = app.activeDocument;
  from = "general";
  to = "searchTitle_" + flatform + "_" + String(xyz[0]) + String(xyz[1]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "Graphik-Medium" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();

  //green colon
  colon = "<g%:%g>";
  this.setCreateSetting({ from: from, to: to + "_col", exception: { font: "Graphik-Medium", color: "#505050" } });
  this.setParagraph({ from: colon, to: to + "_col" });
  colon = this.createElements(this_ai, this.createSetting[to + "_col"]).createOutline();

  //colon position
  colon.left = this.mother.return_right(temp) + 16;
  colon.top = this.mother.return_middle(temp) + (colon.height / 2);

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, to, true);
}

ExecMain.prototype.searchFactor = function (obj) {
  const { contents, xyz, flatform } = obj;
  let this_ai, from, to, temp;

  from = "general";

  //off
  this_ai = app.activeDocument;
  to = "searchFactor_" + flatform + "_off_" + String(xyz[0]) + String(xyz[1]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#505050" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.white_box();
  this.saveSvg(this_ai, to, true);

  //on
  this_ai = app.activeDocument;
  to = "searchFactor_" + flatform + "_on_" + String(xyz[0]) + String(xyz[1]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#2fa678" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.white_box();
  this.saveSvg(this_ai, to, true);
}

ExecMain.prototype.searchMaker = function () {
  const { search: { option } } = this.text.main;
  let titleTarget = [];
  let factorTarget = [];

  //target
  for (let i = 0; i < option.length; i++) {
    titleTarget.push({ contents: option[i].wording, xyz: [ i, 0 ], flatform: "desktop" });
    for (let j = 0; j < option[i].children.length; j++) {
      factorTarget.push({ contents: option[i].children[j].wording, xyz: [ i, j ], flatform: "desktop" });
    }
  }

  this.createDoc();

  //make words
  for (let i = 0; i < titleTarget.length; i++) {
    this.searchTitle(titleTarget[i]);
  }
  for (let i = 0; i < factorTarget.length; i++) {
    this.searchFactor(factorTarget[i]);
  }

  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

}

ExecMain.prototype.listTitleTitle = function (obj) {
  const { contents, xyz, flatform } = obj;
  let this_ai, from, to, temp;

  from = "general";
  this_ai = this.createDoc();
  to = "listTitleTitle_" + flatform + "_" + String(xyz[0]) + String(xyz[1]) + String(xyz[2]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "Futura-Medium", color: "#505050" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, to);
}

ExecMain.prototype.listTitleIcon = function (obj) {
  const { contents, xyz, name, flatform } = obj;
  let this_ai, from, to, temp;

  from = "general";
  this_ai = this.createDoc();
  to = "listTitleIcon_" + flatform + "_" + String(xyz[0]) + String(xyz[1]) + String(xyz[2]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#505050" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, to);

  //ai icon
  this_ai = app.open(new File(this.etc.targetFile[0]));
  this.mother.deleteWithout(name);
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "listTitleIcon_Icon_" + name);

}

ExecMain.prototype.listTitleDetailTitle = function (obj) {
  const { contents, xyz, flatform } = obj;
  let this_ai, from, to, temp;

  this_ai = app.activeDocument;
  from = "general";
  to = "listTitleDetailTitle_" + flatform + "_" + String(xyz[0]) + String(xyz[1]) + String(xyz[2]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  asterisk = this.mother.return_asterisk({ height: temp.height * 0.535, color: "#2fa678" });
  asterisk.top = this.mother.return_middle(temp) + (asterisk.height / 2) + 0.2;
  asterisk.left = temp.left - 18.1;
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to, true);
}

ExecMain.prototype.listTitleDetailChild = function (obj) {
  let options, this_ai, from, to, contents, temp, temp2, height;
  const { contents: text, xyz: [ x, y, z ], flatform, exception } = obj;

  //off
  this_ai = app.activeDocument;
  from = "general";
  to = "listTitleDetailChildren_off_" + flatform + "_" + String(x) + String(y) + String(z);
  contents = text;
  options = {
    font: "SDGothicNeoa-eMd",
    color: "#575757",
  };
  for (let i in exception) { options[i] = exception[i]; }
  this.setCreateSetting({ from: from, to: to, exception: options });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  if (flatform === "desktop") {
    height = temp.height * 0.45;
    temp2 = this_ai.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 18.5, height, height);
  } else {
    height = temp.height * 0.61;
    temp2 = this_ai.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 21.2, height, height);
  }
  temp2.strokeColor = new NoColor();
  temp2.fillColor = this.mother.colorpick("#ececec");
  this.mother.white_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to, true);

  //on
  this_ai = app.activeDocument;
  from = "general";
  to = "listTitleDetailChildren_on_" + flatform + "_" + String(x) + String(y) + String(z);
  contents = text;
  options = {
    font: "SDGothicNeoa-eMd",
    color: "#2fa678",
  };

  for (let i in exception) { options[i] = exception[i]; }
  this.setCreateSetting({ from: from, to: to, exception: options });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  if (flatform === "desktop") {
    height = temp.height * 0.45;
    temp2 = this_ai.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 18.5, height, height);
  } else {
    height = temp.height * 0.61;
    temp2 = this_ai.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 21.2, height, height);
  }
  temp2.strokeColor = new NoColor();
  temp2.fillColor = this.mother.colorpick("#2fa678");
  this.mother.white_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to, true);

}

ExecMain.prototype.listTitleMaker = function () {
  const { listTitle: { wording, icons, details } } = this.text.main;
  let this_ai, from, to, contents, temp;

  //list title
  this.listTitleTitle({ contents: wording.title, xyz: [ 0, 0, 9 ], flatform: "desktop" });

  //icons
  for (let i = 0; i < icons.length; i++) {
    this.listTitleIcon({ contents: icons[i].wording.title, xyz: [ 1, i, 9 ], name: icons[i].name, flatform: "desktop" });
  }

  this.createDoc();

  //details - title
  for (let i = 0; i < details.length; i++) {
    this.listTitleDetailTitle({ contents: details[i].title, xyz: [ 2, i, 9 ], flatform: "desktop" });

    //details - children
    for (let j = 0; j < details[i].children.length; j++) {
      this.listTitleDetailChild({ contents: details[i].children[j].title, xyz: [ 2, i, j ], flatform: "desktop", exception: {} });
      this.listTitleDetailChild({ contents: details[i].children[j].title, xyz: [ 2, i, j ], flatform: "mobile", exception: {} });
    }
  }

  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

}

ExecMain.prototype.start = function (dayString) {
  const list = [ "desktop", "mobile" ];
  let temp;
  this.dayString = dayString;

  this.searchMaker();
  this.listTitleMaker();

  // general make
  const { sub } = this.text;
  for (let d of list) {
    temp = {};
    temp.text = sub.title[d].words.contents;
    temp.list = d;
    this.generalTitle(temp);
    temp = {};
    temp.text = sub.below[d].words.contents;
    temp.list = d;
    this.generalBelow(temp);
  }

  this.arrowMaker();

}
