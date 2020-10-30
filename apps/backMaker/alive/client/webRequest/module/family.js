const Family = function (rawString) {
  this.raw = this.value = rawString;
}

Family.prototype.toNormal = function () {
  return this.value;
}

module.exports = Family;
