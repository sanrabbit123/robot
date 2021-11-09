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
    finalFunc += "await GeneralJs.sleep(1500);\n";
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

GoogleChrome.prototype.scriptRequest = async function (url, frontCodeArr) {
  if (typeof url !== "string" || !Array.isArray(frontCodeArr)) {
    throw new Error("invaild input");
  }
  if (!frontCodeArr.every((obj) => { return typeof obj === "function" })) {
    throw new Error("invaild input 2");
  }

  const instance = this;
  const { sleep } = this.general;
  const { chromeLauncher, chromeRemote } = require(this.module + "/index.js");
  try {
    // const chrome = await chromeLauncher.launch({ chromeFlags: [] });
    const chrome = await chromeLauncher.launch({ chromeFlags: [ "--no-sandbox", "--headless", "--disable-gpu" ] });
    const protocol = await chromeRemote({ port: chrome.port });
    const { Network, Page, DOM, Emulation, Runtime, Console } = protocol;
    let result;

    await Network.enable();
    await Page.enable();
    await DOM.enable();
    await Runtime.enable();
    await Console.enable();
    await Page.navigate({ url });
    await Page.loadEventFired();

    result = '';
    Console.messageAdded((obj) => {
      result += String(obj.message.text);
    });

    for (let frontCode of frontCodeArr) {
      await Runtime.evaluate({ expression: (await instance.frontRender(frontCode)) });
      await sleep(2000);
    }

    console.log(result);
    await sleep(500);

    await protocol.close();
    await chrome.kill();

    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleChrome;
