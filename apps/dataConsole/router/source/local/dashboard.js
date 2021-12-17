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
  const vh = "vh";
  const thisHost = window.location.protocol + "//" + window.location.host;
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
  let tempMother;
  let titleSize, subSize, lineHeight;
  let title2Size;

  outerMargin = <%% 30, 30, 28, 24, 4 %%>;
  innerMargin = <%% 5, 5, 4, 3, 1 %%>;
  whiteRadius = <%% 8, 8, 7, 6, 3 %%>;

  titleSize = 2.8;
  title2Size = 2.4;
  subSize = 2.3;
  lineHeight = 1.1;
  lineHeight2 = 1.25;

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

  firstMother = createNode({
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
          display: "flex",
          width: boxWidth0,
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          backgroundImage: "url('/middle/meeting/back.jpg')",
          backgroundSize: "100% auto",
          backgroundPosition: "50% 50%",
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        },
      },
    ]
  });
  onlineBlock = firstMother.firstChild;
  webBlock = firstMother.lastChild;

  secondMother = createNode({
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
          cursor: "pointer",
        },
        event: { click: (e) => { window.location.href = thisHost + "/client"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "신규 고객 응대\n<b%Sales%b>",
            style: {
              color: colorChip.black,
              fontSize: String(titleSize) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.green,
              fontSize: String(subSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
            }
          }
        ]
      },
      {
        style: {
          position: "relative",
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "프로젝트 케어\n<b%Care%b>",
            style: {
              color: colorChip.black,
              fontSize: String(titleSize) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.green,
              fontSize: String(subSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
            }
          }
        ]
      },
      {
        style: {
          position: "relative",
          width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
          height: boxHeight1,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginRight: String(innerMargin) + ea,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "시공\n관리",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "촬영\n조정",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
      },
    ]
  });
  clientBlock = secondMother.children[0];
  projectBlock = secondMother.children[1];
  constructBlock = secondMother.children[2];
  photoBlock = secondMother.children[3];

  thirdMother = createNode({
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
          width: boxWidth0,
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
          marginRight: String(innerMargin) + ea,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/proposal"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "웹 제안서 관리\n<b%Proposal%b>",
            style: {
              color: colorChip.black,
              fontSize: String(titleSize) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.green,
              fontSize: String(subSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
            }
          }
        ]
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
              display: "flex",
              width: boxWidth0,
              height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
              borderRadius: String(5) + ea,
              backgroundImage: "url('/middle/proposal/back.jpg')",
              backgroundSize: "100% auto",
              backgroundPosition: "50% 50%",
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              marginBottom: String(innerMargin) + ea,
            },
          },
          {
            style: {
              position: "relative",
              display: "flex",
              width: boxWidth0,
              height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
              borderRadius: String(5) + ea,
              backgroundImage: "url('/middle/curation/back.jpg')",
              backgroundSize: "100% auto",
              backgroundPosition: "50% 50%",
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            },
          },
        ]
      },
      {
        style: {
          position: "relative",
          height: boxHeight0,
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        event: { click: (e) => { window.location.href = thisHost + "/designer"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "디자이너 관리\n<b%Designer%b>",
            style: {
              color: colorChip.black,
              fontSize: String(titleSize) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.green,
              fontSize: String(subSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
            }
          }
        ]
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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "신청자\n관리",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "체크\n리스트",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "일정\n관리",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          verticalAlign: "top",
        },
        event: { click: (e) => { window.location.href = thisHost + "/project"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "의뢰서\n관리",
            style: {
              color: colorChip.black,
              fontSize: String(title2Size) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight2),
            }
          }
        ]
      },
    ]
  });
  [ proposalBlock, tempMother, designerBlock, aspirantBlock, checklistBlock, calendarBlock, requestBlock ] = [ ...thirdMother.children ];
  [ constructConsoleBlock, designerConsoleBlock ] = [ ...tempMother.children ];

  fourthMother = createNode({
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
  noticeBlock = fourthMother;

  this.whiteBlocks = { onlineBlock, webBlock, clientBlock, projectBlock, constructBlock, photoBlock, proposalBlock, constructConsoleBlock, designerConsoleBlock, designerBlock, aspirantBlock, checklistBlock, calendarBlock, requestBlock, noticeBlock };

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
