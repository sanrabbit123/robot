class Family {
  constructor(rawString) {
    this.raw = this.value = rawString;
  }

  toNormal() {
    return this.value;
  }
}

module.exports = Family;
