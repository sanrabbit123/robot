ExecMain.prototype.roomMaker = function (obj, order) {
  const { wording, value } = obj;
  let this_ai, from, to, contents, temp;
  let exception;
  let y;
  let copyItem, outline_group;
  let words, wordsCount, wordsArr;
  let target, targetDom;
  let targetABC, targetABCIndex;
  let spaceIndex, spaceCount, finalIndex;

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


  // wordsArr = [];
  // for (let i = 0; i < wordsCount; i++) {
  //   spaceCount = 0;
  //   for (let j = 0; j < spaceIndex.length; j++) {
  //     if (spaceIndex[j] < (wordsCount - 1 - i) + j) {
  //       finalIndex = wordsCount - 1 - i + j;
  //     }
  //   }
  //   wordsArr.push({ item: words[i], bottom: words[i].top - words[i].height, letter: wording[finalIndex] });
  // }
  //
  // wordsArr.sort(function (a, b) { return a.bottom - b.bottom; });
  for (var i = 0; i < targetABCIndex.length; i++) {
    this.log(targetABCIndex[i].index)
    this.log(targetABCIndex[i].letter)

  }


  this.mother.lineMaker([
    [ this.mother.return_left(temp), y ],
    [ this.mother.return_right(temp), y ],
  ], { strokeColor: this.mother.colorpick("#ececec") });

  // if (wordsArr[0].bottom <= y) {
  //   this.log(wording);
  //   this.log(wordsArr[0].letter);
  // }

  outline_group.remove();

  // this_ai.close(SaveOptions.DONOTSAVECHANGES);

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
