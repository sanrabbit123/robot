const GraphicBot = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const { exec } = require(`child_process`);
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
  this.bot = require(`${process.cwd()}/apps/graphicBot/build/Release/robotjs.node`);
  this.screenSize = this.bot.getScreenSize();
  this.chromeHeight = 139;
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
  for (let obj of ADDRESS.officeinfo.map) {
    if (obj.name === "graphic") {
      this.info = new InfoArray(obj.info);
    }
  }
  if (this.info === null || this.info === undefined) {
    throw new Error("invaild infoObj");
  }
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
  const { exec } = this;
  const { sleep } = this.mother;
  return new Promise(function (resolve, reject) {
    exec(`killall chrome`, (error, stdout, stderr) => {
      exec(`google-chrome ${url} --start-maximized`);
      setTimeout(function () {
        resolve(stdout);
      }, 3000);
    });
  });
}

GraphicBot.prototype.chromeClose = async function () {
  const instance = this;
  const { exec } = this;
  try {
    exec(`killall chrome`);
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
    await sleep(500);
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
  const { bot } = this;
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

    frontFirst = "\n\n";
    frontFirst += "const RECEIVECONST = \"http://localhost:3000/receive\"\n\n";
    frontFirst += "const ENDCONST = \"http://localhost:3000/frontEnd\"\n\n";
    frontFirst += "const INPUTCONST = \"http://localhost:3000/injectionInput\"\n\n";

    frontFirst = "\n\n";
    frontFirst += "const ajaxPromise = " + this.frontGeneral.ajaxPromise.toString() + ";\n\n";
    frontFirst += "const sleep = " + this.frontGeneral.sleep.toString() + ";\n\n";
    frontFirst += "const stringToDate = " + this.frontGeneral.stringToDate.toString() + ";\n\n";
    frontFirst += "const stringToDate = " + this.frontGeneral.injectionInput.toString() + ";\n\n";

    frontEnd = "\n\n\n\n";
    frontEnd += "await ajaxPromise({ to: 0, data: 0 }, ENDCONST);\n\n";

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
        await this.pressKey("f12");
        await sleep(500);
        await this.moveAndClick(1622, 1030, 500, false);
        copyToClipboard(tempString);
        await sleep(500);
        await this.pasteText();
        await sleep(500);
        instance.front = 1;
        await this.pressKey("enter");
        await sleep(500);
        while (instance.front === 1) {
          console.log("front waiting...");
          await sleep(1000);
        }
        await sleep(500);
        await this.pressKey("f12");
        await sleep(500);
      }
    }
    return "done";
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.positionWatch = function () {
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
  const { fileSystem, shell, shellLink } = this.mother;
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
      workingList_name = await fileSystem(`readDir`, [ instance.tong ]);
      workingList_name = workingList_name.filter((n) => { return (new RegExp("^g_")).test(n); });
      workingList_name.sort((a, b) => { return Number(a.split('_')[2]) - Number(b.split('_')[2]); });
      workingList = [];
      for (let name of workingList_name) {
        tempArr = name.split('_');
        contents = await fileSystem(`readString`, [ `${instance.tong}/${name}` ]);
        workingList.push({ task: Number(tempArr[1]), contents });
        shell.exec(`rm -rf ${shellLink(instance.tong + "/" + name)}`);
      }
      for (let { task, contents } of workingList) {
        await instance.botOrders(task, contents);
      }
      instance.doing = 0;
    } catch (e) {
      console.log(e);
    }
  }
}

GraphicBot.prototype.addFrontMethods = function () {
  const instance = this;
  if (this.frontGeneral === null) {
    throw new Error("front render first");
  }

  this.frontGeneral.injectionInput = async function (input, value, iframeBoo = false, iframe = null) {
    try {
      if (input === undefined || typeof value !== "string" || typeof iframeBoo !== "boolean") {
        throw new Error("invaild input");
      }
      if (iframeBoo === true && (iframe === null || iframe === undefined)) {
        throw new Error("if iframe is true, must be iframe dom input");
      }
      const chromeHeight = 106;
      const inputId = input.id;
      let iframeRect, iframes, thisIframe;
      let rect;
      let x, y;

      if (iframeBoo) {
        thisIframe = iframe;
      } else {
        iframeRect = {
          top: 0,
          left: 0
        };
        if (inputId !== "") {
          if (document.getElementById(inputId) === null && document.querySelector("iframe") !== null) {
            iframes = document.querySelectorAll("iframe");
            thisIframe = null;
            for (let i of iframes) {
              if (i.contentWindow.document.getElementById(inputId) !== null) {
                thisIframe = i;
                break;
              }
            }
            if (thisIframe === null) {
              throw new Error("cannot find input");
            } else {
              iframeBoo = true;
              iframeRect = thisIframe.getBoundingClientRect();
            }
          } else {
            iframeBoo = false;
          }
        }
      }
      rect = input.getBoundingClientRect();
      x = iframeRect.left + rect.left + (rect.width / 2);
      y = chromeHeight + iframeRect.top + rect.top + (rect.height / 2);

      await ajaxPromise({ x, y, value }, INPUTCONST);

    } catch (e) {
      console.log(e);
    }
  }

}

GraphicBot.prototype.botServer = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, equalJson, requestSystem, sleep } = this.mother;
  const express = require("express");
  const bodyParser = require("body-parser");
  const app = express();
  const port = this.port;
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

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  try {

    let frontGeneralString, frontGeneral;
    frontGeneralString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    frontGeneralString = "const document = { createElement: (str) => {} };\n\n" + frontGeneralString;
    frontGeneralString += "\n\n" + "module.exports = GeneralJs";
    await fileSystem(`write`, [ `${process.cwd()}/temp/frontGeneral.js`, frontGeneralString ]);
    frontGeneral = require(`${process.cwd()}/temp/frontGeneral.js`);
    this.frontGeneral = frontGeneral;
    this.addFrontMethods();

    app.post("/frontEnd", (req, res) => {
      instance.front = 0;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send({ message: "OK" });
    });

    app.post("/receive", (req, res) => {
      if (req.body.to === undefined || req.body.path === undefined || req.body.data === undefined) {
        throw new Error("must be to, data, path");
      }

      let to, path, data;

      to = req.body.to;
      path = req.body.path;
      data = equalJson(req.body.data);

      console.log(to, path, data);

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
    });

    app.post("/injectionInput", (req, res) => {
      if (req.body.x === undefined || req.body.y === undefined || req.body.value === undefined) {
        throw new Error("must be to, data, path");
      }
      const { x, y, value } = req.body;
      const screenSize = instance.screenSize;
      const chromeHeight = instance.chromeHeight;
      const robot = instance.bot;
      let indent;

      if (y >= screenSize.height) {
        robot.moveMouse(screenSize.width / 2, screenSize.height / 2);
        robot.scrollMouse(0, 900000);
        indent = (screenSize.height - chromeHeight) / 2;
        robot.scrollMouse(0, (-1 * y) + indent);
        robot.moveMouse(x, indent);
      } else {
        robot.moveMouse(x, y);
      }

      await sleep(500);
      robot.mouseClick("left");
      robot.mouseClick("left", true);
      await instance.pressKey("delete");
      await instance.clipBoard(value);
      await instance.pasteText();

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send({ message: "OK" });
    });

    app.get("/confirm", (req, res) => {
      res.set("Content-Type", "application/json");
      res.send({ doing: instance.doing });
    });

    app.get("/print", async (req, res) => {
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
        instance.task = setTimeout(instance.startWork(), 5000);
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
    });

    app.get("/cash", async (req, res) => {
      try {
        const taskNumber = 2;
        await fileSystem(`write`, [ `${tong}/${orderConst}_${String(taskNumber)}_${String((new Date()).valueOf())}`, "" ]);
        if (instance.task !== null) {
          clearTimeout(instance.task);
          instance.task = null;
        }
        instance.task = setTimeout(instance.startWork(), 5000);
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
    });

    app.listen(port, () => { console.log(`Server running`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = GraphicBot;
