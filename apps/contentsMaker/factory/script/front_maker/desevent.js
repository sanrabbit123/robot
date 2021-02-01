ExecMain.prototype.titleMaker = function () {
  const { main } = this.text;
  let this_ai, from, to, contents, temp;

  for (let i = 0; i < main.length; i++) {
    this_ai = this.createDoc();
    from = "general";
    to = "title" + String(i);
    contents = main[i].title;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }
}

ExecMain.prototype.factorTitleMaker = function () {
  const { main } = this.text;

  //set data
  let greenTong = [], grayTong = [];
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].green) {
        greenTong.push({ contents: main[i].children[j].title, xyz: [ i, j, 9 ] });
      } else {
        grayTong.push({ contents: main[i].children[j].title, xyz: [ i, j, 9 ] });
      }
    }
  }

  //make
  let this_ai, from, to, contents, temp, asterisk;

  for (let obj of greenTong) {
    this_ai = this.createDoc();
    from = "general";
    to = "factorTitle" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(obj.xyz[2]);
    if (obj.mobile !== undefined) {
      to = "mo" + to;
    }
    contents = obj.contents;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    asterisk = this.mother.return_asterisk({ height: temp.height * 0.535, color: "#2fa678" });
    asterisk.top = this.mother.return_middle(temp) + (asterisk.height / 2) + 0.2;
    asterisk.left = temp.left - 18.1;
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

  for (let obj of grayTong) {
    this_ai = this.createDoc();
    from = "general";
    to = "factorTitle" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(obj.xyz[2]);
    if (obj.mobile !== undefined) {
      to = "mo" + to;
    }
    contents = obj.contents;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    asterisk = this.mother.return_asterisk({ height: temp.height * 0.535, color: "#cdcdcd" });
    asterisk.top = this.mother.return_middle(temp) + (asterisk.height / 2) + 0.2;
    asterisk.left = temp.left - 18.1;
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.buttonCheck = function (arr) {
  let options, this_ai, from, to, contents, temp, temp2, height;
  for (let { contents: text, xyz: [ x, y, z ], flatform, exception } of arr) {

    if (flatform !== "desktop") {
      if (/과세/gi.test(text)) {
        text = text.replace(/ 과세\)/gi, ")");
      }
      if (/해당 없음/gi.test(text)) {
        text = text.replace(/ \(해당 없음\)/gi, "");
      }
    }

    //off
    this_ai = this.createDoc();
    from = "general";
    to = "b_check" + flatform + String(x) + String(y) + String(z) + "_off";
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
      temp2 = app.activeDocument.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 18.5, height, height);
    } else {
      height = temp.height * 0.61;
      temp2 = app.activeDocument.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 21.2, height, height);
    }
    temp2.strokeColor = new NoColor();
    temp2.fillColor = this.mother.colorpick("#ececec");
    this.mother.white_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

    //on
    this_ai = this.createDoc();
    from = "general";
    to = "b_check" + flatform + String(x) + String(y) + String(z) + "_on";
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
      temp2 = app.activeDocument.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 18.5, height, height);
    } else {
      height = temp.height * 0.61;
      temp2 = app.activeDocument.pathItems.ellipse(this.mother.return_middle(temp) + (height / 2), temp.left - 21.2, height, height);
    }
    temp2.strokeColor = new NoColor();
    temp2.fillColor = this.mother.colorpick("#2fa678");
    this.mother.white_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

  }
}

ExecMain.prototype.buttonWhite = function (arr) {
  let options, this_ai, from, to, contents, temp;
  for (let { contents: text, xyz: [ x, y, z ], flatform, exception } of arr) {

    this_ai = this.createDoc();
    from = "general";
    to = "b_white" + String(x) + String(y) + String(z);
    contents = text;
    options = {
      font: "SDGothicNeoa-eMd",
      color: "#ffffff",
    };
    for (let i in exception) { options[i] = exception[i]; }
    this.setCreateSetting({ from: from, to: to, exception: options });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

  }
}

ExecMain.prototype.buttonArrow = function (arr) {
  let options, this_ai, from, to, contents, temp;
  for (let { contents: text, xyz: [ x, y, z ], flatform, exception } of arr) {

    //off
    this_ai = this.createDoc();
    from = "general";
    to = "b_arrow" + String(x) + String(y) + String(z) + "_off";
    contents = text;
    options = {
      font: "SDGothicNeoa-dRg",
      color: "#cdcdcd",
    };
    for (let i in exception) { options[i] = exception[i]; }
    this.setCreateSetting({ from: from, to: to, exception: options });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.white_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

    //on
    this_ai = this.createDoc();
    from = "general";
    to = "b_arrow" + String(x) + String(y) + String(z) + "_on";
    contents = text;
    options = {
      font: "SDGothicNeoa-dRg",
      color: "#2fa678",
    };
    for (let i in exception) { options[i] = exception[i]; }
    this.setCreateSetting({ from: from, to: to, exception: options });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.white_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

  }
}

ExecMain.prototype.buttonGreen = function (arr) {
  let options, this_ai, from, to, contents, temp;
  for (let { contents: text, xyz: [ x, y, z ], flatform, exception } of arr) {

    //off
    this_ai = this.createDoc();
    from = "general";
    to = "b_green" + String(x) + String(y) + String(z) + "_off";
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
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

    //on
    this_ai = this.createDoc();
    from = "general";
    to = "b_green" + String(x) + String(y) + String(z) + "_on";
    contents = text;
    options = {
      font: "SDGothicNeoa-eMd",
      color: "#ffffff",
    };
    for (let i in exception) { options[i] = exception[i]; }
    this.setCreateSetting({ from: from, to: to, exception: options });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

  }
}

ExecMain.prototype.buttonMaker = function () {
  const { main, sub: { terms, submit } } = this.text;
  let buttons = {
    desktop: {
      arrow: [],
      check: [],
      white: [],
    },
    mobile: {
      green: [],
      check: [],
      white: [],
    },
  };

  //set data
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].buttons !== undefined) {
        for (let k = 0; k < main[i].children[j].buttons.length; k++) {
          buttons.desktop[main[i].children[j].buttons[k].type.desktop].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "desktop", exception: {} });
          buttons.mobile[main[i].children[j].buttons[k].type.mobile].push({ contents: main[i].children[j].buttons[k].title, xyz: [ i, j, k ], flatform: "mobile", exception: {} });
        }
      }
    }
  }

  buttons.desktop[terms.type.desktop].push({ contents: terms.title, xyz: [ 9, 9, 9 ], flatform: "desktop", exception: {} });
  buttons.mobile[terms.type.mobile].push({ contents: terms.title, xyz: [ 9, 9, 9 ], flatform: "mobile", exception: {} });

  for (let i = 0; i < submit.length; i++) {
    buttons.desktop[submit[i].type.desktop].push({ contents: submit[i].title, xyz: [ 9, i, 9 ], flatform: "desktop", exception: { font: "SDGothicNeoa-fSm" } });
    buttons.mobile[submit[i].type.mobile].push({ contents: submit[i].title, xyz: [ 9, i, 9 ], flatform: "mobile", exception: { font: "SDGothicNeoa-fSm" } });
  }

  //make
  const { desktop: { arrow: desktopArrow, check: desktopCheck, white: desktopWhite }, mobile: { green: mobileGreen, check: mobileCheck, white: mobileWhite } } = buttons;
  this.buttonCheck(desktopCheck.concat(mobileCheck));
  this.buttonWhite(desktopWhite.concat(mobileWhite));
  this.buttonArrow(desktopArrow);
  this.buttonGreen(mobileGreen);
}

ExecMain.prototype.noticeMaker = function () {
  const { main } = this.text;
  let tong = [];

  //set data
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].notice !== undefined) {
        tong.push({ contents: main[i].children[j].notice.title, xyz: [ i, j, 9 ] });
        if (main[i].children[j].notice.mobileException !== undefined) {
          tong.push({ contents: main[i].children[j].notice.mobileException, xyz: [ i, j, 9 ], mobile: true });
        }
      }
    }
  }

  //make
  let this_ai, from, to, contents, temp;
  for (let obj of tong) {
    for (let i = 0; i < 2; i++) {
      this_ai = this.createDoc();
      from = "general";
      to = "notice" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(i);
      if (obj.mobile !== undefined) {
        to = "mo" + to;
      }
      contents = "*" + obj.contents;
      this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: ((i === 0) ? "#2fa678" : "#cccccc"), justification: "LEFT", leading: 31 } });
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      this.mother.white_box();
      app.doScript("expandall", "contents_maker");
      this.saveSvg(this_ai, to);
    }
  }

}

ExecMain.prototype.promptMaker = function () {
  const { sub: { etc: { pending: { title: pendingText }, certification: { title: certificationText }, presentationComplete: { title: presentationCompleteText }, partnershipComplete: { title: partnershipCompleteText }, photoComplete: { title: photoCompleteText } } } } = this.text;
  const targets = [
    { title: "pending", contentsText: pendingText },
    { title: "certification", contentsText: certificationText },
    { title: "presentationComplete", contentsText: presentationCompleteText },
    { title: "partnershipComplete", contentsText: partnershipCompleteText },
    { title: "photoComplete", contentsText: photoCompleteText }
  ]
  let this_ai, from, to, contents, temp;

  for (let { title, contentsText } of targets) {
    this_ai = this.createDoc();
    from = "general";
    to = title;
    contents = contentsText;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm", color: "#5f5f5f", justification: "CENTER", leading: 32 } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.arrowMaker = function () {
  let this_ai = this.createDoc();
  this.mother.return_arrow();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "arrow");
}

ExecMain.prototype.fileSend = function () {
  const { sub: { etc: { fileSend: obj } } } = this.text;
  let this_ai, from, to, contents, temp, asterisk;
  const { factorTitle, white } = obj;

  from = "general";

  //factor title
  this_ai = this.createDoc();
  to = "fileSend_title";
  contents = factorTitle.title;
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  asterisk = this.mother.return_asterisk({ height: temp.height * 0.535, color: "#2fa678" });
  asterisk.top = this.mother.return_middle(temp) + (asterisk.height / 2) + 0.2;
  asterisk.left = temp.left - 18.1;
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

  //white
  for (let i = 0; i < white.length; i++) {
    this_ai = this.createDoc();
    to = "fileSend_white_" + String(i);
    contents = white[i].title;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-gBd", color: "#2fa678" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.clickWording = function () {
  const { sub: { etc: { clickWording: obj } } } = this.text;

  let this_ai, from, to, contents, temp;

  this_ai = this.createDoc();
  from = "general";
  to = "clickWording_desktop";
  contents = obj.desktop;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-aTh",
    color: "#aaaaaa"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

  this_ai = this.createDoc();
  from = "general";
  to = "clickWording_mobile";
  contents = obj.mobile;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-aTh",
    color: "#aaaaaa"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

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

  if (obj.name === "presentation") {
    obj.text.unshift("Presentation");
  } else {
    obj.text.unshift("Partnership");
  }

  for (let i = 0; i < nameList.length; i++) {
    this.setCreateSetting({ from: "general", to: "subtitle" + obj.list + nameList[i], exception: exceptionList[i] });
    this.setParagraph({ from: obj.text[i], to: "subtitle" + obj.list + nameList[i], });
    nameArr.push(this.createElements(this_ai, this.createSetting["subtitle" + obj.list + nameList[i]]));
  }
  let [ title, main, sub ] = nameArr;

  let title_bottom = this.mother.return_bottom(title);
  title_bottom = title_bottom + 3;
  main.top = title_bottom - this.mother.convertMillimeters(3.8);
  sub.top = this.mother.return_bottom(main) - this.mother.convertMillimeters(3);

  let line;

  if (obj.name === "presentation") {
    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title), (title_bottom - 5.4)], [this.mother.return_right(title), (title_bottom - 5.4)]]);
    line.fillColor = new NoColor();
    line.strokeColor = this.mother.colorpick("#ffffff");
    line.strokeWidth = 0.5;
  } else {
    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title), (title_bottom - 2.2)], [this.mother.return_left(title) + 46.5, (title_bottom - 2.2)]]);
    line.fillColor = new NoColor();
    line.strokeColor = this.mother.colorpick("#ffffff");
    line.strokeWidth = 0.5;

    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title) + 49.5, (title_bottom - 2.2)], [this.mother.return_right(title), (title_bottom - 2.2)]]);
    line.fillColor = new NoColor();
    line.strokeColor = this.mother.colorpick("#ffffff");
    line.strokeWidth = 0.5;
  }

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("gt_" + obj.name + "_" + obj.list));
}

ExecMain.prototype.whiteTitle = function () {
  const { sub } = this.text;
  const { titleFirst, titleSecond } = sub;
  const list = [ "desktop", "mobile" ];
  for (let i of list) {
    this.generalTitle({ list: i, text: titleFirst[i].words.contents, name: "presentation" });
    this.generalTitle({ list: i, text: titleSecond[i].words.contents, name: "partnership" });
  }
}

ExecMain.prototype.start = function (dayString) {
  let list = [ "desktop", "mobile" ];
  this.dayString = dayString;

  this.titleMaker();
  this.factorTitleMaker();

  this.buttonMaker();
  this.noticeMaker();

  this.promptMaker();

  this.fileSend();
  this.clickWording();

  // this.arrowMaker();
  this.whiteTitle();

}
