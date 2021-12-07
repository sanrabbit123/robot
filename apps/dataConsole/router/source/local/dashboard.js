const DashboardJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

DashboardJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let totalMother;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      height: "calc(100% - " + String(belowHeight) + ea + ")",
      background: colorChip.gray1
    }
  });

  this.totalMother = totalMother;
}

DashboardJs.prototype.boardFlex = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth, totalMother } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let outerMargin;
  let motherBox;
  let childrenBox;
  let middleBox;
  let innerMargin;
  let x, y;

  outerMargin = <%% 36, 36, 36, 36, 4 %%>;
  innerMargin = <%% 6, 6, 6, 6, 1 %%>;

  x = 3;
  y = 6;

  motherBox = createNode({
    mother: totalMother,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: withOut(outerMargin * 2, ea),
      height: withOut(outerMargin * 2, ea),
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
    }
  });

  for (let j = 0; j < x; j++) {
    middleBox = createNode({
      mother: motherBox,
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        height: String(j === x - 1 ? 100 : 200) + '%',
        marginBottom: String(j === x - 1 ? 0 : innerMargin) + ea,
      }
    });
    for (let i = 0; i < (j !== x - 1 ? y : y * 2); i++) {
      childrenBox = createNode({
        mother: middleBox,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
          borderRadius: String(12) + "px",
          background: colorChip.white,
          marginLeft: String(i === 0 ? 0 : innerMargin) + ea,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        }
      });
    }
  }

}


DashboardJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.baseMaker();
    this.boardFlex();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
