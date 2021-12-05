const EstimationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
}

EstimationJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { ajaxJson } = GeneralJs;


    console.log(await ajaxJson({ test: "yes" }, "/publicSector/estimation/test"));

    






  } catch (e) {
    console.log(e);
  }
}
