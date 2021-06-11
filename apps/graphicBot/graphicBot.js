const GraphicBot = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.bot = require(`${process.cwd()}/apps/graphicBot/build/Release/robotjs.node`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/graphicBot";
  this.list = this.dir + "/list";
  this.doing = 0;
  this.port = 3000;
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
  const { shell, shellLink, sleep } = this.mother;
  try {
    try {
      shell.exec(`killall chrome`);
    } catch (e) {
      console.log("no chrome running");
    }
    await sleep(500);
    shell.exec(`google-chrome ${url} --start-maximized`);
    await sleep(3000);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.chromeClose = async function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  try {
    shell.exec(`killall chrome`);
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
    await sleep(500);
    bot.keyTap(key);
    await sleep(1000);
  } catch (e) {
    console.log(e);
  }
}

GraphicBot.prototype.botOrders = async function (num) {
  const instance = this;
  const { bot } = this;
  const { sleep, fileSystem } = this.mother;
  try {
    if (typeof num !== "number") {
      throw new Error("input must be number");
    }
    const listDir = await fileSystem(`readDir`, [ this.list ]);
    listDir = listDir.filter((a) => { return a !== `.DS_Store` });
    listDir.sort((a, b) => { return Number(a.split('_')[0].replace(/[^0-9]/g, '')) - Number(b.split('_')[0].replace(/[^0-9]/g, '')); });
    if (listDir[num] === undefined) {
      throw new Error("index out error");
    }
    const arr = require(this.list + "/" + listDir[num]);
    if (!Array.isArray(arr)) {
      throw new Error("must be array");
    }
    let tempArr, tempString;
    this.doing = 1;
    for (let i of arr) {
      if (Array.isArray(i)) {
        if (i.length >= 3) {
          if (typeof i[2] === "number") {
            await this.moveAndClick(i[0], i[1], i[2], (i[3] !== undefined ? i[3] : false));
          } else if (typeof i[2] === "object") {
            await this.moveAndClick(i[0], i[1], 500, (i[3] !== undefined ? i[3] : false));
            if (i[2].x !== undefined && i[2].y !== undefined && i[2].color !== undefined) {
              while (conditionMove(i[2].x, i[2].y, i[2].color)) {
                await sleep(500);
                console.log("waiting...");
              }
            }
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
        tempString = i.toString();
        tempString = "(" + tempString + ")();";
        await this.pressKey("f12");
        await sleep(500);
        await this.moveAndClick(1542, 1053, 500, false);
        // clipboardy.writeSync(tempString);
        await sleep(500);
        await this.pasteText();
        await sleep(500);
        await this.pressKey("enter");
      }
    }
    this.doing = 0;
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

GraphicBot.prototype.botServer = async function () {
  const instance = this;
  const express = require("express");
  const app = express();
  const port = this.port;
  try {

    app.get("/confirm", (req, res) => {
      res.set("Content-Type", "application/json");
      res.send({ doing: instance.doing });
    });

    app.get("/print", async (req, res) => {
      try {
        res.set("Content-Type", "application/json");
        while (instance.doing === 1) {
          console.log("waiting...");
          await sleep(500);
        }
        botOrders(0).then((r) => {
          console.log(r);
        }).catch((err) => {
          console.log(err);
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
