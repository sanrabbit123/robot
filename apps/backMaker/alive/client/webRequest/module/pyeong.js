class Pyeong {
  constructor(rawNumber) {
    this.raw = this.value = Number(rawNumber);
  }

  toNormal() {
    return this.value;
  }
}

module.exports = Pyeong;
