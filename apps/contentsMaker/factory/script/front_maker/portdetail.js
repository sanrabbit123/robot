ExecMain.prototype.roomMaker = function (obj, order) {
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

  this_ai = this.createDoc();
  from = "general";
  to = value + String(order);
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

  lineOption = { strokeColor: this.mother.colorpick("#ececec") };
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

  // this_ai.close(SaveOptions.DONOTSAVECHANGES);

}

ExecMain.prototype.roomsMaker = function () {
  const { rooms } = this.text.main;
  for (let i = 0; i < rooms.length; i++) {
    this.roomMaker(rooms[i], i);
  }
}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  this.roomsMaker();
}
