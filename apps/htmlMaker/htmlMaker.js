const HtmlMaker = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/htmlMaker";
}

HtmlMaker.prototype.returnHtml = function () {
  const instance = this;
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  let rawHtml, html, dom;


  rawHtml = `<html><head></head><body><div id="totalcontents"></div><script>const totalContents = document.getElementById("totalcontents");\n</script></body></html>`;

  dom = new JSDOM(rawHtml, { runScripts: "dangerously" });
  html = dom.window.document.getElementById("totalcontents").innerHTML;

  return html;
}

module.exports = HtmlMaker;
