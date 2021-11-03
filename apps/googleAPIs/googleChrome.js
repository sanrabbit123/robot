const GoogleChrome = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.module = this.dir + "/module";
}

GoogleChrome.prototype.frontRender = async function (func) {
  if (typeof func !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { fileSystem } = this.general;
  try {
    let generalString;
    let finalFunc;

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generaString = generalString.replace(/\/<%generalMap%>\//, "{}");
    finalFunc = generaString;
    finalFunc += "\n\n";
    finalFunc += "const print = function (input) {\n";
    finalFunc += "if (typeof input === 'object') { console.log(JSON.stringify(input, null, 2) + '\\n'); }\n";
    finalFunc += "else if (typeof input === 'function') { console.log(input.toString() + '\\n'); }\n";
    finalFunc += "else { console.log(String(input) + '\\n'); }\n";
    finalFunc += "}\n"
    finalFunc += "\n\n";
    finalFunc += "const printHtml = " + '() => { console.log("<html><head>" + document.head.innerHTML + "</head><body>" + document.body.innerHTML + "</body></html>\\n"); }\n';
    finalFunc += "\n\n";
    finalFunc += "const main = async function () {\n";
    finalFunc += "\n\n";
    finalFunc += func.toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    finalFunc += "\n\n";
    finalFunc += "}\n"
    finalFunc += "main();";

    return finalFunc;
  } catch (e) {
    console.log(e);
  }
}

GoogleChrome.prototype.scriptRequest = async function (url, frontCode = () => { printHtml(); }) {
  if (typeof url !== "string" || typeof frontCode !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { chromeLauncher, chromeRemote } = require(this.module + "/index.js");
  try {
    const chrome = await chromeLauncher.launch({ chromeFlags: [ "--no-sandbox", "--headless", "--disable-gpu" ] });
    const protocol = await chromeRemote({ port: chrome.port });
    const { Network, Page, DOM, Emulation, Runtime, Console } = protocol;
    await Network.enable();
    await Page.enable();
    await DOM.enable();
    await Runtime.enable();
    await Console.enable();
    const pageRun = function (code) {
      let consoleResult = '';
      return new Promise(function (resolve, reject) {
        Page.navigate({ url }).then(() => {
          Console.messageAdded((result) => {
            consoleResult += String(result.message.text);
          });
          Page.loadEventFired(() => {
            Runtime.evaluate({ expression: code }).then(() => {
              resolve(consoleResult);
            }).catch((e) => {
              reject(e);
            });
          });
        }).catch((e) => { reject(e); });
      });
    }
    const result = (await pageRun(await instance.frontRender(frontCode))).trim();
    await protocol.close();
    await chrome.kill();
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleChrome;
