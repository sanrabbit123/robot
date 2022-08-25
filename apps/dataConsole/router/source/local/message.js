const MessageJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

MessageJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, setQueue } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    


  } catch (e) {
    GeneralJs.ajax("message=" + e.message + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
