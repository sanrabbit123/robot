ExecMain.prototype.filter = function (str) {
  let filtered;
  filtered = str.replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '');
  filtered = filtered.replace(/^\n/, '');
  filtered = filtered.replace(/\n$/, '');
  filtered = filtered.replace(/\n\n/g, '\n');
  filtered = filtered.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z\)\(\.\,\?\!\/\'\"\;\:\@\#\$\%\&\*\-\_\+\=\n\t ]/g, '');
  filtered = filtered.replace(/^ /g, '');
  filtered = filtered.replace(/ $/g, '');
  filtered = filtered.replace(/  /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/      /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/  /g, ' ');
  return filtered;
}

ExecMain.prototype.returnTargetTong = function (arr) {
  let target;
  let targetTong;

  target = [];
  for (let obj of arr) {
    if (obj.title_plaintext !== undefined && obj.title_plaintext !== '') {
      targetTong = {};
      targetTong.title_plaintext = this.filter(obj.title_plaintext);
      if (obj.children !== undefined) {
        targetTong.children = this.returnTargetTong(obj.children);
      }
      target.push(targetTong);
    }
  }
  return target;
}

ExecMain.prototype.spreadArr = function (arr, depth, name, title) {
  let from, to, contents, exception;
  let temp;
  let titleObj;
  let circle;
  let ratio;
  let fontSize;
  let num = 0;

  fontSize = 15;
  ratio = 2.3;

  if (depth === 0) {
    this.setCreateSetting({ from: "general", to: name + "title", exception: {
        font: "SDGothicNeoa-gBd",
        fontSize: (fontSize * 1.5),
        color: "#404040",
        justification: "LEFT",
        width: 135,
      }
    });
    this.setParagraph({ from: title, to: name + "title", });

    titleObj = this.createElements(this.this_ai, this.createSetting[name + "title"]);
    titleObj.top = this.globalBottom;
    titleObj.left = this.globalLeft - ((ratio * 2) + 4);

    this.globalBottom = this.mother.return_bottom(titleObj) - 9;
  }

  for (let obj of arr) {
    from = "general";
    to = name + String(num);
    contents = obj.title_plaintext;
    exception = {
      font: ((depth === 0) ? "SDGothicNeoa-fSm" : "SDGothicNeoa-cLt"),
      fontSize: fontSize,
      leading: 30,
      color: "#404040",
      justification: "LEFT",
      width: 125,
    };

    this.setCreateSetting({ from: from, to: to, exception: exception });
    this.setParagraph({ from: contents, to: to, });

    temp = this.createElements(this.this_ai, this.createSetting[to]);
    temp.top = this.globalBottom - 17;
    temp.left = this.globalLeft + (30 * depth);

    if (depth === 0) {
      circle = app.activeDocument.pathItems.ellipse(temp.top - (fontSize / 2) + ratio + 0.5, temp.left - ((ratio * 2) + 5), (ratio * 2), (ratio * 2));
      circle.fillColor = this.mother.colorpick("#2fa678");
      circle.strokeColor = new NoColor();
    }

    this.globalBottom = this.mother.return_bottom(temp);
    if (obj.children !== undefined) {
      this.spreadArr(obj.children, (depth + 1), name, "noTitle");
    }
    num++;
  }
}

ExecMain.prototype.historyParsing = function () {
  const { detailStory } = this.text;
  const this_ai = this.this_ai;
  const targets = [
    detailStory["history"],
    detailStory["space"],
    detailStory["construct"],
    detailStory["styling"],
    detailStory["budget"],
    detailStory["progress"]
  ];
  const nameAndTitles = [
    { name: "history", title: "HISTORY" },
    { name: "space", title: "현장 관련" },
    { name: "construct", title: "시공 관련" },
    { name: "styling", title: "스타일링 관련" },
    { name: "budget", title: "예산 관련" },
    { name: "progress", title: "진행 현황" }
  ]

  this.globalBottom = 0;
  this.globalLeft = 0;

  for (let i = 0; i < targets.length; i++) {
    this.globalBottom = 0;
    this.globalLeft = 480 * i;
    this.spreadArr(this.returnTargetTong(targets[i]), 0, nameAndTitles[i].name, nameAndTitles[i].title);
  }
}

ExecMain.prototype.whiteBase = function () {
  const instance = this;
  let allItems;
  let maxValue;
  let tops;
  let bottoms;
  let tempNum;
  let margin;
  let target;
  let resultRectArr;

  allItems = app.activeDocument.pageItems;
  maxValue = {
    top: 0,
    left: 1000000,
    right: -1000000,
    height: 0,
  };
  tops = [];
  bottoms = [];
  margin = 120;

  for (let i = 0; i < allItems.length; i++) {
    tops.push(allItems[i]);
    bottoms.push(allItems[i]);
    tempNum = this.mother.return_left(allItems[i]);
    if (tempNum < maxValue.left) { maxValue.left = tempNum; }
    tempNum = this.mother.return_right(allItems[i]);
    if (tempNum > maxValue.right) { maxValue.right = tempNum; }
  }

  tops.sort(function (a, b) {
    return instance.mother.return_top(b) - instance.mother.return_top(a);
  });
  bottoms.sort(function (a, b) {
    return instance.mother.return_bottom(b) - instance.mother.return_bottom(a);
  });

  maxValue.top = this.mother.return_top(tops[0]);
  maxValue.height = this.mother.return_bottom(bottoms[bottoms.length - 1]) - this.mother.return_top(tops[0]);

  target = app.activeDocument.artboards[0];
  resultRectArr = [ maxValue.left - margin, maxValue.top + (margin * (9 / 12)), maxValue.right + margin, maxValue.top + maxValue.height - (margin * (11 / 12)) ];
  app.activeDocument.artboards.add(resultRectArr);
  target.remove();
}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  this.this_ai = this.createDoc();
  this.historyParsing();
  this.whiteBase();
  // app.doScript("expandall", "contents_maker");
  // this.saveSvg(this.this_ai, "card_" + this.text.cliid);
}
