const CalculationRatio = new Function();

CalculationRatio.getMaxium = function (values) {
  let tong = [];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].value.add.length; j++) {
      tong.push(values[i].value.add[j]);
    }
    for (let j = 0; j < values[i].value.subtract.length; j++) {
      tong.push(values[i].value.subtract[j]);
    }
  }

  tong.sort((a, b) => { return b - a; });

  return { length: String(tong[0]).length, value: tong[0] };
}


ExecMain.prototype.lineMaker = function (lineObj) {
  let this_ai, number;
  const { columns, ea, values } = lineObj;

  this_ai = this.createDoc();

  let ratio = 5;
  let { length } = CalculationRatio.getMaxium(values);
  if (length > 5) {
    for (let i = 0; i < length.length - 5; i++) {
      ratio = ratio * 10;
    }
  } else {
    for (let i = 0; i < 5 - length.length; i++) {
      ratio = ratio / 10;
    }
  }

  number = 0;

  for (let { name, value } of values) {
    for (let j = 0; j < value.add.length; j++) {
      this_ai.pathItems.rectangle(100 * j, 55 * number, 50, (value.add[j] / ratio));
    }
    for (let j = 0; j < value.subtract.length; j++) {
      this_ai.pathItems.rectangle(-1 * 100 * (j + 1), 55 * number, 50, (value.subtract[j] / ratio));
    }
    number++;
  }

}


ExecMain.prototype.circleMaker = function (circleObj) {}


ExecMain.prototype.start = function (dayString) {
  this.dayString = dayString;
  const { lines, circles } = this.text;

  for (let i = 0; i < lines.length; i++) {
    this.lineMaker(lines[i]);
  }

  for (let i = 0; i < circles.length; i++) {
    this.circleMaker(circles[i]);
  }

}
