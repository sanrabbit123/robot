const Clown = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Clown.prototype.serverConnect = async function () {
  const instance = this;
  
  try {

  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.launching = async function () {
  const instance = this;
  const address = this.address;
  try {
    const { app, BrowserWindow } = require("electron");

    app.whenReady().then(() => {
      const mainWindow = new BrowserWindow({
        width: 5000,
        height: 5000,
        title: "HomeLiaison Console",
        titleBarStyle: "hidden",
        roundedCorners: true,
      })

      mainWindow.maximize();
      mainWindow.loadURL("https://" + address.homeinfo.ghost.host);

      return mainWindow;
    }).catch((err) => { console.log(err); });

    app.on('window-all-closed', function () {
      app.quit();
    });

  } catch (e) {
    console.log(e);
  }
}

const app = new Clown();
app.launching().catch((err) => { console.log(err); })
