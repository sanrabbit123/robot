const CronSource = function (mother, back, address) {
  this.mother = mother;
  this.back = back;
  this.address = address;
  this.dir = process.cwd() + "/apps/cronGhost/cronGhost.js";
}

CronSource.prototype.sourceLoad = async function () {
  const instance = this;
  try {

    


  } catch (e) {
    console.log(e);
  }
}

module.exports = CronSource;
