ExecMain.prototype.makeLogos = function () {
  const target = {
    navi: { name: this.text.main.navigator.logo.name, color: this.mother.colorpick(this.text.main.navigator.logo.color) },
    foot: { name: this.text.main.footer.logo.name, color: this.mother.colorpick(this.text.main.footer.logo.color) },
  }
  let temp, this_ai;
  for (let key in target) {
    this_ai = app.open(new File(this.etc.targetFile[0]));
    this.mother.deleteWithout(target[key].name);
    temp = app.activeDocument.pageItems;
    for (let i = 0; i < temp.length; i++) {
      temp[i].fillColor = target[key].color;
      temp[i].strokeColor = new NoColor();
    }
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("g_logos_" + key));
  }
}

ExecMain.prototype.makeNaviMenu = function () {
  let this_ai, from, to, contents;
  let temp, temp2;
  let menu = this.text.main.navigator.menu;
  for (let i = 0; i < menu.length; i++) {

    //gray
    this_ai = app.activeDocument;
    from = "general";
    to = "navi" + String(i);
    contents = menu[i].name;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-gBd",
      fontSize: 26.5,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    temp.name = to;

    temp2 = app.activeDocument.pathItems.rectangle(temp.top + 3, temp.left - 3, this.mother.return_right(temp) + 6 - (temp.left - 3), temp.height + 6);
    temp2.fillColor = this.mother.colorpick("#ffffff");
    temp2.strokeColor = new NoColor();
    temp2.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("g_ngray_" + to), true);

    //green
    this_ai = app.activeDocument;
    from = "general";
    to = "navi" + String(i);
    contents = menu[i].name;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-gBd",
      fontSize: 26.5,
      color: "#2fa678",
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    temp.name = to;

    temp2 = app.activeDocument.pathItems.rectangle(temp.top + 3, temp.left - 3, this.mother.return_right(temp) + 6 - (temp.left - 3), temp.height + 6);
    temp2.fillColor = this.mother.colorpick("#ffffff");
    temp2.strokeColor = new NoColor();
    temp2.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, ("g_ngreen_" + to), true);
  }

  //mobile
  let doms = [];
  let path;
  let margin = 41;
  let x, y;
  this_ai = app.activeDocument;
  for (let i = 0; i < menu.length; i++) {

    from = "general";
    to = "monavi" + String(i);
    contents = menu[i].name;
    if (i !== menu.length - 1) {
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-fSm",
        fontSize: 26.5,
        color: "#434343"
      }});
    } else {
      contents = "홈스타일링 신청";
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-fSm",
        fontSize: 26.5,
        color: "#2fa678"
      }});
    }
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    temp.name = to;
    doms.push(temp);
  }

  for (let i = 1; i < doms.length; i++) {
    doms[i].top = this.mother.return_bottom(doms[i-1]) - margin;
    path = app.activeDocument.pathItems.add();
    x = doms[i-1].left + (doms[i-1].width / 2);
    y = this.mother.return_bottom(doms[i-1]) - (margin / 2) + 1;
    path.setEntirePath([ [ x - 10, y ], [ x + 10, y ] ]);
    path.strokeCap = StrokeCap.ROUNDENDCAP;
    path.strokeWidth = 1;
    path.strokeColor = this.mother.colorpick("#dcdcdc");
  }

  path = app.activeDocument.pathItems.rectangle(doms[0].top + margin, doms[doms.length - 1].left - (margin * 2.74), this.mother.return_right(doms[doms.length - 1]) + (margin * 2.74) - (doms[doms.length - 1].left - (margin * 2.74)), -1 * ((this.mother.return_bottom(doms[doms.length - 1]) - margin) - (doms[0].top + margin) - 5));
  path.fillColor = this.mother.colorpick("#ffffff");
  path.strokeColor = new NoColor();
  path.zOrder(ZOrderMethod.SENDTOBACK);

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "g_monavi", true);

}

ExecMain.prototype.makeIcons = function () {
  let temp, this_ai;

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("search");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "search"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("loader");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "loader"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("hamburger");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "hamburger"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("talk");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "talk"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("close");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "close"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("greenClose");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "greenClose"));

  this_ai = app.open(new File(this.etc.targetFile[1]));
  this.mother.deleteWithout("arrow");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_i" + "arrow"));

}

ExecMain.prototype.makeFooterLeft = function () {
  const { business } = this.text.main.footer.words;
  const [ businessObj ] = business;
  const { name: businessWording } = businessObj;
  let this_ai, from, to, contents;
  let temp;

  this_ai = app.open(new File(this.etc.targetFile[0]));
  this.mother.deleteWithout("type12");
  temp = app.activeDocument.pageItems;
  for (let i = 0; i < temp.length; i++) {
    temp[i].fillColor = this.mother.colorpick("#ffffff");
    temp[i].strokeColor = new NoColor();
  }

  let logoTarget = app.activeDocument.pageItems.getByName("type12");
  let doms = [];

  for (let i = 0; i < businessWording.length; i++) {
    from = "general";
    to = "navi" + String(i);
    contents = businessWording[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      fontSize: 11.98,
      color: "#ffffff",
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    temp.name = to;
    doms.push(temp);
  }

  for (let i = 0; i < doms.length; i++) {
    if (i === 0) {
      doms[i].top = this.mother.return_bottom(logoTarget) - 30.336;
    } else {
      doms[i].top = this.mother.return_bottom(doms[i-1]) - 8.7114;
    }
    doms[i].left = logoTarget.left;
  }

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_footer_left"));

}

ExecMain.prototype.makeFooterRight = function () {
  const { generalInfo, support, menu, sns, notice } = this.text.main.footer.words;
  const [ generalInfoObj ] = generalInfo;
  const { name: generalInfoWording } = generalInfoObj;
  const [ noticeObj ] = notice;
  const { name: noticeWording } = noticeObj;

  let this_ai, from, to, contents, doms, doms2, doms3, doms4;
  let temp;
  let tops, lefts, lefts2, leftsStandard;
  let xMargin = 57.18;

  this_ai = app.activeDocument;
  doms = [];
  contents = [ "INFO & SUPPROT" ];

  for (let i = 0; i < support.length; i++) {
    if (typeof support[i].name === "string") {
      contents.push(support[i].name);
    } else {
      temp = "";
      for (let j = 0; j < support[i].name.length; j++) {
        temp += support[i].name[j];
        temp += "  |  ";
      }
      contents.push(temp.slice(0, -5));
    }
  }

  for (let i = 0; i < generalInfoWording.length; i++) {
    contents.push(generalInfoWording[i]);
  }

  for (let i = 0; i < contents.length; i++) {
    from = "general";
    to = "footersupport" + String(i);
    if (i === 0) {
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 14,
        justification: "RIGHT",
        color: "#ffffff",
      }});
    } else {
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-eMd",
        fontSize: 12,
        justification: "RIGHT",
        color: "#ffffff",
      }});
    }
    this.setParagraph({ from: contents[i], to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.push(temp);
  }

  tops = [ 0 ];
  for (let i = 1; i < contents.length; i++) {
    if (i === 1) {
      doms[i].top = this.mother.return_bottom(doms[i-1]) - 30.75;
    } else {
      doms[i].top = this.mother.return_bottom(doms[i-1]) - 14.54;
    }
    tops.push(doms[i].top);
    doms[i].left = doms[0].left + doms[0].width - doms[i].width;
  }

  doms2 = [];
  contents = [ "MENU" ];
  for (let i = 0; i < menu.length; i++) {
    if (typeof menu[i].name === "string") {
      contents.push(menu[i].name);
    } else {
      temp = "";
      for (let j = 0; j < menu[i].name.length; j++) {
        temp += menu[i].name[j];
        temp += "  |  ";
      }
      contents.push(temp.slice(0, -5));
    }
  }

  for (let i = 0; i < contents.length; i++) {
    from = "general";
    to = "footermenu" + String(i);
    if (i === 0) {
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 14,
        justification: "RIGHT",
        color: "#ffffff",
      }});
    } else {
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-eMd",
        fontSize: 12,
        justification: "RIGHT",
        color: "#ffffff",
      }});
    }
    this.setParagraph({ from: contents[i], to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms2.push(temp);
  }

  lefts = [ doms2[0].left ];
  for (let i = 1; i < contents.length; i++) {
    doms2[i].top = tops[i];
    doms2[i].left = doms2[0].left + doms2[0].width - doms2[i].width;
    lefts.push(doms2[i].left);
  }

  lefts.sort((a, b) => { return a - b; });
  for (let i of doms) {
    i.left = lefts[0] - xMargin - i.width;
  }

  contents = [];
  for (let i = 0; i < sns.length; i++) {
    if (typeof sns[i].name === "string") {
      contents.push(sns[i].name);
    } else {
      temp = "";
      for (let j = 0; j < sns[i].name.length; j++) {
        temp += sns[i].name[j];
        temp += "  |  ";
      }
      contents.push(temp.slice(0, -5));
    }
  }

  for (let i = 0; i < noticeWording.length; i++) {
    if (typeof noticeWording[i] === "string") {
      contents.push(noticeWording[i]);
    } else {
      temp = "";
      for (let j = 0; j < noticeWording[i].length; j++) {
        temp += noticeWording[i][j];
        temp += "  |  ";
      }
      contents.push(temp.slice(0, -5));
    }
  }

  doms3 = [];
  for (let i = 0; i < contents.length; i++) {
    from = "general";
    if (i < sns.length) {
      to = "footersns" + String(i);
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 14,
        justification: "RIGHT",
        color: "#ffffff",
      }});
      this.setParagraph({ from: contents[i], to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms3.push(temp);
    } else {
      to = "footernotice" + String(i);
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-eMd",
        fontSize: 9.5,
        justification: "RIGHT",
        color: "#ffffff",
      }});
      this.setParagraph({ from: contents[i], to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms3.push(temp);
    }
  }

  for (let i = 1; i < contents.length; i++) {
    if (i < sns.length) {
      doms3[i].top = this.mother.return_bottom(doms3[i-1]) - 10.45;
      doms3[i].left = doms3[0].left + doms3[0].width - doms3[i].width;
    } else {
      doms3[i].top = this.mother.return_bottom(doms3[i-1]) - 6.8;
      doms3[i].left = doms3[0].left + doms3[0].width - doms3[i].width;
    }
  }

  doms4 = [];
  for (let i = sns.length; i < contents.length; i++) {
    doms4.unshift(doms3[i]);
  }

  for (let i = 0; i < doms4.length; i++) {
    if (i === 0) {
      doms4[i].top = this.mother.return_bottom(doms2[doms2.length - 1]) + doms4[i].height;
    } else {
      doms4[i].top = doms4[i-1].top + 6.8 + doms4[i].height;
    }
  }

  lefts2 = [];
  for (let i = 0; i < doms3.length; i++) {
    lefts2.push(doms3[i].left);
  }
  lefts2.sort((a, b) => { return a - b; });
  leftsStandard = lefts2[0];


  lefts2 = [];
  for (let i = 0; i < doms3.length; i++) {
    lefts2.push(doms3[i].left - leftsStandard);
  }
  for (let i = 0; i < doms3.length; i++) {
    doms3[i].left = this.mother.return_right(doms2[0]) + xMargin + lefts2[i];
  }

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_footer_right"), true);
}

ExecMain.prototype.makeFooterUp = function () {
  let this_ai, from, to, contents, temp, margin, x, y, groupItem, target;
  let { mobileCase: { A: mobile0, B: mobile1, C: mobile2, D: mobile3 } } = this.text.main.footer.words;
  let mobile = [ mobile0.menu, mobile1.menu, mobile2.menu, mobile3.menu ];
  let doms = [];
  let totalDoms = [];
  const ABC = [ 'A', 'B', 'C', 'D' ];

  this_ai = this.createDoc();
  margin = 33.5912;
  for (let i = 0; i < mobile.length; i++) {
    doms = [];
    for (let j = 0; j < mobile[i].length; j++) {
      from = "general";
      to = "footermobileCase" + String(i) + String(j);
      contents = mobile[i][j].name;
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 14.5,
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.push(temp);
    }

    groupItem = app.activeDocument.groupItems.add();
    groupItem.name = "mobileCase" + String(i);

    for (let j = 1; j < doms.length; j++) {
      doms[j].left = this.mother.return_right(doms[j-1]) + margin;
      x = this.mother.return_right(doms[j-1]) + (margin / 2);
      doms[0].top = doms[j].top = -1 * i * 200;
      temp = app.activeDocument.pathItems.rectangle(doms[0].top, x - 0.7, 1.4, doms[j-1].height);
      temp.fillColor = this.mother.colorpick("#cdcdcd");
      temp.strokeColor = new NoColor();
      temp.moveToEnd(groupItem);
    }

    for (let j = 0; j < doms.length; j++) {
      doms[j].moveToEnd(groupItem);
    }

    temp = app.activeDocument.pathItems.rectangle(0, 0, 385.509, 105.04);
    temp.fillColor = this.mother.colorpick("#f2f2f2");
    temp.strokeColor = new NoColor();
    target = app.activeDocument.pageItems.getByName("mobileCase" + String(i));
    temp.left = this.mother.return_center(target) - (temp.width / 2);
    temp.top = this.mother.return_middle(target) + (temp.height / 2) - 5;
    temp.zOrder(ZOrderMethod.SENDTOBACK);
    temp.moveToEnd(groupItem);

    temp = app.activeDocument.artboards.add([ this.mother.return_left(temp), this.mother.return_top(temp), this.mother.return_right(temp), this.mother.return_bottom(temp) ]);
    temp.name = "mobileCaseArt" + String(i);
    totalDoms.push(doms);
  }

  app.activeDocument.artboards[0].remove();
  app.activeDocument.saveAs(new File(this.dir + "/temp"));
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

  for (let i = 0; i < mobile.length; i++) {
    this_ai = app.open(new File(this.dir + "/temp" + ".ai"));
    this.mother.deleteWithout("mobileCase" + String(i));
    for (let j = 0; j < mobile.length; j++) {
      if (i !== j) {
        app.activeDocument.artboards.getByName("mobileCaseArt" + String(j)).remove();
      }
    }
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, "g_footer_up_" + ABC[i]);
  }
}

ExecMain.prototype.makeFooterDown = function () {
  let this_ai, from, to, contentsAll, contents0, contents1, contents2, contentsAllDoms, contentsDoms0, contentsDoms1, contentsDoms2, tempOption, temp, path, x, y, logo;
  const { business, generalInfo, notice } = this.text.main.footer.words;
  const [ businessObj ] = business;
  const { name: businessWording } = businessObj;
  const [ generalInfoObj ] = generalInfo;
  const { name: generalInfoWording } = generalInfoObj;
  const [ noticeObj ] = notice;
  const { name: noticeWording } = noticeObj;

  this_ai = app.open(new File(this.etc.targetFile[0]));
  this.mother.deleteWithout("type12");
  logo = this_ai.pageItems.getByName("type12");
  temp = app.activeDocument.pageItems;
  for (let i = 0; i < temp.length; i++) {
    temp[i].fillColor = this.mother.colorpick("#ffffff");
    temp[i].strokeColor = new NoColor();
  }

  contents0 = [];
  for (let i = 0; i < businessWording.length; i++) {
    if (typeof businessWording[i] === "string") {
      contents0.push(businessWording[i]);
    } else {
      temp = "";
      for (let j = 0; j < businessWording[i].length; j++) {
        temp += businessWording[i][j];
        temp += "  |  ";
      }
      contents0.push(temp.slice(0, -5));
    }
  }

  contents1 = [];
  noticeWording[0] = noticeWording[0] + ' ' + noticeWording[1].slice(0, -4);
  noticeWording[1] = noticeWording[1].slice(-4) + ' ' + noticeWording[2];
  noticeWording.pop();
  for (let i = 0; i < noticeWording.length; i++) {
    if (typeof noticeWording[i] === "string") {
      contents1.push(noticeWording[i]);
    } else {
      temp = "";
      for (let j = 0; j < noticeWording[i].length; j++) {
        temp += noticeWording[i][j];
        temp += "  |  ";
      }
      contents1.push(temp.slice(0, -5));
    }
  }

  contents2 = [];
  for (let i = 0; i < generalInfoWording.length; i++) {
    if (typeof generalInfoWording[i] === "string") {
      contents2.push(generalInfoWording[i]);
    } else {
      temp = "";
      for (let j = 0; j < generalInfoWording[i].length; j++) {
        temp += generalInfoWording[i][j];
        temp += "  |  ";
      }
      contents2.push(temp.slice(0, -5));
    }
  }

  contentsAll = (contents0.concat(contents1)).concat(contents2);

  contentsAllDoms = [];
  for (let i = 0; i < contentsAll.length; i++) {
    from = "general";
    to = "mofooter" + String(i);
    tempOption = {
      font: "SDGothicNeoa-eMd",
      fontSize: 13.437,
      color: "#ffffff",
    }
    if (i >= contentsAll.length - contents2.length) {
      tempOption.font = "SDGothicNeoa-gBd";
    }

    this.setCreateSetting({ from: from, to: to, exception: tempOption });
    this.setParagraph({ from: contentsAll[i], to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    contentsAllDoms.push(temp);
  }

  for (let i = 1; i < contentsAllDoms.length; i++) {
    if (i === contents0.length) {
      contentsAllDoms[i].top = this.mother.return_bottom(contentsAllDoms[i-1]) - 38.504;
      path = app.activeDocument.pathItems.add();
      x = this.mother.return_center(contentsAllDoms[i-1]);
      y = this.mother.return_bottom(contentsAllDoms[i-1]) - (38.504 / 2) + 1;
      path.setEntirePath([ [ x - 15, y ], [ x + 15, y ] ]);
      path.strokeCap = StrokeCap.ROUNDENDCAP;
      path.strokeWidth = 0.75;
      path.strokeColor = this.mother.colorpick("#ffffff");
    } else if (i === contents0.length + contents1.length) {
      contentsAllDoms[i].top = this.mother.return_bottom(contentsAllDoms[i-1]) - 19.079;
    } else {
      contentsAllDoms[i].top = this.mother.return_bottom(contentsAllDoms[i-1]) - 8.43;
    }
  }

  for (let i = 0; i < contentsAllDoms.length; i++) {
    contentsAllDoms[i].left = this.mother.return_center(contentsAllDoms[0]) - (contentsAllDoms[i].width / 2);
  }
  x = this.mother.return_center(contentsAllDoms[0]);
  path.setEntirePath([ [ x - 15, y ], [ x + 15, y ] ]);

  logo.resize(87, 87);

  logo.left = this.mother.return_center(contentsAllDoms[0]) - (logo.width / 2);
  logo.top = this.mother.return_bottom(contentsAllDoms[contentsAllDoms.length - 1]) - 41.295;

  this.mother.fit_box();

  let [ rectStartX, rectStartY, rectEndX, rectEndY ] = app.activeDocument.artboards[0].artboardRect;
  let greenRect = app.activeDocument.pathItems.rectangle(rectStartY + 43.2, rectStartX - 28, rectEndX - rectStartX + 56, -1 * (rectEndY - rectStartY - 99));
  greenRect.fillColor = this.mother.colorpick("#2fa678");
  greenRect.strokeColor = new NoColor();
  greenRect.zOrder(ZOrderMethod.SENDTOBACK);

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("g_footer_down"));

}

ExecMain.prototype.makeInterAction = function () {
  const { interaction } = this.text.main;
  let tong = [];
  let this_ai, from, to, contents, temp;

  //set data
  for (let i in interaction) {
    for (let j = 0; j < interaction[i].behaviors.length; j++) {
      tong.push({ wording: interaction[i].behaviors[j].wording.desktop, name: i + "_behaviors_desktop_" + String(j) });
      tong.push({ wording: interaction[i].behaviors[j].wording.mobile, name: i + "_behaviors_mobile_" + String(j) });
    }
  }

  //make
  for (let i = 0; i < tong.length; i++) {
    this_ai = app.activeDocument;
    from = "general";
    to = "interaction_" + tong[i].name;
    contents = tong[i].wording;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm" }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "g_" + to, true);
  }


  //question

  tong = [];

  //set data
  for (let i in interaction) {
    for (let j = 0; j < interaction[i].behaviors.length; j++) {
      if (interaction[i].behaviors[j].actionException !== undefined) {
        for (let k = 0; k < interaction[i].behaviors[j].actionException.length; k++) {
          tong.push({ wording: interaction[i].behaviors[j].actionException[k].wording.desktop, name: i + "_behaviors_desktop_" + String(j) + '_' + String(k) });
          tong.push({ wording: interaction[i].behaviors[j].actionException[k].wording.mobile, name: i + "_behaviors_mobile_" + String(j) + '_' + String(k) });
        }
      }
    }
  }

  //make
  let green;
  for (let i = 0; i < tong.length; i++) {
    this_ai = app.activeDocument;
    from = "general";

    to = "actionException_" + tong[i].name + "_green";
    contents = "Q.";
    this.setCreateSetting({ from: from, to: to, exception: { font: "Graphik-Light", color: "#2fa678" }});
    this.setParagraph({ from: contents, to: to });
    green = this.createElements(this_ai, this.createSetting[to]);
    green = green.createOutline();

    to = "actionException_" + tong[i].name;
    contents = tong[i].wording;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-dRg" }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();

    green.top = this.mother.return_middle(temp) + (green.height / 2);
    green.left = temp.left - 28;

    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "g_" + to, true);
  }

}

ExecMain.prototype.makeTriangle = function () {
  let this_ai = app.activeDocument;
  let anchors = [
    [ 455, -248 ],
    [ 380, -204.698729810779 ],
    [ 380, -291.301270189222 ]
  ];
  let newPath = app.activeDocument.pathItems.add();
  newPath.setEntirePath(anchors);
  newPath.closed = true;
  newPath.fillColor = this.mother.colorpick("#ffffff");
  newPath.strokeColor = new NoColor();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "g_" + "itriangle", true);
}

ExecMain.prototype.makeLoginWords = function () {
  const { flow } = this.text.main.login;
  let this_ai, from, to, contents, temp, asterisk;
  let flowNum = 0;
  let doms = [];
  let list = [ "desktop", "mobile" ];
  let path;

  for (let { name, title, children } of flow) {

    //name
    this_ai = app.activeDocument;
    from = "general";
    to = "g_loginName" + String(flowNum);
    contents = name;
    this.setCreateSetting({ from: from, to: to, exception: { font: "Graphik-Light", color: "#2fa678" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to, true);

    //title
    for (let titleNum = 0; titleNum < list.length; titleNum++) {
      this_ai = app.activeDocument;
      from = "general";
      doms = [];

      for (let i = 0; i < title[list[titleNum]].length; i++) {
        to = "loginTitle_" + list[titleNum] + String(flowNum) + String(i);
        contents = title[list[titleNum]][i];
        this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-bUltLt" } });
        this.setParagraph({ from: contents, to: to });
        temp = this.createElements(this_ai, this.createSetting[to]);
        temp = temp.createOutline();
        doms.push(temp);
      }

      //position
      if (!Boolean(titleNum)) {
        //desktop
        for (let j = 1; j < doms.length; j++) {
          doms[j].top = this.mother.return_bottom(doms[j - 1]) - 12;
          doms[j].left = doms[j - 1].left;
        }
      } else {
        //mobile
        for (let j = 1; j < doms.length; j++) {
          doms[j].top = this.mother.return_bottom(doms[j - 1]) - 12;
          doms[j].left = this.mother.return_center(doms[j - 1]) - (doms[j].width / 2);
        }
      }

      //green path
      path = this_ai.pathItems.add();
      path.setEntirePath([
        [ doms[0].top + 9, doms[0].left - 9 ],
        [ doms[0].top + 5, doms[0].left - 5 ],
      ]);
      path.fillColor = new NoColor();
      path.strokeColor = this.mother.colorpick("#2fa678");
      path.strokeCap = StrokeCap.ROUNDENDCAP;
      path.top = doms[0].top + 5;
      path.left = doms[0].left - 8;

      this.mother.fit_box();
      app.doScript("expandall", "contents_maker");
      this.saveSvg(this_ai, "g_loginTitle_" + list[titleNum] + String(flowNum), true);
    }

    //factor titles (children)
    for (let i = 0; i < children.length; i++) {
      this_ai = app.activeDocument;
      from = "general";
      to = "g_loginFactorTitle" + String(flowNum) + String(i);
      contents = children[i].title;
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

    flowNum++;
  }
}


ExecMain.prototype.start = function (dayString) {
  let list = [ "desktop", "mobile" ];
  this.dayString = dayString;

  this.createDoc();

  //navigator
  this.makeNaviMenu();

  //footer
  this.makeFooterRight();

  //interAction
  this.makeInterAction();
  this.makeTriangle();

  //login
  this.makeLoginWords();

  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

  //navigator
  this.makeLogos();
  this.makeIcons();

  //footer
  this.makeFooterLeft();
  this.makeFooterUp();
  this.makeFooterDown();

}
