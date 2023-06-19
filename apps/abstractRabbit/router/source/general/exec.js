const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const local_funcs = new /<%name%>/Js();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    local_funcs.mother.generalCss();
    await local_funcs.launching();
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
