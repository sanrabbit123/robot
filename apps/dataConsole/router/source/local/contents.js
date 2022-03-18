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
      width: String(100) + '%',
      height: "auto",
      position: "relative",
    }
  });

  for (let contents of contentsArr) {
    createNode({
      mother: scrollTong,
      style: {
        display: "inline-flex",
        width: String(120) + ea,
        height: String(120) + ea,
        background: colorChip.gray1,
        marginRight: String(10) + ea,
        marginBottom: String(10) + ea,
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

  } catch (e) {
    console.log(e);
  }
}
