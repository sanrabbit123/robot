const FrontMethods = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.generalPath = `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js`;
}

FrontMethods.prototype.addFrontMethods = async function () {
  const instance = this;
  const { fileSystem, mediaQuery } = this.mother;
  const { generalPath } = this;
  try {
    let frontGeneralString, frontGeneral;
    let tempPath;

    tempPath = `${process.cwd()}/temp/frontGeneral.js`;

    frontGeneralString = await fileSystem(`readString`, [ generalPath ]);
    frontGeneralString = "const document = { createElement: (str) => {} };\n\n" + mediaQuery(frontGeneralString).code;
    frontGeneralString += "\n\n" + "module.exports = GeneralJs";
    await fileSystem(`write`, [ tempPath, frontGeneralString ]);
    frontGeneral = require(tempPath);

    frontGeneral.injectionInput = async function (input, value, speedUp = false, iframeBoo = false, iframe = null) {
      try {
        if (input === undefined || typeof value !== "string") {
          throw new Error("invaild input");
        }
        if (iframeBoo === true && (iframe === null || iframe === undefined)) {
          throw new Error("if iframe is true, must be iframe dom input");
        }
        const inputId = input.id;
        let iframeRect, iframes, thisIframe;
        let rect;
        let x, y;
        let data;

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
        y = iframeRect.top + rect.top + (rect.height / 2);

        data = { x, y, value, speedUp: speedUp ? "true" : "false" };

        await ajaxPromise(data, HOSTCONST + "/injectionInput");

      } catch (e) {
        console.log(e);
      }
    }

    frontGeneral.scrollWindow = async function (positionX, positionY, amount) {
      if (positionX === undefined || positionY === undefined || typeof amount !== "number") {
        throw new Error("invaild input");
      }
      await sleep(200);
      await ajaxPromise({ positionX, positionY, amount }, HOSTCONST + "/scroll");
      await sleep(1000);
    }

    frontGeneral.pressKey = async function (keyName) {
      if (typeof keyName !== "string") {
        throw new Error("invaild input");
      }
      await ajaxPromise({ key: keyName }, HOSTCONST + "/pressKey");
      await sleep(500);
    }

    frontGeneral.clickElement = async function (dom, iframeBoo = false, iframe = null, alert = false, double = false, visualX = 0, visualY = 0) {
      if (dom === undefined || dom === null) {
        throw new Error("must be dom");
      }
      if (iframeBoo === true && (iframe === null || iframe === undefined)) {
        throw new Error("if iframe is true, must be iframe dom input");
      }
      const domId = dom.id;
      let iframeRect, iframes, thisIframe;
      let rect;
      let x, y;
      let data;

      if (iframeBoo) {
        thisIframe = iframe;
      } else {
        iframeRect = {
          top: 0,
          left: 0
        };
        if (domId !== "") {
          if (document.getElementById(domId) === null && document.querySelector("iframe") !== null) {
            iframes = document.querySelectorAll("iframe");
            thisIframe = null;
            for (let i of iframes) {
              if (i.contentWindow.document.getElementById(domId) !== null) {
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
      rect = dom.getBoundingClientRect();
      x = iframeRect.left + rect.left + (rect.width / 2) + visualX;
      y = iframeRect.top + rect.top + (rect.height / 2) + visualY;

      data = { x, y, alert: alert ? 1 : 0, double: double ? 1 : 0 };

      await ajaxPromise(data, HOSTCONST + "/clickElement");

      return data;
    }

    frontGeneral.crossIframe = async function (dom) {
      if (dom === undefined || dom === null) {
        throw new Error("must be dom");
      }
      let rect;
      let x, y;
      let data;

      rect = dom.getBoundingClientRect();
      x = rect.left + (rect.width / 2);
      y = rect.top + (rect.height / 2);

      data = { x, y };

      await ajaxPromise(data, HOSTCONST + "/crossIframe");
    }

    frontGeneral.calendarInput = async function (input, value, calendarBox, iframeBoo = false, iframe = null) {
      try {
        if (input === undefined || typeof value !== "string" || typeof calendarBox !== "object") {
          throw new Error("invaild input");
        }
        if (iframeBoo === true && (iframe === null || iframe === undefined)) {
          throw new Error("if iframe is true, must be iframe dom input");
        }
        const inputId = input.id;
        let iframeRect, iframes, thisIframe;
        let rect;
        let x, y;
        let data;

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
        y = iframeRect.top + rect.top + (rect.height / 2);

        data = { x, y, value, calendarBox };

        await ajaxPromise(data, HOSTCONST + "/calendarInput");

      } catch (e) {
        console.log(e);
      }
    }

    return frontGeneral;

  } catch (e) {
    console.log(e);
  }
}

module.exports = FrontMethods;
