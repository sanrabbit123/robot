const EstimationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {
    paddingTop: 38,
    height: 18,
    marginBottom: 18,
    initialLine: 14,
    initialMargin: 14,
  }
  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.standardDoms = [];
  this.caseDoms = [];
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
  this.divisionMap = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.ea = "px";
}

EstimationJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { dateToString, returnGet, setQueue } = GeneralJs;
    const getObj = returnGet();
    let getTarget;
    let tempFunction;
    let cardViewInitial;

    cardViewInitial = (getObj.cliid === undefined);
    if (typeof getObj.specificids === "string") {
      cardViewInitial = false;
    }

    this.cardViewInitial = cardViewInitial;
    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.backGrayBar();
    await this.spreadData();
    this.addTransFormEvent();
    this.addSearchEvent();
    this.addExtractEvent();
    this.whiteResize();
    this.communicationRender();
    this.boardSwipe();

    getTarget = null;
    if (typeof getObj.specificids === "string") {
      tempFunction = this.makeSearchEvent("id:" + getObj.specificids);
      await tempFunction({ key: "Enter" });
    } else {
      if (!cardViewInitial) {
        for (let dom of this.standardDoms) {
          if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
            getTarget = dom;
          }
        }
        if (getTarget === null || getObj.view === "row") {
          tempFunction = this.makeSearchEvent(getObj.cliid);
          await tempFunction({ key: "Enter" });
          for (let dom of this.standardDoms) {
            if ((new RegExp(getObj.cliid, 'gi')).test(dom.textContent)) {
              getTarget = dom;
            }
          }
        }
        if (getTarget !== null) {
          if (getObj.view !== "row") {
            getTarget.click();
          }
        }
      } else {
        instance.cardViewMaker().call(instance.mother.belowButtons.square.up, {
          instantMode: true
        });
      }
    }

  } catch (e) {
    GeneralJs.ajax({ message: "EstimationJs 프론트 스크립트 문제 생김 " + e.message, channel: "#error_log" }, "/sendSlack", function () {});
    console.log(e);
  }
}
