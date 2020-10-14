class Address {
  constructor(rawString) {
    this.raw = this.value = rawString;
  }

  toNormal() {
    return this.value;
  }
}

module.exports = Address;
