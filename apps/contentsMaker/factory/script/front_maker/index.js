ExecMain.prototype.slideWords = function () {
  const { words: { main, sub, subtitle } } = this.text.main.slide;

  let this_ai, from, to, contents;
  let temp, temp2;
  let doms = [];

  //main
  this_ai = this.createDoc();
  for (let i = 0; i < main.length; i++) {
    from = "general";
    to = "indexSlideMain0" + String(i);
    contents = main[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-gBd",
      fontSize: 50,
      color: "#ffffff",
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.push(temp);
  }

  doms[1].left = doms[0].left - 2;
  doms[1].top = this.mother.return_bottom(doms[0]) - 23;

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "slideWords");

  //sub - desktop
  this_ai = this.createDoc();
  doms = [];

  from = "general";
  to = "indexSlideSubDesktopAbout";
  contents = subtitle[0];
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "Graphik-Medium",
    fontSize: 25,
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  temp = app.activeDocument.pathItems.add();
  temp2 = this.mother.return_bottom(doms[0]) - 6;
  temp.fillColor = new NoColor();
  temp.strokeColor = this.mother.colorpick("#2fa678");
  temp.setEntirePath([ [ doms[0].left, temp2 ], [ this.mother.return_right(doms[0]), temp2] ]);

  from = "general";
  to = "indexSlideSubDesktop";
  contents = sub[0] + ', ' + sub[1];
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-dRg",
    fontSize: 30,
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  doms[1].left = this.mother.return_right(doms[0]) - doms[1].width;
  doms[1].top = this.mother.return_bottom(doms[0]) - 22;

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "slideSub");

  //sub - mobile
  this_ai = this.createDoc();
  doms = [];

  for (let i = 0; i < sub.length; i++) {
    from = "general";
    to = "indexSlideSubMobile" + String(i);
    contents = sub[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-dRg",
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.push(temp);
  }

  doms[1].left = this.mother.return_right(doms[0]) - doms[1].width;
  doms[1].top = this.mother.return_bottom(doms[0]) - 11.6789;

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "moslideSub");

  //icons
  this_ai = app.open(new File(this.etc.targetFile[2]));
  this.mother.deleteWithout("mocircles");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "moslideCircles");

}

ExecMain.prototype.aboutWords = function () {
  let this_ai, from, to, contents;
  let temp, path, path2, x, y, doms;

  const { words } = this.text.main.about;
  let num = 0;
  for (let obj of words) {
    this_ai = this.createDoc();
    doms = {};

    //main
    doms.main = [];
    for (let i = 0; i < obj.main.length; i++) {
      from = "general";
      to = "indexAboutmain" + obj.setting.direction + String(i);
      contents = obj.main[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 22,
        color: "#434343"
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.main.push(temp);
    }
    for (let i = 1; i < obj.main.length; i++) {
      if (obj.setting.direction === "left") {
        doms.main[i].left = doms.main[i - 1].left;
      } else {
        doms.main[i].left = this.mother.return_right(doms.main[i - 1]) - doms.main[i].width - 1;
      }
      doms.main[i].top = this.mother.return_bottom(doms.main[i - 1]) - 10.5;
    }

    //sub
    doms.sub = [];
    for (let i = 0; i < obj.sub.length; i++) {
      from = "general";
      to = "indexAboutsub" + obj.setting.direction + String(i);
      contents = obj.sub[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-dRg",
        fontSize: 10.5,
        color: "#757575"
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.sub.push(temp);
    }
    doms.sub[0].top = this.mother.return_bottom(doms.main[doms.main.length - 1]) - 20;
    if (obj.setting.direction === "left") {
      doms.sub[0].left = doms.main[doms.main.length - 1].left;
    } else {
      doms.sub[0].left = this.mother.return_right(doms.main[doms.main.length - 1]) - doms.sub[0].width;
    }
    for (let i = 1; i < obj.sub.length; i++) {
      if (obj.setting.direction === "left") {
        doms.sub[i].left = doms.sub[i - 1].left;
      } else {
        doms.sub[i].left = this.mother.return_right(doms.sub[i - 1]) - doms.sub[i].width;
      }
      doms.sub[i].top = this.mother.return_bottom(doms.sub[i - 1]) - 8.5;
    }

    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, "about" + (obj.setting.direction === "left" ? "right" : "left"));

    //button
    this_ai = this.createDoc();
    for (let i = 0; i < obj.button.length; i++) {
      from = "general";
      to = "indexAboutbutton" + obj.setting.direction + String(i);
      contents = obj.button[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-fSm",
        color: "#ffffff"
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
    }

    x = this.mother.return_right(temp) + 10;
    y = this.mother.return_middle(temp);

    path = app.activeDocument.pathItems.add();
    path.setEntirePath([ [ x, y ], [ x + 30, y ] ]);
    path.fillColor = new NoColor();
    path.strokeColor = this.mother.colorpick("#ffffff");
    path.strokeWidth = 1.25;
    path.strokeCap = StrokeCap.ROUNDENDCAP;

    path2 = app.activeDocument.pathItems.add();
    path2.setEntirePath([ [ x + 25, y + 5 ], [ x + 30, y ], [ x + 25, y - 5 ] ]);
    path2.fillColor = new NoColor();
    path2.strokeColor = this.mother.colorpick("#ffffff");
    path2.strokeWidth = 1.25;
    path2.strokeCap = StrokeCap.ROUNDENDCAP;

    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "aboutbutton" + (obj.setting.direction === "left" ? "right" : "left"));

    //mobile
    this_ai = this.createDoc();
    doms = {}

    //main
    doms.main = [];
    for (let i = 0; i < obj.main.length; i++) {
      from = "general";
      to = "moindexAboutmain" + obj.setting.direction + String(i);
      contents = obj.main[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: 22,
        color: "#434343"
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.main.push(temp);
    }
    for (let i = 1; i < obj.main.length; i++) {
      doms.main[i].left = doms.main[i - 1].left;
      doms.main[i].top = this.mother.return_bottom(doms.main[i - 1]) - 10;
    }

    //sub
    doms.sub = [];
    for (let i = 0; i < obj.mobile.length; i++) {
      from = "general";
      to = "moindexAboutsub" + obj.setting.direction + String(i);
      contents = obj.mobile[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-dRg",
        fontSize: 13.834,
        color: "#757575"
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.sub.push(temp);
    }

    doms.sub[0].top = this.mother.return_bottom(doms.main[doms.main.length - 1]) - 17.8;
    doms.sub[0].left = doms.main[doms.main.length - 1].left;

    for (let i = 1; i < obj.mobile.length; i++) {
      doms.sub[i].left = doms.sub[i - 1].left;
      doms.sub[i].top = this.mother.return_bottom(doms.sub[i - 1]) - 9.2;
    }

    //number
    from = "general";
    to = "moindexAboutnumber" + obj.setting.direction;
    contents = String(num + 1) < 10 ? '0' + String(num + 1) : String(num + 1);
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "Graphik-Medium",
      fontSize: 22.5,
      color: "#2fa678"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();

    temp.left = doms.main[0].left - 45;
    temp.top = this.mother.return_middle(doms.main[0]) + (temp.height / 2);

    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, "moabout" + (obj.setting.direction === "left" ? "right" : "left"));

    num++;
  }

  //mobile about info
  let motherLayer;
  let targets = [ "a0", "a1" ];
  for (let j = 0; j < targets.length; j++) {
    for (let i = 0; i < 3; i++) {
      this_ai = app.open(new File(this.etc.targetFile[0]));
      this.mother.deleteWithoutLayer("level" + String(i));
      motherLayer = app.activeDocument.layers.getByName("level" + String(i));
      motherLayer.layers.getByName(targets[1 - j]).remove();
      app.activeDocument.artboards.getByName(targets[1 - j]).remove();
      app.doScript("expandall", "contents_maker");
      if (i !== 1) {
        this.saveSvg(this_ai, "moabout" + String(j) + "_level" + String(i));
      } else {
        this.savePng(this_ai, "moabout" + String(j) + "_level" + String(i), 220);
      }
    }
  }

}

ExecMain.prototype.bannerWords = function () {
  const { words } = this.text.main.banner;
  let this_ai, from, to, contents;
  let temp, doms, x, y, path, path2;

  //main - desktop
  this_ai = this.createDoc();
  doms = [];

  from = "general";
  to = "bannerMain";
  contents = words.main;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-dRg",
    fontSize: 41.386,
    color: "#ffffff"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  from = "general";
  to = "bannerSub";
  contents = words.sub;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-dRg",
    fontSize: 19.593,
    color: "#ffffff"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  doms[1].left = doms[0].left;
  doms[1].top = this.mother.return_bottom(doms[0]) - 17.3458;

  temp = app.activeDocument.pathItems.ellipse(doms[0].top + 4, doms[0].left - 9, 6, 6);
  temp.strokeColor = new NoColor();
  temp.fillColor = this.mother.colorpick("#ffffff");
  temp.opacity = 50;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "bannerMain");

  //main - mobile
  this_ai = this.createDoc();
  doms = [];

  from = "general";
  to = "bannermoMain";
  contents = words.main;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-dRg",
    fontSize: 41.386,
    color: "#ffffff"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  from = "general";
  to = "bannermoSub";
  contents = words.sub;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-dRg",
    fontSize: 24,
    color: "#ffffff"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  doms[1].left = doms[0].left;
  doms[1].top = this.mother.return_bottom(doms[0]) - 17.3458;

  temp = app.activeDocument.pathItems.ellipse(doms[0].top + 4, doms[0].left - 9, 6, 6);
  temp.strokeColor = new NoColor();
  temp.fillColor = this.mother.colorpick("#ffffff");
  temp.opacity = 50;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "bannermoMain");

  //button
  this_ai = this.createDoc();

  from = "general";
  to = "bannerbutton";
  contents = words.button;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-fSm",
    color: "#2fa678"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();

  x = this.mother.return_right(temp) + 10;
  y = this.mother.return_middle(temp);

  path = app.activeDocument.pathItems.add();
  path.setEntirePath([ [ x, y ], [ x + 30, y ] ]);
  path.fillColor = new NoColor();
  path.strokeColor = this.mother.colorpick("#2fa678");
  path.strokeWidth = 1.25;
  path.strokeCap = StrokeCap.ROUNDENDCAP;

  path2 = app.activeDocument.pathItems.add();
  path2.setEntirePath([ [ x + 25, y + 5 ], [ x + 30, y ], [ x + 25, y - 5 ] ]);
  path2.fillColor = new NoColor();
  path2.strokeColor = this.mother.colorpick("#2fa678");
  path2.strokeWidth = 1.25;
  path2.strokeCap = StrokeCap.ROUNDENDCAP;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "bannerButton");

  //just arrow
  this_ai = this.createDoc();

  x = 0;
  y = 0;

  path = app.activeDocument.pathItems.add();
  path.setEntirePath([ [ x, y ], [ x + 30, y ] ]);
  path.fillColor = new NoColor();
  path.strokeColor = this.mother.colorpick("#ffffff");
  path.strokeWidth = 1.25;
  path.strokeCap = StrokeCap.ROUNDENDCAP;

  path2 = app.activeDocument.pathItems.add();
  path2.setEntirePath([ [ x + 25, y + 5 ], [ x + 30, y ], [ x + 25, y - 5 ] ]);
  path2.fillColor = new NoColor();
  path2.strokeColor = this.mother.colorpick("#ffffff");
  path2.strokeWidth = 1.25;
  path2.strokeCap = StrokeCap.ROUNDENDCAP;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "bannerArrow");

  //subButton
  this_ai = this.createDoc();

  from = "general";
  to = "bannersubbutton";
  contents = words.subButton;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "Graphik-Medium",
    color: "#ffffff"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "bannerSubButton");

  //graphic
  for (let i = 0; i < 3; i++) {
    this_ai = app.open(new File(this.etc.targetFile[1]));
    this.mother.deleteWithout("level" + String(i));
    app.doScript("expandall", "contents_maker");
    if (i !== 1) {
      this.saveSvg(this_ai, "bannerShadow" + String(i));
    } else {
      this.savePng(this_ai, "bannerShadow" + String(i), 320);
    }
  }

}

ExecMain.prototype.portfolioWords = function () {
  const { words: { portfolio, review, tags } } = this.text.main.portfolio;

  //portfolio
  this_ai = this.createDoc();
  from = "general";
  to = "portfolioPortfolio";
  contents = portfolio;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-gBd",
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "portfolio_p");

  //review
  this_ai = this.createDoc();
  from = "general";
  to = "portfolioReview";
  contents = review;
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-gBd",
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "portfolio_r");

  //tag
  let newContents = [];
  let doms = [];
  let newCtemp;
  let newNum = Math.floor(tags.length / 2);

  newCtemp = '';
  for (let i = 0; i < newNum; i++) {
    newCtemp += '<g%#%g>' + tags[i] + '  ';
  }
  newCtemp = newCtemp.slice(0, -2);
  newContents.push(newCtemp);

  newCtemp = '';
  for (let i = newNum; i < tags.length; i++) {
    newCtemp += '<g%#%g>' + tags[i] + '  ';
  }
  newCtemp = newCtemp.slice(0, -2);
  newContents.push(newCtemp);

  this_ai = this.createDoc();
  for (let i = 0; i < newContents.length; i++) {
    from = "general";
    to = "portfolioTag" + String(i);
    contents = newContents[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-cLt",
      color: "#2fa678",
      pointColor: "#c6ded1",
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.push(temp);
  }

  doms[1].top = this.mother.return_bottom(doms[0]) - 14;
  doms[1].left = this.mother.return_right(doms[0]) - doms[1].width;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "portfolio_tags");

  //icons
  this_ai = app.open(new File(this.etc.targetFile[2]));
  this.mother.deleteWithout("search");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("portfolio" + "search"));

  this_ai = app.open(new File(this.etc.targetFile[2]));
  this.mother.deleteWithout("circles");
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, ("portfolio" + "circles"));

}

ExecMain.prototype.belowaboutWords = function () {
  let this_ai, from, to, contents;
  let temp, path, path2, x, y, doms;

  const { words: { main, sub, tablet, mobile, button } } = this.text.main.below;

  this_ai = this.createDoc();
  doms = {};

  //main
  doms.main = [];
  for (let i = 0; i < main.length; i++) {
    from = "general";
    to = "belowAboutmain" + String(i);
    contents = main[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-gBd",
      fontSize: 22,
      color: "#434343"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.main.push(temp);
  }

  for (let i = 1; i < main.length; i++) {
    doms.main[i].left = this.mother.return_right(doms.main[i - 1]) - doms.main[i].width;
    doms.main[i].top = this.mother.return_bottom(doms.main[i - 1]) - 10.5;
  }

  //sub
  doms.sub = [];
  for (let i = 0; i < sub.length; i++) {
    from = "general";
    to = "belowAboutsub" + String(i);
    contents = sub[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-dRg",
      fontSize: 10.5,
      color: "#757575"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.sub.push(temp);
  }
  doms.sub[0].top = this.mother.return_bottom(doms.main[doms.main.length - 1]) - 20;
  doms.sub[0].left = this.mother.return_right(doms.main[doms.main.length - 1]) - doms.sub[0].width;

  for (let i = 1; i < sub.length; i++) {
    doms.sub[i].left = this.mother.return_right(doms.sub[i - 1]) - doms.sub[i].width;
    doms.sub[i].top = this.mother.return_bottom(doms.sub[i - 1]) - 8.5;
  }

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "belowAboutWord");

  //button
  this_ai = this.createDoc();
  for (let i = 0; i < button.length; i++) {
    from = "general";
    to = "belowAboutbutton" + String(i);
    contents = button[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      color: "#ffffff"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
  }

  x = this.mother.return_right(temp) + 10;
  y = this.mother.return_middle(temp);

  path = app.activeDocument.pathItems.add();
  path.setEntirePath([ [ x, y ], [ x + 30, y ] ]);
  path.fillColor = new NoColor();
  path.strokeColor = this.mother.colorpick("#ffffff");
  path.strokeWidth = 1.25;
  path.strokeCap = StrokeCap.ROUNDENDCAP;

  path2 = app.activeDocument.pathItems.add();
  path2.setEntirePath([ [ x + 25, y + 5 ], [ x + 30, y ], [ x + 25, y - 5 ] ]);
  path2.fillColor = new NoColor();
  path2.strokeColor = this.mother.colorpick("#ffffff");
  path2.strokeWidth = 1.25;
  path2.strokeCap = StrokeCap.ROUNDENDCAP;

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "belowAboutbutton");

  //tablet
  this_ai = this.createDoc();
  doms = {};

  //main
  doms.main = [];
  for (let i = 0; i < main.length; i++) {
    from = "general";
    to = "tabelowAboutmain" + String(i);
    contents = main[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-gBd",
      fontSize: 20,
      color: "#434343"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.main.push(temp);
  }

  for (let i = 1; i < main.length; i++) {
    doms.main[i].left = this.mother.return_right(doms.main[i - 1]) - doms.main[i].width;
    doms.main[i].top = this.mother.return_bottom(doms.main[i - 1]) - 10.5;
  }

  //sub
  doms.sub = [];
  for (let i = 0; i < tablet.length; i++) {
    from = "general";
    to = "tabelowAboutsub" + String(i);
    contents = tablet[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-dRg",
      fontSize: 10.5,
      color: "#757575"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.sub.push(temp);
  }
  doms.sub[0].top = this.mother.return_bottom(doms.main[doms.main.length - 1]) - 20;
  doms.sub[0].left = this.mother.return_right(doms.main[doms.main.length - 1]) - doms.sub[0].width;

  for (let i = 1; i < tablet.length; i++) {
    doms.sub[i].left = this.mother.return_right(doms.sub[i - 1]) - doms.sub[i].width;
    doms.sub[i].top = this.mother.return_bottom(doms.sub[i - 1]) - 8.5;
  }

  x = this.mother.return_right(doms.sub[doms.sub.length - 1]);
  y = this.mother.return_middle(doms.sub[doms.sub.length - 1]) - 25;
  temp = app.activeDocument.pathItems.roundedRectangle(y, x - 30, 30, 2, 1.5, 1.5);

  temp.fillColor = this.mother.colorpick("#606060");
  temp.strokeColor = new NoColor();

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "tabelowAboutWord");

  //mobile
  this_ai = this.createDoc();
  doms = {}

  //main
  doms.main = [];
  contents = '';
  for (let i = 0; i < main.length; i++) {
    contents += main[i] + ' ';
  }
  contents = contents.slice(0, -1);
  from = "general";
  to = "mobelowAboutmain";
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "SDGothicNeoa-gBd",
    fontSize: 22,
    color: "#434343",
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.main.push(temp);

  //sub
  doms.sub = [];
  for (let i = 0; i < mobile.length; i++) {
    from = "general";
    to = "mobelowAboutsub" + String(i);
    contents = mobile[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-dRg",
      fontSize: 13.834,
      color: "#757575"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.sub.push(temp);
  }

  doms.sub[0].top = this.mother.return_bottom(doms.main[doms.main.length - 1]) - 17.8;
  doms.sub[0].left = this.mother.return_center(doms.main[doms.main.length - 1]) - (doms.sub[0].width / 2);

  for (let i = 1; i < mobile.length; i++) {
    doms.sub[i].left = this.mother.return_center(doms.sub[i - 1]) - (doms.sub[i].width / 2);
    doms.sub[i].top = this.mother.return_bottom(doms.sub[i - 1]) - 9.2;
  }
  doms.sub[0].width

  x = this.mother.return_center(doms.sub[doms.sub.length - 1]);
  y = this.mother.return_middle(doms.sub[doms.sub.length - 1]) - 25;
  temp = app.activeDocument.pathItems.roundedRectangle(y, x - 21, 42, 2, 1.5, 1.5);

  temp.fillColor = this.mother.colorpick("#2fa678");
  temp.strokeColor = new NoColor();

  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "mobelowAboutWord");

  //graphic
  let motherLayer;
  let targets = [ "a0", "a1" ];
  for (let j = 0; j < targets.length; j++) {
    for (let i = 0; i < 3; i++) {
      this_ai = app.open(new File(this.etc.targetFile[3]));
      this.mother.deleteWithoutLayer("level" + String(i));
      motherLayer = app.activeDocument.layers.getByName("level" + String(i));
      motherLayer.layers.getByName(targets[1 - j]).remove();
      app.activeDocument.artboards.getByName(targets[1 - j]).remove();
      app.doScript("expandall", "contents_maker");
      if (i === 1) {
        this.saveSvg(this_ai, (j === 0 ? '' : 'mo') + "belowabout" + "_level" + String(i));
      } else {
        this.savePng(this_ai, (j === 0 ? '' : 'mo') + "belowabout" + "_level" + String(i), (j === 0 ? 320 : 240));
      }
    }
  }

}

ExecMain.prototype.belowWord = function () {
  const { belowButton: { words } } = this.text.sub;

  let this_ai, from, to, contents;
  let temp, today;
  today = new Date();

  //main
  for (let i = 0; i < words.length; i++) {
    this_ai = this.createDoc();
    from = "general";
    to = "belowButton" + String(i);
    contents = words[i];
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      fontSize: 22,
      color: "#505050"
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "belowButton" + String(i));
  }

  //copyright
  this_ai = this.createDoc();
  from = "general";
  to = "copyRight";
  contents = "Copyright © " + String(today.getFullYear()) + " HomeLiaison Inc. All rights reserved.";
  this.setCreateSetting({ from: from, to: to, exception: {
    font: "Graphik-Medium",
    fontSize: 22,
    color: "#505050"
  }});
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "copyRight");
}

ExecMain.prototype.start = function (dayString) {
  let list = [ "desktop", "mobile" ];
  this.dayString = dayString;

  this.slideWords();
  this.aboutWords();
  this.bannerWords();
  this.portfolioWords();
  this.belowaboutWords();
  this.belowWord();

}
