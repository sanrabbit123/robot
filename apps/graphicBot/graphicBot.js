const GraphicBot = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
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

  if (/Linux/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/linux/build/Release/robotjs.node`);
    this.os = "linux";
  } else if (/Darwin/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/mac/build/Release/robotjs.node`);
    this.os = "mac";
  } else if (/Windows/gi.test(thisOs)) {
    this.bot = require(`${process.cwd()}/apps/graphicBot/os/windows/build/Release/robotjs.node`);
    this.os = "windows";
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
  };
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/graphicBot";
  this.list = this.dir + "/list";
  this.tong = this.dir + "/tong";
  this.doing = 0;
  this.port = 3000;
  this.exec = exec;
  this.task = null;
  this.front = 0;
  this.frontGeneral = null;
  this.info = null;
  for (let obj of ADDRESS.homeinfo.map) {
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
        }, 3000);
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
        }, 3000);
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

GraphicBot.prototype.moveAndClick = async function (x, y, ms, dblclick = false) {
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

GraphicBot.prototype.copyText = async function () {
  const instance = this;
  const { bot } = this;
  const { sleep } = this.mother;
  try {
    bot.keyToggle("control", "down");
    bot.keyTap("c");
    await sleep(500);
    bot.keyToggle("control", "up");
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.pasteText = async function () {
  const instance = this;
  const { bot } = this;
  const { sleep } = this.mother;
  try {
    bot.keyToggle("control", "down");
    bot.keyTap("v");
    await sleep(100);
    bot.keyToggle("control", "up");
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
  const { bot, screenSize, chromeSize } = this;
  const { sleep, fileSystem, copyToClipboard } = this.mother;
  try {
    if (typeof num !== "number") {
      throw new Error("input must be number");
    }
    if (this.frontGeneral === null) {
      throw new Error("front render first");
    }
    let listDir = await fileSystem(`readDir`, [ this.list ]);
    listDir = listDir.filter((a) => { return a !== `.DS_Store` });
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
    frontFirst += "const RECEIVECONST = \"https://" + this.address.homeinfo.ghost.host + ":" + String(this.address.homeinfo.ghost.graphic.port) + "/receive\"\n\n";
    frontFirst += "const ENDCONST = \"https://" + this.address.homeinfo.ghost.host + ":" + String(this.address.homeinfo.ghost.graphic.port) + "/frontEnd\"\n\n";
    frontFirst += "const HOSTCONST = \"https://" + this.address.homeinfo.ghost.host + ":" + String(this.address.homeinfo.ghost.graphic.port) + "\"\n\n";
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
    frontFirst += "const endFront = async () => { await ajaxPromise({ to: 0, data: 0 }, ENDCONST); };\n\n";

    frontEnd = "\n\n\n\n";
    frontEnd += "await ajaxPromise({ to: 0, data: 0 }, ENDCONST);\n\n";

    frontFirstLaunching = 0;
    frontWaitingNumber = 0;

    for (let i of arr) {
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
        tempString = "(async function () {\n\n" + frontFirst + tempString + frontEnd + "\n\n})();";
        if (frontFirstLaunching === 0) {
          await this.pressKey("f12");
          await sleep(500);
        } else {
          await sleep(2000);
        }
        await this.moveAndClick(chromeSize.right + ((screenSize.width - chromeSize.right) / 2), screenSize.height - chromeSize.cursor, 500);
        await this.clipBoard(tempString);
        await sleep(500);
        await this.pasteText();
        instance.front = 1;
        await this.pressKey("enter");
        frontFirstLaunching = 1;
        frontWaitingNumber = 0;
        while (instance.front === 1) {
          console.log("front waiting...");
          console.log(frontWaitingNumber);
          await sleep(500);
          frontWaitingNumber = frontWaitingNumber + 1;
          if (frontWaitingNumber >= (2 * 60 * 30)) {
            await instance.mother.slack_bot.chat.postMessage({ text: "Graphic server front js 문제 일어남", channel: "#error_log" });
            await sleep(500);
            await instance.chromeClose();
            await sleep(500);
            return false;
          }
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
      let workingList_name, workingList;
      let tempArr;
      let contents;
      let workSuccess;
      let totalSuccess;
      workingList_name = await fileSystem(`readDir`, [ instance.tong ]);
      workingList_name = workingList_name.filter((n) => { return (new RegExp("^g_")).test(n); });
      workingList_name.sort((a, b) => { return Number(a.split('_')[2]) - Number(b.split('_')[2]); });
      workingList = [];
      for (let name of workingList_name) {
        tempArr = name.split('_');
        contents = await fileSystem(`readString`, [ `${instance.tong}/${name}` ]);
        workingList.push({ task: Number(tempArr[1]), contents, name });
      }

      totalSuccess = [];
      for (let { task, contents, name } of workingList) {
        if (isJson(contents)) {
          workSuccess = await instance.botOrders(task, JSON.parse(contents));
          await sleep(500);
        } else {
          workSuccess = await instance.botOrders(task, contents);
          await sleep(500);
        }
        totalSuccess.push(workSuccess);
        if (workSuccess) {
          shell.exec(`rm -rf ${shellLink(instance.tong + "/" + name)}`);
        }
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
  const back = this.back;
  const { fileSystem, shell, shellLink, equalJson, requestSystem, sleep, stringToDate, getDateMatrix } = this.mother;
  const orderConst = 'g';
  const tong = this.tong;
  const address = this.address;
  const map = function (to) {
    if (/python/gi.test(to)) {
      return "https://" + address.pythoninfo.host + ":3000";
    } else if (/back/gi.test(to)) {
      return "https://" + address.backinfo.host + ":3000";
    } else if (/bridge/gi.test(to)) {
      return "https://" + address.bridgeinfo.host + ":3000";
    } else if (/office/gi.test(to)) {
      return "https://" + address.officeinfo.ghost.host;
    } else if (/home/gi.test(to)) {
      return "https://" + address.homeinfo.ghost.host;
    } else {
      throw new Error("invaild input");
    }
  }
  let funcObj = {};

  funcObj.post_frontEnd = {
    link: [ "/frontEnd" ],
    func: function (req, res) {
      instance.front = 0;
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

      console.log(to, path, data);
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
        if (!speedUp) {
          robot.mouseClick("left", true);
          await instance.pressKey("delete");
        }
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
        let { x, y } = req.body;

        x = Number(x);
        y = Number(y);
        x = x + chromeLeft;
        y = y + chromeHeight;

        robot.moveMouse(x, y);
        robot.mouseClick("left");

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

  funcObj.get_confirm = {
    link: [ "/confirm" ],
    func: function (req, res) {
      res.set("Content-Type", "application/json");
      res.send({ doing: instance.doing });
    }
  };

  funcObj.get_print = {
    link: [ "/print" ],
    func: async function (req, res) {
      try {
        const taskNumber = 0;
        let latest;
        latest = Number(String(await fileSystem(`readString`, [ `${tong}/print/latest` ])).replace(/[^0-9]/g, ''));
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, String(latest + 1) ]);
        await fileSystem(`write`, [ `${tong}/print/latest`, String(latest + 1) ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.get_cash = {
    link: [ "/cash" ],
    func: async function (req, res) {
      try {
        const taskNumber = 2;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, "" ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_form = {
    link: [ "/form" ],
    func: async function (req, res) {
      try {
        const taskNumber = 1;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, JSON.stringify(req.body) ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 3000);
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
      }
    }
  };

  funcObj.post_toAiServer = {
    link: [ "/toAiServer" ],
    func: async function (req, res) {
      try {
        const targetComputer = "uragen";
        const tongName = "illustrator";
        const targetTong = `${instance.tong}/${tongName}`;
        let tongBoo = false;
        let tongDir;
        let targetTongList;
        let ip;

        ip = null;
        for (let obj of instance.address.homeinfo.map) {
          if (obj.name === targetComputer) {
            ip = obj.ip;
          }
        }

        //make tong
        tongDir = await fileSystem(`readDir`, [ instance.tong ]);
        tongDir = tongDir.filter((i) => { return i !== `.DS_Store`; });
        tongBoo = tongDir.includes(tongName);
        if (!tongBoo) {
          shell.exec(`mkdir ${shellLink(targetTong)};`);
        }

        //clean target tong
        targetTongList = await fileSystem(`readDir`, [ targetTong ]);
        if (instance.firstDo[tongName]) {
          for (let j of targetTongList) {
            shell.exec(`rm -rf ${shellLink(targetTong)}/${j};`);
          }
        }

        //write stack
        await fileSystem(`writeJson`, [ targetTong + "/" + tongName + "_order_" + String((new Date()).valueOf()) + ".json", req.body ]);
        instance.firstDo[tongName] = false;

        //debounce clean
        while (instance.timeout[tongName] !== null) {
          if (instance.running[tongName]) {
            await sleep(500);
          } else {
            clearTimeout(instance.timeout[tongName]);
            instance.timeout[tongName] = null;
          }
        }

        //debounce timeout : illustrator
        instance.timeout[tongName] = setTimeout(async function () {
          instance.running[tongName] = true;
          const tongDir = await fileSystem(`readDir`, [ targetTong ]);
          if (ip !== null) {
            let targetJsons;
            let aiResponse;
            targetJsons = [];
            for (let i of tongDir) {
              targetJsons.push(await fileSystem(`readJson`, [ `${targetTong}/${i}` ]));
            }
            if (ip !== null) {
              for (let i of targetJsons) {
                await requestSystem("http://" + ip + ":8080", i, { method: "get" });
              }
            }
          }
          for (let i of tongDir) {
            shell.exec(`rm -rf ${shellLink(targetTong)}/${i}`);
          }
          instance.running[tongName] = false;
          clearTimeout(instance.timeout[tongName]);
          instance.firstDo[tongName] = true;
          instance.timeout[tongName] = null;
        }, 2000);

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
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
  const { bot: robot } = this;
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
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const FrontMethods = require(this.dir + "/router/frontMethods.js");
  const app = express();

  app.use(useragent.express());
  app.use(bodyParser.json());
  app.use(multiForms.array());
  app.use(bodyParser.urlencoded({ extended: true }));

  try {
    let front, routerObj;
    let pems, pemsLink, certDir, keyDir, caDir;
    let tongItems;

    await this.back.setInfoObj({ getMode: false });

    const { name, rawObj: address } = await this.mother.ipCheck();
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching graphic bot in ${name.replace(/info/i, '')} ==============`);
    console.log(``);

    front = new FrontMethods();
    this.frontGeneral = await front.addFrontMethods();

    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.ghost.host;

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
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = GraphicBot;
