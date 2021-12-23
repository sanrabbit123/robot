const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const local_funcs = new /<%name%>/Js();

// document.getElementById("totalcontents").style.height = String(window.innerHeight) + "px";

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    //localStorage clear
    // window.localStorage.clear();

    if (window.localStorage.getItem("colorChip") === null) {
      GeneralJs.colorChip = JSON.parse(JSON.stringify(GeneralJs.colorSet.light));
      GeneralJs.colorMode = "light";
      window.localStorage.setItem("colorChip", JSON.stringify(GeneralJs.colorChip));
      window.localStorage.setItem("colorMode", GeneralJs.colorMode);
    } else {
      GeneralJs.colorChip = JSON.parse(window.localStorage.getItem("colorChip"));
      GeneralJs.colorMode = window.localStorage.getItem("colorMode");
    }

    local_funcs.mother.generalCss();
    local_funcs.mother.greenBar();
    local_funcs.mother.communicationBox();
    await local_funcs.launching();
    await local_funcs.mother.loginBox();
    // local_funcs.mother.dashboardBox();
    local_funcs.mother.generalStacks();

    //SSE
    const sseTarget = [
      "client",
      "contents",
      "designer",
      "project"
    ];
    const thisPath = window.location.pathname.split("?")[0].replace(/\//g, '');
    if (sseTarget.includes(thisPath)) {
      const thisMap = (DataPatch[thisPath + "Map"])();
      const es = new EventSource("https://" + SSEHOST + ":3000/sse/get_" + thisPath);
      es.addEventListener("updateTong", async function (e) {
        try {
          let domTarget, domTargetChild, domTargetGray, domTargetGrayChild;
          if (/^{/.test(e.data)) {
            const obj = JSON.parse(e.data);
            if (obj.path !== undefined && obj.who !== undefined && obj.where !== undefined && obj.column !== undefined && obj.value !== undefined && obj.date !== undefined) {
              //start
              const { path, who, where, column, value, date } = obj;
              let finalValue;
              let white, whiteChildren, whiteTarget;
              let tempFunction;

              finalValue = value;
              if (typeof value !== "string") {
                if (typeof value === "object" && !(value instanceof Date)) {
                  finalValue = value;
                } else {
                  finalValue = String(value);
                }
              }

              if (thisMap[column] !== undefined) {
                if (thisMap[column].type === "boolean") {
                  if (!thisMap[column].items.includes(finalValue)) {
                    if (/true/gi.test(finalValue) || /True/gi.test(finalValue) || /1/gi.test(finalValue)) {
                      finalValue = thisMap[column].items[0];
                    } else {
                      finalValue = thisMap[column].items[1];
                    }
                  }
                }
                if (thisMap[column].moneyBoo === true) {
                  finalValue = GeneralJs.autoComma(Number(finalValue.replace(/[^0-9\.\-]/gi, '')));
                }
                if (thisMap[column].type === "date") {
                  if (/^1[6789]/.test(finalValue)) {
                    finalValue = '-';
                  }
                }
                if (thisMap[column].type === "object") {
                  if (thisMap[column].stringFunction !== undefined) {
                    if (thisMap[column].stringFunctionAsync === true) {
                      tempFunction = new AsyncFunction("value", thisMap[column].stringFunction);
                      finalValue = await tempFunction(finalValue);
                    } else {
                      tempFunction = new Function("value", thisMap[column].stringFunction);
                      finalValue = tempFunction(finalValue);
                    }
                  } else {
                    if (typeof finalValue === "object") {
                      finalValue = JSON.stringify(finalValue);
                    } else {
                      finalValue = String(finalValue);
                    }
                  }
                }
              }

              if (path === thisPath) {
                if (document.querySelector("." + where) !== null) {
                  domTarget = document.querySelector("." + where);
                  domTargetChild = null;
                  for (let i of domTarget.children) {
                    if (i.getAttribute("column") === column) {
                      domTargetChild = i;
                    }
                  }
                  if (domTargetChild !== null) {
                    domTargetChild.textContent = finalValue;
                  }
                  if (document.querySelector("." + where + "_gray") !== null) {
                    domTargetGray = document.querySelector("." + where + "_gray");
                    domTargetGrayChild = null;
                    for (let i of domTargetGray.children) {
                      if (i.getAttribute("column") === column) {
                        domTargetGrayChild = i;
                      }
                    }
                    if (domTargetGrayChild !== null) {
                      domTargetGrayChild.textContent = finalValue;
                    }
                  }
                }
              }

              if (document.querySelector(".totalWhite") !== null) {
                white = document.querySelector(".totalWhite");
                if (white.hasAttribute("index")) {
                  if (white.getAttribute("index") === where) {
                    //white update start
                    whiteChildren = white.firstChild.children[1].firstChild.children;
                    whiteTarget = null;
                    for (let dom of whiteChildren) {
                      if (dom.getAttribute("index") === column) {
                        whiteTarget = dom.children[1];
                      }
                    }
                    if (whiteTarget !== null) {
                      whiteTarget.textContent = finalValue;
                    }
                  }
                }
              }

              //end
            } else if (obj.email !== undefined && obj.prompt !== undefined && obj.url !== undefined) {
              if (Array.isArray(obj.email)) {
                if (obj.email.includes(GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail)) {
                  const promptResult = window.prompt(obj.prompt);
                  GeneralJs.ajax({ result: (promptResult ? 1 : 0) }, obj.url, () => {});
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
      local_funcs.entireSse = es;
    }

    if (/Electron/gi.test(window.navigator.userAgent)) {
      GeneralJs.stacks.deviceInfo = null;
      GeneralJs.setQueue(async () => {
        try {
          const { ipcRenderer } = require("electron");
          GeneralJs.stacks.deviceInfo = GeneralJs.equalJson(ipcRenderer.sendSync("synchronous-message", "device"));;
          GeneralJs.stacks.memberInfo = await GeneralJs.ajaxJson({ type: "this", mac: GeneralJs.stacks.deviceInfo.networkInterfaces.map((obj) => { return obj.mac; }) }, "/getMembers");

          GeneralJs.stacks.wssSocket = new WebSocket("wss://" + FILEHOST + ":5000/general");
          GeneralJs.stacks.wssSocket.onopen = () => {

            GeneralJs.stacks.wssSocket.onmessage = (event) => {
              try {
                const data = GeneralJs.equalJson(event.data);
                if (data.participants.to.includes(GeneralJs.stacks.memberInfo.memid)) {
                  if (data.method.alarm) {
                    ipcRenderer.send("asynchronous-message", data.contents.message);
                  }
                  if (data.method.alert) {
                    window.alert(data.contents.message);
                  }
                }
              } catch {
                // pass
              }
            }

            GeneralJs.stacks.wssSocket.send(JSON.stringify({ device: GeneralJs.stacks.deviceInfo, message: "alive" }));
            setInterval(() => {
              GeneralJs.stacks.wssSocket.send(JSON.stringify({ device: GeneralJs.stacks.deviceInfo, message: "alive" }));
            }, 30 * 1000);

          }
        } catch (e) {
          console.log(e);
        }
      });
    }

    {
      const { createNode, createNodes, withOut, colorChip } = GeneralJs;
      const zIndex = 10;
      const ea = "px";
      let height;

      height = 20;

      createNode({
        mother: document.body,
        event: {
          click: function (e) {
            window.close();
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(height) + ea,
          background: "transparent",
          zIndex: String(zIndex),
          "-webkit-app-region": "drag",
        }
      });



    }


    //on green left
    // if (GeneralJs.stacks["grayLeftButton"] !== undefined && GeneralJs.stacks["grayLeftButton"] !== null) {
    //   await GeneralJs.sleep(200);
    //   GeneralJs.stacks["grayLeftButton"].click();
    // }

  } catch (e) {
    GeneralJs.ajax("message=" + "exec : " + JSON.stringify(e.message) + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  window.location.reload();
  GeneralJs.ajax("message=" + "exec : " + JSON.stringify(e.message) + "&channel=#error_log", "/sendSlack", function () {});
  console.log(e);
});
