const robot = require("robotjs");
const clipboardy = require("clipboardy");
const path = require("path");
const { sep, normalize } = path;
const { exec, execFile } = require("child_process");
const keypress = require("keypress");
const screenSize = robot.getScreenSize();
const shell = require("shelljs");
const sleep = function (ms) {
  if (typeof ms !== "number") {
    throw new Error("must be number");
  }
  return new Promise(function (resolve, reject) {
    setTimeout(() => { resolve("done") }, ms);
  });
}
let doing;

robot.setMouseDelay(1);
doing = 0;

const chromeOpen = async function (url) {
  try {
    const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
    exec(`taskkill /IM "chrome.exe" /F`);
    await sleep(500);
    execFile(normalize(chrome), [ "--start-maximized", url ]);
    await sleep(3000);
  } catch (e) {
    console.log(e);
  }
}
const chromeClose = async function () {
  try {
    exec(`taskkill /IM "chrome.exe" /F`);
  } catch (e) {
    console.log(e);
  }
}
const moveAndClick = async function (x, y, ms, dblclick = false) {
  try {
    if (typeof x !== "number" || typeof y !== "number" || typeof ms !== "number") {
      throw new Error("invaild input");
    }
    robot.moveMouse(x, y);
    await sleep(500);
    if (dblclick) {
      robot.mouseClick("left", true);
    } else {
      robot.mouseClick();
    }
    await sleep(ms);
  } catch (e) {
    console.log(e);
  }
}
const conditionMove = function (x, y, color) {
  if (typeof x !== "number" || typeof y !== "number" || typeof color !== "string") {
    throw new Error("invaild input");
  }
  robot.moveMouse(x, y);
  return (robot.getPixelColor(x, y) !== color.replace(/\#/gi, ''));
}
const robotOrders = async function (arr) {
  try {
    if (!Array.isArray(arr)) {
      throw new Error("must be array input");
    }
    let tempArr, tempString;
    for (let i of arr) {
      if (Array.isArray(i)) {
        if (i.length >= 3) {
          if (typeof i[2] === "number") {
            await moveAndClick(i[0], i[1], i[2], (i[3] !== undefined ? i[3] : false));
          } else if (typeof i[2] === "object") {
            await moveAndClick(i[0], i[1], 500, (i[3] !== undefined ? i[3] : false));
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
          await chromeOpen(i);
        } else if (i === "close") {
          await chromeClose();
        } else if (i === "copy") {
          await copyText();
        } else if (i === "paste") {
          await pasteText();
        } else if (/^key_/.test(i)) {
          tempArr = i.split('_');
          if (tempArr.length <= 1) {
            throw new Error("invaild input");
          }
          await pressKey(tempArr[1].trim());
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
        await pressKey("f12");
        await sleep(500);
        await moveAndClick(1542, 1053, 500, false);
        clipboardy.writeSync(tempString);
        await sleep(500);
        await pasteText();
        await sleep(500);
        await pressKey("enter");
      }
    }
  } catch (e) {
    console.log(e);
  }
}
const copyText = async function () {
  try {
    robot.keyToggle("control", "down");
    robot.keyTap("c");
    await sleep(500);
    robot.keyToggle("control", "up");
  } catch (e) {
    console.log(e);
  }
}
const pasteText = async function () {
  try {
    robot.keyToggle("control", "down");
    robot.keyTap("v");
    await sleep(500);
    robot.keyToggle("control", "up");
  } catch (e) {
    console.log(e);
  }
}
const pressKey = async function (key) {
  try {
    await sleep(500);
    robot.keyTap(key);
    await sleep(1000);
  } catch (e) {
    console.log(e);
  }
}
const printRequest = async function () {
  try {
    doing = 1;
    await robotOrders([
      "https://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit#response=ACYDBNiCgtcAcyCU-zXdikuXuDs3owKcORZECv3atp2XqBYVqlqEHuL6x8CJbube2CYZeHE",
      "wait_3000",
      [ 960 - 240, 460, 500, true ],
      "copy",
      [ 960 - 305, 460, 500, true ],
      "paste",
      "key_enter",
      [ 960 + 290, 460, 1000 ],
      [ 960 + 300, 470, 500 ],
      [ 960 + 500, 600, 500 ],
      [ 960 + 500, 635, 500 ],
      [ 960 + 530, 930, 2000 ],
      "close"
    ]);
    doing = 0;
    return "done";
  } catch(e) {
    console.log(e);
  }
}
const textToVoice = async function (text = "안녕하세요?") {
  try {
    const play = function (audio) {
      const players = [
        'mplayer',
        'afplay',
        'mpg123',
        'mpg321',
        'play',
        'omxplayer',
        'aplay',
        'cmdmp3'
      ];
      const findExec = function () {
        const isExec = function (command) {
          const { execSync: exec } = require('child_process');
          try {
            exec(command);
            return true;
          } catch (e) {
            return false;
          }
        }
        const findCommand = function (command) {
          const platform = require('os').platform();
          if (/^win/.test(platform)) {
            return "where " + command;
          } else {
            return "command -v " + command;
          }
        }
        const commands = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.apply(arguments);
        let command;
        command = null;
        commands.some((c) => {
          if (isExec(findCommand(c))) {
            command = c;
            return true;
          } else {
            return false;
          }
        });
        return command;
      }
      const player = findExec(players);
      const options = {};
      options.stdio = 'ignore'
      const { spawn } = require('child_process');
      const isURL = player === 'mplayer' && /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i.test(audio);
      const args = Array.isArray(options[player]) ? options[player].concat(audio) : [ audio ];
      const process = spawn(player, args, options);
      if (!process) {
        throw new Error("Unable to spawn process with " + player);
        return null;
      }
      return new Promise(function(resolve, reject) {
        process.on('close', function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(process);
          }
        });
      });
    }

    let restapiKey, command, tempDir, fileName, randoms;

    doing = 1;
    restapiKey = "e0d7657d8f0da70f3df436046728c0a0";
    text = text.replace(/[\[\]\{\}\"\'\<\>\/\\\~\`\+\=\-\_\@\#\$\%\^\&\*\(\)]/g, '');
    tempDir = process.cwd() + "/temp";
    fileName = `tempVoiceRecord_${String((new Date()).valueOf())}.mp3`;
    command = ``;
    command += `curl -v -X POST "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize" `;
    command += `-H "Content-Type: application/xml" `;
    command += `-H "Authorization: ${restapiKey}" `;
    command += `-d '<speak>${text.replace(/\'/g, '"').replace(/\n/g, ' ').replace(/\t/g, '')}</speak>'`;
    command += ` > ${tempDir}/${fileName}`;
    shell.exec(command, { silent: true });
    await play(`${tempDir}/${fileName}`);
    shell.exec(`rm -rf ${tempDir}/${fileName}`, { silent: true });
    doing = 0;
    return "voice done";
  } catch (e) {
    console.log(e);
  }
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/confirm", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send({ doing });
});

app.get("/print", async (req, res) => {
  try {
    res.set("Content-Type", "application/json");
    while (doing === 1) {
      console.log("waiting...");
      await sleep(500);
    }
    printRequest().then((r) => {
      console.log(r);
    }).catch((err) => {
      console.log(err);
    });
    res.send({ message: "will do" });
  } catch (e) {
    console.log(e);
  }
});

app.post("/voice", async (req, res) => {
  try {
    res.set("Content-Type", "application/json");
    while (doing === 1) {
      console.log("waiting...");
      await sleep(500);
    }
    textToVoice(req.body.text).then((r) => {
      console.log(r);
    }).catch((err) => {
      console.log(err);
    });
    res.send({ message: "will do" });
  } catch (e) {
    console.log(e);
  }
});

if (process.argv[2] === undefined || process.argv[2] === "server") {
  app.listen(port, () => { console.log(`Server listening at ${String(port)}`); });
} else if (process.argv[2] === "search") {
  let mouse, color, keyName;
  keyName = null;
  keypress(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    keyName = key.name;
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
  setInterval(() => {
    mouse = robot.getMousePos();
    color = robot.getPixelColor(mouse.x, mouse.y);
    if (keyName === "z") {
      console.log("x:" + mouse.x + " y:" + mouse.y + " color: #" + color);
    }
  }, 100);
} else if (process.argv[2] === "print") {
  printRequest();
}
