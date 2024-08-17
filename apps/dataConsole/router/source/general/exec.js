const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const local_funcs = new /<%name%>/Js();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {

    await local_funcs.mother.loginBox();
    local_funcs.mother.generalCss();
    local_funcs.mother.greenBar();
    local_funcs.mother.communicationBox();

    await local_funcs.launching();
    local_funcs.mother.generalStacks();

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
