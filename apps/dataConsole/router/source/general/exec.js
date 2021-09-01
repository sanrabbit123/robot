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
    local_funcs.mother.dashboardBox();
    local_funcs.mother.generalStacks();
    if (typeof local_funcs.lateLaunching === "function") {
      await local_funcs.lateLaunching();
    }

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
      es.addEventListener("updateTong", function (e) {
        let domTarget, domTargetChild, domTargetGray, domTargetGrayChild;
        if (/^{/.test(e.data)) {
          const obj = JSON.parse(e.data);
          if (obj.path !== undefined && obj.who !== undefined && obj.where !== undefined && obj.column !== undefined && obj.value !== undefined && obj.date !== undefined) {
            //start
            const { path, who, where, column, value, date } = obj;
            let finalValue;
            let white, whiteChildren, whiteTarget;

            finalValue = value;
            if (typeof value !== "string") {
              finalValue = String(value);
            }
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
      });
      local_funcs.entireSse = es;
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
