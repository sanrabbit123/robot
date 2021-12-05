const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const local_funcs = new /<%name%>/Js();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
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
    await local_funcs.launching();

  } catch (e) {
    console.log(e);
  }
});
