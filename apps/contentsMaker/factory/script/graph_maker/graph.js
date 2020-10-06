const GraphCalculation = function () {}

GraphCalculation.getMaxium = function (values) {
  let max, length;
  let tong = [];
  let temp;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].value.add.length; j++) {
      tong.push(values[i].value.add[j]);
    }
    for (let j = 0; j < values[i].value.subtract.length; j++) {
      tong.push(values[i].value.subtract[j]);
    }
  }
  tong.sort((a, b) => { return b - a; });
  max = tong[0];
  length = String(tong[0]).length;
  return { length: length, maxValue: max };
}

GraphCalculation.addAll = function (arr) {
  let number = 0;
  for (let i = 0; i < arr.length; i++) {
    number += arr[i];
  }
  return number;
}

GraphCalculation.extractOption = function (lineObj) {
  const { display } = lineObj;
  const { add, subtract } = display;
  let target;
  for (let i of add) {
    if (/entire/gi.test(i)) {
      target = i;
    }
  }
  for (let i of subtract) {
    if (/entire/gi.test(i)) {
      target = i;
    }
  }

  let tempArr = target.split('-');
  let tempArr2;
  let finalObj = {};
  for (let i of tempArr) {
    tempArr2 = i.split('_');
    if (tempArr2[0] === "ratio" || tempArr2[0] === "fontSize") {
      finalObj[tempArr2[0]] = Number(tempArr2[1]);
    } else {
      finalObj[tempArr2[0]] = tempArr2[1];
    }
  }

  return finalObj;
}

GraphCalculation.eaParsing = function (num, ea) {
  let str, length, result, remainder;
  let pieces = [];
  let finalResult = '';

  //money
  if (ea === '원') {
    str = String(num);
    length = str.length;
    result = Math.floor(length / 3);
    remainder = length % 3;
    pieces.push(str.slice(0, remainder));
    for (let i = 0; i < result; i++) {
      pieces.push(str.slice(remainder + (3 * i), remainder + (3 * (i + 1))));
    }
    finalResult = '';
    for (let i = 0; i < pieces.length; i++) {
      finalResult += pieces[i] + ',';
    }
    finalResult = finalResult.slice(0, -1);
    if (/^,/.test(finalResult)) {
      finalResult = finalResult.slice(1);
    }
    return finalResult + '원';
  } else {
    return String(num);
  }
}

GraphCalculation.graphParsing = function (lineObj) {
  const { columns, ea, display, values } = lineObj;
  let tong = { add: [], subtract: [] };

  const { add, subtract } = display;
  for (let i = 0; i < add.length; i++) {
    if (/^graph\_/.test(add[i])) {
      tong.add.push({ graphNum: Number(add[i].split('-')[0].split('_')[1]), order: i });
    }
  }
  for (let i = 0; i < subtract.length; i++) {
    if (/^graph\_/.test(subtract[i])) {
      tong.subtract.push({ graphNum: Number(subtract[i].split('-')[0].split('_')[1]), order: i });
    }
  }

  tong.add.sort((a, b) => { return b.graphNum - a.graphNum; });
  tong.subtract.sort((a, b) => { return b.graphNum - a.graphNum; });

  let graphsLength, graphsXY, graphsFinal, tempObj;

  if (tong.subtract.length > 0) {
    if (tong.add[0].graphNum >= tong.subtract[0].graphNum) {
      graphsLength = tong.add[0].graphNum + 1;
    } else {
      graphsLength = tong.subtract[0].graphNum + 1;
    }
  } else {
    graphsLength = tong.add[0].graphNum + 1;
  }

  graphsXY = new Array(graphsLength);
  graphsFinal = new Array(graphsLength);

  for (let i = 0; i < graphsLength; i++) {
    graphsXY[i] = {};
    graphsXY[i].add = [];
    for (let j = 0; j < tong.add.length; j++) {
      if (tong.add[j].graphNum === i) {
        graphsXY[i].add.push(tong.add[j].order);
      }
    }
    graphsXY[i].subtract = [];
    for (let j = 0; j < tong.subtract.length; j++) {
      if (tong.subtract[j].graphNum === i) {
        graphsXY[i].subtract.push(tong.subtract[j].order);
      }
    }
  }

  for (let i = 0; i < graphsLength; i++) {
    graphsFinal[i] = { columns: { add: [], subtract: [] }, ea: ea, display: { add: [], subtract: [] }, values: [] };

    graphsXY[i].add.sort((a, b) => { return a - b });
    graphsXY[i].subtract.sort((a, b) => { return a - b });

    for (let j = 0; j < graphsXY[i].add.length; j++) {
      graphsFinal[i].columns.add.push(lineObj.columns.add[graphsXY[i].add[j]]);
      graphsFinal[i].display.add.push(lineObj.display.add[graphsXY[i].add[j]]);
    }
    for (let j = 0; j < graphsXY[i].subtract.length; j++) {
      graphsFinal[i].columns.subtract.push(lineObj.columns.subtract[graphsXY[i].subtract[j]]);
      graphsFinal[i].display.subtract.push(lineObj.display.subtract[graphsXY[i].subtract[j]]);
    }

    for (let j = 0; j < lineObj.values.length; j++) {
      tempObj = { name: lineObj.values[j].name, value: { add: [], subtract: [] } };
      for (let k = 0; k < graphsXY[i].add.length; k++) {
        tempObj.value.add.push(lineObj.values[j].value.add[graphsXY[i].add[k]]);
      }
      for (let k = 0; k < graphsXY[i].subtract.length; k++) {
        tempObj.value.subtract.push(lineObj.values[j].value.subtract[graphsXY[i].subtract[k]]);
      }
      graphsFinal[i].values.push(tempObj);
    }
  }

  return graphsFinal;
}

GraphCalculation.drawGraph = function (instance, lineObj, startPoint, option = { r: 1, fontSize: 22 }) {
  if (option.r === undefined) { option.r = 1; }
  if (option.fontSize === undefined) { option.fontSize = 22; }

  const this_ai = app.activeDocument;
  const list = [ "add", "subtract" ];
  const entireOption = GraphCalculation.extractOption(lineObj);
  const { columns, ea, display, values } = lineObj;

  let number;
  let height, width, margin;
  let fontSize;
  let entireBox, firstBox, lastBox, heightsBox;
  let temp, temp2;
  let tempArr, graphArr, orderArr;
  let rectangle;
  let from, to, contents;
  let lineLength, lines;
  let maxValue_fixed;
  let orders = [];
  let ratio;
  let { length, maxValue } = GraphCalculation.getMaxium(values);
  let clipPath, clipArr = [];
  let tempGroup;

  number = 0;
  width = 50;
  margin = 15;
  fontSize = entireOption.fontSize;
  contents = '';
  ratio = 1 / (entireOption.ratio / (maxValue / (((width + margin) * values.length) - margin)));

  for (let { name, value } of values) {

    //value
    heightsBox = [];
    clipArr = [];

    for (let method of list) {

      for (let j = 0; j < value[method].length; j++) {
        if (display[method][j] !== "hidden") {
          tempArr = display[method][j].split('-');
          graphArr = tempArr[0].split('_');
          orderArr = tempArr[1].split('_');
          height = value[method][j] / ratio;

          if (orderArr[0] === "entire") {

            //entire rectangle
            if (height > 3) {
              rectangle = instance.mother.upRoundRectangle(height, startPoint + ((width + margin) * number), width, height, 3, 3);
            } else if (height >= 0) {
              rectangle = instance.mother.upRoundRectangle(height, startPoint + ((width + margin) * number), width, height, height, height);
            } else if (height >= -3) {
              rectangle = instance.mother.upRoundRectangle(height, startPoint + ((width + margin) * number), width, height, Math.abs(height), Math.abs(height));
            } else {
              rectangle = instance.mother.upRoundRectangle(height, startPoint + ((width + margin) * number), width, height, 3, 3);
            }
            rectangle.fillColor = instance.mother.colorpick(tempArr[2].split('_')[1]);

            clipPath = rectangle.duplicate();
            entireBox = rectangle;

            if (number === 0) {
              firstBox = entireBox;
            } else if (number === values.length - 1) {
              lastBox = rectangle;
            }

          } else if (orderArr[0] === "order") {
            rectangle = this_ai.pathItems.rectangle(height + GraphCalculation.addAll(heightsBox), startPoint + ((width + margin) * number), width, height);

            rectangle.fillColor = instance.mother.colorpick(tempArr[2].split('_')[1]);
            if (number === 0) {
              orders.push({ name: columns[method][j], color: rectangle.fillColor });
            }
            heightsBox.push(height);

          } else {

            //pass

          }
          rectangle.zOrder(ZOrderMethod.SENDTOBACK);
          entireBox.zOrder(ZOrderMethod.SENDTOBACK);
          rectangle.strokeColor = new NoColor();
          clipArr.push(rectangle);
        }
      }
    }

    tempGroup = this_ai.groupItems.add();
    for (let i = 0; i < clipArr.length; i++) {
      clipArr[i].moveToBeginning(tempGroup);
    }
    clipPath.clipping = true;
    clipPath.moveToBeginning(tempGroup);
    tempGroup.clipped = true;

    //name
    contents += name + "\n";
    entireBox.zOrder = ZOrderMethod.SENDTOBACK;
    number++;
  }

  //wording
  from = "general";
  to = "line";
  instance.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-dRg", fontSize: fontSize, justification: "RIGHT", height: 800, leading: (width + margin) } });
  instance.setParagraph({ from: contents, to: to });
  temp = instance.createElements(this_ai, instance.createSetting[to]);
  temp.name = "belowWording";
  temp.convertAreaObjectToPointObject();
  temp2 = instance.mother.itempick("belowWording");
  temp2.rotate(90);
  temp2.left = instance.mother.return_center(firstBox) - (fontSize / 2);
  temp2.top = instance.mother.return_bottom(firstBox) - 25;
  entireBox.zOrder = ZOrderMethod.SENDTOBACK;

  //guide lines
  lineLength = 5;
  contents = '';
  lines = [];

  if (length > 1) {
    if (Number(String(maxValue)[1]) >= 5) {
      maxValue_fixed = (Number(String(maxValue)[0]) + 1) * (10 ** (length - 1));
    } else {
      maxValue_fixed = Number(String(maxValue)[0]) * (10 ** (length - 1));
    }
  } else {
    maxValue_fixed = Math.round(maxValue);
  }

  for (let i = 0; i < lineLength + 1; i++) {
    temp = this_ai.pathItems.add();
    height = (maxValue_fixed * (i / lineLength)) / ratio;
    temp.name = "guideLine" + String(i);
    temp.stroked = true;
    temp.strokeColor = instance.mother.colorpick(entireOption.guide);
    temp.fillColor = new NoColor();
    temp.setEntirePath([ [ firstBox.left, height ], [ instance.mother.return_right(rectangle) + 25, height ] ]);
    lines.push(temp);
    temp.zOrder(ZOrderMethod.SENDTOBACK);
    contents += GraphCalculation.eaParsing(maxValue_fixed * ((lineLength - i) / lineLength), ea) + '\n';
  }

  from = "general";
  to = "line2";
  instance.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-dRg", fontSize: fontSize, justification: "LEFT", leading: ((maxValue_fixed * (1 / lineLength)) / ratio), height: 800 } });
  instance.setParagraph({ from: contents, to: to });
  temp = instance.createElements(this_ai, instance.createSetting[to]);
  temp.name = "rightWording";
  temp.convertAreaObjectToPointObject();

  temp2 = instance.mother.itempick("rightWording");
  temp2.top = lines[lines.length - 1].top + (fontSize / 2) - 2;
  temp2.left = instance.mother.return_right(rectangle) + 25 + 25;

  //ea
  from = "general";
  to = "lineea";
  instance.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm", fontSize: fontSize, justification: "RIGHT" } });
  instance.setParagraph({ from: ("단위 : " + ea), to: to });
  temp = instance.createElements(this_ai, instance.createSetting[to]);
  temp.name = "ea";
  temp.top = 0 + fontSize;
  temp.left = firstBox.left - 25 - temp.width;
  temp.convertAreaObjectToPointObject();

  //order box
  for (let i = 0; i < orders.length; i++) {
    from = "general";
    to = "lineorder" + String(i);
    instance.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-fSm", fontSize: fontSize, justification: "RIGHT" } });
    instance.setParagraph({ from: orders[i].name, to: to });
    temp = instance.createElements(this_ai, instance.createSetting[to]);
    temp.top = 0 + fontSize + ((fontSize + 14) * (i + 1));
    temp.left = firstBox.left - 25 - temp.width;
    temp.name = "order" + String(i);
    temp2 = this_ai.pathItems.roundedRectangle(temp.top - 3, instance.mother.return_left(temp) - (fontSize * (18 / 11)), (fontSize - 6) * (13 / 8), fontSize - 6, 2, 2);
    temp2.strokeColor = new NoColor();
    temp2.fillColor = orders[i].color;
    temp2.name = "orderBox" + String(i);
    temp.convertAreaObjectToPointObject();
  }

  return instance.mother.return_right(instance.mother.itempick("rightWording"));
}

GraphCalculation.drawBar = function (instance, lineObj, startPoint) {
  const mother = instance.mother;
  let temp, tempString, tempArr;
  let number, finalNumber;

  //decorate
  GraphCalculation.drawGraph(instance, lineObj, startPoint);

  mother.allGroup((group, items) => { group.rotate(270); }, true);

  number = 0;
  while (mother.itempick("guideLine" + String(number)) !== null) {
    number++;
  }
  finalNumber = number;

  tempString = mother.itempick("rightWording");
  tempArr = tempString.contents.replace(/[^0-9,a-zA-Z가-힣]/g, '%').split('%');
  tempString.contents = tempArr[0];
  tempString.rotate(90);
  tempString.left = mother.return_center(mother.itempick("guideLine" + String(finalNumber - 1))) - (mother.return_width(tempString) / 2);
  tempString.top = mother.return_bottom(mother.itempick("guideLine0")) - 18;

  for (let i = 0; i < finalNumber - 1; i++) {
    temp = tempString.duplicate();
    temp.contents = tempArr[i + 1];
    temp.left = mother.return_center(mother.itempick("guideLine" + String(finalNumber - 2 - i))) - (mother.return_width(temp) / 2);
  }

  temp = mother.itempick("ea");
  temp.rotate(90);
  temp.left = mother.return_left(mother.itempick("guideLine0")) + 1;
  temp.top = mother.return_top(mother.itempick("guideLine0")) + 19 + mother.return_height(temp);

  number = 0;
  while (mother.itempick("guideLine" + String(number)) !== null) {
    mother.itempick("guideLine" + String(number)).zOrder(ZOrderMethod.SENDTOBACK);
    number++;
  }

}

ExecMain.prototype.lineMaker = function (lineObj) {
  const this_ai = this.createDoc();
  const graphs = GraphCalculation.graphParsing(lineObj);
  let temp, tempArr = [];

  for (let i = 0; i < graphs.length; i++) {
    if (i === 0) {
      temp = GraphCalculation.drawGraph(this, graphs[i], 0, { r: 1, fontSize: 22 });
    } else {
      temp = GraphCalculation.drawGraph(this, graphs[i], tempArr[i - 1] + (300 * i), { r: 0.75, fontSize: 22 });
    }
    tempArr.push(temp);
  }
}

ExecMain.prototype.barMaker = function (lineObj) {
  const this_ai = this.createDoc();
  const graphs = GraphCalculation.graphParsing(lineObj);
  let temp, tempArr = [];

  for (let i = 0; i < graphs.length; i++) {
    if (i === 0) {
      temp = GraphCalculation.drawBar(this, graphs[i], 0);
    } else {
      temp = GraphCalculation.drawBar(this, graphs[i], tempArr[i - 1] + (300 * i));
    }
    tempArr.push(temp);
  }
}

ExecMain.prototype.circleMaker = function (circleObj) {}

ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  const { lines, bar, circles } = this.text;

  for (let i = 0; i < lines.length; i++) {
    this.lineMaker(lines[i]);
  }

  for (let i = 0; i < bar.length; i++) {
    this.barMaker(bar[i]);
  }

  for (let i = 0; i < circles.length; i++) {
    this.circleMaker(circles[i]);
  }

}
