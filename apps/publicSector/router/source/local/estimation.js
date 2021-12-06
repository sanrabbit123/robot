const EstimationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = document.getElementById("totalcontents");
  this.ea = "px";
}

EstimationJs.prototype.backGrayBar = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth } = this;
  const { createNode, colorChip } = GeneralJs;
  createNode({
    mother: totalContents,
    style: {
      position: "absolute",
      background: colorChip.gray0,
      width: String(grayBarWidth) + ea,
      height: String(100) + "vh",
      top: String(0) + ea,
      left: String(0) + ea,
      zIndex: String(0),
    }
  });
}

EstimationJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { ajaxJson } = GeneralJs;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    this.backGrayBar();







  } catch (e) {
    console.log(e);
  }
}
