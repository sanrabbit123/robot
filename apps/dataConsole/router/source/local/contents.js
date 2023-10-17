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

ContentsJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  const { contentsArr } = this;
  const { createNode, withOut, colorChip } = GeneralJs;
  const photoChar = 't';
  try {
    let totalMother;
    let scrollTong;
    let tongPaddingLeft;
    let areaInnerPadding;
    let contentsTitle;
    let contentsBox;
    let startTop;
    let titleBoxHeight, contentsBoxHeight;
    let titleSize;
    let belowArea;
    let controlPannelWidth;
    let belowAreaBetween;
    let belowAreaBetweenGaro;
    let belowAreaHeight;
    let belowAreaLeft, belowAreaRight;
    let belowContentsBox, belowScrollTong;
    let belowMiddle;
    let belowMiddleContentsBox;
    let belowMiddleScrollTong;
    let belowRightContentsBox;
    let belowRightScrollTong;
    let areaInnerPaddingRight;

    areaInnerPadding = 16;
    areaInnerPaddingRight = 12;
    tongPaddingLeft = 30;
    startTop = 16;

    titleBoxHeight = 36;
    contentsBoxHeight = ((window.innerHeight - belowHeight) / 2) - startTop - titleBoxHeight;
    titleSize = 15;

    belowAreaBetween = 16;
    belowAreaBetweenGaro = 10;

    controlPannelWidth = 240;

    belowAreaHeight = ((window.innerHeight - belowHeight) - (startTop + titleBoxHeight + contentsBoxHeight + belowAreaBetweenGaro)) - tongPaddingLeft;
  
    this.belowAreaBetween = belowAreaBetween;
    this.controlPannelWidth = controlPannelWidth;

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        paddingTop: String(startTop) + ea,
        height: withOut(belowHeight + startTop, ea),
      }
    });
  
    this.totalMother = totalMother;
  
    // main
    contentsTitle = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(tongPaddingLeft * 2, ea),
        height: String(titleBoxHeight) + ea,
        marginLeft: String(tongPaddingLeft) + ea,
        justifyContent: "start",
        alignItems: "center",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>발행된 컨텐츠",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        bold: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(300),
          color: colorChip.green,
        }
      }
    });
    contentsBox = createNode({
      mother: totalMother,
      style: {
        display: "block",
        position: "relative",
        width: withOut(tongPaddingLeft * 2, ea),
        height: String(contentsBoxHeight) + ea,
        marginLeft: String(tongPaddingLeft) + ea,
        border: "1px solid " + colorChip.gray3,
        overflow: "scroll",
        borderRadius: String(5) + "px",
        marginBottom: String(belowAreaBetweenGaro) + ea,
      }
    });
    scrollTong = createNode({
      mother: contentsBox,
      style: {
        width: withOut(areaInnerPadding * 2, ea),
        marginLeft: String(areaInnerPadding) + ea,
        paddingTop: String(areaInnerPadding) + ea,
        paddingBottom: String(areaInnerPadding * 6) + ea,
        height: "auto",
        position: "relative",
      }
    });
    belowArea = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        flexDirection: "row",
        width: withOut(tongPaddingLeft * 2, ea),
        marginLeft: String(tongPaddingLeft) + ea,
        height: String(belowAreaHeight) + ea,
      }
    });

    // forecast
    belowAreaLeft = createNode({
      mother: belowArea,
      style: {
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        width: withOut((controlPannelWidth + belowAreaBetween) * 2, ea),
        height: withOut(0, ea),
        marginRight: String(belowAreaBetween) + ea,
      }
    });
    createNode({
      mother: belowAreaLeft,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleBoxHeight) + ea,
        justifyContent: "start",
        alignItems: "center",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>발행 예정 컨텐츠",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        bold: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(300),
          color: colorChip.green,
        }
      }
    });
    belowContentsBox = createNode({
      mother: belowAreaLeft,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(titleBoxHeight, ea),
        border: "1px solid " + colorChip.gray3,
        overflow: "scroll",
        borderRadius: String(5) + "px",
      }
    });
    belowScrollTong = createNode({
      mother: belowContentsBox,
      style: {
        width: withOut(areaInnerPadding * 2, ea),
        marginLeft: String(areaInnerPadding) + ea,
        paddingTop: String(areaInnerPadding) + ea,
        paddingBottom: String(areaInnerPadding * 6) + ea,
        height: "auto",
        position: "relative",
      }
    });

    // etc
    belowMiddle = createNode({
      mother: belowArea,
      style: {
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        width: String(controlPannelWidth) + ea,
        height: withOut(0, ea),
        marginRight: String(belowAreaBetween) + ea,
      }
    });
    createNode({
      mother: belowMiddle,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleBoxHeight) + ea,
        justifyContent: "start",
        alignItems: "center",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>기타 사진",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        bold: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(300),
          color: colorChip.green,
        }
      }
    });
    belowMiddleContentsBox = createNode({
      mother: belowMiddle,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(titleBoxHeight, ea),
        border: "1px solid " + colorChip.gray3,
        overflow: "scroll",
        borderRadius: String(5) + "px",
      }
    });
    belowMiddleScrollTong = createNode({
      mother: belowMiddleContentsBox,
      style: {
        width: withOut(areaInnerPadding * 2, ea),
        marginLeft: String(areaInnerPadding) + ea,
        paddingTop: String(areaInnerPadding) + ea,
        paddingBottom: String(areaInnerPadding * 6) + ea,
        height: "auto",
        position: "relative",
      }
    });

    // designers
    belowAreaRight = createNode({
      mother: belowArea,
      style: {
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        width: String(controlPannelWidth) + ea,
        height: withOut(0, ea),
      }
    });
    createNode({
      mother: belowAreaRight,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleBoxHeight) + ea,
        justifyContent: "start",
        alignItems: "center",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>디자이너",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        bold: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(300),
          color: colorChip.green,
        }
      }
    });
    belowRightContentsBox = createNode({
      mother: belowAreaRight,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(titleBoxHeight, ea),
        border: "1px solid " + colorChip.gray3,
        overflow: "scroll",
        borderRadius: String(5) + "px",
      }
    });
    belowRightScrollTong = createNode({
      mother: belowRightContentsBox,
      style: {
        width: withOut(areaInnerPadding * 2, ea),
        marginLeft: String(areaInnerPadding) + ea,
        paddingTop: String(areaInnerPaddingRight) + ea,
        paddingBottom: String(areaInnerPadding * 6) + ea,
        height: "auto",
        position: "relative",
      }
    });

    this.scrollTong = scrollTong;
    this.belowScrollTong = belowScrollTong;
    this.belowMiddleScrollTong = belowMiddleScrollTong;
    this.belowRightScrollTong = belowRightScrollTong;

    await this.spreadContents();
    await this.spreadForeContents();
    await this.spreadEtcContents();
    await this.spreadDesigners();
    
  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.spreadContents = async function (search = null, designerOnly = false) {
  const instance = this;
  const { ea, totalContents, scrollTong } = this;
  const { contentsArr, designers, clients } = this;
  const { createNode, withOut, colorChip, cleanChildren, isMac } = GeneralJs;
  const photoChar = "mobile/mot";
  try {
    let boxMargin;
    let boxNumber, boxWidth;
    let num;
    let pidFontSize, pidFontWeight, pidTextTop;
    let pidPaddingLeft, pidPaddingTop, pidPaddingBottom;
    let tongPaddingLeft;
    let contentsTong;
    let designer, client;
    let boo;
    let areaInnerPadding;
    let thisClient, thisDesigner;
  
    areaInnerPadding = 16;
    tongPaddingLeft = 30;
  
    boxMargin = 4;
    boxWidth = 160;
    pidFontSize = 12;
    pidFontWeight = 800;
    pidTextTop = -3;
    pidPaddingLeft = 12;
    pidPaddingTop = 8;
    pidPaddingBottom = 4;
  
    boxNumber = Math.floor((window.innerWidth - ((tongPaddingLeft * 2) + (areaInnerPadding * 2)) + boxMargin) / (boxMargin + boxWidth));
    boxWidth = (window.innerWidth - ((tongPaddingLeft * 2) + (areaInnerPadding * 2)) + boxMargin - (boxNumber * boxMargin)) / boxNumber;
  
    cleanChildren(scrollTong);
  
    if (typeof search === "string") {
      contentsTong = [];
      for (let contents of contentsArr) {
        designer = designers.search("desid", contents.desid);
        client = clients.search("cliid", contents.cliid);
        boo = false;
        if ((new RegExp(search, "gi")).test(designer.designer)) {
          boo = true;
        }
        if (client !== null && !designerOnly) {
          if ((new RegExp(search, "gi")).test(client.name)) {
            boo = true;
          }
        }
        if (boo) {
          contentsTong.push(contents);
        }
      }
  
    } else {
      contentsTong = contentsArr.toNormal();
    }
  
    num = 0;
    this.conidTong = [];
    this.contentsTong = contentsTong;
    for (let contents of contentsTong) {

      thisClient = clients.search("cliid", contents.cliid);
      thisDesigner = designers.search("desid", contents.desid);

      createNode({
        mother: scrollTong,
        attribute: {
          conid: contents.conid,
          proid: contents.proid,
          desid: contents.desid,
          cliid: contents.cliid,
        },
        event: {
          contextmenu: this.whitePopupEvent(contents.conid),
          click: this.whiteIframeEvent(contents.contents.portfolio.pid),
        },
        style: {
          display: "inline-block",
          width: String(boxWidth) + ea,
          background: colorChip.gray1,
          marginRight: String(num % boxNumber === boxNumber - 1 ? 0 : boxMargin) + ea,
          marginBottom: String(boxMargin) + ea,
          cursor: "pointer",
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            text: "<b%" + contents.contents.portfolio.pid + " :%b> " + (thisClient === null ? "개인 <u%/%u> " : thisClient.name + " C <u%/%u> ") + thisDesigner.designer + " D",
            style: {
              position: "relative",
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(pidFontWeight),
              color: colorChip.black,
              top: String(pidTextTop) + ea,
              transition: "all 0.5s ease",
              paddingLeft: String(pidPaddingLeft) + ea,
              paddingTop: String(pidPaddingTop) + ea,
              paddingBottom: String(pidPaddingBottom) + ea
            },
            bold: {
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
            under: {
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(200),
              color: colorChip.deactive,
            }
          },
          {
            mode: "img",
            attribute: {
              src: `${S3HOST}/corePortfolio/listImage/${contents.contents.portfolio.pid}/${photoChar + String(contents.contents.portfolio.detailInfo.photodae[1]) + contents.contents.portfolio.pid + ".jpg"}`,
            },
            style: {
              position: "relative",
              width: String(100) + '%',
            }
          }
        ]
      });
      num++;
      this.conidTong.push(contents.conid);
    }

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.spreadForeContents = async function (search = null, designerOnly = false) {
  const instance = this;
  const { ea, totalContents, belowScrollTong } = this;
  const { foreContents, designers, clients, projects, belowAreaBetween, controlPannelWidth } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref } = GeneralJs;
  try {
    let boxMargin;
    let boxNumber, boxWidth;
    let num;
    let pidFontSize, pidFontWeight, pidTextTop;
    let pidPaddingLeft, pidPaddingTop, pidPaddingBottom;
    let tongPaddingLeft;
    let contentsTong;
    let designer, client;
    let boo;
    let areaInnerPadding;
    let thisClient, thisProject, thisDesigner;

    areaInnerPadding = 16;
    tongPaddingLeft = 30;
  
    boxMargin = 4;
    boxWidth = 160;
    pidFontSize = 12;
    pidFontWeight = 800;
    pidTextTop = -3;
    pidPaddingLeft = 12;
    pidPaddingTop = 8;
    pidPaddingBottom = 4;

    boxNumber = Math.floor((window.innerWidth - ((tongPaddingLeft * 2) + (areaInnerPadding * 2)) - ((controlPannelWidth + belowAreaBetween) * 2) + boxMargin) / (boxMargin + boxWidth));
    boxWidth = (window.innerWidth - ((tongPaddingLeft * 2) + (areaInnerPadding * 2)) - ((controlPannelWidth + belowAreaBetween) * 2) + boxMargin - (boxNumber * boxMargin)) / boxNumber;
  
    cleanChildren(belowScrollTong);
  
    if (typeof search === "string") {
      contentsTong = [];
      for (let contents of foreContents) {
        designer = designers.search("desid", contents.desid);
        client = contents.client;
        boo = false;
        if ((new RegExp(search, "gi")).test(designer.designer)) {
          boo = true;
        }
        if (client !== "" && !designerOnly) {
          if ((new RegExp(search, "gi")).test(client.name)) {
            boo = true;
          }
        }
        if (boo) {
          contentsTong.push(contents);
        }
      }

    } else {
      contentsTong = foreContents.toNormal();
    }
  
    num = 0;
    for (let contents of contentsTong) {

      thisProject = projects.search("proid", contents.proid);
      thisClient = clients.search("cliid", thisProject.cliid);
      thisDesigner = designers.search("desid", contents.desid);

      createNode({
        mother: belowScrollTong,
        attribute: {
          proid: contents.proid,
          desid: contents.desid,
          pid: contents.pid,
        },
        event: {
          click: instance.whiteIframeEvent(contents.pid),
        },
        style: {
          display: "inline-block",
          width: String(boxWidth) + ea,
          background: colorChip.gray1,
          marginRight: String(num % boxNumber === boxNumber - 1 ? 0 : boxMargin) + ea,
          marginBottom: String(boxMargin) + ea,
          cursor: "pointer",
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            text: "<b%" + contents.pid + " :%b> " + (thisClient === null ? "개인 <u%/%u> " : thisClient.name + " C <u%/%u> ") + thisDesigner.designer + " D",
            style: {
              position: "relative",
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(pidFontWeight),
              color: colorChip.black,
              top: String(pidTextTop) + ea,
              transition: "all 0.5s ease",
              paddingLeft: String(pidPaddingLeft) + ea,
              paddingTop: String(pidPaddingTop) + ea,
              paddingBottom: String(pidPaddingBottom) + ea
            },
            bold: {
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
            under: {
              fontSize: String(pidFontSize) + ea,
              fontWeight: String(200),
              color: colorChip.deactive,
            }
          },
          {
            mode: "img",
            attribute: {
              src: S3HOST + contents.forecast.filter((o) => { return o.gs === 'g' })[0].file,
            },
            style: {
              position: "relative",
              width: String(100) + '%',
            }
          }
        ]
      });
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.spreadEtcContents = async function (desid = null) {
  const instance = this;
  const { ea, totalContents, belowMiddleScrollTong } = this;
  const { designers } = this;
  const { createNode, withOut, colorChip, cleanChildren, ajaxJson } = GeneralJs;
  try {
    let thisDesigner;
    let boxMargin;
    let boxWidth;

    boxMargin = 4;
    boxWidth = 208;

    cleanChildren(belowMiddleScrollTong);

    if (desid !== null) {

      thisDesigner = designers.search("desid", desid);
      for (let { link, sgTrue } of thisDesigner.setting.ghost) {
        createNode({
          mother: belowMiddleScrollTong,
          attribute: {
            desid: thisDesigner.desid,
          },
          event: {
            click: this.whiteIframeEvent(thisDesigner.desid),
          },
          style: {
            display: "inline-block",
            width: String(boxWidth) + ea,
            background: colorChip.gray1,
            marginRight: String(0) + ea,
            marginBottom: String(boxMargin) + ea,
            cursor: "pointer",
            borderRadius: String(5) + "px",
            verticalAlign: "top",
            overflow: "hidden",
          },
          children: [
            {
              mode: "img",
              attribute: {
                src: S3HOST + link,
              },
              style: {
                position: "relative",
                width: String(100) + '%',
              }
            }
          ]
        });
      }

    }
  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.spreadDesigners = async function () {
  const instance = this;
  const { ea, totalContents, belowRightScrollTong } = this;
  const { contentsArr, foreContents, designers, clients, projects, belowAreaBetween, controlPannelWidth } = this;
  const { createNode, withOut, colorChip, cleanChildren, svgMaker } = GeneralJs;
  const designerBasicBlockClassName = "designerBasicBlockClassName";
  const designerCheckClassName = "designerCheckClassName";
  const designerNameClassName = "designerNameClassName";
  const designerIdClassName = "designerIdClassName";
  const designerStatusClassName = "designerStatusClassName";
  try {
    let basicBlockHeight;
    let blockMarginBottom;
    let fontSize;
    let basicBlock;
    let fontWeight;
    let subSize;
    let subWeight;
    let nameTextTop, desidTextTop;
    let checkAreaWidth, nameAreaWidth, idAreaWidth;
    let checkboxWidth;
    let nameColor, idColor, statusColor;
    let checkboxColor;
    let nameDeactiveColor;
    let idDeactiveColor;
    let statusDeactiveColor;
    let checkboxDeactiveColor;
    let nameActiveColor;
    let idActiveColor;
    let statusActiveColor;
    let checkboxActiveColor;
    let targetDesigners;
    let designerSelectionEvent;

    basicBlockHeight = 24;
    blockMarginBottom = 2;

    fontSize = 13;
    fontWeight = 700;

    subSize = 12;
    subWeight = 300;

    nameTextTop = 0;
    desidTextTop = 1;

    checkAreaWidth = 14;
    nameAreaWidth = 40;
    idAreaWidth = 80;

    checkboxWidth = 8;

    nameActiveColor = colorChip.green;
    idActiveColor = colorChip.green;
    statusActiveColor = colorChip.black;
    checkboxActiveColor = colorChip.gray3;

    nameDeactiveColor = colorChip.deactive;
    idDeactiveColor = colorChip.gray3;
    statusDeactiveColor = colorChip.deactive;
    checkboxDeactiveColor = colorChip.gray2;

    designerSelectionEvent = () => {
      return async function (e) {
        const self = this;
        const desid = this.getAttribute("desid");
        const designer = instance.designers.search("desid", desid);
        const { deactive, active } = JSON.parse(this.getAttribute("color"));
        const toggle = this.getAttribute("toggle");
        try {
          const targets = document.querySelectorAll('.' + designerBasicBlockClassName);
          if (toggle === "off") {
            for (let dom of targets) {
              if (dom === self) {
                dom.querySelector('.' + designerCheckClassName).querySelector(".checkbox").style.opacity = String(1);
                dom.querySelector('.' + designerCheckClassName).querySelector(".uncheckbox").style.opacity = String(0);
                dom.querySelector('.' + designerNameClassName).style.color = active.name;
                dom.querySelector('.' + designerIdClassName).style.color = active.id;
                dom.querySelector('.' + designerStatusClassName).style.color = active.status;
                dom.setAttribute("toggle", "on");
              } else {
                dom.querySelector('.' + designerCheckClassName).querySelector(".checkbox").style.opacity = String(0);
                dom.querySelector('.' + designerCheckClassName).querySelector(".uncheckbox").style.opacity = String(1);
                dom.querySelector('.' + designerNameClassName).style.color = deactive.name;
                dom.querySelector('.' + designerIdClassName).style.color = deactive.id;
                dom.querySelector('.' + designerStatusClassName).style.color = deactive.status;
                dom.setAttribute("toggle", "off");
              }
            }
            if (designer !== null) {
              await instance.spreadContents(designer.designer, true);
              await instance.spreadForeContents(designer.designer, true);
              await instance.spreadEtcContents(designer.desid);
            } else {
              await instance.spreadContents(null, false);
              await instance.spreadForeContents(null, false);
              await instance.spreadEtcContents(null);
            }
          } else {
            for (let dom of targets) {
              dom.querySelector('.' + designerCheckClassName).querySelector(".checkbox").style.opacity = String(0);
              dom.querySelector('.' + designerCheckClassName).querySelector(".uncheckbox").style.opacity = String(1);
              dom.querySelector('.' + designerNameClassName).style.color = JSON.parse(dom.getAttribute("color")).original.name;
              dom.querySelector('.' + designerIdClassName).style.color = JSON.parse(dom.getAttribute("color")).original.id;
              dom.querySelector('.' + designerStatusClassName).style.color = JSON.parse(dom.getAttribute("color")).original.status;
              dom.setAttribute("toggle", "off");
            }
            await instance.spreadContents(null, false);
            await instance.spreadForeContents(null, false);
            await instance.spreadEtcContents(null);
          }
        } catch (e) {
          console.log(e);
          window.location.reload();
        }
      }
    }

    targetDesigners = designers.toNormal();
    for (let designer of targetDesigners) {
      designer.contentsLength = contentsArr.toNormal().filter((c) => { return c.desid === designer.desid }).length + foreContents.toNormal().filter((c) => { return c.desid === designer.desid }).length;
    }
    targetDesigners.sort((a, b) => { return b.contentsLength - a.contentsLength });
    targetDesigners.unshift({
      designer: "전체",
      desid: "d0000_aa00s",
      information: {
        contract: {
          status: "협약 완료",
        }
      },
      entire: true
    });

    for (let designer of targetDesigners) {

      if (/협약 완료/gi.test(designer.information.contract.status)) {
        nameColor = colorChip.black;
        idColor = colorChip.green;
        statusColor = colorChip.black;
        checkboxColor = colorChip.gray3;
      } else if (/협약 휴직/gi.test(designer.information.contract.status)) {
        nameColor = colorChip.liteBlack;
        idColor = colorChip.softGreen;
        statusColor = colorChip.liteBlack;
        checkboxColor = colorChip.gray3;
      } else if (/협약 해지/gi.test(designer.information.contract.status)) {
        nameColor = colorChip.deactive;
        idColor = colorChip.gray3;
        statusColor = colorChip.deactive;
        checkboxColor = colorChip.gray2;
      } else {
        nameColor = colorChip.deactive;
        idColor = colorChip.gray3;
        statusColor = colorChip.deactive;
        checkboxColor = colorChip.gray2;
      }

      basicBlock = createNode({
        mother: belowRightScrollTong,
        attribute: {
          desid: designer.desid,
          designer: designer.designer,
          color: JSON.stringify({
            original: {
              name: nameColor,
              id: idColor,
              status: statusColor,
              checkbox: checkboxColor,
            },
            deactive: {
              name: nameDeactiveColor,
              id: idDeactiveColor,
              status: statusDeactiveColor,
              checkbox: checkboxDeactiveColor,
            },
            active: {
              name: nameActiveColor,
              id: idActiveColor,
              status: statusActiveColor,
              checkbox: checkboxActiveColor,
            }
          }),
          toggle: "off",
        },
        class: [ designerBasicBlockClassName ],
        event: {
          click: designerSelectionEvent(),
        },
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: withOut(0, ea),
          height: String(basicBlockHeight) + ea,
          marginBottom: String(blockMarginBottom) + ea,
          cursor: "pointer",
        }
      });

      createNode({
        mother: basicBlock,
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(checkAreaWidth) + ea,
          height: withOut(0, ea),
          overflow: "hidden",
          justifyContent: "start",
          alignItems: "center",
        },
        child: {
          mode: "svg",
          source: svgMaker.checkBox(checkboxColor),
          class: [ designerCheckClassName ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(checkboxWidth) + ea,
            top: String(0) + ea,
          }
        }
      });

      createNode({
        mother: basicBlock,
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(nameAreaWidth) + ea,
          height: withOut(0, ea),
          overflow: "hidden",
          justifyContent: "start",
          alignItems: "center",
        },
        child: {
          class: [ designerNameClassName ],
          text: designer.designer,
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(fontWeight),
            color: nameColor,
            top: String(nameTextTop) + ea,
          }
        }
      });

      createNode({
        mother: basicBlock,
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(idAreaWidth) + ea,
          height: withOut(0, ea),
          overflow: "hidden",
          justifyContent: "start",
          alignItems: "center",
        },
        child: {
          class: [ designerIdClassName ],
          text: designer.entire === true ? "" : designer.desid,
          style: {
            position: "relative",
            fontSize: String(subSize) + ea,
            fontWeight: String(subWeight),
            color: idColor,
            top: String(desidTextTop) + ea,
          }
        }
      });

      createNode({
        mother: basicBlock,
        attribute: {
          desid: designer.desid,
        },
        style: {
          display: "inline-flex",
          position: "absolute",
          width: String(100) + ea,
          height: withOut(0, ea),
          overflow: "hidden",
          justifyContent: "end",
          alignItems: "center",
          right: String(0),
          top: String(0),
        },
        child: {
          class: [ designerStatusClassName ],
          text: designer.entire === true ? "" : "<b%--->%b>&nbsp;&nbsp;" + designer.information.contract.status,
          style: {
            position: "relative",
            fontSize: String(subSize) + ea,
            fontWeight: String(fontWeight),
            color: statusColor,
            top: String(desidTextTop) + ea,
          },
          bold: {
            fontSize: String(subSize) + ea,
            fontWeight: String(200),
            color: colorChip.deactive,
          }
        }
      });

      this.designersTong.push(basicBlock);

    }

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.whitePopupEvent = function (conid) {
  const instance = this;
  const { ea, totalMother, belowHeight, contentsArr, clients, designers, projects, whitePopupClassName } = this;
  const { createNode, withOut, colorChip, ajaxJson, setQueue, serviceParsing, cleanChildren, isMac, fireEvent } = GeneralJs;
  const photoChar = 't';
  const blank = "&nbsp;&nbsp;/&nbsp;&nbsp;";
  const serviceName = serviceParsing().name;
  const tendencyConst = 10;
  const relativeConst = 10;
  const tagMultiplyConst = 3;
  const tendencyKey = [
    {
      target: "style",
      name: "스타일 경향성",
      order: [
        "modern",
        "classic",
        "natural",
        "mixmatch",
        "scandinavian",
        "vintage",
        "oriental",
        "exotic",
      ],
      map: {
        modern: "모던",
        classic: "클래식",
        natural: "내추럴",
        mixmatch: "믹스매치",
        scandinavian: "북유럽",
        vintage: "빈티지",
        oriental: "오리엔탈",
        exotic: "이그저틱",
      }
    },
    {
      target: "texture",
      name: "텍스처 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "coating",
        "metal",
      ],
      map: {
        darkWood: "진한 우드",
        whiteWood: "연한 우드",
        coating: "도장",
        metal: "금속",
      }
    },
    {
      target: "color",
      name: "컬러톤 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "highContrast",
        "vivid",
        "white",
        "mono",
        "bright",
        "dark",
      ],
      map: {
        darkWood: "다크 우드",
        whiteWood: "밝은 우드",
        highContrast: "고대비",
        vivid: "비비드",
        white: "화이트",
        mono: "모노톤",
        bright: "밝은톤",
        dark: "어두운톤",
      }
    },
    {
      target: "density",
      name: "밀도 경향성",
      order: [
        "maximun",
        "minimum",
      ],
      map: {
        maximun: "맥시멈",
        minimum: "미니멈",
      }
    },
  ];
  const tagAmplification = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tag } } } } = contents;
    const filtered = [ ...new Set(tag.concat(tag.map((str) => {
      return str.replace(/한$/gi, '').replace(/적인$/gi, '').replace(/스러운$/gi, '').replace(/가구$/gi, '').replace(/인테리어$/gi, '').replace(/있는$/gi, '');
    }))) ];
    filtered.conid = conid;
    return filtered;
  }
  const tendencySpread = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tendency } } } } = contents;
    let values;
    values = [];
    for (let { target, order } of tendencyKey) {
      for (let key of order) {
        values.push(tendency[target][key]);
      }
    }
    values.conid = conid;
    return values;
  }
  return function (e) {
    e.stopPropagation();
    e.preventDefault();
    const contents = contentsArr.search("conid", conid);
    const { cliid, proid, desid } = contents;
    const { photos, contents: { portfolio: { pid, detailInfo: { tag, tendency } } } } = contents;
    const client = clients.search("cliid", cliid);
    const designer = designers.search("desid", desid);
    const project = projects.search("proid", proid);
    let cancelBack, whiteBoard;
    let cancelEvent;
    let margin;
    let zIndex;
    let innerMargin;
    let mainTong, leftTong, rightTong;
    let source;
    let photoMargin;
    let seroNum;
    let titleSize, titleWeight;
    let titleMarginBottom;
    let subTitleSize, subTitleWeight;
    let tagTong;
    let tagTongMarginTop, tagTongPadding;
    let tagSize, tagWeight;
    let tagPaddingLeft;
    let tagBetween;
    let tagPaddingTop, tagPaddingBottom;
    let tendencyTong;
    let tendencyTitleWeight;
    let tendencyTitleMarginTop;
    let tendencyTitleMarginBottom;
    let tendencyBarHeight;
    let tendencyBarMarginBottom;
    let tendencyFactorSize, tendencyFactorWeight;
    let tendencyFactorWidth;
    let standardTag;
    let totalTag;
    let firstFiltered;
    let standardTendency;
    let totalTendency;
    let relativeTong;
    let relativeColumn;
    let relativeBetween;
    let j;
    let relativeTitleMarginBottom;
    let tagNum;
    let tagGreenBoo;
    let tagWhiteGreenBoo;
    let tagMaker;

    margin = 30;
    zIndex = 2;
    innerMargin = 40;
    photoMargin = 10;

    titleSize = 28;
    titleWeight = 400;
    titleMarginBottom = 6;

    subTitleSize = 15;
    subTitleWeight = 400;

    tagTongMarginTop = 18;
    tagTongPadding = 16;

    tagSize = 13;
    tagWeight = 400;
    tagPaddingLeft = 12;
    tagBetween = 4;
    tagPaddingTop = 6;
    tagPaddingBottom = 8;

    tendencyTitleWeight = 600;
    tendencyTitleMarginTop = 26;
    tendencyTitleMarginBottom = 8;

    tendencyBarHeight = 14;
    tendencyBarMarginBottom = 3;

    tendencyFactorSize = 12;
    tendencyFactorWeight = 400;
    tendencyFactorWidth = 90;

    relativeColumn = 4;
    relativeBetween = 8;
    relativeTitleMarginBottom = 12;

    cancelEvent = function (e) {
      totalMother.removeChild(totalMother.lastChild);
      totalMother.removeChild(totalMother.lastChild);
    }

    instance.cancelEvent = cancelEvent;

    cancelBack = createNode({
      mother: totalMother,
      event: {
        click: cancelEvent
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
      class: [ whitePopupClassName ],
      attribute: {
        conid,
      },
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

    mainTong = createNode({
      mother: whiteBoard,
      style: {
        padding: String(innerMargin) + ea,
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        position: "relative",
        display: "block",
      }
    });

    leftTong = createNode({
      mother: mainTong,
      style: {
        display: "inline-block",
        width: String(50) + '%',
        height: String(100) + '%',
        position: "relative",
        overflow: "scroll"
      },
      children: [
        {
          style: {
            display: "block",
          }
        }
      ]
    }).firstChild;

    seroNum = 0;
    for (let { index, gs } of photos.detail) {
      source = `${S3HOST}/corePortfolio/listImage/${pid}/${photoChar + String(index) + pid + ".jpg"}`;
      createNode({
        mother: leftTong,
        mode: "img",
        attribute: {
          src: source,
        },
        style: {
          display: "inline-block",
          width: (gs === 'g' ? `calc(calc(calc(100% - ${String(photoMargin * 4)}${ea}) / ${String(4)}) * 2)` : `calc(calc(100% - ${String(photoMargin * 4)}${ea}) / ${String(4)})`),
          marginRight: gs === 'g' ? String(photoMargin) + ea : (seroNum % 2 === 0 ? 0 : String(photoMargin) + ea),
          marginBottom: String(photoMargin) + ea,
          borderRadius: String(5) + "px",
        }
      });
      if (gs === 's') {
        seroNum++;
      }
    }

    rightTong = createNode({
      mother: mainTong,
      style: {
        display: "inline-block",
        width: String(50) + '%',
        height: String(100) + '%',
        position: "relative",
        overflow: "scroll",
      }
    });

    createNode({
      mother: rightTong,
      attribute: {
        pid,
        conid,
      },
      event: {
        click: async function (e) {
          try {
            const pid = this.getAttribute("pid");
            const conid = this.getAttribute("conid");
            let whereQuery, updateQuery;
            
            whereQuery = { conid };
            updateQuery = {};
            updateQuery.conid = conid;
            updateQuery.pid = pid;
            updateQuery.complete = true;
            updateQuery.date = new Date();

            await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/updateContentsStatus");
            instance.contentsStatus = await ajaxJson({ mode: "get", whereQuery: {} }, BACKHOST + "/updateContentsStatus", { equal: true });

            fireEvent(cancelBack, "click");
            await instance.spreadContents(null);

          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        top: String(8) + ea,
        right: String(0),
        width: String(108) + ea,
        height: String(30) + ea,
        display: "inline-flex",
        position: "absolute",
        background: colorChip.gradientGreen,
        borderRadius: String(5) + "px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "스타일 체크 완료",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(isMac() ? -1 : 1) + ea,
          fontSize: String(13) + ea,
          fontWeight: String(700),
          color: colorChip.white,
        }
      }
    })

    createNode({
      mother: rightTong,
      text: pid,
      style: {
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        fontFamily: "graphik",
        color: colorChip.black,
        marginBottom: String(titleMarginBottom) + ea,
      }
    });

    createNode({
      mother: rightTong,
      text: (!(client?.name) ? "" : client.name + " 고객님" + blank) + designer.designer + " 디자이너님",
      style: {
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(subTitleWeight),
        color: colorChip.black,
        paddingLeft: String(1) + ea,
      }
    });

    // tag
    tagTong = createNode({
      mother: rightTong,
      attribute: {
        conid: conid,
      },
      event: {
        click: async function (e) {
          try {
            if (!e.altKey) {
              const conid = this.getAttribute("conid");
              const tag = [ ...this.children ].map((dom) => { return dom.textContent });
              const newTagName = window.prompt("태그명을 입력해주세요!");
              let whereQuery, updateQuery;

              if (newTagName !== '' && newTagName !== null) {

                tag.push(newTagName);
                instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tag.push(newTagName);
                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tag;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                createNode({
                  mother: this,
                  text: newTagName,
                  style: {
                    display: "inline-block",
                    fontSize: String(tagSize) + ea,
                    fontWeight: String(tagWeight),
                    color: colorChip.black,
                    paddingLeft: String(tagPaddingLeft) + ea,
                    paddingRight: String(tagPaddingLeft) + ea,
                    paddingTop: String(tagPaddingTop) + ea,
                    paddingBottom: String(tagPaddingBottom) + ea,
                    background: colorChip.white,
                    borderRadius: String(5) + "px",
                    marginRight: String(tagBetween) + ea,
                    marginBottom: String(tagBetween) + ea,
                  }
                });

              }
            } else {
              e.preventDefault();
              const conid = this.getAttribute("conid");
              const tag = [ ...this.children ].map((dom) => { return dom.textContent });
              let target, targetTag, tong;
              let whereQuery, updateQuery;
              if (e.target !== this) {
                if (e.target.parentElement === this) {
                  target = e.target;
                } else {
                  target = e.target.parentElement;
                }
                targetTag = target.textContent.trim();
                tong = [];
                for (let t of tag) {
                  if (targetTag !== t) {
                    tong.push(t);
                  }
                }
                instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tag = tong;
                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tong;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");
                target.remove();
              }
            }
          } catch (e) {
            console.log(e);
          }
        },
        contextmenu: function (e) {
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        display: "block",
        background: colorChip.gray2,
        borderRadius: String(5) + "px",
        marginTop: String(tagTongMarginTop) + ea,
        padding: String(tagTongPadding) + ea,
        paddingBottom: String(tagTongPadding - tagBetween) + ea,
        cursor: "pointer",
      }
    });

    tagMaker = () => {
      cleanChildren(tagTong);
      tagNum = 0;
      for (let t of tag) {

        tagGreenBoo = false;
        if (tagNum >= 5 && tagNum < 10) {
          tagGreenBoo = true;
        }

        tagWhiteGreenBoo = false;
        if (tagNum >= 10 && tagNum < 17) {
          tagWhiteGreenBoo = true;
        }

        createNode({
          mother: tagTong,
          text: t,
          attribute: {
            conid: conid,
            value: t,
            index: String(tagNum),
          },
          event: {
            contextmenu: async function (e) {
              e.preventDefault();
              e.stopPropagation();
              try {
                const conid = this.getAttribute("conid");
                const value = this.getAttribute("value");
                const index = Number(this.getAttribute("index"));
                let whereQuery, updateQuery;

                tag.splice(index, 1);
                tag.splice(5, 0, value);

                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tag;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                tagMaker();
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "inline-block",
            fontSize: String(tagSize) + ea,
            fontWeight: String(tagWeight),
            color: tagGreenBoo ? colorChip.white : colorChip.black,
            paddingLeft: String(tagPaddingLeft) + ea,
            paddingRight: String(tagPaddingLeft) + ea,
            paddingTop: String(tagPaddingTop) + ea,
            paddingBottom: String(tagPaddingBottom) + ea,
            background: tagGreenBoo ? colorChip.green : (tagWhiteGreenBoo ? colorChip.whiteGreen : colorChip.white),
            borderRadius: String(5) + "px",
            marginRight: String(tagBetween) + ea,
            marginBottom: String(tagBetween) + ea,
          }
        });

        tagNum++;
      }
    }

    tagMaker();

    if (project !== null) {
      createNode({
        mother: rightTong,
        style: {
          display: "block",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          marginTop: String(tagBetween) + ea,
          padding: String(tagTongPadding) + ea,
          paddingBottom: String(tagTongPadding - tagBetween) + ea,
        },
        children: [
          {
            text: serviceName[Number(project.service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1],
            style: {
              display: "inline-block",
              fontSize: String(tagSize) + ea,
              fontWeight: String(tagWeight),
              color: colorChip.black,
              paddingLeft: String(tagPaddingLeft) + ea,
              paddingRight: String(tagPaddingLeft) + ea,
              paddingTop: String(tagPaddingTop) + ea,
              paddingBottom: String(tagPaddingBottom) + ea,
              background: colorChip.white,
              borderRadius: String(5) + "px",
              marginRight: String(tagBetween) + ea,
              marginBottom: String(tagBetween) + ea,
            }
          }
        ]
      });
    }

    // tendency
    for (let { target, name, order, map } of tendencyKey) {
      createNode({
        mother: rightTong,
        text: name,
        style: {
          fontSize: String(subTitleSize) + ea,
          fontWeight: String(tendencyTitleWeight),
          color: colorChip.black,
          marginTop: String(tendencyTitleMarginTop) + ea,
          marginBottom: String(tendencyTitleMarginBottom) + ea,
        }
      });
      for (let key of order) {
        tendencyTong = createNode({
          mother: rightTong,
          style: {
            display: "block",
            height: String(tendencyBarHeight) + ea,
            marginBottom: String(tendencyBarMarginBottom) + ea,
          },
          children: [
            {
              text: map[key],
              style: {
                display: "inline-flex",
                fontSize: String(tendencyFactorSize) + ea,
                fontWeight: String(tendencyFactorWeight),
                color: colorChip.black,
                width: String(tendencyFactorWidth) + ea,
                height: String(100) + '%',
                textAlign: "left",
                alignItems: "center",
                verticalAlign: "top",
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(tendencyFactorWidth, ea),
                height: String(100) + '%',
                verticalAlign: "top",
                overflow: "hidden",
                background: colorChip.gray1,
                borderRadius: String(3) + "px",
              }
            }
          ]
        }).children[1];

        for (let i = 0; i < tendencyConst; i++) {
          createNode({
            mother: tendencyTong,
            class: [ target + "_" + key ],
            attribute: {
              conid: conid,
              target: target,
              key: key,
              value: String(i + 1),
              past: String(i < tendency[target][key] ? 1 : 0),
            },
            event: {
              click: async function (e) {
                try {
                  const conid = this.getAttribute("conid");
                  const target = this.getAttribute("target");
                  const key = this.getAttribute("key");
                  const sibling = [ ...document.querySelectorAll('.' + target + '_' + key) ];
                  const index = Number(this.getAttribute("value"));
                  let whereQuery, updateQuery;

                  whereQuery = { conid };
                  updateQuery = {};
                  updateQuery["contents.portfolio.detailInfo.tendency." + target + "." + key] = index;
                  instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tendency[target][key] = index;
                  await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                  for (let i = 0; i < tendencyConst; i++) {
                    sibling[i].style.opacity = String(i < index ? 1 : 0);
                  }
                  this.setAttribute("past", String(1));

                } catch (e) {
                  console.log(e);
                }
              },
              contextmenu: async function (e) {
                try {
                  e.preventDefault();
                  const conid = this.getAttribute("conid");
                  const target = this.getAttribute("target");
                  const key = this.getAttribute("key");
                  const sibling = [ ...document.querySelectorAll('.' + target + '_' + key) ];
                  const index = 0;
                  let whereQuery, updateQuery;

                  whereQuery = { conid };
                  updateQuery = {};
                  updateQuery["contents.portfolio.detailInfo.tendency." + target + "." + key] = index;
                  instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tendency[target][key] = index;
                  await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                  for (let i = 0; i < tendencyConst; i++) {
                    sibling[i].style.opacity = String(i < index ? 1 : 0);
                  }
                  this.setAttribute("past", String(0));

                } catch (e) {
                  console.log(e);
                }
              },
              mouseenter: function (e) {
                this.setAttribute("past", this.style.opacity);
                this.style.opacity = String(0.4);
              },
              mouseleave: function (e) {
                this.style.opacity = this.getAttribute("past");
              }
            },
            style: {
              display: "inline-block",
              height: String(100) + '%',
              width: "calc(100% / " + String(tendencyConst) + ")",
              background: colorChip.green,
              opacity: String(i < tendency[target][key] ? 1 : 0),
              cursor: "pointer",
              transition: "all 0s ease",
            }
          });
        }
      }
    }

    // relative
    standardTag = tagAmplification(contents);

    totalTag = instance.contentsArr.toNormal().map((obj) => {
      return tagAmplification(obj);
    }).map((arr) => {
      let num;
      num = 0;
      for (let i of arr) {
        if (standardTag.includes(i)) {
          num++;
        }
      }
      arr.number = num;
      return arr;
    });

    totalTag.sort((a, b) => { return b.number - a.number });
    firstFiltered = totalTag.slice(1).slice(0, relativeConst * tagMultiplyConst).map((arr) => { return arr.conid }).map((conid) => {
      return instance.contentsArr.search("conid", conid);
    });

    standardTendency = tendencySpread(contents);
    totalTendency = firstFiltered.map((obj) => {
      return tendencySpread(obj);
    }).map((arr) => {
      let num;
      num = 0;
      for (let i = 0; i < arr.length; i++) {
        num = num + (standardTendency[i] - arr[i]);
      }
      num = num / arr.length;
      arr.number = Math.abs(num);
      return arr;
    });
    totalTendency.sort((a, b) => { return a.number - b.number });

    secondFiltered = totalTendency.slice(0, relativeConst).map((arr) => { return arr.conid }).map((conid) => {
      return instance.contentsArr.search("conid", conid);
    });

    createNode({
      mother: rightTong,
      text: "유사한 포트폴리오",
      style: {
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(tendencyTitleWeight),
        color: colorChip.black,
        marginTop: String(tendencyTitleMarginTop) + ea,
        marginBottom: String(relativeTitleMarginBottom) + ea,
      }
    });

    relativeTong = createNode({
      mother: rightTong,
      style: {
        position: "relative",
        display: "block",
      }
    })

    j = 0;
    for (let { conid: c, contents: { portfolio: { pid, detailInfo: { photodae: [ sero, garo ] } } } } of secondFiltered) {
      createNode({
        mother: relativeTong,
        mode: "img",
        class: [ "hoverDefault_lite" ],
        attribute: {
          src: `${S3HOST}/corePortfolio/listImage/${pid}/${photoChar + String(garo) + pid + ".jpg"}`,
          pid: pid,
          conid: c
        },
        event: {
          click: function (e) {
            const thisConid = this.getAttribute("conid");
            setQueue(() => {
              const func = instance.whitePopupEvent(thisConid);
              func.call(window, e);
            });
            cancelEvent.call(this, e);
          }
        },
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(relativeBetween * (relativeColumn - 1)) + ea + ") / " + String(relativeColumn) + ")",
          marginRight: String(j % relativeColumn === relativeColumn - 1 ? 0 : relativeBetween) + ea,
          marginBottom: String(relativeBetween) + ea,
          borderRadius: String(5) + "px",
        }
      });
      j++;
    }

  }
}

ContentsJs.prototype.whiteIframeEvent = function (pid) {
  const instance = this;
  const { ea, totalMother, belowHeight, contentsArr, clients, designers, projects, whiteIframeClassName } = this;
  const { createNode, withOut, colorChip, ajaxJson, setQueue, serviceParsing, cleanChildren, isMac, fireEvent } = GeneralJs;
  return function (e) {

    e.stopPropagation();
    e.preventDefault();

    let cancelBack, whiteBoard;
    let cancelEvent;
    let margin;
    let zIndex;
    let innerMargin;
    let iframeLink;

    margin = 30;
    zIndex = 2;
    innerMargin = 40;

    if (/^[ap][0-9]+$/gi.test(pid)) {
      iframeLink = "/file?pid=" + pid + "&preview=true&previewonly=true&dataonly=true&entire=true";
    } else {
      iframeLink = "/file?ghostdesid=" + pid + "&preview=true&previewonly=true&dataonly=true&entire=true";
    }

    cancelEvent = function (e) {
      totalMother.removeChild(totalMother.lastChild);
      totalMother.removeChild(totalMother.lastChild);
    }

    instance.cancelEvent = cancelEvent;

    cancelBack = createNode({
      mother: totalMother,
      event: {
        click: cancelEvent
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
      class: [ whiteIframeClassName ],
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
        overflow: "hidden",
      },
      child: {
        mode: "iframe",
        attribute: {
          src: iframeLink,
        },
        style: {
          position: "absolute",
          display: "block",
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(0, ea),
          border: String(0),
        }
      }
    });

  }
}

ContentsJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, setQueue } = GeneralJs;
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
            break;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const allContents = await ajaxJson({ mode: "all" }, CONTENTSHOST + "/getAllContents", { equal: true });

    this.member = this.mother.member;
    this.contentsStatus = await ajaxJson({ mode: "get", whereQuery: {} }, BACKHOST + "/updateContentsStatus", { equal: true });
    this.contentsArr = new SearchArray(allContents.contentsArr);
    this.foreContents = new SearchArray(allContents.foreContents);
    this.clients = new SearchArray(allContents.clients);
    this.projects = new SearchArray(allContents.projects);
    this.designers = new SearchArray(allContents.designers);
    this.whitePopupClassName = "whitePopupClassName";
    this.whiteIframeClassName = "whiteIframeClassName";

    this.belowAreaBetween = 0;
    this.controlPannelWidth = 0;
    this.scrollTong = null;
    this.belowScrollTong = null;
    this.belowMiddleScrollTong = null;
    this.belowRightScrollTong = null;

    this.contentsTong = [];
    this.designersTong = [];

    loading.parentElement.removeChild(loading);

    await this.baseMaker();
    
    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        let thisValue;
        let targetDom;
        if (e.key === "Enter") {
          if (this.value.trim() === '') {
            thisValue = this.value.trim();
            instance.designersTong[0].click();
          } else {
            thisValue = this.value.trim();
            targetDom = instance.designersTong.find((dom) => {
              return ((new RegExp(thisValue, "gi")).test(dom.getAttribute("designer")) || (new RegExp(thisValue, "gi")).test(dom.getAttribute("desid")));
            });
            if (targetDom !== undefined) {
              targetDom.click();
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (document.querySelector('.' + instance.whitePopupClassName) !== null) {
          if (Array.isArray(instance.conidTong)) {
            let func, next;
            if (e.key === "ArrowRight") {
              next = instance.conidTong[instance.conidTong.findIndex((c) => { return c === document.querySelector('.' + instance.whitePopupClassName).getAttribute("conid") }) + 1];
              if (next === undefined) {
                next = instance.conidTong[0];
              }
            } else {
              next = instance.conidTong[instance.conidTong.findIndex((c) => { return c === document.querySelector('.' + instance.whitePopupClassName).getAttribute("conid") }) - 1];
              if (next === undefined) {
                next = instance.conidTong[instance.conidTong.length - 1];
              }
            }
            setQueue(() => {
              func = instance.whitePopupEvent(next);
              func.call(window, e);
            });
            instance.cancelEvent.call(window, e);
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}
