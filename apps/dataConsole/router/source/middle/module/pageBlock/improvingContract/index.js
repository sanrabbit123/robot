const ImprovingContract = function () {
  this.name = "improvingContract";
  this.binaryIndex = [];
  this.ratio = (297 / 210);
  this.length = 9;
}

ImprovingContract.prototype.render = async function (target) {
  const instance = this;
  try {
    const thisPage = {
      binaryIndex: instance.binaryIndex,
      ratio: instance.ratio,
      length: instance.length,
      name: instance.name,
      html: {}
    };
    return thisPage;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ImprovingContract;
