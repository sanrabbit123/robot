ExecMain.prototype.roomMaker = function (obj) {
  const { wording, value } = obj;
  let this_ai, from, to, contents, temp;
  let exception;
  let y;
  let copyItem, outline_group;
  let words, wordsCount, wordsArr;

  this_ai = this.createDoc();
  from = "general";
  to = value;
  contents = wording;
  exception = {
    font: "Futura-Medium",
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

  this.mother.lineMaker([
    [ this.mother.return_left(temp), y ],
    [ this.mother.return_right(temp), y ],
  ], { strokeColor: this.mother.colorpick("#ececec") });

  // if (wordsArr[0].bottom <= y) {
  //   uragen.log(wordsArr[0].item);
  // }

}

ExecMain.prototype.roomsMaker = function () {
  const { rooms } = this.text.main;
  let wording, value;

  // for (let i = 0; i < rooms.length; i++) {
  for (let i = 0; i < 5; i++) {
    wording = rooms[i].wording;
    value = rooms[i].value;
    this.roomMaker({ wording: wording, value: value });
  }
}

ExecMain.prototype.start = function (dayString) {
  const list = [ "desktop", "mobile" ];
  let temp;
  this.dayString = dayString;

  this.roomsMaker();

}
