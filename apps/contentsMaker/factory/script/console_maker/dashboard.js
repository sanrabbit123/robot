ExecMain.prototype.titleMaker = function () {
  const { main: { titles: { items } } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let exception;
  let rectangle;

  for (let i of items) {

    //title
    this_ai = this.createDoc();
    from = "general";
    to = "title" + i;
    contents = i;
    exception = {
      font: "Graphik-MediumItalic",
    };
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });
    temp = this.createElements(this_ai, this.createSetting[to]);

    tempObj = this.mother.return_englishMaxMin(temp);
    rectangle = this_ai.pathItems.rectangle(tempObj.max, this.mother.return_left(temp), this.mother.return_width(temp), Math.abs(tempObj.max - tempObj.min));
    rectangle.strokeColor = new NoColor();
    rectangle.fillColor = new NoColor();
    rectangle.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

    //light title
    this_ai = this.createDoc();
    from = "general";
    to = "lightTitle" + i;
    contents = i;
    exception = {
      font: "Graphik-Medium",
    };
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });
    temp = this.createElements(this_ai, this.createSetting[to]);

    tempObj = this.mother.return_englishMaxMin(temp);
    rectangle = this_ai.pathItems.rectangle(tempObj.max, this.mother.return_left(temp), this.mother.return_width(temp), Math.abs(tempObj.max - tempObj.min));
    rectangle.strokeColor = new NoColor();
    rectangle.fillColor = new NoColor();
    rectangle.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);

  }
}

ExecMain.prototype.memberMaker = function () {
  const { main: { members: { names } } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let exception;
  let num = 0;

  for (let i of names) {

    this_ai = this.createDoc();
    from = "general";
    to = "membersName" + String(num);
    contents = i;
    exception = {
      font: "SDGothicNeoa-fSm",
    };
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });
    temp = this.createElements(this_ai, this.createSetting[to]);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
    num++;

  }
}

ExecMain.prototype.onMaker = function () {
  const { sub: { on: { words } } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let exception;
  let rectangle;

  for (let i of words) {
    this_ai = this.createDoc();
    from = "general";
    to = "on" + i;
    contents = i;
    exception = {
      font: "Graphik-Light",
    };
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });
    temp = this.createElements(this_ai, this.createSetting[to]);

    tempObj = this.mother.return_englishMaxMin(temp);
    rectangle = this_ai.pathItems.rectangle(tempObj.max, this.mother.return_left(temp), this.mother.return_width(temp), Math.abs(tempObj.max - tempObj.min));
    rectangle.strokeColor = new NoColor();
    rectangle.fillColor = new NoColor();
    rectangle.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.subTitleMaker = function () {
  const { main: { titles: { items }, subTitles } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let exception;
  let num;

  for (let i of items) {
    if (i !== items[0] && i !== items[1]) {
      num = 0;
      for (let j of subTitles[i.toLowerCase()].items) {
        this_ai = this.createDoc();
        from = "general";
        to = "subTitle" + i + String(num);
        contents = j;
        exception = {
          font: "SDGothicNeoa-bUltLt",
          color: "#303030",
        };
        this.setCreateSetting({ from: from, to: to, exception: exception });
        this.setParagraph({ from: contents, to: to });
        this.createElements(this_ai, this.createSetting[to]);

        this.mother.fit_box();

        app.doScript("expandall", "contents_maker");
        this.saveSvg(this_ai, to);

        num++;
      }
    }
  }
}

ExecMain.prototype.numberMaker = function () {
  let this_ai, from, to, contents, temp, tempObj;
  let exception;

  for (let i = 0; i < 10; i++) {
    this_ai = this.createDoc();
    from = "general";
    to = "number" + String(i);
    contents = String(i);
    exception = {
      font: "Graphik-Light",
      color: "#2fa678",
    };
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to });
    this.createElements(this_ai, this.createSetting[to]);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }
}

ExecMain.prototype.memberWordingMaker = function () {
  const { sub: { memberWording: { words } } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let exception;

  for (let i = 0; i < words.length; i++) {
    this_ai = this.createDoc();
    from = "general";
    to = "memberWording" + String(i);
    contents = words[i];
    exception = {
      font: "Graphik-Light",
    };
    if (i === 2) {
      exception.font = "Graphik-Medium";
      exception.color = "#ffffff";
    }
    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });
    temp = this.createElements(this_ai, this.createSetting[to]);

    tempObj = this.mother.return_englishMaxMin(temp);
    rectangle = this_ai.pathItems.rectangle(tempObj.max, this.mother.return_left(temp), this.mother.return_width(temp), Math.abs(tempObj.max - tempObj.min));
    rectangle.strokeColor = new NoColor();
    rectangle.fillColor = new NoColor();
    rectangle.zOrder(ZOrderMethod.SENDTOBACK);

    this.mother.fit_box();

    app.doScript("expandall", "contents_maker");
    this.saveSvg(this_ai, to);
  }

}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  this.titleMaker();
  this.subTitleMaker();
  this.onMaker();
  this.numberMaker();
  this.memberMaker();
  this.memberWordingMaker();
}
