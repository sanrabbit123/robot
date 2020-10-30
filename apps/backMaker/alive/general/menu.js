const Menu = function (value, items, multiple = false) {
  this.value = null;
  this.values = null;
  this.items = items;
  let temp;
  if (!multiple) {
    if (items.includes(value)) {
      this.value = value;
    } else {
      this.value = "알 수 없음";
    }
  } else {
    temp = [];
    for (let i of value) {
      if (items.includes(i)) {
        temp.push(i);
      }
    }
    this.values = temp;
  }
}

Menu.prototype.toNormal = function () {
  if (this.values === null) {
    return this.value;
  } else {
    return this.values;
  }
}

module.exports = Menu;
