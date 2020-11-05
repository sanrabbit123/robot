const ProjectJs = function () {
  this.mother = new GeneralJs();
}

ProjectJs.prototype.launching = async function () {
  const instance = this;
  try {
    console.log("hello?");
  } catch (e) {
    console.log(e);
  }
}
