const GoogleChrome = function () {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.module = this.dir + "/module";
}

GoogleChrome.chromeRequest = async function (url, frontCode = "console.log(document.body.innerHTML);") {
  const { chromeLauncher, chromeRemote } = require(process.cwd()+ "/apps/googleAPIs/module/index.js");
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
    const result = (await pageRun(frontCode)).trim();
    await protocol.close();
    await chrome.kill();
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleChrome.prototype.chromeRequest = async function (url, frontCode = "console.log(document.body.innerHTML);") {
  try {
    return await GoogleChrome.chromeRequest(url, frontCode);
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleChrome;
