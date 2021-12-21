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
  const { members, slackNotices } = this;
  const { createNode, colorChip, withOut, blankHref, isMac, cleanChildren, setQueue, ajaxJson } = GeneralJs;
  const vh = "vh";
  const memberTongClassName = "memberTong";
  const serverTongClassName = "serverTong";
  const noticeTongClassName = "noticeTong";
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
  let memberBlockTop, memberBlockTop2, memberBlockLeft;
  let memberBlockSize;
  let memberBlockPaddingRight;
  let homeliaisonWifiKey, hubSeongSuWifiKey;
  let alive;
  let serverTargets;
  let noticeTong;
  let noticeSize, noticeDateSize;
  let noticePaddingLeft, noticePaddingTop, noticePaddingBottom;
  let noticeMarginBottom;
  let onlineTextTop;

  outerMargin = <%% 30, 30, 28, 24, 4 %%>;
  innerMargin = <%% 5, 5, 4, 3, 1 %%>;
  whiteRadius = <%% 8, 8, 7, 6, 3 %%>;

  titleSize = 2.6;
  title2Size = 2.3;
  title3Size = 2.3;
  subSize = 2;
  lineHeight = 1.02;
  lineHeight2 = 1.25;
  visualTop = -4;
  visualTop2 = isMac() ? -3 : 0;

  onlineWordingSize = 1.7;
  onlineBoxTitleTop = 2.2;
  onlineBoxLeft = 2.7;
  onlineBoxTop = 5.4;
  onlineTextTop = isMac() ? 0 : 0.2;

  onlineBoxHeight0 = 33.2;
  onlineBoxBetween = 1;
  memberBlockPaddingLeft = 1.1;
  memberBlockMarginBottom = <%% 10, 9, 8, 7, 1 %%>;
  onlineBoxInnerMarginTop = 2;
  memberBlockWidth = <%% 5, 5, 4, 3, 1 %%>;
  memberBlockTop = <%% 6, 6, 5, 4, 1 %%>;
  memberBlockTop2 = <%% 8, 8, 7, 6, 1 %%>;
  memberBlockLeft = 0.1;
  memberBlockSize = <%% 14, 13, 12, 11, 3 %%>;
  memberBlockPaddingRight = 1;

  noticeSize = 1.2;
  noticeDateSize = 0.8;
  noticePaddingLeft = 1.5;
  noticePaddingTop = isMac() ? 1 : 1.2;
  noticePaddingBottom = 1.4;
  noticeMarginBottom = 0.5;

  serverTargets = [
    {
      name: "Console server",
      alive: () => {
        return true;
      }
    },
    {
      name: "File server",
      alive: () => {
        return true;
      }
    },
    {
      name: "Graphic server",
      alive: () => {
        return true;
      }
    },
    {
      name: "Sms server",
      alive: () => {
        return true;
      }
    },
    {
      name: "Monitor server",
      alive: () => {
        return true;
      }
    },
    {
      name: "Bill Server",
      alive: () => {
        return true;
      }
    },
    {
      name: "Bridge Server",
      alive: () => {
        return true;
      }
    },
  ];

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
        event: { click: (e) => { blankHref(FRONTHOST, true); } },
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

  memberReload = async () => {
    try {
      const members = instance.members;
      const onlineStatus = await ajaxJson({}, "https://" + FILEHOST + "/officeMonitor/status", { equal: true });
      let alive;
      for (let member of members) {
        alive = (onlineStatus[member.id] === true || onlineStatus[member.id] === "true");
        if (alive) {
          member.alive = "online";
        } else {
          member.alive = "offline";
        }
      }
      cleanChildren(memberTong);
      for (let member of members) {
        createNode({
          mother: memberTong,
          style: {
            display: "block",
            position: "relative",
            width: withOut(memberBlockPaddingLeft * 1, vh),
            paddingLeft: String(memberBlockPaddingLeft) + vh,
            marginBottom: String(memberBlockMarginBottom) + ea,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnRound(String(memberBlockWidth / 2) + ea, member.alive !== "offline" ? colorChip.green : colorChip.gray4),
              style: {
                position: "absolute",
                width: String(memberBlockWidth) + ea,
                height: "",
                top: String(memberBlockTop) + ea,
                left: String(memberBlockLeft) + vh,
              }
            },
            {
              text: member.name + " " + member.title + "님",
              style: {
                display: "inline-block",
                position: "relative",
                background: colorChip.white,
                fontSize: String(memberBlockSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                paddingRight: String(memberBlockPaddingRight) + vh,
                top: String(onlineTextTop) + vh,
              }
            },
            {
              text: member.alive,
              style: {
                position: "absolute",
                right: String(0),
                top: String(0),
                background: colorChip.white,
                fontSize: String(memberBlockSize) + ea,
                fontWeight: String(300),
                fontFamily: "graphik",
                color: member.alive !== "offline" ? colorChip.green : colorChip.gray4,
              }
            }
          ]
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  memberReload().then(() => {
    return GeneralJs.sleep(3000);
  }).then(() => {
    return memberReload();
  }).catch((err) => {
    console.log(err);
  });

  setInterval(async () => {
    try {
      await memberReload();
    } catch (e) {
      console.log(e);
    }
  }, 30 * 1000);

  for (let server of serverTargets) {
    createNode({
      mother: serverTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(memberBlockPaddingLeft * 1, vh),
        paddingLeft: String(memberBlockPaddingLeft) + vh,
        marginBottom: String(memberBlockMarginBottom) + ea,
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnRound(String(memberBlockWidth / 2) + ea, server.alive() ? colorChip.green : colorChip.gray4),
          style: {
            position: "absolute",
            width: String(memberBlockWidth) + ea,
            height: "",
            top: String(memberBlockTop2) + ea,
            left: String(memberBlockLeft) + vh,
          }
        },
        {
          text: server.name,
          style: {
            display: "inline-block",
            position: "relative",
            background: colorChip.white,
            fontSize: String(memberBlockSize) + ea,
            fontWeight: String(300),
            fontFamily: "graphik",
            color: colorChip.black,
            paddingRight: String(memberBlockPaddingRight) + vh,
          }
        },
        {
          text: server.alive() ? "online" : "offline",
          style: {
            position: "absolute",
            right: String(0),
            top: String(0),
            background: colorChip.white,
            fontSize: String(memberBlockSize) + ea,
            fontWeight: String(300),
            fontFamily: "graphik",
            color: server.alive() ? colorChip.green : colorChip.gray4,
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
              fontWeight: String(500),
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
              fontWeight: String(500),
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=construct"; } },
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=contents"; } },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: "컨텐츠\n관리",
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
              fontWeight: String(500),
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
            event: { click: (e) => { blankHref("https://" + FILEHOST + "/publicSector/estimation", true); } },
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
            event: { click: (e) => { blankHref(window.location.protocol + "//" + window.location.host + "/middle/console?desid=d1701_aa01s", true); } },
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
              fontWeight: String(500),
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=aspirant"; } },
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=checklist"; } },
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=possible"; } },
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
        event: { click: (e) => { window.location.href = thisHost + "/designer?mode=request"; } },
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
      paddingTop: String(onlineBoxTop) + vh,
      display: "inline-block",
      width: "calc(calc(100vw - " + String((outerMargin * 2) + (innerMargin * 4)) + ea + ") - calc(" + boxWidth0 + " * 4))",
      height: "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ") - " + String(onlineBoxTop) + vh + ")",
      borderRadius: String(whiteRadius) + ea,
      background: colorChip.gray1,
      boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
      verticalAlign: "top",
      transition: "all 0s ease",
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.4s forwards",
    },
    children: [
      {
        text: "Notice",
        style: {
          position: "absolute",
          fontSize: String(onlineWordingSize) + vh,
          fontFamily: "graphik",
          fontWeight: String(400),
          top: String(onlineBoxTitleTop) + vh,
          left: String(onlineBoxLeft) + vh,
          color: colorChip.black,
        }
      },
      {
        class: [ noticeTongClassName ],
        style: {
          display: "block",
          position: "relative",
          left: String(onlineBoxLeft) + vh,
          width: withOut(onlineBoxLeft * 2, vh),
          height: String(100) + '%',
          overflow: "scroll",
        },
      }
    ]
  });
  noticeBlock = fourthMother;
  noticeTong = fourthMother.querySelector("." + noticeTongClassName);

  for (let { text, user, date } of slackNotices) {
    createNode({
      mother: noticeTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        marginBottom: String(noticeMarginBottom) + vh,
      },
      children: [
        {
          text: "<u%" + String(date.getFullYear()).slice(2) + "." + String(date.getMonth() + 1) + "." + String(date.getDate()) + " " + String(date.getHours()) + ":" + String(date.getDate()) + "%u>\n" + "<b%" + user + "%b> : " + text.replace(/\<[^\>]+\>/g, '').trim(),
          style: {
            paddingTop: String(noticePaddingTop) + vh,
            paddingLeft: String(noticePaddingLeft) + vh,
            paddingRight: String(noticePaddingLeft) + vh,
            paddingBottom: String(noticePaddingBottom) + vh,
            fontSize: String(noticeSize) + vh,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
          },
          bold: {
            fontSize: String(noticeSize) + vh,
            fontWeight: String(600),
            color: colorChip.black,
          },
          under: {
            fontSize: String(noticeDateSize) + vh,
            fontWeight: String(600),
            color: colorChip.deactive,
          }
        }
      ]
    })

  }

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
    this.members = (await ajaxJson({ type: "get" }, "/getMembers", { equal: true })).filter((obj) => { return obj.alive });
    this.slackNotices = await ajaxJson({ channel: "000_master_notice" }, "https://" + FILEHOST + "/slackMessages", { equal: true });

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
