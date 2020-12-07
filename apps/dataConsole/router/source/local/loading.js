const LoadingJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
}

LoadingJs.prototype.loadingRun = function () {
  const instance = this;
  let loading;
  let style;
  let ea = "px";
  let width, height;

  loading = this.mother.returnLoadingIcon();
  width = 50;
  height = 50;
  style = {
    width: String(width) + ea,
    height: String(height) + ea,
    top: "calc(calc(100% - " + String(this.mother.belowHeight) + ea + ") / 2 - " + String(width / 2) + ea + ")",
    left: "calc(50% - " + String(height / 2) + ea + ")",
  };

  for (let i in style) {
    loading.style[i] = style[i];
  }

  this.totalContents.appendChild(loading);
}

LoadingJs.prototype.notionUpdate = async function (idTarget) {
  const instance = this;
  try {
    let cliid, desid;
    let message;
    let cdBoo;

    message = null;
    cdBoo = true;

    if (/^c/.test(idTarget)) {
      cliid = idTarget;
      message = JSON.parse(await GeneralJs.ajaxPromise("cliid=" + cliid, "/notionUpdate"));
      cdBoo = true;
    } else if (/^d/.test(idTarget)) {
      desid = idTarget;
      message = JSON.parse(await GeneralJs.ajaxPromise("desid=" + desid, "/notionUpdate"));
      cdBoo = false;
    }

    if (message !== null && message.message === "success") {
      window.location.href = window.location.protocol + "//" + window.location.host + "/" + (cdBoo ? "client?cliid=" + cliid : "designer?desid=" + desid);
    }

  } catch (e) {
    console.log(e);
  }
}

LoadingJs.prototype.launching = async function () {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();

    this.loadingRun();
    if (getObj.notionUpdate !== undefined) {
      await this.notionUpdate(getObj.notionUpdate);
    }

  } catch (e) {
    console.log(e);
  }
}
