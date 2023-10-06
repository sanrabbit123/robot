const RequestWhisk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/requestWhisk";

  const { exec } = require(`child_process`);
  const os = require(`os`);
  const thisOs = os.type();
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
  this.exec = exec;
}

RequestWhisk.prototype.chromeOpen = function (url) {
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

RequestWhisk.prototype.requestBeating = async function () {
  const instance = this;
  const back = this.back;
  const { bot } = this;
  const { fileSystem, shellExec, shellLink, sleep } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const port = 53001;
  const centrexUrl = "https://centrex.uplus.co.kr/premium/backoffice/main.su.html";
  const position = {
    chrome: {
      x: 25,
      y: 1056,
    },
    x: 90,
    y: 78,
  };
  const interval = 10 * 1000;
  const startTime = 10 * 1000;
  try {

    this.chromeOpen(centrexUrl).then(() => {
      return sleep(5000);
    }).then(() => {
      bot.keyTap("enter");
      return sleep(1000);
    }).then(() => {
      bot.keyTap("f12");
      return sleep(1000);
    }).then(() => {
      setTimeout(() => {
        setInterval(() => {
          bot.moveMouse(position.chrome.x, position.chrome.y);
          sleep(1000).then(() => {
            bot.mouseClick();
            sleep(1000).then(() => {
              bot.moveMouse(position.x, position.y);
              sleep(1000).then(() => {
                bot.mouseClick();
              }).catch((err) => {
                console.log(err);
              });
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        }, interval);
      }, startTime);
    }).catch((err) => {
      console.log(err);
    });

    http.createServer(app).listen(port, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running in ${String(port)}`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = RequestWhisk;
