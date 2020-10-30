const Pyeong = function (rawNumber) {
  this.raw = this.value = Number(rawNumber);
}

Pyeong.prototype.toNormal = function () {
  return this.value;
}

Pyeong.prototype.toMessage = function () {
  return String(this.value) + "평";
}

module.exports = Pyeong;
