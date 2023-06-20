const app = new /<%name%>/Js();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    let loadingIcon;

    app.mother.generalCss();
    app.mother.setGeneralProperties(app);
    loadingIcon = await app.mother.loadingRun();
    app.mother.setGeneralBase(app);
    await app.launching(loadingIcon);
    
  } catch (e) {
    console.log(e);
  }
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  window.location.reload();
  console.log(e);
});
