class Pyeong {
  constructor(rawNumber) {
    this.raw = this.value = Number(rawNumber);
  }

  toNormal() {
    return this.value;
  }

  toMessage() {
    return String(this.value) + "평";
  }

}

module.exports = Pyeong;
