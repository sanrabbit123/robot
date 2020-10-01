ExecMain.prototype.titleMaker = function () {
  const { main } = this.text;
  let this_ai, from, to, contents, temp;

  for (let i = 0; i < main.length; i++) {
    this_ai = this.createDoc();
    from = "general";
    to = "title" + String(i);
    contents = '<g%' + String(i + 1) + '%g> <b%' + main[i].title + '%b>';
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-cLt",
      bold: "SDGothicNeoa-fSm",
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
      if (main[i].children[j].subtitles !== undefined) {
        for (let k = 0; k < main[i].children[j].subtitles.length; k++) {
          if (main[i].children[j].subtitles[k].mobileLevelUp) {
             if (main[i].children[j].subtitles[k].green) { greenTong.push({ contents: main[i].children[j].subtitles[k].title, xyz: [ i, j, k ], mobile: true }); }
             else { grayTong.push({ contents: main[i].children[j].subtitles[k].title, xyz: [ i, j, k ], mobile: true }); }
             if (main[i].children[j].subtitles[k].mobileException !== undefined) {
               if (main[i].children[j].subtitles[k].green) { greenTong.push({ contents: main[i].children[j].subtitles[k].mobileException.title, xyz: [ i, j, k ], mobile: true }); }
               else { grayTong.push({ contents: main[i].children[j].subtitles[k].mobileException.title, xyz: [ i, j, k ], mobile: true }); }
             }
          }
        }
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

ExecMain.prototype.subTitleMaker = function () {
  const { main } = this.text;
  let tong = [];

  //set data
  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main[i].children.length; j++) {
      if (main[i].children[j].subtitles !== undefined) {
        for (let k = 0; k < main[i].children[j].subtitles.length; k++) {
          tong.push({ contents: main[i].children[j].subtitles[k].title, xyz: [ i, j, k ] });
          if (main[i].children[j].subtitles[k].mobileException !== undefined) {
            tong.push({ contents: main[i].children[j].subtitles[k].mobileException.title, xyz: [ i, j, k ], mobile: true });
          }
        }
      }
    }
  }

  //make
  let this_ai, from, to, contents, temp, asterisk;
  for (let obj of tong) {
    this_ai = this.createDoc();
    from = "general";
    to = "subTitle" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(obj.xyz[2]);
    if (obj.mobile !== undefined) {
      to = "mo" + to;
    }
    contents = obj.contents;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-cLt" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }
}

ExecMain.prototype.buttonCheck = function (arr) {
  let options, this_ai, from, to, contents, temp, temp2, height;
  for (let { contents: text, xyz: [ x, y, z ], flatform, exception } of arr) {

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
  const { main, sub: { survey: { children: subButtons }, terms, submit } } = this.text;
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

  for (let i = 0; i < subButtons.length; i++) {
    for (let j = 0; j < subButtons[i].buttons.length; j++) {
      buttons.desktop[subButtons[i].buttons[j].type.desktop].push({ contents: subButtons[i].buttons[j].title, xyz: [ 9, i, j ], flatform: "desktop", exception: {} });
      buttons.mobile[subButtons[i].buttons[j].type.mobile].push({ contents: subButtons[i].buttons[j].title, xyz: [ 9, i, j ], flatform: "mobile", exception: {} });
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
    this_ai = this.createDoc();
    from = "general";
    to = "notice" + String(obj.xyz[0]) + String(obj.xyz[1]) + String(obj.xyz[2]);
    if (obj.mobile !== undefined) {
      to = "mo" + to;
    }
    contents = "*" + obj.contents;
    this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#2fa678" } });
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    this.mother.fit_box();
    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.surveyMaker = function () {
  const { sub: { survey } } = this.text;
  const { title, children: [ obj ] } = survey;
  const { title: question } = obj;

  let this_ai, from, to, contents, temp;

  //title
  this_ai = this.createDoc();
  from = "general";
  to = "surveyTitle";
  contents = title;
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm", color: "#2fa678" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

  //question
  this_ai = this.createDoc();
  from = "general";
  to = "surveyQuestion";
  contents = "Q. " + question;
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#5e5e5e" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

}

ExecMain.prototype.pendingMaker = function () {
  const { sub: { etc: { pending: { title: text } } } } = this.text;
  let this_ai, from, to, contents, temp;
  this_ai = this.createDoc();
  from = "general";
  to = "pending";
  contents = text;
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-gBd", color: "#5f5f5f" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);
}

ExecMain.prototype.arrowMaker = function () {
  let this_ai = this.createDoc();
  this.mother.return_arrow();
  app.doScript("expandall", "contents_maker");
  this.mother.fit_box();
  this.saveSvg(this_ai, "arrow");
}

ExecMain.prototype.thankyouMain = function (obj) {
  const instance = this;
  const { title, contents: text, order, flatform, thankyouFixedWidth } = obj;
  let this_ai, from, to, contents, temp, doms;

  from = "general";

  if (flatform === "desktop") {
    to = "thankyouMain_desktop" + String(order);
    this_ai = this.createDoc();
    doms = {
      number: {},
      title: {},
      contents: {},
      white: {},
    }

    //number
    to = to + "number";
    contents = String(order + 1);
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "Graphik-Light",
      color: "#2fa678",
      fontSize: 88,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.number = temp;

    //title
    to = to + "title";
    contents = title;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      color: "#5f5f5f",
      fontSize: 32,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.title = temp;

    //contents
    to = to + "contents";
    contents = text.replace(/<%check%>/g, '      ');
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-dRg",
      color: "#5f5f5f",
      fontSize: 20,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.contents = temp;

    //position
    {
      const { number, title, contents, white } = doms;
      let checkBox, checkBoxPosition = [ 261, 498 ], resizeRatio;

      contents.top = instance.mother.return_bottom(title) - 18;
      contents.left = title.left + 1;

      resizeRatio = Math.abs(title.top - instance.mother.return_bottom(contents)) / number.height;
      number.resize(resizeRatio * 96, resizeRatio * 96);
      number.left = contents.left - 30 - number.width;
      number.top = title.top - (resizeRatio * 1.5);

      if (/<%check%>/.test(text)) {
        checkBox = this.mother.return_checkBox({ height: contents.height * 0.42 });
        checkBox.top = contents.top - (contents.height * 0.07);
        checkBox.left = contents.left + checkBoxPosition[0];
        checkBox = this.mother.return_checkBox({ height: contents.height * 0.42 });
        checkBox.top = contents.top - (contents.height * 0.07);
        checkBox.left = contents.left + checkBoxPosition[1];
      }

    }

    //white box
    let white, width, height;
    width = thankyouFixedWidth.desktop;
    height = 342.8531916320236;
    white = this_ai.pathItems.rectangle(doms.title.top, doms.number.left, width, height);
    white.strokeColor = new NoColor();
    white.fillColor = this.mother.colorpick("#ffffff");

    //example
    to = to + "contents";
    contents = "< 예시 >";
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-eMd",
      color: "#2fa678",
      fontSize: 20,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    temp.top = doms.contents.top;
    temp.left = this.mother.return_right(white) - temp.width;

    white.remove();
    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "thankyou_desktop_" + String(order));

  //mobile
  } else {

    to = "thankyouMain_mobile" + String(order);
    this_ai = this.createDoc();
    doms = {
      number: {},
      title: {},
      contents: [],
      white: {}
    }

    //number
    to = to + "number";
    contents = String(order + 1);
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "Graphik-Light",
      color: "#2fa678",
      fontSize: 16,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.number = temp;

    //title
    to = to + "title";
    contents = title;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      color: "#5f5f5f",
      fontSize: 24,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.title = temp;

    //contents
    for (let i = 0; i < text.length; i++) {
      to = to + "contents" + String(i);
      contents = text[i].replace(/<%check%>/g, '');
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-dRg",
        color: "#5f5f5f",
        fontSize: 14.2,
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.contents.push(temp);
    }

    //white box
    let white, width;
    width = thankyouFixedWidth.mobile;
    white = this_ai.pathItems.rectangle(0, 0, width, 100);
    white.strokeColor = new NoColor();
    white.fillColor = new NoColor();
    white.zOrder(ZOrderMethod.SENDTOBACK);
    doms.white = white;

    //position
    {
      const { number, title, contents, white } = doms;
      let resizeRatio;

      for (let i = 1; i < contents.length; i++) {
        contents[i].top = instance.mother.return_bottom(contents[i - 1]) - 11;
        contents[i].left = contents[i - 1].left;
      }

      white.height = Math.abs(instance.mother.return_bottom(contents[contents.length - 1]) - contents[0].top);
      white.top = contents[0].top;

      resizeRatio = title.height / number.height;
      number.resize(resizeRatio * 90, resizeRatio * 90);
      number.left = white.left;
      number.top = contents[0].top - 1.5;

      title.top = contents[0].top;
      title.left = instance.mother.return_right(number) + 11;

      //max right
      let selectedNum, rights = [];
      for (let i = 0; i < contents.length; i++) {
        rights.push({ dom: instance.mother.return_right(contents[i]), order: i });
      }
      rights.sort((a, b) => { return b.dom - a.dom; });
      selectedNum = rights[0].order;

      contents[selectedNum].left = instance.mother.return_right(white) - contents[selectedNum].width;
      for (let i = 0; i < contents.length; i++) {
        contents[i].left = contents[selectedNum].left;
      }
    }

    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "thankyou_mobile_" + String(order));

  }
}

ExecMain.prototype.thankyouWhiteTitle = function (obj) {
  const instance = this;
  const { title, contents: text, flatform, thankyouFixedWidth } = obj;
  let this_ai, from, to, contents, temp, doms;

  from = "general";

  if (flatform === "desktop") {
    this_ai = app.open(new File(this.etc.targetFile[0]));
    doms = {
      title: {},
      contents: [],
      qr: {},
      white: {},
    };
    doms.qr = this_ai.pageItems.getByName("qr");

    //title
    to = "thankyouWhiteTitle_desktop";
    contents = title;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      color: "#5f5f5f",
      fontSize: 33,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.title = temp;

    //contents
    for (let i = 0; i < text.length; i++) {
      to = "thankyouWhiteTitle_desktop_contents" + String(i);
      contents = text[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-dRg",
        color: "#5f5f5f",
        fontSize: 15,
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.contents.push(temp);
    }

    //white
    let white, width;
    width = thankyouFixedWidth.desktop;
    white = this_ai.pathItems.rectangle(0, 0, (width * 0.705255504712162), 100);
    white.strokeColor = new NoColor();
    white.fillColor = new NoColor();
    white.zOrder(ZOrderMethod.SENDTOBACK);
    doms.white = white;

    //position
    {
      const { title, contents, qr, white } = doms;
      let resizeRatio;

      for (let i = 1; i < contents.length; i++) {
        contents[i].left = contents[i - 1].left;
        contents[i].top = instance.mother.return_bottom(contents[i - 1]) - 12;
      }

      title.left = contents[0].left;
      title.top = contents[0].top + 65;

      white.left = contents[0].left;
      white.top = title.top;
      white.height = Math.abs(instance.mother.return_bottom(contents[contents.length - 1]) - title.top);

      resizeRatio = white.height / qr.height;

      qr.resize(resizeRatio * 101, resizeRatio * 101);
      qr.left = instance.mother.return_right(white) - qr.width;
      qr.top = title.top + resizeRatio;

    }

    //save
    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "thankyouWhiteTitle_desktop");

  } else {

    this_ai = this.createDoc();
    doms = {
      title: {},
      contents: [],
      white: {},
    };

    //title
    to = "thankyouWhiteTitle_mobile";
    contents = title;
    this.setCreateSetting({ from: from, to: to, exception: {
      font: "SDGothicNeoa-fSm",
      color: "#5f5f5f",
      fontSize: 24,
    }});
    this.setParagraph({ from: contents, to: to });
    temp = this.createElements(this_ai, this.createSetting[to]);
    temp = temp.createOutline();
    doms.title = temp;

    //contents
    for (let i = 0; i < text.length; i++) {
      to = "thankyouWhiteTitle_mobile_contents" + String(i);
      contents = text[i];
      this.setCreateSetting({ from: from, to: to, exception: {
        font: "SDGothicNeoa-cLt",
        color: "#5f5f5f",
        fontSize: 14.2,
      }});
      this.setParagraph({ from: contents, to: to });
      temp = this.createElements(this_ai, this.createSetting[to]);
      temp = temp.createOutline();
      doms.contents.push(temp);
    }

    //white
    let white, width;
    width = thankyouFixedWidth.mobile;
    white = this_ai.pathItems.rectangle(0, 0, width, 100);
    white.strokeColor = new NoColor();
    white.fillColor = new NoColor();
    white.zOrder(ZOrderMethod.SENDTOBACK);
    doms.white = white;

    //position
    {
      const { title, contents, white } = doms;

      //contents
      for (let i = 1; i < contents.length; i++) {
        contents[i].left = contents[i - 1].left;
        contents[i].top = instance.mother.return_bottom(contents[i - 1]) - 11;
      }

      //title
      title.left = contents[0].left;
      title.top = contents[0].top + 50;

      //white box
      white.left = contents[0].left;
      white.top = title.top;
      white.height = Math.abs(instance.mother.return_bottom(contents[contents.length - 1]) - title.top);

      //right
      let rights = [], selectedNum;
      for (let i = 0; i < contents.length; i++) {
        rights.push({ dom: instance.mother.return_right(contents[i]), order: i });
      }
      rights.sort((a, b) => { return b.dom - a.dom; });
      selectedNum = rights[0].order;
      contents[selectedNum].left = instance.mother.return_right(white) - contents[selectedNum].width;
      for (let i = 0; i < contents.length; i++) {
        contents[i].left = contents[selectedNum].left;
      }

      let line;

      line = this_ai.pathItems.add();
      line.stroked = true;
      line.setEntirePath([[ white.left, this.mother.return_middle(contents[0]) + 0.5 ], [ contents[0].left - 8, this.mother.return_middle(contents[0]) + 0.5 ]]);
      line.fillColor = new NoColor();
      line.strokeColor = this.mother.colorpick("#2fa678");
      line.strokeWidth = 0.75;

      line = this_ai.pathItems.add();
      line.stroked = true;
      line.setEntirePath([[ (contents[0].left - 8) - 4, this.mother.return_middle(contents[0]) + 0.5 - 4 ], [ contents[0].left - 8, this.mother.return_middle(contents[0]) + 0.5 ], [ (contents[0].left - 8) - 4, this.mother.return_middle(contents[0]) + 0.5 + 4 ]]);
      line.fillColor = new NoColor();
      line.strokeColor = this.mother.colorpick("#2fa678");
      line.strokeWidth = 0.75;

    }

    //save
    app.doScript("expandall", "contents_maker");
    this.mother.fit_box();
    this.saveSvg(this_ai, "thankyouWhiteTitle_mobile");

  }
}

ExecMain.prototype.thankyouFileSend = function (obj) {
  let this_ai, from, to, contents, temp, asterisk;
  const { factorTitle, white } = obj;

  from = "general";

  //factor title
  this_ai = this.createDoc();
  to = "thankyouFileSend_title";
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
    to = "thankyouFileSend_white_" + String(i);
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

ExecMain.prototype.thankyouClickWording = function (obj) {
  let this_ai, from, to, contents, temp;

  this_ai = this.createDoc();
  from = "general";
  to = "thankyouClickWording_desktop";
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
  to = "thankyouClickWording_mobile";
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

ExecMain.prototype.thankyouComplete = function (obj) {
  let this_ai, from, to, contents, temp;
  let contentsArr, doms = [];

  //desktop
  this_ai = this.createDoc();
  from = "general";
  to = "thankyouComplete_desktop";
  contents = obj.title.replace(/,/g, '');
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-gBd", color: "#5f5f5f" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, to);

  //mobile
  contentsArr = obj.title.split(', ');

  this_ai = this.createDoc();
  from = "general";

  to = "thankyouComplete_mobile_" + String(0);
  contents = contentsArr[0];
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-gBd", color: "#5f5f5f" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  to = "thankyouComplete_mobile_" + String(1);
  contents = contentsArr[1];
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-gBd", color: "#5f5f5f" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]);
  temp = temp.createOutline();
  doms.push(temp);

  doms[1].left = this.mother.return_center(doms[0]) - (doms[1].width / 2);
  doms[1].top = this.mother.return_bottom(doms[0]) - 10;

  this.mother.fit_box();
  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "thankyouComplete_mobile");
}

ExecMain.prototype.thankyouMaker = function () {
  const { sub: { thankyou } } = this.text;
  const { main, sub } = thankyou;
  const thankyouFixedWidth = {
    desktop: 1290,
    mobile: 337.6230944106491,
  };
  let tong = {
    desktop: [],
    mobile: [],
  };
  let addedContents, temp;
  let options;

  //set data
  for (let i = 0; i < main.length; i++) {
    //desktop
    options = { title: main[i].title, contents: main[i].contents.desktop[0], order: i };
    if (main[i].subtitles !== undefined) { options.subtitles = main[i].subtitles; }
    tong.desktop.push(options);
    //mobile
    options = { title: main[i].title, contents: main[i].contents.mobile, order: i };
    if (main[i].subtitles !== undefined) { options.subtitles = main[i].subtitles; }
    tong.mobile.push(options);
  }

  //thankyou main
  const { desktop, mobile } = tong;

  for (let obj of desktop) {
    options = { title: obj.title, contents: obj.contents, order: obj.order, flatform: "desktop", thankyouFixedWidth: thankyouFixedWidth };
    if (obj.subtitles !== undefined) { options.subtitles = obj.subtitles; }
    this.thankyouMain(options);
  }

  for (let obj of mobile) {
    options = { title: obj.title, contents: obj.contents, order: obj.order, flatform: "mobile", thankyouFixedWidth: thankyouFixedWidth };
    if (obj.subtitles !== undefined) { options.subtitles = obj.subtitles; }
    this.thankyouMain(options);
  }

  //thankyou sub
  const { whiteTitle, etc: { clickWording, fileSend, complete } } = sub;

  // white title
  this.thankyouWhiteTitle({ title: whiteTitle.title, contents: whiteTitle.contents.desktop, flatform: "desktop", thankyouFixedWidth: thankyouFixedWidth });
  this.thankyouWhiteTitle({ title: whiteTitle.title, contents: whiteTitle.contents.mobile, flatform: "mobile", thankyouFixedWidth: thankyouFixedWidth });

  //fileSend
  this.thankyouFileSend(fileSend);

  //clickWording
  this.thankyouClickWording(clickWording);

  //complete
  this.thankyouComplete(complete);

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

  if (obj.name === "consulting") {
    obj.text.unshift("Consulting");
  } else {
    obj.text.unshift("Complete");
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

  if (obj.name === "consulting") {
    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title), (title_bottom - 2.2)], [this.mother.return_right(title) - 6, (title_bottom - 2.2)]]);
    line.fillColor = new NoColor();
    line.strokeColor = this.mother.colorpick("#ffffff");
    line.strokeWidth = 0.5;
  } else {
    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title), (title_bottom - 2.2)], [this.mother.return_left(title) + 22.3, (title_bottom - 2.2)]]);
    line.fillColor = new NoColor();
    line.strokeColor = this.mother.colorpick("#ffffff");
    line.strokeWidth = 0.5;

    line = this_ai.pathItems.add();
    line.stroked = true;
    line.setEntirePath([[this.mother.return_left(title) + 25.3, (title_bottom - 2.2)], [this.mother.return_right(title), (title_bottom - 2.2)]]);
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
  const { title: consultingTitle, thankyou: { sub: { title: thankyouTitle } } } = sub;
  const list = [ "desktop", "mobile" ];
  for (let i of list) {
    this.generalTitle({ list: i, text: consultingTitle[i].words.contents, name: "consulting" });
    this.generalTitle({ list: i, text: thankyouTitle[i].words.contents, name: "thankyou" });
  }
}

ExecMain.prototype.start = function (dayString) {
  let list = [ "desktop", "mobile" ];
  this.dayString = dayString;

  this.titleMaker();
  this.factorTitleMaker();
  this.subTitleMaker();
  this.buttonMaker();
  this.noticeMaker();
  this.surveyMaker();
  this.pendingMaker();
  this.arrowMaker();
  this.whiteTitle();
  this.thankyouMaker();

}
