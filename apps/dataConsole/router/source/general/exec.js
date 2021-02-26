const local_funcs = new /<%name%>/Js();

window.localStorage.clear();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    local_funcs.mother.generalCss();
    local_funcs.mother.greenBar();
    await local_funcs.launching();
    await local_funcs.mother.loginBox();

    //SSE
    const sseTarget = [
      "client",
      "contents",
      "designer",
      "project"
    ];
    const thisPath = window.location.pathname.split("?")[0].replace(/\//g, '');
    if (sseTarget.includes(thisPath)) {
      const es = new EventSource("https://homeliaison-console.xyz:3000/sse/get_" + thisPath);
      es.addEventListener("updateTong", function (e) {
        let domTarget, domTargetChild, domTargetGray, domTargetGrayChild;
        if (/^{/.test(e.data)) {
          const obj = JSON.parse(e.data);
          if (obj.path !== undefined && obj.who !== undefined && obj.where !== undefined && obj.column !== undefined && obj.value !== undefined && obj.date !== undefined) {
            const { path, who, where, column, value, date } = obj;
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
                  domTargetGray.firstChild.textContent = who;
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
          }
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  window.location.reload();
  console.log(e);
});
