const local_funcs = new /<%name%>/Js();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    local_funcs.mother.generalCss();
    local_funcs.mother.greenBar();
    await local_funcs.launching();
    await local_funcs.mother.loginBox();
  } catch (e) {
    console.log(e);
  }
});

document.addEventListener("error", function (e) {
  console.log(e);
});
