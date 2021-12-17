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
      display: "inline-block",
      height: "calc(100% - " + String(belowHeight) + ea + ")",
      background: colorChip.gray1
    }
  });

  this.totalMother = totalMother;
}

DashboardJs.prototype.whiteBoards = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth, totalMother } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let outerMargin;
  let motherBox;
  let childrenBox;
  let middleBox;
  let innerMargin;
  let boxWidth0, boxWidth1;
  let boxHeight0, boxHeight1;
  let whiteRadius;
  let onlineBlock, webBlock, clientBlock, projectBlock, constructBlock, photoBlock, proposalBlock, constructConsoleBlock, designerConsoleBlock, designerBlock, aspirantBlock, checklistBlock, calendarBlock, requestBlock, noticeBlock;
  let firstMother, secondMother, thirdMother, fourthMother;

  outerMargin = <%% 30, 30, 28, 24, 4 %%>;
  innerMargin = <%% 5, 5, 4, 3, 1 %%>;
  whiteRadius = <%% 8, 8, 7, 6, 3 %%>;

  boxWidth0 = boxHeight0 = "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2) + (innerMargin * 2)) + ea + ") / " + String(2.5) + ")";
  boxWidth1 = boxHeight1 = "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2) + (innerMargin * 2)) + ea + ") / " + String(5) + ")";

  totalMother.style["min-width"] = "calc(" + boxWidth0 + " * 4.5)";

  motherBox = createNode({
    mother: totalMother,
    style: {
      position: "relative",
      display: "block",
      width: withOut(outerMargin * 2, ea),
      height: withOut(outerMargin * 2, ea),
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
    }
  });

  createNode({
    mother: motherBox,
    style: {
      position: "relative",
      display: "inline-block",
      width: boxWidth0,
      height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
      marginRight: String(innerMargin) + ea,
      verticalAlign: "top",
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.1s forwards",
    },
    children: [
      {
        style: {
          position: "relative",
          display: "block",
          width: boxWidth0,
          height: "calc(calc(100% - " + boxHeight1 + ") - " + String(innerMargin) + ea + ")",
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "block",
          width: boxWidth0,
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        },
      },
    ]
  });

  createNode({
    mother: motherBox,
    style: {
      position: "relative",
      display: "inline-block",
      width: boxWidth0,
      height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
      marginRight: String(innerMargin) + ea,
      verticalAlign: "top",
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.2s forwards",
    },
    children: [
      {
        style: {
          position: "relative",
          display: "block",
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "block",
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginRight: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        },
      },
    ]
  });

  createNode({
    mother: motherBox,
    style: {
      position: "relative",
      display: "inline-block",
      width: "calc(calc(" + boxWidth0 + " * 2) + " + String(innerMargin) + ea + ")",
      height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
      marginRight: String(innerMargin) + ea,
      verticalAlign: "top",
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.3s forwards",
    },
    children: [
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
          marginRight: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: boxWidth0,
          height: boxHeight0,
          marginBottom: String(innerMargin) + ea,
        },
        children: [
          {
            style: {
              position: "relative",
              display: "block",
              width: boxWidth0,
              height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
              borderRadius: String(5) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              marginBottom: String(innerMargin) + ea,
            },
          },
          {
            style: {
              position: "relative",
              display: "block",
              width: boxWidth0,
              height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
              borderRadius: String(5) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            },
          },
        ]
      },
      {
        style: {
          position: "relative",
          display: "block",
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginRight: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginRight: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginRight: String(innerMargin) + ea,
        },
      },
      {
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        },
      },
    ]
  });

  createNode({
    mother: motherBox,
    style: {
      position: "relative",
      display: "inline-block",
      width: "calc(calc(100vw - " + String((outerMargin * 2) + (innerMargin * 4)) + ea + ") - calc(" + boxWidth0 + " * 4))",
      height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
      borderRadius: String(whiteRadius) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
      verticalAlign: "top",
      transition: "all 0s ease",
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.4s forwards",
    },
  });




}


DashboardJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.whiteBlocks = {};

    this.baseMaker();
    this.whiteBoards();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
