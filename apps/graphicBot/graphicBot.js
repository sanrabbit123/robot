const GraphicBot = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
  const { exec } = require(`child_process`);
  const os = require(`os`);
  const thisOs = os.type();
  class InfoArray extends Array {
    constructor(arr) {
      super();
      for (let i of arr) {
        if (typeof i !== "object") {
          throw new Error("invaild infoObj");
        }
        if (i.name === undefined || i.user === undefined || i.password === undefined) {
          throw new Error("invaild infoObj");
        }
        this.push(i);
      }
      for (let obj of this) {
        this[obj.name] = { id: obj.user, user: obj.user, pwd: obj.password, password: obj.password };
      }
    }
  }
  this.mother = new Mother();
  this.back = new BackMaker();
  this.chromeGhost = new GoogleChrome();

  if (/Linux/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/linux/build/Release/robotjs.node`);
    this.os = "linux";
    this.staticHomeFolder = "/";
  } else if (/Darwin/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/mac/build/Release/robotjs.node`);
    this.os = "mac";
    this.staticHomeFolder = "/Users/graphic/Sites";
  } else if (/Windows/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/windows/build/Release/robotjs.node`);
    this.os = "windows";
    this.staticHomeFolder = "/";
  } else {
    throw new Error("unknown os");
  }
  this.screenSize = this.bot.getScreenSize();
  this.chromeSize = {
    top: 99,
    bottom: 0,
    left: 56,
    right: 1548,
    cursor: 25,
    urlPosition: {
      x: 0,
      y: 0
    }
  };
  this.alertPosition = {
    linux: {
      x: 1142,
      y: 212,
    },
    mac: {
      x: 1142,
      y: 200,
    }
  };
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/graphicBot";
  this.list = this.dir + "/list";
  this.tong = this.dir + "/tong";
  this.doing = 0;
  this.port = 53000;
  this.exec = exec;
  this.task = null;
  this.front = 0;
  this.frontGeneral = null;
  this.frontProcess = null;
  this.frontProblem = false;
  this.info = null;
  for (let obj of ADDRESS.officeinfo.map) {
    if (obj.name === "graphic") {
      this.info = new InfoArray(obj.info);
    }
  }
  if (this.info === null || this.info === undefined) {
    throw new Error("invaild infoObj");
  }
  this.running = {
    illustrator: false,
  };
  this.firstDo = {
    illustrator: true,
  };
  this.timeout = {
    illustrator: null,
  };
  this.localhost = null;
}

GraphicBot.prototype.keypress = function (callback) {
  const stream = process.stdin;
  if (!!stream._keypressDecoder) return;
  const { StringDecoder } = require('string_decoder');
  const emitKey = function (stream, s) {
    let ch, key, parts;
    key = { name: undefined, ctrl: false, meta: false, shift: false };
    if (Buffer.isBuffer(s)) {
      if (s[0] > 127 && s[1] === undefined) {
        s[0] -= 128;
        s = '\x1b' + s.toString(stream.encoding || 'utf-8');
      } else {
        s = s.toString(stream.encoding || 'utf-8');
      }
    }
    key.sequence = s;
    if (s === '\r') {
      key.name = 'return';
    } else if (s === '\n') {
      key.name = 'enter';
    } else if (s === '\t') {
      key.name = 'tab';
    } else if (s === '\b' || s === '\x7f' || s === '\x1b\x7f' || s === '\x1b\b') {
      key.name = 'backspace';
      key.meta = (s.charAt(0) === '\x1b');
    } else if (s === '\x1b' || s === '\x1b\x1b') {
      key.name = 'escape';
      key.meta = (s.length === 2);
    } else if (s === ' ' || s === '\x1b ') {
      key.name = 'space';
      key.meta = (s.length === 2);
    } else if (s <= '\x1a') {
      key.name = String.fromCharCode(s.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
      key.ctrl = true;
    } else if (s.length === 1 && s >= 'a' && s <= 'z') {
      key.name = s;
    } else if (s.length === 1 && s >= 'A' && s <= 'Z') {
      key.name = s.toLowerCase();
      key.shift = true;
    } else if (parts = /^(?:\x1b)([a-zA-Z0-9])$/.exec(s)) {
      key.name = parts[1].toLowerCase();
      key.meta = true;
      key.shift = /^[A-Z]$/.test(parts[1]);
    } else if (parts = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/.exec(s)) {
      let code = (parts[1] || '') + (parts[2] || '') + (parts[4] || '') + (parts[6] || '');
      let modifier = (parts[3] || parts[5] || 1) - 1;
      key.ctrl = !!(modifier & 4);
      key.meta = !!(modifier & 10);
      key.shift = !!(modifier & 1);
      key.code = code;
      switch (code) {
        case 'OP': key.name = 'f1'; break;
        case 'OQ': key.name = 'f2'; break;
        case 'OR': key.name = 'f3'; break;
        case 'OS': key.name = 'f4'; break;
        case '[11~': key.name = 'f1'; break;
        case '[12~': key.name = 'f2'; break;
        case '[13~': key.name = 'f3'; break;
        case '[14~': key.name = 'f4'; break;
        case '[[A': key.name = 'f1'; break;
        case '[[B': key.name = 'f2'; break;
        case '[[C': key.name = 'f3'; break;
        case '[[D': key.name = 'f4'; break;
        case '[[E': key.name = 'f5'; break;
        case '[15~': key.name = 'f5'; break;
        case '[17~': key.name = 'f6'; break;
        case '[18~': key.name = 'f7'; break;
        case '[19~': key.name = 'f8'; break;
        case '[20~': key.name = 'f9'; break;
        case '[21~': key.name = 'f10'; break;
        case '[23~': key.name = 'f11'; break;
        case '[24~': key.name = 'f12'; break;
        case '[A': key.name = 'up'; break;
        case '[B': key.name = 'down'; break;
        case '[C': key.name = 'right'; break;
        case '[D': key.name = 'left'; break;
        case '[E': key.name = 'clear'; break;
        case '[F': key.name = 'end'; break;
        case '[H': key.name = 'home'; break;
        case 'OA': key.name = 'up'; break;
        case 'OB': key.name = 'down'; break;
        case 'OC': key.name = 'right'; break;
        case 'OD': key.name = 'left'; break;
        case 'OE': key.name = 'clear'; break;
        case 'OF': key.name = 'end'; break;
        case 'OH': key.name = 'home'; break;
        case '[1~': key.name = 'home'; break;
        case '[2~': key.name = 'insert'; break;
        case '[3~': key.name = 'delete'; break;
        case '[4~': key.name = 'end'; break;
        case '[5~': key.name = 'pageup'; break;
        case '[6~': key.name = 'pagedown'; break;
        case '[[5~': key.name = 'pageup'; break;
        case '[[6~': key.name = 'pagedown'; break;
        case '[7~': key.name = 'home'; break;
        case '[8~': key.name = 'end'; break;
        case '[a': key.name = 'up'; key.shift = true; break;
        case '[b': key.name = 'down'; key.shift = true; break;
        case '[c': key.name = 'right'; key.shift = true; break;
        case '[d': key.name = 'left'; key.shift = true; break;
        case '[e': key.name = 'clear'; key.shift = true; break;
        case '[2$': key.name = 'insert'; key.shift = true; break;
        case '[3$': key.name = 'delete'; key.shift = true; break;
        case '[5$': key.name = 'pageup'; key.shift = true; break;
        case '[6$': key.name = 'pagedown'; key.shift = true; break;
        case '[7$': key.name = 'home'; key.shift = true; break;
        case '[8$': key.name = 'end'; key.shift = true; break;
        case 'Oa': key.name = 'up'; key.ctrl = true; break;
        case 'Ob': key.name = 'down'; key.ctrl = true; break;
        case 'Oc': key.name = 'right'; key.ctrl = true; break;
        case 'Od': key.name = 'left'; key.ctrl = true; break;
        case 'Oe': key.name = 'clear'; key.ctrl = true; break;
        case '[2^': key.name = 'insert'; key.ctrl = true; break;
        case '[3^': key.name = 'delete'; key.ctrl = true; break;
        case '[5^': key.name = 'pageup'; key.ctrl = true; break;
        case '[6^': key.name = 'pagedown'; key.ctrl = true; break;
        case '[7^': key.name = 'home'; key.ctrl = true; break;
        case '[8^': key.name = 'end'; key.ctrl = true; break;
        case '[Z': key.name = 'tab'; key.shift = true; break;
        default: key.name = 'undefined'; break;
      }
    } else if (s.length > 1 && s[0] !== '\x1b') {
      Array.prototype.forEach.call(s, function(c) {
        emitKey(stream, c);
      });
      return;
    }
    if (key.code == '[M') {
      key.name = 'mouse';
      var s = key.sequence;
      var b = s.charCodeAt(3);
      key.x = s.charCodeAt(4) - 040;
      key.y = s.charCodeAt(5) - 040;
      key.scroll = 0;
      key.ctrl  = !!(1<<4 & b);
      key.meta  = !!(1<<3 & b);
      key.shift = !!(1<<2 & b);
      key.release = (3 & b) === 3;
      if (1<<6 & b) {
        key.scroll = 1 & b ? 1 : -1;
      }
      if (!key.release && !key.scroll) {
        key.button = b & 3;
      }
    }
    if (key.name === undefined) {
      key = undefined;
    }
    if (s.length === 1) {
      ch = s;
    }
    if (key && key.name == 'mouse') {
      stream.emit('mousepress', key);
    } else if (key || ch) {
      stream.emit('keypress', ch, key);
    }
  }
  stream.listeners('data').slice(0).forEach(function(l) {
    if (l.name == 'onData' && /emitKey/.test(l.toString())) {
      stream.removeListener('data', l);
    }
  });
  stream.listeners('newListener').slice(0).forEach(function(l) {
    if (l.name == 'onNewListener' && /keypress/.test(l.toString())) {
      stream.removeListener('newListener', l);
    }
  });
  stream._keypressDecoder = new StringDecoder('utf8');
  const onData = function (b) {
    if (stream.listenerCount('keypress') > 0) {
      let r = stream._keypressDecoder.write(b);
      if (r) emitKey(stream, r);
    } else {
      stream.removeListener('data', onData);
      stream.on('newListener', onNewListener);
    }
  }
  const onNewListener = function (e) {
    if (e === 'keypress') {
      stream.on('data', onData);
      stream.removeListener('newListener', onNewListener);
    }
  }
  if (stream.listenerCount('keypress') > 0) {
    stream.on('data', onData);
  } else {
    stream.on('newListener', onNewListener);
  }
  stream.on("keypress", callback);
  stream.setRawMode(true);
  stream.resume();
}

GraphicBot.prototype.chromeOpen = async function (url) {
  const instance = this;
  const { exec, os } = this;
  const { sleep } = this.mother;

  if (os === "linux") {
    return new Promise(function (resolve, reject) {
      exec(`killall chrome`, (error, stdout, stderr) => {
        exec(`google-chrome ${url} --start-maximized`);
        setTimeout(function () {
          resolve(stdout);
        }, 10000);
      });
    });

  } else if (os === "windows") {
    const path = require("path");
    const { sep, normalize } = path;
    const { exec, execFile } = require("child_process");
    const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
    return new Promise(function(resolve, reject) {
      exec(`taskkill /IM "chrome.exe" /F`, function (error, stdout, stderr) {
        execFile(normalize(chrome), [ "--start-maximized", url ], function (error, stdout, stderr) {
          setTimeout(function () {
            resolve(stdout);
          }, 3000);
        });
      });
    });

  } else if (os === "mac") {
    return new Promise(function (resolve, reject) {
      exec(`killall 'Google Chrome'`, (error, stdout, stderr) => {
        exec(`/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome' --start-maximized ${url}`);
        setTimeout(function () {
          resolve(stdout);
        }, 30000);
      });
    });

  }
}

GraphicBot.prototype.chromeClose = async function () {
  const instance = this;
  const { exec, os } = this;
  try {
    if (os === "linux") {
      exec(`killall chrome`);
    } else if (os === "windows") {
      exec(`taskkill /IM "chrome.exe" /F`);
    } else if (os === "mac") {
      exec(`killall 'Google Chrome'`);
    }
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.chromeHistoryClean = async function () {
  const instance = this;
  const { bot, screenSize, chromeSize, os } = this;
  const { sleep } = this.mother;
  try {
    let consoleX, consoleY;
    let buttonX, buttonY;
    if (os === "mac") {
      buttonX = 20;
      buttonY = 36;
    } else {
      buttonX = 50;
      buttonY = 36;
    }
    consoleX = chromeSize.right + ((screenSize.width - chromeSize.right) / 2);
    consoleY = chromeSize.bottom - ((chromeSize.bottom - chromeSize.top) / 2);
    await this.moveAndClick(consoleX, consoleY, 500);
    bot.mouseClick("right");
    await sleep(500);
    await this.moveAndClick(consoleX + buttonX, consoleY + buttonY, 500);
    await sleep(500);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.moveAndClick = async function (x, y, ms = 500, dblclick = false) {
  const instance = this;
  const { bot } = this;
  const { sleep } = this.mother;
  try {
    if (typeof x !== "number" || typeof y !== "number" || typeof ms !== "number") {
      throw new Error("invaild input");
    }
    bot.moveMouse(x, y);
    await sleep(500);
    if (dblclick) {
      bot.mouseClick("left", true);
    } else {
      bot.mouseClick();
    }
    await sleep(ms);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.conditionMove = function (x, y, color) {
  const instance = this;
  const { bot } = this;
  if (typeof x !== "number" || typeof y !== "number" || typeof color !== "string") {
    throw new Error("invaild input");
  }
  bot.moveMouse(x, y);
  return (bot.getPixelColor(x, y) !== color.replace(/\#/gi, ''));
}

GraphicBot.prototype.selectAll = async function () {
  const instance = this;
  const { bot, os } = this;
  const { sleep } = this.mother;
  try {
    bot.keyTap("a", os === "mac" ? "command" : "control");
    await sleep(100);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.copyText = async function () {
  const instance = this;
  const { bot, os } = this;
  const { sleep } = this.mother;
  try {
    bot.keyTap("c", os === "mac" ? "command" : "control");
    await sleep(100);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.pasteText = async function () {
  const instance = this;
  const { bot } = this;
  const { sleep } = this.mother;
  try {
    let command;
    if (this.os === "mac") {
      command = "command";
    } else {
      command = "control";
    }
    await sleep(300);
    bot.keyTap("v", command);
    await sleep(100);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.pressKey = async function (key) {
  const instance = this;
  const { bot } = this;
  const { sleep } = this.mother;
  try {
    bot.keyTap(key);
    await sleep(500);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.clickAlert = async function () {
  const instance = this;
  const { sleep } = this.mother;
  try {
    await sleep(2000);
    await this.moveAndClick(this.alertPosition[this.os].x, this.alertPosition[this.os].y);
    await sleep(1000);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.clipBoard = async function (text) {
  const instance = this;
  const { sleep, copyToClipboard } = this.mother;
  try {
    copyToClipboard(text);
    await sleep(500);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.botOrders = async function (num, arg) {
  const instance = this;
  const { bot, screenSize, chromeSize, os } = this;
  const { sleep, fileSystem, copyToClipboard, errorLog } = this.mother;
  try {
    if (typeof num !== "number") {
      throw new Error("input must be number");
    }
    if (this.frontGeneral === null) {
      throw new Error("front render first");
    }
    let listDir = await fileSystem(`readDir`, [ this.list ]);
    listDir = listDir.filter((a) => { return a !== `.DS_Store` }).filter((a) => { return /^[0-9]/.test(a); });
    listDir.sort((a, b) => { return Number(a.split('_')[0].replace(/[^0-9]/g, '')) - Number(b.split('_')[0].replace(/[^0-9]/g, '')); });
    if (listDir[num] === undefined) {
      throw new Error("index out error");
    }
    const arrFunc = require(this.list + "/" + listDir[num]);
    const arr = arrFunc(arg, this.info);
    if (!Array.isArray(arr)) {
      throw new Error("must be array");
    }
    let tempArr, tempString;
    let frontFirst, frontEnd;
    let frontFirstLaunching;
    let frontWaitingNumber;

    frontFirst = "\n\n";
    if (typeof arg === "string") {
      frontFirst += "const POSTCONST = \"" + arg + "\"\n\n";
    } else if (typeof arg === "object") {
      frontFirst += "const POSTCONST = " + JSON.stringify(arg) + "\n\n";
    } else {
      frontFirst += "const POSTCONST = " + String(arg) + "\n\n";
    }

    frontFirst += "const RECEIVECONST = \"" + this.localhost + "/receive\";\n\n";
    frontFirst += "const AJAXCONST = \"" + this.localhost + "/ajax\";\n\n";
    frontFirst += "const ENDCONST = \"" + this.localhost + "/frontEnd\";\n\n";
    frontFirst += "const HOSTCONST = \"" + this.localhost + "\";\n\n";
    frontFirst += "const ACCUMULATIONCONST = \"" + this.localhost + "/accumulation\";\n\n";
    frontFirst += "const INFO = " + JSON.stringify(this.address.officeinfo.map.find((obj) => { return obj.name === "graphic" }).info, null, 2) + ";\n\n";

    frontFirst += "const equalJson = " + this.frontGeneral.equalJson.toString() + ";\n\n";
    frontFirst += "const ajaxPromise = " + this.frontGeneral.ajaxPromise.toString() + ";\n\n";
    frontFirst += "const sleep = " + this.frontGeneral.sleep.toString() + ";\n\n";
    frontFirst += "const dateToString = " + this.frontGeneral.dateToString.toString() + ";\n\n";
    frontFirst += "const stringToDate = " + this.frontGeneral.stringToDate.toString() + ";\n\n";
    frontFirst += "const getDateMatrix = " + this.frontGeneral.getDateMatrix.toString() + ";\n\n";
    frontFirst += "const serviceParsing = " + this.frontGeneral.serviceParsing.toString() + ";\n\n";
    frontFirst += "const autoComma = " + this.frontGeneral.autoComma.toString() + ";\n\n";

    frontFirst += "const injectionInput = " + this.frontGeneral.injectionInput.toString() + ";\n\n";
    frontFirst += "const scrollTo = " + this.frontGeneral.scrollTo.toString() + ";\n\n";
    frontFirst += "const scrollWindow = " + this.frontGeneral.scrollWindow.toString() + ";\n\n";
    frontFirst += "const clickElement = " + this.frontGeneral.clickElement.toString() + ";\n\n";
    frontFirst += "const calendarInput = " + this.frontGeneral.calendarInput.toString() + ";\n\n";
    frontFirst += "const pressKey = " + this.frontGeneral.pressKey.toString() + ";\n\n";
    frontFirst += "const crossIframe = " + this.frontGeneral.crossIframe.toString() + ";\n\n";

    frontFirst += "const endFront = async () => { await ajaxPromise({ to: 0, data: 0 }, ENDCONST); };\n\n";

    frontFirst += "await ajaxPromise({ to: 0, data: 0 }, HOSTCONST + '/frontProcess');\n\n";
    frontFirst += "setInterval(async () => { await ajaxPromise({ to: 0, data: 0 }, HOSTCONST + '/frontProcess'); }, 500);\n\n";

    frontEnd = "\n\n\n\n";
    frontEnd += "await ajaxPromise({ to: 0, data: 0 }, ENDCONST);\n\n";

    frontFirstLaunching = 0;
    frontWaitingNumber = 0;

    for (let i of arr) {
      instance.frontProblem = false;
      if (Array.isArray(i)) {
        if (i.length >= 3) {
          if (typeof i[2] === "number") {
            await this.moveAndClick(i[0], i[1], i[2], (i[3] !== undefined ? i[3] : false));
          } else if (typeof i[2] === "object") {
            if (i[2].x !== undefined && i[2].y !== undefined && i[2].color !== undefined) {
              while (instance.conditionMove(i[2].x, i[2].y, i[2].color)) {
                await sleep(500);
                console.log("waiting...");
              }
            } else {
              throw new Error("invaild condition");
            }
            await this.moveAndClick(i[0], i[1], 500, (i[3] !== undefined ? i[3] : false));
          }
        }
      } else if (typeof i === "string") {
        if (/^http/.test(i)) {
          await this.chromeOpen(i);
        } else if (i === "close") {
          await this.chromeClose();
        } else if (/^toss\: /.test(i)) {
          await sleep(5000);
          await this.moveAndClick(chromeSize.urlPosition.x, chromeSize.urlPosition.y);
          await this.pressKey("delete");
          await this.clipBoard(i.replace(/^toss\: /gi, ''));
          await this.pasteText();
          await this.pressKey("enter");
          await sleep(1000);
        } else if (i === "copy") {
          await this.copyText();
        } else if (i === "paste") {
          await this.pasteText();
        } else if (/^clipBoard_/.test(i)) {
          tempArr = i.split('_');
          if (tempArr.length <= 1) {
            throw new Error("invaild input");
          }
          await this.clipBoard(tempArr[1].trim());
        } else if (/^key_/.test(i)) {
          tempArr = i.split('_');
          if (tempArr.length <= 1) {
            throw new Error("invaild input");
          }
          await this.pressKey(tempArr[1].trim());
        } else if (/^wait_/.test(i)) {
          tempArr = i.split('_');
          if (tempArr.length <= 1) {
            throw new Error("invaild input");
          }
          if (Number.isNaN(Number(tempArr[1].trim().replace(/[^0-9]/g, '')))) {
            throw new Error("invaild input");
          }
          await sleep(Number(tempArr[1].trim().replace(/[^0-9]/g, '')));
        }
      } else if (typeof i === "function") {
        tempString = i.toString().trim().replace(/\}$/, '').replace(/^async function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, '');
        if (typeof instance.accumulation === "object" && instance.accumulation !== null) {
          tempString = "(async function () {\n\n" + frontFirst + "\n\n" + "const ACCUMULATIONDATA = " + JSON.stringify(instance.accumulation, null, 2) + ";\n\n" + tempString + frontEnd + "\n\n})();";
        } else {
          tempString = "(async function () {\n\n" + frontFirst + tempString + frontEnd + "\n\n})();";
        }
        if (frontFirstLaunching === 0) {
          await this.pressKey("f12");
          await sleep(500);
        } else {
          await sleep(1000);
        }
        await this.moveAndClick(chromeSize.right + ((screenSize.width - chromeSize.right) / 2), chromeSize.bottom - chromeSize.cursor, 200);
        await this.clipBoard(tempString);
        await this.pasteText();
        instance.front = 1;
        instance.frontProblem = false;
        await this.pressKey("enter");
        frontFirstLaunching = 1;
        frontWaitingNumber = 0;
        while (instance.front === 1) {
          console.log("front waiting...");
          console.log(frontWaitingNumber);
          await sleep(1000);
          frontWaitingNumber = frontWaitingNumber + 1;
          if (instance.frontProblem) {
            await errorLog("Graphic server front js 문제 일어남 => front problem");
            if (instance.frontProcess !== null) {
              clearTimeout(instance.frontProcess);
              instance.frontProcess = null;
            }
            await sleep(500);
            await instance.chromeClose();
            await sleep(500);
            return false;
          }
          if (frontWaitingNumber >= (60 * 20)) {
            await errorLog("Graphic server front js 문제 일어남 => timeout");
            if (instance.frontProcess !== null) {
              clearTimeout(instance.frontProcess);
              instance.frontProcess = null;
            }
            await sleep(500);
            await instance.chromeClose();
            await sleep(500);
            return false;
          }
        }
        if (instance.front === 2) {
          instance.front = 0;
          break;
        }
      }
    }

    return true;
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.positionWatch = async function () {
  const instance = this;
  const { bot } = this;
  let mouse, color, keyName;
  keyName = null;
  this.keypress((ch, key) => {
    keyName = key.name;
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
  });
  setInterval(() => {
    mouse = bot.getMousePos();
    color = bot.getPixelColor(mouse.x, mouse.y);
    if (keyName === "z") {
      console.log("x:" + mouse.x + " y:" + mouse.y + " color: #" + color);
    }
  }, 100);
}

GraphicBot.prototype.startWork = function () {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep } = this.mother;
  const isJson = function (str) {
    if (typeof str !== "string") {
      throw new Error("must be string input");
    }
    let json;
    str = str.trim();
    if (/^[\{\[]/.test(str) && /[\}\]]$/.test(str)) {
      try {
        json = JSON.parse(str);
        if (typeof json === "object" && json !== null) {
          return true;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }
  return async function () {
    try {
      instance.task = null;
      while (instance.doing === 1) {
        console.log(`waiting...`);
        await sleep(5000);
      }
      instance.doing = 1;
      const now = new Date();
      let workingList_name, workingList;
      let tempArr;
      let contents;
      let workSuccess;
      let totalSuccess;
      let thisWorkDate;
      workingList_name = await fileSystem(`readDir`, [ instance.tong ]);
      workingList_name = workingList_name.filter((n) => { return (new RegExp("^g_")).test(n); });
      workingList_name.sort((a, b) => { return Number(a.split('_')[2]) - Number(b.split('_')[2]); });
      workingList = [];
      for (let name of workingList_name) {
        tempArr = name.split('_');
        thisWorkDate = new Date(Number(tempArr[2]));
        if (now.valueOf() - thisWorkDate.valueOf() <= (1000 * 60 * 60 * 3)) {
          contents = await fileSystem(`readString`, [ `${instance.tong}/${name}` ]);
          workingList.push({ task: Number(tempArr[1]), contents, name });
        } else {
          shell.exec(`rm -rf ${shellLink(instance.tong + "/" + name)}`);
        }
      }

      totalSuccess = [];
      for (let { task, contents, name } of workingList) {
        if (isJson(contents)) {
          workSuccess = await instance.botOrders(task, JSON.parse(contents));
        } else {
          workSuccess = await instance.botOrders(task, contents);
        }
        await sleep(500);
        totalSuccess.push(workSuccess);
        if (workSuccess) {
          await instance.chromeHistoryClean();
          shell.exec(`rm -rf ${shellLink(instance.tong + "/" + name)}`);
        }
      }

      if (instance.frontProcess !== null) {
        clearTimeout(instance.frontProcess);
        instance.frontProcess = null;
      }

      await instance.chromeClose();

      totalSuccess = totalSuccess.filter((t) => { return !t; });
      if (totalSuccess.length !== 0) {
        instance.task = setTimeout(instance.startWork(), 2000);
      }

      instance.doing = 0;
    } catch (e) {
      console.log(e);
    }
  }
}

GraphicBot.prototype.botRouter = function () {
  const instance = this;
  const fs = require("fs");
  const back = this.back;
  const chromeGhost = this.chromeGhost;
  const staticHomeFolder = this.staticHomeFolder;
  const { fileSystem, shell, shellExec, shellLink, equalJson, requestSystem, sleep, stringToDate, getDateMatrix, setQueue, uniqueValue } = this.mother;
  const orderConst = 'g';
  const tong = this.tong;
  const address = this.address;
  const map = function (to) {
    if (/python/gi.test(to)) {
      return "https://" + address.pythoninfo.host + ":3000";
    } else if (/back/gi.test(to) || /home/gi.test(to)) {
      return "https://" + address.backinfo.host + ":3000";
    } else if (/bridge/gi.test(to)) {
      return "https://" + address.officeinfo.ghost.host + ":3000";
    } else if (/office/gi.test(to)) {
      return "https://" + address.officeinfo.ghost.host;
    } else if (/log/gi.test(to)) {
      return "https://" + address.testinfo.ghost.host + ":3000";
    } else if (/second/gi.test(to)) {
      return "https://" + address.secondinfo.ghost.host + ":3000";
    } else {
      throw new Error("invaild input");
    }
  }
  let funcObj = {};

  funcObj.post_frontEnd = {
    link: [ "/frontEnd" ],
    func: function (req, res) {
      instance.front = Number(req.body.data);
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send({ message: "OK" });
    }
  };

  funcObj.post_frontProcess = {
    link: [ "/frontProcess" ],
    func: function (req, res) {

      console.log("front working...");
      instance.frontProblem = false;

      if (instance.frontProcess !== null) {
        clearTimeout(instance.frontProcess);
        instance.frontProcess = null;
      }
      instance.frontProcess = setTimeout(function () {
        console.log("something bad");
        instance.frontProblem = true;
      }, 20 * 1000);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send({ message: "OK" });
    }
  };

  funcObj.post_receive = {
    link: [ "/receive" ],
    func: function (req, res) {
      if (req.body.to === undefined || req.body.path === undefined || req.body.data === undefined) {
        throw new Error("must be to, data, path");
      }

      let to, path, data;

      to = req.body.to;
      path = req.body.path;
      data = equalJson(req.body.data);

      console.log(map(to), path, data);
      console.log(JSON.stringify(data, null, 2));

      requestSystem(map(to) + path, { json: JSON.stringify(data) }, { headers: { "Content-Type": "application/json" } }).then((res) => {
        console.log("request done");
      }).catch((err) => {
        console.log(err);
      });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send({ message: "OK" });
    }
  };

  funcObj.post_ajax = {
    link: [ "/ajax" ],
    func: async function (req, res) {
      try {
        if (req.body.to === undefined || req.body.path === undefined || req.body.data === undefined) {
          throw new Error("must be to, data, path");
        }

        let to, path, data;
        let responseData_raw, responseData;

        to = req.body.to;
        path = req.body.path;
        data = equalJson(req.body.data);

        console.log(map(to), path, data);
        console.log(JSON.stringify(data, null, 2));

        responseData_raw = await requestSystem(map(to) + path, data, { headers: { "Content-Type": "application/json" } });
        responseData = responseData_raw.data;

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(responseData));

      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_injectionInput = {
    link: [ "/injectionInput" ],
    func: async function (req, res) {
      try {
        if (req.body.x === undefined || req.body.y === undefined || req.body.value === undefined) {
          throw new Error("must x, y, value");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { x, y, value } = req.body;
        let text;
        let tempArr, tempObj;
        let customX;
        let speedUp;

        x = Number(x);
        y = Number(y);
        x = x + chromeLeft;
        y = y + chromeHeight;

        customX = req.body.customX === undefined ? (chromeLeft + (screenSize.width / 2)) : Number(req.body.customX);
        customY = req.body.customY === undefined ? (screenSize.height / 2) : Number(req.body.customY);

        if (req.body.speedUp === undefined) {
          speedUp = false;
        } else {
          speedUp = (req.body.speedUp === "true");
        }

        robot.moveMouse(x, y);

        if (/^info\./gi.test(value)) {
          tempArr = value.split('.');
          tempArr.shift();
          tempObj = instance.info;
          for (let i of tempArr) {
            tempObj = tempObj[i];
          }
          text = tempObj;
        } else {
          text = value;
        }

        robot.mouseClick("left");
        await instance.selectAll();
        await instance.pressKey("delete");
        await instance.clipBoard(text);
        await instance.pasteText();

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_pressKey = {
    link: [ "/pressKey" ],
    func: async function (req, res) {
      try {
        if (req.body.key === undefined) {
          throw new Error("must key name");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { key } = req.body;

        await instance.pressKey(key);
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_clickElement = {
    link: [ "/clickElement" ],
    func: async function (req, res) {
      try {
        if (req.body.x === undefined || req.body.y === undefined) {
          throw new Error("must be x, y");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { x, y, alert, double } = req.body;

        x = Number(x);
        y = Number(y);
        x = x + chromeLeft;
        y = y + chromeHeight;

        robot.moveMouse(x, y);
        robot.mouseClick("left");

        alert = Number(alert);
        double = Number(double);
        if (alert === 1) {
          await sleep(2000);
          instance.clickAlert();
          if (double === 1) {
            await sleep(3000);
            instance.clickAlert();
          }
        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_crossIframe = {
    link: [ "/crossIframe" ],
    func: async function (req, res) {
      try {
        if (req.body.x === undefined || req.body.y === undefined) {
          throw new Error("must be x, y");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { x, y } = req.body;

        x = Number(x);
        y = Number(y);
        x = x + chromeLeft;
        y = y + chromeHeight;

        robot.moveMouse(x, y);
        await sleep(500);
        robot.keyTap("c", [ "shift", (instance.os === "mac" ? "command" : "control") ]);
        robot.moveMouse(x, y);
        robot.mouseClick("left");
        await sleep(500);

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_calendarInput = {
    link: [ "/calendarInput" ],
    func: async function (req, res) {
      try {
        if (req.body.x === undefined || req.body.y === undefined || req.body.value === undefined || req.body.calendarBox === undefined) {
          throw new Error("must x, y, value, calendarBox");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { x, y, value, calendarBox } = req.body;
        let today;
        let move;
        let matrix;
        let startPoint;
        let dateX, dateY;
        let calendarX, calendarY;

        x = Number(x);
        y = Number(y);
        x = x + chromeLeft;
        y = y + chromeHeight;
        today = new Date();
        value = stringToDate(value);
        calendarBox = JSON.parse(calendarBox);
        move = ((today.getFullYear() * 12) + today.getMonth()) - ((value.getFullYear() * 12) + value.getMonth());

        robot.moveMouse(x, y);
        robot.mouseClick("left");
        await sleep(500);

        if (move > 0) {
          for (let i = 0; i < move; i++) {
            robot.moveMouse(calendarBox.left.left + (calendarBox.left.width / 2) + chromeLeft, calendarBox.left.top + (calendarBox.left.height / 2) + chromeHeight);
            robot.mouseClick("left");
            await sleep(500);
          }
        } else if (move < 0) {
          for (let i = 0; i < Math.abs(move); i++) {
            robot.moveMouse(calendarBox.right.left + (calendarBox.right.width / 2) + chromeLeft, calendarBox.right.top + (calendarBox.right.height / 2) + chromeHeight);
            robot.mouseClick("left");
            await sleep(500);
          }
        }

        matrix = getDateMatrix(value);
        matrix = matrix.returnSundayMatrix();

        for (let i = 0; i < matrix[0].length; i++) {
          if (matrix[0][i] !== null) {
            startPoint = i;
            break;
          }
        }

        dateX = Math.floor(value.getDate() / 7);
        dateY = (value.getDate() % 7) - 1;
        dateY = dateY + startPoint;
        if (dateY >= 7) {
          dateX = dateX + 1;
          dateY = dateY - 7;
        }

        calendarX = chromeLeft + calendarBox.first.x + (calendarBox.first.width * (dateY)) + (calendarBox.first.width / 2);
        calendarY = chromeHeight + calendarBox.first.y + (calendarBox.first.height * (dateX)) + (calendarBox.first.height / 2);

        robot.moveMouse(calendarX, calendarY);
        robot.mouseClick("left");
        await sleep(500);

        robot.moveMouse(calendarBox.return.left + (calendarBox.return.width / 2) + chromeLeft, calendarBox.return.top + (calendarBox.return.height / 2) + chromeHeight);
        robot.mouseClick("left");
        await sleep(500);

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_scroll = {
    link: [ "/scroll" ],
    func: async function (req, res) {
      try {
        if (req.body.positionX === undefined || req.body.positionY === undefined || req.body.amount === undefined) {
          throw new Error("must be positionX, positionY, amount");
        }
        const { screenSize, chromeSize } = instance;
        const chromeHeight = chromeSize.top;
        const chromeLeft = chromeSize.left;
        const robot = instance.bot;
        let { positionX, positionY, amount } = req.body;

        positionX = /center/gi.test(positionX) ? (chromeLeft + (screenSize.width / 2)) : Number(positionX.replace(/[^0-9\-\.]/g, ''));
        positionY = /center/gi.test(positionY) ? (screenSize.height / 2) : Number(positionY.replace(/[^0-9\-\.]/g, ''));
        amount = Number(amount.replace(/[^0-9\-\.]/g, ''));

        robot.moveMouse(positionX, positionY);
        robot.scrollMouse(0, amount);

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_accumulation = {
    link: [ "/accumulation" ],
    func: async function (req, res) {
      try {
        const data = equalJson(req.body);
        if (typeof instance.accumulation !== "object" || instance.accumulation === null) {
          instance.accumulation = {};
        }
        for (let i in data) {
          instance.accumulation[i] = data[i];
        }
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "OK" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.get_confirm = {
    link: [ "/confirm" ],
    func: function (req, res) {
      res.set("Content-Type", "application/json");
      res.send({ doing: instance.doing });
    }
  };

  funcObj.get_ssl = {
    link: [ "/ssl" ],
    func: function (req, res) {
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "hi" }));
    }
  };

  funcObj.get_cash = {
    link: [ "/cash" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const taskNumber = 2;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, "" ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
        res.send({ error: e.message });
      }
    }
  };

  funcObj.get_blog = {
    link: [ "/blog" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const taskNumber = 1;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, "" ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
        res.send({ error: e.message });
      }
    }
  };

  funcObj.post_receiptSend = {
    link: [ "/receiptSend" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const taskNumber = 5;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, JSON.stringify(req.body) ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
        res.send({ error: e.message });
      }
    }
  };

  funcObj.post_apartment = {
    link: [ "/apartment" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const taskNumber = 3;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, JSON.stringify(req.body) ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
        res.send({ error: e.message });
      }
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

GraphicBot.prototype.getChromeSize = async function () {
  const instance = this;
  const { sleep, colorParsing } = this.mother;
  const { bot: robot, os } = this;
  const urlRatio = (os === "mac" ? 0.63 : 0.8);
  try {
    await this.chromeOpen("https://" + this.address.pythoninfo.host + ":3000/bluePrint");
    await this.pressKey("f12");
    await sleep(500);

    let screenSize;
    let mouse, color, colorArr;
    let boo, pastBoo;
    let xArr, yArr;
    let ratio;
    let x, y;

    robot.setMouseDelay(1);

    screenSize = robot.getScreenSize();

    xArr = [];
    yArr = [];

    ratio = [ (1 / 10), (1 / 2), (9 / 10) ];

    boo = false;
    pastBoo = false;

    for (let x = 0; x < screenSize.width; x++) {
      robot.moveMouse(x, (screenSize.height / 2));
      color = robot.getPixelColor(x, (screenSize.height / 2));
      colorArr = colorParsing(color);
      boo = (colorArr[0] < 150 && colorArr[1] > 220 && colorArr[2] < 150);
      if (boo === !pastBoo) {
        xArr.push(x);
      }
      pastBoo = boo;
    }

    for (let r of ratio) {
      boo = false;
      pastBoo = false;

      for (let y = 0; y < screenSize.height; y++) {
        robot.moveMouse((screenSize.width * r), y);
        color = robot.getPixelColor((screenSize.width * r), y);
        colorArr = colorParsing(color);
        boo = (colorArr[0] < 150 && colorArr[1] > 220 && colorArr[2] < 150);
        if (boo === !pastBoo) {
          yArr.push(y);
        }
        pastBoo = boo;
      }
    }

    xArr.sort((a, b) => { return a - b; });
    yArr.sort((a, b) => { return a - b; });

    this.chromeSize.top = yArr[0];
    this.chromeSize.bottom = (yArr[0] === yArr[yArr.length - 1]) ? 0 : ((yArr[yArr.length - 1] > (this.screenSize.height / 2)) ? yArr[yArr.length - 1] : 0);
    this.chromeSize.left = (xArr[0] === xArr[xArr.length - 1]) ? 0 : xArr[0];
    this.chromeSize.right = xArr[xArr.length - 1];

    if (this.chromeSize.bottom === 0) {
      this.chromeSize.bottom = this.screenSize.height;
    }

    if (this.chromeSize.right === 0) {
      this.chromeSize.right = this.screenSize.width;
    }

    this.chromeSize.urlPosition = {};
    this.chromeSize.urlPosition.x = screenSize.width * (2 / 3);
    this.chromeSize.urlPosition.y = this.chromeSize.top * urlRatio;

    console.log(xArr, yArr);
    console.log(this.screenSize);
    console.log(this.chromeSize);

    robot.setMouseDelay(10);
    await this.chromeClose();
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.botServer = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const https = require("https");
  const express = require("express");
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const FrontMethods = require(this.dir + "/router/frontMethods.js");
  const app = express();

  app.use(useragent.express());
  app.use(express.json({ limit: "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  try {
    let front, routerObj;
    let pems, pemsLink, certDir, keyDir, caDir;
    let tongItems;
    let isGhost;

    await this.back.setInfoObj({ getMode: false });

    const { name, rawObj: address } = await this.mother.ipCheck();
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching graphic bot in ${name.replace(/info/i, '')} ==============`);
    console.log(``);

    isGhost = (address.isGhost === true);

    front = new FrontMethods();
    this.frontGeneral = await front.addFrontMethods();

    pems = {};
    if (isGhost) {
      pemsLink = process.cwd() + "/pems/" + address.host;
      if (Array.isArray(address.second.port)) {
        this.port = address.second.port[1];
        this.localhost = "https://" + address.host + ":" + String(address.second.port[0]);
      } else {
        this.port = address.second.port;
        this.localhost = "https://" + address.host + ":" + String(address.second.port);
      }
    } else {
      pemsLink = process.cwd() + "/pems/" + address.ghost.host;
      if (Array.isArray(address.ghost.second.port)) {
        this.port = address.ghost.second.port[1];
        this.localhost = "https://" + address.ghost.host + ":" + String(address.ghost.second.port[0]);
      } else {
        this.port = address.ghost.second.port;
        this.localhost = "https://" + address.ghost.host + ":" + String(address.ghost.second.port);
      }
    }

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    routerObj = this.botRouter();
    for (let obj of routerObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of routerObj.post) {
      app.post(obj.link, obj.func);
    }

    if (await fileSystem(`exist`, [ instance.tong ])) {
      tongItems = await fileSystem(`readDir`, [ `${instance.tong}` ]);
      tongItems = tongItems.filter((i) => { return /^g_/.test(i); });
      console.log("tong item :", tongItems);
      for (let i of tongItems) {
        shell.exec(`rm -rf ${shellLink(instance.tong)}/${i}`);
      }
      console.log("tong clean success");
    }

    await this.getChromeSize();

    https.createServer(pems, app).listen(this.port, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running in ${String(this.port)}`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = GraphicBot;
