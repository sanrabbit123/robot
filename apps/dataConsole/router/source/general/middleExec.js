const app = new /<%name%>/Js();

document.getElementById("totalcontents").style.height = String(window.innerHeight) + "px";

document.addEventListener("DOMContentLoaded", function (e) {
  app.mother.generalCss();
  app.mother.loadingRun().then(app.launching.bind(app)).catch(function (err) {
    throw new Error(err);
  });
});

document.addEventListener("error", function (e) {
  window.localStorage.clear();
  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
  window.location.href = "https://home-liaison.com";
});

document.addEventListener("error", function (e) {
  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
  window.location.href = "https://home-liaison.com";
});
