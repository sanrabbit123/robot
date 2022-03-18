const ContentsJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.totalMother = null;
  this.totalFather = null;
  this.ea = "px";
}

ContentsJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  const { contentsArr } = this;
  const { createNode, withOut, colorChip } = GeneralJs;
  let totalMother;
  let scrollTong;
  let boxMargin;
  let boxNumber, boxWidth;
  let tongPaddingLeft;
  let num;
  let pidFontSize, pidFontWeight, pidTextTop;

  tongPaddingLeft = 30;
  boxMargin = 10;
  boxWidth = 120;

  pidFontSize = 21;
  pidFontWeight = 400;
  pidTextTop = -4;

  boxNumber = Math.floor((window.innerWidth - (tongPaddingLeft * 2) + boxMargin) / (boxMargin + boxWidth));
  boxWidth = (window.innerWidth - (tongPaddingLeft * 2) + boxMargin - (boxNumber * boxMargin)) / boxNumber;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: withOut(belowHeight, ea),
    }
  });

  this.totalMother = totalMother;

  scrollTong = createNode({
    mother: totalMother,
    style: {
      width: withOut(tongPaddingLeft * 2, ea),
      height: "auto",
      position: "relative",
      padding: String(tongPaddingLeft) + ea,
    }
  });

  num = 0;
  for (let contents of contentsArr) {
    createNode({
      mother: scrollTong,
      attribute: {
        conid: contents.conid,
        proid: contents.proid,
        desid: contents.desid,
        cliid: contents.cliid,
      },
      event: {
        mouseenter: function (e) {
          this.style.background = colorChip.liteGreen;
          this.firstChild.style.color = colorChip.green;
        },
        mouseleave: function (e) {
          this.style.background = colorChip.gray1;
          this.firstChild.style.color = colorChip.deactive;
        },
        click: this.whitePopupEvent(contents.conid),
      },
      style: {
        display: "inline-flex",
        width: String(boxWidth) + ea,
        height: String(boxWidth) + ea,
        background: colorChip.gray1,
        marginRight: String(num % boxNumber === boxNumber - 1 ? 0 : boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        cursor: "pointer",
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        {
          text: contents.contents.portfolio.pid,
          style: {
            position: "relative",
            fontFamily: "graphik",
            fontSize: String(pidFontSize) + ea,
            fontWeight: String(pidFontWeight),
            color: colorChip.deactive,
            top: String(pidTextTop) + ea,
            transition: "all 0.5s ease",
          }
        }
      ]
    });
    num++;
  }

}

ContentsJs.prototype.whitePopupEvent = function (conid) {
  const instance = this;
  const { ea, totalMother, belowHeight, contentsArr } = this;
  const { createNode, withOut, colorChip } = GeneralJs;
  return function (e) {
    const contents = contentsArr.search("conid", conid);
    let cancelBack, whiteBoard;
    let margin;
    let zIndex;

    margin = 30;
    zIndex = 2;

    cancelBack = createNode({
      mother: totalMother,
      event: {
        click: (e) => {
          totalMother.removeChild(totalMother.lastChild);
          totalMother.removeChild(totalMother.lastChild);
        }
      },
      style: {
        position: "fixed",
        background: colorChip.black,
        opacity: String(0),
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: withOut(belowHeight, ea),
        animation: "justfadein 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

    whiteBoard = createNode({
      mother: totalMother,
      style: {
        position: "fixed",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        top: String(margin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin * 2 + belowHeight, ea),
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        animation: "fadeuphard 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

  }
}

ContentsJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    const loading = await this.mother.loadingRun();

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
    }

    const contentsArr = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getContents", { equal: true });
    const projects = await ajaxJson({ noFlat: true, whereQuery: { $or: contentsArr.map((obj) => { return { proid: obj.proid } }) } }, "/getProjects", { equal: true });
    const clients = await ajaxJson({ noFlat: true, whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, "/getClients", { equal: true });
    const designers = await ajaxJson({ noFlat: true, whereQuery: { $or: contentsArr.map((obj) => { return { proid: obj.desid } }) } }, "/getDesigners", { equal: true });

    this.contentsArr = new SearchArray(contentsArr);
    this.clients = new SearchArray(clients);
    this.projects = new SearchArray(projects);
    this.designers = new SearchArray(designers);

    loading.parentElement.removeChild(loading);

    this.baseMaker();

    window.addEventListener("resize", (e) => {
      window.location.reload();
    })

  } catch (e) {
    console.log(e);
  }
}
