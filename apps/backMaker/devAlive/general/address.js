const Address = function (rawString) {
  this.raw = this.value = rawString;
}

Address.prototype.toNormal = function () {
  return this.value;
}

module.exports = Address;
