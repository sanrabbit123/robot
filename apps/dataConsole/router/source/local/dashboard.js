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
      background: colorChip.gray3
    }
  });

  this.totalMother = totalMother;
}

DashboardJs.prototype.whiteBoards = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth, totalMother } = this;
  const { onlineStatus, members, slackNotices } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  const vh = "vh";
  const memberTongClassName = "memberTong";
  const serverTongClassName = "serverTong";
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
  let title2Size, title3Size;
  let visualTop, visualTop2;
  let onlineBoxTop, onlineBoxTitleTop, onlineBoxLeft;
  let onlineWordingSize;
  let onlineBoxHeight0, onlineBoxBetween;
  let onlineBoxInnerMargin;
  let onlineBoxInnerMarginTop;
  let memberTong, serverTong;
  let memberBlockPaddingLeft;
  let memberBlockMarginBottom;
  let memberBlockWidth;
  let memberBlockTop, memberBlockLeft;
  let memberBlockSize;
  let memberBlockPaddingRight;
  let homeliaisonWifiKey, hubSeongSuWifiKey;
  let alive;

  outerMargin = <%% 30, 30, 28, 24, 4 %%>;
  innerMargin = <%% 5, 5, 4, 3, 1 %%>;
  whiteRadius = <%% 8, 8, 7, 6, 3 %%>;

  titleSize = 2.6;
  title2Size = 2.3;
  title3Size = 2.3;
  subSize = 2.2;
  lineHeight = 1.1;
  lineHeight2 = 1.25;
  visualTop = -4;
  visualTop2 = -3;

  onlineWordingSize = 2;
  onlineBoxTitleTop = 2.4;
  onlineBoxLeft = 2.6;
  onlineBoxTop = 6;

  onlineBoxHeight0 = 42;
  onlineBoxBetween = 1;
  memberBlockPaddingLeft = 1.1;
  memberBlockMarginBottom = 0.95;
  onlineBoxInnerMarginTop = 2;
  memberBlockWidth = 0.5;
  memberBlockTop = 0.71;
  memberBlockLeft = 0.1;
  memberBlockSize = 1.45;
  memberBlockPaddingRight = 1;

  console.log(onlineStatus);

  homeliaisonWifiKey = Object.keys(onlineStatus).find(str => { return /^e/gi.test(str) });
  hubSeongSuWifiKey = Object.keys(onlineStatus).find(str => { return /^w/gi.test(str) });
  if (hubSeongSuWifiKey === undefined) {
    hubSeongSuWifiKey = null;
  }

  for (let member of members) {
    alive = (onlineStatus[homeliaisonWifiKey].alive.findIndex((str) => { return (new RegExp((member.name + " " + member.title), "gi")).test(str) }) !== -1);
    if (alive) {
      member.alive = "homeliaison";
    } else {
      alive = (onlineStatus[hubSeongSuWifiKey].alive.findIndex((str) => { return (new RegExp((member.name + " " + member.title), "gi")).test(str) }) !== -1);
      if (alive) {
        member.alive = "hubSeongsu";
      } else {
        member.alive = "offline";
      }
    }
  }

  console.log(members);

  // console.log(onlineStatus, members, slackNotices);



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
          paddingTop: String(onlineBoxTop) + vh,
          display: "block",
          width: boxWidth0,
          height: "calc(calc(calc(100% - " + boxHeight1 + ") - " + String(innerMargin) + ea + ") - " + String(onlineBoxTop) + vh + ")",
          borderRadius: String(whiteRadius) + ea,
          background: colorChip.white,
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(innerMargin) + ea,
        },
        children: [
          {
            text: "Online",
            style: {
              position: "absolute",
              fontSize: String(onlineWordingSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
              top: String(onlineBoxTitleTop) + vh,
              left: String(onlineBoxLeft) + vh,
              color: colorChip.green,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
              left: String(onlineBoxLeft) + vh,
              width: withOut(onlineBoxLeft * 2, vh),
              height: String(onlineBoxHeight0) + vh,
              boxSizing: "border-box",
              border: "1px solid " + colorChip.gray4,
              borderRadius: String(5) + "px",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(onlineBoxInnerMarginTop) + vh,
                  left: String(onlineBoxInnerMarginTop) + vh,
                  width: withOut(onlineBoxInnerMarginTop * 2, vh),
                  height: withOut(onlineBoxInnerMarginTop * 2, vh),
                  overflow: "scroll",
                },
                children: [
                  {
                    class: [ memberTongClassName ],
                    style: {
                      display: "block",
                      position: "relative",
                      top: String(0),
                      left: String(0),
                      width: String(100) + '%',
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              marginTop: String(onlineBoxBetween) + vh,
              left: String(onlineBoxLeft) + vh,
              width: withOut(onlineBoxLeft * 2, vh),
              height: withOut(onlineBoxHeight0 + onlineBoxBetween + onlineBoxLeft, vh),
              boxSizing: "border-box",
              border: "1px solid " + colorChip.gray4,
              borderRadius: String(5) + "px",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(onlineBoxInnerMarginTop) + vh,
                  left: String(onlineBoxInnerMarginTop) + vh,
                  width: withOut(onlineBoxInnerMarginTop * 2, vh),
                  height: withOut(onlineBoxInnerMarginTop * 2, vh),
                  overflow: "scroll",
                },
                children: [
                  {
                    class: [ serverTongClassName ],
                    style: {
                      display: "block",
                      position: "relative",
                      top: String(0),
                      left: String(0),
                      width: String(100) + '%',
                    }
                  }
                ]
              }
            ]
          },
        ]
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
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        event: { click: (e) => { window.location.href = thisHost + "/designer"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "HomeLiaison web",
            style: {
              color: colorChip.whiteBlack,
              fontSize: String(title3Size) + vh,
              textAlign: "center",
              fontWeight: String(500),
              lineHeight: String(lineHeight),
              fontFamily: "graphik",
              position: "relative",
              top: String(visualTop) + ea,
              fontStyle: "italic",
            },
          }
        ]
      },
    ]
  });
  onlineBlock = firstMother.firstChild;
  webBlock = firstMother.lastChild;

  memberTong = firstMother.querySelector('.' + memberTongClassName);
  serverTong = firstMother.querySelector('.' + serverTongClassName);

  for (let member of members) {
    createNode({
      mother: memberTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(memberBlockPaddingLeft * 1, vh),
        paddingLeft: String(memberBlockPaddingLeft) + vh,
        marginBottom: String(memberBlockMarginBottom) + vh,
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnRound(String(memberBlockWidth / 2) + vh, member.alive !== "offline" ? colorChip.green : colorChip.gray4),
          style: {
            position: "absolute",
            width: String(memberBlockWidth) + vh,
            height: String(memberBlockWidth) + vh,
            top: String(memberBlockTop) + vh,
            left: String(memberBlockLeft) + vh,
          }
        },
        {
          text: member.name + " " + member.title + "님",
          style: {
            display: "inline-block",
            position: "relative",
            background: colorChip.white,
            fontSize: String(memberBlockSize) + vh,
            fontWeight: String(400),
            color: colorChip.black,
            paddingRight: String(memberBlockPaddingRight) + vh,
          }
        }
      ]
    });
  }








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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
          background: colorChip.gradientGreen,
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
              color: colorChip.whiteBlack,
              fontSize: String(titleSize) + vh,
              textAlign: "center",
              fontWeight: String(600),
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.whiteBlack,
              fontSize: String(subSize) + vh,
              fontFamily: "graphik",
              fontWeight: String(400),
              opacity: String(0.7),
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
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            event: { click: (e) => { window.location.href = thisHost + "/designer"; } },
            children: [
              {
                class: [ "hoverDefault_lite" ],
                text: "Builder console",
                style: {
                  color: colorChip.whiteBlack,
                  fontSize: String(title3Size) + vh,
                  textAlign: "center",
                  fontWeight: String(500),
                  lineHeight: String(lineHeight),
                  fontFamily: "graphik",
                  position: "relative",
                  top: String(visualTop) + ea,
                  fontStyle: "italic",
                },
              }
            ]
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
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            event: { click: (e) => { window.location.href = thisHost + "/designer"; } },
            children: [
              {
                class: [ "hoverDefault_lite" ],
                text: "Designer console",
                style: {
                  color: colorChip.whiteBlack,
                  fontSize: String(title3Size) + vh,
                  textAlign: "center",
                  fontWeight: String(500),
                  lineHeight: String(lineHeight),
                  fontFamily: "graphik",
                  position: "relative",
                  top: String(visualTop) + ea,
                  fontStyle: "italic",
                },
              }
            ]
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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
          background: colorChip.gray1,
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
              fontWeight: String(500),
              lineHeight: String(lineHeight2),
              position: "relative",
              top: String(visualTop2) + ea,
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
      background: colorChip.gray1,
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
    const { ajaxJson } = GeneralJs;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.whiteBlocks = {};
    this.onlineStatus = await ajaxJson({}, "https:" + OFFICEHOST.split(':')[1] + "/officeMonitor/status", { equal: true });
    this.members = (await ajaxJson({ type: "get" }, "/getMembers", { equal: true })).filter((obj) => { return obj.alive });
    this.slackNotices = await ajaxJson({ channel: "000_master_notice" }, "https:" + OFFICEHOST.split(':')[1] + "/slackMessages", { equal: true });

    this.baseMaker();
    this.whiteBoards();

  } catch (e) {
    ajaxJson({
      message: "DashboardJs.prototype.launching error : " + e.message,
      channel: "#error_log"
    }, "/sendSlack").catch((err) => {
      console.log(err);
    });
    console.log(e);
  }
}
