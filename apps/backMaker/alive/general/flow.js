const Flow = function (matrix, position) {
  let tempObj, positionTarget;
  this.flow = [];
  for (let arr of matrix) {
    tempObj = {};
    tempObj.length = arr.length;
    tempObj.values = JSON.parse(JSON.stringify(arr));
    tempObj.position =[];
    for (let i = 0; i < arr.length; i++) {
      positionTarget = null;
      for (let obj of position) {
        if (obj.value === tempObj.values[i]) {
          positionTarget = obj;
          break;
        }
      }
      tempObj.position.push({
        value: tempObj.values[i],
        used: positionTarget === null ? [] : positionTarget.used,
      });
    }
    this.flow.push(tempObj);
  }
}

Flow.prototype.toNormal = function () {
  return this.value;
}

module.exports = Flow;
