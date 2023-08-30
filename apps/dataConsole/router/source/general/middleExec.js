const app = new /<%name%>/Js();
const appName = "/<%name%>/";

document.getElementById("totalcontents").style.height = String(window.innerHeight) + "px";

document.addEventListener("DOMContentLoaded", function (e) {
  app.mother.generalCss();
  app.mother.loadingRun().then(app.launching.bind(app)).catch(function (err) {
    throw new Error(err);
  });
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  GeneralJs.ajaxJson({
    message: "middleExec : " + e.message + " (" + appName + ")",
    channel: "#error_log"
  }, "/sendSlack").catch((err) => { console.log(err); });
  window.location.href = "https://home-liaison.com";
});

document.addEventListener("error", function (e) {
  GeneralJs.ajaxJson({
    message: "middleExec : " + e.message + " (" + appName + ")",
    channel: "#error_log"
  }, "/sendSlack").catch((err) => { console.log(err); });
  window.location.href = "https://home-liaison.com";
});
