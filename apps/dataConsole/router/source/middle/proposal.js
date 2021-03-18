const ProposalJs = function () {
  this.mother = new GeneralJs();
  this.margin = 0;
  this.mode = "desktop";
  this.sero = false;
  this.totalContents = document.getElementById("totalcontents");
}

ProposalJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();

    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);




  } catch (e) {
    console.log(e);
  }
}
