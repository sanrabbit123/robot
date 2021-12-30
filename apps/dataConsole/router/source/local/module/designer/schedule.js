DesignerJs.prototype.scheduleDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;
  let loading;
  let projects;

  if (!middleMode) {
    this.pageHistory.unshift({ path: "schedule", status: "list", desid });
  }
  window.history.pushState({ path: "schedule", status: "list", desid }, '');

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.iconTong !== undefined && this.iconTong !== null) {
      this.iconTong.parentElement.removeChild(this.iconTong);
    }
    this.iconTong = null;
    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  if (!middleMode) {
    target = null;
    for (let i = 0; i < this.standardDoms.length; i++) {
      if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
        if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
          target = i;
        }
      }
    }
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (i !== target) {
        this.standardDoms[i].style.color = this.standardDoms[i].getAttribute("color");
      } else {
        this.standardDoms[i].style.color = colorChip.green;
        if (i !== 1) {
          if (this.standardDoms[i].getBoundingClientRect().top > window.innerHeight - belowHeight - motherHeight - this.standardDoms[i].getBoundingClientRect().height + 10 || this.standardDoms[i].getBoundingClientRect().top < firstTop) {
            standardBar.parentElement.scrollTo({ top: ((i - 1) * (this.standardDoms[i].getBoundingClientRect().height)) });
          }
        } else {
          standardBar.parentElement.scrollTo({ top: 0 });
        }
      }
    }
  }

  if (middleMode) {
    ajaxJson({
      page: "schedule",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.scheduleIconSet(desid);
  this.mother.loadingRun().then((dom) => {
    loading = dom;
    return ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getProjects", { equal: true });
  }).then((raw) => {
    projects = raw;
    return ajaxJson({ method: "project", idArr: projects.map((obj) => { return obj.proid }) }, "/getHistoryTotal", { equal: true });
  }).then((histories) => {
    if (projects.length === 0) {
      return [];
    } else {
      for (let project of projects) {
        project.history = histories[project.proid];
      }
      instance.designers.setProjects(projects);
      return ajaxJson({
        noFlat: true,
        whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
      }, "/getClients", { equal: true });
    }
  }).then((clients) => {
    loading.parentNode.removeChild(loading);
    instance.designers.setClients(clients);
    instance.scheduleList(desid);
    scrollTo(totalMother, pastScrollTop);
    if (callback !== null) {
      if (typeof callback === "function") {
        callback();
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}

DesignerJs.prototype.scheduleReturnStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;

  const title = client.name + "님 상세 일정표";
  const initialContents = "안녕하세요, <b%" + designer.designer + "%b> 실장님!\n홈리에종에 의뢰하신 " + client.name +  " 고객님 관련 정보를 보내드립니다. <b%" + GeneralJs.serviceParsing(project.service) + "%b>를 진행합니다.";
  const weekWordings = [ '월', '화', '수', '목', '금', '토', '일' ];

  return {
    title,
    initialContents,
    weekWordings,
  };
}

DesignerJs.prototype.scheduleList = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const cookies = getCookiesAll();
  const statusColors = [
    {
      color: colorChip.gray3,
      name: "미작성"
    },
    {
      color: colorChip.red,
      name: "작성중"
    },
    {
      color: colorChip.purple,
      name: "작성 완료"
    },
    {
      color: colorChip.green,
      name: "전송 완료"
    },
  ]
  const mobile = this.media[4];
  const desktop = !mobile;
  let designer;
  let margin;
  let baseTong0, baseTong;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let boxNumber, boxNumberArr;
  let requestBox, boxMargin;
  let projects;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;
  let dateString;
  let baseTongPaddingBottom;
  let mobileOuterMargin;
  let borderRadius;
  let secondFont;
  let statusNumber;
  let colorInfo;
  let colorInfoIndent;
  let colorInfoPaddingLeft;
  let colorInfoPaddingTop;
  let colorInfoPaddingBottom;
  let colorBlockHeight;
  let colorMarkWidth;
  let colorMarkHeight;
  let colorMarkBetween;
  let colorBlockSize;
  let colorBlockWeight;
  let colorBlockTextTop;
  let colorBlockIndex;

  designer = this.designers.pick(desid);
  projects = designer.projects;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = projects.length;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  boxMargin = <%% 13, 13, 12, 10, 2 %%>;

  requestSize = <%% 18, 18, 17, 16, 4.4 %%>;
  secondFont = <%% 2, 2, 2, 2, 1 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0 %%>;
  requestWordPaddingTop = <%% (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), 4.8 %%>;
  requestWordPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 4.6 %%>;

  baseTongPaddingBottom = <%% 4, 4, 3, 3, 20 %%>;
  mobileOuterMargin = 4;

  borderRadius = <%% 10, 10, 10, 10, 8 %%>;

  colorInfoIndent = 35;
  colorBlockHeight = 24;

  colorInfoPaddingLeft = 17;
  colorInfoPaddingTop = 11;
  colorInfoPaddingBottom = 12;

  colorMarkWidth = 32;
  colorMarkHeight = 10;
  colorMarkBetween = 7;

  colorBlockSize = 13;
  colorBlockWeight = 500;

  colorBlockTextTop = -1;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : (this.middleMode ? String(60) + "px" : String(0)),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: "auto",
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    }
  });

  this.requestBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    statusNumber = 0;
    if (projects[i].history.schedule.progress.start.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 1;
    }
    if (projects[i].history.schedule.progress.complete.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 2;
    }
    if (projects[i].history.schedule.progress.send.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 3;
    }

    if (/없음/gi.test(dateToString(projects[i].process.contract.form.date.from)) || /예정/gi.test(dateToString(projects[i].process.contract.form.date.from))) {
      dateString = "00.00.00";
    } else {
      dateString = dateToString(projects[i].process.contract.form.date.from).slice(2).replace(/\-/g, '.');
    }

    requestBox = createNode({
      mother: baseTong,
      event: {
        click: this.scheduleDocument(baseTong, i, designer, projects[i]),
        mouseenter: function (e) {
          this.style.transition = "";
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          const statusNumber = Number(this.getAttribute("status"));
          if (desktop) {
            this.children[0].style.background = statusColors[statusNumber].color;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      attribute: [
        { cliid: projects[i].cliid },
        { proid: projects[i].proid },
        { status: String(statusNumber) },
      ],
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginTop: String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea,
        marginRight: String(boxMargin) + ea,
        marginLeft: String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea,
        marginBottom: String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        cursor: "pointer",
        transition: "all 0s ease",
        transform: "translateY(0px)",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            width: String(100) + '%',
            left: String(0),
            height: String(desktop ? borderRadius : 2) + ea,
            background: statusColors[statusNumber].color,
            borderTopRightRadius: String(borderRadius / 2) + "px",
            borderTopLeftRadius: String(borderRadius / 2) + "px",
          }
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: projects[i].name + " <b%고객님%b>",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              },
              bold: {
                color: colorChip.black,
                fontWeight: String(300),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
          },
          children: [
            {
              text: dateString,
              style: {
                fontSize: String(requestSize - secondFont) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let i = 1; i < Array.from(requestBox.children).length; i++) {
      if (thisChildWidth <= requestBox.children[i].firstChild.getBoundingClientRect().width) {
        thisChildWidth = requestBox.children[i].firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    if (desktop) {
      boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));
      boxNumberArr.push(boxNumber);
    }

    this.requestBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.requestBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
        this.requestBoxes[i].style.marginTop = String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea;
        this.requestBoxes[i].style.marginLeft = String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea;
        this.requestBoxes[i].style.marginBottom = String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea;
      }
    }
  }

  colorInfo = createNode({
    mother: baseTong,
    style: {
      position: "fixed",
      background: colorChip.white,
      bottom: String(belowHeight + colorInfoIndent) + ea,
      right: String(colorInfoIndent) + ea,
      boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
      borderRadius: String(5) + "px",
      opacity: String(0),
      animation: "fadeuplite 0.5s ease 0.3s forwards",
      paddingTop: String(colorInfoPaddingTop) + ea,
      paddingBottom: String(colorInfoPaddingBottom) + ea,

    }
  });

  createNode({
    mother: colorInfo,
    attribute: {
      index: String(-1),
    },
    style: {
      display: "flex",
      flexDirection: "row",
      width: String(100) + '%',
      height: String(colorBlockHeight) + ea,
      alignItems: "center",
    },
    children: [
      {
        style: {
          marginLeft: String(colorInfoPaddingLeft) + ea,
          marginRight: String(colorMarkBetween) + ea,
          display: "inline-block",
          width: String(colorMarkWidth) + ea,
          height: String(colorMarkHeight) + ea,
          background: colorChip.black,
          borderRadius: String(1) + "px",
        }
      },
      {
        text: "전체",
        attribute: {
          index: String(-1),
        },
        event: {
          click: function (e) {
            let num;

            num = 0;
            for (let box of instance.requestBoxes) {
              if (num % boxNumber === 0) {
                box.style.marginLeft = String(boxMargin * 1.5) + ea;
              } else {
                box.style.marginLeft = String(0) + ea;
              }
              box.style.display = "inline-block";
              num++;
            }
          }
        },
        class: [ "hoverDefault_lite" ],
        style: {
          display: "inline-block",
          position: "relative",
          top: String(colorBlockTextTop) + ea,
          fontSize: String(colorBlockSize) + ea,
          fontWeight: String(colorBlockWeight),
          color: colorChip.black,
          marginRight: String(colorInfoPaddingLeft) + ea,
        }
      }
    ]
  });

  colorBlockIndex = 0;
  for (let { color, name } of statusColors) {
    createNode({
      mother: colorInfo,
      attribute: {
        index: String(colorBlockIndex),
      },
      style: {
        display: "flex",
        flexDirection: "row",
        width: String(100) + '%',
        height: String(colorBlockHeight) + ea,
        alignItems: "center",
      },
      children: [
        {
          style: {
            marginLeft: String(colorInfoPaddingLeft) + ea,
            marginRight: String(colorMarkBetween) + ea,
            display: "inline-block",
            width: String(colorMarkWidth) + ea,
            height: String(colorMarkHeight) + ea,
            background: color,
            borderRadius: String(1) + "px",
          }
        },
        {
          text: name,
          attribute: {
            index: String(colorBlockIndex),
          },
          event: {
            click: function (e) {
              const statusIndex = Number(this.getAttribute("index"));
              let num;

              num = 0;
              for (let box of instance.requestBoxes) {
                if (Number(box.getAttribute("status")) === statusIndex) {
                  if (num % boxNumber === 0) {
                    box.style.marginLeft = String(boxMargin * 1.5) + ea;
                  } else {
                    box.style.marginLeft = String(0) + ea;
                  }
                  box.style.display = "inline-block";
                  num++;
                } else {
                  box.style.display = "none";
                }
              }
            }
          },
          class: [ "hoverDefault_lite" ],
          style: {
            display: "inline-block",
            position: "relative",
            top: String(colorBlockTextTop) + ea,
            fontSize: String(colorBlockSize) + ea,
            fontWeight: String(colorBlockWeight),
            color: colorChip.black,
            marginRight: String(colorInfoPaddingLeft) + ea,
          }
        }
      ]
    });
    colorBlockIndex++;
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.scheduleDocument = function (mother, index, designer, project) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, serviceParsing, setQueue, swipePatch } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const blocks = mother.children;
  this.proid = null;
  this.project = null;
  this.client = null;
  return async function (e) {
    try {
      const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });
      let clientHistory, projectHistory;
      let thisBlock, motherTop;
      let visualSpecific;
      let requestNumber, thisRequest;
      let site;
      let construct;
      let styling;
      let budget;
      let progress;

      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (project.proposal.date.valueOf() >= client.requests[i].request.timeline.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      thisRequest = client.requests[requestNumber];

      clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory", { equal: true });
      projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory", { equal: true });

      if (desktop) {

        mother.style.height = String(mother.getBoundingClientRect().height) + ea;
        motherTop = mother.getBoundingClientRect().top;

        visualSpecific = <%% 1, 1, 1, 0, 0 %%>;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.transition = "all 0s ease";
          blocks[i].setAttribute("top", String(Math.floor(blocks[i].getBoundingClientRect().top - mother.getBoundingClientRect().top)) + ea);
          blocks[i].setAttribute("left", String(Math.floor(blocks[i].getBoundingClientRect().left - Math.ceil(mother.getBoundingClientRect().left))) + ea);
          if (i !== index) {
            blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
          } else {
            thisBlock = blocks[i];
            thisBlock.style.transform = "";
            for (let dom of blocks[i].children) {
              dom.style.opacity = String(0);
            }
          }
        }

        for (let block of blocks) {
          block.style.position = "absolute";
          block.style.margin = String(0);
          block.style.left = block.getAttribute("left");
          block.style.top = block.getAttribute("top");
        }

      } else {
        motherTop = 3.8;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
          if (i === index) {
            thisBlock = blocks[i];
          }
        }
      }

      setQueue(() => {
        if (desktop) {
          thisBlock.style.boxShadow = "";
          thisBlock.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
          thisBlock.style.transition = "all 0.4s ease";
          thisBlock.style.position = "absolute";
          thisBlock.style.left = String(0);
          thisBlock.style.top = String(0);
          thisBlock.style.width = String(100) + '%';
          thisBlock.style.height = String(100) + '%';
        } else {
          for (let block of blocks) {
            block.style.position = "absolute";
          }
        }

        mother.parentElement.style.height = withOut(motherTop, ea);
        if (mobile) {
          mother.parentElement.style.left = String(0);
          mother.parentElement.style.width = String(100) + '%';
          mother.parentElement.style.paddingTop = "";
        }
        mother.style.boxShadow = "";
        mother.style.paddingBottom = "";
        mother.style.paddingTop = String(motherTop) + ea;
        mother.style.height = withOut(motherTop, ea);
        mother.style.overflow = "scroll";

        setQueue(async () => {
          try {
            mother.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
            const board = createNode({
              mother,
              style: {
                position: "relative",
                left: String(motherTop) + ea,
                width: withOut(motherTop * 2, ea),
                height: String(8000) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.white,
                animation: "fadeupdelay 0.4s ease forwards",
                boxShadow: "0px 3px 15px -10px " + colorChip.shadow,
                zIndex: String(1),
                marginBottom: String(motherTop) + ea,
              }
            });
            await instance.scheduleContents(board, designer, project, client, clientHistory, projectHistory, requestNumber);
            if (mobile) {
              mother.style.marginBottom = "";
            }

            if (mobile) {
              swipePatch({
                right: (e) => {
                  instance.scheduleDetailLaunching(desid);
                },
              });
            }

            instance.pageHistory.unshift({ path: "schedule", status: "card", desid, cliid });
            window.history.pushState({ path: "schedule", status: "list", desid }, '');

          } catch (e) {
            console.log(e);
          }
        }, 500);

      }, 400);

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.scheduleContents = async function (board, designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma, serviceParsing, getDateMatrix, cleanChildren } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  this.proid = proid;
  this.client = client;
  this.project = project;
  const today = new Date();
  const totalStatic = this.scheduleReturnStatic(designer, project, client, clientHistory, projectHistory, requestNumber);
  const {
    title,
    initialContents,
    weekWordings,
  } = totalStatic;
  try {
    let titleArea;
    let contentsArea;
    let topMargin;
    let leftMargin;
    let titleHeight;
    let titleSize;
    let titleBottom;
    let titlePaddingBottom;
    let fontSize;
    let titleDateVisualBottom;
    let width;
    let tempDom;
    let lineHeight;
    let finalBottom;
    let num;
    let blockArea;
    let blockFactor;
    let blockOuterPadding;
    let blockFactorHeight;
    let blockFactorMarginBottom;
    let blockWhite0, blockWhite1, blockWhite2;
    let blockInnerMargin;
    let blockSecondRatio;
    let numberSize, numberTextTop, numberWeight;
    let dateStart, dateEnd;
    let dateSize, dateWeight;
    let dateTop, dateLeft, dateBottom, datePadding;
    let dateLineBottom;
    let wordingTitle, wordingDescription;
    let barColor;
    let colorBarWidth, colorBarVisual;
    let wordingSize, wordingLeft, wordingWeight0, wordingWeight1, wordingTop;
    let descriptionPaddingLeft, descriptionPaddingRight, descriptionPaddingTop;
    let descriptionLineHeight;
    let plusSize, plusWeight, plusTextTop;
    let blockAreaMarginBottom;
    let bigCalendar;
    let bigCalendarTitleZone, bigCalendarContentsZone;
    let calendarVisualLeft;
    let dateMatrix;
    let bigCalendarTitleBottom;
    let bigCalendarTitleSize, bigCalendarTitleWeight;
    let weekBlockHeight;
    let weekBlockSize, weekBlockWeight, weekBlockTextTop;
    let dateBlockHeight, dateBlockWeight;
    let datePositionTop, datePositionLeft;
    let arrowWidth, arrowTop;
    let blockInsert;

    topMargin = <%% 42, 38, 32, 30, 5.8 %%>;
    leftMargin = <%% 50, 46, 38, 32, 5.8 %%>;

    titleSize = <%% 35, 33, 30, 26, 5 %%>;
    titlePaddingLeft = <%% 1, 1, 1, 1, 0 %%>;
    titleBottom = <%% 35, 29, 28, 20, 5 %%>;
    titlePaddingBottom = <%% (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), 3.2 %%>;
    titleDateVisualBottom = <%% (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), 0.5 %%>;

    fontSize = <%% 15, 14, 13, 12, 3.5 %%>;

    lineHeight = 1.8;
    finalBottom = <%% 60, 60, 60, 60, 10 %%>;

    blockOuterPadding = 10;
    blockFactorHeight = 90;
    blockInnerMargin = 6;
    blockFactorMarginBottom = 6;

    numberSize = 36;
    numberTextTop = -4;
    numberWeight = 400;

    blockSecondRatio = 2.4;
    dateSize = 15;
    dateWeight = 400;
    dateTop = 11;
    dateBottom = dateTop + 5;
    dateLeft = 18;
    datePadding = 8;
    dateLineBottom = 24.5;

    colorBarWidth = 6;
    colorBarVisual = 1;

    wordingSize = 14;
    wordingLeft = 34;
    wordingWeight0 = 600;
    wordingWeight1 = 400;
    wordingTop = 13;

    descriptionPaddingLeft = wordingLeft;
    descriptionPaddingRight = dateLeft;
    descriptionPaddingTop = 34;
    descriptionLineHeight = 1.6;

    plusSize = 48;
    plusWeight = 500;
    plusTextTop = -5;

    blockAreaMarginBottom = 50;

    calendarVisualLeft = 1;

    bigCalendarTitleBottom = 22;
    bigCalendarTitleSize = 36;
    bigCalendarTitleWeight = 300;
    weekBlockHeight = 48;
    weekBlockSize = 15;
    weekBlockWeight = 600;
    weekBlockTextTop = -2;

    dateBlockHeight = 120;
    dateBlockWeight = 300;

    datePositionTop = 10;
    datePositionLeft = 18;

    arrowWidth = 12;
    arrowTop = 22;

    blockInsert = () => {}

    board.style.paddingTop = String(topMargin) + ea;

    titleArea = createNode({
      mother: board,
      style: {
        marginLeft: String(leftMargin) + ea,
        paddingLeft: String(titlePaddingLeft) + ea,
        width: withOut((leftMargin * 2) + titlePaddingLeft, ea),
        borderBottom: "1px solid " + colorChip.gray3,
        marginBottom: String(titleBottom) + ea,
        paddingBottom: String(titlePaddingBottom) + ea,
        position: "relative",
      },
      children: [
        {
          text: title,
          style: {
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          text: serviceParsing(project.service),
          class: [ "hoverDefault_lite" ],
          event: {
            click: (e) => { e.preventDefault(); }
          },
          style: {
            position: "absolute",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            right: String(titlePaddingLeft) + ea,
            textAlign: "right",
            bottom: String(titlePaddingBottom - titleDateVisualBottom) + ea,
          }
        }
      ]
    });

    contentsArea = createNode({
      mother: board,
      style: {
        position: "relative",
        marginLeft: String(leftMargin) + ea,
        width: withOut(leftMargin * 2, ea),
      },
      children: [
        {
          text: initialContents,
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(lineHeight),
            marginBottom: String(titleBottom) + ea,
          },
          bold: {
            fontWeight: String(600),
            color: colorChip.black,
          }
        }
      ]
    });

    blockArea = createNode({
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockAreaMarginBottom) + ea,
      }
    });

    if (projectHistory.schedule.children.length > 0) {
      for (let i = 0; i < projectHistory.schedule.children.length; i++) {

        ({ date: { start: dateStart, end: dateEnd }, contents: { title: wordingTitle, description: wordingDescription, color: barColor } } = projectHistory.schedule.children[i]);
        dateStart = dateToString(dateStart).replace(/-/gi, ". ").slice(2);
        dateEnd = dateToString(dateEnd).replace(/-/gi, ". ").slice(2);

        blockFactor = createNode({
          mother: blockArea,
          style: {
            display: "block",
            position: "relative",
            padding: String(blockOuterPadding) + ea,
            width: withOut(blockOuterPadding * 2, ea),
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray2,
            marginBottom: String(blockFactorMarginBottom) + ea,
          }
        });
        blockWhite0 = createNode({
          mother: blockFactor,
          style: {
            verticalAlign: "top",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginRight: String(blockInnerMargin) + ea,
          },
          children: [
            {
              text: String(i + 1),
              style: {
                position: "relative",
                fontSize: String(numberSize) + ea,
                fontWeight: String(numberWeight),
                fontFamily: "graphik",
                top: String(numberTextTop) + ea,
                color: colorChip.black,
              }
            }
          ]
        });
        blockWhite1 = createNode({
          mother: blockFactor,
          style: {
            verticalAlign: "top",
            display: "inline-block",
            position: "relative",
            width: String((blockFactorHeight - (blockOuterPadding * 2)) * blockSecondRatio) + ea,
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            marginRight: String(blockInnerMargin) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                width: withOut(dateLeft * 2, ea),
                bottom: String(dateLineBottom) + ea,
                left: String(dateLeft) + ea,
                borderBottom: "1px solid " + colorChip.green,
              }
            },
            {
              text: dateStart,
              style: {
                position: "absolute",
                fontSize: String(dateSize) + ea,
                fontWeight: String(dateWeight),
                fontFamily: "graphik",
                color: colorChip.black,
                top: String(dateTop) + ea,
                left: String(dateLeft) + ea,
                background: colorChip.white,
                paddingRight: String(datePadding) + ea,
              }
            },
            {
              text: dateEnd,
              style: {
                position: "absolute",
                fontSize: String(dateSize) + ea,
                fontWeight: String(dateWeight),
                fontFamily: "graphik",
                color: colorChip.black,
                bottom: String(dateBottom) + ea,
                right: String(dateLeft) + ea,
                background: colorChip.white,
                paddingLeft: String(datePadding) + ea,
              }
            },
          ]
        });
        blockWhite2 = createNode({
          mother: blockFactor,
          style: {
            verticalAlign: "top",
            display: "inline-block",
            position: "relative",
            width: withOut(((blockFactorHeight - (blockOuterPadding * 2)) * (1 + blockSecondRatio) + (blockInnerMargin * 2) + descriptionPaddingLeft + descriptionPaddingRight), ea),
            height: String(blockFactorHeight - (blockOuterPadding * 2) - descriptionPaddingTop) + ea,
            paddingTop: String(descriptionPaddingTop) + ea,
            paddingLeft: String(descriptionPaddingLeft) + ea,
            paddingRight: String(descriptionPaddingRight) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
          },
          children: [
            {
              style: {
                position: "absolute",
                left: String(dateLeft) + ea,
                top: String(dateBottom) + ea,
                width: String(colorBarWidth) + ea,
                height: withOut((dateBottom * 2) + colorBarVisual, ea),
                borderRadius: String(colorBarWidth) + ea,
                background: barColor,
              }
            },
            {
              text: wordingTitle,
              style: {
                position: "absolute",
                left: String(wordingLeft) + ea,
                top: String(wordingTop) + ea,
                fontSize: String(wordingSize) + ea,
                fontWeight: String(wordingWeight0),
                color: colorChip.black,
              }
            },
            {
              style: {
                position: "relative",
                width: String(100) + '%',
                height: String(100) + '%',
                background: "transparent",
                overflow: "scroll"
              },
              children: [
                {
                  text: wordingDescription,
                  style: {
                    fontSize: String(wordingSize) + ea,
                    fontWeight: String(wordingWeight1),
                    color: colorChip.black,
                    lineHeight: String(descriptionLineHeight),
                  }
                }
              ]
            }
          ]
        });
      }
    }

    // plus
    blockFactor = createNode({
      mother: blockArea,
      style: {
        verticalAlign: "top",
        display: "block",
        position: "relative",
        padding: String(blockOuterPadding) + ea,
        width: withOut(blockOuterPadding * 2, ea),
        height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
      },
      children: [
        {
          style: {
            verticalAlign: "top",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
            marginRight: String(blockInnerMargin) + ea,
          },
          children: [
            {
              text: '+',
              style: {
                position: "relative",
                fontSize: String(plusSize) + ea,
                fontWeight: String(plusWeight),
                fontFamily: "graphik",
                top: String(plusTextTop) + ea,
                color: colorChip.white,
              }
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String((blockFactorHeight - (blockOuterPadding * 2)) * blockSecondRatio) + ea,
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
            marginRight: String(blockInnerMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(((blockFactorHeight - (blockOuterPadding * 2)) * (1 + blockSecondRatio) + (blockInnerMargin * 2)), ea),
            height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
          }
        }
      ]
    });

    dateMatrix = getDateMatrix(today);

    bigCalendar = createNode({
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        paddingLeft: String(calendarVisualLeft) + ea,
        paddingRight: String(calendarVisualLeft) + ea,
      }
    });
    bigCalendarTitleZone = createNode({
      mother: bigCalendar,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: String(bigCalendarTitleBottom) + ea,
      },
      children: [
        {
          text: dateToString(today).split('-').slice(0, 2).join(". "),
          style: {
            fontSize: String(bigCalendarTitleSize) + ea,
            fontWeight: String(bigCalendarTitleWeight),
            fontFamily: "graphik",
            color: colorChip.black,
          }
        },
        {
          mode: "svg",
          class: [ "hoverDefault_lite" ],
          source: this.mother.returnArrow("left", colorChip.green),
          event: {
            click: function (e) {
              dateMatrix = dateMatrix.previousMatrix();
              this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + String(dateMatrix.month + 1)
              blockInsert();
            }
          },
          style: {
            position: "absolute",
            top: String(arrowTop) + ea,
            left: String(0) + ea,
            width: String(arrowWidth) + ea,
          }
        },
        {
          mode: "svg",
          class: [ "hoverDefault_lite" ],
          source: this.mother.returnArrow("right", colorChip.green),
          event: {
            click: function (e) {
              dateMatrix = dateMatrix.nextMatrix();
              this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + String(dateMatrix.month + 1)
              blockInsert();
            }
          },
          style: {
            position: "absolute",
            top: String(arrowTop) + ea,
            right: String(0) + ea,
            width: String(arrowWidth) + ea,
          }
        },
      ]
    });
    bigCalendarContentsZone = createNode({
      mother: bigCalendar,
      style: {
        display: "block",
        position: "relative",
        border: "1px solid " + colorChip.gray3,
        borderRadius: String(5) + "px",
        width: String(100) + '%',
        overflow: "hidden",
        boxSizing: "border-box",
      },
    })

    blockInsert = () => {
      cleanChildren(bigCalendarContentsZone);
      for (let j = 0; j < weekWordings.length; j++) {
        createNode({
          mother: bigCalendarContentsZone,
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "calc(100% / " + String(weekWordings.length) + ")",
            height: String(weekBlockHeight) + ea,
            background: colorChip.gray1,
            boxSizing: "border-box",
            borderRight: j !== weekWordings.length - 1 ? "1px solid " + colorChip.gray3 : "",
            borderBottom: "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: weekWordings[j],
              style: {
                fontSize: String(weekBlockSize) + ea,
                fontWeight: String(weekBlockWeight),
                color: j < 5 ? colorChip.black : colorChip.red,
                position: "relative",
                top: String(weekBlockTextTop) + ea,
              }
            }
          ]
        });
      }
      for (let i = 0; i < dateMatrix.matrix.length; i++) {
        for (let j = 0; j < dateMatrix.matrix[i].length; j++) {
          createNode({
            mother: bigCalendarContentsZone,
            style: {
              display: "inline-block",
              position: "relative",
              width: "calc(100% / " + String(dateMatrix.matrix[i].length) + ")",
              height: String(dateBlockHeight) + ea,
              background: dateMatrix.matrix[i][j] !== null ? colorChip.white : colorChip.gray0,
              boxSizing: "border-box",
              borderRight: j !== dateMatrix.matrix[i].length - 1 ? "1px solid " + colorChip.gray3 : "",
              borderBottom: i !== dateMatrix.matrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
            },
            children: [
              {
                text: dateMatrix.matrix[i][j] !== null ? String(dateMatrix.matrix[i][j].date) : "",
                style: {
                  fontSize: String(weekBlockSize) + ea,
                  fontWeight: String(dateBlockWeight),
                  fontFamily: "graphik",
                  color: j < 5 ? colorChip.black : colorChip.red,
                  position: "absolute",
                  top: String(datePositionTop) + ea,
                  left: String(datePositionLeft) + ea,
                }
              }
            ]
          });
        }
      }
    }
    blockInsert();

    board.style.height = "auto";
    board.style.paddingBottom = String(finalBottom) + ea;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.scheduleIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  let mother;
  let radius;
  let left, bottom;
  let left2;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 18.5, 17, 15, 6 %%>;
  left = <%% 40, 30, 25, 19, 0 %%>;
  left2 = <%% 40, 36, 36, 19, 0 %%>;
  bottom = <%% 40, 36, 30, 22, 7.2 %%>;
  margin = <%% 6, 5, 4, 4, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12, 11, 10, 3.8 %%>;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    class: [ "iconTong" ],
    style: {
      display: "block",
      position: "fixed",
      height: String(desktop ? motherHeight : (bottom + (radius * 2))) + ea,
      width: String(desktop ? grayBarWidth : (bottom + (radius * 2))) + ea,
      left: desktop ? String(0) : "",
      right: desktop ? "" : String(0),
      bottom: String(belowHeight) + ea,
      background: desktop ? colorChip.gray0 : "transparent",
      zIndex: String(2),
    }
  });

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: "calc(50% - " + String(radius * 0.45) + ea + ")",
        top: String(iconTop) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnAinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(15) + ea,
        left: String(12.5) + ea,
        top: String(11) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDecrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(9.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnMinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(16.5) + ea,
        left: String(11.5) + ea,
        top: String(11.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnIncrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(11.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnRinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(14) + ea,
        left: String(13.5) + ea,
        top: String(10.5) + ea,
      }
    },
  ]);

  listIcon = nodeArr[0];
  aInitialIcon = nodeArr[2];
  previousIcon = nodeArr[4];
  mInitialIcon = nodeArr[6];
  nextIcon = nodeArr[8];
  rInitialIcon = nodeArr[10];

  this.iconTong = mother;
  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  if (!this.middleMode) {

    listIcon.addEventListener("click", function (e) {
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
    });

    previousIcon.addEventListener("click", function (e) {
      let previousDesid, boo, thisStandard;
      previousDesid = desid;
      do {
        previousDesid = instance.designers.previous(previousDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === previousDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      instance.scheduleDetailLaunching(previousDesid);
    });

    nextIcon.addEventListener("click", function (e) {
      let nextDesid, boo, thisStandard;
      nextDesid = desid;
      do {
        nextDesid = instance.designers.next(nextDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === nextDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      instance.scheduleDetailLaunching(nextDesid);
    });

  } else {

    if (desktop) {

      listIcon.addEventListener("click", function (e) {
        const totalContents = document.getElementById("totalcontents");
        const totalMother = document.querySelector(".totalMother");
        const grayBack = totalContents.children[0];
        const listPannel = totalMother.children[0].children[0];
        const iconSetPannel = instance.iconTong;
        const mainBaseTong = instance.mainBaseTong;
        const outerMargin = Number(mainBaseTong.style.top.replace(/[^0-9\.\-]/gi, ''));

        if (grayBack.getAttribute("toggle") !== "off") {
          grayBack.style.width = String(0) + ea;
          listPannel.style.transform = "translateX(" + String((instance.grayBarWidth + instance.tabletWidth) * -1) + ea + ")";
          iconSetPannel.style.background = "transparent";
          mainBaseTong.style.left = String(outerMargin) + ea;
          mainBaseTong.style.width = withOut(outerMargin * 2, ea);
          instance.listIcon.style.left = String(left2) + ea;
          grayBack.setAttribute("toggle", "off");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) + instance.grayBarWidth) + ea;
          }
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          instance.listIcon.style.left = String(left) + ea;
          grayBack.setAttribute("toggle", "on");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) - instance.grayBarWidth) + ea;
          }
        }

      });

    } else {

      listIcon.addEventListener("click", function (e) {
        instance.mode = "request";
        instance.scheduleDetailLaunching(designer.desid);
      });

    }

    previousIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index - 1] === undefined ? targets[targets.length - 1] : targets[index - 1];
        target.click();
      }
    });

    nextIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index + 1] === undefined ? targets[0] : targets[index + 1];
        target.click();
      }
    });

  }

  rInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      window.alert("의뢰서를 선택해주세요!");
    } else {
      window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + instance.proid;
    }
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 문서가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].docs);
      }
    } catch (e) {
      console.log(e);
    }
  });

  mInitialIcon.addEventListener("contextmenu", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 폴더가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].drive);
      }
    } catch (e) {
      console.log(e);
    }
  });

  aInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsole",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            host: GHOSTHOST,
            path: "console",
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "schedule",
            mode: "send",
            who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    } else {
      if (window.confirm(designer.designer + " 디자이너님에게 " + instance.client.name + " 고객님 홈스타일링 의뢰서 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsoleRequest",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            client: instance.client.name,
            host: GHOSTHOST,
            path: "console",
            mode: "request",
            cliid: instance.client.cliid,
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "schedule",
            mode: "send",
            who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
            cliid: instance.client.cliid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    }
  });

}

DesignerJs.prototype.scheduleView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[5];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            document.getElementById("totalcontents").removeChild(document.querySelector(".totalFather"));
            instance.totalFather = null;
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
          }
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.scheduleDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.scheduleDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
    }

    //standard doms event
    standardBar_mother = standardBar.cloneNode(false);
    style = {
      position: "fixed",
      height: withOut(100, belowHeight + motherHeight, ea),
      overflow: "scroll",
    };
    for (let i in style) {
      standardBar_mother.style[i] = style[i];
    }
    totalMother.insertBefore(standardBar_mother, standardBar);
    standardBar_mother.appendChild(standardBar);
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (this.designers.pick(this.standardDoms[i].getAttribute("desid")) !== null) {
        this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
        this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
        this.standardDoms[i].style.transition = "all 0s ease";
        this.standardDoms[i].addEventListener("click", (e) => {
          instance.scheduleDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
        });
        children = this.standardDoms[i].children;
        childrenLength = children.length;
        for (let j = 0; j < childrenLength; j++) {
          children[j].style.color = "inherit";
          children[j].style.transition = "all 0s ease";
        }
      } else {
        this.standardDoms[i].style.display = "none";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          if (instance.pageHistory[1].status === "list") {
            instance.scheduleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else {
            instance.scheduleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        }
      }
    });

    //launching
    this.proid = null;
    this.project = null;
    this.client = null;
    this.requestBoxes = [];
    this.scheduleDetailLaunching(this.desid, async () => {
      if (getObj.cliid !== undefined) {
        if (getObj.desid === undefined) {
          projects = await ajaxJson({ noFlat: true, whereQuery: { $and: [ { cliid: getObj.cliid }, { desid: { $regex: "^d" } } ] } }, "/getProjects");
          if (projects.length > 0) {
            instance.scheduleDetailLaunching(projects[0].desid, () => {
              for (let box of instance.requestBoxes) {
                if (box.getAttribute("cliid") === getObj.cliid) {
                  box.click();
                }
              }
            });
          }
        } else {
          for (let box of instance.requestBoxes) {
            if (box.getAttribute("cliid") === getObj.cliid) {
              box.click();
            }
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}
