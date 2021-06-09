DesignerJs.prototype.reportBase = function () {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  let margin;
  let totalMother;

  margin = 30;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "relative",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  





}

DesignerJs.prototype.reportView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, sleep } = GeneralJs;
    let loading, price;

    loading = await this.mother.loadingRun();


    this.reportBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
