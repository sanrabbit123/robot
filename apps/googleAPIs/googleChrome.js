const GoogleChrome = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.module = this.dir + "/module";
  this.puppeteer = require("puppeteer");
}

GoogleChrome.prototype.frontRender = async function (func) {
  if (typeof func !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let generalString;
    let finalFunc;

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    finalFunc = generalString;
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

GoogleChrome.prototype.scriptRequest = async function (url, frontCodeArr) {
  if (typeof url !== "string" || !Array.isArray(frontCodeArr)) {
    throw new Error("invaild input");
  }
  if (!frontCodeArr.every((obj) => { return typeof obj === "function" })) {
    throw new Error("invaild input 2");
  }

  const instance = this;
  const { sleep } = this.mother;
  const { chromeLauncher, chromeRemote } = require(this.module + "/index.js");
  try {
    // const chrome = await chromeLauncher.launch({ chromeFlags: [] });
    const chrome = await chromeLauncher.launch({ chromeFlags: [ "--no-sandbox", "--headless", "--disable-gpu", "--headless=new" ] });
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

GoogleChrome.prototype.pdfPrint = async function (link, filePath = null, openMode = false) {
  if (typeof link !== "string") {
    throw new Error("invalid input => { link, filePath }");
  }
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }
  if (typeof filePath === "string") {
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }
  }
  const instance = this;
  const { shellLink, shellExec, uniqueValue } = this.mother;
  const { puppeteer } = this;
  const tempDir = process.cwd() + "/temp";
  try {
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".pdf";
    }
    const browser = await puppeteer.launch({
      args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--headless=new" ],
    });
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: "networkidle2" });
    await page.evaluateHandle("document.fonts.ready");
    await page.pdf({
      path: filePath,
      format: "a4",
      printBackground: true,
      timeout: 0,
      scale: 0.8,
      margin: {
        top: 30,
        bottom: 30
      }
    });
    await browser.close();

    if (openMode) {
      await shellExec(`open ${shellLink(filePath)}`);
    }

    return { file: filePath };
  } catch (e) {
    console.log(e);
    return { message: "error : " + e.message };
  }
}

GoogleChrome.prototype.pageToPng = async function (link, filePath = null, tabletMode = false) {
  const instance = this;
  const { shellLink, shellExec, uniqueValue } = this.mother;
  const { puppeteer } = this;
  const tempDir = process.cwd() + "/temp";
  try {
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".png";
    }
    const browser = await puppeteer.launch({
      args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--headless=new" ],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: !tabletMode ? 1920 : 1200,
      height: 1080,
      deviceScaleFactor: 2,
    });

    await page.goto(link, { waitUntil: "networkidle2" });
    await page.evaluateHandle("document.fonts.ready");
    await page.screenshot({ path: filePath, fullPage: true });

    await browser.close();

    return { file: filePath };
  } catch (e) {
    console.log(e);
  }
}

GoogleChrome.prototype.getHtml = async function (link) {
  if (typeof link !== "string") {
    throw new Error("invalid input => { link }");
  }
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }
  const instance = this;
  const { puppeteer, fileSystem } = this;
  try {
    const browser = await puppeteer.launch({
      args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--headless=new" ],
    });
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: "networkidle2" });
    const frontHtml = await page.evaluate(() => {
      return `<html><head>${document.head.innerHTML}</head><body>${document.body.innerHTML}</body></html>`;
    });
    await browser.close();
    return frontHtml;
  } catch (e) {
    console.log(e);
    return { message: "error : " + e.message };
  }
}

GoogleChrome.prototype.frontScript = async function (link, func) {
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }
  const instance = this;
  const { equalJson, fileSystem, mediaQuery } = this.mother;
  const { puppeteer } = this;
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const browser = await puppeteer.launch({ args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--headless=new" ] });
  try {
    const page = await browser.newPage();
    let funcScript, generalString, frontResponse;

    await page.goto(link, { waitUntil: "networkidle2" });

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    if (typeof func === "function") {
      funcScript = mediaQuery(generalString).code + "\n\n" + func.toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    } else if (typeof func === "string") {
      funcScript = mediaQuery(generalString).code + "\n\n" + func;
    } else {
      throw new Error("invalid input");
    }
    frontResponse = await page.evaluate(new AsyncFunction(funcScript));

    await browser.close();

    try {
      return equalJson(frontResponse);
    } catch {
      return frontResponse;
    }
  } catch (e) {
    console.log(e);
    await browser.close();
    return { message: "error : " + e.message };
  }
}

GoogleChrome.prototype.scriptChain = async function (map, between = 2500, tong = {}) {
  if (!Array.isArray(map)) {
    throw new Error("invalid input => [ { link, async func } ]");
  }
  const instance = this;
  const { equalJson, fileSystem, sleep, mediaQuery } = this.mother;
  const { puppeteer } = this;
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const browser = await puppeteer.launch({ args: [ "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--headless=new" ] });
  try {
    const page = await browser.newPage();
    let funcScript, generalString, frontResponse, frontResponses;

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString += (await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]));
    generalString = mediaQuery(generalString).code;

    returnScript = (func) => {
      return "const INFO = " + JSON.stringify(instance.address) + ";\n\nconst TONG = " + JSON.stringify(tong) + ";\n\n" + generalString + "\n\n" + func.toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    }

    frontResponses = [];
    for (let { link, func } of map) {
      await page.goto(link, { waitUntil: "networkidle2" });
      frontResponse = await page.evaluate(new AsyncFunction(returnScript(func)));
      frontResponses.push(frontResponse);
      await sleep(between);
    }

    await browser.close();

    return frontResponses;
  } catch (e) {
    console.log(e);
    await browser.close();
    return { message: "error : " + e.message };
  }
}

module.exports = GoogleChrome;
