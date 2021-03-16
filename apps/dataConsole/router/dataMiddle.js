const MiddleCommunication = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = `${process.cwd()}/apps/dataConsole/router`;
  this.sourceDir = `${this.dir}/source/middle`;
  this.generalJs = `${process.env.HOME}/static/general.js`;
  this.patchClass = DataPatch;
}

MiddleCommunication.execFuntion = function () {

  const app = new __name__Js();

  document.getElementById("totalcontents").style.height = String(window.innerHeight) + "px";

  document.addEventListener("DOMContentLoaded", function (e) {
    app.mother.generalCss();
    app.mother.loadingRun().then(app.launching.bind(app)).catch(function (err) {
      throw new Error(err);
    });
  });

  document.addEventListener("error", function (e) {
    window.localStorage.clear();
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    window.location.href = "https://home-liaison.com";
  });

  window.addEventListener("resize", function (e) {
    window.location.reload();
  });

}

MiddleCommunication.prototype.baseHtml = async function (target, fontStyle = '') {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let html, middleDir, middleString;
    let name;
    let prototypes, dataPatchScript, prototypeBoo;
    let onoffObj;

    if (!/\.js$/.test(target)) {
      target = target + ".js";
    }

    name = target.slice(0, 1).toUpperCase() + target.split(".")[0].slice(1);
    middleString = await fileSystem(`readString`, [ this.sourceDir + "/" + target ]);
    if (/\/<%patch%>\//g.test(middleString)) {
      onoffObj = JSON.parse(middleString.slice(0, [ ...middleString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));
      middleString = middleString.slice([ ...middleString.matchAll(/%\/%\/g/g) ][0].index + String("%/%/g").length + 1);
      prototypes = Object.keys(this.patchClass.prototype);
      dataPatchScript = `const DataPatch = new Function();\n`;

      if (onoffObj.entire) {
        for (let i of prototypes) {
          dataPatchScript += `DataPatch.${i} = ${this.patchClass.prototype[i].toString().replace(/\n/g, '')};\n`;
        }
      } else {
        for (let i of prototypes) {
          prototypeBoo = /^tools/.test(i);
          for (let j in onoffObj) {
            if (onoffObj[j] && !prototypeBoo) {
              prototypeBoo = (new RegExp("^" + j)).test(i);
            }
          }
          if (prototypeBoo) {
            dataPatchScript += `DataPatch.${i} = ${this.patchClass.prototype[i].toString().replace(/\n/g, '')};\n`;
          }
        }
      }

      middleString = dataPatchScript + middleString;
    }

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
        <title></title>
        <style>${fontStyle}</style>
      </head>
      <body>
        <div id="totalcontents"></div>
        <script src="/general.js"></script>
        <script>${middleString};\n(${MiddleCommunication.execFuntion.toString().replace(/__name__/g, name)})();</script>
      </body>
    </html>`;

    return html;

  } catch (e) {
    console.log(target);
    return `<!DOCTYPE html><html><head></head><body>404 error<script>window.location.href = "https://home-liaison.com";</script></body></html>`;
  }
}


const DataMiddle = new MiddleCommunication();
module.exports = DataMiddle;
