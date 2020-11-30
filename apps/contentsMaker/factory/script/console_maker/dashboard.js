ExecMain.prototype.titleMaker = function () {
  const { main: { titles: { items } } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;

  for (let i of items) {
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
  }

}


ExecMain.prototype.subTitleMaker = function () {
  const { main: { titles: { items }, subTitles } } = this.text;
  let this_ai, from, to, contents, temp, tempObj;
  let num;

  for (let i of items) {
    if (i !== "Calendar" && i !== "Navigation") {
      num = 0;
      for (let j of subTitles[i.toLowerCase()].items) {
        this_ai = this.createDoc();
        from = "general";
        to = "subTitle" + i + String(num);
        contents = j;
        exception = {
          font: "SDGothicNeoa-bUltLt",
          color: "#2fa678",
        };
        this.setCreateSetting({ from: from, to: to, exception: exception });
        this.setParagraph({ from: contents, to: to, });
        this.createElements(this_ai, this.createSetting[to]);

        this.mother.fit_box();

        app.doScript("expandall", "contents_maker");
        this.saveSvg(this_ai, to);

        num++;
      }
    }
  }
}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  this.titleMaker();
  this.subTitleMaker();
}
