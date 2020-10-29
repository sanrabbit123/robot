ExecMain.prototype.generalBelow = function (obj) {
  const mother = this.mother;
  let this_ai, from, to, contents, temp;

  //create doc
  let upDom = [];
  let downDom = [];
  if (obj.text.length > 0) { this_ai = this.createDoc(); }
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

ExecMain.prototype.roomMaker = function (obj) {
  const { wording, value } = obj;
  let this_ai, from, to, contents, temp;
  let exception;
  let x, xTemp, y;
  let copyItem, outline_group;
  let words, wordsCount, wordsArr;
  let target, targetDom;
  let targetABC, targetABCIndex;
  let spaceIndex, spaceCount, finalIndex;
  let lines, lineOption;
  let maxMinObj, newRec;

  this_ai = this.createDoc();
  from = "general";
  to = value;
  contents = wording;
  exception = {
    font: "futura",
  };
  this.setCreateSetting({ from: from, to: to, exception: exception });
  this.setParagraph({ from: contents, to: to, });
  temp = this.createElements(this_ai, this.createSetting[to]);

  y = this.mother.return_englishBottom(temp) - 4;

  copyItem = temp.duplicate();
  outline_group = copyItem.createOutline();

  words = outline_group.pageItems;
  wordsCount = words.length;

  targetABC = [ "g", "j", "p", "q", "y" ];
  targetABCIndex = [];

  for (let i = 0; i < wording.length; i++) {
    for (let j = 0; j < targetABC.length; j++) {
      if (wording[i] === targetABC[j]) {
        targetABCIndex.push({ index: i, letter: targetABC[j] });
      }
    }
  }

  spaceIndex = [];
  for (let i = 0; i < wording.length; i++) {
    if (wording[i] === ' ') {
      spaceIndex.push(i);
    }
  }

  graphicIndex = [];
  for (let i = 0; i < wording.length; i++) {
    if (wording[wording.length - 1 - i] !== ' ') {
      graphicIndex.push(wording[wording.length - 1 - i]);
    }
  }

  wordsArr = [];
  for (let i = 0; i < wordsCount; i++) {
    wordsArr.push({ item: words[i], bottom: words[i].top - words[i].height, letter: graphicIndex[i] });
  }


  x = [];
  xTemp = [];
  for (let i of wordsArr) {
    if (i.bottom < y) {
      xTemp = this.mother.abcFilter("futura", i.letter, i.item.left, i.item.width);
      for (let j = 0; j < xTemp.length; j++) {
        x.unshift(xTemp[xTemp.length - j - 1]);
      }
    }
  }

  lineOption = { strokeColor: this.mother.colorpick("#ececec"), strokeWidth: 1 };
  if (x.length > 0) {

    lines = [];
    lines.push([ this.mother.return_left(temp), y ]);
    lines.push([ x.shift(), y ]);
    this.mother.lineMaker(lines, lineOption);

    while (x.length !== 1) {
      lines = [];
      lines.push([ x.shift(), y ]);
      lines.push([ x.shift(), y ]);
      this.mother.lineMaker(lines, lineOption);
    }

    lines = [];
    lines.push([ x.pop(), y ]);
    lines.push([ this.mother.return_right(temp), y ]);
    this.mother.lineMaker(lines, lineOption);

  } else {
    this.mother.lineMaker([
      [ this.mother.return_left(temp), y ],
      [ this.mother.return_right(temp), y ],
    ], lineOption);
  }

  outline_group.remove();

  maxMinObj = this.mother.return_englishMaxMin(temp);
  newRec = this_ai.pathItems.rectangle(maxMinObj.max, this.mother.return_left(temp) - 0.5, this.mother.return_width(temp) + 1, Math.abs(maxMinObj.max - maxMinObj.min));

  newRec.strokeColor = new NoColor();
  newRec.fillColor = this.mother.colorpick("#ffffff");
  newRec.zOrder(ZOrderMethod.SENDTOBACK);

  this.mother.fit_box();

  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "room_" + to);
}

ExecMain.prototype.roomsMaker = function () {
  const { rooms } = this.text.main;
  for (let i = 0; i < rooms.length; i++) {
    this.roomMaker(rooms[i]);
  }
}

ExecMain.prototype.reviewMaker = function () {
  const { review: { wording } } = this.text.main;
  let this_ai, from, to, contents, temp;

  this_ai = this.createDoc();
  from = "general";
  to = "review";
  contents = wording;
  exception = {
    font: "futura",
  };
  this.setCreateSetting({ from: from, to: to, exception: exception });
  this.setParagraph({ from: contents, to: to, });
  this.createElements(this_ai, this.createSetting[to]);

  this.mother.fit_box();

  app.doScript("expandall", "contents_maker");
  this.saveSvg(this_ai, "reviewMark");

}

ExecMain.prototype.start = function (dayString) {
  const list = [ "desktop", "mobile" ];
  let temp;

  this.dayString = dayString;
  this.roomsMaker();
  this.reviewMaker();

  // general make
  const { sub } = this.text;
  for (let d of list) {
    temp = {};
    temp.text = sub.below[d].words.contents;
    temp.list = d;
    this.generalBelow(temp);
  }

}
