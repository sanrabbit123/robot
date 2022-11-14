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

HtmlMaker.prototype.returnHtml = async function (func) {
  if (typeof func !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const { mediaQuery, fileSystem } = this.mother;
  try {
    let rawHtml, html, dom;
    let svgTongString;
    let generalString;
    let consoleGeneralString;
    let generalCode;
    let localCode;

    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]);

    generalCode = mediaQuery(svgTongString + "\n\n" + generalString + "\n\n" + consoleGeneralString + "\n\n");

    localCode = `
    const LocalJs = function () { this.mother = new GeneralJs(); };
    LocalJs.prototype.launching = ${func.toString()};
    const app = new LocalJs();app.launching();`;

    rawHtml = `<html><head><style></style></head><body><div id="totalcontents"></div><script>const totalContents = document.getElementById("totalcontents");\n${generalCode.code + "\n\n" + localCode}</script></body></html>`;

    dom = new JSDOM(rawHtml, { runScripts: "dangerously" });
    html = dom.window.document.getElementById("totalcontents").innerHTML;

    return html;

  } catch (e) {
    console.log(e);
  }
}

module.exports = HtmlMaker;
