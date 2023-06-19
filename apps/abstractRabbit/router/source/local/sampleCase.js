const SampleCaseJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

SampleCaseJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { returnGet, colorChip, totalContents } = GeneralJs;
    let getObj;
    getObj = returnGet();

    console.log(totalContents);

  } catch (e) {
    console.log(e);
  }
}
