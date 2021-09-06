class Menu extends String {
  constructor(value, items, multiple = false) {
    if (Array.isArray(value)) {
      super('');
    } else {
      super(value);
    }
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
  toNormal() {
    if (this.values === null) {
      return this.value;
    } else {
      return this.values;
    }
  }
}

module.exports = Menu;
