ExecMain.prototype.roomMaker = function (obj, order) {
  const { wording, value } = obj;
  let this_ai, from, to, contents, temp;
  let exception;
  let y;
  let copyItem, outline_group;
  let words, wordsCount, wordsArr;
  let target;

  this_ai = this.createDoc();
  from = "general";
  to = value + String(order);
  contents = wording;
  exception = {
    font: "Futura",
  };
  this.setCreateSetting({ from: from, to: to, exception: exception });
  this.setParagraph({ from: contents, to: to, });
  temp = this.createElements(this_ai, this.createSetting[to]);

  y = this.mother.return_englishBottom(temp) - 5;

  copyItem = temp.duplicate();
  outline_group = copyItem.createOutline();

  words = outline_group.pageItems;
  wordsCount = words.length;
  wordsArr = [];
  for (let i = 0; i < wordsCount; i++) {
    wordsArr.push({ item: words[i], bottom: words[i].top - words[i].height });
  }

  wordsArr.sort(function (a, b) { return a.bottom - b.bottom; });

  target = wordsArr[0].bottom;
  outline_group.remove();

  this.mother.lineMaker([
    [ this.mother.return_left(temp), y ],
    [ this.mother.return_right(temp), y ],
  ], { strokeColor: this.mother.colorpick("#ececec") });

  if (target <= y) {
    this.log("this");
  }

  this_ai.close(SaveOptions.DONOTSAVECHANGES);

}

ExecMain.prototype.roomsMaker = function () {
  const { rooms } = this.text.main;
  for (let i = 0; i < 5; i++) {
    this.roomMaker(rooms[i], i);
  }
}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  this.roomsMaker();
}
