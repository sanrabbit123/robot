const DesignerJs = function () {
  this.mother = new GeneralJs();
}

DesignerJs.prototype.launching = async function () {
  const instance = this;
  try {
    console.log("hello?");
  } catch (e) {
    console.log(e);
  }
}
