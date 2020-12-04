const LoadingJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
}

LoadingJs.prototype.launching = async function () {
  const instance = this;
  try {
    let loading;
    let style;
    let ea = "px";
    let width, height;

    loading = this.mother.returnLoadingIcon();
    width = 50;
    height = 50;
    style = {
      width: String(width) + ea,
      height: String(height) + ea,
      top: "calc(calc(100% - " + String(this.mother.belowHeight) + ea + ") / 2 - " + String(width / 2) + ea + ")",
      left: "calc(50% - " + String(height / 2) + ea + ")",
    };

    for (let i in style) {
      loading.style[i] = style[i];
    }

    this.totalContents.appendChild(loading);

  } catch (e) {
    console.log(e);
  }
}
