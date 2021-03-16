const local_funcs = new /<%name%>/Js();

document.getElementById("totalcontents").style.height = String(window.innerHeight) + "px";

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    local_funcs.mother.generalCss();
    local_funcs.mother.greenBar();
    await local_funcs.launching();
    await local_funcs.mother.loginBox();
    local_funcs.mother.dashboardBox();
    local_funcs.mother.generalStacks();

    //SSE
    const sseTarget = [
      "client",
      "contents",
      "designer",
      "project",
      "photo"
    ];
    const thisPath = window.location.pathname.split("?")[0].replace(/\//g, '');
    if (sseTarget.includes(thisPath)) {
      const es = new EventSource("https://" + SSEHOST + ":3000/sse/get_" + thisPath);
      es.addEventListener("updateTong", function (e) {
        let domTarget, domTargetChild, domTargetGray, domTargetGrayChild;
        if (/^{/.test(e.data)) {
          const obj = JSON.parse(e.data);
          if (obj.path !== undefined && obj.who !== undefined && obj.where !== undefined && obj.column !== undefined && obj.value !== undefined && obj.date !== undefined) {

            //start
            const { path, who, where, column, value, date } = obj;
            let white, whiteChildren, whiteTarget;
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
                  domTargetChild.textContent = value;
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
                    domTargetGrayChild.textContent = value;
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
                    whiteTarget.textContent = value;
                  }
                  //white update end
                }
              }
            }

            //end
          }
        }
      });
    }

    //on green left
    // if (GeneralJs.stacks["grayLeftButton"] !== undefined && GeneralJs.stacks["grayLeftButton"] !== null) {
    //   await GeneralJs.sleep(200);
    //   GeneralJs.stacks["grayLeftButton"].click();
    // }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  window.location.reload();
  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
  console.log(e);
});
