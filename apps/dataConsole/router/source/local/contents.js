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

ContentsJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  const { contentsArr } = this;
  const { createNode, withOut, colorChip, isMac } = GeneralJs;
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
    let titleTextTop;

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

    titleTextTop = isMac() ? 0 : 2;

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
        alignItems: "start",
        justifyContent: "center",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>발행된 컨텐츠",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          top: String(titleTextTop) + ea,
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
        justifyContent: "center",
        alignItems: "start",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>발행 예정 컨텐츠",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          top: String(titleTextTop) + ea,
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
        justifyContent: "center",
        alignItems: "start",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>기타 사진",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          top: String(titleTextTop) + ea,
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
        justifyContent: "center",
        alignItems: "start",
      },
      child: {
        text: "<b%>&nbsp;&nbsp;%b>디자이너",
        style: {
          display: "block",
          position: "relative",  
          fontSize: String(titleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          top: String(titleTextTop) + ea,
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
    
    await this.contentsPannel();
    
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
    pidTextTop = isMac() ? -3 : -1;
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
  const { createNode, withOut, colorChip, cleanChildren, selfHref, isMac } = GeneralJs;
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
    pidTextTop = isMac() ? -3 : -1;
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
  const { createNode, withOut, colorChip, cleanChildren, svgMaker, isMac } = GeneralJs;
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
    let checkboxTop;

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
    checkboxTop = isMac() ? 0 : -2;

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
            top: String(checkboxTop) + ea,
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
      attribute: { pid },
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
        pid,
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
      // event: {
      //   click: async function (e) {
      //     try {
      //       const pid = this.getAttribute("pid");
      //       const conid = this.getAttribute("conid");
      //       let whereQuery, updateQuery;
            
      //       whereQuery = { conid };
      //       updateQuery = {};
      //       updateQuery.conid = conid;
      //       updateQuery.pid = pid;
      //       updateQuery.complete = true;
      //       updateQuery.date = new Date();

      //       await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/updateContentsStatus");
      //       instance.contentsStatus = await ajaxJson({ mode: "get", whereQuery: {} }, BACKHOST + "/updateContentsStatus", { equal: true });

      //       fireEvent(cancelBack, "click");
      //       await instance.spreadContents(null);

      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }
      // },
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
    instance.currentPid = pid;

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

ContentsJs.prototype.mainDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, asyncProcessText, valueTargetClassName, videoFiles } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute, serviceParsing, blankHref } = GeneralJs;
  try {
    let columns;
    let values;
    let standards;
    let thisDesigner, thisClient;
    let thisView;
    let thisProject;
    let thisCalendar;

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "conid",
          type: "string",
        },
        {
          title: "번호",
          width: 60,
          name: "pid",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "발행 상태",
        width: 80,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "발행",
            color: colorChip.black,
          },
          {
            value: "예정",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "발행",
          "예정",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "영상 소스",
        width: 80,
        name: "video",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "있음",
          "없음",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        script: (pid, type) => {
          return async function (e) {
            try {
              let thisContents;
              let tempFunction;
              if (instance.videoFiles.filter((o) => { return o.pid === pid }).length !== 0) {
                if (type === "contents") {
                  thisContents = instance.contentsArr.find((c) => {
                    return c.contents.portfolio.pid === pid;
                  });
                  tempFunction = instance.pidWhiteCard(thisContents.contents.portfolio.pid, thisContents.title, thisContents.cliid, thisContents.desid, "contents", true, thisContents.proid);
                } else if (type === "foreContents") {
                  thisContents = instance.foreContents.find((c) => {
                    return c.pid === pid;
                  });
                  tempFunction = instance.pidWhiteCard(thisContents.pid, thisContents.title, thisContents.cliid, thisContents.desid, "fore", true, thisContents.proid);
                }
                await tempFunction(new Event("click", { bubbles: true }));
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      {
        title: "종류",
        width: 100,
        name: "type",
        type: "string",
      },
      {
        title: "촬영일",
        width: 100,
        name: "photo",
        type: "date",
      },
      {
        title: "발행 예정일",
        width: 120,
        name: "forecast",
        type: "date",
      },
      {
        title: "발행일",
        width: 100,
        name: "timeline",
        type: "date",
      },
      {
        title: "디자이너",
        width: 90,
        name: "designer",
        type: "string",
        script: (pid, type) => {
          return async function (e) {
            try {
              let thisContents;
              if (type === "contents") {
                thisContents = instance.contentsArr.find((c) => {
                  return c.contents.portfolio.pid === pid;
                });
                if (thisContents !== undefined) {
                  blankHref(BACKHOST + "/designer?mode=normal&desid=" + thisContents.desid);
                }
              } else if (type === "foreContents") {
                thisContents = instance.foreContents.find((c) => {
                  return c.pid === pid;
                });
                if (thisContents !== undefined) {
                  blankHref(BACKHOST + "/designer?mode=normal&desid=" + thisContents.desid);
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      {
        title: "고객",
        width: 80,
        name: "client",
        type: "string",
        script: (pid, type) => {
          return async function (e) {
            try {
              let thisContents;
              let thisProject;
              if (type === "contents") {
                thisContents = instance.contentsArr.find((c) => {
                  return c.contents.portfolio.pid === pid;
                });
                if (thisContents !== undefined) {
                  if (thisContents.cliid !== "") {
                    blankHref(BACKHOST + "/project?proid=" + thisContents.proid);
                  }
                }
              } else if (type === "foreContents") {
                thisContents = instance.foreContents.find((c) => {
                  return c.pid === pid;
                });
                if (thisContents !== undefined) {
                  thisProject = instance.projects.find((o) => { return o.proid === thisContents.proid });
                  if (thisProject !== undefined) {
                    blankHref(BACKHOST + "/project?proid=" + thisProject.proid);
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      {
        title: "프로젝트",
        width: 120,
        name: "proid",
        type: "string",
        script: (pid, type) => {
          return async function (e) {
            try {
              let thisContents;
              let thisProject;
              if (type === "contents") {
                thisContents = instance.contentsArr.find((c) => {
                  return c.contents.portfolio.pid === pid;
                });
                if (thisContents !== undefined) {
                  if (thisContents.proid !== "") {
                    thisProject = instance.projects.find((o) => { return o.proid === thisContents.proid });
                    if (thisProject !== undefined) {
                      blankHref(BACKHOST + "/project?proid=" + thisProject.proid);
                    }
                  }
                }
              } else if (type === "foreContents") {
                thisContents = instance.foreContents.find((c) => {
                  return c.pid === pid;
                });
                if (thisContents !== undefined) {
                  thisProject = instance.projects.find((o) => { return o.proid === thisContents.proid });
                  if (thisProject !== undefined) {
                    blankHref(BACKHOST + "/project?proid=" + thisProject.proid);
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      {
        title: "서비스",
        width: 120,
        name: "service",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat(serviceParsing().name.map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "순서 지표 1",
        width: 90,
        name: "key9",
        type: "number",
      },
      {
        title: "순서 지표 2",
        width: 90,
        name: "key8",
        type: "number",
      },
      {
        title: "조회수",
        width: 80,
        name: "view",
        type: "number",
      },
      {
        title: "포트폴리오",
        width: 80,
        name: "portfolio",
        type: "number",
      },
      {
        title: "고객 후기",
        width: 80,
        name: "review",
        type: "number",
      },
      {
        title: "모바일",
        width: 80,
        name: "mobile",
        type: "number",
      },
      {
        title: "데스크탑",
        width: 80,
        name: "desktop",
        type: "number",
      },
      {
        title: "태블릿",
        width: 80,
        name: "tablet",
        type: "number",
      },
      {
        title: "사진 개수",
        width: 80,
        name: "photoLength",
        type: "number",
      },
      {
        title: "공간 개수",
        width: 80,
        name: "spaceLength",
        type: "number",
      },
      {
        title: "지역",
        width: 120,
        name: "region",
        type: "string",
      },
      {
        title: "공간명",
        width: 140,
        name: "space",
        type: "string",
      },
      {
        title: "평수",
        width: 100,
        name: "pyeong",
        type: "string",
      },
      {
        title: "제목",
        width: 400,
        name: "title",
        type: "string",
      },
      {
        title: "리뷰 제목",
        width: 320,
        name: "reviewTitle",
        type: "string",
      },
    ];
    columns = columns.filter((o) => { return o !== null });

    values = {};

    for (let fore of instance.foreContents) {

      fore.title = "";

      thisDesigner = null;
      thisClient = null;
      thisProject = null;
      thisView = null;
      if (fore.proid !== "") {
        thisProject = instance.projects.search("proid", fore.proid);
      }
      if (thisProject.cliid !== "") {
        thisClient = instance.clients.search("cliid", thisProject.cliid);
        fore.title += thisClient.name + " C";
        fore.cliid = thisClient.cliid;
      } else {
        fore.title += "개인";
        fore.cliid = "";
      }
      fore.title += " ";
      if (thisProject.desid !== "") {
        thisDesigner = instance.designers.search("desid", thisProject.desid);
        fore.title += thisDesigner.designer + " D";
        fore.desid = thisDesigner.desid;
      }

      standards.values[fore.pid] = [
        {
          value: "-",
          name: "conid",
        },
        {
          value: fore.pid,
          name: "pid",
        },
      ];

      values[fore.pid] = [
        {
          value: "예정",
          name: "status",
        },
        {
          value: videoFiles.filter((o) => { return o.pid === fore.pid }).length === 0 ? "없음" : "있음",
          name: "video",
        },
        {
          value: thisClient === null ? "개인" : "홈리에종",
          name: "type",
        },
        {
          value: thisProject === null ? "-" : dateToString(thisProject.contents.photo.date),
          name: "photo",
        },
        {
          value: asyncProcessText,
          name: "forecast",
        },
        {
          value: "-",
          name: "timeline",
        },
        {
          value: thisDesigner === null ? "-" : thisDesigner.designer,
          name: "designer",
        },
        {
          value: thisClient === null ? "-" : thisClient.name,
          name: "client",
        },
        {
          value: thisProject.proid === "" ? "-" : thisProject.proid,
          name: "proid",
        },
        {
          value: thisProject === null ? "홈스타일링" : serviceParsing(thisProject.service).split(" ").slice(1, -1).join(" "),
          name: "service",
        },
        {
          value: "-",
          name: "key9",
        },
        {
          value: "-",
          name: "key8",
        },
        {
          value: "-",
          name: "view",
        },
        {
          value: "-",
          name: "portfolio",
        },
        {
          value: "-",
          name: "review",
        },
        {
          value: "-",
          name: "mobile",
        },
        {
          value: "-",
          name: "desktop",
        },
        {
          value: "-",
          name: "tablet",
        },
        {
          value: String(fore.forecast.length),
          name: "photoLength",
        },
        {
          value: "-",
          name: "spaceLength",
        },
        {
          value: "-",
          name: "region",
        },
        {
          value: "-",
          name: "space",
        },
        {
          value: "-",
          name: "pyeong",
        },
        {
          value: "-",
          name: "title",
        },
        {
          value: "-",
          name: "reviewTitle",
        },
      ];

    }

    for (let contents of instance.contentsArr) {

      contents.title = "";

      thisDesigner = null;
      thisClient = null;
      thisProject = null;
      if (contents.cliid !== "") {
        thisClient = instance.clients.search("cliid", contents.cliid);
        contents.title += thisClient.name + " C";
        contents.cliid = thisClient.cliid;
      } else {
        contents.title += "개인";
        contents.cliid = "";
      }
      contents.title += " ";
      if (contents.desid !== "") {
        thisDesigner = instance.designers.search("desid", contents.desid);
        contents.title += thisDesigner.designer + " D";
        contents.desid = thisDesigner.desid;
      }
      if (contents.proid !== "") {
        thisProject = instance.projects.search("proid", contents.proid);
      }

      thisView = instance.contentsView.data.contents.find((o) => {
        return o.pid === contents.contents.portfolio.pid;
      });
      if (thisView === undefined) {
        thisView = null;
      }

      standards.values[contents.contents.portfolio.pid] = [
        {
          value: contents.conid,
          name: "conid",
        },
        {
          value: contents.contents.portfolio.pid,
          name: "pid",
        },
      ];

      values[contents.contents.portfolio.pid] = [
        {
          value: "발행",
          name: "status",
        },
        {
          value: videoFiles.filter((o) => { return o.pid === contents.contents.portfolio.pid }).length === 0 ? "없음" : "있음",
          name: "video",
        },
        {
          value: thisClient === null ? "개인" : "홈리에종",
          name: "type",
        },
        {
          value: thisProject === null ? "-" : dateToString(thisProject.contents.photo.date),
          name: "photo",
        },
        {
          value: dateToString(contents.contents.portfolio.date),
          name: "forecast",
        },
        {
          value: dateToString(contents.contents.portfolio.date),
          name: "timeline",
        },
        {
          value: thisDesigner === null ? "-" : thisDesigner.designer,
          name: "designer",
        },
        {
          value: thisClient === null ? "-" : thisClient.name,
          name: "client",
        },
        {
          value: contents.proid === "" ? "-" : contents.proid,
          name: "proid",
        },
        {
          value: thisProject === null ? "홈스타일링" : serviceParsing(thisProject.service).split(" ").slice(1, -1).join(" "),
          name: "service",
        },
        {
          value: contents.contents.portfolio.detailInfo.sort.key9,
          name: "key9",
        },
        {
          value: contents.contents.portfolio.detailInfo.sort.key8,
          name: "key8",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.view.total),
          name: "view",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.view.portfolio),
          name: "portfolio",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.view.review),
          name: "review",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.device.mobile),
          name: "mobile",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.device.desktop),
          name: "desktop",
        },
        {
          value: thisView === null ? "-" : String(thisView.data.device.tablet),
          name: "tablet",
        },
        {
          value: String(contents.photos.detail.length),
          name: "photoLength",
        },
        {
          value: String(contents.contents.portfolio.contents.detail.length - 1),
          name: "spaceLength",
        },
        {
          value: contents.contents.portfolio.spaceInfo.region,
          name: "region",
        },
        {
          value: contents.contents.portfolio.spaceInfo.space,
          name: "space",
        },
        {
          value: String(contents.contents.portfolio.spaceInfo.pyeong),
          name: "pyeong",
        },
        {
          value: contents.contents.portfolio.title.sub,
          name: "title",
        },
        {
          value: contents.contents.review.title.sub.trim() === '' ? "-" : contents.contents.review.title.sub,
          name: "reviewTitle",
        },
      ];

    }

    if (firstLoad) {
      ajaxJson({ mode: "get" }, CONTENTSHOST + "/contentsCalendar", { equal: true }).then((contentsCalendar) => {
        let thisCalendar, thisValueDoms;
        let thisTarget;
        instance.contentsCalendar = contentsCalendar;
        for (let fore of instance.foreContents) {
          thisCalendar = instance.contentsCalendar.find((o) => { return o.pid === fore.pid });
          if (thisCalendar === undefined) {
            thisCalendar = null;
          }
          if (document.querySelector('.' + fore.pid) !== null) {
            thisValueDoms = [ ...document.querySelector('.' + fore.pid).querySelectorAll('.' + valueTargetClassName) ];
            thisTarget = findByAttribute(thisValueDoms, "name", "forecast");
            if (thisTarget !== null) {
              thisTarget.textContent = thisCalendar === null ? "-" : dateToString(thisCalendar.date.start);
              thisTarget.style.color = colorChip.black;
            }
          }
        }
        return instance.coreColorSync();
      }).catch((err) => { console.log(err); });
    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.coreColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.mainDataRender(false));

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.contentsBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, colorExtended, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, blankHref } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const contentsSubMenuEventFactorClassName = "contentsSubMenuEventFactorClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let coreContentsLoad;
    let circleRight, circleTop;
    let valueDom;
    let hiddenStatus;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 200;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    ({ standards, columns, values } = await this.mainDataRender(true));
  
    hoverEvent = () => {
      return function (e) {
        const pid = this.getAttribute("pid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "pid", pid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const pid = this.getAttribute("pid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "pid", pid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("pid");
              thisValueDom = findByAttribute(valueDoms, "pid", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("pid");
              thisValueDom = findByAttribute(valueDoms, "pid", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      includesEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("pid");
              thisValueDom = findByAttribute(valueDoms, "pid", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if ((new RegExp(thisValue, "gi")).test(findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim())) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if ((new RegExp(thisValue, "gi")).test(findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim())) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }
    this.menuEventTong = menuEventTong;

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          const maxLnegth = 20;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          if (thisMenu.length >= maxLnegth) {

            blackPrompt = createNode({
              mother: totalContents,
              class: [ menuPromptClassName ],
              style: {
                position: "fixed",
                top: String(e.y + menuVisual) + "px",
                left: String(e.x + menuVisual) + "px",
                width: String(menuPromptWidth) + ea,
                background: colorChip.white,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
                height: String((menuPromptHeight + menuBetween) * maxLnegth) + ea,
                overflow: "scroll",
              },
              children: thisMenu.map(({ value, functionName }) => {
                const functionOrderArr = functionName.split("_");
                const [ thisFunctionName ] = functionOrderArr;
                let thisArguments;
                if (functionOrderArr.length > 1) {
                  thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
                } else {
                  thisArguments = [ name, index ];
                }
                return {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                    click: menuEventTong[thisFunctionName](...thisArguments),
                  },
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(menuPromptWidth) + ea,
                    height: String(menuPromptHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.gradientGray,
                    marginBottom: String(menuBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  child: {
                    text: value,
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                    },
                    style: {
                      position: "relative",
                      top: String(menuTextTop) + ea,
                      fontSize: String(menuSize) + ea,
                      fontWeight: String(menuWeight),
                      color: colorChip.white,
                    }
                  }
                }
              })
            });

          } else {

            blackPrompt = createNode({
              mother: totalContents,
              class: [ menuPromptClassName ],
              style: {
                position: "fixed",
                top: String(e.y + menuVisual) + "px",
                left: String(e.x + menuVisual) + "px",
                width: String(menuPromptWidth) + ea,
                background: colorChip.white,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
              },
              children: thisMenu.map(({ value, functionName }) => {
                const functionOrderArr = functionName.split("_");
                const [ thisFunctionName ] = functionOrderArr;
                let thisArguments;
                if (functionOrderArr.length > 1) {
                  thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
                } else {
                  thisArguments = [ name, index ];
                }
                return {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                    click: menuEventTong[thisFunctionName](...thisArguments),
                  },
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(menuPromptWidth) + ea,
                    height: String(menuPromptHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.gradientGray,
                    marginBottom: String(menuBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  child: {
                    text: value,
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                    },
                    style: {
                      position: "relative",
                      top: String(menuTextTop) + ea,
                      fontSize: String(menuSize) + ea,
                      fontWeight: String(menuWeight),
                      color: colorChip.white,
                    }
                  }
                }
              })
            });

          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    coreContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.mainDataRender(true));
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });

        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;

        for (let contents of instance.contentsArr) {
          hiddenStatus = instance.hiddenContents.includes(contents.contents.portfolio.pid);
          createNode({
            mother: idNameArea,
            attribute: { conid: contents.conid, pid: contents.contents.portfolio.pid, lastfilter: "none" },
            event: {
              click: instance.pidWhiteCard(contents.contents.portfolio.pid, contents.title, contents.cliid, contents.desid, "contents", false, contents.proid),
              contextmenu: async function (e) {
                e.preventDefault();
                const pid = this.getAttribute("pid");
                const conid = this.getAttribute("conid");
                const px = "px";
                const zIndex = 4;
                const thisContents = instance.contentsArr.find((c) => { return c.conid === conid });
                const desid = thisContents.desid;
                const proid = thisContents.proid;
                const hiddenStatus = instance.hiddenContents.includes(pid);
                const contextMenu = [
                  {
                    title: thisContents.title,
                    func: () => {
                      return async function (e) {
                        try {
                          blankHref(BACKHOST + "/project" + "?proid=" + proid);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  {
                    title: pid + " 웹 페이지에서 보기",
                    func: () => {
                      return async function (e) {
                        try {
                          blankHref(FRONTHOST + "/portdetail.php?pid=" + pid)
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  {
                    title: pid + " 에디터 열기",
                    func: () => {
                      return async function (e) {
                        try {
                          blankHref(FRONTHOST + "/portdetail.php?pid=" + pid + "&edit=true")
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  {
                    title: "프로젝트 정보 열기",
                    func: () => {
                      return async function (e) {
                        try {
                          blankHref(BACKHOST + "/project" + "?proid=" + proid);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  {
                    title: "디자이너 정보 열기",
                    func: () => {
                      return async function (e) {
                        try {
                          blankHref(BACKHOST + "/designer" + "?mode=normal&desid=" + desid);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                  {
                    title: hiddenStatus ? "웹에서 " + pid + " 컨텐츠 보이기" : "웹에서 " + pid + " 컨텐츠 숨기기",
                    func: () => {
                      return async function (e) {
                        try {
                          if (hiddenStatus) {
                            await ajaxJson({ mode: "remove", pid: pid }, S3HOST + ":3000/hiddenContents");
                            window.location.reload();
                          } else {
                            await ajaxJson({ mode: "add", pid: pid }, S3HOST + ":3000/hiddenContents");
                            window.location.reload();
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  },
                ];
                const { x, y } = e;
                let cancelBack, contextBase;
      
                cancelBack = createNode({
                  mother: totalContents,
                  class: [ contentsSubMenuEventFactorClassName ],
                  event: {
                    click: (e) => { removeByClass(contentsSubMenuEventFactorClassName) },
                  },
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: withOut(0, ea),
                    height: withOut(0, ea),
                    background: "transparent",
                    zIndex: String(zIndex),
                  }
                });
      
                contextBase = createNode({
                  mother: totalContents,
                  class: [ contentsSubMenuEventFactorClassName ],
                  style: {
                    display: "inline-block",
                    position: "fixed",
                    top: String(y + contextIndent) + px,
                    left: String(x + (contextIndent / 2)) + px,
                    padding: String(contextButtonOuterMargin) + ea,
                    paddingBottom: String(contextButtonOuterMargin - contextButtonInnerMargin) + ea,
                    background: colorChip.white,
                    borderRadius: String(5) + px,
                    boxShadow: "3px 0px 15px -9px " + colorChip.shadow,
                    zIndex: String(zIndex),
                    animation: "fadeuplite 0.3s ease forwards",
                  }
                })
      
                for (let obj of contextMenu) {
                  createNode({
                    mother: contextBase,
                    event: {
                      click: obj.func(),
                    },
                    style: {
                      display: "flex",
                      width: String(contextButtonWidth) + ea,
                      height: String(contextButtonHeight) + ea,
                      background: colorChip.gradientGray,
                      borderRadius: String(5) + px,
                      marginBottom: String(contextButtonInnerMargin) + ea,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      cursor: "pointer",
                    },
                    child: {
                      text: obj.title,
                      style: {
                        fontSize: String(contextButtonSize) + ea,
                        fontWeight: String(contextButtonWeight),
                        color: colorChip.white,
                        position: "relative",
                        display: "inline-block",
                        top: String(contextButtonTextTop) + ea,
                      }
                    }
                  });
                }
              }
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[contents.contents.portfolio.pid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorExtended.black,
                    "text-decoration": hiddenStatus ? "line-through" : "",
                  },
                }
              }
            })
          });
          thisTong = createNode({
            mother: valueArea,
            attribute: { pid: contents.contents.portfolio.pid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, contents.contents.portfolio.pid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          });
          for (let i = 0; i < columns.length; i++) {
            valueDom = createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      name: values[contents.contents.portfolio.pid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[contents.contents.portfolio.pid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[contents.contents.portfolio.pid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
            if (typeof columns[i].script === "function") {
              valueDom.addEventListener("click", columns[i].script(contents.contents.portfolio.pid, "contents"));
            }
          }
        }
        for (let fore of instance.foreContents) {
          createNode({
            mother: idNameArea,
            attribute: { pid: fore.pid, lastfilter: "none" },
            event: {
              click: instance.pidWhiteCard(fore.pid, fore.title, fore.cliid, fore.desid, "fore", false, fore.proid),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[fore.pid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                }
              }
            })
          });
          thisTong = createNode({
            mother: valueArea,
            attribute: { pid: fore.pid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, fore.pid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          });
          for (let i = 0; i < columns.length; i++) {
            valueDom = createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      name: values[fore.pid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[fore.pid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[fore.pid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
            if (typeof columns[i].script === "function") {
              valueDom.addEventListener("click", columns[i].script(fore.pid, "foreContents"));
            }
          }
        }

        await instance.coreColorSync();
        await instance.contentsPannel();

      } catch (e) {
        console.log(e);
      }
    }

    await coreContentsLoad(false);
    this.coreContentsLoad = coreContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.etcWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let etcWhiteMaker;
      let innerMarginTop;
      let basePaddingTop;
      let today;
      let loading;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      etcWhiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
              },
              child: {
                mode: "iframe",
                attribute: {
                  src: "/file?mode=" + "etc" + "&dataonly=true&entire=true",
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
            }
          ]
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "기타 소스",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });
        
      }

      instance.etcWhiteMaker = etcWhiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        etcWhiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            etcWhiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

ContentsJs.prototype.pidWhiteCard = function (pid, title = "", cliid = "", desid = "", type = "contents", video = false, proid = "") {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, videoFiles } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let pidWhiteMaker;
      let innerMarginTop;
      let basePaddingTop;
      let today;
      let loading;
      let iframeLink;
      let thisTitle;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      if (video) {
        iframeLink = "/file?video=" + proid + "__split__" + pid + "&dataonly=true&entire=true";
      } else {
        iframeLink = "/file?pid=" + pid + "&preview=true&previewonly=true&dataonly=true&entire=true";
      }
      if (title === "" || typeof title !== "string") {
        thisTitle = pid;
      } else {
        thisTitle = title;
      }

      instance.currentPid = pid;

      pidWhiteMaker = (reload = false) => {

        instance.currentPid = pid;
        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            attribute: { pid },
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: { pid },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
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
            }
          ]
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            attribute: { cliid, desid, pid },
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: thisTitle,
                attribute: { cliid, desid, pid },
                event: {
                  click: function (e) {
                    const cliid = this.getAttribute("cliid");
                    const desid = this.getAttribute("desid");
                    if (cliid !== "") {
                      blankHref(BACKHOST + "/client?cliid=" + cliid);
                    } else {
                      blankHref(BACKHOST + "/designer?mode=normal&desid=" + desid);
                    }
                  }
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { cliid, desid, proid, pid, type, title: thisTitle, video: (true ? "false" : "true") },
                event: {
                  click: async function (e) {
                    try {
                      const type = this.getAttribute("type");
                      const pid = this.getAttribute("pid");
                      const cliid = this.getAttribute("cliid");
                      const desid = this.getAttribute("desid");
                      const proid = this.getAttribute("proid");
                      const title = this.getAttribute("title");
                      const video = this.getAttribute("video") === "true";
                      let tempFunction;
                      if (video) {
                        tempFunction = instance.pidWhiteCard(pid, title, cliid, desid, type, video, proid);
                        await tempFunction(new Event("click", { bubbles: true }));
                      } else {
                        if (type === "contents") {
                          blankHref(FRONTHOST + "/portdetail.php?pid=" + pid + "&edit=true");
                        }
                      }
                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: true ? (type === "contents" ? "front web" : "") : ("video source"),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  right: String(0),
                  top: String(titleTextTop + 9) + ea,
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });
        
      }

      instance.pidWhiteMaker = pidWhiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        pidWhiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            pidWhiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

ContentsJs.prototype.contentsPannel = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    pannelMenu = [
      (instance.mode === "data" ? {
        title: "기간 설정",
        event: () => {
          return async function (e) {
            try {
              let startDate, endDate;
              let loading;
              let whereQuery;
              let allContents;

              startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
              if (startDate !== null) {
                endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                if (endDate !== null) {
                  cleanChildren(totalMother);
                  loading = await instance.mother.loadingRun();
                  endDate.setDate(endDate.getDate() + 1);
                  whereQuery = {
                    "contents.portfolio.date": { $gte: startDate, $lt: endDate }
                  };

                  allContents = await ajaxJson({ mode: "all", nonFore: true, whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
                  instance.contentsArr = new SearchArray(allContents.contentsArr);
                  instance.foreContents = new SearchArray(allContents.foreContents);
                  instance.clients = new SearchArray(allContents.clients);
                  instance.projects = new SearchArray(allContents.projects);
                  instance.designers = new SearchArray(allContents.designers);

                  await instance.coreContentsLoad(true);
                  loading.parentNode.removeChild(loading);
                }
              }

            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      } : null),
      (instance.mode === "data" ? {
        title: "발행 예정만",
        event: () => {
          return async function (e) {
            try {
              const thisTitle = this.querySelector('.' + titleStringClassName).textContent;
              const thisValue = /예정만/gi.test(thisTitle) ? "예정" : "$all";
              const name = "status";
              const index = 0;
              let filterFunc;
              let loading;
              let whereQuery;
              let allContents;
              filterFunc = instance.menuEventTong.filterEvent(thisValue, name, index);
              await filterFunc(e);
              if (/예정만/gi.test(thisTitle)) {

                if (instance.foreContents.length === 0) {

                  cleanChildren(totalMother);
                  loading = await instance.mother.loadingRun();
                  whereQuery = {
                    "contents.portfolio.date": { $gte: new Date() }
                  };

                  allContents = await ajaxJson({ mode: "all", whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
                  instance.contentsArr = new SearchArray(allContents.contentsArr);
                  instance.foreContents = new SearchArray(allContents.foreContents);
                  instance.clients = new SearchArray(allContents.clients);
                  instance.projects = new SearchArray(allContents.projects);
                  instance.designers = new SearchArray(allContents.designers);

                  await instance.coreContentsLoad(true);
                  loading.parentNode.removeChild(loading);

                } else {
                  this.querySelector('.' + titleStringClassName).textContent = "전체 컨텐츠";
                }

              } else {

                cleanChildren(totalMother);
                loading = await instance.mother.loadingRun();
                whereQuery = {};
                allContents = await ajaxJson({ mode: "all", nonFore: true, whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
                instance.contentsArr = new SearchArray(allContents.contentsArr);
                instance.foreContents = new SearchArray(allContents.foreContents);
                instance.clients = new SearchArray(allContents.clients);
                instance.projects = new SearchArray(allContents.projects);
                instance.designers = new SearchArray(allContents.designers);

                await instance.coreContentsLoad(true);
                loading.parentNode.removeChild(loading);

                this.querySelector('.' + titleStringClassName).textContent = "발행 예정만";
              }
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      } : null),
      {
        title: instance.mode === "data" ? "소스 보기" : "데이터 보기",
        event: instance.mode === "data" ? (() => {
          return async function (e) {
            try {
              let loading, allContents;

              document.querySelector('.' + "totalMother").remove();

              loading = await instance.mother.loadingRun();
              allContents = await ajaxJson({ mode: "all" }, CONTENTSHOST + "/getAllContents", { equal: true });
              instance.contentsCalendar = [];
              instance.contentsArr = new SearchArray(allContents.contentsArr);
              instance.foreContents = new SearchArray(allContents.foreContents);
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);
              instance.belowAreaBetween = 0;
              instance.controlPannelWidth = 0;
              instance.scrollTong = null;
              instance.belowScrollTong = null;
              instance.belowMiddleScrollTong = null;
              instance.belowRightScrollTong = null;
              instance.contentsTong = [];
              instance.designersTong = [];
              loading.parentElement.removeChild(loading);

              instance.mode = "source";
              await instance.baseMaker();

            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        }) : (() => {
          return async function (e) {
            try {
              let loading, allContents;

              document.querySelector('.' + "totalMother").remove();

              loading = await instance.mother.loadingRun();
              allContents = await ajaxJson({ mode: "all", init: true }, CONTENTSHOST + "/getAllContents", { equal: true });
              instance.contentsCalendar = [];
              instance.contentsArr = new SearchArray(allContents.contentsArr);
              instance.foreContents = new SearchArray(allContents.foreContents);
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);
              instance.belowAreaBetween = 0;
              instance.controlPannelWidth = 0;
              instance.scrollTong = null;
              instance.belowScrollTong = null;
              instance.belowMiddleScrollTong = null;
              instance.belowRightScrollTong = null;
              instance.contentsTong = [];
              instance.designersTong = [];
              loading.parentElement.removeChild(loading);

              instance.mode = "data";
              await instance.contentsBase();

            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        }),
      },
      {
        title: "기타 소스",
        event: () => {
          return async function (e) {
            try {
              const etcFunc = instance.etcWhiteCard();
              await etcFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
    ].filter((o) => { return o !== null })

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "absolute",
        bottom: String(pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            position: "relative",
            top: String(menuTextTop) + ea,
            fontSize: String(menuSize) + ea,
            fontWeight: String(menuWeight),
            color: colorChip.white,
          }
        }
      })
    }

  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.contentsSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, totalMother } = this;
  const { ajaxJson, setQueue, cleanChildren } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          let whereQuery, loading, coreWhereQuery, ago;
          let allContents;
          if (value === '') {

            cleanChildren(totalMother);
            loading = await instance.mother.loadingRun();
            allContents = await ajaxJson({ mode: "all", init: true }, CONTENTSHOST + "/getAllContents", { equal: true });
            instance.contentsCalendar = [];
            instance.contentsArr = new SearchArray(allContents.contentsArr);
            instance.foreContents = new SearchArray(allContents.foreContents);
            instance.clients = new SearchArray(allContents.clients);
            instance.projects = new SearchArray(allContents.projects);
            instance.designers = new SearchArray(allContents.designers);
            instance.belowAreaBetween = 0;
            instance.controlPannelWidth = 0;
            instance.scrollTong = null;
            instance.belowScrollTong = null;
            instance.belowMiddleScrollTong = null;
            instance.belowRightScrollTong = null;
            instance.contentsTong = [];
            instance.designersTong = [];
            instance.mode = "data";
            await instance.coreContentsLoad(true);
            loading.parentNode.removeChild(loading);

          } else {

            if (value === "예정") {

              cleanChildren(totalMother);
              loading = await instance.mother.loadingRun();
              whereQuery = {
                "contents.portfolio.date": { $gte: new Date() }
              };

              allContents = await ajaxJson({ mode: "all", whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
              instance.contentsArr = new SearchArray(allContents.contentsArr);
              instance.foreContents = new SearchArray(allContents.foreContents);
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);

              await instance.coreContentsLoad(true);
              loading.parentNode.removeChild(loading);

            } else if (value === "발행") {

              cleanChildren(totalMother);
              loading = await instance.mother.loadingRun();
              whereQuery = {};
              allContents = await ajaxJson({ mode: "all", nonFore: true, whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
              instance.contentsArr = new SearchArray(allContents.contentsArr);
              instance.foreContents = new SearchArray(allContents.foreContents);
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);

              await instance.coreContentsLoad(true);
              loading.parentNode.removeChild(loading);

            } else if (value === "홈리에종" || value === "개인") {

              cleanChildren(totalMother);
              loading = await instance.mother.loadingRun();
              whereQuery = {};
              allContents = await ajaxJson({ mode: "all", nonFore: true, whereQuery }, CONTENTSHOST + "/getAllContents", { equal: true });
              if (value === "홈리에종") {
                instance.contentsArr = new SearchArray(allContents.contentsArr.filter((c) => { return /^p/i.test(c.contents.portfolio.pid) }));
                instance.foreContents = new SearchArray([]);
              } else {
                instance.contentsArr = new SearchArray(allContents.contentsArr.filter((c) => { return /^a/i.test(c.contents.portfolio.pid) }));
                instance.foreContents = new SearchArray([]);
              }
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);

              await instance.coreContentsLoad(true);
              loading.parentNode.removeChild(loading);

            } else {

              cleanChildren(totalMother);
              loading = await instance.mother.loadingRun();
              allContents = await ajaxJson({ mode: "search", value }, CONTENTSHOST + "/getAllContents", { equal: true });
              instance.contentsCalendar = [];
              instance.contentsArr = new SearchArray(allContents.contentsArr);
              instance.foreContents = new SearchArray(allContents.foreContents);
              instance.clients = new SearchArray(allContents.clients);
              instance.projects = new SearchArray(allContents.projects);
              instance.designers = new SearchArray(allContents.designers);
              instance.belowAreaBetween = 0;
              instance.controlPannelWidth = 0;
              instance.scrollTong = null;
              instance.belowScrollTong = null;
              instance.belowMiddleScrollTong = null;
              instance.belowRightScrollTong = null;
              instance.contentsTong = [];
              instance.designersTong = [];
              instance.mode = "data";
              await instance.coreContentsLoad(true);
              loading.parentNode.removeChild(loading);

            }
            
          }
          
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.contentsWhiteResize = async function () {
  const instance = this;
  const { whiteCardClassName } = this;
  try {
    this.resizeStack = 0;
    this.resizeFrom = 0;
    this.resizePopup = 0;
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        if (Array.from(document.querySelectorAll('.' + whiteCardClassName)).length !== 0) {
          window.location.reload();
        }
        instance.resizeStack = 0;
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) { reEvent.apply(context, args); };
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.contentsExtractEvent = async function () {
  const instance = this;
  const { asyncProcessText } = this;
  const { ajaxJson, blankHref, returnGet, equalJson, dateToString } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";

    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        const today = new Date();
        const getObj = returnGet();
        let thisObject;
        let matrix;
        let tempArr;
        let data;
        let thisForeContents;
  
        data = await instance.mainDataRender(false);
        matrix = [];
        tempArr = [
          "아이디",
        ];
        for (let obj of data.columns) {
          tempArr.push(obj.title);
        }
        matrix.push(tempArr);
        
        instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");

        ajaxJson({ mode: "get" }, CONTENTSHOST + "/contentsCalendar", { equal: true }).then((contentsCalendar) => {
          let thisCalendar, thisValueDoms;
          let thisTarget;
          instance.contentsCalendar = contentsCalendar;

          for (let pid in data.values) {
            tempArr = [];
            tempArr.push(pid);
            thisForeContents = instance.foreContents.find((o) => { return o.pid === pid });
            if (thisForeContents === undefined) {
              for (let obj of data.columns) {
                thisObject = data.values[pid].find((o) => { return o.name === obj.name });
                tempArr.push(thisObject.value);
              }
              matrix.push(tempArr);
            } else {
              thisCalendar = instance.contentsCalendar.find((o) => { return o.pid === thisForeContents.pid });
              if (thisCalendar === undefined) {
                for (let obj of data.columns) {
                  thisObject = data.values[pid].find((o) => { return o.name === obj.name });
                  if (thisObject.value === asyncProcessText) {
                    tempArr.push("-");
                  } else {
                    tempArr.push(thisObject.value);
                  }
                }
                matrix.push(tempArr);
              } else {
                for (let obj of data.columns) {
                  thisObject = data.values[pid].find((o) => { return o.name === obj.name });
                  if (thisObject.value === asyncProcessText) {
                    tempArr.push(dateToString(thisCalendar.date.start));
                  } else {
                    tempArr.push(thisObject.value);
                  }
                }
                matrix.push(tempArr);
              }
            }
          }

          return ajaxJson({
            values: matrix,
            newMake: true,
            parentId: parentId,
            sheetName: "fromDB_hlContents_" + String(today.getFullYear()) + instance.mother.todayMaker()
          }, BACKHOST + "/sendSheets", { equal: true });

        }).then((result) => {
          blankHref(result.link);
        }).catch((err) => {
          console.log(err);
        });

      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

ContentsJs.prototype.rawUploadView = function () {
  const instance = this;
  const { createNode, withOut, colorChip, ajaxJson, removeByClass, dateToString, svgMaker } = GeneralJs;
  return async function () {
    try {
      const totalContents = document.getElementById("totalcontents");
      const rawCommentPopupClassName = "rawCommentPopupClassName";
      const { belowHeight } = instance;
      const ea = "px";
      const zIndex = 4;
      let thisRawContents;
      let cancelBack, whitePrompt;
      let whitePromptWidth;
      let whitePromptMarginTop;
      let realBaseTong;
      let realMargin;
      let dateCloseTong;
      let contentsTong;
      let closeButtonHeight;
      let grayBlockBetween;
      let textMargin;
      let updatedTextTop;
      let textSize;
      let xIconWidth;
      let textWeight;
      let textLineHeight;
      let iframeLink;

      whitePromptMarginTop = 30;
      whitePromptWidth = window.innerWidth - (whitePromptMarginTop * 2);
      
      realMargin = 20;
      closeButtonHeight = 50;
      grayBlockBetween = 8;

      textMargin = 30;
      updatedTextTop = -1;
      textSize = 14;
      xIconWidth = 16;

      textWeight = 400;
      textLineHeight = 1.6;

      iframeLink = "/raw?dataonly=true&entire=true";

      cancelBack = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: (e) => {
            removeByClass(rawCommentPopupClassName);
          }
        },
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          opacity: String(0.3),
          position: "fixed",
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ rawCommentPopupClassName ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          display: "inline-flex",
          position: "fixed",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          width: String(whitePromptWidth) + ea,
          height: "calc(calc(100vh - " + String(belowHeight) + ea + ") - " + String(whitePromptMarginTop * 2) + ea + ")",
          left: withOut(50, whitePromptWidth / 2, ea),
          top: String(whitePromptMarginTop) + ea,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease",
          overflow: "hidden",
        }
      });

      realBaseTong = createNode({
        mother: whitePrompt,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(0 * 2, ea),
          height: withOut(0 * 2, ea),
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

    } catch (e) {
      console.log(e);
    }
  }
}

ContentsJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { ajaxJson, sleep, blankHref, createNode, withOut, colorChip, dateToString } = GeneralJs;
  const { whiteCardClassName } = this;

  communication.setItem([
    () => { return "에디터 열기"; },
    function () {
      return (document.querySelector('.' + whiteCardClassName) !== null);
    },
    async function (e) {
      try {
        const pid = instance.currentPid;
        if (typeof pid === "string") {
          blankHref(FRONTHOST + "/portdetail.php?pid=" + pid + "&edit=true")
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "컨텐츠 강제 발행"; },
    function () {
      return (document.querySelector('.' + whiteCardClassName) !== null);
    },
    async function (e) {
      try {
        const pid = instance.currentPid;
        if (typeof pid === "string") {
          await ajaxJson({ pid }, "https://" + FILEHOST + ":3000/rawUpdateSubject");
          window.alert("자동 발행이 시작되었습니다. 슬렉 안내와 알람을 따라주세요!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "신규 컨텐츠 발행"; },
    function () {
      return (document.querySelector('.' + whiteCardClassName) === null);
    },
    async function (e) {
      try {
        let popupFunction;
        popupFunction = instance.rawUploadView();
        await popupFunction();
      } catch (e) {
        console.log(e);
      }
    }
  ]);

}

ContentsJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, setQueue, returnGet } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    let loading, allContents;
    let videoFiles;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.dataonly === "true") {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;
    }

    document.getElementById("grayLeftOpenButton").remove();
    this.member = this.mother.member;

    loading = await this.mother.loadingRun();

    this.contentsView = await ajaxJson({ mode: "pick" }, CONTENTSHOST + "/getContentsView", { equal: true });
    this.hiddenContents = await ajaxJson({ mode: "get" }, S3HOST + ":3000/hiddenContents", { equal: true });
    videoFiles = await ajaxJson({ path: "/corePortfolio/rawVideo" }, S3HOST + ":3000/listFiles", { equal: true });
    this.videoFiles = videoFiles.map((o) => {
      const arr = o.fileName.split("__split__");
      o.proid = arr[0];
      o.pid = arr[1];
      return o;
    });
    this.whitePopupClassName = "whitePopupClassName";
    this.whiteIframeClassName = "whiteIframeClassName";
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.asyncProcessText = "로드중..";
    this.currentPid = null;
    this.entireMode = entireMode;

    if (getObj.mode === "source") {
      allContents = await ajaxJson({ mode: "all" }, CONTENTSHOST + "/getAllContents", { equal: true });
    } else {
      allContents = await ajaxJson({ mode: "all" }, CONTENTSHOST + "/getAllContents", { equal: true });
    }

    this.contentsCalendar = [];
    this.contentsArr = new SearchArray(allContents.contentsArr);
    this.foreContents = new SearchArray(allContents.foreContents);
    this.clients = new SearchArray(allContents.clients);
    this.projects = new SearchArray(allContents.projects);
    this.designers = new SearchArray(allContents.designers);

    this.belowAreaBetween = 0;
    this.controlPannelWidth = 0;
    this.scrollTong = null;
    this.belowScrollTong = null;
    this.belowMiddleScrollTong = null;
    this.belowRightScrollTong = null;

    this.contentsTong = [];
    this.designersTong = [];

    loading.parentElement.removeChild(loading);

    if (typeof getObj.mode === "string") {
      if (getObj.mode === "data") {
        this.mode = "data";
        await this.contentsBase();
      } else if (getObj.mode === "source") {
        this.mode = "source";
        await this.baseMaker();
      } else {
        this.mode = "data";
        await this.contentsBase();
      }
    } else {
      this.mode = "data";
      await this.contentsBase();
    }

    await this.contentsSearchEvent();
    await this.contentsExtractEvent();
    await this.contentsWhiteResize();
    this.communicationRender();

  } catch (e) {
    console.log(e);
  }
}
