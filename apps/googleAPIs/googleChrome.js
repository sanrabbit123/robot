const GoogleChrome = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const { chromium } = require("playwright");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.module = this.dir + "/module";
  this.chromium = chromium;
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
  const { chromium } = this;
  const tempDir = process.cwd() + "/temp";
  try {
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".pdf";
    }
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--hide-scrollbars",
      "--disable-gpu",
    ] });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(link, { waitUntil: "domcontentloaded" });
    await page.evaluateHandle("document.fonts.ready");
    await page.pdf({
      path: filePath,
      format: "a4",
      printBackground: true,
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
  const { chromium } = this;
  const tempDir = process.cwd() + "/temp";
  try {
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".png";
    }
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--hide-scrollbars",
      "--disable-gpu",
    ] });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({
      width: !tabletMode ? 1920 : 1200,
      height: 1080,
    });
    await page.goto(link, { waitUntil: "domcontentloaded" });
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
  const { chromium, fileSystem } = this;
  try {
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--hide-scrollbars",
      "--disable-gpu",
    ] });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(link, { waitUntil: "domcontentloaded" });
    const frontHtml = await page.evaluate(async () => {
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
  const { chromium } = this;
  const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
  const browser = await chromium.launch({ headless: true, args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--hide-scrollbars",
    "--disable-gpu",
  ] });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    let funcScript, generalString, frontResponse;

    await page.goto(link, { waitUntil: "domcontentloaded" });

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/general.js` ]);
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

GoogleChrome.prototype.scriptChain = async function (map, between = 2500, tong = {}, noHeadlessMode = false) {
  if (!Array.isArray(map)) {
    throw new Error("invalid input => [ { link, async func } ]");
  }
  const instance = this;
  const { equalJson, fileSystem, sleep, mediaQuery } = this.mother;
  const { chromium } = this;
  const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
  const browser = await chromium.launch({ headless: !noHeadlessMode, args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--hide-scrollbars",
    "--disable-gpu",
  ] });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    let funcScript, generalString, frontResponse, frontResponses;

    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/general.js` ]);
    generalString += (await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]));
    generalString = mediaQuery(generalString).code;

    returnScript = (func) => {
      return "const INFO = " + JSON.stringify(instance.address) + ";\n\nconst TONG = " + JSON.stringify(tong) + ";\n\n" + generalString + "\n\n" + func.toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    }

    frontResponses = [];
    for (let { link, func } of map) {
      await page.goto(link, { waitUntil: "domcontentloaded" });
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
